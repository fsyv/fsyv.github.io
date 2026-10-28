---
title: "EdgePace：共享内存平台的截止时间与结果新鲜度调度"
date: 2026-10-29
draft: false
tags: [scheduling, systems, llm-inference]
id: "44907a03-c31f-4b0e-a6b8-6a03ed2cab22"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
---

## Identity

Teng Mei、Chengxuan Pei、Weijun Wang、Jie Wu、Marco Canini、Yunming Xiao，*EdgePace: Deadline- and Freshness-Aware LLM Scheduling on Unified-Memory Platforms*，2026。[arXiv:2610.37307v1](https://arxiv.org/abs/2610.37307v1) · [指定版本 HTML](https://arxiv.org/html/2610.37307v1)。首次提交2026-10-27T14:26:16Z，2026-10-29纳入本库；属于窗口内补遗漏，不是上次核查后新发表。

本轮Domain Monitor实际读取HTML §2.1–2.4、§3.1–3.3/Algorithm1、§4.1–4.4、Tables1–3及Appendix A/C指定表，未读PDF像素图、源码或复现；不是全文阅读或独立测量。

## Evidence

- §2–3：共享内存平台的前景任务和后台推理会竞争资源。Fine Plan在安全子层边界暂停；Hold停止新提交，不撤销已在GPU排队的工作，后者仍须排空。输出freshness从源观测开始计到交付；它与前景deadline分别约束不同对象。新鲜度预算紧急时，高风险下仍可转Admit，不能把策略写成无条件保护前景。
- §4/Tables1–3：论文Orin Nano Super平台上四路1080p/30Hz前景负载，后台Qwen2.5-1.5B、246输入token及最多16输出token；Unmanaged的前景deadline miss为18.33%、后台吞吐8.175 token/s，EdgePace分别为7.667%、5.848 token/s。该吞吐按生成token数除以请求到达至完成的时间，包含调度等待，不是纯decode算子速率。
- §4.2 Table3与Appendix A Table6：Nano总体P99排空4.176ms，Admit到下一子图提交的P99为2.689ms（不含随后GPU排队）；局部决策平均1.856μs（不含PMU采集）。Appendix A Table6的Admit到提交All行含542样本。分位数、均值、决策与生效路径不同，不能用最后一个数替代前两个延迟。

## Support-and-limits

支持[服务目标解释的新增分支](../notes/storage-latency-and-slo.md#freshness-and-actuation)：观测年龄、前景违约与后台吞吐分开测量，控制动作还需计入实际排空和恢复。

profile中的最大观测时长并不是最坏执行时间证明；本轮未验证未见负载的上界、数值新鲜度窗口、代码或同负载复现。机器人展示中LLM输出没有改变控制动作，因此不能由该案例推出闭环控制质量提高。上述数字是指定负载及Unmanaged对照下的作者实测，不是所有平台或硬实时保证。研究价值高、启发价值高、可靠性中。
