---
title: "IPFS 官方文档：内容标识、持久化与隐私"
date: 2026-10-12
draft: false
tags: [web3, foundations]
id: "9819927b-f2d7-42d2-b7da-7c5f6d99e3d8"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
---

## 资料与读取范围

作者为 IPFS 文档贡献者，持续更新；读取日期：2026-10-12。读取网页正文的以下范围：

- [What is IPFS](https://docs.ipfs.tech/concepts/what-is-ipfs/)：Defining IPFS、What IPFS isn't。协议和节点网络不等于存储提供商。
- [Content Identifiers](https://docs.ipfs.tech/concepts/content-addressing/)：What is a CID、How CIDs are created、CIDs are not file hashes、Same file, different CIDs。CID 包含编码信息，分块与 DAG 布局会影响结果。
- [Persistence, permanence, and pinning](https://docs.ipfs.tech/concepts/persistence/)：Persistence versus permanence、Garbage collection、Long-term storage、Filecoin。pinning 避免特定节点垃圾回收，长期存储仍需资源投入。
- [Privacy and encryption](https://docs.ipfs.tech/concepts/privacy-and-encryption/)：正文的 What’s public on IPFS、Content identifiers、Node identifiability、Encryption；传输加密不等于内容加密，DHT 中提供者与 CID 的元数据可能公开。未审计协议隐私性质或各客户端实现。

## 支持与局限

支持[内容寻址、持久化和链外信任的区别](../notes/web3-content-addressing.md)。没有测量全球网络可用性、检索时延、丢失率或服务商质量；不能据此给出“五个九”的保证。IPFS 与 Filecoin 关联但可分离，代币激励不是 IPFS 协议自带的必要条件。
