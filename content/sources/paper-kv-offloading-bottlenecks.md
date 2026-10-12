---
title: "KV 卸载中的互连瓶颈"
date: 2026-10-12
draft: false
tags: [llm-serving, papers]
id: "011a31eb-4c9a-5ceb-a5ef-5289593584d4"
kind: source
maturity: seed
endorsement: ai-candidate
read_status: partial
---

## Identity

- 原标题：Understanding Bottlenecks for Efficiently Serving LLM Inference With KV Offloading
- 作者：William Meng; Benjamin Lee; Hong Wang
- 年份与版本：见下方提交日期差异；arXiv v1；arXiv 预印本。
- 实际读取材料：[预印本摘要页](https://arxiv.org/abs/2601.19910v1)。

## Reading

2026-10-12 实际读取：arXiv v1 摘要、题录和提交历史，未读正文。摘要页标提交 2025-12-16，标识符为 2601.19910；本次不解释两者差异。 摘要及部分正文阅读不代表全文复核。

## Summary

**所读材料中作者的主张，以下为 AI 概括：**作者研究 CPU DRAM 卸载受 PCIe 传输制约的问题，提出缓存 token 与 prefill token 比例的临界分析框架。

## Limits

未核验阈值推导、模型参数或测量设置。页面注明 Submitted to MLSys 2026，不等于已录用；不能将个别测量比例推广到所有推理。

## Links

[联系：容量、传输和执行效率的成本分类](../notes/kv-cache-optimization.md)。本资料在[存储与服务地图](../maps/storage-and-serving.md)中按阅读范围定位。
