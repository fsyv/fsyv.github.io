---
title: "Squall：分区内存数据库的细粒度在线重配置"
date: 2026-10-19
draft: false
tags: [storage, systems, papers]
id: "52d5150c-fd3e-41d9-a57b-fd3b4e9509c7"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
---

## Identity

- 作者：Aaron J. Elmore; Vaibhav Arora; Rebecca Taft; Andrew Pavlo; Divyakant Agrawal; Amr El Abbadi。
- 标题：Squall: Fine-Grained Live Reconfiguration for Partitioned Main Memory Databases。
- 版本：SIGMOD 2015，pp.299–313；DOI [10.1145/2723372.2723726](https://doi.org/10.1145/2723372.2723726)。[Crossref 登记](https://api.crossref.org/works/10.1145/2723372.2723726)的 online/print 日期均为 2015-05-27，会议为 05-31—06-04；2025 deposited 是登记更新，不作为论文修订。
- 实际读取：[作者公开 PDF](https://db.cs.cmu.edu/papers/2015/p299-elmore.pdf)。2026-10-19 发现旧资料，不是近期发表。

## Reading

Researcher 于 2026-10-19 读取 p.299 身份、pp.301–309 的 §2.3–7.6，重点 §3–6、§7.1–7.3、§7.5–7.6；未读 p.300、pp.310–313，没有视觉核验图表、代码审查或实验复现。网页工具读取超时后，经 Python 内存读取正文；ACM 入口 403。作者 H-Store 项目页所指代码入口只核到仓库根页，不能视为实现验证。

## Evidence

以下是指定正文的概括，机制解释与进一步推论见知识笔记。

- p.302 §3：同步新旧归属以初始化重配置，全分区完成后协调退出。
- p.304 §4.3–4.5：排队事务执行前复查路由；§4.4 的按需拉取独占锁住源、目标分区，阻塞访问这两个分区的事务；异步分块复制与事务交错。
- pp.305–306 §6：目标主节点等待副本 ack 后确认接收，主节点接管时重发待处理迁移消息。
- p.306 §6.2：重配置期暂停检查点并保留命令日志；恢复依赖一致快照及有序回放。
- pp.306–308 §7：同机架 RTT 约 0.35 ms、180 个闭环客户端；TPC-C 较大按需拉取仍可局部阻塞约 500–2000 ms。
- p.309 §7.5：放慢迁移可缓和吞吐下降，同时推迟后续重配置并延长不能生成新检查点的时段。

## Support

支持[在线迁移的执行链与完成条件](../notes/storage-placement-and-migration.md#live-reconfiguration)，并为[迁移评估问题](../questions/storage-migration-evaluation.md)提供具体协议实例；组织入口见[存储地图](../maps/storage-and-serving.md)。字节复制、归属变化与全局完成的区分，以及闭环负载比较要求，是据此形成的 AI 候选解释。

## Limits

live 不保证每个请求无停顿。副本确认和重发说明作者设计的恢复路径，不能单独证明任意执行下恰好一次语义。实验设置不支持跨数据中心逐请求 SLO；也不能将其实现与 CRANE 调度或冷热对象算法视为同一协议。旧可用性单位与计费疑点仍未解决。研究价值高、启发价值高；可靠性中，依据为原始指定正文，缺少实现与复现核验。
