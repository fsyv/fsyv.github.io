---
title: "Nuska：分离推理的阶段感知通信调度"
date: 2026-10-12
draft: false
tags: [llm-serving, papers]
id: "200d5be2-8bb1-5f9e-a2e1-fa7cf84cea49"
kind: source
maturity: seed
endorsement: ai-candidate
read_status: partial
---

## Identity

- 原标题：Stage-Aware Communication Scheduling for Disaggregated LLM Serving
- 作者：Yijun Sun; Xudong Liao; Songrun Xie; Hao Chen; Han Tian; Wenxue Li; Yiming Zhang; Kai Chen（按摘要页明确列举）
- 年份与版本：2026；arXiv v2；arXiv 预印本。
- 实际读取材料：[预印本摘要页](https://arxiv.org/abs/2603.17456v2)。

## Reading

2026-10-12 实际读取：arXiv v2（2026-09-19）摘要和版本记录，未读正文。首版 2026-03-18。 摘要及部分正文阅读不代表全文复核。

## Summary

**所读材料中作者的主张，以下为 AI 概括：**当前版本把 KV 取回、集合通信和 prefill-to-decode 传输视为有依赖的阶段，用反向多级队列近似最小松弛度优先，以改善 TTFT SLO。

## Limits

本页按当前题名与 Nuska 机制记录；不混用旧版题名。摘要页作者简述人数与列举表不一致，作者表以明确列举为准，证明与实验待全文核验。

## Links

[支持：平均时延、尾概率与 SLO 的不同口径](../notes/storage-latency-and-slo.md)。本资料在[存储与服务地图](../maps/storage-and-serving.md)中按阅读范围定位。
