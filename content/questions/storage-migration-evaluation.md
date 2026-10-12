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

[CRANE 摘要](../sources/paper-crane.md)明确考虑迁移时间、拥塞和最低可用性。[冷热对象的模型部分](../sources/paper-hot-cold-object-migration.md)把存储、读写与迁移费用放在共同成本中。这些提供评价维度，尚未提供跨系统可直接复用的统一实验规程。

## Gaps

需要补读迁移次序与切换协议，明确写入期间的一致性、失败与重试如何计入；还缺少负载持续时间和预测误差对收益的敏感性证据。链路数据与[端到端 SLO](../notes/storage-latency-and-slo.md)之间的映射也需实际测量。

## Next

先在公开模型中固定故障、写传播和请求时限；用相同请求序列比较策略，分别报告迁移前、迁移中、迁移后的成本及违约。加入短暂热点和反复反转的对照，检查收益能否覆盖动作代价。这是建议的验证方向，尚未执行实验。

## Resolution

状态保持 open。完成后应先将测量口径与证据整合到放置/迁移笔记，再记录解决范围与仍不适用的条件。入口见[存储与服务地图](../maps/storage-and-serving.md)。
