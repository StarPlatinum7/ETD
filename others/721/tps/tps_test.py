from web3 import Web3
import time

# 以太坊节点的连接信息
w3 = Web3(Web3.HTTPProvider('http://119.13.77.176:8547'))

# 发送交易的账户私钥（用于签名交易）
sender_private_key = '51c17d02af69ec2020ef1e078f60d369aaec099c103f80a9f1b9221811628c6e'

# 发送交易的账户地址
sender_address = '0x8ec87Bf4878B2875a1FB63Da5e5b3E96d8a076Bd'

# 接收交易的账户地址
receiver_address = '0x8ec87Bf4878B2875a1FB63Da5e5b3E96d8a076Bd'

# 要发送的以太币数量（以 Wei 为单位）
amount_in_wei = Web3.to_wei(0.01, 'ether')

# 测试持续时间（秒）
test_duration = 60*5  # 一分钟

# 开始时间
start_time = time.time()

# 初始化计数器
transaction_count = 0

nonce = w3.eth.get_transaction_count(sender_address)
start_block = w3.eth.block_number

while True:
    try:
        # 交易参数
        transaction_params = {
            'chainId': 3101,
            'to': receiver_address,
            'value': amount_in_wei,
            'gas': 21000,  # 以太坊标准交易的 gas 限制
            'gasPrice': w3.eth.gas_price,  # gas 价格（可根据网络情况调整）
            # 获取当前 nonce 值
            'nonce': nonce,
        }
        nonce+=1
        # 使用私钥签名交易
        signed_transaction = w3.eth.account.sign_transaction(
            transaction_params, sender_private_key)

        # 发送交易
        tx_hash = w3.eth.send_raw_transaction(
            signed_transaction.rawTransaction)

        # 打印交易哈希
        print("Transaction Hash:", tx_hash.hex())

        # 更新计数器
        transaction_count += 1

    except Exception as e:
        print(f"An error occurred: {str(e)}")

    # 检查测试持续时间
    current_time = time.time()
    if current_time - start_time >= test_duration:
        break

# 计算 TPS


print(f"Total Transactions Sent: {transaction_count}")

# 获取一分钟内的所有区块
end_block = w3.eth.block_number

# 统计一分钟内的总交易数量
total_tx_count = 0
for block_number in range(end_block-7, end_block + 1):
    block = w3.eth.get_block(block_number)
    total_tx_count += len(block['transactions'])

print(f"Total Transactions in One Minute (Block Count): {total_tx_count}")
#打印一分钟一共有几个区块
print(f"Total Blocks in One Minute (Block Count): {end_block-start_block}")
tps = total_tx_count / 60
print(f"Transactions Per Second (TPS): {tps}")
