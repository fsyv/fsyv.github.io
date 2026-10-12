---
title: "Kinesis：结构与在线选择相结合的放置"
date: 2026-10-12
draft: false
tags: [storage, papers]
id: "99a0995f-5b16-5157-a2e8-3aee3264e01e"
kind: source
maturity: seed
endorsement: ai-candidate
read_status: partial
---

## Identity

- 原标题：Kinesis
- 作者：John MacCormick; Nicholas Murphy; Venugopalan Ramasubramanian; Udi Wieder; Junfeng Yang; Lidong Zhou
- 年份与版本：2009；ACM Transactions on Storage。
- 正式 DOI：[10.1145/1480439.1480440](https://doi.org/10.1145/1480439.1480440)；身份核对：[出版商登记题录](https://api.crossref.org/works/10.1145/1480439.1480440)。
- 实际读取材料：[公开页面](https://www.cs.columbia.edu/~junfeng/papers/kinesis/)。

## Reading

2026-10-12 实际读取：作者论文页摘要与书目信息；另核对 Crossref 登记摘要，未读全文。 摘要及部分正文阅读不代表全文复核。

## Summary

**所读材料中作者的主张，以下为 AI 概括：**摘要提出故障隔离分段、根据当前资源选择服务器、伪随机分散副本三项原则，并报告理论、仿真和原型验证。

## Limits

摘要支持设计原则，不能替代扩容条件、具体算法与实验表的核验；这些结果也不是所有随机放置都更可靠的证明。

## Links

[支持：放置形状如何影响故障风险](../notes/storage-replica-reliability.md)。本资料在[存储与服务地图](../maps/storage-and-serving.md)中按阅读范围定位。
