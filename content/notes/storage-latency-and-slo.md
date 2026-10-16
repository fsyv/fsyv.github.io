---
title: "平均时延、尾部概率与服务目标分别回答什么？"
date: 2026-10-12
draft: false
tags: [storage, systems]
id: "648a48e5-4264-4b49-b08b-6d9c973daebf"
kind: note
maturity: developing
endorsement: ai-candidate
math: true
---

**判断归属：AI 候选解释。** 算术例子是示意，不是论文实验。

## Different-questions

平均时延描述总体等待成本，尾部概率描述超出某个阈值的机会，服务目标还需指定测量起点、终点与允许的违约比例。降低一个指标不自动保证另一个。

例如 99% 的请求耗时 1 毫秒、1% 耗时 101 毫秒，均值是 2 毫秒；若目标是 100 毫秒以内完成，仍有 1% 违约。只报告均值会隐藏这群请求。反过来，降低长尾可能需要额外副本或备用资源，成本未必同时下降。

## Storage-objectives

[纠删码平均时延工作摘要](../sources/paper-erasure-coded-latency-cost.md)联合选择编码、块放置与调度，目标含平均服务时延和存储成本。[尾时延工作摘要](../sources/paper-erasure-coded-tail-latency.md)改为分析尾概率并优化文件落点及服务器选择。它们支持区分优化对象；本次未读证明，不能把平均上界解释为尾部保证，也不能默认两篇采用完全相同的模型。

**AI 推论：**多个块共同完成一次请求时，请求完成取决于所需块的到达条件。块级均值、整请求均值与整请求超时率应分开测量；调度、排队和共享资源可能改变它们的关系。具体纠删码需要多少块、如何取块，要回到系统模型确认。

## End-to-end

服务目标还涉及依赖链。[Nuska 当前版本摘要](../sources/paper-stage-aware-communication.md)讨论 KV 取回、集合通信与 prefill-to-decode 传输的阶段依赖，共享瓶颈上的竞争会影响首 token 目标。一次传输先结束，并不保证整个请求及时完成。

从而，链路吞吐、GPU 算子吞吐与首 token 延迟不能直接换算为同一项“系统加速”。[KV 优化成本分类](kv-cache-optimization.md)提供前置区分：容量、有效数据量、交互等待和执行效率改变不同成本项。

## Joint-success

**2026-10-16 新增 AI 候选解释。** 对近似复用的 RAG，请求既要及时，也要达到任务质量门槛。[CacheSmith §5 式 (1)](../sources/paper-cachesmith.md)把 quality-gated SLO attainment（QSA）定义为逐请求同时满足两者的比例。用 $\ell_i$ 表示 TTFT、$z_i$ 表示任务质量，门槛分别为 $\tau_i,\gamma_i$，可重写为

$$
\mathrm{QSA}=\frac1n\sum_{i=1}^{n}\mathbf1[\ell_i\le\tau_i\ \land\ z_i\ge\gamma_i].
$$

教学反例：四个请求中，及时集合为 $\{1,2\}$。质量达标集合若也是 $\{1,2\}$，联合成功率为 50%；若为 $\{3,4\}$，联合成功率为 0。两个场景的及时率和质量达标率都为 50%。这是集合计数，不是论文实验；它说明只报两个边际指标无法恢复联合指标，也不能未经证据假设独立。

原文 §5.1 用离线需求分布代理规划复用/重算，包括 500 个合成 PassageRetrieval 请求；这不是在线每次输出正确的保证。§6.1 的 exact match/F1 是具体任务口径，阈值与代理误差仍需核验。QSA 衡量质量门槛和 TTFT 的交集，也不自动包含完整生成时延、事实可靠性或其他服务目标。

**机制前置：**[精确与近似 KV 复用](kv-cache-mechanism.md#approximate-reuse)解释为什么拼接分块状态可能改变答案；服务评价必须覆盖该变化。论文结果仅在其任务、负载、硬件与基线实现内成立，本文没有复现实验。

## Boundaries

比较两种策略前，应固定请求构成、模型、并发与成功请求口径，并明确是否包含迁移、排队、冷启动和重试。百分位数还需说明采样窗口；不同目标之间的取舍应保留，不能只选择最好看的指标。

[迁移决策](storage-placement-and-migration.md)改变过渡期间的资源竞争，[迁移评估问题](../questions/storage-migration-evaluation.md)保留如何测量这些影响的缺口。[地图](../maps/storage-and-serving.md)将基础模型与摘要级前沿工作分开安排。

## Revision

2026-10-16：原理解区分平均、尾部与依赖链，但未展开请求质量；根据 CacheSmith 的联合指标，新增逐请求交集及边际相同而联合不同的反例。此为 AI 候选，离线代理与真实输出之间的证据缺口仍开放，用户未确认。
