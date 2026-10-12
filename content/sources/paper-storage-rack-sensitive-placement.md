---
title: "SRS：同时考虑机架与存储利用率的放置"
date: 2026-10-12
draft: false
tags: [storage, papers]
id: "6c0db349-31ff-5157-aa0e-186110380e01"
kind: source
maturity: seed
endorsement: ai-candidate
read_status: partial
---

## Identity

- 原标题：Storage and Rack Sensitive Replica Placement Algorithm for Distributed Platform with Data as Files
- 作者：Vinay Venkataramanachary; Enrique Reveron; Wei Shi
- 年份与版本：2020；2020 International Conference on COMmunication Systems &amp; NETworkS (COMSNETS)。
- 正式 DOI：[10.1109/comsnets48256.2020.9027494](https://doi.org/10.1109/comsnets48256.2020.9027494)；身份核对：[出版商登记题录](https://api.crossref.org/works/10.1109/comsnets48256.2020.9027494)。
- 实际读取材料：[作者公开 PDF](https://www.csit.carleton.ca/wshi/wp-content/uploads/2020/05/09027494.pdf)。

## Reading

2026-10-12 实际读取：作者公开 PDF，摘要及第 I—IV 节（535—537 页）；第 V 节结论。未逐格核验表格。 摘要及部分正文阅读不代表全文复核。

## Summary

**所读材料中作者的主张，以下为 AI 概括：**作者将文件作为放置单位，结合机架剩余资源、可用节点与节点容量构造启发式，旨在改善资源利用。

## Limits

评估是三个机架、35 个随机大小文件的仿真；文件级放置对访问流量的优势不能当成所有访问模式下的实测结论。

## Links

[支持：放置形状如何影响故障风险](../notes/storage-replica-reliability.md)。本资料在[存储与服务地图](../maps/storage-and-serving.md)中按阅读范围定位。
