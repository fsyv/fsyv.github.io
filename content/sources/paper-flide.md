---
title: "Flide：共享主干、独立分支与浮点负载不变性"
date: 2026-11-03
draft: false
tags: [llm-inference, attention]
id: "45829632-e529-4747-81e9-c8fc7967fce8"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
---

## Identity

Bobo Li、Jiajia Song、Hao Fei、Wynne Hsu、Mong Li Lee，*Flide: Accelerating Decision Inference with Exact State Forking*，2026，[arXiv2610.42148v1](https://arxiv.org/abs/2610.42148v1)，首提2026-10-30T17:59:38Z，当前仅v1，11-02公告。本日补上次遗漏，不称今天新首发。

2026-11-03指定读取[HTML](https://arxiv.org/html/2610.42148v1)§1、§3.1–3.5式1–4/Proposition3.1、§4.1–4.3/Table2–4代表行、Appendix A证明、B/Table8版本、D/Table9的Qwen3.5-4B部分、E/Table12不变性与Table13局部成本、G测试说明。未读PDF/视觉图、源码或执行复现；论文列出作者repo不等于本轮已审。

## Mechanism-and-proof

§3.1以各单题prompt逐token最长共同前缀为主干，分支接各问题，输出为选项对应head行softmax。§3.2按请求/分支/逻辑位置隔离注意力，并从同一主干末GatedDeltaNet状态及卷积窗口分别启动循环。兄弟分支不进入彼此的历史。Appendix A按层证明精确算术下等于隔离forward，依赖所列因果层，不适用于任意状态机只加mask。

§3.3 GPU buffers保存元数据，按总stream容量选择CUDA graph；padding不可见，超容量按请求拆或单请求eager。§3.4增量checkpoint同时保存循环层FP32状态、卷积窗口及全注意力KV，token前缀匹配才恢复。§3.5默认浮点布局仍可改bits；optional invariant固定求和次序/chunk边界，限同软硬件下随负载不变，不是跨硬件等价或任务正确性证明。

## Comparison

§4.1/Appendix B：单H200、BF16；vLLM与Flide同prompts/CUDA graphs，vLLM每格选0.32.0rc1（10-14）与0.32.1rc1中更快build。SGLang0.5.21用其模板，MIS关闭graphs/radix/chunked prefill，故不能把全部引擎差归于delimiter。每并发级清prefix cache、各引擎独占，dataset副本tag防跨请求复用；1/8/32/64 clients是闭环并发。

Table2/3/9：Qwen3.5-4B、RACE-all256requests/1019questions，平均每state约4题，vLLM→Flide单客户端中位57.6→14.1ms；64clients吞吐67→124requests/s，单位不是token/s。57.6/14.1约4.09是AI算术，为整体引擎效果，不能单归ForkAttention。单题QuALITY（截至3600token）同4B为68.6→62.3ms、19.3→19.9requests/s；两负载不构成共享比例的单变量消融。

Appendix E/Table12的Qwen3.5-4B/RACE-all，默认14.3ms、C64吞吐118requests/s、Bits33.2%；invariant16.7ms、118requests/s、Bits100%。Bits是答案bits随load不变的比例，不是accuracy；正文≤10%开销仅C64吞吐，不能泛指单客户端时延。Appendix G是作者有限测试说明，包括0.8B十个DI请求对float64误差门槛，不是本库复现。

## Support-and-limits

支持[完整状态与分支隔离](../notes/kv-cache-mechanism.md#hybrid-state-and-forks)，和[HiState恢复条件](../notes/kv-cache-optimization.md#hybrid-checkpoints)是相关但独立的机制。研究价值高在扩精确复用条件，启发价值高在逻辑依赖与物理铺平可分；正文推导可核、系统未经运行，可靠性中。语义等价、浮点接近/bit不变与实际答案正确分别评价，不外推任意生成、跨硬件恒同或HiState已能直接组合。
