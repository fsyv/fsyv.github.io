---
title: "Gaia Early Data Release 3：视差偏差与亮度、颜色、位置"
date: 2026-11-11
draft: false
tags: [astronomy, gaia, calibration]
id: "1161156f-0474-4952-9da8-d3f07a53c4e8"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
math: true
---

## Identity

L. Lindegren、U. Bastian、M. Biermann 等，*Gaia Early Data Release 3: Parallax bias versus magnitude, colour, and position*，2021，*Astronomy & Astrophysics* 649，A4。[DOI 10.1051/0004-6361/202039653](https://doi.org/10.1051/0004-6361/202039653)，[期刊 PDF](https://www.aanda.org/articles/aa/pdf/2021/05/aa39653-20.pdf)。[arXiv:2012.01742](https://arxiv.org/abs/2012.01742) v1 首提于 2020-12-03 07:50:10 UTC，v2 于 2020-12-06 10:18:17 UTC 修正公式 (A.3) 排印，题录注明关联代码未受影响。这是旧资料回访。

## Read-scope

实际证据来自 [arXiv v2 指定正文](https://arxiv.org/html/2012.01742v2)与期刊 PDF 文本复核。§4 及 §4.1 是五参数类星体的绝对锚及样本统计，§4.2–4.4 是大麦哲伦云相对约束、曲率外推及物理双星亮端传递，§5 是利用同一天体的两种解估计六参数偏差，§6 区分数据重用与额外检验，§8 讨论很红天体外推的边界。§4.3 对 $G\ge13.1$ 的偏红中段令 $q_{21}=q_{22}=0$，很红段的黄纬交互另以 $q_{31}=q_{32}=0$ 约束。两者对应不同颜色区间。本轮未重算校正表、运行作者代码或从星表复核曲线。

支持[绝对零点、相对传递与外推](../notes/gaia-parallax-zero-point-calibration.md)。研究价值中高，在旧有共同尺度问题之外提供可定位的观测标定实例。启发价值高，绝对锚与相对差分有不同识别作用。论文指定范围和 AI 差分算例可核，跨天区拟合、极红目标及移用到别的数据版本仍依赖额外检验。
