---
title: "Kelle：KV 缓存与 eDRAM 协同设计"
date: 2026-10-12
draft: false
tags: [llm-serving, papers]
id: "b37f1600-00d3-5f58-a42e-68be23c35f78"
kind: source
maturity: seed
endorsement: ai-candidate
read_status: partial
---

## Identity

- 原标题：Kelle: Co-design KV Caching and eDRAM for Efficient LLM Serving in Edge Computing
- 作者：Tianhua Xia; Sai Qian Zhang
- 年份与版本：2025；Proceedings of the 58th IEEE/ACM International Symposium on Microarchitecture。
- 正式 DOI：[10.1145/3725843.3756071](https://doi.org/10.1145/3725843.3756071)；身份核对：[出版商登记题录](https://api.crossref.org/works/10.1145/3725843.3756071)。
- 实际读取材料：[预印本摘要页](https://arxiv.org/abs/2510.16040v1)。

## Reading

2026-10-12 实际读取：arXiv v1（2025-10-16）摘要；MICRO 2025 正式 DOI 与作者由 Crossref 核对，未读正文。 摘要及部分正文阅读不代表全文复核。

## Summary

**所读材料中作者的主张，以下为 AI 概括：**作者以 eDRAM 的密度优势缓解边缘 KV 容量压力，并联合细粒度驱逐、重计算和刷新控制，减少维护开销。

## Limits

eDRAM 刷新属于存储介质维护，不能等同于分布式副本的一致性。未核验精度条件、硬件面积或能耗数据。

## Links

[联系：容量、传输和执行效率的成本分类](../notes/kv-cache-optimization.md)。本资料在[存储与服务地图](../maps/storage-and-serving.md)中按阅读范围定位。
