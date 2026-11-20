---
title: "Wang 等 2026：CLOCK 家族的 TTL 近似"
date: 2026-11-20
draft: false
tags: [caching, probability]
id: "32cd0b99-f88c-4dbd-b979-5bf93b36cab6"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
math: true
---

## Identity

Yirong Wang、Peter Desnoyers、Benny Van Houdt，*TTL Approximations for a Family of CLOCK-Like Cache Replacement Policies*，arXiv:2611.24549v1。[题录与版本](https://arxiv.org/abs/2611.24549v1) · [实际读取 HTML](https://arxiv.org/html/2611.24549v1)。首次提交为 2026-11-18T14:52:37Z，11-19 公告。本轮称新预印本；作者自述接收或待刊信息没有另行独立核会议记录。

2026-11-20 Domain Monitor 实际指定读取 §§1、2.1–2.2、3–3.2、4–6 和附录 A 文字；主控复核 §§2–4。未审作者代码、跑轨迹或视觉量化图 4，未追读附录 A 所批评的 1993 原文。Architect 据会话交接整合，不把交接当自身全文阅读。

## Evidence

| 位置 | 支持内容 | 阅读与解释边界 |
| --- | --- | --- |
| §§2.1–2.2 | 等大小对象、有限槽位、命中加计数和未命中扫描；多次机会 FIFO 表示 | 不含异大小对象或 KV 语义 |
| §§3–3.1 | 共同固定遍历时间、独立相位型更新请求；计数和相位链求每驻留总命中及总轮数 | $O(Kd)$ 是系统阶数，不写成求解时间 |
| §3.2 | 以未命中周期与 Little 关系求占用，证明至少存在匹配平均容量的遍历时间 | 不升级成一般唯一性或逐时刻容量保证 |
| §4 | 每条 $10^7$ 请求，$M=30,60,120,240,480,960$，Zipf 参数 0.5/1.1，$K=0,1,15$，IRM/Hyper2/Erlang4/Hypo4 合成过程 | 作者文字称误差通常随规模减小，未读图上具体 MAE 或复现 |
| §5 | $M=1000,C=300$，$K=0,1,15,255$、Zipf 参数 0.5–1.1 的比较 | 所测偏斜路径，非一般 majorization 定理 |
| §6、附录 A 文字 | 讨论适用范围与对旧 FIFO 证明的批评 | 后者仅记录作者主张，未独立核旧原文 |

## Support-and-limits

支持 [CLOCK 与平均容量](../notes/clock-ttl-approximation-and-capacity.md) 的机制和近似范围。该页单槽、两对象 Poisson 算例是 AI 独立推导及说明性求根，研究通道与主控复算一致；不是本文原实验。主控 Decimal 精度加倍检查不是区间证书。

研究价值高，因其将分析假设、单对象计算和容量匹配连成完整链；启发价值高，因匹配平均量仍可丢失硬容量约束。作者模拟可靠性限原报告，真实负载、PH 拟合误差、实现与动态反馈尚未独立检验。
