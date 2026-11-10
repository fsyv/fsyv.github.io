---
title: "Essex 等：用钆同位素稀释检验毫克级溶液质量测定"
date: 2026-11-10
draft: false
tags: [analytical-chemistry, mass-spectrometry, metrology]
id: "72c8da5e-1463-4237-9e2e-bda3724a0a67"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
math: true
---

## Identity

Richard M. Essex、Jacqueline L. Mann、Denis E. Bergeron、Ryan P. Fitzgerald、Svetlana Nour、Gordon A. Shaw、R. Michael Verkouteren，*Isotope dilution mass spectrometry as an independent assessment method for mass measurements of milligram quantities of aqueous solution*，*International Journal of Mass Spectrometry* 483 (2023), 116969，[DOI 10.1016/j.ijms.2022.116969](https://doi.org/10.1016/j.ijms.2022.116969)。[NIST 题录](https://www.nist.gov/publications/isotope-dilution-mass-spectrometry-independent-assessment-mass-measurements-milligram)列 2023-01-01，[期刊 PDF](https://tsapps.nist.gov/publication/get_pdf.cfm?pub_id=935167)列 2022-11-01 上线。本轮首次纳入，为旧资料。

2026-11-10 指定读取原文摘要、§2.1 Eq. (1)–(5)、§2.4、§3.1–3.3 Tables 1–4、§4 和相关图文。证据核验含印刷页 2、3、7 的方程、表格及图 2 视觉核对。未获得原始谱图、完整仪器流程复现或外部重复测量。NIST 网页摘要的小份样本单位写为微克，PDF 摘要和 Table 4 明确使用毫克，本文的测量值按期刊表格。

## Evidence

Eq. (1)–(2) 用两种不同富集溶液守恒关系推导混合比和质量。Eq. (3)–(5) 先以大份量校准，然后求小份量。Table 3 的大份量混合用约 0.5 g 富集钆 A 与约 50 g 稀 B，估得单位溶液质量钆量之比为 412.27(24)。§2.4 与 Table 1 描述不同进样和浓度、测量前后空白扣除以及标准夹测质量分馏；不能把不同设置下所有原始增益都视为共同倍率。

Table 4 的喷墨行比较同一分液配置的 IDMS 估值和按预先称量校准换算的喷墨质量。以下是两个方向不同的例子。括号是末位扩展不确定度，覆盖因子为 2。

| 样品编号 | IDMS 储液等效质量（mg） | 喷墨沉积质量估值（mg） |
| --- | --- | --- |
| 1 | 1.03367(92) | 1.0246(24) |
| 12 | 0.74776(48) | 0.7685(18) |

以 IDMS 估值为分母，喷墨样品 1、20、29 低约 0.84%–0.88%，样品 12 高约 2.8%。§4 将前三个差异解释为与蒸发一致，样品 12 的原因不确定，作者提出部分喷墨液滴没有进入接收瓶的可能性。实验所报 IDMS 相对扩展不确定度约 0.06%–0.09%，不能把方法间差值或覆盖区间直接写成单个方法的准确度。

## Support-and-limits

支持[同位素配比和质量估计](../notes/isotope-dilution-and-solution-mass.md)。储液等效量不使用目标微滴的称量读数，但仍依赖大份量称量、钆比例校准、稳定储液和分析仪器。分析消耗样本，不能直接确定微滴沉积时尚存的溶剂量。研究价值在于给出独立的测量路径，启发在于同一液滴的两种合理质量定义可能产生系统差值。已读方程和表格的出处可靠，蒸发和漏滴的因果归因仍待区分。
