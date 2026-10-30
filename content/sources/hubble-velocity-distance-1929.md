---
title: "Hubble 1929：速度—距离原文、标尺与证据范围"
date: 2026-10-21
draft: false
tags: [astronomy, calibration, history-of-science]
id: "f2e774e9-503a-4f5e-9351-6310c1303b6c"
kind: source
maturity: developing
endorsement: not-applicable
read_status: read
math: true
---

## Identity-and-reading

Edwin Hubble，*A Relation between Distance and Radial Velocity among Extra-Galactic Nebulae*，PNAS 15(3):168–173，1929，DOI [10.1073/pnas.15.3.168](https://www.pnas.org/doi/full/10.1073/pnas.15.3.168)。期次日期为 1929-03-15，PNAS 网页另列 1929-04-25，保留字段差异，不将其称为新版本；p.168 标注 Communicated January 17, 1929。

2026-10-21 实际视觉读取 [PMC 全部六张官方扫描](https://pmc.ncbi.nlm.nih.gov/articles/PMC522427/)中属于本文的部分：p.168 下半标题起至 p.173 结束，含 Tables 1/2、未编号方程与结果表、Figure 1、四条引用题录。p.168 上半属于前篇，不纳入；没有追读引用、重建观测或重新联合拟合。同时读 [NASA 完整转录](https://science.nasa.gov/apod/a-relation-between-distance-and-radial-velocity-among-extra-galactic-nebulae/)，以 PNAS 三张图交叉核验表图；这些是同论文不同呈现，不重复计算来源。NASA 转录缺表图，不能代替扫描。

## Evidence

| 位置 | 实际内容与支持范围 |
| --- | --- |
| pp.168–170、Table 1（p.169） | 46 个径向速度、其中 24 个有个体距离。前 7 个较可靠（M32 除外依多恒星调查），随后 13 个用最亮恒星绝对亮度近似上限，最后 4 个 Virgo 目标共同取 2 Mpc。距离最终依赖造父变星周期—光度关系的标定零点，最亮恒星判据原文称粗糙且需谨慎；不是统一精度的独立测距。 |
| p.170 未编号方程/结果表 | 联合估计速度—距离系数和太阳运动的径向投影项。24 个体给 $K=465\pm50$ ，按方向/距离组成 9 组给 $513\pm60$ ，单位均为 km/s/Mpc。本文没有充分定义 ± 的现代统计含义，不能称为 1σ、标准误或 95% 置信区间；9 组仍是同一批对象。 |
| pp.170–171、Figure 1（p.172） | 四个最远 Virgo 目标共享星系团特殊运动，对 $K$ 和太阳项影响过大，作者建议更远观测。两解残差原文称 average 150/110 km/s，未说明统计口径，不改写为 RMS/标准差。Figure 1 用扣除太阳运动后的速度。 |
| pp.171–173、Table 2 | 其余 22 个先以平均亮度估得组平均距离 1.4 Mpc、太阳修正后平均速度 745 km/s；原文给约 530 的比例系数。另一检查先假定既有 $K$ ，由速度反算个体距离，再求绝对亮度分布；在此散布检查中作者提出可排除 NGC404。Table 2 的距离不是独立测距点。 |
| p.173 | 线性关系只被称为有限距离范围的一阶近似，de Sitter 为可能解释，需更多资料；没有单篇独自证明现代宇宙学。 |

## Model-convention

原文形式为 $rK+X\cos\alpha\cos\delta+Y\sin\alpha\cos\delta+Z\sin\delta=v$ 。 $X,Y,Z$ 按原式表示太阳运动对观测径向速度影响的拟合系数，不能直接叫太阳实际速度矢量的同号分量：个体解为 $-65,226,-195$ ，太阳顶点却列 $A=286^\circ,D=40^\circ$ ，方向相反。现代教学的残差项应明确为 AI 显式加入。

## Interpretation-and-limits

[完整解释](../notes/velocity-distance-and-calibration.md)按同一模型、方向、观测、损失和权重，独立推导共同距离缩放 $r'=ar$ 可由 $K'=K/a$ 抵消；这是 AI 代数推导，不是作者做过的标定实验。 $745/1.4\approx532.14$ 也为 AI 算术核验，对应原文约 530；不能把亮度检查与反算距离混作两份独立验证。

本篇不补现代 $H_0$ 数值、后续距离修订或发现归功史。当前仍缺独立绝对校准、跨星系团观测、距离误差和组内相关模型的原始证据。[天文地图](../maps/astronomy-and-observational-inference.md)保留下一步问题。
