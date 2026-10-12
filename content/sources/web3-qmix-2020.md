---
title: "Rashid 等（2020）：QMIX 的单调价值分解与限制"
date: 2026-10-12
draft: false
tags: [web3, foundations]
id: "3b3a4a08-aadd-4cb8-bb45-395dc15584a1"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
---

## 书目

Tabish Rashid、Mikayel Samvelyan、Christian Schroeder de Witt、Gregory Farquhar、Jakob Foerster、Shimon Whiteson，*Monotonic Value Function Factorisation for Deep Multi-Agent Reinforcement Learning*，JMLR 21(178)，2020，pp. 1–51。[期刊入口](https://jmlr.org/papers/v21/20-081.html)，[公开 PDF](https://jmlr.org/papers/volume21/20-081/20-081.pdf)。

## 本轮读取

2026-10-12 读取摘要与 PDF pp. 1–3 的集中训练/分散执行动机、pp. 6–7 关于表示限制的讨论、pp. 9–11 的局部观测、IQL、VDN 与 QMIX 第 4 节公式 (4) 及其邻近解释。未读完 51 页，也未复现 SMAC 或验证任何缓存实验。

## 证据与边界

论文把联合动作值表达为局部效用的单调组合，以便将联合贪心选择分解为局部贪心选择。这里的“贪心”针对预测累计回报；不是只看即时奖励。分解的一致性不等于训练必然收敛到真实最优，更不意味着一般协作任务都能用单调函数无损表示。

支持[协同缓存与局部决策](../notes/web3-cooperative-caching.md)；缓存中的应用是需要单独建模、验证的联系。
