import openpyxl
from web3 import Web3
import json

with open('../etd-did/artifacts/contracts/DIDEtd.sol/DIDETDRegistery.json') as f:
    contract_data = json.load(f)
    contract_abi = contract_data['abi']
    contract_bytecode = contract_data['bytecode']

w3 = Web3(Web3.HTTPProvider('http://119.13.77.176:8547'))

# 私钥
private_key = "51c17d02af69ec2020ef1e078f60d369aaec099c103f80a9f1b9221811628c6e"  # 替换为你的私钥

# 发送交易的账户地址
account = "0x8ec87Bf4878B2875a1FB63Da5e5b3E96d8a076Bd"
# 构建交易参数
gas_price = w3.eth.gas_price
gas_limit = 5000000

#-------------------------
#部署合约，并且返回合约地址
#-------------------------

#构建合约对象
contract = w3.eth.contract(abi=contract_abi, bytecode=contract_bytecode)

# 构建部署交易
deploy_txn = contract.constructor(account).build_transaction({
    'from': account,
    'chainId': 3101,
    'gas': gas_limit,
    'gasPrice': gas_price,
    'nonce': w3.eth.get_transaction_count(account),
})

# 使用私钥进行交易签名
signed_txn = w3.eth.account.sign_transaction(deploy_txn, private_key)

# 发送部署交易
tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)

# 等待交易被打包并获取合约地址
tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash,timeout=600000)
contract_address = tx_receipt['contractAddress']

print(f"合约已部署到地址: {contract_address}")

#-------------------------
#调用合约函数creatproxywallet
#-------------------------

contract_deployed = w3.eth.contract(address=contract_address, abi=contract_abi)
creatproxywallet_txn = contract_deployed.functions.createProxyWallet().build_transaction(
    {
        'from': account,
        'chainId': 3101,
        'gas': gas_limit,
        'gasPrice': gas_price,
        'nonce': w3.eth.get_transaction_count(account),
    }
)
signed_txn = w3.eth.account.sign_transaction(creatproxywallet_txn, private_key)
tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash,timeout=600000)
print(f"creatproxywallet交易已发送,交易哈希为: {tx_hash.hex()}")
# # 捕获异常，获取错误消息
# error_message = str(ValueError)
# print(f"Smart contract error: {error_message}")
print(f"代理合约地址: {contract_deployed.functions.getProxyWallet(account).call()}")

