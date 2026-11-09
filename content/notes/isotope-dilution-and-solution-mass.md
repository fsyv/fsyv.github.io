---
title: "同位素配比怎样测出储液等效质量？"
date: 2026-11-10
draft: false
tags: [analytical-chemistry, mass-spectrometry, metrology]
id: "fdaef64d-1179-445b-854e-85bd718d69da"
kind: note
maturity: developing
endorsement: ai-candidate
math: true
---

**判断归属为 AI 候选。** 守恒式为说明性推导，钆测量和校准取自 [Essex 等的期刊原文](../sources/paper-isotope-dilution-solution-mass.md)。

## Question

微滴落入瓶内后不易直接称量，如何用可追溯的化学读数检验分液？一种做法是以稳定的元素含量为桥梁。测出进入混合液的钆物质的量，再除以 A 储液每单位溶液质量的钆量，可得到这些钆对应的储液等效质量。储液中的水在途中蒸发时，这一估计与沉积时的液体质量可以不同。

## Ratio-balance

令 A、B 两份溶液的钆量分别为 $n_A,n_B$，它们在同位素 $i,j$ 上的份额分别为 $a_i,a_j$ 与 $b_i,b_j$。按两种同位素各自守恒，混合物的同位素比为

$$
R=\frac{n_Aa_i+n_Bb_i}{n_Aa_j+n_Bb_j}.
$$

为得到两份溶液的相对钆量，定义端点比 $R_A=a_i/a_j$、$R_B=b_i/b_j$，在分母同位素的两份额均正且端点不同时，整理得

$$
\frac{n_A}{n_B}=\frac{b_j}{a_j}\frac{R_B-R}{R-R_A}.
$$

这个式子使用的是分母同位素各自的份额。同位素比通常不能直接按总钆量加权平均。对正的两份输入，混合比介于端点之间。两端点相同时，任意配比给出同一个读数。靠近端点时，比值测量的小误差也可能造成相对量的大误差。

## Calibration

令 $q_A,q_B$ 表示两种储液每单位溶液质量的钆量，$m_A,m_B$ 为两份的等效质量。用 $n_A/n_B=(q_A/q_B)(m_A/m_B)$ 把上式变成质量关系。先以可准确称量的较大 A、B 配液质量和其测得混合比校准 $q_A/q_B$，再用同一关系处理小样。原文 Eq. (3)–(5) 用校准混合物的结果代入小样式，消去两端点的分母同位素份额。记 $R_{\mathrm{cal}}$ 为大样的混合比，$m_{A,\mathrm{cal}},m_{B,\mathrm{cal}}$ 为其称量质量，则

$$
m_A=m_B\frac{m_{A,\mathrm{cal}}}{m_{B,\mathrm{cal}}}
\frac{(R_B-R)/(R-R_A)}{(R_B-R_{\mathrm{cal}})/(R_{\mathrm{cal}}-R_A)}.
$$

同一倍率作用于四个已对齐的比值时，在比差中抵消。实验用了不同进样条件，并测空白、校正增益、用标准夹测质量分馏。共同倍率可以抵消的代数条件只描述校正后的比较，样品特有的偏差仍会影响估值。

## Loss-and-target

AI 算例取 A 的同位素份额为 0.1、0.9，B 的为 0.9、0.1。两份各带入 1 单位钆，混合比为 1。均匀混合后若两来源的钆同比例减少一半，混合比仍为 1。若混合前只到达 0.5 单位 A 和 1 单位 B，混合比为 $0.95/0.55=19/11$，反推得到的是 A 真正送达的 0.5 单位。这一差别依赖均匀混合、共同损失和储液组成可追溯。若只有溶剂蒸发，送达的钆仍可标记原储液等效质量。若 A 液滴携钆落在瓶外，方法只能估计进入样本的份额。

原文 Table 4 中喷墨样品 1、20、29 的沉积质量相对 IDMS 储液等效估计低 0.84%–0.88%，方向与蒸发相符。样品 12 反向，约高 2.8%，原文保留落滴损失等可能性。所报 IDMS 相对扩展不确定度约 0.06%–0.09%，覆盖因子 $k=2$。该不确定度量化读数及校准对估计的贡献，不能将其当作真值误差上限。实际测量依赖大样称量、标准、仪器校正及消耗样品的分析过程。 [具体口径和读数](../sources/paper-isotope-dilution-solution-mass.md#evidence)

## Links

[分析化学地图](../maps/analytical-chemistry-and-measurement.md)按守恒、标定、损失与测量目标组织阅读。[DNA 示踪的遗传实验](../maps/molecular-genetics-and-experimental-inference.md)也用同位素标记区分过程，属于设计类比。遗传实验借密度分布识别复制模型，本例借已知配比估计送达量，两者的观测方程不同。
