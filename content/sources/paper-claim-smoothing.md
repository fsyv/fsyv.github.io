---
title: "Claim Smoothing：有支持引用仍可能过度概括的测量边界"
date: 2026-10-28
draft: false
tags: [evidence, research-agents, evaluation]
id: "1d89892a-4c43-418f-81c4-a5145963ae94"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
---

## Identity

Tiasa Singha Roy、Manya Wadhwa、Greg Durrett，*Quantifying Claim Smoothing by LLM Research Agents*，2026，[arXiv:2610.35793v1](https://arxiv.org/abs/2610.35793v1)，首次提交 2026-10-26T17:29:48Z。[v1 HTML](https://arxiv.org/html/2610.35793v1)。本轮窗口内新预印本。

2026-10-28 实读 §1–6；Table1 只核 ResearcherBench/CS2 部分，不称全部 28 cells 已核。增读 AppendixA.1–A.3/Tables8–10、E.5/Table16、F 开头/Table17 部分；未完整 prompts/C/D/G、代码数据、PDF/图像或复现。主控另独立核 §5.1/Table3、Table6、AppendixC 关键文字与 Table13 的一致性。

## Mechanism-and-data

§2.1 将 claim smoothing 定义为：聚合结论至少部分得到证据支持，但相对整组证据，结论范围更广或置信更强。SmoothScore 保留方向、范围与限定地抽取 conclusive claims，对报告已引用文档分别抽支持和质疑证据，按 aspect 归并、保留出处，再给 1–5 ordinal 分；至少 3 为 material、至少 4 为 severe，5 分还包含纯 hallucination。因此不等于所有高分都有支持，也不是支持文献篇数投票或穷尽全球文献。

最终裁判 GPT5，其余主要 pipeline GPT5mini medium。ResearcherBench 65、ScholarQA-CS2 25；DRB-II English 66→18、ResearchRubrics 101→17，经人工筛开放/高综合问题。七系统是当时论文的配置，没有评价本库当前 Sol6.1/Astra 配置。

## Controlled-comparison

Table6 在 ResearcherBench 61 问题分别重新生成四臂：web、web 加 calibration instructions、只读原 web 报告引用的全文并关闭搜索、全文加同样 instructions。Luna 四臂 claim 数为 416/397/390/378，平均 ordinal 分 1.95/1.88/1.80/1.52；按原表至少 3 的百分比栏相加约 29.4%/25.7%/23.4%/12.1%。它们不是同一组 claims 的逐条配对，全文臂改变访问模式与搜索，组合臂还加 instruction；报告可长 1.2–1.6 倍，不能将全部差异单归因读全文或把末两比例当同分母精确风险减半。

## Measurement-limits

§5.1/Table3 的两标注者盲系统身份，同 rubric 核 73 claims。人间 exact 58%、within-one 96%；judge 对 annotator1 exact 56%、within-one 93%。在 judge 至少 3 的 claims 中，62% 被 annotator1 也标至少 3；这是条件阈值一致率，不能当真实客观风险、普遍精确率或自动审批可靠性。人间二值阈值 kappa 为 0.62，是另一统计量。

**来源内部未解决差异：**AppendixC 首段的 ordinal alpha 写 0.62 对 0.64，紧随 Table13 与 §5.1/Table3 则分别报告 judge–annotator1 0.68、人间 0.71。本库保留差异，按表描述时明确表号，不自行裁定正文或表哪处正确；该矛盾也不改变上述 exact 与阈值比例各自的定义。

支持[结论范围与整组证据](../notes/claim-scope-and-evidence-synthesis.md)。评分仍有模型、rubric、抽取与引用集合边界，不能替代人工判断或扩展为本库读者理解效果。


## Rubric-followup

2026-11-05指定增读[v1 Appendix B.7/Table7](https://arxiv.org/html/2610.35793v1#A2.SS7)完整prompt。文本位于原HTML的`foreignObject`，普通抽取会漏掉；研究员实际读取原HTML并用PDF文本pp23–24互核，没有视觉核PDF页面。另复读AppendixC/Tables3/13与版本信息；仍v1，非新发表/新版本。

五档以语义修订为参照：1 None，原句可保持；2 Append，补必要条件但中心判断不变；3 Revise，重要量词、适用域、比较或置信需改变；4 Recast，需大幅收窄或改为混合判断；5 Replace，中心结论需替换。原prompt前段要求按最小语义修订评分，后段又明确repair labels为结果而不是测试；故不能把它表述为已定义唯一的自动最小编辑算法。

完整规则要求反证匹配原claim的逻辑力度和条件，保留存在/通常/总是等不同量词，不先弱化原句再打分；证据pass标签不是stance，也不按来源数投票。本库[相应解释](../notes/claim-scope-and-evidence-synthesis.md#semantic-repair-and-logical-strength)的量词例为AI说明，不冒充作者新增测量或自动打分。

作者链接的[公开仓库固定提交c77a61e75577ca095187cad9f0ac8dd1cf72c103](https://github.com/tiasa2/SmoothScore/tree/c77a61e75577ca095187cad9f0ac8dd1cf72c103)根目录仅README，说明pipeline/data coming soon；[固定README](https://github.com/tiasa2/SmoothScore/blob/c77a61e75577ca095187cad9f0ac8dd1cf72c103/README.md)。这是所核入口的状态，不是全网代码不存在的断言。尚未取得73条原标注、评分程序或可据以复算alpha的原数据，原AppendixC文字与表格差异继续保留、不裁定哪处正确。研究价值中、启发价值高；规则原文可核，测量复算可靠性尚未闭合。
