---
title: "问题敏感和算法不稳定，怎样用误差区分？"
date: 2026-10-14
draft: false
tags: [numerical-analysis, mathematics]
id: "118cc858-5672-4361-ba98-ce0eb8eba657"
kind: note
maturity: developing
endorsement: ai-candidate
math: true
---

**判断归属：AI 候选解释。** 定义依据 [Higham 两篇作者短文](../sources/higham-conditioning-stability.md)；以下推导与三个算例为 AI 教学构造，不是原文实验。条件数描述问题，稳定性描述计算方法，二者需要分开判断。

## Three-errors

给定精确问题 $y=f(x)$ 与计算结果 $\hat y$。先固定输入域、允许扰动、范数与输出尺度，且这里讨论 $x\ne0,y\ne0$ 的相对误差。

- 前向误差比较答案：$\|\hat y-f(x)\|/\|f(x)\|$。
- 后向误差寻找使 $\hat y=f(x+\Delta x)$ 成立的最小允许相对输入扰动，即这些 $\|\Delta x\|/\|x\|$ 的下确界。
- 条件数描述精确问题对小输入扰动的敏感性，而不指定执行算法。

在 $f$ 可微、扰动足够小、输入/输出范数已指定时，局部相对条件数为

$$
\kappa_f(x)=\frac{\|J_f(x)\|\,\|x\|}{\|f(x)\|}.
$$

这里 $\|J_f(x)\|$ 是相应诱导范数。由 Taylor 一阶展开，若相对输入扰动为 $\eta$，得到相对输出误差的一阶上界 $\lesssim\kappa_f(x)\eta$，另有高阶余项。这是局部最坏方向上界，不能作为每次实际误差的预测；输出接近零时应同时检查绝对误差及合适的尺度。

后向稳定的方法只保证算出某个邻近问题的精确解。问题若敏感，这个邻近解仍可能远离原解；前向误差小也不自动推出后向稳定。对算法的稳定性主张需要覆盖所声明的输入范围，一次计算正确或错误都不能代替全域分析。

## Well-conditioned-bad-computation

对 $t>0$，令

$$
f(t)=\sqrt{1+t}-1=\frac{t}{\sqrt{1+t}+1},\qquad
\kappa_f(t)=\frac{\sqrt{1+t}+1}{2\sqrt{1+t}}\longrightarrow1.
$$

问题在 $t$ 很小时仍相对良态，但直接式先加 1 再做相近数相减，可能丢掉小量。binary64、$t=2^{-54}$ 时，$1+t$ 舍入到 1，直接式返回 0，相对误差为 1。有理化式在该单点相对 100 位 Decimal 参考值的误差约为 $1.38777878\times10^{-17}$。

这说明一次坏结果可以来自计算路径，而不是问题本身敏感。该单点已经复算，但不是有理化算法在所有正数、溢出/下溢等范围内稳定的证明。

## Ill-conditioned-exact-answer

令 $g(x)=x-1$，取 $x=1+2^{-40}$，则

$$
\kappa_g(x)=\left|\frac{x}{x-1}\right|=2^{40}+1.
$$

条件数很大，但该输入与差值 $2^{-40}$ 在 binary64 均可精确表示，实际减法得到精确答案。高条件数表示可能放大输入误差，不能推断每次计算必错，尤其不能凭条件数忽略输入是否被扰动及扰动方向。

## Small-residual-large-error

令 $A=\operatorname{diag}(1,\varepsilon)$、$b=(1,\varepsilon)^T$，$0<\varepsilon<1$。精确解为 $x=(1,1)^T$，假设计算结果为 $\hat x=(1,0)^T$，则无穷范数下

$$
\frac{\|b-A\hat x\|_\infty}{\|b\|_\infty}=\varepsilon,\qquad
\frac{\|\hat x-x\|_\infty}{\|x\|_\infty}=1,\qquad
\kappa_\infty(A)=1/\varepsilon.
$$

仅允许扰动 $b$、固定 $A$ 时，归一化残差就是使 $\hat x$ 成为精确解的相对后向误差。若允许同时改 $A$，后向误差定义与归一化要另写。小残差可对应显著解误差，因此停止条件需要结合问题敏感性解释。

## Transfer-to-kv

**尚未验证的应用方向：**固定模型、query、mask、位置规则、维度和后续运算，精确注意力计算可写作 $F(K,V)$；量化所造成的状态扰动与输出变化可在这个固定问题上比较。这是定义一个数学实例，不是已估出真实条件数或已证明量化可靠。

[KV 成本分类](kv-cache-optimization.md)中，量化步长不自动等于浮点舍入单位，也不能未经分析宣称误差为 $O(u)$。删除状态会改变归一化和结构，不自动属于小连续扰动。小 logits 误差不保证采样选择、整段生成或任务质量不变；后续状态反馈和离散决策须另外分析。

[基础验证问题](../questions/foundations-validation.md)保持 open，可先在公开固定切片上记录状态扰动、高精度参考输出、输出尺度和敏感方向，再研究整段推理。本文未做模型实验。

## Links

[优化与数值分析地图](../maps/optimization-and-numerics.md)先区分精确模型保证与有限精度计算。[LP 右端证书](lp-rhs-sensitivity-certificates.md)保证固定基在某区域内仍可行最优，不能据此断言数值求解稳定；两者是互补检查，而非同一结论的不同名称。

方法联系：[张量存活与峰值内存](tensor-liveness-and-peak-memory.md)也区分数学模型与执行实现；其分配事件契约和 allocator 实测是额外系统证据，不是数值条件数或后向稳定性的等价命题。

互补的观测边界：[天文距离标尺与比例参数](velocity-distance-and-calibration.md#shared-scale)可共同变换而保持预测残差，这使小残差不能单独识别绝对尺度；本页的小残差/大误差例研究固定问题的敏感性。两者机制不同，未计算天文条件数，也不由标尺不确定断言算法不稳定。
