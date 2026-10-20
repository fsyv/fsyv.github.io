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
2. [Zipf 排名请求模型](../notes/probability-zipf.md)：先解释边际热度与静态缓存，再读[对象大小与两个命中目标](../notes/probability-zipf.md#object-size-and-objective)、重用距离及教学反例，最后看[公开样本的受控投影](../notes/probability-zipf.md#public-sample-projection)；沿“概率→容量单位/目标→顺序→有限数据对照→操作与过期语义”理解模型遗漏。
3. [ER 与无标度网络](../notes/network-random-and-scale-free.md)：回答“边如何形成、度分布如何检验”，区分生成机制、分布形状与实证证据。
4. [交通延误传播与条件阈值](../notes/transport-delay-propagation-and-thresholds.md)：在结构之后加入时变运行权重、雨量驱动、吸收和非负约束；需额外掌握矩阵乘法与离散递推，区分数据外测试、数值情景及有条件的增长充分界。

前三条分支可独立阅读；顺序帮助先熟悉概率定义，再处理应用对象，并不意味着网络幂律依赖请求符合 Zipf。动态实例接续结构分支，其阈值也不由度分布直接推出。

## Relations

- **训练目标的应用：**[Transformer 生成](../notes/transformer-generation.md)用逐位置负对数概率训练；预测误差与事实正确性仍需不同评价。
- **资源管理的联系：**[前缀缓存](../notes/kv-cache-optimization.md#prefix-sharing)依赖重复的计算上下文；Zipf 对象热度只能提供类比，不能替代 token 前缀命中条件。
- **区别：**排名概率的 Zipf 指数和度频率的幂律指数描述不同变量，不能看到双对数直线便互用参数。
- **有条件的精确联系：**[统计物理](statistical-physics.md)从非平衡功进入指数平均；[有限状态瞬时切换](../notes/nonequilibrium-work-and-free-energy.md#sudden-switch-kl)在正则初态、同一有限状态空间和全部有限能量等条件下给出 KL 与平均耗散功的精确关系。一般有限时协议及训练损失不能直接沿用该物理解释。

- **实验识别的结构类比：**[分子遗传地图](molecular-genetics-and-experimental-inference.md)从 DNA 示踪自身问题出发，用同平均/不同分布说明比较可观察预测的重要性；生物密度实验与网络构图并无数学等价。

## Sources-and-open

[概率资料阅读范围](../sources/foundations-probability.md)区分讲义定义和仅读的实证摘要；[网络资料](../sources/foundations-networks.md)区分理论生成模型与统计检验。真实流量的时间局部性及现实拓扑是否符合模型，保留在[边界检验问题](../questions/foundations-validation.md)，不以空标题代替已有解释。

交通分支的开放问题是：完整非负截断更新与近似阈值，在非均匀雨场、时变运行图和非零初态下相差多少？[来源](../sources/paper-climate-transport-collapse.md)未提供本库复现或真实无界阶段证据，2026-10-28 复评。
