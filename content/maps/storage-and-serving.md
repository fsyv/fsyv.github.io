---
title: "存储与推理服务：放置、迁移与服务目标"
date: 2026-10-12
draft: false
tags: [storage, systems]
id: "ba99ecc2-b590-4773-acc9-c1de4848d42c"
kind: map
maturity: developing
endorsement: ai-candidate
---

## Overview

数据放在哪里、请求从哪里读、何时值得搬动，决定成本、可用性和时延。本图将故障结构、正常服务与重配置过程连起来；同时区分分布式副本、单机混合介质和 LLM 缓存这些不同对象。组织方式为 AI 候选。

## Prerequisites

先掌握副本提供替代副本这一基本目的，并区分永久数据丢失与暂时不可读。进入 LLM 分支前阅读[KV 为什么可复用](../notes/kv-cache-mechanism.md)与[缓存优化的不同成本](../notes/kv-cache-optimization.md)，避免把容量增加直接理解成访存更快。

## Reading

1. [为什么相同副本数仍有不同风险](../notes/storage-replica-reliability.md)：先看共同故障和修复窗口，理解可行落点为何受结构约束。
2. [为什么还要决定路由与迁移](../notes/storage-placement-and-migration.md)：在可行布局之间加入读写成本与到达过程，区分静态结果和动态执行。
3. [平均时延、尾概率与 SLO](../notes/storage-latency-and-slo.md)：最后明确优化的服务指标与测量边界，防止不同论文的“更快”被直接合并。

## Sources

阅读范围是本次记录，不能由“经典”或发表场所替代。完整作者与版本见各来源页。

| 分支 | 来源与用途 | 本次范围 |
| --- | --- | --- |
| 可靠性基础 | [副本放置、修复速度与可靠性](../sources/paper-replica-placement-reliability.md)：修复速度与组合风险；[分层故障域中的副本放置](../sources/paper-hierarchical-failure-domains.md)：树形共同故障；[Kinesis：结构与在线选择相结合的放置](../sources/paper-kinesis.md)：隔离结构与选择自由 | A01 第 1—3 节及第 4 节比较机制；其余摘要 |
| 资源利用 | [SRS：同时考虑机架与存储利用率的放置](../sources/paper-storage-rack-sensitive-placement.md)：机架与节点容量一起参与启发式 | 作者 PDF 主要章节，未逐格核表 |
| 放置目标 | [纠删码存储的平均时延与成本联合优化](../sources/paper-erasure-coded-latency-cost.md)：平均时延/成本；[纠删码存储中的尾时延优化](../sources/paper-erasure-coded-tail-latency.md)：尾概率；[容量与负载约束下的地理数据放置](../sources/paper-capacity-load-data-placement.md)：容量、负载与传输成本 | 摘要 |
| 迁移与动态管理 | [CRANE：副本迁移过程的调度](../sources/paper-crane.md)：过渡过程；[冷热对象的复制、读路由与迁移](../sources/paper-hot-cold-object-migration.md)：冷热、路由和成本；[边缘云 SaaS 的多目标副本放置与迁移](../sources/paper-edge-cloud-multiobjective-replication.md)：多目标与热点；[边缘节点的动态去中心化副本策略](../sources/paper-decentralized-edge-replication.md)：去中心化创建/删除 | B12 模型部分；其余摘要 |
| 混合设备 | [Harmonia：混合存储中的放置与迁移协调](../sources/paper-harmonia.md)：设备上的放置/迁移协调 | v4 摘要，不能直接替代副本模型 |
| KV 访问 | [KV 卸载中的互连瓶颈](../sources/paper-kv-offloading-bottlenecks.md)：CPU 卸载互连；[异步预取 KV：用计算覆盖访存等待](../sources/paper-asynchronous-kv-prefetching.md)：L2 预取；[Kelle：KV 缓存与 eDRAM 协同设计](../sources/paper-kelle.md)：eDRAM 维护 | 摘要，属不同硬件层次 |
| 服务编排 | [Nuska：分离推理的阶段感知通信调度](../sources/paper-stage-aware-communication.md)：依赖阶段和 TTFT；[OServe：随工作负载改变模型部署](../sources/paper-oserve.md)：负载构成改变部署；[WWW.Serve：去中心化 LLM 服务互联](../sources/paper-www-serve.md)：自主参与和请求分发 | 当前版本摘要 |
| 调度目标扩展 | [GCOS：结合模型与数据复用的绿色调度](../sources/paper-gcos.md)：缓存复用、成本与碳排放；[ARO：遥测驱动的异构集群编排](../sources/paper-aro.md)：遥测与异构资源 | S03 摘要；S04 网页部分且存在证据缺口 |
| 方法分类 | [数据复制与放置策略综述](../sources/paper-replication-placement-survey.md)：动态、元启发式、多准则与学习路线 | 仅摘要，不能据此排名 |
| 待补原文 | [十篇已核题录的文献](../questions/storage-source-evidence.md#metadata-only)：广域片段、多源迁移、预测、RLRP、云边端、早期放置、RPCE、RTT、OASIS、Laser | 题录；不承担机制和数值结论 |

## Connections

放置与缓存都在有限资源下选择数据，但语义不同：可重新取得的缓存可以淘汰，承担持久性的副本还需满足恢复与一致性条件。[协同缓存的学习目标](../notes/cooperative-caching-and-learning.md)帮助理解命中与路由的耦合；其中的价值分解条件不能直接推广到副本迁移。

GPU 内预取、跨 PCIe 卸载和跨中心搬运都涉及数据移动，属于潜在结构相似；它们的可重叠计算、失败语义与可用带宽不同，须分别核验。

## Questions

[来源证据补全](../questions/storage-source-evidence.md)决定哪些机制还不能进入解释；[迁移收益如何计入过渡代价](../questions/storage-migration-evaluation.md)决定怎样比较动态策略。当前范围支持基本分析路径，不支持把不同论文拼成统一最优算法。

[返回主题地图](../maps/_index.md)。
