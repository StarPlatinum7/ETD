## 流程设计

### 存储合约

`storage`

主要用来变更存储key???

将自己在`dapp`上的数据存储在自己绑定的存储空间内

- 存储空间访问：`publickey`进行登陆验证（存储拿到这个公钥之后会需要我们出示一个这个公钥对应的一个签名）,通过之后就可以访问存储空间了

- 检索did_document：链上检索document的时候的数据放在数据库或其他文档里，event更新进行文档。进行hash校验来确保我的文档的确真实（**校验服务**）

- storyjserve：存储据时，
  - 小数据：在合约中提交数据，合约放出来一个事件，再被事件的监听服务听到，听到事件之后再将数据写入存储空间中
  - 大数据：
    - 对整个大文件做一个hash，用这个hash跟存储服务的合约进行交互，通过合约把hash值放出来被时事件服务进行监听。
    - 同时源文件上传到storj，storyj对其做一个hash，通过与上面监听到的hash进行对比从而确定文件就是我要存的文件
    - 两边做超时

### 代理钱包合约

`proxywallet`

- 合约的owner是did，在进行收款的时候合约接收token，再向外进行转账的时候变更。只有did的controller才能向外transfer（收款时候不是单单把wallet里面的币进行转账，而是通过改woner直接把wallet进行转手）

- 接受时，接收方创建一个私钥，创建一个publickey，将其写在did上，将自己变成controller 从而可以控制wallet，完成交易

### 名服务

`nameservice`

- 类似于ENS的服务
- 商业化运营的时候需要有一个域名生命周期的管理（合约实现）

```
合约结构：
	did_regester合约
	name_service合约
	storage合约
```

