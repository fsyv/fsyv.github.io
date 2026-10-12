---
title: "W3C：DID 与可验证凭证的数据和信任模型"
date: 2026-10-12
draft: false
tags: [web3, foundations]
id: "9ccfa94e-6914-43d3-8af7-467fc4d302ce"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
---

## 资料与读取范围

- W3C DID Working Group，[*Decentralized Identifiers (DIDs) v1.0*](https://www.w3.org/TR/did/)，2022 年 Recommendation。本轮读取第 1 节及 1.1–1.3 的标识符、DID document、设计目标和架构概述；未逐项审查各 DID method。
- W3C Verifiable Credentials Working Group，[*Verifiable Credentials Data Model v2.0*](https://www.w3.org/TR/vc-data-model-2.0/)，2025-05-15 Recommendation。读取摘要、第 1.1–1.2 节、第 2 节 verification/validation 与 selective disclosure 定义、4.7 issuer 示例。未审查所有安全机制与测试套件。

读取日期：2026-10-12。标准中的非规范说明与规范要求应区别使用。

## 可定位证据

DID 第 1 节明确不预设底层技术，也允许中心化、联邦式系统提供 DID 支持，因而 DID 不必使用区块链。VC 第 1.1 节明确：可验证不等于声明为真；第 2 节将验证密码学真实性与按业务规则判断是否接受分开。持有者也不总等于声明主体。选择性披露与不可关联披露是不同能力。

## 局限与关联

这些规范不能单独证明某个发行者可靠、某个系统匿名，或凭证在任意场景有效。支持[身份与授权的完整链路](../notes/web3-identity-and-authorization.md)，也约束[Web3 信任判断](../notes/web3-trust-and-ownership.md)。
