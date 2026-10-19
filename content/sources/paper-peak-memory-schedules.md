---
title: "峰值内存调度：固定生成程序的实现契约与最优证书"
date: 2026-10-20
draft: false
tags: [optimization, systems, memory]
id: "31483e4c-68b7-49ed-94a8-921631861d19"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
math: true
---

## Identity

- Ivan Fomin、Ivan Koryabkin、Boris Sheludko，*Peak-Memory Schedules You Can Trust: Exact Realization, Certified Optimality, and the Limits of Recomputation for Inference*，2026。
- [arXiv 2610.23328](https://arxiv.org/abs/2610.23328)，v1 首提 2026-10-16T11:31:09Z；[HTML](https://arxiv.org/html/2610.23328v1)。窗口补遗漏，非昨日终点后首发。
- 2026-10-20 研究员指定读取 HTML §2–4、§5.1–5.3（含 Table 1）、§5.5–5.6、§8、Appendix A.1–A.4/C.1–C.2；其余引言和表格局部。Architect 另核 §2–5.2 关键表述；没有通读 D–G 证明、审计源码、视觉核图或复现。

## Evidence

§2： $S$ 为已执行集合， $L(S)$ 为存活字节， $a(v)$ 为新分配、 $s(v)$ 为临时空间；事件峰 $L(S)+a(v)+s(v)$ ，输出分配先于输入释放。

§3/Theorem 1/C.1–C.2：固定 wrapper 的六条件包括完整读写 effects、准确所有权与异步完成、确定性 kernel、固定分配事件、不依赖周围存活内存、重排无额外事件。逐事件对应推出预测峰精确实现及相同结果；库 kernel 契约不是形式证明，作者重新 profiling 检查。§4 用可行峰与有效下界相等证固定模型内最优；完整下界/复杂性证明未全部复核。

§5.2/A.1–A.2：PyTorch 2.14.1、CPU FP32 单线程，基线 Inductor 已启用 peak reorder/inplace reuse；指标为一次 warm step 内 tracked tensor-allocation peak，不含常驻权重和输入。22 个推理配置均实现预测峰、输出 bitwise 相同；仅 DeepLabV3-ResNet50 512×512 降 10.0%，20 个原顺序已证模型最优，另一个仍有 gap。

§5.6：RTX 2080 Ti/CUDA 12.6 的 50 个训练配置中，固定 wrapper 重排仍有 8 个物理峰上升，最多 1.5%。缓存 allocator 的舍入、块拆分、历史破坏事件独立性。逻辑请求字节、allocated、reserved、arena 需分开。§5.3/A.4 的 ReDimNet B3/B6 中，重算逻辑收益可被贪心 arena 碎片吃掉；MAC 增量非实测时延。微控制器只是图/arena 评估，没有固件实测。

## Support

[张量存活与峰值内存](../notes/tensor-liveness-and-peak-memory.md)给出事件算例和分配器边界；与 [KV 驻留](../notes/kv-cache-optimization.md#residency-and-accessibility)有释放时刻/容量记账的方法联系，非同一对象模型。

## Limits

研究价值中、启发价值高、可靠性中。数字为作者报告，未复现；固定 wrapper 不自动保证物理显存或时延，也没有验证 KV 服务。
