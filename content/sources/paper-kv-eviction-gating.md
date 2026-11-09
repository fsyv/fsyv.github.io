---
title: "The Gating Mechanism of KV Cache Eviction：归一化与保留预算"
date: 2026-11-09
draft: false
tags: [transformer, kv-cache, inference]
id: "e2909adc-e32b-42ce-8518-6652fdf5c98c"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
---

## Identity

Hao Gu、Xintong Yang、Zhiwei Li、Lei Zhu、Jian Yang、Qiyuan Zhu、Dezhi Li、Jingyuan Zhang、Zhizhuo Kou、Hao Wang、Bei Liu、Jiacheng Liu、Sirui Han，*The Gating Mechanism of KV Cache Eviction*，2026，[arXiv:2611.07605 v1](https://arxiv.org/abs/2611.07605v1)。官方记录首提 2026-11-05 07:53:37 UTC，cs.CL 11-06 公告。这是窗口内新增预印本，本轮补读此前遗漏。

## Evidence

2026-11-09 指定阅读 [v1 HTML](https://arxiv.org/html/2611.07605v1) §2 式 (2)–(3)，§3 Tables 1–4 与式 (4)–(6)，§4.1–4.5 中的比较设置，§7 及附录 C、D、E.1–2 的相关段落。

- §2 区分归一化内的注意力乘数与 softmax 后只缩放 value 贡献。§3 式 (4) 将起始保留项和近期窗口固定为一，在其余项上分配固定总量的正乘数。
- §3.1 对冻结骨干使用全 KV 教师的下一词元分布监督，作者选择反向 KL。该节还用最后一个 prefill 查询在各头的候选排序上计算累计保留的注意力质量，用共同阈值和整数调整确定各头槽数。
- Table 1 的逐步消融在 Qwen3-0.6B、RULER 8K、100 步训练、2048/8192 个缓存槽下进行。平均分依次是直接 LM 损失且均分预算 4.33、加入保护项和相应门控预算构造 44.86、切换到蒸馏 58.86、按注意力质量分配头预算 67.60。未淘汰的骨干为 70.01。第一步同时改变训练门控和推理保护。Table 2 给出其他设置、两次参考运行间 0.28 分的差异，并不提供普遍显著性结论。

## Support

支持[注意力归一化与 KV 保留预算](../notes/kv-cache-optimization.md#attention-gates-and-eviction)，分别分析训练时的连续乘数、推理时的离散槽数及不同头之间的分配。由正权重直接得到的统一缩放抵消与整行分布变化是本文的代数解释。

## Limits

未读取 PDF 图像、外部实现或原始运行日志，未复现实验。§7 的训练在稠密历史、teacher forcing 条件下进行，推理则实际移除 KV，存在分布偏移。实验分数不能回答任意上下文或硬件的质量与逐请求时限。连续门控受约束也不保证学到有效排名。
