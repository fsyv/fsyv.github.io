---
title: "Gated DeltaNet 活迁移：原生追赶与日志积压"
date: 2026-11-23
draft: false
tags: [inference, migration, numerical-analysis]
id: "d28c5ecf-e1bf-4eec-84d9-2f21917e3831"
kind: source
maturity: seed
endorsement: not-applicable
read_status: partial
math: true
---

## Identity

- Hanqing Yu、Jiaqi Yang、Si Wu、Feng Li、Xiuzhen Cheng、Pengfei Hu、Yongbo Yu，*Live Migration of Gated DeltaNet Requests: Exact Catch-Up and the Cost of Log Backlog*，2026。
- [arXiv:2611.26153v1](https://arxiv.org/abs/2611.26153v1)，首提2026-11-19T14:10:37Z，11-20公告。2026-11-23补上轮遗漏，不是上轮结束后首发。
- 实际读取[v1 HTML](https://arxiv.org/html/2611.26153v1) §§1–4、5.2–5.5、6.1–6.4、7及Tables1/2/4/5/7/8/9指定文字。主控另核§§2–4、5.1–5.5、6.1–6.3相关段。图1–3只读图注与文字；未读PDF图像、源码、原始数据或复现。

## Evidence

§2的交接切点区分“已公开的token”与“已消费该token的状态”：源刚公开 $y_h$ 时，其状态只消费到 $y_{h-1}$ ；目的接该边界，以 $y_h$ 为待输入，再公开 $y_{h+1}$ 。混合模型还须统一卷积窗口和注意力KV边界。

§§2–4的Exact路径先prefill，再保持同一活请求，以源的权威token逐个覆盖目的输入，使用目的原生单token decode；追赶中的内部输出不公开。相同初态、输入token、位置、注意输入和确定性原生算术支持逐步归纳。作者16token诊断中，batch32重放的差异先出现在fused QKVZ投影。同token不推出同bit；异构3090→4090时，Exact参照为目的GPU的原生逐步重放，非源GPU跨架构逐位一致。

§3.2给每包FIFO序列化模型 $e_i=\max(a_i,e_{i-1})+b_i/C$ ： $a_i$ 为入队时刻、 $b_i$ 为字节数、 $C$ 为链路字节每秒；传播、控制及重放另计。Log发送基态与有序逐token更新因子，源继续输出也继续产生载荷。持续输入下，平均每token新增字节大于一个源token间隔可传字节时，日志债会增长；平均负载低于链路能力也不消除初始快照留下的债。

§6.2的同Qwen3.5-0.8B、双RTX4090、KV-aligned对照以 $P=D=512$ 、模拟RTT50ms、三次中位比较。100MB/s时Snap停顿353.8ms、Log77.5ms；10MB/s时Snap2.42s、Log11.72s。§5.3同10MB/s的Log gap中，11.37s来自最后必需包尚未送达；切点后排队的GDN为104.10MB、attention KV为8.68MB，并多产1075个源token。不同带宽的同口径比较支持链路积压取舍。

§5.5若让Exact重算KV，10MB/s同输入的全请求比较为Exact1.94s、Snap2.45s；KV-aligned则Snap2.42s、Exact3.31s。两类实验处理KV的方式不同，不能混排名。纯GDN与混合模型的对比同时改变模型和引擎，不能把全部差异单独归为结构因果。

## Support

支持[同模型活迁移与日志积压](../notes/kv-cache-optimization.md#live-migration-and-log-backlog)，将完整状态的[数值与执行契约](../notes/kv-cache-mechanism.md#live-migration-contract)接到[用户停顿与源释放](../notes/storage-latency-and-slo.md#migration-gap-and-release)的分别计时。

## Limits

handoff gap为最后一个源公开token到首个目的新token；release从迁移通知到目的确认取得可独立完成所需全部载荷，可能早于目的重建完成。它是单请求源退出条件，不是整机模型权重卸载完成。

证据限单请求、两个小checkpoint、模拟链路和三次重复。Table8选择器相对简单规则的13.9%是历史timings等cell权重回顾，不含完整探针及切换开销的端到端收益。完整双GPU联合KV/GDN路径、前瞻选择器、多租户、故障与随机生成质量均未由本轮核验。研究价值高、启发价值高；原文机制及有限对照可追溯，部署可靠性仍待证，整体可靠性中。
