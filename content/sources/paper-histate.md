---
title: "HiState：混合模型前缀缓存的检查点与分层恢复"
date: 2026-11-03
draft: false
tags: [llm-inference, caching]
id: "6a7c7793-bb83-428b-b5d1-b83c230daa4a"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
math: true
---

## Identity

Zaifeng Pan、Lucas Wang、Xinwei Qiang、Yanbo Zhou、Chang Chen、Zhengding Hu、Yue Guan、Yufei Ding，*HiState: Hierarchical Prefix Cache Management for Hybrid LLM Serving in Agentic Workloads*，2026，[arXiv2610.41508v1](https://arxiv.org/abs/2610.41508v1)，首次提交2026-10-30T09:59:44Z，当前仅v1，11-02公告。本日补上次遗漏，不是上次监测终点之后首发；页面ICML样式提示不构成接收证明。

2026-11-03实际指定读取[HTML](https://arxiv.org/html/2610.41508v1)§1、§2.1–2.3、§3.1–3.3式1–7、§4.1–4.3正文及图注；未读PDF/视觉核图、源码或原trace，未复现。

## Mechanism

§2.1–2.3：混合层需KV及匹配边界的循环状态；没有对应检查点时，从更早边界重放或重算全前缀。改写/删中段后的尾文本不属于精确共同前缀。

§3.1式1：完整前缀在已保存边界命中时，KV访问/保留量均为 $Lb$，循环检查点访问 $S$、保留 $(L/I)S$，比例 $I/L$。式2/图5以64GB/s H2D、5GB/s SSD估算单检查点CPU0.8ms/SSD10.9ms，不是测得SSD尾部。§3.2的间隔规则使用均匀未来命中位置及EMA停留估计；§3.3分开中间检查点、末尾KV和terminal状态，按最近时间与释放容量对应重算量等打分，不证全局最优。

## Comparison

§4.1：Qwen3.5-9B，单H100 80GB，20个Xeon8468 vCPU；GPU缓存约45GiB（2560×576token块），pinned CPU96GiB，disk150GiB，最多24 live sessions，约三小时回放。Weka125 sessions/3784 requests；TraceLab Codex68 sessions/4791 requests。vLLM-Marconi v0.27.1为GPU-only，`CPU*`/`Disk*`是作者扩展；SGLangHiCache0.5.22按默认约一半GPU缓存分给每类。使用相应CPU/SSD层次的对照匹配该层预算。

§4.2全请求TTFT含排队/恢复/重算，p99相对GPU-only vLLM-Marconi最多改善5.73倍；p50相对`Disk*`大体相当、Weka略退。reuse-sensitive子集按`Disk*`比无限缓存命中低至少5个百分点，或与HiState差至少5点选择，其平均TTFT Weka2.66→1.29秒、TraceLab1.77→0.96秒；不代表全流量均值，少数请求可能退化。

§4.3为合成mutation：24 sessions、90分钟、16轮、每轮8K新input与256output、三分钟间隔；10% mutation时总体p99较`Disk*`降7.2%。这不能与GPU-only的5.73倍拼成同一对照，也不是实际轨迹的单变量因果检验。

## Support-and-limits

支持[混合检查点的完整解释](../notes/kv-cache-optimization.md#hybrid-checkpoints)与[完整状态条件](../notes/kv-cache-mechanism.md#hybrid-state-and-forks)。正文机制和限定对照可追溯，作者实现/负载重放未经本库核验，可靠性中；研究价值高在补恢复条件，启发价值高在区分访问量与保留量。Native双池的旧continuation缺口没有由另一系统证明解决；Flide也未证明与它已组合。
