---
title: "CacheSmith：质量和时延约束下的自适应 KV 复用"
date: 2026-10-16
draft: false
tags: [inference, caching, systems]
id: "e8795d03-cb99-4057-8800-bab13c856b68"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
---

## Identity

Xinyue Ma、Damin Lee、Aashaka Shah、Myeongjae Jeon，*CacheSmith: Accurate RAG Serving under Latency SLOs with Adaptive KV Reuse*，arXiv:2610.18925 v1。首次提交 2026-10-13T00:19:23Z；2026-10-16 官方 history 仅 v1。窗口内新预印本、今日补查遗漏，未核正式发表。

[官方题录与版本](https://arxiv.org/abs/2610.18925)；[实读 v1 HTML](https://arxiv.org/html/2610.18925v1)。2026-10-16 实读 §2.1–2.2、§4、§5 开头式 (1)/5.1/5.3、§6.1 和 6.2 的 QSA/收益来源段。未核 PDF 图、源码或复现，不称全文已读。

## Evidence

- §2.1–2.2 区分精确的相同前缀复用与独立分块 KV 拼接；后者缺少跨块上下文，不能默认等同完整 prefill。
- §5 式 (1) 的 Quality SLO Attainment 是每个请求同时过 TTFT 与任务质量门槛的比例。它不是把两个边际达标率相乘或分别报告。
- §5.1 用离线需求分布代理规划复用/重算，包括 500 个合成 PassageRetrieval 请求；代理不构成每次在线输出正确性的保证。
- §6.1 采用任务相应的 exact match/F1；QCI 基线共用作者未调优的自实现内核。因此基线实现与阈值口径限制性能比较的外推。

## Support

[精确与近似 KV 复用](../notes/kv-cache-mechanism.md#approximate-reuse)整合机制边界；[服务目标](../notes/storage-latency-and-slo.md#joint-success)整合逐请求联合成功及独立教学反例。两篇复用已有解释，不另建同义机制笔记。

## Limits

没有复核离线代理的误差、任务分布漂移、每次输出事实正确性或实际部署；未独立比较所有实现，也不据指定部分声称无条件优于基线。教学集合例子属于知识笔记的 AI 推导，不是本文数据。
