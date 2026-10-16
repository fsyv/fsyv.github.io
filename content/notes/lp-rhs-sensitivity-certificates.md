---
title: "线性规划右端同时变化时，原基何时仍然最优？"
date: 2026-10-14
draft: false
tags: [optimization, mathematics]
id: "3056366f-c546-453b-b59b-8cb6228294dc"
kind: note
maturity: developing
endorsement: ai-candidate
math: true
---

**判断归属：AI 候选解释。** 基础条件与证书来自 [Fampa 与 Lee §1–3](../sources/fampa-lee-100-percent-rule-2026.md)；教学算例为独立 AI 构造。100% rule 是已有理论，本次新论文讨论的是由这些单项范围构造更大的 cone 证书。

## Setup

考虑标准线性规划

$$
\min c^Tx,\qquad Ax=b,\quad x\ge0.
$$

假设 $A$ 满行秩，当前最优基 $\beta$ 的矩阵 $B=A_\beta$ 非奇异。记 $H=B^{-1}$、非基本变量下标为 $\eta$，则同一基的可行解为 $\bar x_\beta=Hb\ge0$、$x_\eta=0$；对最小化问题，对偶最优性条件为

$$
c_\eta^T-c_\beta^THA_\eta\ge0.
$$

**只改变右端 $b$，固定 $A,c$ 和同一个基**，上式不变。因此只需检查 $H\hat b\ge0$，即可保证该基仍可行且最优。这里“基不变”表示使用同一组基本列，基本变量值会随 $\hat b$ 改变；不表示原解向量不变。

## Single-and-simultaneous

令 $h^i=He_i$，单独把 $b_i$ 改成 $b_i+\delta_i$，需要 $\bar x_\beta+\delta_i h^i\ge0$。逐行相交得到允许区间

$$
L_i=\max_{k:h^i_k>0}\frac{-\bar x_{\beta,k}}{h^i_k},\qquad
U_i=\min_{k:h^i_k<0}\frac{-\bar x_{\beta,k}}{h^i_k}.
$$

相应集合为空时取 $L_i=-\infty$ 或 $U_i=+\infty$。它们是“其他分量不动”的单项范围，不能当作可任意组合的矩形。

经典 100% rule 将各项改变量归一化：$\delta_i<0$ 时取 $\lambda_i=\delta_i/L_i$，$\delta_i>0$ 时取 $\lambda_i=\delta_i/U_i$，零变化取零。无限界对应方向计零；若某方向的允许界为零，则不允许沿该方向变化。当

$$
\sum_i\lambda_i\le1
$$

时，这些同时变化足以保证原基仍最优。有限非零边界下，可将变化后的右端写成原右端 $b$ 与各单项允许端点的凸组合，解释为什么总比例约束能保证可行；无限方向另由可行射线处理。它是充分证书，不是所有可行变化的必要条件。

**AI 算例：**取 $A=\left[\begin{smallmatrix}2&1&1\\1&1&0\end{smallmatrix}\right]$、$c=(1,1,1)^T$、$b=(3,2)^T$，前两列为基，则 $H=\left[\begin{smallmatrix}1&-1\\-1&2\end{smallmatrix}\right]$、$\bar x_\beta=(1,1)^T$，对偶解 $(0,1)^T$ 满足条件。单项范围是 $[-1,1]$ 与 $[-1/2,1]$。分别变化 $(1,0)$ 或 $(0,-1/2)$ 都可行，同时变化 $(1,-1/2)$ 却得到基本变量 $(5/2,-1)^T$，不再可行；两项归一化比例之和为 2。其他基可能仍可行，不能把原基失效解释成整个问题无解。

## Cone

固定基的精确可行右端集合为

$$
\mathcal B_\beta=\{\hat b:H\hat b\ge0\}.
$$

它是一个锥，因为缩放和非负组合保持线性不等式。令经典证书区域为 $S=b+\Delta_{100\%}$。作者 §3 构造其闭锥包 $K_\beta(b)=\operatorname{closed\text{-}cone}(S)$，得到

$$
S\subseteq K_\beta(b)\subseteq\mathcal B_\beta.
$$

因此可以在同一单项灵敏度资料上认证更大的右端区域。证书区域之外只是这份证书没有保证，不意味着原基一定失效。本文不传播后续未核验的紧致性分类或实现复杂度保证。

## Boundaries-and-links

前置知识是矩阵逆、基与原始/对偶可行性；[优化与数值分析地图](../maps/optimization-and-numerics.md)给出阅读顺序。这里是精确数学中的可行性证书；[数值条件与算法稳定性](numerical-conditioning-and-stability.md)讨论有限精度与小扰动，两者的问题和保证不同。本文没有分析近奇异基的计算误差。

**潜在建模启发：**[存储迁移的目标与过程](storage-placement-and-migration.md)也需要区分目标改动与可行执行，但真实系统不自动满足固定 $A,c$、连续变量和同一基的条件。未建立相应 LP 前，不能把本文证书用于整数副本、时变网络或非线性服务约束。

开放问题是：哪些实际任务能被表示成仅右端变化？拿到精确证书后，浮点求解与退化基又怎样影响检查？本次没有完成应用验证。
