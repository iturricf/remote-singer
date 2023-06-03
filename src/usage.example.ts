import { ethers } from "ethers";

// Connect to a ganache local node
// Custom RpcProvider impl that calls the remote signer coming soon...
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545");

const RECIPIENT_ADDRESS =
  process.env.RECIPIENT || "0xae716917580b4A47b102154f19bf21d612FE94EA";

(async () => {
  console.log("Preparing transaction...");
  const transaction = {
    to: RECIPIENT_ADDRESS, // Ganache account #2
    value: ethers.utils.parseEther("1.0"), // 1 Ether
    gasLimit: ethers.utils.hexlify(21000), // Gas limit for a basic transfer
    gasPrice: ethers.utils.parseUnits("20", "gwei"), // Gas price in Gwei
  };

  console.log("Sending transaction to remote signer...");
  // Send to the remote singer to sign
  const signedTx = await remoteSign(transaction);
  console.log("Signed transaction received! Sending to network...", signedTx);

  // Send the signed transaction to the network
  const txResponse = await provider.sendTransaction(signedTx);
  const txReceipt = await txResponse.wait();

  console.log("Transaction mined!\n", txReceipt);
})();

async function remoteSign(tx: any): Promise<string> {
  const txSerialized = ethers.utils.serializeTransaction(tx);

  // @TODO: Add error handling
  // @TODO: Add auth
  // @TODO: Use axios instead of fetch
  const response = await fetch("http://localhost:3000/eth_signTransaction", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tx: txSerialized }),
  });

  const { signedTx } = await response.json();
  return signedTx;
}
