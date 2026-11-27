---
title: "断裂力学：裂纹、能量与定量验证"
date: 2026-11-20
draft: false
tags: [fracture-mechanics, mechanics]
id: "a2fec8bc-70a5-49e0-b6ca-3ae88fa581a2"
kind: map
maturity: seed
endorsement: ai-candidate
---

## Overview

这条新路径从材料为什么在有裂纹时容易破坏进入，依次区分载荷下的机械势能、形成裂面的耗散、裂纹尺寸关系和绝对系数的验证。组织与教学解释为 AI 候选，不将线弹性表面能模型作为所有断裂的理论。

## Questions

裂纹增长释放什么能量？恒载下为什么系统势能可以下降而试样应变能增加？观测符合半裂长的平方根尺度后，还缺哪些独立材料参数、载荷与几何条件才能验证系数？

## Prerequisites

先理解应力、应变与杨氏模量，再掌握能量微分和外力做功。随后区分外力控制与位移控制、单面面积与两裂面面积；这些定义决定势能符号和系数。无需流体或缓存知识。

## Reading

1. 从 [机械势能与表面形成](../notes/griffith-crack-energy-and-coefficient-validation.md#mechanical-potential-and-surfaces)明确薄板、裂长及载荷边界，再推临界应力；先核模型，后看数量级。
2. 读 [原实验比较](../notes/griffith-crack-energy-and-coefficient-validation.md#what-the-original-experiment-compared)，保留玻璃球泡、内压和双轴应力的实际对象，不能直接称无限平板拉伸。
3. 读 [系数与作者更正](../notes/griffith-crack-energy-and-coefficient-validation.md#coefficient-and-the-authors-correction)，理解原表近常数、独立表面能及末注各能验证什么。
4. 最后查 [两份来源及读取位置](../sources/griffith-rupture-energy-1921.md)，分开原印黑字、现代批注和教学重写。

## Connections

[流体相似性](fluid-mechanics-and-dynamic-similarity.md)同样要求把尺度关系与具体装置下的转变阈值分开，这是检验方法的结构类比。当前没有流体与裂纹演化的数学等价，也不因共有能量或尺度符号移植系数。

## Open

优先寻找固定有限几何和载荷边界下的弹性释放解、独立表面能或耗散实验，再辨认塑性、疲劳及动态裂纹。当前原文比较没有确定误差来自哪个因素，不能以修正一个系数关闭全部实验解释问题。

[返回地图入口](_index.md)。
