---
title: "Higham：条件数与数值稳定性的定义和边界"
date: 2026-10-14
draft: false
tags: [numerical-analysis, sources]
id: "b404201c-d8f8-4ff6-8ec8-742d9a577d68"
kind: source
maturity: developing
endorsement: ai-candidate
read_status: read
---

## Identity

两份不同旧资料合并记录于本页；去重计数仍为两份，均由 Nicholas J. Higham 撰写，未追读其中参考书或论文。

1. [What Is a Condition Number?](https://nhigham.com/2020/03/19/what-is-a-condition-number/)，2020-03-19，页面显示更新日期相同；无编号版本。
2. [What is Numerical Stability?](https://nhigham.com/2020/08/04/what-is-numerical-stability/)，2020-08-04 首发，显示修订 2020-08-11；无编号版本。

## Reading-and-evidence

2026-10-14 实读两篇 HTML 短文正文与公式。第一篇的条件数定义、局部相对界、Jacobian 公式、算例与注意段落支持问题敏感性解释；未核配图像素。第二篇的前向、后向、混合稳定性定义及外积讨论支持区分算法与问题；未追读 Gauss–Jordan 分析或参考书。`read` 仅表示这两篇短文的正文已读，不代表参考文献或所有数学主张均已独立复证。

## Summary

**作者观点的 AI 概括：**条件数依赖问题、输入和扰动定义；后向稳定性描述答案对应邻近输入，前向误差还受问题敏感性影响。稳定性概念不能用单次实验结果代替。

## Limits

第二篇 Other relevant points 第 4 条的 unconditionally 一词与随后“仅对输入子集稳定”的限定关系疑有歧义，本次不以该句支持结论。两篇是定义性作者短文，不是近期新研究；没有提供 KV 量化或整段生成的误差保证。

## Support

[支持：问题敏感、计算误差与残差为何不同](../notes/numerical-conditioning-and-stability.md)。该笔记的有理化式、精确差值、对角矩阵算例均为 AI 自构并复算；KV 联系是未验证应用方向。入口见[优化与数值分析地图](../maps/optimization-and-numerics.md)。
