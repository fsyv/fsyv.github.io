---
title: "Sutton 与 Barto：状态定义和策略改进"
date: 2026-10-20
draft: false
tags: [reinforcement-learning]
id: "233e20fc-3e22-4a58-878a-fd1fabce913b"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
---

## Identity

Richard S. Sutton、Andrew G. Barto，*Reinforcement Learning: An Introduction*，第二版，MIT Press，2018。[作者 PDF](http://incompleteideas.net/book/RLbook2020.pdf)。版权页列 2018、2020；文件元数据生成于 2022-04-26，不据此声称理论于 2022 年更新。

保留 2026-10-13 未审核候选的同一来源 id；其旧阅读和未审核状态见研究来源账本 `research/state/sources.md`。本页依据 2026-10-20 重新读取重建，不把旧稿当作今日重读证据，也不表示候选已接受。

## Scope

研究员实际读取 548 页文件中的书名、版权页；§3.1 印刷 pp.47–49/文件 pp.69–71；§4.2 印刷 pp.76–80/文件 pp.98–102，p.80 仅本节收尾与相邻策略迭代背景。内存渲染视觉核对 p.78；未通读全书。Architect 依据这一实际阅读交接整合。

作者入口的 web 读取曾 502/timeout，直接内存读取成功；Stanford 同名入口实为版权 2014/2015 的旧草稿，仅核身份后排除，没有混作正式二版。

## Evidence

§3.1 p.49 说明 Markov 状态应保留影响未来的相关历史。§4.2 p.78 式 (4.6)–(4.8)以逐状态一步优势推出策略改进；p.79 式 (4.9)讨论贪心改进及随机策略扩展。

[完整解释](../notes/greedy-policy-improvement.md)中的 Bellman 矩阵余项展开、统一估计误差下的退步界、两动作算例和保守切换门槛均为 AI 独立推导；不把这些归为教材原命题。原文支持限定 MDP 内的策略比较，不能自动支持神经网络误差界、缓存状态充分或真实部署收益。

## Links

与 [QMIX 来源](web3-qmix-2020.md)互补：单智能体真实价值改进与多智能体模型内最大化分解是不同证明。研究价值高、启发价值高、理论证据可靠性高，应用外推没有证据。
