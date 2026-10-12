---
title: "为什么确定最终落点还不够，还要决定路由与迁移？"
date: 2026-10-12
draft: false
tags: [storage, systems]
id: "0f29dc0b-54a1-4259-b1b8-286e3b7dcfe2"
kind: note
maturity: developing
endorsement: ai-candidate
---

**判断归属：AI 候选解释。** 以下框架用于读懂公开工作，未声称一种通用最优策略。

## Decisions

放置决定数据在哪些位置可用；读路由决定某次请求由哪份数据服务；迁移决定怎样把当前状态变成目标状态。三者相互影响，但回答不同问题。

[冷热对象论文摘要、第 1 节与第 3 节模型开头](../sources/paper-hot-cold-object-migration.md)将这三项写成同一成本问题：创建副本和保存副本收费，Get 有请求与传输成本，Put 需要传播更新，改变存储类或位置还需迁移。把对象放近访问者，可能减少读成本，却增加存储及写传播；访问转冷后，继续保留同样布局未必划算。

## Transition

最终布局合法，并不说明到达它的每一步都合法。例如把唯一仍可读的旧副本删掉，再等待新副本完成，会产生目标布局里看不到的不可用窗口。这个反例是 AI 构造；实际系统还需定义复制完成、版本一致与切换条件。

[CRANE 的摘要](../sources/paper-crane.md)直接研究这段过渡：在接受放置结果后，管理副本创建时间、网络拥塞和最低可用性。它支持将迁移作为有资源和服务约束的过程评估，而不是把数据移动视作瞬间完成。

## When-to-move

**AI 推论：**迁移有一次性开销，改变落点带来的收益要在随后一段时间积累。因此，“现在有热点”不足以单独决定迁移；热点持续时间、估计误差、复制期间竞争和再次反转都可能改变选择。这里没有给出经过验证的阈值公式。

冷热对象工作区分已知未来的离线方案与不预知负载的启发式。二者使用的信息不同，不能用离线最优代替在线可达性证明。[边缘云多目标工作摘要](../sources/paper-edge-cloud-multiobjective-replication.md)增加热点选择与一致性管理；[Harmonia](../sources/paper-harmonia.md)展示混合设备上的放置/迁移协调，但其设备级对象不能直接等同于分布式副本。

## Evaluation

评估至少分成最终布局、过渡期间和决策开销：分别检查服务成本、迁移时的资源竞争与服务目标，以及策略获得信息和执行动作的代价。收益必须连同工作负载持续时间、写入和失败情况报告。

[容量与负载约束论文](../sources/paper-capacity-load-data-placement.md)是最终布局模型的实例；[平均时延与 SLO](storage-latency-and-slo.md)解释服务指标为何不能互换。待补全文的问题见[迁移评估开放问题](../questions/storage-migration-evaluation.md)，全主题入口见[地图](../maps/storage-and-serving.md)。
