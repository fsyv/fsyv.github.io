---
title: "信息与激励：私人报告怎样限制可实现方案？"
date: 2026-10-16
draft: false
tags: [economics, incentives]
id: "3f8aa959-c0c2-468e-9c99-704404b30603"
kind: map
maturity: developing
endorsement: ai-candidate
---

## Overview

机制设计从经济问题本身进入：参与者各自知道的信息不同，目标也可能不同；规则能否使真实报告成为均衡，并让参与者愿意接受结果？总收益最大与方案可实施属于不同问题。地图与解释均为 AI 候选。

## Questions

报告如何改变分配与支付？应在哪个信息阶段比较诚实和偏离？预算、参与和效率约束之间有哪些取舍？当前只深读一个离散双边交易例子，不用一例替代整个学科。

## Prerequisites

需要期望值、条件概率、线性不等式，以及“收益取决于自己的行动和他人的行动”的基本博弈概念。独立先验及报告时序决定期望如何计算；不要求区块链或机器学习背景。

## Reading

1. [私人信息与双边交易](../notes/private-information-and-trade.md#model-and-timing)：先固定估值、效用、报告时序、参与及预算条件，再算完全信息基准。
2. 沿同一解释的[中点规则反例](../notes/private-information-and-trade.md#why-midpoint-fails)→[随机诚实规则](../notes/private-information-and-trade.md#a-truthful-randomized-rule)，逐类型比较诚实和偏离。
3. 最后读[均衡边界](../notes/private-information-and-trade.md#equilibrium-boundary)与[非对称上界](../notes/private-information-and-trade.md#asymmetric-upper-bound)，区分弱贝叶斯均衡、逐次自愿、效率损失及一般定理的未读范围。

[Myerson 讲义来源](../sources/myerson-mechanism-design-2007.md)记录实际章节与公式视觉核验；没有将不可访问的委员会背景报告当证据。

## Connections

- **结构类比：**[声誉与共识](../notes/reputation-and-consensus.md)也须问报告规则是否奖励误报，但它没有本交易模型的支付与私人类型，不能移植数值上界或均衡结论。
- **边界区别：**[Web3 与信任](web3-foundations.md)中的可验证执行回答规则是否被执行，机制设计另外问行动者是否愿意诚实；两者互补而不互相证明。
- **团队目标与私人目标的区别：**[协同缓存](../notes/cooperative-caching-and-learning.md)的共同目标优化未自动包含各自隐瞒信息的动机。

## Open

公开报告后均衡如何变化？若允许外部补贴或改变参与时点，哪个约束先放宽？这些先在经济模型内提出，再考虑应用。[评价证据与保证](../questions/evidence-to-guarantees.md)保留声誉模型迁移所缺的效用、信息时序和偏离分析；尚未解决。

[返回地图入口](_index.md)。
