# 已处理资料与版本

公开来源去重账本。DOI 统一小写，arXiv 以基础 ID 去重、版本单列；同一资料的 HTML/PDF/期刊入口合并，不把题录、搜索命中或官方入口复查算为正文深读。候选分支未合并，不是已接受知识。

## 2026-10-15

10 份去重候选（A2 既有来源增读 / B6 新候选 / C2 旧资料），6 次指定部分正文深读（A2/B2/C2），另复查 3 个已处理官方版本入口；最终 A1/B1/C1 三项。没有精确搜索命中计数，不声称通读或复现实验。三通道均完成交接，整体监测仍 partial；证据与价值判断见[简报](../digests/2026-10-15.md)，独立审核/构建/发布精确状态见[当日回执](runs/2026-10-15.md)。

| 规范标识 / 版本 / 入口 | 首次发表/提交 | 首读 / 最近读 | 实际读取范围 | 决定与增量 |
| --- | --- | --- | --- | --- |
| usenix:osdi99:castro-liskov:pbft；[官方HTML](https://www.usenix.org/legacy/publications/library/proceedings/osdi99/full_papers/castro/castro_html/node4.html) | 1999-02；HTML独立修订日期未知 | 2026-10-12 / 2026-10-15 | A；原摘要/§4开头/4.1保留；今日§2–3、4.2、4.4、4.5.1–2，未读所引完整形式化证明；PDF失败 | A1既有来源增量：对象绑定及 prepared→commit→新view继承；不当完整协议证明，沿用来源id 71f86c5c-244f-4028-9c96-31ac87f8126d |
| arxiv:2512.09961 v1；[题录](https://arxiv.org/abs/2512.09961) | 2025-12-10T02:52:41Z | 2026-10-12 / 2026-10-15 | A；原III–VIII HTML范围保留；今日VI–VII指定段落，PDF p.7式27/p.8式28–29和选择/同步/Commit/p.9 VII-A1/B，补III-A OMC；截图不完整 | A1增量：候选池、有效收票/赞成门槛、异构联合更新边界；沿用来源id 085527f2-9a7b-5d73-a7b7-e60c9b13cb86，不裁定实现不安全 |
| arxiv:2610.17795 v1；[Quota-Based Aging for Prediction-Guided Scheduling in LLM Serving](https://arxiv.org/abs/2610.17795)；Hanzhi Zhang/Anxuan Che/Hang Qi/Qiyue Li/Jingjin Wu | 2026-10-13T06:22:27Z | 2026-10-15 / 2026-10-15 | B；HTML II-A/B/C、III-A4–6/B、IV-A–E指定部分及Table II；未核PDF/源码/原轨迹，未复现 | B1窗口内新预印本、补昨日遗漏；扩展SLO类别/聚合/证据层次，不称全面占优/部署/无条件无饥饿 |
| arxiv:2610.15755 v1；[Native Dual Pools or Shared Paging? Memory Organization for Concurrent Hybrid LLM Serving](https://arxiv.org/abs/2610.15755)；Dongwook Kang | 2026-10-11T16:36:26Z | 2026-10-15 / 2026-10-15 | B；HTML II/III指定部分、IV-A/D/E、V-A/D/E、VI；未读附录/源码 | 深读后排除性能/部署结论：VI continuation正确性未解决；V-E Q9交互+14.3%、95%CI[-0.1,+30.8]含零。仅记边界，不转永久笔记 |
| arxiv:2610.18532 v1；[Tremulant: Latency in Serverless Platforms beyond the 99th Percentile](https://arxiv.org/abs/2610.18532)；Linus Gustafsson/Trever Schirmer/David Bermbach | 2026-10-13T15:17:21Z | 2026-10-15 / 2026-10-15 | B；仅题录/摘要 | 暂缓：warm starts极端尾部线索，未核冷暖分类/样本/极端分位统计，不计深读 |
| arxiv:2610.17695 v1；[H-PDLP: GPU-Accelerated Linear Programming via Generalized PDHG and Homogeneous Self-Dual Embedding](https://arxiv.org/abs/2610.17695)；Haihao Lu/Bo Tang | 2026-10-13T04:23:01Z | 2026-10-15 / 2026-10-15 | B；仅题录/摘要 | 暂缓：求解/不可行证书不同于昨日RHS敏感性；证明/实现/基准未核，不计深读 |
| arxiv:2610.17764 v1；[Replacement distance controls growth at long wavelengths in a coevolving spatial network](https://arxiv.org/abs/2610.17764)；Ruiwu Niu/Ming Yuan/Ying-kit Wong | 2026-10-13T05:48:14Z | 2026-10-15 / 2026-10-15 | B；仅题录/摘要 | 暂缓：网络生成假设线索，未核平均场与模拟，不计深读 |
| arxiv:2610.18506 v1；[Directed percolation in higher-order social dilemmas](https://arxiv.org/abs/2610.18506)；Pablo Villegas/Sandro Meloni | 2026-10-13T15:00:41Z | 2026-10-15 / 2026-10-15 | B；仅题录/摘要 | 暂缓：微观交互/宏观行为辨识线索，未核配对记忆/推导/普适性，不推广高阶交互可普遍约化 |
| doi:10.1146/annurev.es.04.110173.000245；[Holling期刊扫描](https://sciences.ucf.edu/biology/d4lab/wp-content/uploads/sites/23/2024/08/Holling-1973.pdf) | 1973-11-01 | 2026-10-15 / 2026-10-15 | C；印刷pp.1–6、p.14定义段、pp.17–21；其余只检索上下文。PDF首张JSTOR封面；IIASA/重印本Anubis拒绝 | C1近期发现旧资料，stability/resilience与吸引域；与下篇合并一来源页，仍计两份资料 |
| doi:10.1038/nature08227；[Scheffer等大学PDF](https://pdodds.w3.uvm.edu/files/papers/others/2009/scheffer2009a.pdf) | 2009-09-03 | 2026-10-15 / 2026-10-15 | C；pp.53–55 Theory/Boxes1–3/Fig1–2图注、pp.57–58 Outlook；p.56展开/引用/补充材料未深核；网页超时后内存PDF读取成功 | C1旧资料：局部减速的条件与误报漏报；Box2为transcritical，教学模型/系统联系另标AI候选 |

B 六篇题录本轮均只列 v1，未核到新版本；arXiv-issued DOI 标 pending registration，主键采用基础 arXiv ID。窗口为 2026-10-08T07:36:00+08:00—2026-10-15T07:36:00+08:00。四类别 recent/new 最新可见10-14，但分页/选择性筛查不完整；API 对昨日终点后 UTC 202610132336—202610142336 均返回0，日期搜索无命中也不能证明无成果。尚未穷尽期刊会议、其他类别和全部版本替换，下次优先补今日终点后的公告可见性。

### 已处理官方入口复查（另计）

| canonical / 入口 | 首次发表 | 首读 / 最近核查 | 今日范围与决定 |
| --- | --- | --- | --- |
| hugo:v0.168.0；[官方release](https://github.com/gohugoio/hugo/releases/tag/v0.168.0) | 2026-10-13T17:24:15Z | 2026-10-14 / 2026-10-15 | 官方latest API仍为此版；昨日已推荐，今日不重复算候选、不升级本库 |
| obsidian:desktop:1.14.4；[发布索引](https://obsidian.md/changelog/) | 2026-10-05 | 2026-10-12 / 2026-10-15 | 官方索引复查，无本次核实的新版本增量；不把入口复查算深读 |
| commonmark:0.31.2；[规范索引](https://spec.commonmark.org/) | 2024-01-28 | 2026-10-12 / 2026-10-15 | 官方版本入口复查，无本次核实的新版本增量；旧§1.1–1.3部分范围保留 |

## 跨日来源归属

只读聚合以下分支的 sources/coverage/run/feedback；这些是可追溯的去重与运行记录，不复制候选知识正文，也不生成指向本分支不存在的旧简报链接。

- P12：research/2026-10-12，commit `4c2c17e3549a6ec848d32d50185be3d460662a32`，local-only模拟、无PR；run记录的是历史模拟及不同模型强度/东京时区，不能沿用为今日实测。唯一反馈为明确标注模拟的记录，不是真实偏好。
- P13：research/2026-10-13，commit `d8e2bb2cd2e23af6bb09e73732da1deacb1d0158`，正式候选但run停在独立审核前，无发布成功证据；未有当日反馈文件。
- P14：research/2026-10-14，commit `060fba5647fb24fce3e316275abc31312cfffa3a`，[Draft PR #21](https://github.com/fsyv/fsyv.github.io/pull/21) 尚未合并；run记录独立审核/构建/发布成功，不能替代今日验证。主控今日采集普通评论/review/行级评论均0；沉默不等于接受或偏好。

### P12/P13 历史来源（今日仅读账本）

| canonical / 别名 | 来源归属；首读 / 历史最近读 | 实际历史范围与今日决定 |
| --- | --- | --- |
| doi:10.1037/0022-0663.93.2.390 | P12；2026-10-12 / 2026-10-12 | 2001-06；pp.390–397，未追引用；不重复推荐，不接受模拟外推 |
| hugo:v0.167.0；https://github.com/gohugoio/hugo/releases/tag/v0.167.0 | P12/P13；2026-10-12 / 2026-10-13 | 2026-09-28；发布摘要/Security/Note/Bug fixes及入口；旧版不重复推荐 |
| arxiv:physics/0004057 v1；doi:10.48550/arxiv.physics/0004057 | P12；2026-10-12 / 2026-10-12 | 稿署1999-09-30，arXiv2000-04-24；摘要/HTML主要章节，信息瓶颈；不复制候选理解 |
| book:sutton-barto:reinforcement-learning:2e；http://incompleteideas.net/book/RLbook2020.pdf | P13；2026-10-13 / 2026-10-13 | 第二版2018，所读PDF版权2018/2020；§4.2印刷76–80/PDF98–102及辅助指定页，非全书；不重复读 |
| jmlr:21:178；https://jmlr.org/papers/v21/20-081.html | P13；2026-10-12 / 2026-10-13 | 会议2018/期刊扩展2020；增读§3.4 p.10/§4 p.11式4–5/Theorem1；保留既有来源id，不接受分支结论 |
| arxiv:2610.08378 v1；Lachesis | P13；2026-10-13 / 2026-10-13 | 首提2026-10-06T14:02:19Z；§2.2–2.3/3.2–3.5/4/5.1–5.5部分；不重复推荐 |
| arxiv:2610.07643 v1；LORE-KV | P13；2026-10-13 / 2026-10-13 | 首提2026-10-06T02:36:50Z；§3/4.4–4.5/5、附录C.3–C.4/E.1及局部表格；不重复推荐 |
| arxiv:2610.07782 v1 | P13；2026-10-13 / 2026-10-13 | 首提2026-10-06T05:17:44Z；仅题录/摘要，未核正文；不补推为结论 |
| doi:10.1038/s41467-026-77672-0；arxiv:2501.15552 v2 | P13；2026-10-13 / 2026-10-13 | 预印本2025-01-26/v2 01-28，期刊2026-10-08；官方摘要/题录/版本，正文受阻，同研究合并去重 |
| arxiv:2610.08735 v1 | P13；2026-10-13 / 2026-10-13 | 首提2026-10-06T17:37:24Z；Optimal and Efficient Online Inverse Optimization，仅题录摘要；未核证明 |
| doi:10.1214/09-ss057；https://ftp.cs.ucla.edu/pub/stat_ser/r350-reprint.pdf | P13；2026-10-13 / 2026-10-13 | 2009，PDF校注日期未知；Pearl印刷106–115/117指定部分及关键图；不重复推荐 |

Obsidian/CommonMark 的 P12/P13/P14 发布说明/入口历史范围与今日复查合并在上方，不重复计资料。

### P14 历史来源（今日仅读账本，Hugo 已合并到复查表）

| canonical / 版本 / 入口 | 首次发表/提交；首读 / 历史最近读 | 实际历史范围与今日决定 |
| --- | --- | --- |
| arxiv:1509.01330 v1；CRANE | 2015-09-04T02:21:30Z；2026-10-12 / 2026-10-14 | PDF p.1、§III–V pp.2–6/§VI pp.6–7指定部分，视觉p.5；单位/ILP仍有局限，不重复推荐 |
| doi:10.1016/j.jpdc.2018.12.003；https://clouds.cis.unimelb.edu.au/papers/DataStorageClouds-JPDC.pdf | 在线2018-12-21/印刷2019-04；2026-10-12 / 2026-10-14 | p.121、pp.125–128模型/启发式、pp.131–132 §6.2/7，视觉125/126/132，浏览133；Algo2计费待澄清，不转入今日正文 |
| arxiv:2610.12665 v1 | 2026-10-08T19:42:49Z；2026-10-14 / 2026-10-14 | Fampa/Lee HTML §1–3重点2–3；cone证书/100%rule区分；不复制未合并优化地图或结论 |
| arxiv:2610.11114 v1；IAPRepair | 2026-10-08T02:36:00Z；2026-10-14 / 2026-10-14 | III、IV-A/B/C、V、VI-A/B/C指定部分；因约束符号/性能口径排除，未因旧记录升级 |
| arxiv:2610.13060 v1；KV-Repurpose | 2026-10-09T06:17:10Z；2026-10-14 / 2026-10-14 | 仅题录摘要，质量/实现未核；今日暂缓 |
| arxiv:2610.11909 v1；Fiedler dimension | 2026-10-08T13:09:16Z；2026-10-14 / 2026-10-14 | 仅题录摘要，bundled network假设/证明未核；今日暂缓 |
| https://nhigham.com/2020/03/19/what-is-a-condition-number/ | 2020-03-19；2026-10-14 / 2026-10-14 | 短文正文/公式/定义/Jacobian/算例，未追书；旧探索不复制候选 |
| https://nhigham.com/2020/08/04/what-is-numerical-stability/ | 首发2020-08-04/显示修订08-11；2026-10-14 / 2026-10-14 | 正文/公式/前向/后向/mixed/外积，未追书；Other relevant points第4条疑义未作依据 |
