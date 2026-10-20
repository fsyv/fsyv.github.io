---
title: "Agentic 工作负载中的 KV 驻留：生产遥测与对象回放"
date: 2026-10-20
draft: false
tags: [llm-inference, caching, systems]
id: "af08df5a-63f0-4f2e-9a0f-5eca539c79dd"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
math: true
---

## Identity

- Mayank Arya、Agrim Bari、Anjaly Parayil、Yogesh Simmhan、Renee St.Amant、Victor Rühle、Saravan Rajmohan，*Understanding KV Residency in Production-Scale Agentic LLM Workloads*，2026。
- [arXiv 2610.22863](https://arxiv.org/abs/2610.22863)，v1 首提 2026-10-16T03:09:13Z；[PDF](https://arxiv.org/pdf/2610.22863)。本轮是窗口补遗漏，非昨日监测终点后的首发。
- 2026-10-20 实际研究阅读：30 页 PDF 的 §2.2–2.3（印刷 pp.5–7）、§4.1–4.2 起始（p.12）、§4.4（pp.13–14）、§5 开头至 §5.7（pp.15–20）；§6 起始及生成器限制辅助核对。Architect 依据指定阅读交接整合，另核官方题录；没有全文通读、视觉核图、原轨迹、代码审计或复现。

## Evidence

§2.2–2.3 的四种 M365 负载口径不同：Research、Assist、Chat 使用 model-call 遥测，Code 使用工具/会话事件。生产模型保密，作者用 Llama2-70B 几何替身估算 KV：K/V 两份、80 层、8 个 KV 头、每头 128 维、fp16 每元素 2 字节，即每 token 327,680 字节。不是生产 HBM 实测。

§4.1–4.2 定义工作集/hold-all-live；§5.1/图 10（pp.15–16）的完整 eligible Research trace 按 live session 的终生峰值大小计费。never reclaim 改为一小时 idle cap 后，估计峰值 501.8→140.8 TB，重建调用率 4.07%→4.53%。不能与下组的当前上下文计费混用。

§5 的最忙一小时含 176,007 calls、9,486 sessions，按时间顺序、当前上下文大小做整 session 对象回放，缺失重建整段。无淘汰峰 47.0 TB，10% pooled HBM 预算为 4.7 TB：LRU/FNU/MRR 重建调用率为 62.9%/31.1%/13.6%。FNU 是未来使用启发式，对大小会增长的对象不是最优性证书；MRR 按 LRU 次序从 fp16 降为四分之一大小的 int4，计入同一预算。2% 预算时 FNU 67.60% 优于 MRR 72.92%，排序不普遍。

§5.3 末（p.18）的量化元数据敏感性使 MRR 重建率变成 14.99%–19.25%。回放忽略恢复、反量化、传输时间；int4 提升后按 fp16 命中记账，未测输出质量。指标为重建调用数/总调用数，不是 token 比例或请求耗时。

§4.4/5.5/5.7 中，从 session 改为 session+deployment 身份时，对象数 9,486→35,588；空缓存无限容量的首触下界分别为 9,486/176,007≈5.39%、35,588/176,007≈20.22%。这是对象可访问性模型变化，非路由干预因果实测。同部署 token 复用 88.9% 与同模型跨部署 29% 也只是观察关联。

## Support

[KV 成本解释](../notes/kv-cache-optimization.md#residency-and-accessibility)分开驻留时限、表示与可访问性；[基础验证问题](../questions/foundations-validation.md)承接恢复、质量和每副本容量缺口。

## Limits

pooled 总预算不同于真实每副本 HBM，回放没有执行队列、传输与计算竞争。原轨迹不公开，生成器仅计划发布，本轮未取得实现。研究价值高、启发价值高、可靠性中；数字可核正文，部署收益未复现。
