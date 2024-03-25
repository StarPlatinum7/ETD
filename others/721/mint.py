
from web3 import Web3
# 导入abi.py
from data.abi import contract_abi
from data.data_gangshen import data_array
from data.data_gangshen import contract_add

w3 = Web3(Web3.HTTPProvider('http://119.13.77.176:8547'))

# 私钥
private_key = "51c17d02af69ec2020ef1e078f60d369aaec099c103f80a9f1b9221811628c6e"  # 替换为你的私钥

# 发送交易的账户地址
account = "0x8ec87Bf4878B2875a1FB63Da5e5b3E96d8a076Bd"  # 替换为你的账户地址

# 构建交易参数
gas_price = w3.eth.gas_price
gas_limit = 5000000

# 循环100次
for j in range(0, 1, 1):
    contract_address = contract_add[j]
    contract = w3.eth.contract(address=contract_address, abi=contract_abi)

    balance = contract.functions.balanceOf(account).call()
    num =(5000-balance)/25

    for i in range(0, int(num), 1):
        params = {
            'chainId': 3101,
            'gas': gas_limit,  # 适当设置足够的 gas
            'gasPrice': gas_price,
            'nonce': w3.eth.get_transaction_count(account),
        }
        func = contract.functions.mintNFT(
            data_array[j][0], data_array[j][1], data_array[j][2], data_array[j][3], data_array[j][4])
        transaction = func.build_transaction(params)

        # 签名交易
        signed_txn = w3.eth.account.sign_transaction(
            transaction, private_key=private_key)

        # 发送交易
        tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
        print("Transaction Hash:", tx_hash.hex())
        # 等待上一笔交易完成
        w3.eth.wait_for_transaction_receipt(tx_hash, timeout=600000)
    print(str(j+1)+" contract"+" batch sent.")
    balance_result = contract.functions.balanceOf(account).call()
    print("Balance:"+str(j+1), balance_result)


print("All batches sent.")
