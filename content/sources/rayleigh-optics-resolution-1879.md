---
title: "Rayleigh 1879：矩形孔径、双线分辨与遮挡"
date: 2026-11-25
draft: false
tags: [wave-optics, resolution, history-of-science]
id: "45c1be00-896c-47df-94e0-3980f8c1da64"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
math: true
---

## Identity

Lord Rayleigh（John William Strutt），*XXXI. Investigations in Optics, with special reference to the Spectroscope*，*Philosophical Magazine*, Series 5, 8(49):261–274，1879 年 10 月，[doi:10.1080/14786447908639684](https://doi.org/10.1080/14786447908639684)、[原刊扫描](https://zenodo.org/records/1431143/files/article.pdf?download=1)。2009 年数字上线不是首发；Zenodo 创建和修改时间也不是原文发表时间。

2026-11-25，Sol 初筛只读题录和索引开头；Astra 实际取得含 Plate VII 的 15 页扫描，逐段读印刷 261–267 页（§1 及 §2 前部），视觉核 262、265、266、267、268 页与 Plate VII。268 页只读至第二遮挡式 5、表 III；269–274 页、后续仪器讨论和引用原作未读。web PDF 直取遇 Internal Error/429，代理下载后用 PDFKit 提取并渲染恢复，不把失败记成直接读取成功。

## Evidence

- 262 页圆孔第一暗环约为 $1.2197\lambda/D$ ，与 §2 矩形孔径第一暗点的系数不同。
- 265 页式 1–3 先写矩形孔径衍射强度，再对竖直方向积分，得到水平线像的 $P(u)=(\sin u/u)^2$ 。266 页表 I 和 Plate VII 图 1 比较等强独立双线，间距取单线中心到第一暗点，合像中点相对名义中心为 $8/\pi^2$ 。
- 267 页把这一分辨判据作为方便的简单规定，并指出“resolution”的含义具有不确定性，不能据此补出含噪声统计极限。
- 267 页式 4：中央挡外宽六分之一时 $F(u)=[\sin u-\sin(u/6)]/u$ 。268 页及 Plate VII 图 2 说明同间隔下谷更深，同时第一旁瓣更亮；不同对象可能因此受损。

## Independent-calculation-and-limits

[知识笔记](../notes/aperture-shaping-and-resolution-criteria.md)保留 AI 复算条件：固定入射照度、孔径外宽、波长、等强独立双线与间距。全开/遮挡的中点与名义中心合强度比分别为 0.810569/0.618646；遮挡单线中心强度为全开的 $25/36$ ，总透过光量为 $5/6$ 。前者取场振幅平方，后者按面积，不能混同；分母没有重新寻峰。这些是公式算例，不是本轮仪器测量。

研究价值中，补上有限孔径和判据所依赖的物体条件；启发价值高，更深谷和更亮旁瓣可以共存；原式、关键扫描图表及算例可靠性高，仪器噪声、明暗比、像差、固定光子预算与现代统计估计的表现未验。没有全文阅读，也未借历史约定宣称普遍的分辨硬下限。
