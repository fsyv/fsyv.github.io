---
title: "CertiSum：固定量化对象与精确归约的跨布局一致性"
date: 2026-11-18
draft: false
tags: [numerical-analysis, training, reproducibility]
id: "3a006b17-5b7a-4211-aa62-218393c244cc"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
math: true
---

## Identity

Steve Rhyner、Yubo Gao、Stefan de Lasa、Sankeerth Durvasula、Nandita Vijaykumar，*CertiSum: Bitwise-Identical MXFP4 Training Across Platforms and Parallelism Layouts*，2026。[arXiv:2611.21584v1](https://arxiv.org/abs/2611.21584v1)，首次提交 2026-11-16T18:54:07Z，11-17 公告。[固定 HTML](https://arxiv.org/html/2611.21584v1)。

## Read-scope

2026-11-18 研究通道实际读 §§2.1、3–6、附录 B.1–B.4 指定段、C.1–C.3、E 表 5、F 表 6。未通读参考文献、审作者程序、复现 GPU 或核原始日志。

## Evidence

- §§3.1–3.3 与 B.1：全张量分组、32 元素分区对齐、共同二幂整数表示、绝对和证书与逐平台精确累加契约。证书失败转精确路径，不是原生结果错误判定。
- §3.4 与 B.3–B.4：跨设备精确中间值、注意力分子/分母及其他数值语义；$2^{24}+1$ 与 $-2^{24}$ 的部分和例显示提前舍入可丢掉最终的 1。
- §§5.2–5.5、C.3：Qwen3-8B-Base、两语料、200 步；跨平台 TP4 未拆同一归约，MI350X 的 1 GPU→DP4→CP2→TP4→DP2 才改变布局。逐步轨迹、指纹和最终状态分别核对。
- §5 与 E：三种 8B–14B、大输入相对非精确 twin 多 11.8%–60.5% 时延；六个小输入 TP 相对 BF16 为 1.05–1.36 倍。每次计时 30 步，前三步热身，保留零起算步骤 3–29；每步取最慢 GPU，再对重复运行取中位数。大输入重复数为 CertiSum 7–8、twin 8、各 BF16 3。不同初始化、语料和实现条件使 BF16/torchtitan 不能当相同训练轨迹的纯性能消融。

## Support-and-limits

支持[归约树变化后的逐位一致](../notes/certified-summation-and-layout-invariance.md)。研究价值高，提供可检查的执行契约；启发价值高，归约树变化不必然改变结果。可靠性中：论证与有限实验可定位，平台内核契约及完整实现未独立验证。表 6 修复比例另有分母，本轮不将它当整步精确计算占比。
