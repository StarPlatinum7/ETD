import { BigNumber, Bytes, ContractTransaction, ethers } from "ethers";
import Abis from "../abi/Abis";

class ContractAddress {
  static mobileNft: string = "0x3FF4763bc6E3eB3Df2eD553d3F4c98D9f62f6082";
  static unicomNft: string = "0xf70EA450f99D9d9Dde232fAb7710B6bCC1292AcE";
}

class UnicomNftContractServer {
  ethereum:
    | ethers.providers.ExternalProvider
    | ethers.providers.Web3Provider
    | ethers.Signer
    | ethers.providers.JsonRpcProvider;
  address?: string;
  collectionAddress: string;

  constructor(
    eth:
      | ethers.providers.ExternalProvider
      | ethers.providers.JsonRpcProvider
      | ethers.Signer,
    collectionAddress: string,
    address?: string
  ) {
    this.ethereum = eth;
    this.address = address;
    this.collectionAddress = collectionAddress;
  }
  async addToken(
    itemName: string,
    symbol: string,
    tokenId: BigNumber,
    amount: BigNumber,
    metaData: Bytes,
    fileUrl: string
  ): Promise<ContractTransaction> {
    const contract = loadContract(
      this.collectionAddress,
      Abis._unicomNftAbi,
      this.ethereum
    );
    const res = await contract.functions.AddToken(
      itemName,
      symbol,
      tokenId,
      amount,
      metaData,
      fileUrl
    );
    return res;
  }

  async transferToken(
    from: string,
    to: string,
    tokenId: BigNumber,
    order: BigNumber[],
    data: Bytes,
  ): Promise<ContractTransaction> {
    const contract = loadContract(
      this.collectionAddress,
      Abis._unicomNftAbi,
      this.ethereum
    );

    const res = await contract.functions.TransferToken(
      from,
      to,
      tokenId,
      order,
      data,
    );
    return res;
  }
}

function loadContract(
  contractAddress: string,
  abi: ethers.ContractInterface,
  ethereum:
    | ethers.Signer
    | ethers.providers.ExternalProvider
    | ethers.providers.JsonRpcProvider
    | ethers.providers.Web3Provider,
  address?: string
) {
  const contract = new ethers.Contract(
    contractAddress,
    abi,
    loadSigner(ethereum, address)
  );
  return contract;
}

function loadSigner(
  ethereum:
    | ethers.Signer
    | ethers.providers.ExternalProvider
    | ethers.providers.JsonRpcProvider
    | ethers.providers.Web3Provider,
  address?: string
) {
  if (ethereum instanceof ethers.providers.JsonRpcProvider) {
    if (address) {
      return ethereum.getSigner(address);
    }
    return ethereum;
  }

  if (ethereum instanceof ethers.providers.Web3Provider) {
    return ethereum.getSigner();
  }

  if (ethereum instanceof ethers.Signer) return ethereum;

  const provider = new ethers.providers.Web3Provider(ethereum, {
    name: "ETD",
    chainId: 3101,
  });
  return provider.getSigner();
}

export { ContractAddress, UnicomNftContractServer };
