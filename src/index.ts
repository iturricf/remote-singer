import Koa from "koa";
import bodyParser from "koa-bodyparser";
import { signer } from "./config";
import { ethers } from "ethers";

const app = new Koa();

app.use(bodyParser());

app.use(async (ctx: any, next: any) => {
  console.log("Do some auth here...");
  await next();
});

app.use(async (ctx: any) => {
  console.log("Request received: ", ctx.path);
  if (ctx.path === "/eth_signTransaction") {
    const { tx } = ctx.request.body;
    const { r, s, v, ...txUnsigned } = ethers.utils.parseTransaction(tx);

    console.log("Signing transaction: ", txUnsigned);
    // Check tx here and if it's valid, sign it
    const signedTx = await signer.signTransaction(
      txUnsigned as ethers.providers.TransactionRequest
    );
    ctx.body = { signedTx };
    console.log("Done!");
  } else {
    console.error("Bad request received: ", ctx.path);
    ctx.throw(404);
  }
});

app.listen(3000);

console.log("Remote signing service started...");
console.log("signing for: ", signer.address);
