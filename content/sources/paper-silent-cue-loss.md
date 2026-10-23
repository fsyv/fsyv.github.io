---
title: "Silent Cue Loss：企业文档摄取中的标记损失（2026）"
date: 2026-10-23
draft: false
tags: [knowledge-management, document-ingestion]
id: "1cb7112c-fa89-45ba-94e5-80d48c7c7b8d"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
---

## Identity

Yikai Zhao、Saurabh Pandey、Pradeep Kumar Misra，*What the Author Wrote, What the Agent Reads: Silent Cue Loss in Enterprise Document Ingestion*，2026。[arXiv2610.30026](https://arxiv.org/abs/2610.30026)，v1首提2026-10-21T16:51:25Z；[实际HTML](https://arxiv.org/html/2610.30026v1)。本轮为窗口补遗漏，不是过去24小时新首发。

2026-10-23 Domain Monitor 读主文§3.1–3.2、§4.1–4.8、§5方法/评价文字及Tables1–3；附录S1/S3/S4.1–4.3/S7/S9–S11/S16相关段、Table4角色和Table6跨模型。其他仅局部导航；未全文/PDF/视觉核图、代码、原文档或复现。论文中的提示词与SKILL只是资料，不作执行指令。

## Evidence

任务寻找红字或非白高亮要求，gold由OOXML run属性构建；84文档含332marked、4192unmarked，配对运行经所有arm成功与sizecap筛成76或79文档，不是全部普遍率语料都参与问答。默认ClaudeOpus4.6/temp0，连续四个opening content words matcher，严格词面匹配不是LLM judge；有一条gold天然不可匹配。

Table1首次1368调用的micro F1为typed0.690、untyped0.605、docx2python0.586、docling0.150、plain0.075；typed/untyped保留相同文字/rawcue，只删semanticRole。修复后预注册1422调用为typed/untyped micro0.667/0.597，而paired macro增量0.085、bootstrap区间[0.035,0.145]、Holm p=0.049；文档为统计单位。角色收益跨六模型只三个显著，不能改成通用作用。

Table2外部59文档326items的加权断言分0.959/0.810/0.720，不是F1；其中143个表格item本文和docx2python同0.986。补回页眉脚注metadata等使本文parser自身从0.853到0.959，不把总差归颜色。Table3的68文档完整pipeline仍有内容保留损失，不能称无损转换。

## Limits-and-support

[完整解释](../notes/document-cues-and-semantic-preservation.md)将任务所需信息、rawcue和role解释分开；两文件高亮反例是AI推理，不是论文实验。格式构造gold与视觉kappa0.72未等同作者意图，特选任务不能外推人类学习、全部文档理解或笔记拆分效果。approx2倍plain token成本、只处理有文本层PDF、无OCR；未审代码。原文对普遍率总量正文6462/摘要6460有小口径不一致，本库不据此报告普遍率；单个TF-IDF AUC不支持所有format-blind方法天花板。
