---
title: "Transport, Entropy, and the Cost of Dependence"
date: 2026-11-11
draft: false
tags: [probability, entropy, optimal-transport]
id: "fab5c1a8-df22-47a9-82b5-86700a112774"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
---

## Identity

André Bertolace、Konstantinos Gatsis、Kostas Margellos，*Transport, Entropy, and the Cost of Dependence: Maximum Conditional Entropy under Transport Constraints*，2026。[arXiv:2611.12752v1 题录](https://arxiv.org/abs/2611.12752v1)，11-09 17:33:49 UTC 首提，11-10 公告。[固定 HTML 正文](https://arxiv.org/html/2611.12752v1)。

## Read-scope

阅读 §2.1 式 (1)–(2)，§3.1 命题 1 与推论 1，§3.2 独立条件核，§4 命题 3、推论 5、定理 4.1、推论 6 及指定证明，§5.1 命题 5 和 §6 的两点例指定段。§3.2 给出 Wasserstein 预算下独立抽样达到同一边际的最大条件熵。§4 通过低成本耦合把边际优化写在实际成本可行的联合分布上，并用互信息比较目标。未阅读所有附录或 PDF 图像，未运行实际采样或验证一般对偶求解。

支持[输运见证、实际配对与高斯例](../notes/transport-budget-and-conditional-entropy.md)。一维高斯的最优边际和平方位移 1 对 5 由 AI 单独推导。研究价值中高，明确两个优化何时使用同一组可行边际。启发价值高，说明测量生成过程时为什么还要指定样本如何配对。有限矩和熵量有定义条件下的例子可靠性高，通用采样性能无本轮证据。

## Sampling-followup

2026-11-18，题录仍 v1。本日重核 §2.1、§3.1 Proposition 1/Corollary 1，增读 Appendix A.1.2 高斯核识别、旁读 A.1.1 最后预算等式。原阅读范围保留；未全文重读、读作者程序或测一般求解器。

来源给出平方欧氏位移总期望预算下，每坐标方差为总预算除以维数的独立高斯核。[多维费用分配与采样验收](../notes/transport-budget-and-conditional-entropy.md#multidimensional-sampling-and-budget)的卡方分布、批均方差和有限抽样表为 AI 推导及说明性执行。研究员与主控在 Python 3.15.2 分别复核同一固定种子和输入，数值一致，不是作者实验复现。研究价值中，补实际配对核；启发价值中，期望、单次和有限批次硬边界不同；解析核数学可靠性高，生产性能无证据。
