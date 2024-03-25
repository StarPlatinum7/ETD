import { ethers, Wallet } from "ethers";

export default function getSigner(privateKey: string): Wallet {
  return new ethers.Wallet(
    privateKey,
    new ethers.providers.JsonRpcProvider("https://rpc.etdchain.net")
  );
}
