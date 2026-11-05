---
title: "信息、激励与集体选择：规则保留了什么？"
date: 2026-10-16
draft: false
tags: [economics, incentives]
id: "3f8aa959-c0c2-468e-9c99-704404b30603"
kind: map
maturity: developing
endorsement: ai-candidate
---

## Overview

机制设计从经济问题本身进入：参与者各自知道的信息不同，目标也可能不同；规则能否使真实报告成为均衡，并让参与者愿意接受结果？总收益最大与方案可实施属于不同问题。社会选择则先问，即使每人如实给出一致偏好，聚合规则能否同时保留一致排序和其他约束。地图与解释均为 AI 候选。

## Questions

报告如何改变分配与支付？应在哪个信息阶段比较诚实和偏离？预算、参与和效率约束之间有哪些取舍？当前展开私人报告的离散双边交易与公共池资源制度两支；前者问给定规则下是否愿意诚实，后者还问交流与规则选择怎样改变互动。另开社会选择分支，问多数循环、名次计分与无关选项独立性分别牺牲什么；不把三个问题相互替代。

## Prerequisites

需要期望值、条件概率、线性不等式，以及“收益取决于自己的行动和他人的行动”的基本博弈概念。独立先验及报告时序决定期望如何计算；不要求区块链或机器学习背景。社会选择分支只需集合、排序、并列与传递性，可独立进入。

## Reading

1. [私人信息与双边交易](../notes/private-information-and-trade.md#model-and-timing)：先固定估值、效用、报告时序、参与及预算条件，再算完全信息基准。
2. 沿同一解释的[中点规则反例](../notes/private-information-and-trade.md#why-midpoint-fails)→[随机诚实规则](../notes/private-information-and-trade.md#a-truthful-randomized-rule)，逐类型比较诚实和偏离。
3. 最后读[均衡边界](../notes/private-information-and-trade.md#equilibrium-boundary)与[非对称上界](../notes/private-information-and-trade.md#asymmetric-upper-bound)，区分弱贝叶斯均衡、逐次自愿、效率损失及一般定理的未读范围。

4. [公共池资源与制度规则](../notes/common-pool-resources-and-institutional-rules.md)：转入共同资源分支，先分资源属性/产权制度，再比较固定行动、交流、外加/自定制裁及净成本。它是另一种问题，不沿用双边交易的均衡结论。

5. [个人排序与集体聚合](../notes/social-choice-and-preference-aggregation.md)：独立进入社会选择，先算多数循环和计分反例，再区分原篇五条件、两人证明及未读取的多人证明；不以交易均衡为前置。

[Myerson 讲义来源](../sources/myerson-mechanism-design-2007.md)记录实际章节与公式视觉核验；没有将不可访问的委员会背景报告当证据。

## Connections

- **结构类比：**[声誉与共识](../notes/reputation-and-consensus.md)也须问报告规则是否奖励误报，但它没有本交易模型的支付与私人类型，不能移植数值上界或均衡结论。
- **边界区别：**[Web3 与信任](web3-foundations.md)中的可验证执行回答规则是否被执行，机制设计另外问行动者是否愿意诚实；两者互补而不互相证明。
- **团队目标与私人目标的区别：**[协同缓存](../notes/cooperative-caching-and-learning.md)的共同目标优化未自动包含各自隐瞒信息的动机。

- **信息条件的不同作用：**[公共池资源](../notes/common-pool-resources-and-institutional-rules.md#changing-the-game)中的讨论与规则选择可能改变协调条件；交易例中的提前公开类型则可能破坏原诚实均衡。两者支持明确模型条件，不支持“信息越多必然越好”或相反的一般结论。

- **不同保证：**[偏好聚合](../notes/social-choice-and-preference-aggregation.md#boundaries-and-links)限制社会排序可用信息，[私人报告](../notes/private-information-and-trade.md#equilibrium-boundary)限制有利偏离；[共识](../notes/web3-consensus-assumptions.md)限制故障下的冲突决定。三个对象不同，不直接搬用不可能性或安全结论。

## Open

公开报告后均衡如何变化？若允许外部补贴或改变参与时点，哪个约束先放宽？这些先在经济模型内提出，再考虑应用。[评价证据与保证](../questions/evidence-to-guarantees.md)保留声誉模型迁移所缺的效用、信息时序和偏离分析；尚未解决。

公共池分支先核原实验分组、收益参数与顺序，区分交流、制裁和自定规则的选择效应；修订讲座不是本轮已核全部实验。

社会选择下一步先固定一种偏好限制，检查两人证明的哪些排序构造失效；未读单峰域充分性证明，不预先宣称放宽一条条件就能保留其余全部性质。

[返回地图入口](_index.md)。
