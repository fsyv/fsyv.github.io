---
title: "分析化学与测量：用可追踪的组分估计量"
date: 2026-11-10
draft: false
tags: [analytical-chemistry, metrology]
id: "82677ccf-21b0-40f1-9c42-88aa22ec3503"
kind: map
maturity: developing
endorsement: ai-candidate
---

## Overview

从同位素稀释进入分析化学的定量问题。仪器读出的组分比例怎样约束原先的量？校准取消了哪些未知量？样本损失前后的估计对象怎样区分？

## Prerequisites

先区分物质的量、溶液质量与同位素份额。总钆量和某个同位素的钆量不同，混合比的分母来自各份溶液的同位素贡献。

## Reading

1. 读[混合比守恒](../notes/isotope-dilution-and-solution-mass.md#ratio-balance)，从两种同位素分别加总推回相对钆量。
2. 沿[从大样标定到小样估计](../notes/isotope-dilution-and-solution-mass.md#calibration)理解校准替代哪项难测量。
3. 用[损失与目标](../notes/isotope-dilution-and-solution-mass.md#loss-and-target)的算例区分混合前后。最后读[毫克级实验](../sources/paper-isotope-dilution-solution-mass.md#evidence)，比较带入混合物的钆对应质量与沉积质量。

## Connections

[遗传实验识别](molecular-genetics-and-experimental-inference.md)的氮示踪提供设计类比。那里比较密度分布来区分复制机制，这里反推元素量。两条路径各有不同的可观察量和证据条件。

[频率稳定度地图](metrology-and-frequency-stability.md)提供计量视角。用参考和差分压低某类共同偏差时，仍需界定估计对象并列出剩余不确定度。频率噪声的统计模型不能移作同位素校准公式。

## Questions

若混合物中的组分尚未充分达到同位素平衡，何种样本制备或独立测量能区分混合前的漏滴、混合后的非同比损失与仪器漂移？目前的守恒计算只识别在指定条件下到达样本的量。
