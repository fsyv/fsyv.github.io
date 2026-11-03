---
title: "晶体学与结构推断：反射位置、强度与可识别性"
date: 2026-11-04
draft: false
tags: [crystallography, inverse-problems]
id: "05419ae3-04e4-405a-b0ea-ac767a3906f4"
kind: map
maturity: developing
endorsement: ai-candidate
---

## Overview

这条路径研究重复原子排列怎样约束X射线散射，以及位置和强度分别能识别什么。当前从Bragg的历史论证和理想周期算例出发，区分晶面间距、晶胞内部排列与唯一反演。组织与推导为AI候选，未建立真实材料的完整结构求解流程。

## Prerequisites

需理解波长、相位、光程差和复数模平方。先能解释为什么相差整数波长的两条波相长，再进入多中心振幅；角度必须区分对晶面、对法线及入射/散射夹角。

## Reading

按[衍射几何与结构推断](../notes/bragg-diffraction-and-structural-inference.md)的顺序阅读：

1. 用相邻晶面的光程差理解Bragg关系，再固定波长和级次推晶面间距。
2. 区分面间距与任意原子距离、周期允许反射与单元内抵消。
3. 在同周期双中心模型中先加振幅，再计算两级强度，理解峰位之外新增了什么信息。
4. 用镜像不变反例检查唯一性，保留理想模型与真实晶体修正的边界。

[1922讲座来源](../sources/bragg-crystal-diffraction-1922.md)列实际页码与历史近似，不能把奖年或历史振幅模型当现代实验条件。

## Connections

[地球物理反演](geophysics-and-inverse-evidence.md)与[分子遗传实验识别](molecular-genetics-and-experimental-inference.md)提供方法类比：相同观测摘要可对应不同机制，追加观测须给出可区分的预测。磁异常、密度分布与X射线振幅的物理模型不同，未证明数学等价。

[数值分析](optimization-and-numerics.md)提供互补边界：结构尚不可识别和已固定问题的计算不稳定不同，小残差或精确计算不能自动补回缺失信息。

## Open

真实强度中的散射因子、热运动、吸收与多重散射怎样改变简化模型？哪些追加观测或先验能打破同强度结构的歧义？目前没有现代相位问题、结构唯一性或真实材料数据的独立原证，2026-11-25先从这些证据推进。

[返回地图入口](_index.md)。
