---
title: "工具调度、准入解耦与 Agent 固定批次结束时间"
date: 2026-11-16
draft: false
tags: [inference, scheduling, agents]
id: "45c1ff56-93d5-4cdd-be0a-d06915d047bb"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
---

## Identity

- Wei Feng、Meiling Chen、Boxiao Chen、Lu Liu、Bin Zi、Libin Ye、Xingyu Lu、Lei Xu、Jun Zhou，*Reducing Batch Makespan for LLM Agent Workloads through Inference–Environment Coordination*。arXiv:2611.16661v1，2026-11-12T11:38:21Z 首次提交，列入 11-13 公告，对应 11-12 美东恢复公告批次。[题录](https://arxiv.org/abs/2611.16661v1) [正文](https://arxiv.org/html/2611.16661v1)
- 2026-11-16 读取 §§4.1–4.2 的式 10–16、§5.1、§5.3 的 Figs. 11–12、§5.4 的 Tables 2–3、附录 A.2–A.3 的 Tables A2–A3 及相关设定。主控复核了重放、真实执行及末段指标的对应证据。

## Summary

允许更多在场样本与允许更多外部工具同时执行是两个控制动作。论文先固定工具并发，再扩大在场样本数，使一些样本等待时其他样本还能推理。另一个对照固定两种容量，只比较工具调度顺序。CAAS 在较早到达的时间带内优先已经历更多轮推理的轨迹，用既往进展推测应尽早推进的长链。

## Evidence

- §§4.1–4.2、附录 A.2 给出样本占槽与工具并发的限制。CAAS 不抢占进行中的工具调用。派发按较早 30 秒到达带，再按已完成推理轮数，随后按平均推理时长的 1 秒桶及到达先后处理同序情况。
- §§5.1、5.3、Figs. 11–12 比较 495 条成功历史 MCP-Atlas 轨迹。两 TP4 工作者实际执行推理，重放保留历史输出长度、工具耗时、响应及依赖。固定工具并发 3 或 5，统一限制改为在场样本上限 10 时，两者批总时长约降三分之一。固定样本上限 50 并只改派发后，CAAS 相对先到先服务的总时长分别降低 1.9%、3.5%，末 5% 区间分别降低 19.0%、21.4%。达到 95% 的时刻推后，最后的终止时刻提前。
- §5.4 Table 3、附录 A.3 Table A2 归纳真实外部工具执行，每模型配置三次、每次 500 任务，计入重试和失败的最终终止。以 Ling-3.1-Flash 为例，统一准入基线、优化后先到先服务、优化后 CAAS 的批总时长依次为 333.5、140.5、128.5 分钟，末 5% 区间依次为 26.1、49.8、35.3 分钟。后两组在场上限 50 且工具上限 3，只改派发。基线到任一优化组还包含推理配置及准入的更改。

## Support

[工具并发与批次收尾](../notes/storage-latency-and-slo.md#batch-completion-and-environment)借此解释任务终止时刻、剩余区间和尾部样本人群的关系。[完整会话验收](../notes/session-cache-pressure-and-metastability.md#client-gate-and-session-completion)提供另外一种成功口径，适用于按会话记录轮次完成和截止取消的研究。

## Limits

未查看原始轨迹或运行论文系统。重放只使用历史成功轨迹且锁定工具响应与耗时。真实运行的模型路径可能不同，三次平均和任务得分只给出指定条件下的比较。结果没有度量开放到达服务的稳定性、已知剩余时长下的最优性或评分等价性。
