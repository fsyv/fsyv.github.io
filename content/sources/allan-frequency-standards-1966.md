---
title: "Allan（1966）：原子频率标准的样本方差与时间尺度"
date: 2026-11-03
draft: false
tags: [metrology, frequency]
id: "29db0a83-1258-4afa-bc15-0789c5aba5ba"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
math: true
---

## Identity

David W. Allan，*Statistics of Atomic Frequency Standards*，Proceedings of the IEEE 54(2)，221–230，1966。[NIST原篇扫描](https://tf.nist.gov/general/pdf/7.pdf)。本日近期发现的旧资料，不称新发表。规范去重标识采用 `allan:statistics-atomic-frequency-standards:1966`；本轮没有另行核DOI。

2026-11-03实际读题录/摘要与§II-A/B/C/D印刷221–226页指定定义、样本数、测量间隙和flicker讨论，视觉核印刷223页式11–15和225页式21–24。未读§III–IV实验、附录、置信区间推导或引用文献，未复现时钟测量。

## Evidence

印刷223页式11定义由 $N$ 个频率平均组成的有限样本方差，测量周期为 $T$，每次平均时长为 $\tau$；无测量间隙时 $T=\tau$。$N=2$ 的差平方形式和现代分数频率记法间的换算，在[知识笔记](../notes/frequency-stability-and-allan-variance.md#adjacent-differences)中明确标为AI整理，而非原文现代符号的逐字转录。

印刷225页式21在原文相位谱 $S_\phi(\omega)=h|\omega|^{-3}$ 的flicker频率噪声模型下，给零间隙频率/角频率样本方差期望

$$
\mathbb E\sigma^2(N,\tau)=\frac{2hN\ln N}{N-1}.
$$

其中 $h$ 是原文相位谱系数，不能直接冒充现代分数频率谱系数。$N=2$ 为 $4h\ln2$，固定 $N$ 时不含 $\tau$；大 $N$ 近似 $2h\ln N$。若改用无量纲分数频率方差，须再除以参考角频率平方 $\Omega_0^2$，不能把原式数值原样代入。此式不是均值估计误差。

印刷224页讨论低频截止与近似成立的时间范围；225–226页扩展到固定 $r=T/\tau$ 的有间隙测量。幂律理想化不能无条件延伸到无限时间。原篇揭示报告方差时需同时说明 $N,T,\tau$ 及带宽等条件，不能让样本数变化伪装成频率标准自身变化。

## Support-and-limits

支持[频率稳定度与准确度的完整解释](../notes/frequency-stability-and-allan-variance.md)。固定偏差相消、两个四点平移序列、独立白噪声的平方根尺度及一般协方差恒等式均为AI教学推导，不是原篇实验。研究价值中在补测量定义，启发价值高在说明差分指标会有看不见的偏差；限定代数关系可靠性高，现实钟、参考误差和有限置信度未建立。

PDF文字公式存在提取误读风险，关键式已用原页图像核对。本轮未由稳定度斜率唯一识别噪声，也未把频率噪声模型套给计算系统时延或数值算法。
