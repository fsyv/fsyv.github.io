---
title: "TLOE：控制充分性、瞬态响应与可逆聚合"
date: 2026-11-18
draft: false
tags: [telemetry, queueing, stochastic-processes]
id: "f151887a-fdae-4415-af01-d283958864d3"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
math: true
---

## Identity

Víctor Casamayor Pujol、Nefeli-Marina Rouska、Boris Sedlak，*Top-Level Operational Equilibrium: When Is the Response of a Distributed System Predictable from Its Own Telemetry?*，2026。[arXiv:2611.20780v1](https://arxiv.org/abs/2611.20780v1)，首次提交 2026-11-16T09:27:45Z，11-17 公告。[固定 HTML](https://arxiv.org/html/2611.20780v1)。同研究[作者仓库](https://github.com/vikcas/TLOE-theoretical_analysis)与 Zenodo 1.0.0（[doi:10.5281/zenodo.24200155](https://doi.org/10.5281/zenodo.24200155)）只确认入口，未读取程序或执行。

## Read-scope

2026-11-18 研究通道读 §§2.2–2.3、3、4.1–4.3、5.1–5.3 指定段及表 2/4、6.1–6.3 指定段、7.4 及表 9/10、附录 A 推导和 B 模型设置。未通读 38 页、全部统计实验或原程序。

## Evidence

§2.2、§4.1 以平稳分布对数导数给出小控制阶跃的线性响应。S+F 支持遥测预测；R 是完整 TLOE 的额外条件。§4.2 的等价定理针对“充分且可逆聚合存在性”，有可数、正平稳分布、开放连通控制域及可微条件。Corollary 2 的首末阶段结论使用联合控制族 $\{\ln\lambda,\ln\mu_j\}$，不能弱化控制族后直接沿用。

§5.1 表 2、附录 B 在两级串联队列 $\lambda=1,\mu_1=2,\mu_2=1.6$ 的截断链上比较：控制 $\ln\lambda$、观测 $n_2$ 时，全局 score 用总 WIP；本地替代在 $t=1$ 给 0.797，而直接微扰和全局预测同为 0.255。静态本地等式由乘积平稳分布支持，并不验证瞬态。

§6.2 命题 5 区分边际分布所估 score 与模型预设 score：前者静态恒等式对 F 无区分力，后者可检验 F 与 score 猜测的联合假设。真实系统动态检验未运行。

## Support-and-limits

支持[遥测响应与控制充分性](../notes/telemetry-response-and-control-sufficiency.md)。文中表为作者数值参考模型，不是生产测量。本库只对静态几何分布作有理数代数核对，未模拟瞬态或验证代码。研究价值高，提供可检验的控制匹配条件；启发价值高，静态吻合可以掩盖动态信息遗漏；可靠性中，定理有条件，原程序与真实遥测未审。
