---
title: "怎样检验基础成本模型与真实负载之间的差距？"
date: 2026-10-12
draft: false
tags: [foundations]
id: "b56b26de-8ff6-41c2-acd3-f0eaf728d02e"
kind: question
maturity: developing
endorsement: ai-candidate
status: open
math: true
---

**归属：AI 提出的开放问题。** 状态为 open；本次完成了基础解释与局部一手阅读，未进行真实工作负载实验。

## Value

模型内的正确推导可能在另一种数据、实现或硬件条件下无法解释观察结果。需要确定哪些差距来自假设改变，哪些来自实现与调度，避免将算术复杂度或某篇实验的数字当作普遍性能承诺。

## Known

- [KV 机制](../notes/kv-cache-mechanism.md)给出因果前提、单步与累计计算、存储公式；[成本分类](../notes/kv-cache-optimization.md)区分计算、实际字节、分配浪费与链路等待。
- [Zipf](../notes/probability-zipf.md)给出固定概率下的静态命中率，以及限定 LRU 模型的重用距离判定与同频率反例；这没有完成真实负载验证。
- [网络模型](../notes/network-random-and-scale-free.md)说明度分布拟合需要可接受性和候选比较，不能只看拟合指数。

## Gaps

1. 相同前缀在不同批处理、位置处理和精度下，缓存/重算输出的差别多大？哪些属于浮点误差，哪些表示复用条件已破坏？
2. 固定模型，分别改变上下文、并发和缓存命中率，TTFT、逐 token 延迟与吞吐的主要变化来自哪项成本？当前尚无同一实现上的测量。
3. 具有相同对象频率的 IID、突发和热点漂移轨迹，对同一个动态缓存策略产生多大差异？需要明确轨迹生成机制或可公开真实样本。
4. 真实拓扑数据采用何种构图方式和采样时间，哪些分布在同一尾部范围内无法区分？当前未选择数据集，不能宣称现实系统采用 ER 或幂律最合适。

## Directions

2026-10-16 局部进展（AI 候选）：[11 次请求反例及验证规程](../notes/probability-zipf.md#same-counts-different-hits)已表明同一经验 Zipf 频率可在容量 2 的 LRU 中产生 $8/11$ 与 $3/11$ 命中；尚未选择或测量真实轨迹。保留计数的随机排列不是 IID，后续应分别比较排列对照与真正 IID 重采样，记录预热、准入及对象单位。本问题保持 open。

B 通道增加两项测量约束：[物理放置与访问历史](../notes/kv-cache-optimization.md#placement-and-timing)应分别测冷访问、预取、重用及总搬移成本；[质量与时延联合成功](../notes/storage-latency-and-slo.md#joint-success)应逐请求统计，不能用两个边际通过率代替。当前只有微基准/RAG 论文的指定部分阅读，没有本库同一实现上的复现或真实 KV 放置实验。

按单个问题选择最小可复现样本，记录模型/数据/硬件/软件、预算和指标；先给出预期数量级及可能反例，再解释观察。完成后将结果整合到对应机制笔记，在这里回链，再按实际范围判断是否 resolved，不以一次实验关闭全部问题。

## Sources

现有证据及局限见[KV 系统一手阅读](../sources/foundations-kv-systems.md)、[概率资料](../sources/foundations-probability.md)和[网络研究](../sources/foundations-networks.md)。本问题未声称这些来源已经回答上述新实验任务。
