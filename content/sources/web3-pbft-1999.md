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

## 增量读取 · 2026-10-15

读取官方 HTML [§2 系统模型](https://www.usenix.org/legacy/publications/library/proceedings/osdi99/full_papers/castro/castro_html/node2.html)、[§3 服务性质](https://www.usenix.org/legacy/publications/library/proceedings/osdi99/full_papers/castro/castro_html/node3.html)，以及 [§4.2/4.4/4.5.1–2](https://www.usenix.org/legacy/publications/library/proceedings/osdi99/full_papers/castro/castro_html/node4.html) 的阶段条件、view change 和证明概要。论文为 OSDI 1999 年 2 月旧资料；官方 HTML 没有独立修订日期，不按访问日算新版本。PDF 获取失败，不补写未经核实的具体页码；未读取文中引用的完整形式化证明。

**来源事实：**§4.2 将 PREPARE/COMMIT 绑定 view、序号、摘要，副本先 prepared 再发 COMMIT，prepared 与匹配的 $2f+1$ 条 COMMIT 构成 committed-local。§4.4 通过可验证的旧 prepared 证据约束新 view 的提议，并由接收者检查；§4.5 给出相关性质的论证概要。

**AI 使用与边界：**[共识基础](../notes/web3-consensus-assumptions.md)据此展开证据链；跨 view 玩具反例刻意删掉继承规则，不是本文攻击。[学习共识的审查](../notes/learning-consensus-protocol.md)复用的是证明义务，不能把 PBFT 的保证直接转给 PoCL。
