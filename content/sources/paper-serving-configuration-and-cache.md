---
title: "引擎配置与缓存架构：分块 prefill 和排队的受控比较"
date: 2026-11-06
draft: false
tags: [llm-serving, scheduling, evaluation]
id: "1aeb8241-8e6c-4ec3-b20b-97d15ef7f6e0"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
math: true
---

## Identity

Anwar、Keshvadi，*A Controlled Experimental Evaluation of Configuration and Cache Architecture in LLM Serving Engines*，arXiv:2611.05991v1，2026。[题录](https://arxiv.org/abs/2611.05991v1)；[HTML](https://arxiv.org/html/2611.05991v1)。首次提交 2026-11-04T05:37:14Z，11-05 分组公告，本库 11-06 首读，为窗口内补遗漏。没有独立核实 HTML 中 TOMPECS 标识对应的正式出版状态，不称期刊已发表。

指定读取 §2.1–2.4、§3.2–3.5/Table 1、§4.1–4.5/式 2–8、§5.1–5.4/Tables 2–3、§6.1–6.5/Tables 4–5、§7.1–7.2、§8.3–8.4、§9.1–9.4。图仅读图注，未核 PDF 像素、代码、原日志或复现。

## Mechanism-and-conditions

实验为单 L4 24GB、Llama-3.1-8B-Instruct BF16、context 16384、单副本，vLLM 0.6.3 V0 对 SGLang 0.4.1，前缀缓存均开启。默认 vLLM 无分块、SGLang 为 2048；匹配条件只打开 vLLM 分块并设为 2048。作者明确现代 V1 默认已变，不能据历史比较作当前引擎排名。

合成依赖图为 planner→四 worker→aggregator，每图六请求，90% 共享前缀；Gamma 图到达间隔 CV=1.5，4096-token rate sweep 另测 8192-token。三 seed 配对，先取单 run 的 p50/p95 TTFT，再计算比值几何均值。TTFT 自请求发送至首 token，包括排队。

## Evidence

比值区间为 95%：在三 seed 的配对对数比上用自由度 2 的 t 分布计算，再指数还原，不是 bootstrap 区间。

4096 token、0.12 图/秒的 vLLM/SGLang p95 比值默认 8.10，匹配后 2.44，后者区间 [1.08,5.53]。4096 token、0.28 图/秒的 p50 比值为 36.4→12.3，吞吐比 SGLang/vLLM 为 1.22→1.046。8192 token、0.065 图/秒的 p50 比值 64.1→3.94，后者区间跨相等；同条件匹配 p95 为 6.43，区间 [1.83,22.55]。

若讨论作者定义的“差距移除率”，其计算对象是对数比：

$$
\phi=\frac{\ln(R_{\mathrm{default}}/R_{\mathrm{matched}})}{\ln R_{\mathrm{default}}}.
$$

这里 R 的方向按指标固定：时延采用 vLLM/SGLang，吞吐采用 SGLang/vLLM，均使较大的比值表示 SGLang 更有利。该量不是减少的 TTFT 秒数百分比，也不是消除所有缓存架构差异的因果比例。

0.28 图/秒时名义到达约 1.68 请求/秒，匹配后 SGLang/vLLM 约完成 1.66/1.58 请求/秒。作者定义完成率至少达到名义到达的 97% 为跟上负载；有限 trace 实际到达可偏离名义值，不能把 1.68 当每次 run 实测输入。流体模型用相对吞吐不足描述等待随运行时长累积，只适用于一方跟上、另一方落后的近似；模型将估算的积压附加等待加上同 run 的 SGLang 中位 TTFT，以预测 vLLM 中位 TTFT；七个满足条件的 run 中，预测值平均约为实测 vLLM 中位 TTFT 的 1.6 倍，而非单独测得的排队等待。依赖图的前序阻塞会反过来减缓实际到达，不能将模型当精确逐请求估计。

## Support

[配置与排队解释](../notes/storage-latency-and-slo.md#configuration-and-queueing)把配置差异、吞吐不足与首 token 等待分开。它延伸端到端评价，不把残差全部归于 radix cache，也不将历史版本数据用于当前采购或版本推荐。

## Limits

两臂来自不同部署。SGLang 内部对照漂移为 0.5%–11.7%，vLLM 没有同等漂移界限；只有三 seed，64 项检验未作多重比较校正。匹配分块后仍未隔离 ordering、kernel、overlap 或显存预算。性能干预支持指定条件下的归因，不能证明任意负载、当前软件版本或全部缓存设计的优劣。11-13 优先核同部署交错与当前版本，不重复历史大倍数。
