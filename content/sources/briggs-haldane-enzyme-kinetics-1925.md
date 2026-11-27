---
title: "Briggs与Haldane：酶动力学中的准稳态近似"
date: 2026-11-24
draft: false
tags: [biochemistry, enzyme-kinetics]
id: "ef99fa7c-d7ea-4df5-ac29-936253743cfd"
kind: source
maturity: developing
endorsement: not-applicable
read_status: read
math: true
---

## Identity

George Edward Briggs、John Burdon Sanderson Haldane，*A Note on the Kinetics of Enzyme Action*，*Biochemical Journal* 19(2)，338–339，1925，DOI[10.1042/bj0190338](https://doi.org/10.1042/bj0190338)。[PMC入口](https://pmc.ncbi.nlm.nih.gov/articles/PMC1259181/?page=0)；官方扫描[338页](https://cdn.ncbi.nlm.nih.gov/pmc/blobs/e745/1259181/b678c90304fa/biochemj01157-0177.png)、[339页](https://cdn.ncbi.nlm.nih.gov/pmc/blobs/e745/1259181/26b9fd605ea9/biochemj01157-0178.png)。原页记1925-03-09收稿；publisher显示Jan01与之不一致，本页只确定出版年，不以收稿日充发表日。

2026-11-24，Sol仅题录/索引片段初筛；Astra实际读取全两页及参考目录，并逐页视觉核上述官方扫描。初筛曾将PDF索引可读误述成全文可取，已纠正；publisher直取/截图403与PMC部分入口captcha没有被记成成功。没有读取原文所引1913、1914等论文，read_status仅指这篇两页短文。

## Evidence

- 338页从可逆结合和产物形成的反应链讨论结合物的生成与消失。准稳态总流入可以同时补偿解离和催化，不要求结合与解离相互平衡。
- 338–339页在小酶量相对底物、起始调整之后约化速率。换成现代符号后，半饱和常数是 $(k_2+k_3)/k_1$ ，仅在催化远慢于解离时近似 $k_2/k_1$ 。这些现代记号与守恒式是AI整理，不作为原文逐字公式。
- 339页括号内 $dp/dt$ 式的分子为 $e^2$ ，搜索OCR曾错为 $e$ ；扫描优先。本库未使用该损坏OCR推算数值，也未从历史短文引申现代统一近似误差界。

## Support-and-limits

支持[酶准稳态与参数识别](../notes/enzyme-quasi-steady-state-and-identifiability.md)。两参数组、通量和冻结底物时间常数是AI说明性算例，未出自原文实验，也没有复现真实酶。原文两页可核，本库未追引文、读取现代普适有效性定理或检验仪器瞬态。不能从相同约化曲线推所有完整动力学相同。
