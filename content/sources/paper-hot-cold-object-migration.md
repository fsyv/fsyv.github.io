---
title: "冷热对象的复制、读路由与迁移"
date: 2026-10-12
draft: false
tags: [storage, papers]
id: "1ea84350-cf49-5f10-a292-45bc477700cb"
kind: source
maturity: seed
endorsement: ai-candidate
read_status: partial
---

## Identity

- 原标题：Dynamic replication and migration of data objects with hot-spot and cold-spot statuses across storage data centers
- 作者：Yaser Mansouri; Rajkumar Buyya
- 年份与版本：2019；Journal of Parallel and Distributed Computing。
- 正式 DOI：[10.1016/j.jpdc.2018.12.003](https://doi.org/10.1016/j.jpdc.2018.12.003)；身份核对：[出版商登记题录](https://api.crossref.org/works/10.1016/j.jpdc.2018.12.003)。
- 实际读取材料：[作者公开 PDF](https://clouds.cis.unimelb.edu.au/papers/DataStorageClouds-JPDC.pdf)。

## Reading

2026-10-12 实际读取：作者公开正式 PDF，摘要、第 1 节、§3.1 及 §3.2 成本模型开头（121—125 页，至 Put 成本部分）；未读完后续迁移公式、约束和第 4—6 节。 摘要及部分正文阅读不代表全文复核。

## Summary

**所读材料中作者的主张，以下为 AI 概括：**论文联合决定副本落点、读请求路由和迁移时机；成本包含创建、存储、Get、Put 与迁移。离线方案假设已知未来，摘要另述轻量启发式。

## Limits

冷热是访问状态，成本模型还含写传播。未完整核验启发式、迁移协议和实验；不能把历史云价当成当前价格。

## Links

[联系：放置、路由与迁移的决策边界](../notes/storage-placement-and-migration.md)。本资料在[存储与服务地图](../maps/storage-and-serving.md)中按阅读范围定位。
