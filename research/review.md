# 知识研究待审 · 2026-10-21 起

本批次于 2026-10-21 从核对过的 origin/main `af525f779464752dfa4d08a8e895dc54cd93ef81` 开始唯一 `research/batch-2026-10-21`。2026-10-20 四项已由 [PR #28](https://github.com/fsyv/fsyv.github.io/pull/28) 合入，不再重复待审；[10-20 晨报](digests/2026-10-20.md)、历史来源与判断归属保留，合并不自动升级 endorsement。

本批次累计24项AI候选：10-21、22、23、26各四项，10-28五项，10-29三项。[最新晨报](digests/2026-10-29.md)直接展开推导、证据和边界；往期全文保留在同一PR。fsyv于10-28评论要求2026-10-28/A1[继续深入](https://github.com/fsyv/fsyv.github.io/pull/29#issuecomment-6458746818)，评论ID6458746818、时间2026-10-28T02:09:18Z；仅表示研究请求，相关结论仍待审。

| 日期 / 发现 | 具体提议与依据 | 知识位置及接受范围 | 决定 |
| --- | --- | --- | --- |
| 2026-10-21/A1 | [公开固定缓存样本](../content/sources/paper-twitter-cache-workloads.md)中，保留计数的文件序/单次排列有不同 LRU 命中，新增可复算数据对照及非严格时间序/操作寿命边界 | 扩[Zipf](../content/notes/probability-zipf.md#public-sample-projection)、基础验证问题与概率图；仅接受声明模型内的有限 GET 计算，不接受生产命中、样本代表性、策略优越或完整回放已完成 | 待审 |
| 2026-10-21/B1 | [PlaneZip 指定正文](../content/sources/paper-planezip.md)显示压缩表示改变传输成本和可行窗口，须重做准入/排序/重算；120 MB 算例为 AI 复算 | 扩[张量存活解释](../content/notes/tensor-liveness-and-peak-memory.md#compression-and-offload)和优化/推理路径；接受建模方法，不把 13%→9% 模拟残余开销写成吞吐提高 31%，不含硬件原型或推理 KV 收益 | 待审 |
| 2026-10-21/B2 | [铁路雨驱模型](../content/sources/paper-climate-transport-collapse.md)把结构、注入、传播和吸收分开；原阈值为近似，另给保留列随机/α/截断条件的 AI 增长充分界和反例 | 新[完整解释](../content/notes/transport-delay-propagation-and-thresholds.md)，扩网络/生态语义链接与概率图；接受限定模型与证据口径，不认定现实已崩溃，不搬阈值到生态或存储 | 待审 |
| 2026-10-21/C1 | [Hubble 1929 六页原文](../content/sources/hubble-velocity-distance-1929.md)提供异质距离、太阳修正和共同运动事实；共同尺度与系数抵消为 AI 代数推导，Table 2 反算距离不独立验证 | 新[天文解释](../content/notes/velocity-distance-and-calibration.md)与[地图](../content/maps/astronomy-and-observational-inference.md)，双向关联数值分析；不补现代 H₀、归功史或未读独立标定结论 | 待审 |
| 2026-10-22/A1 | [论文方法及作者 2021/2023 官方说明](../content/sources/paper-twitter-cache-workloads.md#metadata-followup)补请求采样配置、论文/公开实例范围与排序修复；百万样本一般说明与固定文件 80,000 行未闭合 | 扩[Zipf 候选修订](../content/notes/probability-zipf.md#sample-scope-followup)、基础验证问题及概率图；接受范围/版本分层，暂缓具体百万前缀、遗漏率、生产代表性与完整语义回放，问题 open | 待审 |
| 2026-10-22/B1 | [KPage 指定正文](../content/sources/paper-kpage.md)保留稀疏图，以页压实/Q tile/页对 mask 减少物理填充；384→96→128 行为 AI 布局算例 | 扩[时空注意力执行解释](../content/notes/attention-spatiotemporal.md#physical-execution)及推理图；接受固定图与执行层区分，性能限于 BSA 耗时÷KPage 耗时的 kernel 对照，不接受未知 GPU、元数据摊销、整模型或 KV 分页收益 | 待审 |
| 2026-10-22/B2 | [预算准入指定正文及证明](../content/sources/paper-timestamped-admission.md)区分外生二值状态的概率分配、校准覆盖和未知标签占额的逐前缀保护；32 guarded 决定全无正动作 | 新[完整解释](../content/notes/timestamped-admission-and-prefix-budgets.md)，扩 SLO 与存储图；接受三层保证及分母条件，暂缓正动作 guard、真实标签和内生多单元容量部署保证，不将两定理收益拼接 | 待审 |
| 2026-10-22/C1 | [Vine/Matthews 1963 三页原文](../content/sources/vine-matthews-oceanic-magnetic-anomalies-1963.md)提出地壳记录地磁历史并外移的机制，明确非详细拟合及强弱磁化替代；一阶投影/年龄—位置/单位例为 AI 推导 | 新[完整地球物理解释](../content/notes/oceanic-magnetic-anomalies-and-spreading.md)与[地图](../content/maps/geophysics-and-inverse-evidence.md)，双向关联天文标尺的结构类比；不将异常正负直接当极性，不宣称独立年代或完整板块理论已由此验证 | 待审 |
| 2026-10-23/A1 | [Dwork等2015指定正文](../content/sources/dwork-adaptive-data-analysis-2015.md)与AI独立坐标反例/固定族统一界，分开诚实挑优、自适应生成、签名执行和泛化 | 新[统计解释](../content/notes/adaptive-validation-and-holdout-reuse.md)，扩学习共识/评价问题及概率/Web3图；接受限定推理，不认定应用协议泄漏、操纵或实现漏洞，不假iid缓存流量 | 待审 |
| 2026-10-23/B1 | [RISK-KV指定方法/表](../content/sources/paper-risk-kv.md)区分历史raw省略、共享predictor净成本、均值门禁/逐请求违约和局部恢复计时；摊销算例为AI假设 | 扩[既有KV成本](../content/notes/kv-cache-optimization.md#selective-reconstruction)及相关机制/SLO/地图；接受评价条件，暂缓长期GPU净省、无线迁移、生成正确性和生产收益 | 待审 |
| 2026-10-23/B2 | [文档摄取指定正文](../content/sources/paper-silent-cue-loss.md)的rawcue/role对照与任务定义，AI两文件反例说明文字相同仍可丢失所需区别；micro/macro分开 | 新[文档表示解释](../content/notes/document-cues-and-semantic-preservation.md)，扩知识实践及拆分问题；接受任务相关信息保留，不由标记任务推人类学习、笔记拆分有效或本库格式改造 | 待审 |
| 2026-10-23/C1 | [Stroop1935指定原文/表图](../content/sources/stroop-interference-1935.md)区分任务/错误罚时/计量与非同期练习差分；作者习惯解释不等于唯一机制 | 新[心理学解释](../content/notes/stroop-interference-and-experimental-controls.md)及[地图](../content/maps/experimental-psychology-and-inference.md)，关联DNA识别与知识实践；不外推临床、现代零效应或Transformer机制 | 待审 |
| 2026-10-26/A1 | [Rocksteady指定正文](../content/sources/paper-rocksteady.md)补早转归属、PriorityPull与源恢复依赖目标日志尾部；AI单侧恢复反例及迁移率/请求完成反向对照 | 扩[迁移解释](../content/notes/storage-placement-and-migration.md#early-ownership-and-recovery)、两存储问题及地图；接受分层设计与评价，暂缓当时ongoing恢复扩展的实现保证、跨DC服务与旧计费/多源澄清 | 待审 |
| 2026-10-26/B1 | [uGDS指定正文](../content/sources/paper-ugds.md)区分CPU控制、SSD→GPU数据与完成顺序，单流callback等待与raw接口契约限定有效路径收益 | 扩[KV访问解释](../content/notes/kv-cache-optimization.md#direct-storage-and-ordering)及存储/推理图；接受测量与语义条件，暂缓POSIX透明替换、混合负载/长期稳定和通用生产收益，不把logicalKV吞吐当SLO-goodput | 待审 |
| 2026-10-26/B2 | [修复感知剪枝指定正文](../content/sources/paper-repair-aware-depth-pruning.md)及AI复合目标/组合复算，有限评分最优不保独立能力，Gemma不可fold与wall成本保留 | 新[完整解释](../content/notes/depth-pruning-and-repair.md)，扩优化/推理图及方法链接；接受目标/有限最优/任务评价区分，暂缓通用greedy保证、所有模型同大小速度和部署收益 | 待审 |
| 2026-10-26/C1 | [Reynolds1883指定原文/表图](../content/sources/reynolds-pipe-flow-1883.md)区分半径尺度、染料与下游阻力判据，现代Re/时间尺度和两条TableI乘积为AI推导 | 新[完整管流解释](../content/notes/reynolds-similarity-and-transition.md)与[流体地图](../content/maps/fluid-mechanics-and-dynamic-similarity.md)，生态仅结构类比；接受条件解释与复算，暂缓普适阈值、现代稳定性及生态状态映射 | 待审 |
| 2026-10-28/A1 | [TDC公开定义](../content/sources/published-tdc-cache-2025.md#reward-followup)、[Ng等指定定理](../content/sources/ng-harada-russell-reward-shaping-1999.md)及AI有限和/两槽反例，区分持续差分等价、终端项与处罚缩放 | 扩[缓存学习](../content/notes/cooperative-caching-and-learning.md#reward-and-horizon)、策略改进链接/原问题及Web3图；接受限定代数与目标分层，暂缓实际state/done/bootstrap、误差证书、算法缺陷或部署收益判断 | 继续深入；结论待审 |
| 2026-10-28/A2 | [交通旧源回访](../content/sources/paper-climate-transport-collapse.md#implementation-followup)与AI精确截断收支、固定/时变交换反例；负总净输入与每步连通仍不足保证有界 | 扩[交通解释](../content/notes/transport-delay-propagation-and-thresholds.md#clipped-balance)及概率图；接受模型内推导与有理数核算，不当真实铁路复现、普遍稳定判据或作者固定矩阵场景失效证明 | 待审 |
| 2026-10-28/B1 | [WorldPager指定正文](../content/sources/paper-worldpager.md)的pose预测/stale fallback、KV等待分母、尾部反例与长间隔质量；带宽算例为AI | 扩[KV解释](../content/notes/kv-cache-optimization.md#predictive-prefetch-and-staleness)及推理图；接受容量/检索语义/等待/质量分层，暂缓普适零等待、实时生成、LLM部署与官方基线排名 | 待审 |
| 2026-10-28/B2 | [Claim Smoothing指定正文](../content/sources/paper-claim-smoothing.md)分开支持引用与整组证据范围，四臂比较及73claim测量边界；原文alpha不一致保留 | 新[结论范围解释](../content/notes/claim-scope-and-evidence-synthesis.md)，扩输入表示与知识实践图；接受同方面支持/限制/反证审计，暂缓模型裁判自动确认、客观风险比和人类理解效果 | 待审 |
| 2026-10-28/C1 | [Rutherford/Soddy1902指定原文/图](../content/sources/rutherford-soddy-radioactivity-1902.md)分开分离、持续生成、混合测量与残余假设；一阶有效模型/4天表为AI | 新[放射活性解释](../content/notes/radioactive-equilibrium-and-separation.md)与[地图](../content/maps/radiochemistry-and-transformation.md)，DNA仅结构类比；接受受限机制与测量边界，暂缓现代核素身份、精确半衰、残余机制和定年应用 | 待审 |
| 2026-10-29/A1 | 响应10-28/A1继续深入；[TDC入口核查](../content/sources/published-tdc-cache-2025.md#implementation-search)、[Ng指定原文](../content/sources/ng-harada-russell-reward-shaping-1999.md#terminal-followup)与AI统一恒等式/最小反例，分开真终端、截断、重置和处罚缩放 | 扩[原缓存学习解释](../content/notes/cooperative-caching-and-learning.md#terminal-bootstrap-followup)、原问题与Web3路径；仅提议限定推导，实际实现审计因未定位作者代码入口未完成，不认定算法缺陷 | 待审 |
| 2026-10-29/B1 | [EdgePace指定正文](../content/sources/paper-edgepace.md)区分观测年龄、前景deadline、后台吞吐及Hold后实际排空；保留同负载取舍 | 扩[SLO解释](../content/notes/storage-latency-and-slo.md#freshness-and-actuation)与存储路径；接受评价对象分层，不接受profile作WCET或机器人闭环质量改善 | 待审 |
| 2026-10-29/C1 | [Snow1855指定原文](../content/sources/snow-cholera-water-supply-1855.md)与AI率比重算；分开局部交错/全供水区、死亡/房屋与部分供水归类推算 | 新[完整解释](../content/notes/water-supply-comparison-and-denominators.md)和[历史流行病学地图](../content/maps/epidemiology-and-natural-experiments.md)；接受限定历史比较，不接受个人风险、随机实验或未核第三行修订 | 待审 |

## 每日简报源文件

- [2026-10-29](digests/2026-10-29.md)
- [2026-10-28](digests/2026-10-28.md)
- [2026-10-26](digests/2026-10-26.md)
- [2026-10-23](digests/2026-10-23.md)
- [2026-10-22](digests/2026-10-22.md)
- [2026-10-21](digests/2026-10-21.md)

## 审核范围

可按“日期/发现 + 接受、暂缓或拒绝 + 小节/理由”决定，也可仅接受一部分；继续探索与接受内容分别记录。各行保留对应来源、知识修改与尚缺证据。旧候选不因新增研究或沉默被接受；限定理论不关闭样本/生产、状态/终端、恢复/控制、独立能力或机制识别问题，也不自动调整长期权重。

本轮特别保留A1实际实现审计未完成、B1实测调度非硬实时保证、C1房屋分母及部分归类推算三项边界。[今日回执](state/runs/2026-10-29.md)记录独立审核和同SHA构建的实际状态；[10-28](state/runs/2026-10-28.md)、[10-26](state/runs/2026-10-26.md)、[10-23](state/runs/2026-10-23.md)、[10-22](state/runs/2026-10-22.md)与[10-21](state/runs/2026-10-21.md)仅覆盖各自历史SHA，不能替代新内容审核。
