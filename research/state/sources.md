# 已处理资料与版本

公开来源去重账本。DOI 小写、arXiv 按基础 ID 去重并记录版本；HTML/PDF/早稿别名不重复计数。未合并分支只提供去重证据，不是已接受知识。仅读题录/摘要、官方入口复查与正文深读分开计。

## 2026-10-21

8 份去重候选 A1/B6/C1，4 次指定正文深读 A1/B2/C1，形成 A1/B1/B2/C1 四项。A/B 为指定部分，C 为本文六张原扫描全读（不含 p.168 上篇，不追引用）。A 的 README 全读及 80,000 行样本解析/计算另列产物操作，不额外计论文深读；跨角色原文复核、版本入口和失败重试不重复计数。[晨报](../digests/2026-10-21.md)保留判断所需论证，[回执](runs/2026-10-21.md)由主控记录实际阶段和独立检查。

| canonical / 版本 / 原始入口 | 首次发表/提交 | 首读 / 最近读 | 实际范围与决定 |
| --- | --- | --- | --- |
| usenix:osdi20:yang；Juncheng Yang/Yao Yue/K. V. Rashmi，[Twitter 缓存集群研究](https://www.usenix.org/conference/osdi20/presentation/yang) | OSDI 2020-11-04—06 | 2026-10-21 / 2026-10-21 | A；§3.1–3.2印刷193–194、§4.4–4.5印刷195–197含脚注3、§6.1–6.2印刷200，另浏览§6.3开头。官方README固定c59112085b927c50acbe2d51175ebb09a9a52461全读，cluster026固定24347f630eca15f157a5f0e5925170c7a58815a6全解析；同研究不另计候选。有限GET/LRU实际计算与主控独立复算，非全文/原论文复现或生产回放。[来源/哈希/代码](../../content/sources/paper-twitter-cache-workloads.md)；研究中/启发中/有限序列可靠高，代表性未验证 |
| arxiv:2610.25033 v1；Zhufan Gu/Qizhe Tang/Yuxin Wang/Xun Zhou/Hui Feng，[PlaneZip: Lossless Bit-Plane Compression of Training Activations Offloaded over PCIe](https://arxiv.org/abs/2610.25033) | 2026-10-18T05:44:24Z | 2026-10-21 / 2026-10-21 | B1；HTML§II-A–III-D、IV、V-A正文/V-B–F、TablesI/II/IV，TableIII仅前部，图仅图注；未全文/视觉/源码/复现。[来源](../../content/sources/paper-planezip.md)；同事件模拟收益/CPU压缩比，不是GPU引擎原型；所读正文未见开销正式分母公式，不换算吞吐。研究中/启发高/可靠中 |
| doi:10.1073/pnas.2532180123；别名 arxiv:2610.26428 v1；Mauro Faccin/Tomas Scagliarini/Manlio De Domenico，[Systemic collapse emergence from climate-induced perturbations in transportation networks](https://www.pnas.org/doi/10.1073/pnas.2532180123) | PNAS/Crossref online 2026-10-16、issue10-20；arXiv 10-19T13:54:12Z | 2026-10-21 / 2026-10-21 | B2；预印HTML§2.1–2.5、3、4.1–4.3，后增A.3–A.6文字/图注；未A.1/A.2/视觉/源码/复现，PNAS仅身份/日期。主控另核关键主文/方法；最终读取范围含真实后增附录，不沿用早消息“未读SI”。[来源](../../content/sources/paper-climate-transport-collapse.md)；保留近似阈值，另列AI条件界。研究中/启发高/可靠中 |
| arxiv:2610.26171 v1；Xijia Wang/TianZhang He/Mohammad Goudarzi，[CEMA-Router: Infrastructure-Aware Batch Routing for LLM Inference in Cloud-Edge Systems](https://arxiv.org/abs/2610.26171) | 2026-10-19T11:03:04Z | 2026-10-21 / 2026-10-21 | B；仅官方题录/摘要/history，目标、质量和基线未核，暂缓，不建永久理解。研究中/启发中/可靠低 |
| arxiv:2610.26743 v1；Vinit Ranjan/Daniel Deza/Anushka Acharya/Jisun Park/Bartolomeo Stellato，[FOMTools: Development and AI-Assisted Code Generation for First-Order Methods](https://arxiv.org/abs/2610.26743) | 2026-10-19T17:08:17Z | 2026-10-21 / 2026-10-21 | B；仅官方题录/摘要/history，验证集合、残差和生成代码边界未核，暂缓。研究中/启发高/可靠低 |
| arxiv:2610.25519 v1；Mobina Kashaniyan/Ali Jannesari，[ATEST: Adaptive Resource-Aware Test-Time Scaling for LLM Inference](https://arxiv.org/abs/2610.25519) | 2026-10-18T20:23:11Z | 2026-10-21 / 2026-10-21 | B；仅官方题录/摘要/history，预算、拒答分母、干扰与尾部未核，暂缓。研究中/启发高/可靠低 |
| arxiv:2610.26295 v1；Paul Franke-Bergmann/Maya Kuhlmann/Alexander Heß/Marc Leinweber/Rüdiger Kapitza/Hannes Hartenstein/Franz J. Hauck/Christian Berger，[Pangolin: Efficient DAG-based BFT State-Machine Replication with TEE-Accelerated Commitment](https://arxiv.org/abs/2610.26295) | 2026-10-19T12:43:35Z；KITopen1000198163记10-20为同预印登记 | 2026-10-21 / 2026-10-21 | B；官方题录/摘要/history及KIT登记身份，TEE、活性与比较基线未核，暂缓。研究中/启发高/可靠低 |
| doi:10.1073/pnas.15.3.168；Edwin Hubble，[1929速度—距离原文](https://pmc.ncbi.nlm.nih.gov/articles/PMC522427/) | 期次1929-03-15；PNAS另列04-25，communicated01-17不代出版日 | 2026-10-21 / 2026-10-21 | C；本文六扫描p168下半标题起至173，含Tables1/2、方程/结果、Figure1、四条题录；另全读NASA转录、PNAS三图核对，同研究不重复计数。未追引文/重建拟合。[来源](../../content/sources/hubble-velocity-distance-1929.md)；近期发现旧资料，首次天文，研究中/启发高/限定可靠高 |

### 窗口、版本与访问边界

B 窗口为 2026-10-14T07:30:00+08:00—2026-10-21T07:30:00+08:00，实际核查至07:34:46，补上次终点10-20T07:34:55后遗漏。选择性检查 cs.DC/cs.PF/math.OC/physics.soc-ph recent 默认首屏、DC/OC new及局部替换，最新可见公告20日；不称穷尽分页、版本、期刊或会议。六候选都早于昨日核查终点，为本周补遗漏；限定检索没有取得更早发表记录，不证明不存在。

- A：官方样本目录 web 打开失败，后经官方 API 和固定 raw 成功；样本元数据/语义缺口没有因此解除。论文全文未读，不按论文完整采集性质推断短样本。原始匿名 key 与行不存仓库。
- B：Crossref web 失败后只读 API 恢复，Obsidian urllib403 后 web 恢复，bs4不可用改标准库内存解析；无影响限定结论的未恢复读取失败。未入选四项只有题录/摘要，不能补写机制。
- C：PMC web 验证、ADS摘要405/PDF不可达，PNAS 后续部分入口 cookie/PDF失败；经公开 HTML 取得六张官方扫描逐页读取，NASA新路径转录辅助。失败入口不计深读，未把转录缺失的表图称为已读。
- 既有 arxiv:2610.22863/23328/21500/21035 仍v1，2610.15755仍10-14的v2，仅版本入口复查，未新增正文或解除旧缺口。
- Hugo latest v0.168.0、Obsidian公开公告10-05/Catalyst10-01、CommonMark0.31.2 均无本轮新推荐；只核入口，不升级工具，不计新来源或深读。

### 批次与归属

[PR #28](https://github.com/fsyv/fsyv.github.io/pull/28) 已合入核对的 origin/main `af525f779464752dfa4d08a8e895dc54cd93ef81`，今日新建唯一 `research/batch-2026-10-21`，当前 review 只列今日。历史来源、coverage 和晨报保留，合并不等于用户逐项确认，不升级 endorsement。真实评论、运行与最终审核由主控回执记录；没有从沉默或模拟意见推断偏好。

## 2026-10-20

9 份去重候选 A2/B6/C1，5 次深入阅读 A2/B2/C1，形成 A1/B1/B2/C1 四项。A/B 为指定部分正文，C 为本文完整 12 张原扫描（不含上篇和参考文献追读）；不将题录筛选、版本复查或失败 PDF 当作深读。[晨报](../digests/2026-10-20.md)保留判断所需证据，[当日回执](runs/2026-10-20.md)由主控记录运行/审核/构建实际状态。

| canonical / 版本 / 原始入口 | 首次发表/提交 | 首读 / 最近读 | 实际范围与决定 |
| --- | --- | --- | --- |
| book:sutton-barto:reinforcement-learning:2e；[作者 PDF](http://incompleteideas.net/book/RLbook2020.pdf) | 2018 二版，版权页 2018/2020；生成元数据 2022 非修订证据 | P13 2026-10-13 / 2026-10-20 | A；548 页文件的身份/版权、§3.1印刷47–49/文件69–71、§4.2印刷76–80/文件98–102，p80仅收尾背景；视觉p78。旧资料重核，非全书；[来源](../../content/sources/sutton-barto-policy-improvement.md)。研究高/启发高/理论可靠高 |
| jmlr:21:178；[Rashid等期刊入口](https://jmlr.org/papers/v21/20-081.html) | 会议前身2018；正式页记Submitted 1/20、Revised/Published 8/20 | 2026-10-12，P13补读10-13 / 2026-10-20 | A；首页版本、§3.1–3.4p10/§4p11式4–5/Theorem1，新增§4.1pp15–16/Tables1–2/AppendixAp38（附录Theorem2）；视觉15/38。未读随后B/全篇/SMAC复现；[来源](../../content/sources/web3-qmix-2020.md)。研究高/启发高/理论可靠高 |
| arxiv:2610.22863 v1；[Arya等KV Residency](https://arxiv.org/abs/2610.22863) | 2026-10-16T03:09:13Z | 2026-10-20 / 2026-10-20 | B；30页PDF §2.2–2.3印刷5–7、§4.1–4.2起始p12/4.4pp13–14、§5开头–5.7pp15–20，§6起始/生成器限制辅助；未全文/视觉/轨迹/代码/复现。idle cap定位§5.1/图10pp15–16，metadata为§5.3末p18，首触floor§5.5。B1补遗漏；[来源](../../content/sources/paper-agentic-kv-residency.md)，研究高/启发高/可靠中 |
| arxiv:2610.23328 v1；[Fomin等Peak-Memory Schedules](https://arxiv.org/abs/2610.23328) | 2026-10-16T11:31:09Z | 2026-10-20 / 2026-10-20 | B；HTML§2–4、5.1–5.3含Table1、5.5–5.6、8、AppendixA.1–A.4/C.1–C.2；其余引言表局部。Architect另核§2–5.2关键表述；未完整D–G/源码/视觉/复现。B2补遗漏；[来源](../../content/sources/paper-peak-memory-schedules.md)，研究中/启发高/可靠中 |
| arxiv:2610.23086 v1；Xiao Liu/Yujia Fu/Yue Yu/Dan Huang，[PairSight: Characterizing and Predicting Operator-Level Interference in GPU Sharing for DNN Inference](https://arxiv.org/abs/2610.23086) | 2026-10-16T07:56:36Z | 2026-10-20 / 2026-10-20 | B；仅官方题录/摘要/history；硬件、划分、误差口径未核，暂缓。研究中/启发高/可靠低 |
| arxiv:2610.23199 v1；Marco Tonin/Michele Tizzoni/Bruno Lepri/Luca Maria Aiello，[Validating LLM-generated political networks with survey-reported partisan exposure](https://arxiv.org/abs/2610.23199) | 2026-10-16T09:38:11Z | 2026-10-20 / 2026-10-20 | B；仅题录/摘要/history；构图/抽样/调查未核，暂缓。研究中/启发高/可靠低 |
| arxiv:2610.23301 v1；Taha El Bakkali El Kadi/Eduard Gorbunov，[Acceleration Survives Heavy Tails and Generalized Smoothness](https://arxiv.org/abs/2610.23301) | 2026-10-16T11:06:17Z | 2026-10-20 / 2026-10-20 | B；仅题录/摘要/history，证明和参数条件未读，暂缓。研究中/启发高/可靠低 |
| arxiv:2610.22508 v1；Duc A. Tran/Dung Truong/Duy Le，[TCDA: Tunable Coded Distributed Arrays for Data Availability Sampling](https://arxiv.org/abs/2610.22508) | 2026-10-15T18:03:29Z | 2026-10-20 / 2026-10-20 | B；仅题录/摘要/history，对手/good nodes/网络条件未核，暂缓。研究中/启发高/可靠低 |
| doi:10.1073/pnas.44.7.671；[Meselson–Stahl PMC扫描](https://pmc.ncbi.nlm.nih.gov/articles/PMC528642/) | PNAS44(7)，1958-07；PMC记15日/Caltech记1日，不裁定；communicated05-14 | 2026-10-20 / 2026-10-20 | C；全部12扫描的p671下半部起、672–681正文/图1–9、682总结/脚注11–14，未纳入671上篇；未追引用/积分/复现。C1旧资料、首次分子遗传；[来源](../../content/sources/meselson-stahl-1958.md)。研究中/启发高/限定可靠高 |

### 窗口、失败与版本复查

B 窗口为 2026-10-13T07:30:00+08:00—2026-10-20T07:30:00+08:00，核查至 07:34:55+08；选择性检查 cs.DC/cs.PF/math.OC/physics.soc-ph recent 首屏、cs.DC/math.OC new，最新可见19日。计划的选择性监测完成，不代表穷尽分页、期刊会议、领域或版本。六新候选首提均为15/16日，早于昨日监测终点，都是补遗漏；正式发表检索未取得更早记录，不据此断言不存在。

- A：作者教材入口web 502/timeout，直接内存读取成功；JMLR web截图失败、内存渲染成功；Stanford同名PDF版权2014/2015旧草稿仅核身份后排除，没有冒充正式二版。历史P13未审核的身份保留，今日新读与旧状态分别记录。
- C：Caltech两个PDF入口重定向目标不可达、PMC PDF浏览器验证，共三个入口尝试失败；后经PMC图片入口取得全部12页原扫描并逐页视觉读取。失败PDF没有被说成已读，不另计候选。
- B既有 arxiv:2610.21500/21035/20354/18925/17795 仍v1，2610.15755仍10-14的v2：只核官方版本入口，没有正文增读或正确性缺口解除。
- Hugo latest仍v0.168.0，Obsidian公开公告仍10-05、Catalyst10-01，CommonMark仍0.31.2（2024-01-28）：官方入口复查，不算新来源或深读，不升级本库。

### 新批次与身份保留

昨日四项由 [PR #26](https://github.com/fsyv/fsyv.github.io/pull/26) 合入 origin/main `d1a8f84`，今日开始唯一 `research/batch-2026-10-20`，重置当前待审清单。合并不等于逐条用户确认；下方所有历史状态保留其日期/归属。A重建P13同一候选的note id `22876dbb-4560-4fb9-9f17-91b4f573a3c3`、source id `233e20fc-3e22-4a58-878a-fd1fabce913b`，依据今日重新核验解释，并非cherry-pick、认可旧稿或冒称首次发现。

## 2026-10-19

11 份去重候选：A3 / B6 / C2；5 次指定部分正文深读：A1 / B2 / C2，形成 A1/B1/B2/C1 四项发现。A 的两个旧来源仅限定补查，没有新增可读正文；另核 B6 既有版本及 3 工具入口，不计为新候选或深读。详细阶段、工具限制与独立审核/构建结果由[当天回执](runs/2026-10-19.md)记录；[晨报](../digests/2026-10-19.md)保留影响理解的限制。未称通读、复现或穷尽监测。

| canonical / 版本 / 原始入口 | 首次发表/提交 | 首读 / 最近读或尝试 | 实际范围及决定 |
| --- | --- | --- | --- |
| doi:10.1145/2723372.2723726；[Squall 作者 PDF](https://db.cs.cmu.edu/papers/2015/p299-elmore.pdf) | Crossref online/print 2015-05-27；会议05-31—06-04 | 2026-10-19 / 2026-10-19 | A；p299身份、pp301–309 §2.3–7.6，重点§3–6/7.1–7.3/7.5–7.6；未读300/310–313、未视觉/代码/复现。A1今日发现旧资料；2025 deposited非修订。研究高/启发高/可靠中；[来源](../../content/sources/paper-squall.md) |
| doi:10.1016/j.jpdc.2018.12.003；Mansouri/Buyya 冷热对象工作 | online 2018-12-21 / print 2019-04 | 2026-10-12 / 2026-10-19限定检索 | A；本轮未新增正文，未获可读实现或作者计费澄清；保留10-14指定阅读，不重复推介，不计深读 |
| doi:10.1109/cloudsummit54781.2022.00009；Fatemipour/Shi/St-Hilaire 多源迁移 | 2022 | 题录2026-10-12 / 2026-10-19尝试 | A；多源题录补查仍无全文；论文内容未读，不新增机制或数值，不计深读 |
| arxiv:2610.21500 v1；Muhammad Ibrahim，[When the KV Cache Is Slower Than the GPU: Scaling Remote KV Tiers for Context-Parallel Prefill](https://arxiv.org/abs/2610.21500) | 2026-10-15T08:37:22Z | 2026-10-19 / 2026-10-19 | B；HTML §2–4/5.1–5.4/6.1–6.6/7–8、PDF提取辅助；未全文/源码日志/复现/视觉。B1窗口补遗漏，研究高/启发高/可靠中；[来源](../../content/sources/paper-remote-kv-load-or-recompute.md) |
| arxiv:2610.21035 v1；Ridwanul Hasan Tanvir/George Kesidis，[Caching Policies based on Object Sizes](https://arxiv.org/abs/2610.21035) | 2026-10-15T00:11:22Z | 2026-10-19 / 2026-10-19 | B；HTML §1/2.1–2.4/3/4.1–4.2/5.1/5.3/6主文/7、PDF提取辅助；未完整附录/代码/轨迹。B2窗口补遗漏，研究中/启发高/可靠中；[来源](../../content/sources/paper-object-size-caching.md) |
| arxiv:2610.21387 v1；Chenxi Wang等，[Top-Down Microarchitecture Analysis Without Causal Modelling Is Dangerous!](https://arxiv.org/abs/2610.21387) | 2026-10-15T07:03:50Z | 2026-10-19 / 2026-10-19 | B；仅官方题录/摘要/history。因果干预证据未核，暂缓；研究中/启发高/可靠低 |
| arxiv:2610.21157 v1；Choi/Lee/Kim，[A Panoramic Network Overview of Shortcut Impact on Power Grids](https://arxiv.org/abs/2610.21157) | 2026-10-15T03:17:18Z | 2026-10-19 / 2026-10-19 | B；仅官方题录/摘要/history；动力学、扰动及模拟未核，暂缓；研究中/启发高/可靠低 |
| arxiv:2610.20892 v1；Parker/Ripsman/Springer/Ghobadi，[Learning Warm Starts for the Simplex Method from Measured Solver Cost](https://arxiv.org/abs/2610.20892) | 2026-10-14T20:19:58Z | 2026-10-19 / 2026-10-19 | B；仅官方题录/摘要/history；与LP解释相关，但训练划分/测量未核，暂缓；研究中/启发高/可靠低 |
| arxiv:2610.22172 v1；doi:10.1109/2575-8411.2026.00033；Mingjin Zhang/Jiannong Cao/Tao Wu/Xiangchun Chen/Ne Wang，[Efficient KV Cache Migration for Geo-Distributed LLM Inference in Collaborative Edge Computing](https://arxiv.org/abs/2610.22172) | arXiv 2026-10-15T16:31:19Z；[ICDCS官方日程](https://icdcs2026.icdcs.org/program/main-technical-sessions/)06-22报告；IEEE题录记08-04入Xplore | 2026-10-19 / 2026-10-19 | B；官方题录/摘要/history及会议日程，IEEE文档11619197直接418，首次online未核。同研究别名，近期发现旧研究，不称10月新成果；正文迁移机制未核，暂缓；研究中/启发中/可靠低 |
| arxiv:cond-mat/9610209 v1；doi:10.1103/physrevlett.78.2690；[Jarzynski](https://arxiv.org/abs/cond-mat/9610209) | arXiv 1996-10-30T00:13:42Z / PRL 1997 | 2026-10-19 / 2026-10-19 | C；HTML式1–12/采样，PDF pp2–7补p9估计段，其余浏览；11页未通读，NH式13–17未独立复推。C1旧资料；HTML2026-08-24非新版本 |
| arxiv:1205.4176 v1；doi:10.1088/0034-4885/75/12/126001；[Seifert](https://arxiv.org/abs/1205.4176) | arXiv 2012-05-18T15:18:33Z / RPP 2012 | 2026-10-19 / 2026-10-19 | C；PDF §2.1p11/2.3.1p13/2.3.3p14/3.1.1p19/3.2.1–3pp20–21，补9.3.3p63；105页仅部分，未读统一证明/实验/误差引用。C1同一发现的第二原始来源；限定模型研究中/启发高/可靠高，未视觉；[来源](../../content/sources/nonequilibrium-work-sources.md) |

B 窗口为 2026-10-12T07:30:00+08:00—2026-10-19T07:30:00+08:00，补上次终点 10-16T07:36:46+08 后的遗漏，核查至今日 07:35:33+08。选择性检查 cs.DC/cs.PF/math.OC/physics.soc-ph recent 首屏和 cs.DC/math.OC new，最新可见公告为16日，并做官方出版检索；计划的选择性监测完成，不代表穷尽分页、领域与版本。两项入选首提均早于上次终点，是补遗漏；未确认终点后新成果不能写成没有成果。

### 既有版本与工具入口复查（不计新候选）

| canonical / 入口 | 历史首读 / 最近核查 | 本次范围与决定 |
| --- | --- | --- |
| arxiv:2610.20354、2610.18925、2610.17795、2610.12665、2610.20422 | 见历史 / 2026-10-19 | 官方题录/摘要/history，均仍v1；没有正文增读，不重复推荐 |
| arxiv:2610.15755；[Native Dual Pools](https://arxiv.org/abs/2610.15755) | 2026-10-15 / 2026-10-19 | 仍10-14T05:02:56Z的v2；无新增版本，未比正文，不解除既有正确性缺口 |
| hugo:v0.168.0；[官方release](https://github.com/gohugoio/hugo/releases/tag/v0.168.0) | 2026-10-14 / 2026-10-19 | 仍10-13T17:24:15Z，不重复推荐、不升级 |
| obsidian:desktop:1.14；[官方索引](https://obsidian.md/changelog/) | 见历史 / 2026-10-19 | 最新可见公开公告仍10-05；urllib403但web可读，不将Catalyst日期混作public日期 |
| commonmark:0.31.2；[规范](https://spec.commonmark.org/) | 2026-10-12 / 2026-10-19 | 仍2024-01-28版；入口复查，不重复深读 |

### 新批次与历史归属

本轮从核对的 origin/main `9fc976dfc16a714b99595c17ae631d3e688cdaaf` 开始 `research/batch-2026-10-19`。此前15/16日七项已由 [PR #25](https://github.com/fsyv/fsyv.github.io/pull/25) 合入该基线，故不再列入当前待审清单；合并不自动把 AI 候选改成用户逐项确认。下方历史段落保留其当日状态及失败范围，不能把旧回执沿用到今日提交。

## 2026-10-16

10 份去重候选：A2（Mattson 新来源、Breslau 旧来源增量）/B6 新候选/C2 旧资料；5 次指定部分正文深读：A2/B2/C1，最终 A1/B1/B2/C1 四项。另复查 B5 既有预印本版本和 3 个工具入口，不重复算候选。没有精确搜索命中计数，不称通读或复现。监测整体 partial；[简报](../digests/2026-10-16.md)记录判断，[当日回执](runs/2026-10-16.md)记录后续精确审核、构建与发布结果。

| canonical / 版本 / 原始入口 | 首次发表/提交 | 首读 / 最近读 | 实际范围及决定 |
| --- | --- | --- | --- |
| doi:10.1147/sj.92.0078；[Mattson 等扫描](https://bitsavers.trailing-edge.com/pdf/ibm/IBM_Systems_Journal/092/ibmsj0902B.pdf) | 1970，月日/更早报告未核 | 2026-10-16 / 2026-10-16 | A；印刷82–87/式2–5，辅助78–81；视觉78/83/85/86。今日发现旧资料；A1补栈距离/精确LRU条件，未通读40页。扫描2002元数据不是修订 |
| doi:10.1109/infcom.1999.749260；[作者摘要](https://pages.cs.wisc.edu/~cao/papers/zipf-implications.html)、[作者PS](https://pages.cs.wisc.edu/~cao/papers/zipf-like.ps.gz)、[早稿别名](https://pages.cs.wisc.edu/~cao/papers/zipf-implication/) | 正式1999；ref3记1998-07报告，早稿页脚6/2/1998格式未核 | 2026-10-12 / 2026-10-16 | A；原摘要保留；增读稿p1/6 III续段及III-C/7 IV开头/8–9 IV/V/ref3，视觉1/6/8/9，p5图仅浏览；早稿Model/Drifts/Discussion。同研究2版本不混模型；A1独立模型/相关性边界，未核原轨迹 |
| arxiv:2610.20354 v1；[Grace-Blackwell 微基准](https://arxiv.org/abs/2610.20354) | 2026-10-14T15:30:19Z | 2026-10-16 / 2026-10-16 | B；HTML II-A/B、IV-A TableI部分、IV-C–E、V-A–C、VI-A、VII-A/B、VIII-A–C。B1；放置/访问历史/核计时；未PDF/代码/复现，不称端到端327倍或KV已验证 |
| arxiv:2610.18925 v1；[CacheSmith](https://arxiv.org/abs/2610.18925) | 2026-10-13T00:19:23Z | 2026-10-16 / 2026-10-16 | B；HTML 2.1–2.2/4/5开头式1、5.1/5.3/6.1和6.2 QSA/收益来源段。B2；近似复用/逐请求交集；未PDF/源码/复现，不把离线proxy当每次输出正确保证 |
| arxiv:2610.19822 v1；Daijin Hu，[JointServe: Serving Multi-Model Agents on Memory-Constrained GPUs](https://arxiv.org/abs/2610.19822) | 2026-10-14T08:59:35Z | 2026-10-16 / 2026-10-16 | B；仅官方题录/摘要/history，暂缓。内存约束下权重/KV驻留线索，带宽/恢复/replay未核；研究中/启发中/可靠低 |
| arxiv:2610.20422 v1；Laurie Boveroux、Margarida Carvalho、Andrea Lodi、Quentin Louveaux，[On the Complexity of Linear Programs with Parametric Constraint Matrices](https://arxiv.org/abs/2610.20422) | 2026-10-14T16:15:45Z | 2026-10-16 / 2026-10-16 | B；仅题录/摘要/history，暂缓。矩阵参数区别旧RHS，复杂性/可解条件未核；研究中/启发高/可靠低 |
| arxiv:2610.19405 v1；Javad Mirzaei、Jeebak Mitra，[Scaling LLM Inference via Parallelism: Throughput-Latency Trade-off](https://arxiv.org/abs/2610.19405) | 2026-10-14T01:53:24Z | 2026-10-16 / 2026-10-16 | B；仅题录/摘要/history，暂缓。TTFT/ITL/goodput，负载与并行测量未核；研究中/启发中/可靠低 |
| arxiv:2610.20095 v1；Arthur Rondeau、Alain Barrat、Roland Bouffanais，[Uncovering higher-order interactions from memory in observed dynamics](https://arxiv.org/abs/2610.20095) | 2026-10-14T12:34:03Z | 2026-10-16 / 2026-10-16 | B；仅题录/摘要/history，暂缓。HMM/无高阶null线索，辨识/选择/足球数据未核；研究中/启发高/可靠低 |
| lecture:myerson:nobel:2007-12-08；[作者PDF](https://home.uchicago.edu/rmyerson/research/nobel.pdf) | 2007-12-08 | 2026-10-16 / 2026-10-16 | C；§2 pp3–6、3.1–3.3 pp6–11、p12图5–7/3.4开头，补13–14 §3.4末/3.5；视觉9–10弱不等号。C1旧资料；未全文/1983原论文，不称AER别名已核 |
| nobel:mechanism-design:scientific-background:2007；[委员会背景PDF](https://www.nobelprize.org/uploads/2018/06/advanced-economicsciences2007-1.pdf) | 2007-10-15 | 未读 / 2026-10-16尝试 | C候选；403，未读，不承担结论；讲义Nobel PDF别名同源403不重复计 |

B 窗口为 2026-10-09T07:30:00+08:00—2026-10-16T07:30:00+08:00，核查至07:36:46+08:00；cs.DC/cs.PF/math.OC/cs.LG/physics.soc-ph recent最新可见15日，cs.DC/math.OC new也至15日。选择性筛查未穷尽分页、期刊会议与版本替换；两入选的ACM/USENIX/IEEE/Springer检索没有可确认正式发表。六新候选首次提交均早于昨日终点15日07:36+08，全部为补窗口遗漏；不冒称终点后新成果。

### 既有版本与工具入口复查（另计）

| canonical / 原始入口 | 历史首读 / 最近核查 | 本次范围、纠正和决定 |
| --- | --- | --- |
| arxiv:2610.15755；[Native Dual Pools](https://arxiv.org/abs/2610.15755) | 2026-10-15 / 2026-10-16 | v1首提10-11T16:36:26Z，v2为10-14T05:02:56Z；纠正P15“仅v1”。今日仅题录/摘要/history，未比较正文；continuation correctness未解，不重推 |
| arxiv:2610.17795；[QBA](https://arxiv.org/abs/2610.17795) | 2026-10-15 / 2026-10-16 | history仍仅v1；仅版本入口复查，不重新深读或推荐 |
| arxiv:2610.12665；[Fampa/Lee](https://arxiv.org/abs/2610.12665) | 2026-10-14 / 2026-10-16 | history仍仅v1；同上，不将旧RHS结论迁移到矩阵参数 |
| arxiv:2610.17695；[H-PDLP](https://arxiv.org/abs/2610.17695) | 2026-10-15 / 2026-10-16 | history仍仅v1；仅题录/摘要/版本复查，原证明/基准未核 |
| arxiv:2610.18532；[Tremulant](https://arxiv.org/abs/2610.18532) | 2026-10-15 / 2026-10-16 | history仍仅v1；仅题录/摘要/版本复查，极端尾部统计未核 |
| hugo:v0.168.0；[官方latest API](https://api.github.com/repos/gohugoio/hugo/releases/latest)、[release](https://github.com/gohugoio/hugo/releases/tag/v0.168.0) | 2026-10-14 / 2026-10-16 | 仍为10-13T17:24:15Z版，不重复推荐、不升级本库 |
| obsidian:desktop:1.14.4；[官方索引](https://obsidian.md/changelog/) | 2026-10-12 / 2026-10-16 | 1.14.4 Catalyst为10-01，public 1.14 Desktop公告为10-05；纠正历史把10-05当版本首次日期。未核窗口内新版本，不重推 |
| commonmark:0.31.2；[规范索引](https://spec.commonmark.org/) | 2026-10-12 / 2026-10-16 | 仍0.31.2，2024-01-28；入口复查，旧§1.1–1.3部分范围保留，不计深读 |

## 跨日归属与历史范围

只读聚合以下sources/coverage/run/feedback；没有接受旧候选，也不复制候选正文。完整历史范围可用对应分支的 `research/state/sources.md` 追溯，本分支不伪造不存在的旧简报链接。

- P12 `research/2026-10-12`，`4c2c17e3549a6ec848d32d50185be3d460662a32`：local-only模拟、无PR；历史东京时区/不同模型强度及模拟反馈不构成今天实测或真实偏好。
- P13 `research/2026-10-13`，`d8e2bb2cd2e23af6bb09e73732da1deacb1d0158`：正式候选但run停审核前，无发布成功证据。
- P14 `research/2026-10-14`，`060fba5647fb24fce3e316275abc31312cfffa3a`，[PR #21](https://github.com/fsyv/fsyv.github.io/pull/21)：当日运行时未合并，现已于2026-10-16合并，旧审核/构建/发布回执只属旧SHA。
- P15 `research/2026-10-15`，`513d8cf3d570c01505bc5e1a34a2f492a368f460`，[Draft PR #22](https://github.com/fsyv/fsyv.github.io/pull/22)：未合并；旧候选不进入今日已接受知识。主控07:30:51+08起查询#21/#22的普通评论/review/行级评论各均0，沉默不作反馈。

| 历史canonical / 版本 | 归属；首读 / 历史最近读 | 保留的阅读范围与今日决定 |
| --- | --- | --- |
| doi:10.1037/0022-0663.93.2.390 | P12；10-12 / 10-12 | 2001-06，pp390–397未追引用；仅读账本，不接受模拟外推 |
| hugo:v0.167.0；[release](https://github.com/gohugoio/hugo/releases/tag/v0.167.0) | P12/P13；10-12 / 10-13 | 2026-09-28发布摘要/Security/Note/Bug fixes及入口；不重推 |
| arxiv:physics/0004057 v1；doi:10.48550/arxiv.physics/0004057 | P12；10-12 / 10-12 | 稿1999-09-30，arXiv2000-04-24；摘要/HTML主要章节，信息瓶颈；不复制候选 |
| book:sutton-barto:reinforcement-learning:2e；[书PDF](http://incompleteideas.net/book/RLbook2020.pdf) | P13；10-13 / 10-13 | 2018二版，PDF版权2018/2020；§4.2印刷76–80/PDF98–102及辅助页，非全书 |
| jmlr:21:178；[期刊入口](https://jmlr.org/papers/v21/20-081.html) | P13；10-12 / 10-13 | 会议2018/扩展2020；§3.4p10/§4p11式4–5/Theorem1增读，保留旧id，不接受分支结论 |
| arxiv:2610.08378 v1；Lachesis | P13；10-13 / 10-13 | 10-06T14:02:19Z；§2.2–2.3/3.2–3.5/4/5.1–5.5部分；不重推 |
| arxiv:2610.07643 v1；LORE-KV | P13；10-13 / 10-13 | 10-06T02:36:50Z；§3/4.4–4.5/5、附录C.3–C.4/E.1及局部表；不重推 |
| arxiv:2610.07782 v1 | P13；10-13 / 10-13 | 10-06T05:17:44Z；题录/摘要，正文未核 |
| doi:10.1038/s41467-026-77672-0；arxiv:2501.15552 v2 | P13；10-13 / 10-13 | 预印本2025-01-26/v2 01-28，期刊2026-10-08；题录/摘要/版本，正文受阻；同研究合并 |
| arxiv:2610.08735 v1 | P13；10-13 / 10-13 | 10-06T17:37:24Z；Online Inverse Optimization题录/摘要，证明未核 |
| doi:10.1214/09-ss057；[Pearl重印](https://ftp.cs.ucla.edu/pub/stat_ser/r350-reprint.pdf) | P13；10-13 / 10-13 | 2009，校注日未知；印刷106–115/117指定部分及关键图；不重推 |
| arxiv:1509.01330 v1；CRANE | P14；10-12 / 10-14 | 2015-09-04T02:21:30Z；p1、§III–V pp2–6/§VI pp6–7指定部分，视觉p5；单位/ILP边界保留 |
| doi:10.1016/j.jpdc.2018.12.003；[作者PDF](https://clouds.cis.unimelb.edu.au/papers/DataStorageClouds-JPDC.pdf) | P14；10-12 / 10-14 | 在线2018-12-21/印刷2019-04；p121/125–128模型/131–132 §6.2/7，视觉125/126/132，浏览133；Algo2计费待澄清 |
| arxiv:2610.12665 v1 | P14；10-14 / 10-14 | 10-08T19:42:49Z；HTML§1–3重点2–3，cone证书/100%rule；今日版本另核，不复制候选 |
| arxiv:2610.11114 v1；IAPRepair | P14；10-14 / 10-14 | 10-08T02:36:00Z；III、IV-A/B/C、V、VI-A/B/C部分；约束/性能口径原因排除 |
| arxiv:2610.13060 v1；KV-Repurpose | P14；10-14 / 10-14 | 10-09T06:17:10Z；题录/摘要，质量和实现未核 |
| arxiv:2610.11909 v1；Fiedler dimension | P14；10-14 / 10-14 | 10-08T13:09:16Z；题录/摘要，bundled network假设/证明未核 |
| [Higham条件数](https://nhigham.com/2020/03/19/what-is-a-condition-number/) | P14；10-14 / 10-14 | 2020-03-19；短文定义/公式/Jacobian/算例，未追书 |
| [Higham稳定性](https://nhigham.com/2020/08/04/what-is-numerical-stability/) | P14；10-14 / 10-14 | 首发2020-08-04/显示修订08-11；正文前向/后向/mixed/外积，未追书，Other relevant points4疑义未采用 |
| usenix:osdi99:castro-liskov:pbft；[官方HTML](https://www.usenix.org/legacy/publications/library/proceedings/osdi99/full_papers/castro/castro_html/node4.html) | P15；10-12 / 10-15 | 1999-02；原摘要/§4开头/4.1，增§2–3/4.2/4.4/4.5.1–2；未完整形式证明，PDF失败 |
| arxiv:2512.09961 v1 | P15；10-12 / 10-15 | 2025-12-10T02:52:41Z；原III–VIII范围保留，增VI–VII指定段/p7式27/p8式28–29选择同步Commit/p9VII-A1/B及III-A OMC；截图不全 |
| arxiv:2610.17795 v1；QBA | P15；10-15 / 10-15 | 10-13T06:22:27Z；II-A/B/C、III-A4–6/B、IV-A–E及TableII部分，未PDF/源码/原轨迹；今日仅版本复查 |
| arxiv:2610.15755 v1；Native Dual Pools | P15；10-15 / 10-15 | v1正文II/III指定部分、IV-A/D/E、V-A/D/E、VI，未附录/源码；continuation正确性未解排除；版本纠正见上 |
| arxiv:2610.18532 v1；Tremulant | P15；10-15 / 10-15 | 10-13T15:17:21Z；题录/摘要，冷暖分类/极端分位未核；今日仅版本复查 |
| arxiv:2610.17695 v1；H-PDLP | P15；10-15 / 10-15 | 10-13T04:23:01Z；题录/摘要，证明/实现/基准未核；今日仅版本复查 |
| arxiv:2610.17764 v1 | P15；10-15 / 10-15 | 10-13T05:48:14Z；题录/摘要，空间共演化平均场/模拟未核 |
| arxiv:2610.18506 v1 | P15；10-15 / 10-15 | 10-13T15:00:41Z；题录/摘要，高阶社会困境微观/宏观关系未核 |
| doi:10.1146/annurev.es.04.110173.000245；[Holling扫描](https://sciences.ucf.edu/biology/d4lab/wp-content/uploads/sites/23/2024/08/Holling-1973.pdf) | P15；10-15 / 10-15 | 1973-11-01；印刷1–6/14定义/17–21，其余检索上下文；IIASA/重印Anubis受阻 |
| doi:10.1038/nature08227；[Scheffer等PDF](https://pdodds.w3.uvm.edu/files/papers/others/2009/scheffer2009a.pdf) | P15；10-15 / 10-15 | 2009-09-03；53–55 Theory/Boxes1–3/Fig1–2图注、57–58 Outlook；56/补充/引用未深核；Box2为transcritical |

历史日期表中的10-xx首/最近读取均为2026年；P15的Native和Obsidian错误已显式纠正，其他未读部分没有升级为已核。
