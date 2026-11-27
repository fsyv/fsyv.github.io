---
title: "电生理与动力学模型：从电压控制到兴奋预测"
date: 2026-11-23
draft: false
tags: [electrophysiology, dynamics]
id: "5afd7628-b1ad-42f6-b4f4-5fecd8be6710"
kind: map
maturity: seed
endorsement: ai-candidate
---

## Overview

本路径从神经电生理自身的问题开始：膜电位与离子电流相互影响时，怎样先识别动力学，再用它预测自由膜的动作电位？当前只基于Hodgkin–Huxley1952原文指定部分和AI说明性算例，不是现代神经科学综述。

## Questions-and-branches

测量分支问电压钳固定什么、剩下什么电流；动力学分支问一阶隐状态怎样形成延迟与瞬态电导；预测分支问恢复电容反馈后能否描述自由膜响应；识别分支问哪些不同分子机制仍可对应相近经验规律。

## Prerequisites

需要电压、电流、电容、电导、反转电位和一阶常微分方程。先区分电压驱动力与电导，再看状态变量；阅读原式时须保留外减内、去极化为负的1952符号约定。

## Reading

1. 先读[电压钳干预](../notes/voltage-clamp-and-membrane-dynamics.md#question-and-intervention)，明确固定电压消除了电容项，却不自动分离Na/K电流。
2. 再沿[状态与电导](../notes/voltage-clamp-and-membrane-dynamics.md#voltage-and-gates)理解一阶速率、四次方及快激活/慢失活；算例只说明模型机制。
3. 读[恢复反馈](../notes/voltage-clamp-and-membrane-dynamics.md#restore-the-feedback)，把自由膜电位放回守恒关系，区分均匀点膜与沿轴突传播。
4. 最后看[预测与分子识别](../notes/voltage-clamp-and-membrane-dynamics.md#prediction-and-identification)及[原文读取范围](../sources/hodgkin-huxley-membrane-current-1952.md)，检查比较单位、曲线偏差和未识别部分。

## Connections

[形态发生与空间动力学](morphogenesis-and-spatial-dynamics.md)提供局部动力学与更大系统行为的层次类比；反应扩散和膜电荷守恒具有不同实体与边界，未证明两者等价。

## Open-questions

怎样以同一速率规律独立复算原文Fig12，并比较K电导延迟和非理想电容造成的偏差？现代单通道与结构证据怎样约束经验变量的解释？两方向仍开放，2026-12-14优先读取明确原始对照或固定复算对象。

[返回地图入口](_index.md)。
