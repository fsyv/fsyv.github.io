---
title: "Hopper四位KV解码：指令预算、容量与完整请求"
date: 2026-11-25
draft: false
tags: [kv-cache, quantization, gpu, inference]
id: "a47eb023-f870-43d5-a81f-1375324864c4"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
math: true
---

## Identity

Jian Zhang，*Fast 4-bit KV-Cache Decoding on Hopper GPUs: Why Existing Kernels Are Slow and How to Fix Them*，2026，[arXiv:2611.30027v1](https://arxiv.org/abs/2611.30027v1)、[固定 HTML](https://arxiv.org/html/2611.30027v1)。首次提交 2026-11-23T04:29:01Z，11-24 公告；本轮为补上次监测遗漏。HTML 同版本副标题措辞略异，按同一 canonical 记录。作者库 [kv4-hopper](https://github.com/thomaszhang2661/kv4-hopper)只读页面入口，未审源码、原日志或执行 GPU。

2026-11-25 指定阅读 §1 说明与 §2、§3–5、§6 表 4/5、§7 表 7/8 及 API 解释、§8 离线质量/PPL/表 13/长上下文相关段、§9 范围限制。未完整附录、引用原作、PDF 视觉、实现或复现；31 页不记全文阅读。

## Evidence

- §3 表 2：Hopper 没有 FP4 硬件，解包与缩放消耗指令。以 H200 规格估计约七条线程指令/字节，NVFP4 每 128 个值占 72 字节，对应约 3.9 条/值的满带宽预算。批量 32、长度 16K 的 FlashInfer NVFP4 为 8.3 条/值、19% 带宽；UltraQuant 为 22.5 条、8%。BitDecoding 去 spinwait 后 3.6 条仍只 25%，指令数之外仍有等待和重叠约束。
- §4：TMA producer 双缓冲搬运 256-token stage、两个 compute warpgroups 重叠解码和矩阵计算；转置矩阵角色使 K/V 从寄存器进入 A 操作数，小 query 组采用 N8；写入端布局 codes 与 scale，减少 shuffle、共享内存和填充。这是配合表示布局的执行组合。
- §5–6 表 5：H200 SXM 141 GB，8 KV head、分组比 4、head 维度 128。各内核在同一运行用 CUDA graph replay 并按形状取最佳 page/split。32×16K 下作者 NVFP4 为 0.1876 ms，XQA FP8 为 0.2547 ms、FA4 FP8 为 0.2551 ms，最快 FP8 / 作者约 1.36，十一形状为 1.12–1.49。一般内核表采用五次 warmup、50 次调用的中位数、L2 flush；不能混同表 5 的各自最佳选择与部分其他表中的 baseline heuristic。
- §7 表 7：vLLM 0.33.0、Llama-3.1-8B、100 次 graph replay 的整步中位数，显存利用率 0.90、页 64 token。full recipe 为 K 均值移除、K Hadamard 旋转、前四个 token BF16、第零层 BF16。32×16K 的 FP8/XQA 12.66 ms、原 vLLM NVFP4 26.36 ms、作者 10.94 ms。该配置可容纳 2,867,200 token，FP8 为 1,761,600，约 1.63 倍。
- §7 表 7 之后的端到端段落，64×32K：FP8 不能同时容纳全部 64 序列，作者配置可以。含等待 KV 槽位的 decode TPOT 作者/FP8 为 38.7/52.2 ms；固定生成 256 token，约 210 万 prompt token 的 prefill 为 77.0/71.7 s，完整任务总时长为 86.8/85.0 s。decode 与全请求结论不能互换。
- 表 8：Poisson 到达、随机 prompt 长度在均值正负 50%；1K 输入负载窗口为 600 s，16K 输入负载为 300 s，目标为 TTFT≤2 s、TPOT≤100 ms 且至少 99% 请求联合达标。1K 输入/8K 输出、1.5 请求/s 下，单 API 的作者三次运行达标率 0.81/1/1，四 API 两种 seed 为 1/1，FP8 为 0.69/0.75 且 KV 满。16K 输入/512 输出、0.75 请求/s 时，FP8/作者达标率为 0.98/0.94，TTFT p99 为 2.2/2.5 s。API 与 CPU 也可限制结果，不能写成无条件稳定的到达率上限。
- §8 表 13、§9：有限样本未显著不等于等价；95% 区间约正负 2.5–3 个百分点，显著性 0.05、功效 0.8 下的检测门槛为 3.3–4.6 个百分点。只测特定模型与形状，不能称四位缓存无损。

## Support-and-limits

支持[四位内核与完整请求成本](../notes/kv-cache-optimization.md#four-bit-kernels-and-request-cost)。研究价值高，给原有字节/容量模型增加同硬件内核—整步—全请求证据；启发价值高，decode 变快仍可伴随总任务变慢。原结果可靠性中：原表可定位，但未独立运行；限单 H200、head 维度 128 和分组比不大于 8，不覆盖 MLA、多数滑窗、维度 64/256、真实 trace、共享前缀或 TP 性能。真实 KV 中小权重 FP16 下溢可能不被随机输入检查发现，质量结果与逐位等价及真实模型数值验证分开。下一次有固定 GPU、完整质量配置和同负载端到端原件时再核，不由内核倍数直接外推。
