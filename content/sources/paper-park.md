---
title: "PARK：多轮推理中的联合路由与缓存保留"
date: 2026-11-27
draft: false
tags: [llm-serving, cache, optimization]
id: "c184fa01-7f23-4366-bd50-94a5ad54f6ea"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
math: true
---

## Identity

Sentao Miao、Tianjiao Nie、Yuan Zhou、Song Yuan、Yuanwei Lu、Yibo Zhu，*Routing and Cache Retention for Multi-Turn LLM Inference: Theory and Implementation*，[arXiv:2611.34584v1](https://arxiv.org/abs/2611.34584v1)，首次提交 2026-11-25T15:45:44Z、11-26 公告。本轮 11-27 发现的新预印本。

实际读取 [v1 HTML](https://arxiv.org/html/2611.34584v1) §3.1–3.2、4.2–4.3、5.1–5.3 的声明与假设、6.1–6.3 和表 2–6，以及附录 10.1–10.2 遥测、forecast、物理块与表 7 指定部分。附录 8–9 证明只零散定位，未完整核证 Theorem 5.2。未读作者实现或原始日志，未视觉核 PDF、运行 GPU 或复现。

## Evidence

- §4.2 比较 continuation value 与即时资源价格，允许当前 warm 归属与未来路由分开。§4.3 式 (4.12) 的有效保留时长用期望持有时长除期限内返回概率，再在有限整数期限 $1\le u\le N=H-t-1$ 内取最小值；若可选期限的返回概率都为零则定义为无穷，不是直接平均回访时间。
- §5.3 用每字节、每有效 epoch 的预期节约价值形成 index；回报封顶、线性存储和二次重建成本可导致保护中间长度。共享块累加会话量化 index 后按 bucket 回收 unpinned blocks。
- Theorem 5.2 的 buffer-reserve 策略每期精确解 LP，固定 horizon、状态和端点，容量/到达同比 $n$ 扩张、条件次高斯和初始缓冲 LP 可行等假设下，以约 $\sqrt{n\log n}$ 缓冲获得相对 fluid completed-turn 基准同阶缺口。实际 PARK 是秒级价格、一轮 lookahead 和局部 index，没有直接获得该定理保证。
- §6 表 4 与附录 10：同 Step3.7 Flash 约 197B、16 H200、TP8×2、共有 vLLM 栈和最大 pending 512；每组三小时，从 first admission 开始、不删 warmup/ramp，持续替补已结束会话。输出率按每五秒 Prometheus 累计输出 token / 墙钟。SWE：PARK 6575，对最强 SGLang-routing-port 5296；Terminal-Bench：8590，对最强 ShortestQueue 6135 token/s。SGLang 仅固定 `cache_aware_zmq` revision `a176ba2f7b74` 的路由移植，非整个引擎。基线使用原生 LRU/即时准入，PARK 同时改三项控制。
- 表 6：8 H200 单副本 SWE、round-robin、最大 pending 256、5 min 预热+30 min 测量，只换 idle KV 回收选择。LRU 到 index 的 prior-prefix-token-loss 13.26%→2.17%，verified rebuild 30.77→6.62 M token，全部 scheduled prefill 55.52→29.70 M，输出 2326→3179 token/s，平均 TTFT 25.56→16.49 s。prefix-loss 的历史分母与 Bloom 估计限制见附录 10.1，不等于总 prompt 命中率。

## Support-and-limits

支持[联合路由与保留解释](../notes/kv-cache-optimization.md#joint-routing-and-retention)，增加既有寿命/可访问性之后的控制策略和两层比较。两负载的已完成会话长度统计来自 PARK 自己的轨迹，不可据此声称所有方案经过同样的实际轨迹。128 GPU 的 scale 展示不构成同对照的线性加速定理。本轮不据吞吐判断任务质量、完整会话 SLO、外生冲击恢复或净能耗；12-04 先核明确实现和同轨迹的任务/请求/会话完成原件。研究与启发价值高，原测量证据可靠性中。
