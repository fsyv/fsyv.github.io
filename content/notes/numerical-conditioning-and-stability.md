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

## Fixed-attention-and-input-rounding

**2026-11-19 新增 AI 候选与说明性验算。** 原先这里只提出固定 $F(K,V)$ 的检验方向；现在完成一个两键算子，分开输入表示损失与算术误差，尚未测训练模型或 GPU。理论背景来自 [Blanchard、Higham、Higham 的 softmax 论文指定部分](../sources/paper-logsumexp-softmax-numerics.md)；下述参数、推导和执行均为 AI 构造，不是论文实验或其误差定理的复现。

固定一个 query 为 $q=1$ 、键维度 $d_k=1$ 、两个位置均可见、无额外位置偏置，值为 $V=(-1,1)$ 。这里仅改变键 $K=(k_1,k_2)$ 。精确注意力输出可先按权重定义，再化简为键差的函数：

$$
F(K)=\frac{-e^{k_1}+e^{k_2}}{e^{k_1}+e^{k_2}}
=\tanh\!\left(\frac{k_2-k_1}{2}\right).
$$

因此 $K=(a,a+1)$ 对任意有限实数 $a$ 都给出 $\tanh(1/2)\approx0.4621171572600097585$ 。共同平移并未改变问题的精确答案。实际计算可先减最大键 $m=\max(k_1,k_2)$ ，求 $e_i=\exp(k_i-m)$ ，再求分母 $d=e_1+e_2$ 、权重 $p_i=e_i/d$ 和输出 $p_2-p_1$ 。这个移位避免直接计算很大的指数，但它操作的是**已经存入机器的输入**。

要判断误差出现在哪一层，以下固定三个比较对象：原意图输入的精确输出 $F(K)$ 、已存 binary64 输入的高精度参考 $F(\widetilde K)$ ，以及 binary64 计算 $\widehat F(\widetilde K)$ 。算术误差只比较后两者；总误差比较机器输出与原意图。Python 3.15.2 arm64 标准库按上述先分别除再相减的顺序运行，Decimal 以 100 位精度取参考，160 位复查其首 99 位（精度加倍核查，不是严格区间证书）；研究员与主控按同一规范独立复算一致。

| 原意图 $K=(a,a+1)$ | binary64 中的键差 | $F(\widetilde K)$ | 移位算法输出 | 算术绝对误差 |
| --- | ---: | ---: | ---: | ---: |
| $a=0$ | 1 | $0.4621171572600097585\ldots$ | 0.4621171572600098 | $3.35945\times10^{-17}$ |
| $a=1000$ | 1 | 同上 | 0.4621171572600098 | 同上 |
| $a=2^{53}$ | 0 | 0 | 0 | 0 |

直接对 1000 求 binary64 `exp` 抛出 `OverflowError`，移位计算却保留了正常输出。这是改变算术路径的效果。第三行则不同：精确整数 $2^{53}+1$ 转成 binary64 时先舍入为 $2^{53}$ ，两个已存键相同，输出 0 正是该已存问题的答案。此时算术误差为零，总输出绝对误差仍为 $0.462117\ldots$ ；输入相对无穷范数误差仅为 $1/(2^{53}+1)\approx1.11022\times10^{-16}$ 。移位不会恢复在输入表示时已经丢失的键差，不能把这行称为 softmax 把已存问题算错。

下面保留复算所需的核心代码。原意图使用整数直接构造 Decimal；已存输入使用 `Decimal.from_float`，避免将其十进制显示字符串误当精确机器值。先分别求权重再相减的求值顺序不能偷偷换成先合并分子，否则 binary64 末位可变。

```python
from decimal import Decimal, localcontext
from math import exp

with localcontext() as ctx:
    ctx.prec = 100
    def reference(k):
        m = max(k)
        e = [(x - m).exp() for x in k]
        den = sum(e)
        return e[1] / den - e[0] / den

    for a in (0, 1000, 2**53):
        intended = [Decimal(a), Decimal(a + 1)]
        stored = [float(a), float(a + 1)]
        m = max(stored)
        e = [exp(x - m) for x in stored]
        den = sum(e)
        output = e[1] / den - e[0] / den
        stored_ref = reference([Decimal.from_float(x) for x in stored])
        arithmetic_error = Decimal.from_float(output) - stored_ref
        total_error = Decimal.from_float(output) - reference(intended)
        print(a, output, arithmetic_error, total_error)
```

扰动大小也不能脱离方向解释。在原键 $K=(0,0)$ 上取 $\varepsilon=2^{-20}$ ，比较无穷范数都为 $\varepsilon$ 的两个绝对扰动：共同移动 $(\varepsilon,\varepsilon)$ 仍输出 0；反向移动 $(\varepsilon,-\varepsilon)$ 则输出 $-\tanh(\varepsilon)\approx-9.536743164059609\times10^{-7}$ 。前者不改键差，后者改变键差。因为原输入和输出都为零，这里使用绝对输入/输出误差，不定义以零为分母的相对误差。

这个算子补足的是固定问题的执行与方向性检验，而非真实 KV 量化效果。binary64 输入舍入与 FP8/BF16 缓存量化不是同一个扰动机制；改变 $q$ 、维度、位置规则、mask、 $V$ 或后续采样会改变问题。进入模型切片前仍须固定这些对象，分别保存原意图、实际存储状态与高精度参考，再追踪误差到 logits 和离散选择；一次局部反例不证明某种格式普遍可靠或不可靠。

## Links

[优化与数值分析地图](../maps/optimization-and-numerics.md)先区分精确模型保证与有限精度计算。[LP 右端证书](lp-rhs-sensitivity-certificates.md)保证固定基在某区域内仍可行最优，不能据此断言数值求解稳定；两者是互补检查，而非同一结论的不同名称。

方法联系：[张量存活与峰值内存](tensor-liveness-and-peak-memory.md)也区分数学模型与执行实现；其分配事件契约和 allocator 实测是额外系统证据，不是数值条件数或后向稳定性的等价命题。

互补的观测边界：[天文距离标尺与比例参数](velocity-distance-and-calibration.md#shared-scale)可共同变换而保持预测残差，这使小残差不能单独识别绝对尺度；本页的小残差/大误差例研究固定问题的敏感性。两者机制不同，未计算天文条件数，也不由标尺不确定断言算法不稳定。

[频率稳定度](frequency-stability-and-allan-variance.md)提供另一项评价对象的对照：相邻差看不到固定频偏。这是方法联系，不能把时钟稳定度与本页前向/后向误差当同一定义。

[舍入边界与服务批组成](kv-cache-mechanism.md#rounding-and-execution)提供执行层实例：保留归约次序和中间舍入可使指定融合路径在固定输入/批次下bit相同，容量改变后的重新分组仍可能改结果。它补充机器计算条件，不由有限请求一致证明普遍前向稳定、跨硬件恒同或答案正确。

[精确归约与布局不变性](certified-summation-and-layout-invariance.md)补充另一条执行保证：固定量化求和项并精确保留部分和后，可以允许某些归约树变化。它保证指定对象的机器结果相同，与本页前向误差或稳定性仍是不同问题。
