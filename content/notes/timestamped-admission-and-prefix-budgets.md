---
title: "陈旧容量记录下，概率准入预算与逐前缀保护分别保证什么？"
date: 2026-10-22
draft: false
tags: [admission-control, probability, systems]
id: "38d98b0b-1a00-4f28-99f2-64a35963cd7f"
kind: note
maturity: developing
endorsement: ai-candidate
math: true
---

**判断归属：AI 候选解释。** 定义与定理依据 [Bond、Khilji 的 v1 指定正文](../sources/paper-timestamped-admission.md)；算例、归纳展开与保证层级的组织为 AI 整理。没有审计代码或复现实验，数学模型与真实集群证据分别陈述。

## Question

准入控制器看到的容量记录可能已经过时。它可以按记录计算准入概率，但“总体坏准入概率不超过预算”“有限校准数据以某置信度选对策略”和“任意运行前缀坏准入数受限”是三种不同保证。理解区别，先要确定预算分母、状态是否受动作影响、反馈标签什么时候可信。

## Exogenous-state-and-risk

原文研究外生二值可调度状态 $X_t\in\{0,1\}$，动作 $M_t\in\{0,1\}$ **不改变**该状态。对称平稳 Markov 链每步以 $p\in[0,1/2]$ 翻转，平稳两状态各占一半。控制器在 epoch $t$ 只观察 $D$ 步之前的 bit，$Y_t=X_{t-D}$。奇数次翻转的概率为

$$
q_D=P(Y_t\ne X_t)=\frac{1-(1-2p)^D}{2}.
$$

原文目标与风险为

$$
g=P(M=1,X=1),\qquad
\rho=P(M=1,X=0)\le\varepsilon.
$$

两者分母均为全部决策 epoch；$\rho$ 不是已经准入的任务中失败的比例。若总准入概率 $g+\rho>0$，后者为 $\rho/(g+\rho)$。一次真实任务占多个资源单元、持续占用资源或改变后续容量时，已超出这个外生状态模型；不能直接借其定理获得资源争用保证。

## Probability-allocation

令 $\theta_i=P(M=1\mid Y=i)$。在 $0<q=q_D<1/2$、本页所讨论的 $0\le\varepsilon\le1/2$ 范围内，$Y=1$ 的有效/无效联合概率质量为 $(1-q)/2$ 与 $q/2$，$Y=0$ 则交换。于是

$$
g=\frac{1-q}{2}\theta_1+\frac q2\theta_0,\qquad
\rho=\frac q2\theta_1+\frac{1-q}{2}\theta_0.
$$

每消耗一单位坏预算，两个观测格带来的有效质量比分别为 $(1-q)/q$ 与 $q/(1-q)$。先分配给高比值的 $Y=1$，用尽后才分给 $Y=0$，得到

$$
(\theta_1,\theta_0)=
\begin{cases}
(2\varepsilon/q,0),&\varepsilon\le q/2,\\
(1,(2\varepsilon-q)/(1-q)),&\varepsilon>q/2.
\end{cases}
$$

相应 $g^*=\varepsilon(1-q)/q$ 或 $g^*=(1-q)/2+q(\varepsilon-q/2)/(1-q)$。边界 $q=0$、$q=1/2$ 须另行按原联合质量分配，不能机械除零。一般有限观测 $o$ 可用 $v_o=P(O=o,X=1)$、$w_o=P(O=o,X=0)$，按 $v_o/w_o$ 递减分配 $\theta_o$，约束 $\sum_o w_o\theta_o\le\varepsilon$；正成本格最多需要一个随机边界格。这是既有似然分配原理在本文模型中的具体化，不能写成新创的一般原则。

**AI 可复算例。** $p=.1,D=3,\varepsilon=.1$，则 $q=(1-.8^3)/2=.244$，$\theta_1=.2/.244\approx.819672$、$\theta_0=0$。于是 $g\approx.309836$、$\rho=.1$，总准入约 .409836；准入中的坏比例仍是 .244，并非 10%。不使用记录、独立随机准入时需准入概率不超过 .2，因而有效准入至多 .1。该比较是外生模型计算，没有测集群吞吐。

若记录年龄 $A$ 独立于状态、策略只用当前交付的 $(A,\mathrm{bit})$，较新的 available 记录优先；用完这些格后，较旧 unavailable 记录反而可能优先，因为从“不行”恢复的机会更大。年龄与状态相关时该排序不成立；保存过去交付记录又是另一策略类，当前记录最优不能替代它的最优性。

## Calibration-is-over-datasets

未知翻转概率可由 $n$ 个独立 Bernoulli 翻转增量中的计数 $K$ 校准。原文用单侧 Clopper–Pearson 上端 $p^+$，将上端截为不超过 1/2，再据 $q^+$ 选保守策略。在模型正确、评估增量独立等条件下，Theorem 3 给每个拟合策略

$$
P_K\bigl[\rho(K)\le\varepsilon\bigr]\ge1-\delta.
$$

概率作用于校准数据 $K$：反复取得训练样本时，有足够比例会选到真实 stationary 风险满足约束的策略。它没有说任意一段运行的坏比例都小于预算，也没有给所有扫参策略的同时覆盖；有限数据覆盖不能偷偷换成逐时间路径结论。

## Prefix-ledger

逐前缀保护使用另一套可直接检查的账本，不必依赖前述 Markov 分布。坏标签为 $C_s=1-X_s$；在第 $t$ 次动作前，既往已准入决策分为已得到真实标签的 $R_t$ 和尚未解决的 $U_t$。记

$$
W_t=\sum_{s\in R_t}C_s+|U_t|,\qquad
L_t=\lfloor\varepsilon t\rfloor.
$$

$W_t$ 把所有未解决请求按坏计费。仅当基础策略提议 $B_t=1$ 且 $W_t+1\le L_t$ 时准入。真实好标签释放占额，坏标签保留；缺失标签不释放。对任意二值状态、提案、乱序与延迟反馈，只要标签真实且坏事件按此定义，则

$$
H_t=\sum_{s\le t}M_sC_s\le\lfloor\varepsilon t\rfloor
\quad\text{对每个前缀 }t\text{ 成立。}
$$

**AI 展开的归纳理由：**动作前实际既往坏数不超过 $W_t$；新动作最坏增加一。准入判据使其不超过 $L_t$，拒绝则保留上一前缀上界，而 $L_t$ 非递减。随后真实反馈只可能使账本保持或减少，故归纳继续成立。其“最大许可”仅指同一当前历史、允许任意未知二值标签补全时的 pointwise 许可，不是最优长期吞吐。

**AI 启动算例。** $\varepsilon=.1$ 时，第 1–9 个 epoch 的 $L_t=0$，保护器全部拒绝；第 10 个可放一个。若该动作一直未解决，至第 20 个 epoch 的 allowance 增至 2 前无法再放；若更早收到真实好标签，则可释放第一个预算位。延迟反馈因此会压低准入。保护器也可能拒绝实际好机会，不能将概率最优 frontier 与逐前缀保证拼成已共同达到的收益。

## What-the-system-evidence-tests

原文 16 treatments 各 4 epoch、共享同一轨迹，共 64 决定；32 个 guarded 决定的 $\lfloor .1t\rfloor$ 始终为零，未出现正动作或 delayed release。26 个正动作全部来自 unguarded，12 完成、14 因 taint 不可调度。因而事件审计无遗漏、identity mismatch 为零支持受控事件路径；guard 的零超额此时来自零动作，尚未验证有效准入后的预算保护，也不能估计策略因果效应。

该实验为单节点 Docker Desktop，以 NoSchedule taint 控制可调度性，年龄按 trace 索引注入，未形成自然多机网络延迟。另 32 次 CPU request accounting 循环证明预算资源请求会阻塞/释放同一 Job/Pod，但不是 CPU 实际负载、干扰或吞吐测量，也没经过 NATS/guard。精确 Markov 枚举、事件路径实验与实际集群性能是不同证据层次。

## Links-and-open

- 前置与推广：[平均、尾部与服务目标](storage-latency-and-slo.md#probability-and-prefix-budget)先明确评价总体与分母，本页进一步区分 stationary 风险、校准覆盖和逐前缀计数保护；坏标签不自动等于延迟或质量违约，须另定义。
- 依据：[来源与实际范围](../sources/paper-timestamped-admission.md)保留模型、定理和系统实验的不同边界；没有运行本库复现。
- 路径：[存储与推理服务地图](../maps/storage-and-serving.md)安排先读指标，再读准入和保证层次，不将此模型替代原副本、SLO 或共识语义。

开放问题：正动作和延迟释放的 guard 实验能否在真实标签下成立？容量被动作改变、多资源或多单位任务时，怎样重定义坏事件与账本，哪些概率最优结论还保留？2026-10-29 先核公开代码和证据可得性，当前不宣称已解决真实资源准入。
