---
title: "生化与酶动力学：反应通量、约化与机制识别"
date: 2026-11-24
draft: false
tags: [biochemistry, enzyme-kinetics]
id: "8cd4522e-6a28-4861-82de-0afe1db400e1"
kind: map
maturity: developing
endorsement: ai-candidate
---

## Overview

本主题先问酶反应自身的问题：底物增加为何出现速率饱和，宏观速率能识别哪些结合、解离和催化过程？当前范围是单底物反应链、质量守恒、准稳态约化及其识别边界。组织与现代推导为AI候选，尚无真实酶数据或一般网络结论。

## Prerequisites

需要浓度、单位、变化率与简单线性微分方程；进入算例前会核对“浓度/时间”这一通量单位。先分清酶总量、游离酶和结合物，再讨论时间尺度，避免把所有状态浓度不变都称作平衡。

## Reading

1. 阅读[反应和通量](../notes/enzyme-quasi-steady-state-and-identifiability.md#flux-and-balance)，先解释每个进入/离开结合物的通道。
2. 再读[准稳态约化](../notes/enzyme-quasi-steady-state-and-identifiability.md#quasi-steady-reduction)，由结合物的近似流量平衡得到饱和曲线，保留起始阶段、慢底物和小酶量的条件。
3. 用[相同曲线与不同通量](../notes/enzyme-quasi-steady-state-and-identifiability.md#same-curve-different-fluxes)区分半饱和常数与解离常数，再借冻结底物瞬态设计可区分的观测。
4. 回到[Briggs与Haldane两页原文](../sources/briggs-haldane-enzyme-kinetics-1925.md)，核现代整理与历史近似的范围，不把教学参数当实验。

## Connections

[晶体学与结构推断](crystallography-and-structural-inference.md)提供可识别性的方法联系：观测摘要相同不等于内部构成相同。衍射强度与酶通量遵循不同模型，没有建立数学等价。[优化与数值分析](optimization-and-numerics.md)补充固定问题的计算误差轴；提高计算精度不能替代识别所需的额外观测。

[电生理候选路径](electrophysiology-and-dynamic-models.md)区分经验动力学预测与分子机制。可比较两者用不同条件检验模型的思路，但门控变量不是本反应链的结合物，不能直接搬用速率常数。

## Questions

起始混合和测量的时间分辨率何时足以区分结合物解离与催化？底物耗尽、产物逆反应、酶失活或高酶量如何改变约化误差？同一饱和曲线之外还需要哪些可识别观测？2026-12-15优先取得可归属的起始瞬态原始数据及采样/混合条件；当前没有相应仪器实验，也没有一般有效性定理。

[返回地图](_index.md) · [返回知识库入口](../_index.md)。
