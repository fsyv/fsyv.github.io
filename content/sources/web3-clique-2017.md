---
title: "Szilágyi（2017）：Clique 的授权与签名轮次"
date: 2026-10-12
draft: false
tags: [web3, foundations]
id: "18949756-375a-410d-bd98-4d0cfbc40d70"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
---

## 资料

Péter Szilágyi，*EIP-225: Clique proof-of-authority consensus protocol*，创建于 2017-03-06。[EIP 正式页面](https://eips.ethereum.org/EIPS/eip-225)。

## 本轮读取

2026-10-12 读取 Motivation、Design constraints、Attack vectors、Specification 中 Authorizing a block 与 Voting on signers。材料说明授权签名者列表可以通过投票变化；限制连续签块频率；in-turn/out-of-turn 具有不同分值与传播策略。

## 局限与关联

这是 Clique 这一具体协议的设计，不代表所有 PoA 实现，更不能推出“任一授权节点故障都会停链”。没有验证当前客户端支持情况，不据此推荐部署旧测试网。支持[共识假设与许可治理](../notes/web3-consensus-assumptions.md)。
