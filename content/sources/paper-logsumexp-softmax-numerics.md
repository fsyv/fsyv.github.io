---
title: "Blanchard、Higham、Higham：log-sum-exp 与 softmax 的数值计算"
date: 2026-11-19
draft: false
tags: [numerical-analysis, softmax]
id: "3b1cd37d-638c-4dbd-a415-70c288deb9ce"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
---

## Identity

Pierre Blanchard、Desmond J. Higham、Nicholas J. Higham，*Accurately Computing the Log-Sum-Exp and Softmax Functions*，IMA Journal of Numerical Analysis 41(4):2311–2330，2021-10；在线发表 2020-08-19。[DOI](https://doi.org/10.1093/imanum/draa038) · [实际取得的作者 PDF](https://webhomes.maths.ed.ac.uk/~dhigham/Publications/P149.pdf) · [arXiv 别名 1909.03469v1](https://arxiv.org/abs/1909.03469v1)，2019-09-08。期刊与预印本同属一项研究，canonical 为 doi:10.1093/imanum/draa038；本次是旧文新增阅读。

2026-11-19 Researcher 实读作者 PDF §1（PDF 页 1–4）及 §2 开头至 softmax Jacobian（PDF 页 4–5）。OUP 全文重定向失败，作者 PDF 替代成功；后续 §4 请求超时，没有据此声称读取其完整舍入误差定理、实验或代码。

## Evidence

§1 定义 log-sum-exp 与 softmax，说明指数直接求值的溢出/下溢问题和共同移位恒等式。§2 开头把条件数与 softmax Jacobian 联系起来，支持区分精确函数的敏感性与求值方法。实际范围未覆盖全文稳定性分析，不能仅凭这里的阅读将某一实现授予全输入域稳定性保证。

[固定注意力算子](../notes/numerical-conditioning-and-stability.md#fixed-attention-and-input-rounding)将这些区分落实为 AI 自建例子：原意图输入、存储后输入、机器输出分别作比较；键共同平移与差分改变分别执行。其参数与 Python3.15.2/Decimal100 位结果由研究员和主控独立复算，非本论文原实验或作者程序复现。误差数字只属于指定求值顺序。

## Limits

没有重新实现作者实验，未读取完整 §4 或后续定理，也未审 GPU、训练模型或低精度 KV 内核。论文中的 softmax 分析不能直接替代整段自回归生成、采样与任务质量证据。研究价值中，推进原固定算子缺口；启发价值高，输入损失与后续稳定算法可以同时出现；实际读取范围内原理可核，具体系统外推尚缺证据。
