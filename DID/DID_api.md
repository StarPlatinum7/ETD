## did_registry

#### registerName

```
function registerName(address identity, string calldata name) public onlyETD(msg.sender) 
```

| params   | explanation |
| -------- | ----------- |
| identity | 用户的DID   |
| name     | 注册的名称  |
|          |             |

- 调用`nameservice`合约的`setname`接口

> 返回：

## name_service

#### set_name

```
function setName(address identity, string calldata name) onlyETD(msg.sender) external {
```

| params   | explanation |
| -------- | ----------- |
| identity | 用户的DID   |
| name     | 注册的名称  |
|          |             |

- 为用户提供DID名服务，输入DID和名，进行关联
- 设置计时器限时

> 返回：

#### get_did

```
function get_did(address identity)public
```

| params | explanation |
| ------ | ----------- |
| name   | 注册的名称  |

> 返回：名对应的DID

## storage

#### changeStorageAuth

```
function changeStorageAuth(address identity, address newAuth) public onlyStorageOwner(identity)
```

| params   | explanation    |
| -------- | -------------- |
| identity | 用户的DID      |
| newAuth  | 新的storagekey |
|          |                |

- 改变`storagekey`存储访问的鉴权

> 返回：

#### getSotrageAuth

```
function getSotrageAuth(address identity) public view returns(address){
```

| params   | explanation |
| -------- | ----------- |
| identity | 用户的DID   |

- 返回该用户的`storageKey`

> 返回：address (存储访问鉴权)
#### verify_sig

```
function verify_sig(publickey,sig) public return(bool)
```

| params    | explanation               |
| --------- | ------------------------- |
| publickey | 用户DID中的存储部分的公钥 |
| sig       | 公钥对应的签名            |
|           |                           |

- 用户访问存储时验证签名，签名通过才可以进行存储空间的访问

> 返回：

#### data_change

```
function try_data_change(publickey,sig,data) public return(bool)
```

| params    | explanation               |
| --------- | ------------------------- |
| publickey | 用户DID中的存储部分的公钥 |
| sig       | 公钥对应的签名            |
| data      | 需要存储的数据            |

- 存储空间中提交小数据
- 该接口放出事件被监听到后写数据进存储空间

> 返回：

#### file_change

```
function try_file_change(publickey,sig，hash) public {}
```

| params    | explanation               |
| --------- | ------------------------- |
| publickey | 用户DID中的存储部分的公钥 |
| sig       | 公钥对应的签名            |
| hash      | 对大文件做哈希            |

- 存储空间中提交大数据
- 该接口放出事件被监听到后，后端对比哈希，将大文件写进存储空间

> 返回：

## proxy_wallet

> owner：用户DID
>
> 收款时合约直接接收token
>
> 发款时可以直接进行controller的转移（只有did的controller才能向transfer）

#### change_controller

```
function 
```

| params | explanation |
| ------ | ----------- |
|        |             |
|        |             |
|        |             |

- 改变代理合约（DID）的controller

> 返回：