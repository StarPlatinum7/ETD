require("dotenv").config();
import axios from "axios";
import { BigNumber } from "ethers";
import {
  ContractAddress,
  UnicomNftContractServer,
} from "../servers/contract_services";
import getSigner from "../utils/get_signer";
import fs from "fs";
const domain = process.env.METOPIA_SITE;

interface User {
  walletAddress: string;
  tokenId: string;
  code: string;
}
async function getUsers(): Promise<User[]> {
  const res = await axios.get(domain + "/api/activity/query");
  return res.data.data as User[];
}

const sleep = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

const completeFilePath = "./files/trading_success_list.json";
const errorFilePath = "./files/trading_err_list.json";

async function transferToken(users: User[]) {
  const file = fs.readFileSync(completeFilePath, "utf-8");
  const data = JSON.parse(file) as User[];

  const errorFile = fs.readFileSync(errorFilePath, "utf-8");
  const errorData = JSON.parse(errorFile) as User[];

  const signer = getSigner(process.env.THIRD!);
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    console.log(`开始转移 ${i}`, JSON.stringify(user));
    try {
      const res = await new UnicomNftContractServer(
        signer,
        ContractAddress.mobileNft
      ).transferToken(
        signer.address,
        user.walletAddress,
        BigNumber.from(user.tokenId),
        [BigNumber.from(user.code)],
        new TextEncoder().encode("")
      );
      await res.wait();
      data.push(user);
      console.log(`成功数量 ${data.length}`);
      fs.writeFileSync(completeFilePath, JSON.stringify(data));
      await sleep(1000);
    } catch (error) {
      console.log("error", error);
      errorData.push(user);
      fs.writeFileSync(errorFilePath, JSON.stringify(errorData));
      continue;
    }
  }
  console.log("转移完成!");
}

async function main() {
  // const users0 = await getUsers();
  // console.log("users0", users0.length);

  const filePath = "./files/all_users.json";
  const file = fs.readFileSync(filePath, "utf-8");
  const datas = JSON.parse(file) as [];
  const users = datas.map((item: any) => {
    return {
      walletAddress: item.walletAddress,
      tokenId: item.tokenId,
      code: item.code,
    };
  });
  const completedFile = fs.readFileSync(completeFilePath, "utf-8");
  const completedDatas = JSON.parse(completedFile) as [];
  const completedUsers = completedDatas.map((item: any) => {
    return {
      walletAddress: item.walletAddress,
      tokenId: item.tokenId,
      code: item.code,
    };
  });

  const unCompletedUsers = users.filter((item) => {
    return !completedUsers.find((completedItem) => {
      return (
        completedItem.walletAddress === item.walletAddress &&
        completedItem.tokenId === item.tokenId
      );
    });
  });
  // const reverseUsers = unCompletedUsers.reverse();
  console.log("unCompletedUsers", unCompletedUsers.length);
  transferToken(unCompletedUsers);
}

main();
