---
title: "来源：ShadowPrefill 的目标模型预填与共享负载边界"
date: 2026-11-13
draft: false
tags: [llm-inference, kv-cache, scheduling]
id: "0cd27ccb-1e89-4d00-99bb-7120e23f7dd4"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
---

## Identity

Haoran Qiu、Rohan Mahapatra、Rodrigo Fonseca、Mark Russinovich，*ShadowPrefill: Keeping Your Next Model Warm for Per-Step Model Routing in Agentic LLM Serving*。[arXiv:2611.13176v1 题录](https://arxiv.org/abs/2611.13176v1)记 2026-11-09T19:59:25Z 首提，11 月 11 日公告。[v1 正文](https://arxiv.org/html/2611.13176v1)。

2026-11-13 实读引言、§3.1–3.5 与 Algorithm 1、§4、§5.1–5.5 指定正文与 Figures 4–9 图注、§6 与 Figures 10–13 正文和图注、附录 D.1–D.2 的配置与负载检查。未复跑模拟器或 vLLM，未读取原始服务日志或测量板卡能耗。

## Evidence

- §3 规定由可能成为下一跳的模型用自己的权重预填已知历史，切换后复用仍有效的前缀并计算新尾部。影子工作在可见排队压力出现时停发，完整设计按普通请求 TTFT 与每输出 token 时延的预算约束影子工作，并允许优先驱逐影子条目和用主机内存扩展可保留状态。没有热状态时，常规调用可以冷启动。
- §5 的 Vidur 模拟使用 H100 算子画像，按 16 个基准模型对和 6 个编码轨迹模型对汇总。默认峰值负载为各对容量的 0.7，每配置三个窗口、每窗三个种子。在同窗口、种子、模型对共同完成的调用上，Harvest-SLO+Host 相对 No Shadow 的切换 TTFT 分别降低 44.1%、47.0%，全调用均值分别降低 5.0%、9.7%。单位 SLO 达标请求的能量增加 0.4% 是模型估计。
- §6 的 vLLM 实机试验在总计 16 张 H100 的平台重放四对固定轨迹，每对资源配置见附录 D.1。校准容量以普通请求的 TTFT 与每输出 token 时延同时达标比例至少 90% 的最高测试速率计。普通流量为各对容量的 0.3 时，请求级 Harvest 相对 No Shadow 平均降低切换调用的 TTFT 61.9%，各任务内 LLM 调用时延之和平均减少 7.0%，未计工具运行时间。S7/Q72 仅 13% 调用发生切换，平均输出 249 token，切换 TTFT 降 65.9% 而该任务的 LLM 调用时间几乎未变。
- 实机实现每实例至多允许一个影子请求运行，省略模拟完整策略的逐迭代预算、专门的影子优先驱逐和主机缓存层。附录 D.1 Figure 17 的 0.5 负载对照中，S7/S32 全调用延迟较 No Shadow 高 35.1%，两组 FusionBench 模型对仍受益。等待队列为空时也可能有正在解码的普通请求。

## Support-and-limits

支持[在目标模型上提前计算](../notes/kv-cache-optimization.md#routing-and-native-prefill)。预填迁移了计算的时间位置，测切换调用之外还需计未使用的状态、缓存占用和普通流量。论文用固定轨迹隔离服务层效果，不能据此推断路由决策质量或全部工作流端到端收益。
