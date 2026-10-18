---
title: "非平衡功如何给出平衡自由能，为什么有限样本仍会失准？"
date: 2026-10-19
draft: false
tags: [statistical-physics, probability]
id: "4e13c9fd-ce86-4e44-a7ee-695baeff9f00"
kind: note
maturity: developing
endorsement: ai-candidate
math: true
---

**判断归属：AI 候选，尚未获用户确认。** Jarzynski 与 Seifert 指定正文支持下面的物理命题；Jensen 展开、两态算例和限定的 KL 联系为本文推导，未做物理实验。

## Physical-question

平衡自由能比较两个控制参数下的平衡态，而实际改变参数可能远离平衡，且同一操作每次做功不同。问题是能否由这些非平衡重复过程估计平衡自由能差，以及精确恒等式是否足以使有限次测量可靠。

先固定模型和符号：经典系统的微观状态为 $z$，哈密顿量为 $H(z,\lambda)$；每次在温度 $T$ 的正则平衡初态重新制备，按预设的同一协议把 $\lambda_A$ 改为 $\lambda_B$。取 $\beta=1/(k_BT)$，功对系统输入为正，沿轨迹的参数功为

$$
W=\int_0^{t_f}\dot\lambda(t)\,\partial_\lambda H(z_t,\lambda(t))\,dt.
$$

功来自外部参数变化，不能把沿途热交换也计入参数功。[Seifert §2.1](../sources/nonequilibrium-work-sources.md#seifert)用 $k_B=1$，并取散入热浴的热 $q$ 为正，写作 $w=\Delta E+q$；若热符号改为流入系统，第一定律也须相应改写。其 Langevin 模型中热噪声强度由固定浴温等条件决定，不能随驱动任意改变。

## Equality-and-mean

对满足上述制备及相应动力学条件的重复过程，Jarzynski 等式为

$$
\left\langle e^{-\beta W}\right\rangle=e^{-\beta\Delta F},\qquad
\Delta F=F_B-F_A=-\beta^{-1}\ln\frac{Z_B}{Z_A}.
$$

平均包含初始正则抽样和动力学的轨迹随机性。$F_B$ 是终参数下的**平衡参考自由能**；实际过程到达终参数时无需已经平衡。初态、协议和功定义不能在多次实验中任意混用，公式也不保证单条轨迹做功至少为自由能差。

这里的系统配分函数口径需要特别限定。[Jarzynski 式 (1)–(12)](../sources/nonequilibrium-work-sources.md#jarzynski)先对系统与热浴整体得到配分函数比 $Y_B/Y_A$；把它换为裸系统的 $Z_B/Z_A$，使用可忽略相互作用能的弱耦合条件。上述裸系统表述遵循这一条件，不能据此声称所有强耦合推广都不成立，或所有版本都必须弱耦合；相关推广本轮未读。

指数函数的凸性给出 $e^{-\beta\langle W\rangle}\le\langle e^{-\beta W}\rangle$，从而

$$
\langle W\rangle\ge\Delta F.
$$

这是重复过程平均功的约束，与个别轨迹可以有较低或负功相容。普通均功保留的是线性平均；恢复自由能用的是指数平均，二者对低功尾部的权重不同。

## A-two-state-example

**AI 可复算教学例，非实验或论文数据。** 在相同的两个状态上，取有限能量 $E_A=(0,\varepsilon)$、$E_B=(\varepsilon,0)$，令 $\beta\varepsilon=\ln99$。每次独立重新制备的初态概率为 $p_A=(0.99,0.01)$；瞬时切换参数时微观状态不变，所以做功依次为 $+\varepsilon$ 或 $-\varepsilon$。两个配分函数相等，$\Delta F=0$，但

$$
\langle W\rangle=0.98\varepsilon\approx4.5032\,k_BT,
\qquad
\left\langle e^{-\beta W}\right\rangle
=\frac{0.99}{99}+0.01\times99=1.
$$

概率只有 1% 的负功事件贡献指数平均的 99%。若 $N$ 次采样没有出现负功，指数平均估计给出 $\widehat{\Delta F}=\varepsilon\approx4.5951\,k_BT$，而非真实的零；独立制备下漏样概率为 $0.99^N$，$N=100$ 时约 36.60%，$N=300$ 时仍约 4.90%。这个有限状态例子不需要奇异硬壁或自由膨胀，也不表示 300 次足以达到某种误差保证。

## Finite-sample-boundary

令 $Y_j=e^{-\beta W_j}>0$，估计量为

$$
\widehat{\Delta F}_N=-\beta^{-1}\ln\bar Y_N,\qquad
\bar Y_N=\frac1N\sum_{j=1}^{N}Y_j.
$$

在正确重复抽样、Jarzynski 等式适用且相关期望存在时，$\mathbb E\bar Y_N=e^{-\beta\Delta F}$；由于负对数凸，Jensen 给出

$$
\mathbb E\widehat{\Delta F}_N\ge\Delta F.
$$

这一候选推导说的是重复进行整组有限样本实验后的**期望偏高**，不表示每一组估计都偏高，也不给误差上界。未观测到低功事件不能证明尾部不存在；样本量、尾部覆盖与方差诊断仍需针对模型研究。[原文采样讨论与 Seifert §9.3.3](../sources/nonequilibrium-work-sources.md)支持有限数据困难这一问题，但本轮没有审阅完整误差估计文献。

## Sudden-switch-KL

**精确但条件受限的 AI 数学联系。** 仅在同一有限状态空间、所有能量有限、初态正则且瞬时切换不改变微观状态时，定义 $p_A(i)=e^{-\beta E_A(i)}/Z_A$、$p_B(i)=e^{-\beta E_B(i)}/Z_B$，各状态概率均正。逐状态有

$$
\ln\frac{p_A(i)}{p_B(i)}
=\beta\bigl(E_B(i)-E_A(i)-\Delta F\bigr).
$$

按 $p_A$ 求平均，利用此处 $W(i)=E_B(i)-E_A(i)$，得到

$$
D_{\mathrm{KL}}(p_A\Vert p_B)
=\beta\bigl(\langle W\rangle-\Delta F\bigr).
$$

因此在**这个瞬时切换模型**内，平均耗散功对应于初态分布相对终参数平衡参考的 KL 散度。切换后的实际分布仍是 $p_A$，不是 $p_B$；两态例的 KL 为 $0.98\ln99$。一般有限时协议会改变状态，功也不再是同一个状态的端点能量差，不能照搬这一端点 KL 公式；更一般的路径关系不在本轮证明范围。

## Connections

[交叉熵与 KL](probability-cross-entropy.md#entropy-and-kl)是上述散度展开的数学前置，本节提供一个具有明确物理假设的特例；它没有把训练损失直接定义为热力学耗散。缓存搬移、网络传输和优化计算的费用也未被映射为本模型的功或热，不据符号相似创造系统结论。学习顺序与尾部采样开放问题见[统计物理地图](../maps/statistical-physics.md)。
