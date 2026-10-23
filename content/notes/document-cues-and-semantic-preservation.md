---
title: "文档转换保住文字，为何仍可能丢失问题所需的信息？"
date: 2026-10-23
draft: false
tags: [knowledge-management, document-ingestion, evidence]
id: "540c1d47-8856-4ad6-a194-b25c78b6e83c"
kind: note
maturity: developing
endorsement: ai-candidate
---

**判断归属：AI 候选。** 实证来自 [Zhao、Pandey、Misra 2026](../sources/paper-silent-cue-loss.md)指定阅读；两文件反例和本库迁移建议为 AI 推理，未获用户确认。本页讨论表示与任务的关系，不宣称人类学习效果或某种 Markdown 格式普遍更好。

## Question

文档转换可以保留句子，却删掉作者通过颜色、高亮等形式标出的区别。是否损失“语义”必须相对具体问题判断：问文档写了什么，与问哪些要求被特别标出，所需信息不同。转换成功、文本相似、读者理解和 Agent 回答准确性需要分别测量。

## Information-example

**AI 逻辑反例：**两份文件字句完全相同，甲高亮 A 句、乙高亮 B 句。若转换删掉高亮，两份输出完全相同；但“返回被高亮的句子”在两份原文上的正确答案不同。任何只读转换文本的确定程序都不能对两份同时答对。这里丢失的是任务所需的区分信息，不是所有转换文档都不可理解的普遍结论。

因此格式保留与格式解释还要区分。原文方法保留 inline raw cues，并将红字或可见高亮映射为 block semanticRole 提示；后者是启发式解释，不能把“红色普遍等于关键警告”当格式本身的事实。

## Task-and-controls

论文从公开政策文档语料中筛选84份真实Word文档构成任务，包含332条带标记要求和4192条未标记干扰项，每文至少一条 marked、三条 unmarked。gold由OOXML run属性直接定义，不是作者真实意图的人工金标准。任务明确要求找出红字或非白高亮的要求，天然需要视觉标记。

回答采用默认 Claude Opus4.6、temperature0，按所有转换臂都成功且满足大小限制取76–79份配对文档。matcher依赖连续四个开头内容词，不能识别所有正确改写，332条gold中还有一条天然不可匹配。统计单位为文档，重复先在文档内平均，再做配对检验和bootstrap；合并计数的micro F1与逐文档的macro差不能混用。

Table1上半76文档×6臂×3重复=1368次调用：保留标记并加role的micro F1为0.690，保留相同raw标记但去role为0.605，docx2python为0.586，docling为0.150，plain为0.075。typed/untyped内容与raw标记字节相同，只删role，能局部区分“保留线索”与“解释线索”的贡献；不能据该特选任务给所有转换器做通用排名。

另一独立预注册修复后运行79文档×3臂×6重复=1422次调用，typed/untyped micro F1为0.667/0.597；逐文档配对macro增量则为0.085，区间[0.035,0.145]，Holm调整p=0.049。后者不能写成micro提高0.085，修复与边缘显著性也不能省略。跨六模型仅三个有显著role收益，保留标记相对plain的收益比role解释更稳定。

## Boundaries

外部 Word FileFidelity 的59份文档包含326个评测条目，按各条目的加权断言满足度计分，本文方法0.959、docx2python0.810、docling0.720，不是F1。表格143项中，本文方法与docx2python同为0.986，docling0.939；不能说所有表格处理都获胜。总体还包括页眉、脚注及metadata等修复，不能把全部差归因于颜色。

论文原parser也漏过部分内容，修复后总体断言分0.853→0.959。相同完整下游pipeline的68份文档中，按本文/docx2python/docling顺序，最终package仍含gold要求文字的比例（retention）为0.665/0.634/0.607，任务micro F1为0.503/0.258/0.084，说明相近的要求文字留存比例仍可对应不同标记任务得分；它不是全文字符保留率，也不表示转换没有内容丢失。代价约为plain的两倍token，PDF范围仅含可用文本层，不含OCR。

gold由格式定义，独立视觉验证kappa=0.72也不是作者意图标注；原语料、模型及sizecap子集限制外推。本轮未审代码、原文档或复现。一个TF-IDF logistic模型AUC不能证明所有format-blind方法的天花板，本页不继承该普遍推论；tracked deletion是否算当前有效文本也需独立修订策略。

## Links-and-next

- [知识实践地图](../maps/knowledge-practice.md)先加入输入表示核验，再讨论编辑组织与读者理解；本页没有要求更换本库Markdown系统。
- 对 [笔记拆分方法](when-to-split-a-note.md)及 [效果检验问题](../questions/evaluate-note-splitting.md)的关系是前置测量边界：先排除输入信息损失，再比较读者能否重建论证。解析任务得分不能关闭人类理解问题。
- 与 [Stroop任务解释](stroop-interference-and-experimental-controls.md)只有设计关系：应先声明正确反应和计分，才知道某个差异测到什么；人类干扰与文档Agent没有数学等价或机制同一性。

下一步先核公开代码、人工gold及可公开样本的可得性；本轮不造用户学习实验，2026-10-30复评。
