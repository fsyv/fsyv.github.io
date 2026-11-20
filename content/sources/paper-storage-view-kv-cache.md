---
title: "The Storage View Of KV Cache：会话内复用、跨会话共享与回收"
date: 2026-11-11
draft: false
tags: [kv-cache, storage, inference]
id: "e34ec5d4-6e9c-4ff7-9134-935eca50c7e6"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
---

## Identity

Talia Q. Chen、Daniel Waddington、Narangerelt Batsoyol、Vijay Chidambaram，*The Storage View Of KV Cache: Characterizing Cache Behavior Across LLM Workloads*，2026。[arXiv:2611.10178v1 题录](https://arxiv.org/abs/2611.10178v1)，首提 11-06 19:58:58 UTC，11-10 公告。[固定 HTML 正文](https://arxiv.org/html/2611.10178v1)。

## Trace-evidence

本轮阅读 §§2.1–2.2、3.1–3.3、4.1–4.4、5 及附录 A.3–A.6 的指定正文与图注，未独立读取图像、原始轨迹或实现。11 条生产与公开轨迹包含 15 个工作负载。§3.3 对原始文本使用 Qwen3-8B tokenizer、16-token 分块及 vLLM 风格前缀链哈希。预哈希数据沿用或连接原有标识，RAGPulse 的 512-token 粒度遮蔽较短共享前缀。仅元数据的数据集不用于推断精确块身份。§4.3 以每 token 144 KiB 的 bf16 KV 换算容量量级，此口径不是实际部署传输量。

§4.1 与图 2a 将不限容量、无淘汰时的潜在块读命中分为会话内和跨会话。RAGBench 为 71%，全部来自单轮会话之间。WildChat 为 74%，主要来自同一会话历史。§4.4 与图 6b 比较固定空闲 TTL 与真实结束时回收，用于衡量单会话回读与持有的无后续读状态。图 6c 在不限容量下按历史标记第二次访问，分别按请求计数或按不同会话计数，随后按各自标记的字节量衡量被另一会话读取的比例。

附录 A.6 显示，所有当前持有者结束后释放共享块，会损失日后才发生的跨会话命中。Qwen Code 的重读中有 53% 跨会话。§4.4 与附录 A.6 分别把相对差值表达为完成策略比五分钟 TTL 少 37%，和 TTL 比完成策略多 37%。两种写法的百分比基数不同，本库不使用该差值做定量比较。

## Support-and-limits

支持[前缀块生命周期与共享辨认](../notes/kv-cache-optimization.md#session-lifecycle-and-sharing)。研究价值高，轨迹对照区分寿命与读取者身份。启发价值高，使用同一会话身份可解释为何相近命中率要求不同的回收策略。限定轨迹解释的可靠性中，§5 明确未模拟实际传输、调度和特定有限容量策略；不能由标记字节量推算生产吞吐、时延或容量收益。
