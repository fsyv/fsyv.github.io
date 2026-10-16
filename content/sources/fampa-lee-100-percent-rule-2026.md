---
title: "Fampa 与 Lee：线性规划 100% rule 的锥证书"
date: 2026-10-14
draft: false
tags: [optimization, papers]
id: "ae19b5e2-333d-4e02-98a3-ed74eb726c00"
kind: source
maturity: developing
endorsement: ai-candidate
read_status: partial
---

## Identity

- 作者：Marcia Fampa; Jon Lee。
- 标题：On the 100% Rule of Linear Programming。
- 版本：arXiv:2610.12665v1，首次提交 2026-10-08T19:42:49Z（上海 2026-10-09T03:42:49+08:00）；2026-10-14 发现，属于本次窗口内新预印本。
- 实际入口：[题录与版本](https://arxiv.org/abs/2610.12665)、[v1 HTML](https://arxiv.org/html/2610.12665v1)。未核正式发表状态，不将预印本当作已同行评审结果。

## Reading-and-evidence

2026-10-14 实读 §1–3，重点 §2–3。§2 定义单项允许范围与经典 100% rule；§3 给出固定基的可行右端锥，以及经典区域闭锥包所成的新证书及包含关系。100% rule 本身是旧理论，本篇贡献不能简化成“首次发现同时变化的百分比规则”。

## Summary

**作者主张的 AI 概括：**固定约束矩阵、目标和最优非奇异基，只改变右端时，对偶条件不变；可由单项灵敏度构造比经典规则更大的充分保证区域。它保证同一基可行且最优，不保证原变量值不变，也不以区域之外作为一定失败的判据。

## Limits

未深读后续维数分类证明，未核 PDF 页码，未独立核实现或线性时间复杂度。部分正文阅读不等于全文复证。本文并未证明整数规划、非线性模型或实际迁移协议可采用同一保证。

## Support

[支持：右端灵敏度的条件、证书与反例](../notes/lp-rhs-sensitivity-certificates.md)；其中教学算例为 AI 推导，不是论文实验。与[优化与数值分析地图](../maps/optimization-and-numerics.md)中的数值误差问题互补。
