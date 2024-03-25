# DID

## ETH_DID



# 整体结构

1. 一个DID唯一对应一个DID_Document
   1. https://www.w3.org/TR/did-core/
2. 任意的公钥默认对应一个DID，该DID的controller在未修改时默认是这个公钥

# 存储

- DID包含一个存储空间，该存储空间的身份钥匙在未修改时默认为对应公钥
- DID访问存储时，提供DID_STORAGE对应公钥的签名
  - 更新相关存储字段时，也以该公钥的签名作为身份认证
  - 该公钥可以由于DID_controller变更
- 对于存储数据的更新
  - 预定义格式
  - 原始数据通过链下方式访问storj服务存储
    - 存储数据需要包含，DID_Storage的权限签名
    - 原始数据对应的hash需要先通过合约事件上链，供storj存储时校验
      - 1. 校验签名，数据合法
        2. 校验hash，数据正确

- 继承合约  w3c的标准已经实现了
- 用时间事件的方式进行存储
- sdk
  - did文档：搜索全部的事件，聚合成一个did文档

存储：数据内容，现在

绑定存储：给did一个service属性：把自己的：通过别人的

流程：

- 定义一个密钥：document里storj（存储的服务）使用did登录
  - did作为用户名-----did document-------初始对应公钥的签名，匹配之后及进行授权

确认数据有限：校验的字段

- json文档：做一个hash---->

storjserve需要一个合约：完成脸上链下的

- 中心化的服务用来监听相关的event：存，变更等等

# 代理钱包

- 合约地址，payable，可以用来收款
  - 原生
  - erc20
  - NFT
  - ...
- transfer的动作由controller执行 
  - 代理钱包的“交易”权限，绑定到DID_controller

希望签报是did的属性

合约的did的controller进行变更

# 名

- 一个DID，唯一对应一个“名”，不同于ENS

- 费用？？？参考ENS：申请域名要交钱，域名到期交钱
- 域名转移在

did注册合约

存储的合约

nameservice

自测？review？pr的形式？现在的版本