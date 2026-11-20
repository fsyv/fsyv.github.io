---
title: "StepSplit：为共享推理步骤和前缀块分配 GPU 能量"
date: 2026-11-16
draft: false
tags: [inference, energy, batching]
id: "b64700c0-8068-410c-909a-0b67d6356095"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
---

## Identity

- Qi Luo、Ziwen Wang、Kunlin Li、Changxi Liu、Yun Chen，*Scaling Shapley Energy Attribution to Large LLM Batches*。arXiv:2611.13802v1，2026-11-10T09:34:38Z 首次提交，11-11 公告，11-16 补查上次遗漏。[题录](https://arxiv.org/abs/2611.13802v1) [正文](https://arxiv.org/html/2611.13802v1)
- 2026-11-16 读取 §§2.1–2.3、4.1、5.1–5.4（Propositions 5.1–5.2、Fig. 8）、6.1–6.2、6.6–6.8（含 Table 5）及 §7 的相关段落。主控另核 §§5.1、5.3、6.7–7 的使用段落。

## Summary

作者比较两个问题。第一个是在已记录调度里，分配某个请求独自计算的工作和多个请求共同占用的步骤。第二个是删除某些请求会怎样改变其他请求的调度。前者的闭式精确性建立在固定步骤的模型；后者在连续批处理里需要模拟子集真正会经历的事件。

## Evidence

- §§2.2–2.3、6.1 的子集参照重跑保留请求的观测输出长度。GPU 忙时能量包含工作时的底功耗，排除无工作间隔和指定主机停顿。§5.1 式 4–5 给出固定日志的成本函数和分摊。Fig. 8 中滤掉完整日志中 A 仍得到 B、C 共享 3/9 步，重放二者的子集得到 0/12 步。§5.4 的无偏修正以重放模型的 Shapley 值为目标。
- §6.7、Table 5 在单张 H100 的 Qwen2.5-7B 上比较静态和连续批处理。两组 Mooncake、一组共同 1024-token 系统提示和一组嵌套提示各含 8 个请求。每次运行前清空缓存，每组共 255 个非空子集。按每项归属误差绝对值之和除以整组 GPU 忙时能量，八行 StepSplit 的值为 0.002–0.011，首计算者承担为 0.020–0.132，重复测量的参考差为 0.003–0.008。报告的 5%–25% 节能是缓存对总能量的影响，分配方法比较测量的是归属误差。
- §7 提议可将窗口开始已有的缓存或在场请求固定为反事实背景，归属新请求带来的增量。

## Support

[逐请求能量归属](../notes/storage-latency-and-slo.md#request-energy-attribution)使用该来源说明共享成本的模型等分与调度重放分别解决什么问题，并与[单位最终输出能量](../notes/storage-latency-and-slo.md#accepted-tokens-and-energy)的总量比较相衔接。

## Limits

未检查实现、原始 GPU 日志或跨窗口账单。Table 5 的冷启动及固定输出长度对照不能直接移作线上热缓存、任意驱逐和全机能量的估计。不同用户或业务窗口作为参与主体时，需重定成本函数。该研究也没有核定另一项投机解码研究的预填计量边界。
