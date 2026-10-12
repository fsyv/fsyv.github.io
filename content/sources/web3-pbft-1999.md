---
title: "Castro 与 Liskov（1999）：Practical Byzantine Fault Tolerance"
date: 2026-10-12
draft: false
tags: [web3, foundations]
id: "71f86c5c-244f-4028-9c96-31ac87f8126d"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
math: true
---

## 书目

Miguel Castro、Barbara Liskov，*Practical Byzantine Fault Tolerance*，OSDI 1999，pp. 173–186。[USENIX 论文入口](https://www.usenix.org/conference/osdi-99/practical-byzantine-fault-tolerance)。

## 本轮读取

2026-10-12 读取官方摘要、HTML 第 4 节开头与 4.1 节：[The Algorithm](https://www.usenix.org/legacy/publications/library/proceedings/osdi99/full_papers/castro/castro_html/node4.html)。确认确定性状态机复制、$3f+1$ 副本设置、primary/backups、view change 以及客户端等待 $f+1$ 个一致回复。第 2、3 节链接存在，但本轮正文获取不完整，不能称读完系统模型或完整安全性/活性证明。

## 使用边界

[共识笔记](../notes/web3-consensus-assumptions.md)中的法定人数交集式是本库独立展示的基本算术推导；并不代替 PBFT 完整协议证明。没有复现实验，也不把论文中的 NFS 性能结果推广成区块链性能。
