---
title: "远程 KV 缓存何时比 GPU 重算更慢？"
date: 2026-10-19
draft: false
tags: [llm, caching, systems, papers]
id: "e7528273-1d5a-4f69-8486-eebbdbe17a30"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
---

## Identity

- 作者：Muhammad Ibrahim。标题：When the KV Cache Is Slower Than the GPU: Scaling Remote KV Tiers for Context-Parallel Prefill。
- 版本：[arXiv:2610.21500v1](https://arxiv.org/abs/2610.21500)，首次提交 2026-10-15T08:37:22Z。未确认正式发表，不将预印本写成录用论文。
- 实际读取：[v1 HTML](https://arxiv.org/html/2610.21500v1)，PDF 文本提取辅助。

## Reading

2026-10-19：§2–4、§5.1–5.4、§6.1–6.6、§7–8 指定部分；未全文、未核源码日志、未复现，截图没有返回可检像素，不称视觉验收。该提交在今日七日窗口内，但早于上次监测终点，属于补遗漏，不是上次终点后新发。

同日按用户要求补充晨报证据时，直接重读 v1 HTML §3 的评测口径与 §6.3 表 2 及相邻讨论；仅核对原表，不新增研究候选或声称复现。

## Evidence

- §4：用前缀长度除以引擎 prefill 速率，与固定开销加有效字节传输耗时比较。固定开销包含调度、lookup 往返、少量未缓存尾 token forward 与元数据交换；它不是完整 TTFT。给出的冷 miss replay 速率统计为中位数，不能写成均值。
- §4 固定开销、§7 及 §8 的单长度桶限制：约 17k token 门槛基于单长度点拟合，未跨长度测准。
- §3、§6.3 表 2：GLM-5.3 FP8、8×B300，450 个相同高命中请求，prompt 长度中位数 16,390 token，远程层预热、本地缓存为空。延迟为 prefill 阶段完成时间，不含 decode 交接。H1b 单实例同步加载中位/p99 为 9.70/83.32 秒；H5b 八实例分片异步加载并修正实现为 0.40/0.67 秒；同请求重算 B1 为 0.31/1.28 秒。两条加载路径均 98.5% token 来自远程层。最终加载中位数仍慢于重算，p99 则更低；约 124 倍的 p99 改善是对拥塞 H1b，不能换成重算基线。
- §8：单次运行、单引擎、单长度桶和能容纳的容量子集限制外推；端到端配置同时变化，不能隔离为单独缓存收益。

## Support

支持[KV 加载与重算的条件比较](../notes/kv-cache-optimization.md#remote-load-or-recompute)。知识笔记中保留固定开销后解出的联合带宽/长度门槛为 AI 代数推导，不假称论文另做了跨长度测量。学习入口为[Transformer 地图](../maps/transformer-and-inference.md)。

## Limits

一阶模型的有效带宽属于单 prompt 的实际份额，不是链路标称值；并发、长度与实现变化可能改变全部参数。未复现门槛、吞吐或尾延迟，不作服务性能保证。研究价值高、启发价值高、可靠性中：读取原始指定正文，但没有源码、运行日志或重复实验验证。
