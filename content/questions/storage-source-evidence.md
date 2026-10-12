---
title: "哪些存储与推理论文仍需补读，才能支持具体机制和数值？"
date: 2026-10-12
draft: false
tags: [storage, systems]
id: "d6b61153-b16b-4d3b-a691-56a783c6da11"
kind: question
maturity: developing
endorsement: ai-candidate
status: open
---

## Question

**AI 建议的证据补全问题。** 已核实文献身份与实际读取范围，但题录不能支持算法细节，摘要也不能替代假设、证明与实验。此问题尚未解决。

## Known

[主题地图](../maps/storage-and-serving.md)已用实际读到的摘要与部分正文组织三条解释链。来源页逐篇列作者、年份、版本、读取位置和局限；预印本不自动等于正式录用版本。

## Metadata-only

以下文献目前只核对题录，尚未读到一手摘要或正文。获取原文前，不用它们支持具体公式、方法或性能比较。

| 文献 | 需要确认的内容 |
| --- | --- |
| [广域副本与片段放置](../sources/paper-generalized-replica-placement.md) | 时延模型、恢复条件与算法 |
| [多源迁移](../sources/paper-multi-source-replica-migration.md) | 成本、传输源与时序约束 |
| [主动时空预测](../sources/paper-proactive-replica-placement.md) | 预测模型、决策算法与误差 |
| [RLRP](../sources/paper-rlrp.md) | 状态、动作、学习机制与评估 |
| [云边端副本](../sources/paper-cloud-edge-terminal-replication.md) | 跨层约束与故障模型 |
| [早期云存储放置](../sources/paper-cloud-storage-replica-placement.md) | 通信成本、排序与仿真 |
| [RPCE](../sources/paper-rpce.md) | 管理分层和时间尺度 |
| [KV RTT/带宽](../sources/paper-kv-transfer-rtt-bandwidth.md) | 实现、传输粒度和适用 RTT |
| [OASIS](../sources/paper-oasis.md) | 压缩表示、精度与 CXL 设置 |
| [Laser](../sources/paper-laser.md) | 层调度、SLO 与基线 |

## Other-gaps

- [复制策略综述](../sources/paper-replication-placement-survey.md)仅读摘要，需检查比较标准后才能讨论作者的算法路线优劣判断。
- [KV 卸载](../sources/paper-kv-offloading-bottlenecks.md)摘要页提交日期与编号月份不一致；需核对作者 PDF 和登记记录。阈值推导仍未读。
- [Nuska](../sources/paper-stage-aware-communication.md)摘要页简述作者人数与明确列举不一致；应以当前 PDF 作者表进一步核对。
- [ARO](../sources/paper-aro.md)网页在线日期早于接受日期，且公式提取缺失；需核对正式 PDF、版本记录和可复现材料，现阶段不作为性能结论的证据。
- [Harmonia](../sources/paper-harmonia.md)与 Nuska 已有修订版；比较结果必须绑定版本，不混用不同题名下的数字。

## Next

优先取得与三篇知识解释直接相关的模型与证明，再补可复现设置、代码、数据和对照。新读取必须更新对应来源的范围；发现矛盾先记录候选修订。补齐证据后先整合知识笔记，再关闭本问题。
