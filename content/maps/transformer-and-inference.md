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
4. [缓存优化减少的不同成本](../notes/kv-cache-optimization.md)：在机制明确后比较分页、共享、压缩、卸载与访问优化；放置受控微基准说明计时边界，再用[远程加载与重算](../notes/kv-cache-optimization.md#remote-load-or-recompute)检查有效带宽和固定开销是否使命中值得兑现。
5. [跨调用驻留与可访问性](../notes/kv-cache-optimization.md#residency-and-accessibility)：再区分闲置时限、量化表示、路由身份及重建调用率，避免将 pooled 容量回放视为真实每副本/时延/质量结论。
6. [逐请求质量与时延联合成功](../notes/storage-latency-and-slo.md#joint-success)：在理解精确与近似复用之后，判断节省计算是否同时达到任务质量和 TTFT 目标；两个边际通过率不能替代交集。

## Branches

- **另一种连接结构：**[视频时空注意力](../notes/attention-spatiotemporal.md)先以 token 数和连接范围解释联合/分解，再读[固定稀疏图的物理执行](../notes/attention-spatiotemporal.md#physical-execution)中页压实、tile 和掩码；减少连接与减少填充分别评价，非因果场景不自动满足 KV 复用前提。
- **另一种容量扩展：**[稀疏 MoE](../notes/moe-routing.md)改变参与计算的专家参数；它与注意力/KV 是不同成本项，不能互当替代方案。

- **执行中的另一项容量：**[张量存活与峰值内存](../notes/tensor-liveness-and-peak-memory.md)解释为何相同总分配仍有不同峰值，以及 allocator 怎样破坏逻辑模型；不是 KV 服务已验证。
- **训练生命周期的边界对照：**[激活压缩与换出规划](../notes/tensor-liveness-and-peak-memory.md#compression-and-offload)研究 forward/backward 之间的保存与重算；表示、传输和排程必须联合评价，不从压缩比推出训练加速或推理 KV 收益。

**恢复分支：**在精确复用与跨调用驻留之后，读[选择性KV重建](../notes/kv-cache-optimization.md#selective-reconstruction)，分开raw历史省略、共享预测器净成本、均值风险和局部恢复计时；不把512token小模型恢复结果写成生产无线迁移或长期decode净省。

## Evidence

[Transformer/视频/采样资料](../sources/foundations-transformer.md)、[KV 系统资料](../sources/foundations-kv-systems.md)和[Switch 资料](../sources/foundations-moe.md)均列出实际读取范围。没有来源或实验条件的性能倍数不构成比较依据。

[Grace-Blackwell 微基准](../sources/paper-grace-blackwell-unified-memory.md)和[CacheSmith](../sources/paper-cachesmith.md)是 2026-10 的预印本指定部分阅读；前者不验证 LLM KV 服务，后者的离线代理不保证每次输出正确，两者未在本库复现。

[远程 KV 加载与重算](../sources/paper-remote-kv-load-or-recompute.md)补充选择性准入的一阶门槛及对照边界；其单点拟合、单次服务测量不构成跨长度通用阈值。与[对象大小下的命中目标](../notes/probability-zipf.md#object-size-and-objective)相似之处是命中指标要回到资源和服务目标；对象语义及模型尚不等价。

## Open

[可检验的机制边界](../questions/foundations-validation.md)保留缓存等价性、成本模型与实际延迟的差距，以及分解结构的表示代价；先看理论条件，再决定测量什么。
