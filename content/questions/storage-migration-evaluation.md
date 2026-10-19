---
title: "怎样比较迁移收益，并计入过渡期的服务代价？"
date: 2026-10-12
draft: false
tags: [storage, systems]
id: "3e05ac47-c0c2-4a68-9910-421b37b77760"
kind: question
maturity: developing
endorsement: ai-candidate
status: open
---

## Question

**AI 建议的开放问题。** 当工作负载变化时，怎样比较“不搬、立即搬、分阶段搬”的长期收益，同时计入复制期间的带宽竞争、服务违约与决策开销？目前没有足够原文与实验支持一个通用答案。

## Motivation

[放置与迁移的区别](../notes/storage-placement-and-migration.md)说明最终落点与到达过程是不同问题。若只测迁移完成后的状态，可能漏掉过渡期间的大部分代价；只测复制速度又可能遗漏收益是否持续。

## Known

[CRANE §IV–VI](../sources/paper-crane.md)明确复制完成、迁移序列结束后的布局更新和请求重定向；[冷热对象 §3.2–5.1 / §6.2](../sources/paper-hot-cold-object-migration.md)补充费用、stop-and-copy 与桶传输测量。[已有知识的条件回本模型](../notes/storage-placement-and-migration.md#when-to-move)是独立 AI 推导，将费用回本与协议/服务可行性分开；尚未提供跨系统统一规程或逐请求 SLO 证明。

2026-10-19 增读 [Squall §3–7 指定部分](../sources/paper-squall.md)，已将路由复查、按需拉取、副本确认、全分区退出和恢复约束整合至[在线重配置解释](../notes/storage-placement-and-migration.md#live-reconfiguration)。这推进了具体协议与完成口径；没有验证其代码、任意执行的恰好一次语义或跨数据中心服务保证。

## Gaps

仍需核验写入版本追赶、切换原子性、一致性、失败与重试如何计入；CRANE 可用性单位与冷热 Algorithm 2 计费口径也待澄清。还缺少负载持续时间和预测误差对收益的敏感性证据。链路数据与[端到端 SLO](../notes/storage-latency-and-slo.md)之间的映射也需实际测量。

## Next

2026-10-19 已回访，下次 2026-10-26。本轮取得 Squall 协议正文，但对冷热 Algorithm 2 的限定检索仍未取得可读实现或作者澄清，不重复推介同一未解计费命题。后续先在公开模型中固定故障、写传播和请求时限；用相同外生请求序列比较策略，并区分闭环负载，记录超时、失败、重试及未完成请求。分别报告迁移前、中、后的成本与违约，加入短暂热点和反转对照。这是待执行验证方向。

## Resolution

状态保持 open。完成后应先将测量口径与证据整合到放置/迁移笔记，再记录解决范围与仍不适用的条件。入口见[存储与服务地图](../maps/storage-and-serving.md)。
