---
title: "同样的输运预算为何给出不同的最大熵"
date: 2026-11-11
draft: false
tags: [probability, information-theory, optimal-transport]
id: "3822d57b-62b1-4e16-aa65-636963017ca4"
kind: note
maturity: developing
endorsement: ai-candidate
math: true
---

## Marginals-and-couplings

给定原始随机变量 $X$，怎样生成一个接近它但尽量难从 $X$ 预测的 $V$？“接近”可以要求每次实际配对的平均位移受限，也可以只要求生成分布和原分布之间存在一套低成本配对。[Bertolace、Gatsis 与 Margellos v1](../sources/paper-transport-entropy-dependence.md)区分了这两个问题。

令 $\zeta$ 为允许的位移尺度，$p\ge 1$，两个分布都具有有限的 $p$ 阶矩。实际生成的联合分布必须满足 $\mathbb E\|V-X\|_p^p\le\zeta^p$，则这个联合分布本身就是 Wasserstein 距离定义中的一个候选耦合。因此，其 $V$ 边际距原分布的 $W_p$ 不超过 $\zeta$。反过来，在欧氏空间，可行的 $V$ 边际有一个达到最小输运成本的耦合。把这个联合分布按 $X$ 条件化，就可得到实际按预算生成该边际的一种方法。两类约束因而允许同一组输出边际，但它们允许用来实现一个边际的生成过程可能不同。

固定这个可行边际集合后，Wasserstein 版本只优化边际微分熵 $h(V)$。对每个可行边际，独立于 $X$ 抽样可使条件熵达到 $h(V)$，低成本输运仍由另外存在的耦合见证。实际配对版本在同样的成本可行联合分布上优化 $h(V\mid X)$。为辨认两种目标差在哪一项，在相应熵量有定义且有限时可写成

$$
h(V\mid X)=h(V)-I(X;V).
$$

$I(X;V)$ 是生成值与原始样本之间的互信息。于是，在实际成本受限的联合分布上，一个目标只计输出散布，另一个目标还扣除生成值保留的输入信息。这里是在重写两个优化目标。两个最优值之差通常不能直接等同于某个任意耦合的互信息。

## Gaussian-example

用 AI 说明性算例分别计算两种最优值。令 $X\sim\mathcal N(0,\sigma^2)$，$\sigma>0$，以平方位移计费，预算为 $\zeta^2$，$\zeta>0$。设 $D=V-X$。给定 $X$ 时平移不改变微分熵，所以 $h(V\mid X)=h(D\mid X)\le h(D)$。二阶矩给出 $\operatorname{Var}(D)\le\mathbb E[D^2]\le\zeta^2$，在给定方差下高斯熵最大。取与 $X$ 独立的 $D\sim\mathcal N(0,\zeta^2)$ 即可同时达到这些界，实际配对的最优条件熵为 $\frac12\log(2\pi e\zeta^2)$。

为了界定 Wasserstein 版本的最优边际，取一个为其距离作证的低成本配对。该配对的二阶矩满足

$$
(\mathbb E[V^2])^{1/2}
\le (\mathbb E[X^2])^{1/2}+(\mathbb E[(V-X)^2])^{1/2}
\le \sigma+\zeta .
$$

这是随机变量的 $L^2$ 三角不等式。该界只依赖两个边际的二阶矩及见证配对的成本。取见证耦合 $V'=(1+\zeta/\sigma)X$，位移均方为 $\zeta^2$，输出边际是 $\mathcal N(0,(\sigma+\zeta)^2)$。它达到方差上界，也达到对应的高斯熵上界。在 Wasserstein 版本下，可以从这一边际独立抽样。两种最优值相减为 $\log(1+\sigma/\zeta)$ nats。

令 $\sigma=\zeta=1$。在见证配对 $V'=2X$ 下，平方位移均值为 1。若独立于 $X$ 从同一个 $\mathcal N(0,4)$ 边际抽样，实际平方位移均值是 $1+4=5$。若每对样本都要记入平均位移预算，就只能用后一种过程的实际费用评价该过程。一个输出边际可以同时对应这两种费用。

## Links

[概率与网络地图](../maps/probability-and-networks.md)把联合分布、边际和条件概率放在前置路径。这里把这些对象用于区分约束的见证配对与熵所对应的生成过程。算例只针对一维高斯和平方位移成本。一般空间上的耦合存在性、微分熵有限性及具体采样过程的成本需要随问题核对。
