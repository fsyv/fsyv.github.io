---
title: "Valse 与 Jannesari：前缀缓存陷阱的更新定律"
date: 2026-11-10
draft: false
tags: [kv-cache, serving, queueing]
id: "acb0d099-d417-4928-805d-f5c6983ec1e5"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
math: true
---

## Identity

Akshat Valse、Ali Jannesari，*Inside the Trap: A Renewal Law for Prefix-Cache Collapse in LLM Agent Serving*，2026，[arXiv:2611.08902v1](https://arxiv.org/abs/2611.08902v1)。首次提交 2026-11-06T02:44:08Z，11-09 官方公告。本轮指定读取 [HTML](https://arxiv.org/html/2611.08902v1) §2/Table 1、§3/F1–F6/Lemma 1/Theorems 1–2/Proposition 1/Corollary 3、§4/Table 2/§4.1、§5/Fig. 3、§7、Appendix E.7/Tables 8–9。未看 PDF 视觉、源码或运行日志，未核验注册时间戳或复现。

## Model-evidence

§3 的模型 F 将全未命中的请求视为流体，单服务器工作守恒、按请求 FIFO 服务，未结束的会话立即回队尾。每轮有正的固定服务成本，轮数有有限上界。Proposition 1 将所有现有会话未来轮次也计入总工作，给出严格低于全未命中容量时的排空时间。Lemma 1 的更新方程和 Theorem 1 的渐近解给出服务轮次构成、完成率与积压斜率。Theorem 2 分开两种贡献，一种来自结束轮次分布，另一种来自较早轮次的较低成本。§4.1 中，标准负载的截断几何轮数和增长的每轮成本使渐近完成率为排空阈值的 1.223 倍。近固定轮数的 MIRROR 对照中，轮数效应压过成本增长，模型比值为 0.771。

## Engine-comparisons

标准对照在单张 A100 80GB 上以 SGLang 0.5.22 运行 Qwen2.5-7B，KV 池为 30 万 token。合成会话使用随机 token，后续轮次以缓存覆盖提示过半为命中。实验的 $\lambda_{\mathrm{ref}}$ 来自关闭缓存的 32 会话测量。模型 F 对标准和 MIRROR 两类负载分别估计 $\lambda_{\mathrm{miss}}/\lambda_{\mathrm{ref}}$ 为 1.004 和 1.046，两个标尺需区分。MIRROR 将轮数改为成功参数 1/1000、上限 20 的截断几何分布，约 98% 恰好 20 轮。§4.1 的观测指标是指定时间窗的完成率及完成波峰，0.771 属于模型渐近量。

§5 的 CUT-A 和 CUT-B 在已有缓存陷阱时削减到达，并沿用同一 300k A100 标准合成工作负载。CUT-A 于 2400 秒由 1.65 降至名义 1.15 倍参考率，三次实际入流为 1.12–1.20 倍。匹配的不降流运行完成率为 1.32–1.41 倍。三次均零后续轮命中至 8700 秒，区间 [3000,8700) 的积压斜率为 +0.0040、−0.0022、+0.0029 会话/秒。CUT-B 的名义入流为参考率的 0.85 倍，三次积压斜率均为负，窗口末仍积压 77–140 会话。比较规则在预报可见后确定，测试排除了指定的固定速率比较对象，其他中间模型仍可能拟合这些有限窗数据。

同节另测试限制同时活跃的会话数。在单卡 300k 与原生缓存池两类设置，作者重放相同供给负载，以匹配的新服务运行比较。R1/R4 共九次在陷阱中启用上限 20 或 64。客户端在工具边界暂停会话并优先恢复它们，队列清空 300 秒后移除上限。按论文规则九次均恢复且无丢弃，暂停会话的平均等待代价为 386–569 秒，各次移除限额后追踪 2560–4720 秒。该干预结果限于论文合成负载、客户端机制和比较窗口。

## Support-and-limits

支持[已有会话压力解释的全未命中分支](../notes/session-cache-pressure-and-metastability.md#all-miss-renewal)。Lu 等不同引擎和负载下的低复用反馈模型可解释进入陷阱，模型 F 则显示陷阱内完成的会话构成也会变化。论文的会话完成率与按延迟限制筛选的会话 goodput 有不同成功分母。实际引擎可并行、抢占、恢复命中，现有比较未证明真实系统的排空阈值等于模型值。研究价值高在区分恢复标尺，启发价值高在识别完成者构成偏移。给定假设的数学结论可核，实测可靠性中，未独立复现。
