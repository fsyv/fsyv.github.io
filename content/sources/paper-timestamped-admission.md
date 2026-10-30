---
title: "带时间戳容量记录的预算准入：概率、校准与前缀保护"
date: 2026-10-22
draft: false
tags: [admission-control, probability, systems]
id: "e1ce0fac-792f-47f1-8321-4f9f6e970a3c"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
math: true
---

## Identity

Andrew Bond、Syed Izhan Khilji，*Budgeted Admission from Timestamped Capacity Records in Shared Clusters*，arXiv:2610.28392v1，2026-10-20T15:40:22Z 首次提交。[官方题录/history](https://arxiv.org/abs/2610.28392)、[v1 HTML](https://arxiv.org/html/2610.28392v1)。规范标识 `arxiv:2610.28392`，未核得正式 journal DOI；arXiv DOI 不重复计研究。本轮为本周补遗漏，不是昨日核查终点之后新发。

2026-10-22 指定读 HTML §I–III、§IV-A/B（Theorems 1–5 及证明、Algorithm 1）、§V-A/B、§VI-A–E/Table I、§VIII–IX；§VII 仅浏览定位，图仅图注。未追引用、PDF/视觉核图、代码或复现，不称全文。

## Model-and-allocation

§III 式 1–7：二值可调度状态 $X_t$ 外生，不受准入动作 $M_t$ 影响。对称平稳 Markov 每步翻转概率 $p\in[0,1/2]$，延迟 $D$ 步的观测 $Y=X_{t-D}$ 与当前状态不同的概率为 $q_D=[1-(1-2p)^D]/2$。优化 $g=P(M=1,X=1)$，约束 $\rho=P(M=1,X=0)\le\varepsilon$；分母为全部决策 epoch，而非已准入 Jobs。

在已知模型下，将不同观测格的有效/无效联合概率质量比从高到低分配准入概率，可得到 stationary frontier。该规则继承既有 collision-constrained likelihood allocation，不能称论文首创似然比原则。记录年龄独立于状态且只用当前交付的年龄/bit 时，可先接纳较新的 available 记录；若仍有预算，则旧 unavailable 记录可能优先于新 unavailable，因为有更多恢复机会。保存过去记录形成不同策略类，本文没有优化其全部可能性；年龄与状态相关时不能直接用该排序。

## Calibration-and-prefix-guard

§IV-A 式 10–11/Theorem 3：以 $n$ 个独立 Bernoulli 翻转增量得到 $K$，构造单侧 Clopper–Pearson 上端 $p^+$（将上端截为不超过 1/2），再用 $q^+$ 选保守策略。在模型正确、评估增量独立等条件下，对拟合策略有 $P_K[\rho(K)\le\varepsilon]\ge1-\delta$。其中 $0<\delta<1$ 为允许的校准失败概率上限，$1-\delta$ 为所要求的置信水平。这是关于校准数据的覆盖，不是每段运行违规比例或整个扫参集合的同时覆盖。

§IV-B 式 12–14/Theorems 4–5/Algorithm 1：已准入决策分为已收到真实标签的 $R_t$ 和未解决的 $U_t$，坏标签 $C_s=1-X_s$；以 $W_t=\sum_{s\in R_t}C_s+|U_t|$、$L_t=\lfloor\varepsilon t\rfloor$ 维护账本。仅 base proposal 为 1 且 $W_t+1\le L_t$ 才准入。未解决全部占用坏预算，好标签释放、坏标签保留，缺失不释放。真实标签条件下，对任意二值状态、提案及乱序延迟反馈，实际坏数逐前缀满足 $H_t\le\lfloor\varepsilon t\rfloor$。最大许可是相同当前历史、任意二值补全类的 pointwise 结论，不是最优长期吞吐；保护器可牺牲基础策略的 frontier 收益。

## Evidence-and-limits

§VI-D 是精确模型枚举：8 个 $p$×4 个 $D$×4 个 $\varepsilon$，共 128 cells；7 个校准样本量 50–5000，$\delta=.01$。在 $n=2000$ 时，direct、Hoeffding、exact 校准的最大违规概率分别为 .4916、.00126、.00986；这些是模型概率求和，不是集群吞吐实测，也不表示扫描全部策略的共同置信保证。

§V/VI-B/Table I 的系统实验为 16 treatments，各 4 epoch、同一共享轨迹，共 64 决定。32 个 guarded 决定中 $\lfloor .1t\rfloor=0$，无正动作和 delayed release；26 个正动作全部来自 unguarded，12 完成、14 因 taint 不可调度。事件审计无遗漏/identity mismatch 支持受控路径，零 prefix excess 在此来自零动作，不能验证正动作 guard 或估计策略效应。单节点 Docker Desktop/NoSchedule taint，记录年龄按 trace 索引注入，并非自然网络延迟。

§VI-C 另有 32 次 CPU request accounting 循环：18000−960−17015=25 mCPU，50 mCPU 目标不 fit；删除 holder 后相同 Job/Pod UID 完成。这不测实际 CPU 占用、干扰或吞吐，也没有经过 NATS 或 guard。NATS 中位数 1.593 ms/p95 2.554 ms 为本机 port-forward，不能外推多主机。

## Support

支持[三层保证的完整解释](../notes/timestamped-admission-and-prefix-budgets.md)，并扩展 [SLO 口径](../notes/storage-latency-and-slo.md#probability-and-prefix-budget)：概率预算、校准置信与逐路径界分别依赖不同证据。AI 算例是模型复算，不是论文测量。尚缺正动作 guard、真实反馈标签及内生多单元容量的实现证据，2026-10-29 先核可得性；不以外生二值定理直接保证真实资源争用、缓存或共识系统。
