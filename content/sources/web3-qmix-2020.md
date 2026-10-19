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
math: true
---

## 书目

Tabish Rashid、Mikayel Samvelyan、Christian Schroeder de Witt、Gregory Farquhar、Jakob Foerster、Shimon Whiteson，*Monotonic Value Function Factorisation for Deep Multi-Agent Reinforcement Learning*，JMLR 21(178)，2020，pp. 1–51。[期刊入口](https://jmlr.org/papers/v21/20-081.html)，[公开 PDF](https://jmlr.org/papers/volume21/20-081/20-081.pdf)。

## 本轮读取

2026-10-12 读取摘要与 PDF pp. 1–3 的集中训练/分散执行动机、pp. 6–7 关于表示限制的讨论、pp. 9–11 的局部观测、IQL、VDN 与 QMIX 第 4 节公式 (4) 及其邻近解释。未读完 51 页，也未复现 SMAC 或验证任何缓存实验。

## 证据与边界

论文把联合动作值表达为局部效用的单调组合，以便将联合贪心选择分解为局部贪心选择。这里的“贪心”针对预测累计回报；不是只看即时奖励。分解的一致性不等于训练必然收敛到真实最优，更不意味着一般协作任务都能用单调函数无损表示。

支持[协同缓存与局部决策](../notes/web3-cooperative-caching.md)；缓存中的应用是需要单独建模、验证的联系。

## 2026-10-20 Revisit

本次实际读取首页与版本背景，§3.1–3.4 p.10、§4 p.11 式 (4)–(5)/Theorem 1；补读 §4.1 pp.15–16/Tables 1–2、Appendix A p.38 证明（附录编号 Theorem 2）。内存渲染视觉核对 pp.15、38；未读随后 Appendix B、完整 51 页或复现 SMAC。首页为 Submitted 1/20、Revised/Published 8/20，会议前身是 2018 工作；这是旧来源重读与补读。

p.10 将局部 $Q_i$ 明确称 utility，单独不估计 expected return。Appendix A 的机制是逐项替换局部值，在非递减混合下不会降低联合模型；局部贪心组合属于联合 argmax，不能据平坦混合断言全部全局最大动作都必须局部贪心。

Table 1b 的真实收益为 AA=2、AB=1、BA=1、BB=8；Agent 1 在对方 A 时需 A>B、在对方 B 时需 B>A，因此同一 utility 排序无法无损表示全表。p.16/Table 2b 的单调近似却能以其余三格约 1.33、BB=8 保留最优 BB，故表示不精确不等于必然选不到最优。p.15 的局部信息混淆和 §3.3 的同时学习非平稳性仍须独立处理。

[策略改进解释](../notes/greedy-policy-improvement.md)将这一模型内保证与真实 $Q^\pi$ 的保证分开；[协同缓存解释](../notes/web3-cooperative-caching.md#three-obligations)保留 utility→联合模型→真实回报三项证据义务。新增总结为 AI 候选，不证明缓存部署收益。研究价值高、启发价值高，限定理论可靠性高。
