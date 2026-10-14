---
title: "冷热对象的复制、读路由与迁移"
date: 2026-10-12
draft: false
tags: [storage, papers]
id: "1ea84350-cf49-5f10-a292-45bc477700cb"
kind: source
maturity: developing
endorsement: ai-candidate
read_status: partial
math: true
---

## Identity

- 原标题：Dynamic replication and migration of data objects with hot-spot and cold-spot statuses across storage data centers
- 作者：Yaser Mansouri; Rajkumar Buyya
- 年份与版本：2019；Journal of Parallel and Distributed Computing 126:121–133。PDF p.121 标在线日期 2018-12-21，登记印刷日期为 2019-04；未确认该公开 PDF 后续修订史。
- 正式 DOI：[10.1016/j.jpdc.2018.12.003](https://doi.org/10.1016/j.jpdc.2018.12.003)；身份核对：[出版商登记题录](https://api.crossref.org/works/10.1016/j.jpdc.2018.12.003)。
- 实际读取材料：[作者公开 PDF](https://clouds.cis.unimelb.edu.au/papers/DataStorageClouds-JPDC.pdf)。

## Reading

2026-10-12：摘要、第 1 节、§3.1 与 §3.2 开头（印刷 pp.121–125，至 Put 成本）。2026-10-14 增读：p.121 身份，pp.125–128 的 §3.2 迁移费用、§3.3、§4、§5.1 指定部分，pp.131–132 的 §6.2 与 §7，浏览 p.133 题录；视觉核对 pp.125/126/132。未通读全文，未复算实验表格。

## Summary

**所读材料中作者的主张，以下为 AI 概括：**论文联合决定副本落点、读请求路由和迁移时机；成本包含创建、存储、Get、Put 与迁移。离线方案假设已知未来，摘要另述轻量启发式。

## Evidence

- pp.125–128：费用模型、约束与启发式将最终布局和动作成本放在共同问题内；离线方案与在线启发式使用的信息不同。
- p.126：迁移采用 stop-and-copy；服务目标采用数据中心 RTT 输入与平均时延约束，不能自动解释迁移中的请求尾时延。
- p.132 §6.2 / Fig.10：100 个桶平均大小 47.35 MB，加州到俄勒冈方向约 80% 的桶传输耗时 40–48 秒。该数据是作者特定环境的搬运测量，不是请求停顿、违约率或恢复证据。
- p.132：更强一致性与竞争比分析仍列为后续工作。

## Limits

p.125 Algorithm 2 的第 3 行 $C$ 含迁移费，第 6 行以原驻留费用减 $C$，第 8 行再与迁移费比较；图像确认了符号，但计费口径仍待实现或作者说明澄清，不能直接判错，也不能将其改述为简单回本阈值。冷热是访问状态，成本仍含写传播；未验证追赶、切换、故障重试与迁移期逐请求服务保证。不能把历史云价或跨中心测量当作当前价格/网络事实。

## Links

[联系：放置、路由与迁移的决策边界](../notes/storage-placement-and-migration.md)。本资料在[存储与服务地图](../maps/storage-and-serving.md)中按阅读范围定位。
