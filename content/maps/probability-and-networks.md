---
title: "概率目标、请求偏斜与网络结构"
date: 2026-10-12
draft: false
tags: [foundations]
id: "5d8861aa-a6ec-4a4f-b622-5c48472d1463"
kind: map
maturity: developing
endorsement: ai-candidate
---

本地图围绕“模型到底描述了什么”组织基础知识：预测概率、对象请求与图连接属于不同对象，即使都出现分布、指数或重尾，也不能直接互相代替。

## Questions

预测损失怎样从概率模型产生？请求热度如何归一化与采样？拓扑生成假设怎样限制对现实网络的解释？

## Prerequisites

需要求和、对数、基本概率与图的节点/边概念。不要求先掌握特定缓存算法；先明确统计对象和独立性假设。

## Route

1. [交叉熵、最大似然与 KL](../notes/probability-cross-entropy.md)：回答“如何评价预测分布”，保留固定目标分布的条件。
2. [Zipf 排名请求模型](../notes/probability-zipf.md)：先解释边际热度与静态缓存，再读时序分支的重用距离、LRU 命中判定和同频率反例；沿“边际→顺序→策略结果”理解模型遗漏。
3. [ER 与无标度网络](../notes/network-random-and-scale-free.md)：回答“边如何形成、度分布如何检验”，区分生成机制、分布形状与实证证据。

三条分支可独立阅读；顺序帮助先熟悉概率定义，再处理应用对象，并不意味着网络幂律依赖请求符合 Zipf。

## Relations

- **训练目标的应用：**[Transformer 生成](../notes/transformer-generation.md)用逐位置负对数概率训练；预测误差与事实正确性仍需不同评价。
- **资源管理的联系：**[前缀缓存](../notes/kv-cache-optimization.md#prefix-sharing)依赖重复的计算上下文；Zipf 对象热度只能提供类比，不能替代 token 前缀命中条件。
- **区别：**排名概率的 Zipf 指数和度频率的幂律指数描述不同变量，不能看到双对数直线便互用参数。

## Sources-and-open

[概率资料阅读范围](../sources/foundations-probability.md)区分讲义定义和仅读的实证摘要；[网络资料](../sources/foundations-networks.md)区分理论生成模型与统计检验。真实流量的时间局部性及现实拓扑是否符合模型，保留在[边界检验问题](../questions/foundations-validation.md)，不以空标题代替已有解释。
