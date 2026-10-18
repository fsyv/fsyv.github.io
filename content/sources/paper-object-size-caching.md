---
title: "对象大小怎样改变缓存策略与命中目标？"
date: 2026-10-19
draft: false
tags: [caching, probability, papers]
id: "8bfed737-a614-4e87-9ebd-1d417dcde84b"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
---

## Identity

- 作者：Ridwanul Hasan Tanvir; George Kesidis。标题：Caching Policies based on Object Sizes。
- 版本：[arXiv:2610.21035v1](https://arxiv.org/abs/2610.21035)，首次提交 2026-10-15T00:11:22Z。未确认正式发表。
- 实际读取：[v1 HTML](https://arxiv.org/html/2610.21035v1)，PDF 文本提取辅助。

## Reading

2026-10-19 读取 §1、§2.1–2.4、§3、§4.1–4.2、§5.1、§5.3、§6 主文和 §7；未完整附录、代码或原始轨迹，未复现、未完成视觉验收。该稿属于今日窗口补遗漏，首次提交早于上次终点。

## Evidence

- §2.1 式 (1)：按对象请求计数的命中与按对象字节加权的命中是不同目标。
- §2.4：用观测到的不同对象平均大小配置保留对象数量；不能把该估计过程等同于全知静态最优。
- Table 2：收益按相对百分比给出，不是百分点差。
- §4.2 / §5.3：策略开销在模拟器测量，不承担端到端服务时延结论。
- §7：fetch delay 与 TTL 不在模型内；working-set 的正文概述不替代未完整读取的附录分析。

## Support

为[等大小静态缓存模型的扩展](../notes/probability-zipf.md#object-size-and-objective)提供指标与策略背景。字节容量整数选择式和三对象反例是独立 AI 教学推导，不是本文仿真或轨迹数据；不要求 Zipf，不验证任一动态算法最优。组织入口见[概率地图](../maps/probability-and-networks.md)。

## Limits

不以模拟器策略开销替代回源、传输、排队和请求完成；也不把相对命中提升写成同幅度时延下降。研究价值中、启发价值高、可靠性中，依据为指定原始正文，未核完整附录、源码与轨迹。
