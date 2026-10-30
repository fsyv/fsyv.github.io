---
title: "修复感知深度剪枝：有限枚举与评价目标"
date: 2026-10-26
draft: false
tags: [inference, optimization, papers]
id: "1f4968ba-5644-469e-99a9-c81a440e86a0"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
---

## Identity

- 作者：Jianchang Su、Dawei Xiang、Yifan Zhang、Wei Zhang。
- 原题：*Repair Changes Which Layers to Remove: Exact Optima for Depth Pruning of Language Models*，2026。
- Canonical：[arXiv2610.30552v1](https://arxiv.org/abs/2610.30552v1)，首提2026-10-22T00:18:10Z，本轮仍仅v1。属于窗口补遗漏。
- 实际材料：[HTML](https://arxiv.org/html/2610.30552v1)，2026-10-26读取。

## Reading

§3–6、§7及Tables1–4；AppendixE重点Tables11–12、Selection time、Calibration size、Repair fitting；AppendixG/Table14。未核A完整证明、B完整算法、C/D机制附录、F全表、代码/CSV、PDF或复现，未独立复推Fisher近似。

## Evidence

连续删除段由完整模型校准激活拟合最小二乘映射；首层开始的段不能以前一保留层作为接口。修复会改变不同删除集合的评分次序，多个修复段仍相互作用。Rgs每步用修复后的候选评分，不是贪心全局最优定理。

Table14分别枚举Qwen3-1.7B/Gemma3-4B/Llama3.1-8B/Qwen3-14B的两层组，以及Qwen3-1.7B单层粒度；组数14/17/16/20/28，最多删除6/6/6/4/3组。每候选执行有/无修复；不是所有模型、预算和变换类的全局搜索。选层用16条WikiText2校准序列、每条256token；修复用128条训练序列，独立16条test报告PPL。AppendixE中校准最优与test最优仅13/17设置相同。

Table3同Llama3.1-8B-Instruct、删8/32层、相同修复与WikiText选层：完整模型/ReplaceMe/Rgs的test PPL为13.7/40.4/22.6，五任务均准为72.4%/57.2%/55.4%。五任务ARC-Easy、ARC-Challenge、HellaSwag、PIQA、WinoGrande各1000项；PPL更优不等于能力指标更优。

AppendixE的RTX A6000、Llama删12/32层，Rgs319次评估/384s、SLEB+R343s，每修复法另29s采集激活。相同候选forward数不等于相同wall time。AppendixG及Table11：Gemma3在post-feedforward normalization之后修复，映射不能fold，每段新增一个方阵，未计入推理成本表，不能套§7.7概括为所有模型同大小速度。

## Limits

exact仅针对指定搜索空间、修复类和有限评分数据；Fisher评分含经验Fisher/逐位置rank-one及block-diagonal近似，不是精确损失保证。未验证部署吞吐、全任务保真或所有模型连续块最优，未发现正式发表记录不等于不存在。

## Support

支持[剪枝与修复的完整解释](../notes/depth-pruning-and-repair.md)，与[固定执行契约](../notes/tensor-liveness-and-peak-memory.md)只有重新定义优化问题的方法联系。
