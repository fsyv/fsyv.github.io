---
title: "统计物理：非平衡过程怎样约束功与自由能？"
date: 2026-10-19
draft: false
tags: [statistical-physics, probability]
id: "1ca48d6b-510a-486f-8f68-dcc85323f5a3"
kind: map
maturity: developing
endorsement: ai-candidate
---

## Overview

统计物理从微观状态与概率出发，解释宏观能量和热力学约束。本地图先进入学科自身的问题：远离平衡的操作为什么仍能给出平衡自由能差，精确恒等式又为何不保证有限样本容易估准？当前只覆盖非平衡功的一条解释链，地图及推导为 AI 候选。

## Questions

功与热怎样按符号和过程区分？哪些初态、热浴与协议条件支撑等式？普通均值、指数平均和单次实验为何不能互换？这些问题先在物理模型内回答，再讨论数学联系。

## Prerequisites

需要离散概率、期望、自然对数、凸性和基本能量概念。先在[非平衡功笔记](../notes/nonequilibrium-work-and-free-energy.md#physical-question)中固定正则初态、配分函数、控制参数及对系统做功的符号；进入 KL 分支再读[散度定义](../notes/probability-cross-entropy.md#entropy-and-kl)。

## Reading

1. 沿[物理问题](../notes/nonequilibrium-work-and-free-energy.md#physical-question)到[等式与均功](../notes/nonequilibrium-work-and-free-energy.md#equality-and-mean)，区分终参数的平衡参考与实际终态，保留裸系统弱耦合口径。
2. 用[两态例](../notes/nonequilibrium-work-and-free-energy.md#a-two-state-example)计算低概率事件为何主导指数平均，再读[有限样本边界](../notes/nonequilibrium-work-and-free-energy.md#finite-sample-boundary)，区分期望偏差与每次误差。
3. 最后读[瞬时切换的 KL 特例](../notes/nonequilibrium-work-and-free-energy.md#sudden-switch-kl)：只有固定有限状态、有限能量、正则初态和瞬时不变状态才支持本文的端点展开。

[两份来源及读取位置](../sources/nonequilibrium-work-sources.md)保留原始证据与未读范围，不把综述全部内容纳入已知。

## Connections

与[概率地图](probability-and-networks.md)的联系是有条件的精确数学推导：在上述瞬时切换模型中，端点 KL 等于以逆温度归一的平均耗散功。一般有限时协议不能沿用该端点公式；训练、缓存和迁移成本也未建立物理映射，不据此外推。

## Open

有限样本中怎样诊断尚未采到的低功尾部，怎样在测量成本与误差之间选择重复次数？非独立制备、不同驱动协议或强耦合时应使用哪个自由能定义？这些需要新证据；当前例子没有给出通用样本数、误差界或推广证明。

[返回地图入口](_index.md)。
