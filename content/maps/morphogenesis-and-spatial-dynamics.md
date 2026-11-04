---
title: "形态发生与空间动力学：相近细胞怎样产生差异？"
date: 2026-11-02
draft: false
tags: [developmental-biology, dynamics]
id: "b3f4f080-e81b-4b63-b9f9-4607c7f412c6"
kind: map
maturity: seed
endorsement: ai-candidate
---

## Overview

形态发生首先要解释组织自身的空间差异：相近细胞遵循相同反应规律时，什么过程会放大小差异，什么证据能识别实际物质与机制？当前路径从Turing1952两细胞例开始，区分机制可能性、数学稳定性和生物实证。只有一篇旧论文的部分阅读及AI代数，不是发育生物学综述。

## Questions-and-branches

反应分支问孤立细胞是否返回平衡；空间分支问平均和差异模态是否同样稳定；非线性分支问增长之后是否形成稳定图样；实验分支问实际反应、扩散与边界条件是否匹配模型。后两分支仍缺证据，不能由前两分支自动填补。

## Prerequisites

需要浓度、净反应率、常微分方程、矩阵特征值与线性组合的基本概念。先理解平衡和小扰动，再把两细胞的共同变化与相反变化分开；无需先接受某种生物模式已由该机制解释。

## Reading

1. 读[问题与两细胞模型](../notes/diffusion-driven-pattern-instability.md#two-cell-model)，明确选定反应、交换规则及尺度。
2. 沿[平均与差异模态](../notes/diffusion-driven-pattern-instability.md#spatial-modes)复算孤立特征值−1和差异特征值2/−14，理解扩散仍沿浓度梯度时差异为何能增长。
3. 用原文数值表和等扩散对照，区分具体机制与普遍充分条件。
4. 最后读[适用边界](../notes/diffusion-driven-pattern-instability.md#boundaries)及[原篇阅读记录](../sources/paper-turing-morphogenesis.md)，保留非线性图样和实际物质识别的缺口。

## Connections

[生态与动力学](ecology-and-dynamics.md)提供局部恢复与有限扰动的前置区别；本主题增加空间模态，尚未验证为既有生态问题的机制。[交通延误传播](../notes/transport-delay-propagation-and-thresholds.md)只有传播和本地动力须联合分析的结构类比，外力、离散步和截断使公式不能互换。

## Open-questions

哪些非线性反应会限制增长并形成稳定图样？如何测量真实物质、扩散与扰动，排除其他空间机制？这些问题留在[完整解释](../notes/diffusion-driven-pattern-instability.md#boundaries)；先补对应原证，再决定是否形成独立问题页。

[返回地图入口](_index.md)。
