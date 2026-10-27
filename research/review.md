# 知识研究待审 · 2026-10-21 起

本批次于 2026-10-21 从核对过的 origin/main `af525f779464752dfa4d08a8e895dc54cd93ef81` 开始唯一 `research/batch-2026-10-21`。2026-10-20 四项已由 [PR #28](https://github.com/fsyv/fsyv.github.io/pull/28) 合入，不再重复待审；[10-20 晨报](digests/2026-10-20.md)、历史来源与判断归属保留，合并不自动升级 endorsement。

本批次现累计2026-10-21、10-22、10-23、10-26各四项与10-28五项，共二十一项AI候选，尚未获用户逐项确认。[最新晨报](digests/2026-10-28.md)、[10-26晨报](digests/2026-10-26.md)、[10-23晨报](digests/2026-10-23.md)、[10-22晨报](digests/2026-10-22.md)与[10-21晨报](digests/2026-10-21.md)分别完整展开问题、机制、数据及边界；本页只维护累计决定，正文不复制到第二处。当前PR29仍open draft，主控未取得新增真实评论，沉默不构成接受或拒绝。

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
| 2026-10-28/A1 | [TDC公开定义](../content/sources/published-tdc-cache-2025.md#reward-followup)、[Ng等指定定理](../content/sources/ng-harada-russell-reward-shaping-1999.md)及AI有限和/两槽反例，区分持续差分等价、终端项与处罚缩放 | 扩[缓存学习](../content/notes/cooperative-caching-and-learning.md#reward-and-horizon)、策略改进链接/原问题及Web3图；接受限定代数与目标分层，暂缓实际state/done/bootstrap、误差证书、算法缺陷或部署收益判断 | 待审 |
| 2026-10-28/A2 | [交通旧源回访](../content/sources/paper-climate-transport-collapse.md#implementation-followup)与AI精确截断收支、固定/时变交换反例；负总净输入与每步连通仍不足保证有界 | 扩[交通解释](../content/notes/transport-delay-propagation-and-thresholds.md#clipped-balance)及概率图；接受模型内推导与有理数核算，不当真实铁路复现、普遍稳定判据或作者固定矩阵场景失效证明 | 待审 |
| 2026-10-28/B1 | [WorldPager指定正文](../content/sources/paper-worldpager.md)的pose预测/stale fallback、KV等待分母、尾部反例与长间隔质量；带宽算例为AI | 扩[KV解释](../content/notes/kv-cache-optimization.md#predictive-prefetch-and-staleness)及推理图；接受容量/检索语义/等待/质量分层，暂缓普适零等待、实时生成、LLM部署与官方基线排名 | 待审 |
| 2026-10-28/B2 | [Claim Smoothing指定正文](../content/sources/paper-claim-smoothing.md)分开支持引用与整组证据范围，四臂比较及73claim测量边界；原文alpha不一致保留 | 新[结论范围解释](../content/notes/claim-scope-and-evidence-synthesis.md)，扩输入表示与知识实践图；接受同方面支持/限制/反证审计，暂缓模型裁判自动确认、客观风险比和人类理解效果 | 待审 |
| 2026-10-28/C1 | [Rutherford/Soddy1902指定原文/图](../content/sources/rutherford-soddy-radioactivity-1902.md)分开分离、持续生成、混合测量与残余假设；一阶有效模型/4天表为AI | 新[放射活性解释](../content/notes/radioactive-equilibrium-and-separation.md)与[地图](../content/maps/radiochemistry-and-transformation.md)，DNA仅结构类比；接受受限机制与测量边界，暂缓现代核素身份、精确半衰、残余机制和定年应用 | 待审 |

## 每日简报源文件

- [2026-10-28](digests/2026-10-28.md)
- [2026-10-26](digests/2026-10-26.md)
- [2026-10-23](digests/2026-10-23.md)
- [2026-10-22](digests/2026-10-22.md)
- [2026-10-21](digests/2026-10-21.md)

## 审核范围

可按“日期/发现 + 接受、暂缓或拒绝 + 小节/理由”作决定，也可只接受一部分。2026-10-21/A1 的样本范围、2026-10-21/B1 的同实现整步验证、2026-10-21/B2 的完整更新与近似阈值差异、2026-10-21/C1 的独立校准和跨星系团证据继续开放。接受基础解释不关闭这些问题，也不自动改变研究长期权重。

10-22 新增范围是采集/导出分层、固定图物理执行、三层预算保证与海洋磁异常历史机制；昨日四项及其缺口继续保留。接受其中一项不关闭生产回放、同实现端到端性能、正动作保护或独立年代证据问题，也不自动调整长期主题权重。

10-23新增范围为统计选择、KV恢复、文档任务信息与心理实验对照，既有八项及其缺口继续保留。接受基础解释不关闭应用数据时序、生产恢复、读者学习或心理机制识别。

10-26新增范围为迁移归属/恢复、直存执行契约、剪枝修复目标与管流实验判据，已有十二项及缺口保留。接受基础解释不关闭恢复实现、生产服务、独立能力或现代稳定性问题。

10-28新增范围为训练奖励/时间边界、截断积压收支、预测检索与结论范围、历史放射化学机制；已有十六项及缺口保留。接受限定解释不关闭真实状态/终端实现、铁路复现、生产预取、人类理解或现代核素识别问题。

独立Reviewer与主控同提交检查的本轮实际状态见[10-28回执](state/runs/2026-10-28.md)；[10-26回执](state/runs/2026-10-26.md)、[10-23回执](state/runs/2026-10-23.md)、[10-22回执](state/runs/2026-10-22.md)及[10-21 回执](state/runs/2026-10-21.md)只覆盖其历史 SHA。这里不预填成功，新候选或基线变化后须重新审核。
