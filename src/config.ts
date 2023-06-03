import { ethers } from "ethers";

const SIGNER_PK =
  process.env.SIGNER ||
  "6b57817a921bb3f98c967fa5ed9a3dac0b45411503a2f6ba3d1d11cb941d1832";

// Use a random wallet for now (this is a PoC)
// export const signer = ethers.Wallet.createRandom();
export const signer = new ethers.Wallet(
  SIGNER_PK // Ganache account #1
);
