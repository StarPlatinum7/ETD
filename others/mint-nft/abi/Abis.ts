import transaction from "./transaction.json";
import collection from "./collection.json";
import unicomNft from "./unicom_nft.json";
export default class Abis {
  static _transactionAbi = transaction.abi;

  static _collectionAbi = collection.abi;
  static _collectionBytes = collection.bytesCode;

  static _unicomNftAbi = unicomNft.abi;
  static _unicomNftBytesCode = unicomNft.bytesCode;
}
