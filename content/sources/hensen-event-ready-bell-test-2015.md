---
title: "Hensen 等 2015：事件就绪电子自旋 Bell 检验"
date: 2026-11-27
draft: false
tags: [quantum-foundations, experimental-inference]
id: "a99780f4-9835-40e1-aa7e-f0b1c63437d4"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
math: true
---

## Identity

B. Hensen、H. Bernien、A. E. Dréau 等，*Loophole-free Bell inequality violation using electron spins separated by 1.3 kilometres*，Nature 526，682–686，2015，DOI [10.1038/nature15759](https://www.nature.com/articles/nature15759)，正式页面 online 2015-10-21。

作者预印本 [arXiv:1508.05949v1](https://arxiv.org/abs/1508.05949v1) 标题为 *Experimental loophole-free violation of a Bell inequality using entangled electron spins separated by 1.3 km*，首次提交 2015-08-24T20:11:08Z。预印本和正式论文按同一研究去重。本轮读取对象为 v1 的指定部分，不把正式 DOI 身份核验当正式版全文通读。

2026-11-27 读取 [v1 PDF](https://arxiv.org/pdf/1508.05949v1) 的式 (1)、PDF 第 3–7 页指定正文和图 1、2、4 图注，并以 [HTML 入口](https://arxiv.org/html/1508.05949)辅助文本检索。未读 Methods、补充材料或逐试次原始数据，未复现实验与统计检验。

## Evidence

- 式 (1) 定义四相关的 Bell 统计量与局域界。正文说明中间站的光子探测用于事件就绪宣告，远端电子自旋测量提供输出。
- 图 1、2 及相关正文交代 1.3 km 分隔、设置选择与测量的时空安排；需要按因果条件理解，不能简写为所有参考系中的单一时间顺序。
- 图 4 与相关统计段报告 220 h 的 245 个试次及 $S=2.42$ 。独立同分布和高斯近似下 $p=0.019$ ；允许设备记忆并考虑随机数发生器缺陷的分析给 $p=0.039$ 。两者的分析条件不同，不能只挑较小的数。
- 已宣告的试次不再按本地读出是否探测到光子丢弃；读数都映为输出。这支持事件就绪与事后缺测筛选的区别。

## Support-and-limits

支持[事件就绪与共同试次总体](../notes/bell-local-models-and-event-ready-tests.md#event-ready-test)的实验实例。知识页的筛选反例与共同分布证明为 AI 解释，不是作者数据。 $p$ 值不是局域模型为真的概率；本轮未核完整停止规则、随机性界或原数据，不能将教学二项尾或代数枚举称为复现。
