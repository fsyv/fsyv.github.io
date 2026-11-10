---
title: "SpecCTMC：掩码扩散的事件时钟与按序校验"
date: 2026-11-09
draft: false
tags: [inference, diffusion, probability]
id: "0aa6f25b-2fa9-4832-83f7-26236f91ded5"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
---

## Identity

Siva Rajesh Kasa、Yasong Dai、Sumit Negi、Hongdong Li，*SpecCTMC: Exact Speculative Simulation of Diffusion Language Model Continuous-Time Markov Chains*，2026，[arXiv:2611.08362 v1](https://arxiv.org/abs/2611.08362v1)。官方记录首提 2026-11-05 17:41:20 UTC，cs.CL 11-06 公告。本轮补读窗口内遗漏。

## Evidence

2026-11-09 指定阅读 [v1 HTML](https://arxiv.org/html/2611.08362v1) §3 式 (2)–(8)、§4 Algorithm 1、§5 Lemma 2、Theorem 1 与式 (16)、§6 实验设置及 §6.1、§6.4、Tables 2–3、§7、附录 B.1–B.5、D.1、D.3 的相关段落，以及 Fig. 3 图注和邻近解释。

- §3 与附录 B.2 推导吸收式掩码的事件时钟。每个事件清除一处掩码，时钟依赖剩余掩码数与模型时间。位置与词元的联合标记在该时刻按当前状态取样。
- §4、§5 和附录 B.1–B.5 给出在首拒绝处校正的轨迹分布等价。被拒位置与词元由完整联合核的正残差采样。Theorem 1 要求 C1–C8，包括随机变量抽样条件、预轮选择深度、批内每个被使用的目标核等同对应的逐状态核，以及相同停止、更新和补全规则。
- Table 3 在单 NVIDIA B200 上比较 Dream-v0-Instruct-7B 的 DirectCTMC 与 SpecCTMC，同题集、同预抽时钟设置、温度 1、生成长度 32。GSM8K 五样例提示、深度 2 时，Direct/Spec 的目标串行调用次数比 1.73，墙钟时间比 0.91。HumanEval 零样例、深度 4 时分别为 2.67 和 1.94。每条件用五题热机计时选择深度。附录 D.1 说明每题每法重复计时三次取中位，再按题重抽样。计时包括草拟、校验、校正、同步和补全，排除模型加载与热机。
- 附录 D.3 另报 B200、2048 词元、深度 4：调用次数比 3.9726，接受率 0.9950，一次四状态目标调用的成本约为一次单状态调用的 4.0246 倍。墙钟 Direct/Spec 为 0.9871，95% 区间为 [0.9836, 0.9892]。这项分测用于解释串行批次数与每批开销的取舍。
- §6.4 组合缓存时的参照是使用同一缓存近似的逐步核。相对于这套近似核保持轨迹分布，并不等于证明缓存与无缓存的核相同。

## Support

支持[批量校验与掩码扩散的条件核](../notes/masked-diffusion-speculative-simulation.md)对时钟、标记、事件顺序与墙钟成本的分层解释。

## Limits

未查看 PDF 图像、代码、底层数值路径和运行日志，未做复现。定理以选定的参考 CTMC 和批行同核为条件。实测墙钟比为特定任务与硬件下的对照，跨任务不能用来分离深度或提示长度的单一效应。
