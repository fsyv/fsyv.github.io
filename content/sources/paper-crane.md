---
title: "CRANE：副本迁移过程的调度"
date: 2026-10-12
draft: false
tags: [storage, papers]
id: "a8a0f809-e4ce-5bda-ace4-81ccbae460d6"
kind: source
maturity: developing
endorsement: ai-candidate
read_status: partial
---

## Identity

- 原标题：On Optimizing Replica Migration in Distributed Cloud Storage Systems
- 作者：Amina Mseddi; Mohammad Ali Salahuddin; Mohamed Faten Zhani; Halima Elbiaze; Roch H. Glitho
- 年份与版本：2015；arXiv v1；arXiv 预印本。
- 实际读取材料：[预印本摘要页](https://arxiv.org/abs/1509.01330v1)与[v1 PDF](https://arxiv.org/pdf/1509.01330v1)。首次提交：2015-09-04T02:21:30Z。

## Reading

2026-10-12：摘要与题录。2026-10-14 增量阅读：PDF p.1 身份、§III–V（pp.2–6）、§VI（pp.6–7）指定部分，视觉核对 p.5 公式；未独立复证整个 ILP、实现与仿真，状态仍为 partial。

## Summary

**所读材料中作者的主张，以下为 AI 概括：**CRANE 接受已有副本放置目标，管理复制过程，兼顾创建时间、网络拥塞和迁移期间的最低可用性。

## Evidence

- §IV.B：完整副本创建后，新节点才能用于后续复制，支持迁移序列具有状态依赖。
- §V 开头：每个迁移序列结束后更新布局并重定向请求，支持显式区分复制与路由切换。
- §VI：评估迁移时间、跨数据中心传输量和副本可用性；不直接提供逐请求尾时延证据。

## Limits

式 (15) 的副本计数与评估所用比例之间，仍需说明单位与归一化口径，不将其判为错误或已验证约束。写入版本追赶、切换原子性、失败重试与迁移期逐请求 SLO 仍未完成核验。作者的可用性/调度结果不能直接当作应用请求时延保证。

## Links

[联系：放置、路由与迁移的决策边界](../notes/storage-placement-and-migration.md)。本资料在[存储与服务地图](../maps/storage-and-serving.md)中按阅读范围定位。
