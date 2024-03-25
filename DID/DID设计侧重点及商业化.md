> 参考PolygonID      
>
> https://devs.polygonid.com/docs/quick-start-demo/
>
> https://docs.polygon.technology/
>
> https://github.com/0xPolygonID

### 开发侧重点（PolygonID）：

- 隐私保护： zero-knowledge (ZK) 零知识加密技术？？？
  -  ZK：
    - 保护隐私：用户（身份持有者）可以将凭证内任何信息的证明发送给验证者（dApp），而无需透露凭证内的信息。 在**选择性披露**模式下，用户还可以选择他想要共享凭证内的哪些信息（无需选择整个凭证）。 在共享此信息的同时，他还发送了有关此信息的证明，以便验证者可以检查其正确性。
    - 计算验证：零知识证明可用于证明计算已正确执行，而验证者无需重新计算。 例如，在 Polygon ID 中，它用于证明身份正在正确执行状态转换。
  - 本地数据库？：（推广到ETD_DID的）
- 去中心化：区块链的设计理念，推动web3
-  W3C 标准的可验证凭证 (vc)
- 构建信任：
  -  issuer在真实世界中有公信力
  -  加密：证明发行验证的凭证没有被更改
- 使用：在polygonid的app中：
  - issuer： the Issuer Node UI 创建颁发凭证
    - 凭证存储：本地数据库，外部安全存储
  - id holder：app中扫码等方式进行凭证的发放
    - 本地数据库管理身份快速访问
    - ZK：选择性披露
  - verifier： Visit the Verifier website 
    - ZK

### 商业化：

- DID生态建设：issuer等的参与
- 提供个性化的身份方案服务
  - 企业，金融机构的去中心化身份验证，存储以及管理

- 零知识证明技术的推广应用
- 开源SDK等共同开发

- 用户费用：
  - 取决于gas以及加密货币的价格