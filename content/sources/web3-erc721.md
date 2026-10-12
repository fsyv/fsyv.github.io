---
title: "Entriken 等（2018）：ERC-721 表达的所有权与授权"
date: 2026-10-12
draft: false
tags: [web3, foundations]
id: "ce6dd90b-9cdf-4021-8517-c0c904a7d976"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
---

## 来源与读取

William Entriken、Dieter Shirley、Jacob Evans、Nastassia Sachs，*ERC-721: Non-Fungible Token Standard*，2018。[标准页面](https://eips.ethereum.org/EIPS/eip-721)。2026-10-12 读取 Summary/Abstract、Specification 的 ownerOf、转移与授权接口，以及 metadata extension 和相关隐私讨论。未审计具体 NFT 合约。

## 证据边界

该标准把 token ID 关联到账户，并定义查询、授权与转移接口；元数据属于扩展。技术接口未提供作品版权、链外文件永久性或其他应用必然接受该 token 的保证。这里后几项是接口范围分析，不是法律意见。

支持[资产与治理边界](../notes/web3-assets-and-governance.md)。
