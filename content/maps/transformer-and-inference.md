---
title: "从注意力到 Transformer 与推理资源"
date: 2026-10-12
draft: false
tags: [foundations]
id: "0e502ceb-bb1a-4a27-b2c5-c8c320efdc99"
kind: map
maturity: developing
endorsement: ai-candidate
---

本地图回答两类相连的问题：模型如何计算下一 token 的分布，以及反复生成时如何复用状态、控制资源成本。架构事实、算术复杂度和实测性能分开阅读；AI 提出的顺序不代表用户已确认所有结论。

## Prerequisites

需要矩阵乘法、向量维度、概率归一化和对数。若希望理解训练目标，先读[交叉熵从最大似然产生的推导](../notes/probability-cross-entropy.md)；概率与拓扑的其他工具见[概率与网络地图](probability-and-networks.md)。

## Route

1. [QKV、因果掩码与多头](../notes/attention-qkv.md)：先把一次表示更新的输入、输出和连接范围算清。
2. [GPT 式生成的完整计算链](../notes/transformer-generation.md)：把嵌入、注意力、MLP、残差/LN、输出分布和采样串起来，区分训练与自由生成。
3. [KV 为何可复用](../notes/kv-cache-mechanism.md)：由因果性推出状态不变，再分别计算单步、全过程和存储成本。
4. [缓存优化减少的不同成本](../notes/kv-cache-optimization.md)：在机制明确后比较分页、共享、压缩、卸载与访问优化，避免互换性能指标。

## Branches

- **另一种连接结构：**[视频时空注意力](../notes/attention-spatiotemporal.md)以 token 数和连接范围解释联合/分解计算，非因果场景不自动满足 KV 复用前提。
- **另一种容量扩展：**[稀疏 MoE](../notes/moe-routing.md)改变参与计算的专家参数；它与注意力/KV 是不同成本项，不能互当替代方案。

## Evidence

[Transformer/视频/采样资料](../sources/foundations-transformer.md)、[KV 系统资料](../sources/foundations-kv-systems.md)和[Switch 资料](../sources/foundations-moe.md)均列出实际读取范围。没有来源或实验条件的性能倍数不构成比较依据。

## Open

[可检验的机制边界](../questions/foundations-validation.md)保留缓存等价性、成本模型与实际延迟的差距，以及分解结构的表示代价；先看理论条件，再决定测量什么。
