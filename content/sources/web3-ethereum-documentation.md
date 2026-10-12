---
title: "Ethereum 官方文档：应用、共识、扩容与预言机"
date: 2026-10-12
draft: false
tags: [web3, foundations]
id: "e12eaca5-db0b-4917-900c-6011131bf24d"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
---

## 资料与读取范围

作者为 ethereum.org 文档贡献者，页面持续更新；读取日期为 2026-10-12。实际读取以下网页的指定小节，不代表阅读全文或核验所有链接、实现与性能数据。

| 材料 | 实际读取位置 | 本库使用范围 |
| --- | --- | --- |
| [Introduction to Web3](https://ethereum.org/web3/) | What is Web3、Core ideas、Ownership、DAO，以及局限入口 | 解释该生态的 Web3 愿景；愿景不作为所有应用已实现的事实 |
| [Technical introduction to dapps](https://ethereum.org/developers/docs/dapps/) | 定义、前端与合约关系 | 区分界面、链上逻辑与外部服务 |
| [Consensus mechanisms](https://ethereum.org/developers/docs/consensus-mechanisms/) | 完整机制、PoW、PoS、Sybil resistance & chain selection | 抗女巫与链选择是不同职责；PoS 提议者采用协议选择，并非最高质押者必胜 |
| [Scaling](https://ethereum.org/developers/docs/scaling/) | Scaling overview、Onchain、Offchain、Rollups、State channels、Sidechains | 扩容的验证与安全依赖；未评估具体项目 |
| [Oracles](https://ethereum.org/developers/docs/oracles/) | 定义、oracle problem、正确性/可用性/激励 | 链上执行依赖链外输入质量 |
| [DAOs](https://ethereum.org/dao/) | What are DAOs、How do DAOs work、Delegation | 提案、投票、合约执行的组织机制 |
| [DeFi](https://ethereum.org/defi/) | 页面简介、What's DeFi、对照表 | 金融服务的链上可组合接口，不作收益或安全建议 |

## 证据边界

这是项目自身文档，解释接口与机制具有直接性，但也包含倡导性和理想化表述。有关“无停机”“不需要信任”“完全所有权”等措辞不能脱离前端、管理员权限、数据可用性与现实权利条件使用。本轮没有运行节点、审计合约、比较 TPS 或测量能耗。

## Links

支持：[Web3 的信任边界](../notes/web3-trust-and-ownership.md)、[请求路径](../notes/web3-request-lifecycle.md)、[共识假设](../notes/web3-consensus-assumptions.md)、[扩容](../notes/web3-scaling-security.md)、[链外数据](../notes/web3-content-addressing.md)与[资产治理](../notes/web3-assets-and-governance.md)。
