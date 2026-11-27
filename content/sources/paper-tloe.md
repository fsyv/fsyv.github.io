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

Víctor Casamayor Pujol、Nefeli-Marina Rouska、Boris Sedlak，*Top-Level Operational Equilibrium: When Is the Response of a Distributed System Predictable from Its Own Telemetry?*，2026。[arXiv:2611.20780v1](https://arxiv.org/abs/2611.20780v1)，首次提交 2026-11-16T09:27:45Z，11-17 公告。[固定 HTML](https://arxiv.org/html/2611.20780v1)。同研究[作者仓库](https://github.com/vikcas/TLOE-theoretical_analysis)与 Zenodo 1.0.0（[doi:10.5281/zenodo.24200155](https://doi.org/10.5281/zenodo.24200155)）在 2026-11-18 只确认入口，未读取程序或执行；11-25 的新增范围见下。

## Read-scope

2026-11-18 研究通道读 §§2.2–2.3、3、4.1–4.3、5.1–5.3 指定段及表 2/4、6.1–6.3 指定段、7.4 及表 9/10、附录 A 推导和 B 模型设置。未通读 38 页、全部统计实验或原程序。

## Evidence

§2.2、§4.1 以平稳分布对数导数给出小控制阶跃的线性响应。S+F 支持遥测预测；R 是完整 TLOE 的额外条件。§4.2 的等价定理针对“充分且可逆聚合存在性”，有可数、正平稳分布、开放连通控制域及可微条件。Corollary 2 的首末阶段结论使用联合控制族 $\{\ln\lambda,\ln\mu_j\}$ ，不能弱化控制族后直接沿用。

§5.1 表 2、附录 B 在两级串联队列 $\lambda=1,\mu_1=2,\mu_2=1.6$ 的截断链上比较：控制 $\ln\lambda$ 、观测 $n_2$ 时，全局 score 用总 WIP；本地替代在 $t=1$ 给 0.797，而直接微扰和全局预测同为 0.255。静态本地等式由乘积平稳分布支持，并不验证瞬态。

§6.2 命题 5 区分边际分布所估 score 与模型预设 score：前者静态恒等式对 F 无区分力，后者可检验 F 与 score 猜测的联合假设。真实系统动态检验未运行。

## Support-and-limits

支持[遥测响应与控制充分性](../notes/telemetry-response-and-control-sufficiency.md)。文中表为作者数值参考模型，不是生产测量。11-18 只对静态几何分布作有理数代数核对；11-25 补充指定代码阅读与独立瞬态数值复算，范围见下。研究价值高，提供可检验的控制匹配条件；启发价值高，静态吻合可以掩盖动态信息遗漏；可靠性中，定理有条件，原程序没有执行、真实遥测未测。


## Implementation-and-independent-check

2026-11-25 读取同研究作者库固定提交 [e0ced5d91eaeb36af24c903f7fb9748aca1a7cd5](https://github.com/vikcas/TLOE-theoretical_analysis/tree/e0ced5d91eaeb36af24c903f7fb9748aca1a7cd5)，该提交时间为 2026-11-13T14:42:17Z。实际范围为 README、[exact/exact.py 第 4–35 行](https://github.com/vikcas/TLOE-theoretical_analysis/blob/e0ced5d91eaeb36af24c903f7fb9748aca1a7cd5/exact/exact.py#L4)及[exact/verify_tloe.py 第 10–41 行](https://github.com/vikcas/TLOE-theoretical_analysis/blob/e0ced5d91eaeb36af24c903f7fb9748aca1a7cd5/exact/verify_tloe.py#L10)；论文复读 §5.1 表 2、命题 1/5 与附录 B 的相应公式和模型说明。代码首次指定阅读不是新发表或新版本，没有执行作者脚本、全部统计实验或真实遥测测试。

程序将状态写为 $(n_1,n_2)$ ，到达在 $n_1<70$ 时以速率 $\lambda$ 增加第一级，转运在 $n_1>0,n_2<K_2$ 时以速率 $\mu_1$ 从一级移到二级，离开在 $n_2>0$ 时以速率 $\mu_2$ 减少第二级。J 模型取 $K_2=70$ 。作者以稀疏线性方程求稳态，以 `expm_multiply` 演化分布，并以 $h=10^{-5}$ 对对数控制作中心差分。

主控因当前 Python 缺少 NumPy/SciPy，独立用标准库重写均匀化和到达率解析切线计算。固定均匀化率为 5，初态为无限模型乘积几何律在 $0\ldots K$ 平方上的截断归一，并非作者截断链的精确稳态。在 $K=70$ 时，该初态的生成元平稳残差 $L^1$ 范数约为 $2.24\times10^{-15}$ ，在 $K=90$ 时约为 $3.47\times10^{-16}$ 。这些是浮点残差，不是严格包围界。

对原参数、 $t=1$ 的第二级响应， $K=40,70,90$ 分别给出 0.255171896507、0.255171897752、0.255171897752。 $K=70$ 时总量协方差预测为 0.255171897752，本地预测为 0.797316572327； $t=4$ 则分别为真实 1.416292688638、总量预测 1.416292688638、本地预测 2.163903702529。另在同一初态下用 $h=10^{-4},10^{-5}$ 的正负扰动中心差分复核 $t=1$ ，结果为 0.255171897802、0.255171897756，与解析切线相差约 $5.0\times10^{-11}$ 和 $4.3\times10^{-12}$ 。

[知识笔记的短时展开](../notes/telemetry-response-and-control-sufficiency.md#propagation-order-and-independent-check)是独立 AI 推导：无限缓冲稳定模型的真实响应从 $t^2$ 阶开始，本地自协方差公式从 $t$ 阶开始。计算在 $t=0.001,0.01$ 上核对阶数趋势，没有把这种有限数值一致说成严格全时间误差证书。研究价值高，补上既有参考模型的执行证据；启发价值高，提供控制影响沿状态跳转传播的解释；可靠性按层区分，指定原件与条件推导可核，浮点数值非严格，生产适用性未验。
