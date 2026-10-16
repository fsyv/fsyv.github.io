---
title: "QBA：预测引导的 LLM 调度与配额老化"
date: 2026-10-15
draft: false
tags: [scheduling, inference, latency]
id: "6937e76e-d922-4761-8761-bff5559c3adc"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
math: true
---

## Identity

- 作者：Hanzhi Zhang、Anxuan Che、Hang Qi、Qiyue Li、Jingjin Wu。
- 标题：*Quota-Based Aging for Prediction-Guided Scheduling in LLM Serving*。
- 版本：[arXiv:2610.17795v1](https://arxiv.org/abs/2610.17795)，首次提交 2026-10-13T06:22:27Z；本轮题录只列 v1。2026-10-15 首次发现，属于窗口内新预印本、补前日遗漏，不是前日监测终点之后的新提交。
- 实际读取：2026-10-15 阅读 [v1 HTML](https://arxiv.org/html/2610.17795v1) §II-A/B/C、§III-A4–6/III-B、§IV-A–E 指定部分和 Table II。未核 PDF 页码、源码或原始轨迹，未复现实验。

## Evidence

以下为所读原文的事实摘要，不代表本库已经独立复证其系统效果。

- §III-A6：计数只在短请求 prefill 完整完成时推进，不计 chunk continuation；达到配额后保留 promotion debt，实际准入最老的合格 aged-long 才清除。准入仍受 token/KV 容量限制。
- §II-B2/III-B：M/G/n 用于解释均值趋势，是经验近似；尾部通过模拟器评价。这一层次不能直接当作 SLO 保证。
- §IV-E：100 个不重叠 Azure 轨迹窗口驱动模拟，保留请求顺序和相对到达结构，但时间归一至 $\lambda=32$，prompt/response 长度均乘 0.44。不能将此结果写成生产部署。
- Table II：下表单位为秒。Mean Wait 跨所有请求 pooled；四列 P99 均为先算各窗口 P99、再取 100 个值的中位数。§IV-A4 的合成主负载扫参各 100 seeds 是另一实验设置，不能与这 100 个窗口混为一项。

| 策略 | Mean Wait | 总体 P99 Wait | True-short P99 | True-long P99 | TTFT P99 |
| --- | --- | --- | --- | --- | --- |
| FCFS | 0.179 | 0.771 | 0.771 | 0.766 | 0.804 |
| PSF | 0.123 | 1.376 | 0.285 | 2.097 | 1.428 |
| AA | 0.178 | 0.949 | 0.970 | 0.491 | 0.975 |
| QBA | 0.146 | 0.951 | 0.565 | 1.446 | 0.998 |

## Support

**AI 候选解读：**QBA 相对 PSF 改善该口径下的长请求尾时延，但其 True-long P99 仍高于 FCFS 与 AA，不能概括为全面占优。事件配额也不能单独建立墙钟等待上界或无条件无饥饿保证。

扩展[平均时延、尾概率与 SLO](../notes/storage-latency-and-slo.md)的真实/预测类别、聚合口径与证据层次；[基础验证问题](../questions/foundations-validation.md)保留从归一模拟到原尺度部署的缺口。[存储与服务地图](../maps/storage-and-serving.md)将它放在服务评价之后阅读，不另建重复调度解释。

## Limits

读取为部分正文，未复证解析近似、预测器、实现与数据。表格支持指定设置下的取舍，不支持泛化到所有工作负载或把窗口分位数中位数解释为逐请求服务保证。真实类别与预测类别需分别评价，系统效果可靠性仍受未复现和预印本状态限制。
