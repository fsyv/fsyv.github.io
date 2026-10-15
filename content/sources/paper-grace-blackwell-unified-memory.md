---
title: "Grace-Blackwell 统一内存：放置受控微基准"
date: 2026-10-16
draft: false
tags: [systems, memory]
id: "fbd8e6c1-e5c3-4612-9cee-e1c9a27444aa"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
---

## Identity

Nathan Graddon、Aaron Jarmusch、Sunita Chandrasekaran，*Understanding NVIDIA Grace-Blackwell Unified Memory Through Placement-Controlled Microbenchmarks*，arXiv:2610.20354 v1。首次提交 2026-10-14T15:30:19Z；2026-10-16 核查时官方 history 仅 v1。属于窗口内新预印本、今日补发现的遗漏，不能称昨日监测终点后首发。

[官方题录与版本](https://arxiv.org/abs/2610.20354)；[实际读取的 v1 HTML](https://arxiv.org/html/2610.20354v1)。2026-10-16 实读 §II-A/B、IV-A Table I 部分、IV-C–E、V-A–C、VI-A、VII-A/B、VIII-A–C。未核 PDF 图像、源码或复现实验，不声称全文已读或已正式发表。

## Evidence

IV-C/E 区分 CPU 初始化后 managed 内存的冷首次访问、预取完成后的访问、GPU 重用和 host-mapped 模式。预取耗时单列，预取模式的核计时在预取完成后开始。V-C 的同一 256 MiB streaming 核报告 cold managed 14.1 GB/s、prefetched 4606 GB/s；两者是相应条件下的核带宽，不是端到端加速比。

IV-E 的部分迁移/驱逐只能由趋势推断，不能从曲线断言每页驻留状态。§I 表示代码尚未公开，本次没有用缺失的实现细节解释结果。

## Support

支持[KV 成本解释中的放置与计时边界](../notes/kv-cache-optimization.md#placement-and-timing)：有效带宽应绑定物理放置、访问历史、容量压力和测量起止。把这些控制项用于 KV 实验是 AI 候选推论；本文并未在 LLM KV 服务上验证。

## Limits

微基准、硬件和访问模式限定结论，不能从统一地址空间推断统一物理成本，不能把已移出核计时的预取当作免费。没有核验代码、原始测量或端到端推理收益；没有传播无条件性能倍数。
