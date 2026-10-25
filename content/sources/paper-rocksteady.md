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

实际读文件第6–11页指定正文：§3主段、§3.1.1–3.1.3、§3.3–3.4、§4.1–4.2；辅助浏览§3.2和§4.3开头。视觉核文件第9页及第11页Figures9/10。没有通读16页、审代码、原始日志或复现。旧`/pubs/download`返回HTML、`/paper/download`返回Invalid unique id，根`/download`成功；ACM正文/PDF入口403。

## Evidence

§3在开始时转移tablet归属，源分区保持不可变，目标处理新写；尚未到达的读由目标发起异步PriorityPull，客户端随机等待数十微秒后重试。目标合并/去重请求，后台批拉、索引回放和重新复制分别推进，不能把归属切换当作完整迁移完成。

§3.4登记目标日志及偏移，使源恢复依赖目标日志尾部。作者设计在迁移中任一侧故障时把归属交回源，重放源日志与目标新写，全部side log提交后才移除依赖。该节末明确多日志恢复扩展仍在进行；这是设计证据，不是已完成实现或验证的恢复保证。

§4.1–4.2为24节点CloudLab、40GbE、8客户端机器，近开放YCSB-B，95%读/5%写、Zipf参数0.99，源dispatch约80%负载、迁半表。完整Rocksteady报告758MB/s，关闭PriorityPull为904MB/s，约提高19%；后者迁移期只有少量请求完成，一些须等后台搬到记录或迁移结束。图10部分曲线断缺不能解释为低延迟。作者预期客户端超时，但本轮未读到该对照的实测超时率；MB/s保留作者口径，未核源码字节定义。

## Limits

同机架实验不能外推跨数据中心SLO。§3.2实验DPDK驱动仍复制到发送缓冲，不能称实验全路径零拷贝。未核版本/删除竞争、日志依赖持久化和故障注入，不能由设计推出任意执行的恰好一次语义；也没有澄清冷热对象Algorithm2计费或多源迁移论文。

## Support

支持[迁移解释](../notes/storage-placement-and-migration.md#early-ownership-and-recovery)对归属、数据可读、重新复制及恢复依赖的区分；[迁移评价](../questions/storage-migration-evaluation.md)继续保留实现与服务测量缺口。
