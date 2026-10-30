# 知识研究待审 · 2026-10-21 起

`research/batch-2026-10-21` 累计27项AI候选；基线 `af525f779464752dfa4d08a8e895dc54cd93ef81`。10-20四项已由[PR28](https://github.com/fsyv/fsyv.github.io/pull/28)合入，不重复待审，合并不升级endorsement。

fsyv的[10-28评论6458746818](https://github.com/fsyv/fsyv.github.io/pull/29#issuecomment-6458746818)（2026-10-28T02:09:18Z）要求10-28/A1继续深入；[10-29评论6485979453](https://github.com/fsyv/fsyv.github.io/pull/29#issuecomment-6485979453)（2026-10-29T02:12:23Z）要求解释10-29/A1推导对象、目标与证明对象。两者都是研究请求，结论仍待审。

| 日期 / 发现 | 具体提议与依据 | 知识位置及接受范围 | 决定 |
| --- | --- | --- | --- |
| 2026-10-21/A1 | 固定缓存样本保留计数而改变顺序，LRU命中不同；新增有限GET复算和时序/寿命边界 | [Zipf](../content/notes/probability-zipf.md#public-sample-projection)、基础问题/概率图；不推生产命中、代表性、策略优越或完整回放 | 待审 |
| 2026-10-21/B1 | PlaneZip压缩表示改变传输成本与可行窗口，须重做准入/排序/重算；120MB例为AI | [张量存活](../content/notes/tensor-liveness-and-peak-memory.md#compression-and-offload)、优化/推理图；接受建模，不将13%→9%模拟开销写成吞吐增31%，无硬件原型/KV收益 | 待审 |
| 2026-10-21/B2 | 铁路雨驱模型分结构/注入/传播/吸收；近似阈值与AI列随机/α/截断增长界分开 | [交通解释](../content/notes/transport-delay-propagation-and-thresholds.md)、网络/生态链接及概率图；限模型，不认定现实崩溃或移植生态/存储阈值 | 待审 |
| 2026-10-21/C1 | Hubble1929的异质距离/太阳修正/共同运动；尺度抵消为AI，Table2反算距离非独立验证 | [天文解释](../content/notes/velocity-distance-and-calibration.md)、天文图/数值链接；不补现代H₀、归功史或未读独立标定 | 待审 |
| 2026-10-22/A1 | 原论文及作者2021/2023说明分采样、实例范围与排序版本；百万一般说明与80,000行未闭合 | [Zipf修订](../content/notes/probability-zipf.md#sample-scope-followup)、基础问题/概率图；接受范围分层，暂缓百万前缀、遗漏率、生产代表性及完整回放，open | 待审 |
| 2026-10-22/B1 | KPage保留稀疏图，以页压实/Q tile/mask减填充；384→96→128行为AI | [注意力执行](../content/notes/attention-spatiotemporal.md#physical-execution)、推理图；接受图/执行区分，性能限BSA/KPage kernel耗时比，暂缓未知GPU、元数据摊销、整模型/KV收益 | 待审 |
| 2026-10-22/B2 | 预算准入分外生二值概率、校准覆盖及未知标签占额的前缀保护；32 guarded决定无正动作 | [预算解释](../content/notes/timestamped-admission-and-prefix-budgets.md)、SLO/存储图；接受三层与分母条件，不拼定理收益；暂缓正动作、真实标签/内生多单元部署保证 | 待审 |
| 2026-10-22/C1 | Vine/Matthews1963记录—外移机制，非详细拟合且有强弱替代；投影/年龄位置/单位例为AI | [地球物理](../content/notes/oceanic-magnetic-anomalies-and-spreading.md)、地图及天文标尺类比；异常正负不等极性，不称已核独立年代或完整板块理论 | 待审 |
| 2026-10-23/A1 | Dwork2015与AI坐标反例/固定族统一界，分诚实挑优、自适应生成、签名执行和泛化 | [统计解释](../content/notes/adaptive-validation-and-holdout-reuse.md)、共识/评价问题及概率/Web3图；不认定应用泄漏/操纵/漏洞，不假iid缓存流量 | 待审 |
| 2026-10-23/B1 | RISK-KV分raw省略、共享predictor净成本、均值门禁/逐请求违约及局部恢复；摊销例为AI | [KV成本](../content/notes/kv-cache-optimization.md#selective-reconstruction)、机制/SLO/地图；接受评价条件，暂缓长期GPU净省、无线迁移、生成正确及生产收益 | 待审 |
| 2026-10-23/B2 | Silent Cue Loss的rawcue/role及任务定义，AI两文件例说明同文字仍可丢区别；micro/macro分开 | [文档表示](../content/notes/document-cues-and-semantic-preservation.md)、知识实践/拆分问题；接受任务相关保留，不推人类学习、拆分效果或本库格式改造 | 待审 |
| 2026-10-23/C1 | Stroop1935分任务、错误罚时/口径及非同期练习差分；习惯解释非唯一机制 | [心理学解释](../content/notes/stroop-interference-and-experimental-controls.md)、地图/DNA/知识实践联系；不推临床、现代零效应或Transformer机制 | 待审 |
| 2026-10-26/A1 | Rocksteady早转归属/PriorityPull/源恢复依赖目标日志；AI单侧恢复反例和迁移率/请求完成反向对照 | [迁移解释](../content/notes/storage-placement-and-migration.md#early-ownership-and-recovery)、两存储问题/地图；接受分层设计评价，暂缓当时ongoing恢复保证、跨DC及旧计费/多源澄清 | 待审 |
| 2026-10-26/B1 | uGDS分CPU控制、SSD→GPU数据及完成顺序；callback等待与raw契约限定收益 | [KV访问](../content/notes/kv-cache-optimization.md#direct-storage-and-ordering)、存储/推理图；接受语义/测量条件，暂缓POSIX透明替换、混合负载/长期稳定及生产收益；logicalKV非SLO-goodput | 待审 |
| 2026-10-26/B2 | 修复感知剪枝与AI复合目标/组合复算：有限评分最优不保独立能力，保留Gemma不可fold/wall成本 | [剪枝解释](../content/notes/depth-pruning-and-repair.md)、优化/推理图；接受目标/有限最优/任务区分，暂缓通用greedy、所有模型同大小速度或部署收益 | 待审 |
| 2026-10-26/C1 | Reynolds1883分半径尺度、染料/下游阻力判据；现代Re/时间尺度与TableI两行复算为AI | [管流解释](../content/notes/reynolds-similarity-and-transition.md)、流体图；接受条件解释/复算，生态仅类比，暂缓普适阈值、现代稳定性及状态映射 | 待审 |
| 2026-10-28/A1 | TDC定义/Ng定理与AI有限和/两槽反例，分持续差分等价、终端与处罚缩放 | [缓存学习](../content/notes/cooperative-caching-and-learning.md#reward-and-horizon)、策略改进/原问题/Web3图；限代数/目标分层，暂缓state/done/bootstrap、误差证书、算法缺陷/部署判断 | 继续深入；结论待审 |
| 2026-10-28/A2 | 交通旧源与AI截断收支/固定时变反例：负总净输入和每步连通仍不足保有界 | [交通修订](../content/notes/transport-delay-propagation-and-thresholds.md#clipped-balance)、概率图；限模型/有理数核算，非铁路复现、普遍稳定判据或作者固定矩阵失效证明 | 待审 |
| 2026-10-28/B1 | WorldPager的pose预测/stale fallback、等待分母、尾部反例/长间隔质量；带宽例为AI | [KV解释](../content/notes/kv-cache-optimization.md#predictive-prefetch-and-staleness)、推理图；接受容量/检索语义/等待/质量分层，暂缓零等待、实时生成、LLM部署及官方基线排名 | 待审 |
| 2026-10-28/B2 | Claim Smoothing分引用支持/整组范围，四臂比较及73claim边界；保留alpha文字/表不一致 | [结论范围](../content/notes/claim-scope-and-evidence-synthesis.md)、输入表示/知识实践图；接受同方面支持/限制/反证审计，暂缓裁判自动确认、客观风险比及人类理解效果 | 待审 |
| 2026-10-28/C1 | Rutherford/Soddy1902分分离/持续生成/混合测量/残余假设；一阶模型/4天表为AI | [放射活性](../content/notes/radioactive-equilibrium-and-separation.md)、地图/DNA类比；接受受限机制/测量，暂缓现代核素、精确半衰、残余机制及定年 | 待审 |
| 2026-10-29/A1 | 继续10-28/A1；TDC入口/Ng原文与AI统一式/最小例，分真终端、截断、重置、处罚 | [缓存修订](../content/notes/cooperative-caching-and-learning.md#terminal-bootstrap-followup)、原问题/Web3路径；仅提议限定推导，未定位作者代码，实际审计未完成，不认定算法缺陷 | 待审 |
| 2026-10-29/B1 | EdgePace分观测年龄、前景deadline、后台吞吐和Hold后实际排空，保留同负载取舍 | [SLO解释](../content/notes/storage-latency-and-slo.md#freshness-and-actuation)、存储路径；接受评价分层，不把profile当WCET或推机器人闭环质量改善 | 待审 |
| 2026-10-29/C1 | Snow1855与AI率比：分局部交错/全供水区、死亡/房屋、部分供水归类推算 | [供水比较](../content/notes/water-supply-comparison-and-denominators.md)、历史流行病图；限历史比较，不推个人风险、随机实验或未核第三行修订 | 待审 |
| 2026-10-30/A1 | 响应10-29询问：TDC/Ng与AI恒等式说明在比较累计目标下的策略排序，持续处罚比价与终端余账分开 | [目标与证明](../content/notes/cooperative-caching-and-learning.md#objective-and-proof)、原贪心问题；接受限定目标等价，不推网络最优/状态充分/部署收益；实际代码审计未完成 | 已回应解释；结论待审 |
| 2026-10-30/B1 | IOSage分模式识别、建议语义和配对端到端收益；保留隔离切分、局部加速无总收益、另日漂移及手动实施 | [SLO修订](../content/notes/storage-latency-and-slo.md#patterns-and-end-to-end)、存储图；接受证据分层，暂缓自动执行安全或跨环境收益，未审代码/原测量 | 待审 |
| 2026-10-30/C1 | Ostrom2010修订讲座分资源可减损性/排除难度与制度，交流/自定制裁只按原综述口径解释 | [公共池解释](../content/notes/common-pool-resources-and-institutional-rules.md)、信息激励路径；接受属性/制度与成本区分，不将36认定最优或90%当普遍改善，未核原实验，不推DAO/共识保证 | 待审 |

## 每日简报源文件

[10-30](digests/2026-10-30.md) · [10-29](digests/2026-10-29.md) · [10-28](digests/2026-10-28.md) · [10-26](digests/2026-10-26.md) · [10-23](digests/2026-10-23.md) · [10-22](digests/2026-10-22.md) · [10-21](digests/2026-10-21.md)

## 审核范围

可按日期/发现部分接受、暂缓或拒绝。继续研究、沉默或合并都不代替逐项确认。研究partial及未完成审计保留，实际审核/构建见[10-30回执](state/runs/2026-10-30.md)。
