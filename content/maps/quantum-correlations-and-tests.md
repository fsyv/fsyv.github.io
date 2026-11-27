---
title: "量子相关与实验检验：模型、试次和选择"
date: 2026-11-27
draft: false
tags: [quantum-foundations, experimental-inference]
id: "c4faa82a-a932-4ad3-b0cd-f67df99be374"
kind: map
maturity: developing
endorsement: ai-candidate
---

## Overview

远隔装置的相关性何时超出局域共同原因模型？实验中哪些记录属于同一检验总体？这条路径从模型条件进入可复算不等式，再研究缺测筛选与事件就绪，不以“量子神奇”代替可检查的假设。组织与解释为 AI 候选。

## Prerequisites

需要条件概率、正负一随机变量和期望的线性性。先理解“同一个隐变量分布”与“不同设置下分别统计的相关”，不要求先掌握完整量子力学。要进一步计算量子预测，仍需补自旋态、测量算子与张量积，本轮没有完成该分支。

## Reading

按[局域模型与共同试次总体](../notes/bell-local-models-and-event-ready-tests.md)依次阅读：

1. 明确局域响应与设置独立，推导四相关统计量的界；分开本库 AI 推导和 Bell 1964 的原形式。
2. 用设置相关的缺测反例，检查相同保留率为何仍可改变各组的隐变量分布。
3. 将有效准备作为事件就绪条件，再读 Hensen 等的自旋实验、全部输出分配和时空安排。
4. 最后比较独立同分布近似与允许记忆的统计结论，区分点估计、尾概率和待复核的原始试次。

[Bell 来源](../sources/bell-locality-1964.md)和[Hensen 实验来源](../sources/hensen-event-ready-bell-test-2015.md)分别保留实际阅读范围；两者都是近期发现的旧资料。

## Connections

[概率与网络地图](probability-and-networks.md)中的联合与条件概率是方法前置。这里的局域性限制是物理模型条件，不等于网络服务没有通信，也不从网络拓扑直接推出。

[反复评分与留出复用](../notes/adaptive-validation-and-holdout-reuse.md)与本主题共享“选择规则影响评价分布”的结构问题。它们没有已证数学等价，量子局域界不能变成模型泛化或共识安全保证。

## Open

在可归属的逐试次记录上，停止规则、设置随机性缺陷和设备记忆分别怎样进入有效 p 值上界？目前仅有指定正文阅读和独立代数例，2026-12-18 优先补原数据与完整统计条件。量子预测为何超过局域界，以及无信号条件怎样同时成立，也仍需独立资料与推导。

[返回主题地图](_index.md)。
