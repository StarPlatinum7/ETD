"use strict";
exports.__esModule = true;
var transaction_json_1 = require("./transaction.json");
var collection_json_1 = require("./collection.json");
var unicom_nft_json_1 = require("./unicom_nft.json");
var Abis = /** @class */ (function () {
    function Abis() {
    }
    Abis._transactionAbi = transaction_json_1["default"].abi;
    Abis._collectionAbi = collection_json_1["default"].abi;
    Abis._collectionBytes = collection_json_1["default"].bytesCode;
    Abis._unicomNftAbi = unicom_nft_json_1["default"].abi;
    Abis._unicomNftBytesCode = unicom_nft_json_1["default"].bytesCode;
    return Abis;
}());
exports["default"] = Abis;
