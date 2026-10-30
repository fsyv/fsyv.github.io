---
title: "流体力学：尺度、相似性与流动转变"
date: 2026-10-26
draft: false
tags: [fluid-mechanics, similarity]
id: "c71e1fa3-db12-4a0d-9e0a-2ad95c44db8a"
kind: map
maturity: developing
endorsement: ai-candidate
---

## Overview

这条路径从管流水实验理解三个问题：哪些无量纲参数能组织不同尺寸装置，什么观测足以判断流动转变，扰动和测量范围怎样限制阈值。组织与现代教学改写为AI候选，不把历史实验当作现代湍流理论的完成证明。

## Prerequisites

需要量纲和单位换算、截面积与平均流速、密度和黏度的区别，以及基本导数概念。先固定流体对象和几何，再谈相似；不需要先接受某个固定临界数。

## Reading

1. 从[完整管流解释的问题与尺度](../notes/reynolds-similarity-and-transition.md#similarity-parameter)定义直径、平均速度和运动黏度，理解原文半径符号与现代直径Re的区别。
2. 读[染色实验](../notes/reynolds-similarity-and-transition.md#dye-experiment)，将TableI两行数量级对照与全部数据拟合分开，区分平均流速和局部状态。
3. 再读[扰动与可观测性](../notes/reynolds-similarity-and-transition.md#disturbance-and-observability)，比较色线破坏和下游阻力律两个判据；进入现代稳定性问题前，先说明观察能否区分暂态与持续状态。
4. 用[原始来源及实际范围](../sources/reynolds-pipe-flow-1883.md)复核历史实验，后续再扩展控制扰动、发展长度和观察时间的现代实验分支。

## Connections

与[生态与动力学](ecology-and-dynamics.md)是结构类比：控制参数不能替代有限扰动响应，观测相似也不意味着机制已唯一识别。管流与生态模型没有建立状态空间、吸引域或分岔的映射，不直接搬用阈值或预警量。

## Questions

- 同一Re下，改变扰动幅度、发展距离和观察时间，会怎样改变“持续”的判据？需要现代原始对照，现仅有历史实验指定范围。
- 何种测速/压力观测能在染料混匀后辨认扰动是否衰减？需区分观测失去分辨力和物理状态不变。
- 何时真实装置确实满足无量纲几何、初边值及物性条件的相似？目前只有教学尺度推导，非完整相似性验证。

2026-11-16先复评上述证据可得性；[返回主题地图](../maps/_index.md)。
