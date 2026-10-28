---
title: "结论有支持引用，为什么仍可能超过证据范围？"
date: 2026-10-28
draft: false
tags: [evidence, knowledge-management, evaluation]
id: "0c262ea4-0fd1-44dc-bcfb-ecaa0988e978"
kind: note
maturity: developing
endorsement: ai-candidate
---

**判断归属：AI 候选。** 定义、pipeline 和对照来自 [Roy、Wadhwa、Durrett 2026 指定正文](../sources/paper-claim-smoothing.md)；与本库记录及 WorldPager 的联系为 AI 解释，尚未获用户确认，未复现或自动调用任何模型 API。

## Question

[输入表示保真](document-cues-and-semantic-preservation.md)保证读者有机会看到文字、格式与限制，却不保证综合结论保留这些限制。一个结论可以引用真实支持段落，同时忽略同组证据的反例、条件或相反结果。需要检验“哪部分得到支持”与“整个结论的方向、范围和置信程度是否相称”。

来源把这种相对整组证据变强、变广的综合称为 claim smoothing。它与完全无来源的捏造不同，但评分的最高档也允许纯 hallucination；不能把所有高分都说成“本来有支持引用”。

## Evidence-at-the-same-aspect

SmoothScore 先抽出保留方向、范围和限定的总结性 claim，再对该报告已引用的文档做两遍读取：一遍找支持，一遍找反证、条件和替代的成功情形。随后按 aspect 归并并保留来源，最后以 GPT5 给出 1–5 的 ordinal 分，至少 3 为实质平滑、至少 4 为严重。其余主要 pipeline 用 GPT5mini medium；这是论文测量方案，不是本库正在运行的自动审批。

按同一 aspect 比较很关键。**AI 对照例：**WorldPager 的指定 a_yaw 中位等待下降，可以支持“该配置下等待较少”；[同篇另一轨迹在软件限速下的 p99 反而变大](kv-cache-optimization.md#predictive-prefetch-and-staleness)，就限制了“所有负载尾等待都改善”。前后讨论的是不同负载和分位数，不能用一条有利中位等待遮住不利尾部。这个例子来自本库独立阅读，不是 SmoothScore 论文测过 WorldPager。

上述方法也有检索边界：它主要审报告自己引用的文档，未引用的反例可能仍然缺失。对支持和质疑各做一遍是审计启发，不是已经穷尽全部文献的证明。

## Full-documents-and-calibration

Table6 对 ResearcherBench 的 61 问题，分别重新生成 web、web 加 calibration instructions、只读原报告引用的全文且关搜索、全文加同样 instructions 四臂。以下保留 Luna 系统的完整四臂：

| 访问及 instruction | 抽取 claim 数 | 平均 ordinal 分↓ | 至少 3 档的比例，约↓ |
| --- | --- | --- | --- |
| Web | 416 | 1.95 | 29.4% |
| Web + instructions | 397 | 1.88 | 25.7% |
| Docs | 390 | 1.80 | 23.4% |
| Docs + instructions | 378 | 1.52 | 12.1% |

最后一列是 AI 将原表相应档位的已舍入百分比相加，约数不是从原始 claims 重算。各臂 claim 数不同，也不是同一组结论逐条配对；Docs 改了访问方式并关搜索，组合还改变 instruction，文本长度约可增至原来的 1.2–1.6 倍。该结果支持继续核完整证据与明确校准的组合，不能说“只读全文使客观风险减半”，也不能从 ordinal 均值计算风险比。七系统及任务选择限定外推，没有评价本库当前 Sol6.1/Astra 配置。

## Judge-is-an-instrument

两个人工标注者使用相同 rubric、盲系统身份核同 73 claims。judge 与 annotator1 的 exact 一致为 56%、相差至多一档为 93%；judge 标至少 3 的 claims 中，62% 也被 annotator1 标至少 3。它们测的是有限样本与指定 rubric 下的一致程度，不能当客观真实风险或可靠自动批准。来源 AppendixC 文字与 Tables3/13 的 ordinal alpha 还不一致，已在[来源限制](../sources/paper-claim-smoothing.md#measurement-limits)保留，未裁定。

因此自动评分适合定位待复核的范围、条件与冲突，尚不足以代替逐条证据判断。没有凭这一研究改变本库确认规则、永久策略或接入付费 API。

## Links-and-next

- [知识实践地图](../maps/knowledge-practice.md)按“输入表示→综合范围→组织方法→读者效果”阅读；有来源支持与人类理解改善仍是不同命题。
- 与[反复评分和留出集复用](adaptive-validation-and-holdout-reuse.md)互补：该页研究选择规则和统计泛化，本页研究结论的语义范围与整组证据。审计措辞不能代替独立验证、统一误差或应用时序证据。
- 对本库的候选建议是比较同方面的支持、限制与冲突，逐项保留适用域；是否接受由用户决定，不把模型裁判标分当确认。

[Snow供水比较](water-supply-comparison-and-denominators.md)提供具体范围审计案例：来源真实仍须区分全部供水区/局部交错、死亡/房屋与个人风险、逐例调查/比例推算。它是本页方法的应用实例，不是claim评分器或因果效应的独立验证。

下一步核公开代码、人工 rubric 与来源内部数值差异；2026-11-04 复评。当前不将此关闭[笔记拆分的读者效果问题](../questions/evaluate-note-splitting.md)。
