---
title: "异步预取 KV：用计算覆盖访存等待"
date: 2026-10-12
draft: false
tags: [llm-serving, papers]
id: "a6ceef45-5de4-53ac-ae39-0e31c32f48a4"
kind: source
maturity: seed
endorsement: ai-candidate
read_status: partial
---

## Identity

- 原标题：Accelerating LLM Inference Throughput via Asynchronous KV Cache Prefetching
- 作者：Yanhao Dong; Yubo Miao; Weinan Li; Xiao Zheng; Chao Wang; Jiesheng Wu; Feng Lyu
- 年份与版本：2025；arXiv v2；arXiv 预印本。
- 实际读取材料：[预印本摘要页](https://arxiv.org/abs/2504.06319v2)。

## Reading

2026-10-12 实际读取：arXiv v2（2025-11-08）摘要与版本记录，未读正文。 摘要及部分正文阅读不代表全文复核。

## Summary

**所读材料中作者的主张，以下为 AI 概括：**作者利用计算期间的闲置带宽把 KV 预取至 GPU L2，使后续访问命中缓存，隐藏 HBM 访问等待。

## Limits

摘要的评估平台为 NVIDIA H20；预取隐藏等待，不代表物理带宽增加。未核验容量分析、指令细节或端到端收益。

## Links

[联系：容量、传输和执行效率的成本分类](../notes/kv-cache-optimization.md)。本资料在[存储与服务地图](../maps/storage-and-serving.md)中按阅读范围定位。
