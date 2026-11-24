---
title: "Parsons、Flack、Wagner：反射强度商与绝对结构精修"
date: 2026-11-25
draft: false
tags: [crystallography, anomalous-scattering, inverse-problems]
id: "130efd6d-c299-4013-92a2-76b3e3c9402f"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
math: true
---

## Identity

Simon Parsons、Howard D. Flack、Trixie Wagner，*Use of intensity quotients and differences in absolute structure refinement*，*Acta Crystallographica B* 69:249–259，2013，[doi:10.1107/s2052519213010014](https://doi.org/10.1107/S2052519213010014)、[作者公开重印](https://crystal.flack.ch/dox/gp5062.pdf)、[PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC3661305/)。2013-05-17 在线，2013-06-01 卷期，不把检索日当首发。

2026-11-25 指定读 §1–2、式 1–6、§3.1–3.4 测量与权重、表 1 的 l-alanine B 行、§4.1/4.5/4.6/5。作者重印 PDF 12 页可取；PMC web 遇验证码，经指定文本入口恢复。两页截图超时，未视觉核验，不记全文、supplement、原始数据、独立精修或新实验已完成。

## Evidence

- §1–2、式 1：异常散射允许 Friedel 对强度不同。反演畴比例 $x$ 下，参考单畴强度 $A,B$ 形成测量值 $I_+=(1-x)A+xB$ 、 $I_-=(1-x)B+xA$ 。
- 式 6：差和商为 $Q=(I_+-I_-)/(I_++I_-)=(1-2x)(A-B)/(A+B)$ 。 $A=B$ 没有反演比例信息； $x=1/2$ 消掉配对差不等于晶体中心对称。先合并反向反射会丢掉该识别信号。
- §3、表 1：l-alanine B、100 K、Cu Kα、Bruker B 数据多重度为 25。对同一测量，传统估计 $x=-0.04$ 、标准不确定度 0.27；post-refinement quotient 估计 0.01、标准不确定度 0.04；TOPAS quotient 估计 0.01、标准不确定度 0.03。标准不确定度不是置信区间；估计为负不代表负物理比例，不能裁剪后冒充提高精度。
- §2.2/4.5：现代 area detector 不保证反射对的系统误差匹配，商不保证消掉所有误差。§3.4、§4.1/4.6/5 的配对、权重、异常值及弱信号边界须与结果同读。quotient 与 difference 的误差差别通常很小，不能据单行对照宣布商普遍更好。

## Support-and-limits

[既有衍射笔记的反演扩展](../notes/bragg-diffraction-and-structural-inference.md#anomalous-scattering-and-inversion-pairs)保留原先实因子镜像例，并用 AI 复振幅算例解释假设改变后为何可能出现反向强度差。这是对理想模型的候选推广，未把一维例子当真实原子参数、三维手性或结构唯一性证明。

研究价值高，给到期的镜像歧义问题增加原始方法和同数据比较；启发价值高，说明平均化可能抹掉识别所需的不对称。可靠性中：指定原文可定位，但没有配对原数据、系统误差复算或独立精修。本文不解决一般相位问题或所有结构唯一性。
