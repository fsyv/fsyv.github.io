---
title: "Switch Transformers：稀疏路由与负载均衡证据"
date: 2026-10-12
draft: false
tags: [foundations]
id: "f76c88bf-b71f-405e-a86e-8104f438fa48"
kind: source
maturity: developing
endorsement: ai-candidate
read_status: partial
---

**归属：资料事实的候选整理。**

William Fedus、Barret Zoph、Noam Shazeer，*Switch Transformers: Scaling to Trillion Parameter Models with Simple and Efficient Sparsity*，JMLR 23，2022，1–39页；arXiv:2101.03961。

- [期刊页面](https://www.jmlr.org/papers/v23/21-0998.html)
- [期刊原文 PDF](https://www.jmlr.org/papers/volume23/21-0998/21-0998.pdf)

## Evidence

2026-10-12实际读取 §2.1–2.2，论文第3–6页（PDF页码相同）：router softmax、专家加权、top-1 简化、专家容量式(3)、负载均衡式(4)–(6)；另读取附录 F 路由及负载损失伪代码相应部分。

这些位置支持“稀疏激活不等于总参数减少”“专家容量和负载均衡影响执行成本”。Switch 保留选中专家的门控概率；它不是所有 top-k 归一化约定的统一实现。

## Limits

没有读取全部训练、下游任务和规模实验，没有复现 TPU 实现，不采用未核验的提速或准确率数字。公开[MoE 解释](../notes/moe-routing.md)中的参数/运算计数及按专家聚集 token 的说明是本次解释，不是论文提出的通用性能保证。
