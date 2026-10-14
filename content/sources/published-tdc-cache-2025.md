---
title: "来源：TDC-Cache 公开预印本"
date: 2026-10-12
draft: false
tags: [caching, multi-agent, consensus]
id: "085527f2-9a7b-5d73-a7b7-e60c9b13cb86"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
math: true
---

Jinyu Chen, Long Shi, Taotao Wang, Jiaheng Wang, Wei Zhang. *TDC-Cache: A Trustworthy Decentralized Cooperative Caching Framework for Web3.0*。

[arXiv:2512.09961](https://arxiv.org/abs/2512.09961) · [v1 HTML 正文](https://arxiv.org/html/2512.09961v1)，首次提交 2025-12-10。本页依据这一公开版本，不把预印本身份等同于期刊审稿结论。

2026-10-12 读取 III–VIII 节 HTML 正文、公式和实验说明；未复现实验，未逐一核查参考文献，也未从图片重新取数。

## Evidence

| 位置 | 支撑内容 |
| --- | --- |
| III–V，式 (1)–(26) | 两层缓存、命中与时延、局部观测和 QMIX 学习 |
| VI–VII | PoCL 的阶段、消息与作者提出的保证 |
| VIII | 故障模拟、缓存策略及检索时延的比较条件 |

整理结果见[缓存与学习](../notes/cooperative-caching-and-learning.md)及[学习更新的共识](../notes/learning-consensus-protocol.md)。条件化推论和证据缺口写在知识笔记中，不将作者的所有保证自动视为已验证。

## 增量读取 · 2026-10-15

题录核到首次提交为 2025-12-10T02:52:41Z，当前仅列 v1。增读 v1 HTML §VI-A/B/C/D、§VII-A1/VII-B，并用 [v1 PDF](https://arxiv.org/pdf/2512.09961v1) 文本交叉核对 p.7 式 (27)、p.8 式 (28)–(29)及选择一致性、Synchronize/Commit，p.9 保证讨论；补查 III-A 的 OMC 职责段。截图获取不完整，未声称视觉核验；旧 III–VIII 阅读范围保留，仍为 partial，未审实现或复现实验。

**来源事实：**有限 Prepare 窗口形成候选输入；§VI-D 的 COMMIT 签名消息含 $m,t$ 与 true/false。规则要求收到超过 $2N_b$ 条外部有效消息，且至少 $N_b+1$ 张赞成票（包含自己）。向不同 oracle 分发对应本地参数是协议的一部分，因此不能仅用本地参数不相同定义冲突。

**AI 推论：**共同输入、赞成证据与跨轮次继承的检验及两个教学反例见[学习共识](../notes/learning-consensus-protocol.md)和[共识基础](../notes/web3-consensus-assumptions.md)。这些只定位公开文本到完整保证的审查缺口，不断言底层链/OMC 或实际实现缺少相应规则。
