---
title: "KV 复用、分页与前缀共享：一手资料阅读范围"
date: 2026-10-12
draft: false
tags: [foundations]
id: "60db330f-ce1d-494c-94fb-ae08b2ba38c3"
kind: source
maturity: developing
endorsement: ai-candidate
read_status: partial
---

**归属：资料事实的候选整理。** 阅读日期2026-10-12；范围如下，未复现性能实验。

## Cache

Hugging Face Transformers 维护者，*How caching works*，[官方文档](https://huggingface.co/docs/transformers/main/en/cache_explanation)，持续更新文档（页面未给固定发表年，访问日2026-10-12）。

实读 Attention matrices、缓存更新与 Cache storage implementation 的说明和循环示例。核对每层分别缓存、历史 KV 与当前 KV 合并、当前输入和缓存长度/掩码的关系。版本为 main，接口细节会变，本文引用机制而非承诺代码兼容。

同时读取 [OpenAI GPT-2 model.py](https://raw.githubusercontent.com/openai/gpt-2/master/src/model.py) 的 `attn` 与 `past_shape`：缓存张量包括层、K/V、头和序列维度，注意力只使用当前查询。结构证据与报告范围另见[Transformer 来源](foundations-transformer.md#gpt)。

## Paging

Woosuk Kwon、Zhuohan Li 等，*Efficient Memory Management for Large Language Model Serving with PagedAttention*，2023，[arXiv:2309.06180](https://arxiv.org/html/2309.06180)。

实读 §4.1–4.2：按固定 token 数划分 KV 块、非连续物理空间、逻辑块到物理块映射与按需分配。未读全部评测，不沿用摘要的吞吐倍数；该机制不意味着减少理论上每 token 的 KV 元素数量。

## Prefix

Lianmin Zheng 等，*SGLang: Efficient Execution of Structured Language Model Programs*，2023预印本（读取当前 HTML 版本），[arXiv:2312.07104](https://arxiv.org/html/2312.07104)。

实读 §3 与附录 A.1：共享 token 前缀的 KV 依赖、radix tree 中的查找/复用/淘汰及调度关系。未核验全部实验、分布式证明或性能数字。这里的前缀复用要求计算条件一致，不能解释为语义相似缓存。

## Links

[KV 机制](../notes/kv-cache-mechanism.md)中的累计复杂度与存储公式为明确假设下的推导；[成本分类](../notes/kv-cache-optimization.md)使用本页的分页与前缀共享实例，其余分类是一般工程分析，没有借未读论文声称具体加速。
