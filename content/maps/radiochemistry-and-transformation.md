---
title: "放射化学：用分离与时间响应识别持续转变"
date: 2026-10-28
draft: false
tags: [radiochemistry, experimental-inference]
id: "631986a2-6039-41a2-a8cf-0871230ab20a"
kind: map
maturity: developing
endorsement: ai-candidate
---

## Overview

放射活性近似恒定，是否意味着物质没有变化？本路径从 Rutherford、Soddy 的历史化学分离问题进入，分开活性读数、活性组分、持续生成与损失。历史分离分支保留指定原文与有效模型；另设放射性碳定年分支，讨论独立标尺和校准反演。新增解释仍为 AI 候选，不补未读的现代 ThX 身份。

## Core-questions

什么操作能把恒定读数背后的周转显露出来？分离产物衰减与母体恢复怎样互相约束？混合响应、背景和几何变化又会掩盖哪些成分？定年时，初始碳含量与校准曲线形状怎样限制唯一年代？

## Prerequisites

先掌握指数函数、半衰概念、一阶常微分方程及相对归一化。历史实验段可先读；进入模型时须额外区分测量读数与物质存量，避免把电离电流直接当核素计数。

## Reading

1. 先读[放射活性与分离响应](../notes/radioactive-equilibrium-and-separation.md#separation-and-response)，理解标本几何、试剂分配和连续分离分别排除什么解释。
2. 再读[供给—损失有效模型](../notes/radioactive-equilibrium-and-separation.md#effective-turnover-model)与四天算例，核互补响应、背景和单个平台的识别限制。
3. 最后读[混合测量与未解边界](../notes/radioactive-equilibrium-and-separation.md#measurement-mixtures-and-boundaries)，区别预设理论曲线、残差和独立测量，回到[原文阅读记录](../sources/rutherford-soddy-radioactivity-1902.md)核范围。

## Dating-and-independent-calibration

[放射性碳校准与年龄反演](../notes/radiocarbon-calibration-and-age-identifiability.md)可在指数衰减之后独立阅读；另需理解测量误差、概率分布和先验。先看初始碳-14为何需要独立定年档案，再区分绝对树轮与浮动序列，最后用非单调曲线理解多峰。其[来源范围](../sources/reimer-intcal20-2020.md)只覆盖 IntCal20 指定部分，未运行校准软件。

## Connections

与[分子遗传实验识别](molecular-genetics-and-experimental-inference.md)是结构类比：分离或追加处理能够制造单个平均量没有的可观察差异。没有把生物复制与核转变等同，也没有从相同指数形式推定同一微观机制。

## Open

历史二次活性与残余成因如何由独立实验区分？固定几何/背景校准后，哪些数据足以分别估计供给与损失？现代 ThX 身份和父源长期衰变尚未补读，不能由本页有效模型直接推出。2026-11-18 已推进定年校准的独立问题，未解决历史残余机制；2026-12-09 先比较固定曲线下单样本、已知年距序列和地层先验的同模型结果。

[返回主题地图](_index.md)。
