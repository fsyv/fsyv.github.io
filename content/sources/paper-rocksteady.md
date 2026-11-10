---
title: "Rocksteady：早转归属、按需拉取与跨日志恢复"
date: 2026-10-26
draft: false
tags: [storage, papers]
id: "afde1706-8907-427f-81d0-fe21b3b78ca2"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
---

## Identity

- 作者：Chinmay Kulkarni、Aniraj Kesavan、Tian Zhang、Robert Ricci、Ryan Stutsman。
- 原题：*Rocksteady: Fast Migration for Low-latency In-memory Storage*，SOSP 2017；DOI [10.1145/3132747.3132784](https://doi.org/10.1145/3132747.3132784)。Crossref登记出版日2017-10-14，PDF会议标注2017-10-28，两字段不当新版本。
- 实际材料：[作者组原PDF](https://www.flux.utah.edu/download?uid=257)，16页，2026-10-26读取。近期发现旧资料。

## Reading

2026-10-26实际读文件第6–11页指定正文：§3主段、§3.1.1–3.1.3、§3.3–3.4、§4.1–4.2；辅助浏览§3.2和§4.3开头。视觉核文件第9页及第11页Figures9/10。当日没有通读16页、审代码、原始日志或复现。旧`/pubs/download`返回HTML、`/paper/download`返回Invalid unique id，根`/download`成功；ACM正文/PDF入口403。

## Evidence

§3在开始时转移tablet归属，源分区保持不可变，目标处理新写；尚未到达的读由目标发起异步PriorityPull，客户端随机等待数十微秒后重试。目标合并/去重请求，后台批拉、索引回放和重新复制分别推进，不能把归属切换当作完整迁移完成。

§3.4登记目标日志及偏移，使源恢复依赖目标日志尾部。作者设计在迁移中任一侧故障时把归属交回源，重放源日志与目标新写，全部side log提交后才移除依赖。该节末明确多日志恢复扩展仍在进行；这是设计证据，不是已完成实现或验证的恢复保证。

§4.1–4.2为24节点CloudLab、40GbE、8客户端机器，近开放YCSB-B，95%读/5%写、Zipf参数0.99，源dispatch约80%负载、迁半表。完整Rocksteady报告758MB/s，关闭PriorityPull为904MB/s，约提高19%；后者迁移期只有少量请求完成，一些须等后台搬到记录或迁移结束。图10部分曲线断缺不能解释为低延迟。作者预期客户端超时，但本轮未读到该对照的实测超时率；MB/s保留作者口径，未核源码字节定义。

## Limits

同机架实验不能外推跨数据中心SLO。§3.2实验DPDK驱动仍复制到发送缓冲，不能称实验全路径零拷贝。10-26未审版本/删除竞争及日志依赖实现；11-02指定函数静态读取推进了局部机制，仍未完成全交错、故障注入或原实验复现，不能由设计推出任意执行的恰好一次语义。也没有澄清冷热对象Algorithm2计费或多源迁移论文。

## Implementation-followup

2026-11-02新增作者公开实现：utah-scs/RAMCloud的rocksteady-sosp2017分支，固定提交[d1f9c8125cbd53e7bcb48a769b2a0cb74854900a](https://github.com/utah-scs/RAMCloud/commit/d1f9c8125cbd53e7bcb48a769b2a0cb74854900a)，提交时间2017-09-20T21:36:26Z。今日发现历史实现，未当作新发布或当代main。论文/项目同研究入口和该仓库分别计canonical；本轮只复既有论文记录/作者演示索引，新增深读是源码指定函数，未重读论文正文。

| 指定位置 | 读到的证据与限度 |
| --- | --- |
| [MigrationManager 141–149](https://github.com/utah-scs/RAMCloud/blob/d1f9c8125cbd53e7bcb48a769b2a0cb74854900a/src/RocksteadyMigrationManager.cc#L141)、[469–494](https://github.com/utah-scs/RAMCloud/blob/d1f9c8125cbd53e7bcb48a769b2a0cb74854900a/src/RocksteadyMigrationManager.cc#L469)、[704–744](https://github.com/utah-scs/RAMCloud/blob/d1f9c8125cbd53e7bcb48a769b2a0cb74854900a/src/RocksteadyMigrationManager.cc#L704) | 起计、后台pull/replay完成停计，随后转SIDELOG_COMMIT；buffer.size计后台重放输入，除1024²，priority路径不加该变量。不是唯一payload、实际接纳字节或恢复总时长 |
| [MigrationManager 993–1047](https://github.com/utah-scs/RAMCloud/blob/d1f9c8125cbd53e7bcb48a769b2a0cb74854900a/src/RocksteadyMigrationManager.cc#L993)、[MasterService 2520–2532](https://github.com/utah-scs/RAMCloud/blob/d1f9c8125cbd53e7bcb48a769b2a0cb74854900a/src/MasterService.cc#L2520) | 常规与priority side log均实际提交；991旧TODO不能解释为未commit |
| [MasterService 2457–2517](https://github.com/utah-scs/RAMCloud/blob/d1f9c8125cbd53e7bcb48a769b2a0cb74854900a/src/MasterService.cc#L2457)、[MigrationManager 358–389](https://github.com/utah-scs/RAMCloud/blob/d1f9c8125cbd53e7bcb48a769b2a0cb74854900a/src/RocksteadyMigrationManager.cc#L358) | 锁源/等APPEND/返回safeVersion；目标迁移态/归属/raiseSafeVersion，不由名称推全版本保证 |
| [ObjectManager 1343–1425](https://github.com/utah-scs/RAMCloud/blob/d1f9c8125cbd53e7bcb48a769b2a0cb74854900a/src/ObjectManager.cc#L1343)、[566–581](https://github.com/utah-scs/RAMCloud/blob/d1f9c8125cbd53e7bcb48a769b2a0cb74854900a/src/ObjectManager.cc#L566)、[MasterService 1925–1981](https://github.com/utah-scs/RAMCloud/blob/d1f9c8125cbd53e7bcb48a769b2a0cb74854900a/src/MasterService.cc#L1925) | 写允许迁移态，删除只NORMAL，迁移态UNKNOWN_TABLET；不是所有CRUD同路径 |
| [RamCloud.h 975](https://github.com/utah-scs/RAMCloud/blob/d1f9c8125cbd53e7bcb48a769b2a0cb74854900a/src/RamCloud.h#L975)、[LinearizableObjectRpcWrapper.h 33](https://github.com/utah-scs/RAMCloud/blob/d1f9c8125cbd53e7bcb48a769b2a0cb74854900a/src/LinearizableObjectRpcWrapper.h#L33)、[ObjectRpcWrapper 87–108](https://github.com/utah-scs/RAMCloud/blob/d1f9c8125cbd53e7bcb48a769b2a0cb74854900a/src/ObjectRpcWrapper.cc#L87) | 删除上层继承路径最终对UNKNOWN_TABLET刷新映射/重发，不可仅据目标拒绝判最终失败或丢数据 |
| [ObjectManager 717–756](https://github.com/utah-scs/RAMCloud/blob/d1f9c8125cbd53e7bcb48a769b2a0cb74854900a/src/ObjectManager.cc#L717)、[832–856](https://github.com/utah-scs/RAMCloud/blob/d1f9c8125cbd53e7bcb48a769b2a0cb74854900a/src/ObjectManager.cc#L832)、[905–1028](https://github.com/utah-scs/RAMCloud/blob/d1f9c8125cbd53e7bcb48a769b2a0cb74854900a/src/ObjectManager.cc#L905) | incoming≤current时舍弃旧对象；另有tombstone重放，未验证所有竞争交错 |
| [MigrationManager 57–91](https://github.com/utah-scs/RAMCloud/blob/d1f9c8125cbd53e7bcb48a769b2a0cb74854900a/src/RocksteadyMigrationManager.cc#L57)、[ObjectManager 2671–2691](https://github.com/utah-scs/RAMCloud/blob/d1f9c8125cbd53e7bcb48a769b2a0cb74854900a/src/ObjectManager.cc#L2671) | TombstoneProtector与remover停/启，不能概括为删除记录无保护 |
| [SegmentManager.h 376–414](https://github.com/utah-scs/RAMCloud/blob/d1f9c8125cbd53e7bcb48a769b2a0cb74854900a/src/SegmentManager.h#L376)、[SegmentManager.cc 688–705](https://github.com/utah-scs/RAMCloud/blob/d1f9c8125cbd53e7bcb48a769b2a0cb74854900a/src/SegmentManager.cc#L688)、[1202–1203](https://github.com/utah-scs/RAMCloud/blob/d1f9c8125cbd53e7bcb48a769b2a0cb74854900a/src/SegmentManager.cc#L1202)、[ObjectManager 3475–3483](https://github.com/utah-scs/RAMCloud/blob/d1f9c8125cbd53e7bcb48a769b2a0cb74854900a/src/ObjectManager.cc#L3475) | safeVersion可落后已有版本，getter/raise路径未单独证未搬旧键新写必胜；也未构造已执行错误反例 |
| [CoordinatorService 624–654](https://github.com/utah-scs/RAMCloud/blob/d1f9c8125cbd53e7bcb48a769b2a0cb74854900a/src/CoordinatorService.cc#L624)、[TableManager 643–694](https://github.com/utah-scs/RAMCloud/blob/d1f9c8125cbd53e7bcb48a769b2a0cb74854900a/src/TableManager.cc#L643) | 归属更新及持久化实际存在，不能称协调器不持久化 |
| [MigrationManager 965–1074](https://github.com/utah-scs/RAMCloud/blob/d1f9c8125cbd53e7bcb48a769b2a0cb74854900a/src/RocksteadyMigrationManager.cc#L965)、[MasterService 2123–2170](https://github.com/utah-scs/RAMCloud/blob/d1f9c8125cbd53e7bcb48a769b2a0cb74854900a/src/MasterService.cc#L2123) | 提交阶段发起源tablet删除/orphan清理；teardown的drop-dependency RPC为TODO后转COMPLETED。只定位这条路径，不证明全仓库无恢复依赖实现 |

作者Utah项目web超时/证书不匹配，未绕TLS；演示slides取到但未提取正文，只以搜索索引指路。没有编译、运行、故障注入、原始日志或论文图复算。局部代码事实可靠性高，端到端保证与原数值映射仍不足。新理解整合至[实现与完成口径](../notes/storage-placement-and-migration.md#implementation-and-completion)。

## Version-order

2026-11-09 在相同历史提交 d1f9c8125cbd53e7bcb48a769b2a0cb74854900a 增读普通写、分配器、归属和后台回放的指定函数。此处记录源码控制流，版本 8 与 2 的同键时序是[候选笔记](../notes/storage-placement-and-migration.md#version-order-during-handoff)的静态推演。没有执行代码或确认论文二进制使用该提交。

| 读取位置 | 支持的局部结论 |
| --- | --- |
| [SegmentManager.cc 76–86](https://github.com/utah-scs/RAMCloud/blob/d1f9c8125cbd53e7bcb48a769b2a0cb74854900a/src/SegmentManager.cc#L76-L86)、[688–705](https://github.com/utah-scs/RAMCloud/blob/d1f9c8125cbd53e7bcb48a769b2a0cb74854900a/src/SegmentManager.cc#L688-L705)、[SegmentManager.h 394–414](https://github.com/utah-scs/RAMCloud/blob/d1f9c8125cbd53e7bcb48a769b2a0cb74854900a/src/SegmentManager.h#L394-L414)、[ObjectManager.cc 1343–1487](https://github.com/utah-scs/RAMCloud/blob/d1f9c8125cbd53e7bcb48a769b2a0cb74854900a/src/ObjectManager.cc#L1343-L1487) | 分配器从 1 开始。覆盖已有对象时取对象版本加一，本地未命中时分配下一版本。覆盖时替换索引，分配下界不随该分支增长。 |
| [MasterService.cc 2485–2506](https://github.com/utah-scs/RAMCloud/blob/d1f9c8125cbd53e7bcb48a769b2a0cb74854900a/src/MasterService.cc#L2485-L2506)、[RocksteadyMigrationManager.cc 326–389](https://github.com/utah-scs/RAMCloud/blob/d1f9c8125cbd53e7bcb48a769b2a0cb74854900a/src/RocksteadyMigrationManager.cc#L326-L389)、[迁移选项 16–42](https://github.com/utah-scs/RAMCloud/blob/d1f9c8125cbd53e7bcb48a769b2a0cb74854900a/src/RocksteadyMigrationManager.h#L16-L42) | 源锁定并等待追加后返回分配下界。目标抬升下界并进入迁移状态，采用早归属且开启后台回放时先确认归属再推进搬运。 |
| [CoordinatorService.cc 624–642](https://github.com/utah-scs/RAMCloud/blob/d1f9c8125cbd53e7bcb48a769b2a0cb74854900a/src/CoordinatorService.cc#L624-L642)、[TableManager.cc 670–692](https://github.com/utah-scs/RAMCloud/blob/d1f9c8125cbd53e7bcb48a769b2a0cb74854900a/src/TableManager.cc#L670-L692) | 核对协调器归属变更的实际路径。 |
| [RamCloud.cc 2947–2974](https://github.com/utah-scs/RAMCloud/blob/d1f9c8125cbd53e7bcb48a769b2a0cb74854900a/src/RamCloud.cc#L2947-L2974)、[MasterService.cc 3602–3662](https://github.com/utah-scs/RAMCloud/blob/d1f9c8125cbd53e7bcb48a769b2a0cb74854900a/src/MasterService.cc#L3602-L3662)、[Log.cc 154–210](https://github.com/utah-scs/RAMCloud/blob/d1f9c8125cbd53e7bcb48a769b2a0cb74854900a/src/Log.cc#L154-L210) | 普通无拒绝条件的写允许在目标迁移态执行，仅查本地对象。成功分支同步后返回。 |
| [ObjectManager.cc 3523–3549、3583–3594](https://github.com/utah-scs/RAMCloud/blob/d1f9c8125cbd53e7bcb48a769b2a0cb74854900a/src/ObjectManager.cc#L3523-L3594)、[回放 797–804、832–895](https://github.com/utah-scs/RAMCloud/blob/d1f9c8125cbd53e7bcb48a769b2a0cb74854900a/src/ObjectManager.cc#L797-L895)、[AbstractLog.cc 190–205](https://github.com/utah-scs/RAMCloud/blob/d1f9c8125cbd53e7bcb48a769b2a0cb74854900a/src/AbstractLog.cc#L190-L205) | 后台拉取从源当前索引取仍存活的对象，历史覆盖墓碑未入该批。高版本对象在回放时替换索引，旧索引对象的释放不构成另一次版本比较。 |

## Support

支持[迁移解释](../notes/storage-placement-and-migration.md#early-ownership-and-recovery)对归属、数据可读、重新复制及恢复依赖的区分；[迁移评价](../questions/storage-migration-evaluation.md)继续保留实现与服务测量缺口。
