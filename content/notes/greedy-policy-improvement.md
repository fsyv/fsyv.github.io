---
title: "对估计 Q 取最大，何时能改善真实累计回报？"
date: 2026-10-20
draft: false
tags: [reinforcement-learning, mathematics]
id: "22876dbb-4560-4fb9-9f17-91b4f573a3c3"
kind: note
maturity: developing
endorsement: ai-candidate
math: true
---

**判断归属：AI 候选。** 教材的策略改进原理见[实际阅读记录](../sources/sutton-barto-policy-improvement.md)；矩阵展开、误差界、保守门槛与算例为 AI 推导。本页重建 2026-10-13 未审核候选的同一知识身份，保留稳定 id；旧候选仅用于去重，今日依据原文重新核验，不表示旧分支已接受或从未读过这些理论。

## Which-value

限定有限状态、有限动作、完全可观测、转移和奖励平稳的 MDP，奖励有界，折扣 $0\le\gamma<1$ ，比较平稳策略。设 $r(s,a)$ 为一步期望奖励， $P(s'\mid s,a)$ 为转移概率，旧策略为 $\pi$ 。真实动作价值是

$$
Q^\pi(s,a)=r(s,a)+\gamma\sum_{s'}P(s'\mid s,a)V^\pi(s').
$$

它计价“本次执行 a，此后恢复旧策略”，不是永远执行 a。 $Q^*$ 的后续按最优策略计价；网络 $\hat Q$ 是估计，必须说明估计谁。对任意函数取 argmax 都可称相对该函数贪心；模型内取最大不自动证明真实回报增加。

状态也必须保留影响未来的相关历史。把不充分的局部观测直接当作 MDP 状态，已经超出下列证明的条件；教材 §3.1 p.49 说明该要求。

## Exact-improvement

教材 §4.2 pp.78–79 给出逐状态的一步改进原理。以下展开明确为何“一步优势”能转成持续采用新策略的价值变化。对新策略 $\pi'$ ，定义

$$
g(s)=\sum_a\pi'(a\mid s)Q^\pi(s,a)-V^\pi(s),\qquad
\Delta=V^{\pi'}-V^\pi.
$$

$P_{\pi'}$ 为新策略的转移矩阵。两条 Bellman 关系相减得到

$$
\Delta=g+\gamma P_{\pi'}\Delta
=\sum_{k=0}^{n-1}\gamma^kP_{\pi'}^kg+\gamma^nP_{\pi'}^n\Delta.
$$

转移矩阵及其幂元素非负、行和为 1；有界奖励使 $\Delta$ 有界，余项无穷范数不超过 $\gamma^n\|\Delta\|_\infty\to0$ 。因此

$$
V^{\pi'}-V^\pi=\sum_{k=0}^{\infty}\gamma^kP_{\pi'}^kg.
$$

如果 $\pi'$ 对真实 $Q^\pi$ 贪心，最大值至少等于旧策略的动作加权平均，所以 $g\ge0$ ；右端每项非负，从每个状态出发都不退步。这不保证所有状态严格提高，也不保证一次改进即最优。对精确 $Q^*$ 贪心在同一 MDP 条件下可得最优策略，但不能把 $\hat Q$ 直接当作 $Q^*$ 。

## Error-bound

额外假定已证明全部状态和可行动作上

$$
|\hat Q(s,a)-Q^\pi(s,a)|\le\varepsilon.
$$

令 $\pi'$ 对估计贪心， $a^*$ 最大化真实 $Q^\pi$ ，则

$$
Q^\pi(s,\pi'(s))\ge\hat Q(s,\pi'(s))-\varepsilon
\ge\hat Q(s,a^*)-\varepsilon
\ge Q^\pi(s,a^*)-2\varepsilon
\ge V^\pi(s)-2\varepsilon.
$$

于是 $g\ge-2\varepsilon\mathbf1$ ，代入同一展开得到

$$
V^{\pi'}-V^\pi\ge-\frac{2\varepsilon}{1-\gamma}\mathbf1.
$$

这是允许退步的下界，不是正收益保证。训练平均损失、已访问动作误差和学习曲线，均不自动构成覆盖全部状态/动作、针对同一个旧策略 $Q^\pi$ 的统一误差证书。

## Counterexample

AI 单状态循环例： $\gamma=0.9$ ，动作 a 每步奖 1，b 每步奖 0，旧策略始终选 a。 $V^\pi=Q^\pi(a)=10$ ，而 $Q^\pi(b)=9$ 。若估计为 $\hat Q(a)=9.4$ 、 $\hat Q(b)=9.6$ ，误差至多 $\varepsilon=0.6$ ，贪心新策略却每步选 b，真实价值变成 0。 $Q^\pi(b)=9$ 包含第一步后恢复 a，不能把它当作持续选 b 的价值。理论允许退步至多 12，实际下降 10，没有矛盾；该例不是缓存实验。

## Conservative-switch

**2026-10-20 新增 AI 推导。** 对候选动作 $a_{\rm new}$ ，定义相对旧策略的估计优势

$$
\hat g(s)=\hat Q(s,a_{\rm new})-\sum_a\pi(a\mid s)\hat Q(s,a).
$$

同一误差证书使真实优势至少为 $\hat g(s)-2\varepsilon$ 。只在 $\hat g(s)\ge2\varepsilon$ 的状态切换，其余状态完整保留旧策略，则切换处 $g\ge0$ ，保留处 $g=0$ ；用前述展开便证整个新策略不退步。这是充分条件，未过门槛不代表必然有害；它要求证书，没有提供现成可部署的置信区间。

正例：同一单状态模型改为 $r(a)=1,r(b)=1.2$ ，旧价值 10， $Q^\pi(b)=10.2$ 。若有效误差上界为 0.04，估计为 10.02/10.18，则估计优势 0.16 大于门槛 0.08。真实优势至少 0.08，价值至少增加 $0.08/(1-0.9)=0.8$ ；实际新价值 $1.2/(1-0.9)=12$ ，增加 2。实际估计误差为 0.02，0.04 是有效保守界；数字是教学算例，非实验。

## Multi-agent-boundary

[QMIX](web3-cooperative-caching.md)中的局部 $q_i$ 是 utility，单独不估计 expected return，不能直接代入本页定理。固定上下文、动作可独立组合且联合模型对各 $q_i$ 非递减时，逐项换成局部最大值不减小联合模型；所以局部贪心组合属于联合 argmax。平坦方向可能产生其他全局并列最优动作，不能据此断言整个 argmax 集合都等于局部集合的笛卡尔积。

这只解决模型内最大化。真实状态不可辨、模型有误差、其他智能体同时改变策略时，仍需独立证明状态/价值对应和收益。加入历史或通信可能改善信息，但是否充分、成本是否值得，本轮未验证。

## Links

- 回应[原问题](../questions/greedy-value-improvement.md)：理论链条已形成候选，状态充分性、网络价值目标、误差证书和部署收益仍开放。
- 前置于[协同缓存的局部决策](web3-cooperative-caching.md)与[学习目标](cooperative-caching-and-learning.md)：累计回报改善不由即时命中率单调性推出。
- [Web3 地图](../maps/web3-foundations.md)安排先读真实策略改进，再读多智能体模型分解；这不表示缓存系统满足本页有限平稳 MDP 条件。

## Evolution

2026-10-20：P13 未审核候选已有精确改进、统一误差退步界和单状态反例；今日重新读取正式教材和 QMIX 指定部分，保留同一身份，补估计优势覆盖两端误差的保守切换门槛及正例。新理解将“argmax 更大”改写为状态/价值目标、逐状态优势、误差覆盖三项证据义务；全部仍是 AI 候选，用户未确认，应用未验证。
