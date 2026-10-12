---
title: "随机图与无标度：生成机制和实证检验的来源"
date: 2026-10-12
draft: false
tags: [foundations]
id: "bc6934db-8595-4eca-90ee-6df1660c0c9b"
kind: source
maturity: developing
endorsement: ai-candidate
read_status: partial
---

**归属：资料事实的候选整理。** 阅读日期2026-10-12。

## Growth

Albert-László Barabási、Réka Albert，*Emergence of Scaling in Random Networks*，Science 286，1999，509–512页，DOI：10.1126/science.286.5439.509；arXiv:cond-mat/9910332。

[作者提供的原论文 PDF](https://barabasi.com/media/Emergence-Barabasi-1999_gN74Tws.pdf)。实际读取 p.510–511 的 ER/WS 比较、增长与线性优先连接、连续近似幂律推导及局限。未逐一核验其现实网络数据；不把1999论文的广泛性判断直接作为今天所有网络的定论。

## Empirical

Anna D. Broido、Aaron Clauset，*Scale-free networks are rare*，Nature Communications 10，1017，2019；预印本2018，DOI：10.1038/s41467-019-08746-5，arXiv:1801.03400。

[论文 HTML](https://arxiv.org/html/1801.03400)；[书目信息](https://arxiv.org/abs/1801.03400)。实际读取摘要、§II.1 的尾部拟合与候选模型比较、证据分类说明及相邻结果；未复核全部数据与附录实现。采用其“拟合—可接受性—相对优劣须区分”的方法论证据，不把特定数据集合或阈值视为所有网络的最终裁决。

## Inference

[网络解释](../notes/network-random-and-scale-free.md)中的有限 ER 二项分布、泊松极限条件、平均度与幂律均值求和，是按模型定义给出的推导。它们不依赖把有限图精确说成泊松分布，也不从度分布直接推出任意系统的故障行为。
