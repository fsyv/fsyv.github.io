---
title: "来源：许可链的去中心化声誉管理与 rPoA"
date: 2026-10-12
draft: false
tags: [consensus, reputation]
id: "e334ee92-e0da-5d86-ace4-a73b85a6ced0"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
---

Jinyu Chen, Long Shi, Qisheng Huang, Taotao Wang, Daojing He. *On Designs of Decentralized Reputation Management for Permissioned Blockchain Networks*. **CMES 139(2), 1755–1773, 2024**。

[出版页与 DOI](https://doi.org/10.32604/cmes.2023.046826) · [出版商正文](https://www.techscience.com/CMES/v139n2/55355/html)

2026-10-12 核对出版信息，并读取 HTML 第 3–5 节正文、公式及图表说明；算法图片和实验未独立复现。正式出版日期为 2024-01-29，不能从 DOI 中的“2023”推断出版年份。

## Evidence

- §3、§4.2：链下评估经 DAC 留证，RMC 更新声誉。
- §3.4、§4.3：声誉参与资格选择、出块和分叉选择。
- §5：吞吐量、声誉变化与委员会变化的实验设置及观察。

这些位置支撑[声誉如何进入共识决策](../notes/reputation-and-consensus.md)。有限实验中的性能接近不等于所有负载下无开销；链上可核验也不自动保证链下评价真实。后两点是本笔记的阅读判断。

## Timing-followup

2026-10-30 Researcher为评分时序回访实际重读出版商HTML §3.1–3.3，随后按用户明确问题转向差分奖励统一式的目标说明。此次未完成评分数据取得、轮换、暴露、重复访问与候选生成时序的审查，没有新增评分发现或应用漏洞判断；旧阅读范围与结论归属保留。


## Score-and-data-timing

2026-11-06 针对评分缺口重读出版商 HTML §3.2–3.3、§4.2.1–4.2.3、§5.2 与数据可得性声明，§5.1 仅辅助核实验口径。未视觉检查算法图片，未读取真实合约源码、原数据或复现；属于旧来源增读，不是新论文或新版本。

§4.2.1 与 §5.2 明确随机生成用户数据，按其哈希中的零值数量计分；原文未指定表示方式。§5.2 另外假定跨层数据提交可靠。§4.2.3 的流程先登记数据、部署 DAC 并广播地址，再分配评审及通知验证者；拒绝后回到评审分配。§4.2.1 禁止同一验证者重复投票。

§3.3 写超过三分之二验证者接受，§4.2.3 Step 5 使用多数措辞。没有读取代码来裁定真正执行门槛，也没有据此认定漏洞；重试时的旧票清理、数据与评分版本、惩罚调用及申诉裁决仍需实现证据。数据可得性声明为 Not applicable，不据此推断所有公开渠道都没有代码。

这些事实支持[评分与数据时序解释](../notes/reputation-and-consensus.md#score-and-data-timing)。最终对象与确定性分数不能单独揭示生成历史，是该笔记明确标记的 AI 信息边界分析，不是论文报告的攻击实验。此前 10-30 未完成的记录保留，今日只推进论文描述层面的评分审查。
