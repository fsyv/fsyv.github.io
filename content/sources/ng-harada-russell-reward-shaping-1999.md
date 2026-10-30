---
title: "Ng、Harada、Russell 1999：势函数奖励变换的策略不变条件"
date: 2026-10-28
draft: false
tags: [reinforcement-learning, reward-shaping]
id: "f728da2c-d89f-4e16-a0cf-50d3ccef47a9"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
math: true
---

## Identity

Andrew Y. Ng、Daishi Harada、Stuart Russell，*Policy invariance under reward transformations: Theory and application to reward shaping*，ICML 1999。[作者出版表](https://ai.stanford.edu/~ang/papers.html)、[实际读取的作者 PDF](https://people.eecs.berkeley.edu/~russell/papers/icml99-shaping.pdf)。旧论文首次纳入本库，不是近期发表。

2026-10-28 读取十页 PDF 的文件 pp2–5：§2.1 有限 MDP/regularity、§2.2 additive shaping、§3 Theorem1 式2与充分性证明、Corollary2 和两个 remarks。未读 AppendixA 必要性证明、实验或其余全文。Web 提取漏 gamma，研究员用 bundled Python/pypdf 内存重取交叉确认式2；未成功显示像素图，不称视觉核验。Stanford 两个 PDF 入口超时，Berkeley 镜像恢复，不保存原文到仓库。

## Evidence

Theorem1 的势函数形式为

$$
F(s,a,s')=\gamma\Phi(s')-\Phi(s).
$$

在保持同一状态、动作、转移与折扣的有限 MDP 中，将奖励从 $R$ 改为 $R+F$ ，并满足该文 regularity/终端条件，可保最优策略集合。原文充分性证明沿 Bellman 方程与最优价值的唯一性展开。本库对有界势、折扣小于 1 的持续情形，以尾项消失作代数说明；这是 AI 解释，不是原文该证明的展开方式。不能省掉终端处理，将任意普通差分直接称作策略不变 shaping。

必要性讨论针对无额外转移/奖励知识时的普遍保证。本轮没有读取 AppendixA 完整证明，也不从“没有该形式的普遍保证”推断某个具体应用必错。

## Support-and-limits

支持[差分命中奖励与时间边界](../notes/cooperative-caching-and-learning.md#reward-and-horizon)的分析入口。该页普通差分的有限和恒等式、TDC 对应、两时槽算例与罚项缩放均为 AI 推导，不是本论文分析 TDC，也没有验证真实缓存状态充分性、统一误差或部署收益。

## Terminal-followup

2026-10-29增读/重核作者PDF文件pp.3–5：§2.1 regularity、§3 Theorem1式2与充分性证明、Corollary2/Remark1。仍未读完整必要性附录或实验。PDF截图两次失败，以pypdf内存提取交叉确认gamma，未完成视觉核验。

[统一终端解释](../notes/cooperative-caching-and-learning.md#terminal-bootstrap-followup)将TDC奖励写成相应基奖励加势函数，并加入任意截断bootstrap；这是本库AI推导，不是原文针对TDC、随机终止或重置代码的分析。原文Bellman充分性证明、持续有界势的尾项解释、有限任务设计选择三者分开，不能用普遍策略不变结论替实际终端实现背书。

2026-10-30 Researcher重核同一作者PDF文件pp.3–5的regularity、Theorem1式2、充分性证明、Corollary2/Remark1；仍未完整必要性附录或实验。截图没有返回可读像素，bundled pypdf文本交叉核gamma，不称视觉核验。新增[推导目的说明](../notes/cooperative-caching-and-learning.md#objective-and-proof)解释同一累计目标下策略排序和网络是否找到最优的区别，没有把TDC应用推论归给Ng原文。
