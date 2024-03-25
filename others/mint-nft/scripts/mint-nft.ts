import axios from "axios";
import { BigNumber } from "ethers";
import {
  ContractAddress,
  UnicomNftContractServer,
} from "../servers/contract_services";
import getSigner from "../utils/get_signer";
import msTos from "../utils/ms_tos";
import {
  unicomNFTs,
  myLinkNFTs,
  mobileVipNfts,
  mylinkWeb3Nfts,
  mylinkWeb3NftsTesting,
  nftParams,
} from "../utils/nfts";
require("dotenv").config();

const metopiaSite: string = process.env.METOPIA_SITE!;

interface AddNFTProps {
  tokenId: string;
  amount: number;
  total: number;
}

async function addNft(token: AddNFTProps) {
  const res = await axios.post(`${metopiaSite}/api/activity/add_nft`, token);
  console.log("res", res);
}

async function addNftToTest(token: AddNFTProps) {
  const res = await axios.post(
    `http://47.243.238.95:8080/api/activity/add_nft`,
    token
  );
  console.log("res", res);
}

async function mintNfts(nfts: nftParams[]) {
  const tokens: nftParams[] = [];
  const enc = new TextEncoder();
  for (let i = 0; i < nfts.length; i++) {
    const item = nfts[i];
    const tokenId =
      item.id.length > 0
        ? BigNumber.from(item.id)
        : BigNumber.from(new Date().getTime());
    const start = new Date().getTime();
    const itemName = item.name; //`${item.name}${i + 1}`; // `${item.name}-${padLeftZero(i + 1, 2)}`;
    const url = item.url; // `${AppProvider.ipfsTestBaseURL}${ApiPath.downLoadFile}${item.url}`;
    const metaData = enc.encode(
      JSON.stringify({
        name: itemName,
        description: "",
        date: new Date().getTime(),
      })
    );
    console.log(`${itemName} 开始铸造`, itemName);
    console.log("tokenID" + i, tokenId);

    try {
      console.log(`${itemName} 开始铸造`, itemName);
      const res = await new UnicomNftContractServer(
        getSigner(process.env.THIRD!),
        ContractAddress.unicomNft
      ).addToken(
        itemName,
        tokenId?._hex,
        tokenId,
        BigNumber.from(item.taotalSupply!),
        metaData,
        url
      );
      console.log("Mint-Result", res);
      await res.wait();
      // await addNft({
      //   tokenId: tokenId._hex,
      //   amount: item.taotalSupply!,
      //   total: item.taotalSupply!,
      // });
      // await addNftToTest({
      //   tokenId: tokenId._hex,
      //   amount: item.taotalSupply!,
      //   total: item.taotalSupply!,
      // });
      const end = new Date().getTime();
      console.log(`耗费时间：${msTos(end - start)}`);
      console.log("tokenID" + i, tokenId);
      tokens.push({
        id: tokenId._hex,
        name: itemName,
        url,
      });
    } catch (error) {
      console.log("mintError", error);
    }
  }
  console.log("tokens", tokens);
}

// console.log(UnicomApps);
mintNfts(unicomNFTs);
