# 知识研究待审 · 2026-11-11 起

本批次基于已核对的远端 main 提交 bc0cd97e74fd8b5e110ade6d1377ce546ebd428d。[上一批 PR #32](https://github.com/fsyv/fsyv.github.io/pull/32) 已合并，十七项原决定范围可查[上一批固定清单](https://github.com/fsyv/fsyv.github.io/blob/75be57ed38c8d5f47221ba515abf3d88f3876b3f/research/review.md)。这里维护本批的候选决定。新解释仍由用户选择是否采纳。

| 日期 / 发现 | 具体提议与依据 | 知识位置及接受范围 | 决定 |
| --- | --- | --- | --- |
| 2026-11-11/A1 | 固定客户端控制和同计划日志把解除、完成和等待分开 | [客户端控制与会话验收](../content/notes/session-cache-pressure-and-metastability.md#client-gate-and-session-completion)及固定原件。建议采纳固定观察窗结果与分列验收，暂缓自动触发及部署外推。 | 待审 |
| 2026-11-11/B1 | 轨迹中按会话计数改善对已观测共享的辨认，真实结束界定单会话状态的寿命 | [会话生命周期与共享](../content/notes/kv-cache-optimization.md#session-lifecycle-and-sharing)及轨迹来源。建议采纳信号分工和限定对照，暂缓首次共享预测与有限容量收益。 | 待审 |
| 2026-11-11/C1 | Gaia EDR3 的类星体绝对锚、近共同距离差分与校准传递 | [Gaia 视差标定](../content/notes/gaia-parallax-zero-point-calibration.md)及原文定位。建议采纳识别机制和加性偏差的结构类比，保留极红跨天区及其他发布版本的独立验证。 | 待审 |
| 2026-11-11/B2 | 输运约束允许同一组边际，实际生成成本与目标函数仍有区别 | [输运预算与最大熵](../content/notes/transport-budget-and-conditional-entropy.md)及预印本。建议采纳有限矩下的耦合论证和一维高斯算例，暂缓一般对偶与具体采样表现。 | 待审 |
| 2026-11-13/A1 | 固定铁路拟合入口的测试折与评分日期错配，传播权重随入口不同 | [日期配对](../content/notes/transport-delay-propagation-and-thresholds.md#validation-pairing)及固定证据。建议采纳代码路径与至少一对日期错配的证明，论文外测待核执行。 | 待审 |
| 2026-11-13/B1 | 跨权重缓存移植的加载、任务效用和输出行为应分别验收 | [跨版本状态](../content/notes/kv-cache-mechanism.md#cross-checkpoint-reuse)及配对来源。建议采纳验收分项与有限对照，暂缓部署普遍保证。 | 待审 |
| 2026-11-13/C1 | 同键试次控制按键预测后，净时差无法单独辨认竞争和促进 | [两色同键机制](../content/notes/stroop-interference-and-experimental-controls.md#two-to-one-mapping)及原始实验。建议采纳配比与机制识别边界，修改版的实际对照留作研究。 | 待审 |
| 2026-11-13/B2 | 目标模型预填缩短切换等待，普通负载可改变全调用表现 | [目标预填](../content/notes/kv-cache-optimization.md#routing-and-native-prefill)及实机与模拟来源。建议采纳实机分母与调度条件，暂缓模拟外推及新路由策略结论。 | 待审 |
| 2026-11-16/A1 | 固定历史实现可推出新写确认后同一目标的读值回退，读版本仍上升 | [同键读值顺序](../content/notes/storage-placement-and-migration.md#client-visible-version-order)及普通读和提交源码。采纳范围为静态客户端断言，实际运行和故障后值为后续验证。 | 待审 |
| 2026-11-16/B1 | 固定使用者关系且共同成本只出现一次时可等分，连续批子集要核实际步分组 | [请求能量归属](../content/notes/storage-latency-and-slo.md#request-energy-attribution)及StepSplit 的单卡冷缓存对照。建议采纳模型推导与冷缓存比较，保留跨窗口热缓存和整机计量问题。 | 待审 |
| 2026-11-16/C1 | 单个湍斑的局部衰减与群体借裂分持续可由两种时间尺度分别检验 | [原解释的现代实验补充](../content/notes/reynolds-similarity-and-transition.md#puff-splitting-and-decay)及Avila 等来源。建议采纳脉冲、观测判据与时间尺度推论，临界值按限定估计表述。 | 待审 |
| 2026-11-16/B2 | 固定批次中工具槽位与在场任务可分开，最后任务提早结束也可能伴随末段变长 | [工具并发与批次收尾](../content/notes/storage-latency-and-slo.md#batch-completion-and-environment)及重放与真实工具测量。建议采纳两项对照的适用范围与末段口径，保留开放到达、逐请求成功及分数等价问题。 | 待审 |
| 2026-11-17/A1 | 长会话重放中，缓存命中恢复仍可伴随总积压增加 | [三项恢复条件](../content/notes/session-cache-pressure-and-metastability.md#cache-recovery-and-session-backlog)及匹配试验。建议采纳指定到达窗结果与总积压的区别，线上控制待测。 | 待审 |
| 2026-11-17/B1 | 经编辑的旧状态可提案，精确 KV 到齐后的同次验证决定提交 | [失效 KV 与精确验证](../content/notes/kv-cache-optimization.md#invalidated-kv-and-verification)及受控重放。建议采纳提交边界与传输和草稿两项实测，跨批及完整任务待验。 | 待审 |
| 2026-11-17/C1 | 等步距音节对的辨别随标签边界变化，二步与三步实测整体超过标签预测 | [ABX 标签预测](../content/notes/phoneme-labels-and-abx-discrimination.md)及1957 年原实验。建议采纳原对照和条件化推导，类别形成需另外实验。 | 待审 |
| 2026-11-17/B2 | 两个复杂模型在伦敦周死亡回测落后历史基线，公开复现的选种涉及全系列 | [区间与配置时点](../content/notes/epidemic-forecast-interval-validation.md)及论文与代码。建议采纳实测覆盖和选种时序判断，种子规则的评分影响须重算。 | 待审 |
| 2026-11-17/A2 | Flide FP8 的独算与混批固定精度，批次不变与 FP8 显式组合时报错 | [量化及验证](../content/notes/kv-cache-mechanism.md#quantization-and-validation)及固定源码和原测试。建议采纳静态配置与原实测范围，准确率与恢复仍待测。 | 待审 |
| 2026-11-18/B1 | 固定量化项并精确保留部分和，为跨平台、布局变化提供条件化逐位一致路线 | [精确归约解释](../content/notes/certified-summation-and-layout-invariance.md)、原文与计时范围及数值/KV/优化地图链接。建议采纳充分条件和限定训练对照，平台内核、完整实现及其他引擎仍待核。 | 待审 |
| 2026-11-18/A1 | 平方位移期望预算按维数分配，单次和有限批均仍会波动 | [多维采样增量](../content/notes/transport-budget-and-conditional-entropy.md#multidimensional-sampling-and-budget)及同文增读。建议采纳高斯核、卡方推导与明确标记的 AI 采样；一般生成器、硬上限及性能另验。 | 待审 |
| 2026-11-18/C1 | 更真实的碳定年曲线可使单样本多峰，已知年距序列增加约束 | [定年与独立标尺](../content/notes/radiocarbon-calibration-and-age-identifiability.md)、IntCal20 证据及放射地图。建议采纳曲线与反演机制，概率式限 AI 单样本近似，不采纳普遍年级精度或已复算区间。 | 待审 |
| 2026-11-18/B2 | 控制匹配的双时统计支持参考队列瞬态，本地静态正确仍可瞬态错误 | [遥测响应解释](../content/notes/telemetry-response-and-control-sufficiency.md)、定理和表 2及概率/服务地图。建议采纳 S+F 预测与可逆聚合的条件区分、限定数值反例，真实遥测和程序另验。 | 待审 |
| 2026-11-19/C1 | 1856分母/归类与比例补缺恒保率比 | [供水后续](../content/notes/water-supply-comparison-and-denominators.md)。采纳原文链条与条件推导；端点非CI，旧错表与原登记仍缺。 | 待审 |
| 2026-11-19/A1 | 注意力输入、已存问题与机器输出分层执行 | [固定算子](../content/notes/numerical-conditioning-and-stability.md)。采纳AI算例及方向对照，真实KV格式、GPU与生成效果待验。 | 待审 |
| 2026-11-19/B1 | 记录内相似块重排的空间与读写取舍 | [压缩局部性](../content/notes/record-reordering-and-compression-granularity.md)。采纳机制与限定原型比较，冷映射、更新和恢复待验。 | 待审 |
| 2026-11-20/A1 | 原实验机会成本、制裁净成本与制度自选分开 | [公共池成本与选择](../content/notes/common-pool-resources-and-institutional-rules.md#sanction-costs-and-selection)。建议采纳限定模型与原表比较，保留独立基线身份；全成本和随机选择待验。 | 待审 |
| 2026-11-20/C1 | 裂纹尺寸关系与绝对系数分验，原文末注要求重审 | [裂纹能量解释](../content/notes/griffith-crack-energy-and-coefficient-validation.md)及新地图。建议采纳限定现代薄板机制与原作者纠错，有限几何、耗散与真实预测待验。 | 待审 |
| 2026-11-20/B1 | CLOCK共同TTL匹配平均占用，单槽可解析例仍偏离硬容量 | [更新过程与容量](../content/notes/clock-ttl-approximation-and-capacity.md)。建议采纳近似条件和AI反例，真实轨迹拟合、实现与动态会话外推待验。 | 待审 |

## 每日简报源文件

- [2026-11-20](digests/2026-11-20.md)
- [2026-11-19](digests/2026-11-19.md)
- [2026-11-18](digests/2026-11-18.md)
- [2026-11-17](digests/2026-11-17.md)
- [2026-11-16](digests/2026-11-16.md)
- [2026-11-13](digests/2026-11-13.md)
- [2026-11-11](digests/2026-11-11.md)

## 审核范围

本批次原二十四项保留，本日增加三项，累计二十七项。可按日期和发现编号接受、拒绝或暂缓部分解释。继续研究另行记录，不以提出追问作为采纳。TDC 的实际终止、重置与终端价值处理仍待可归属的实现入口。

## 验证

同提交独立审核、构建和发布的实际结果见 [11-20 回执](state/runs/2026-11-20.md)、[11-19 回执](state/runs/2026-11-19.md)、[11-18 回执](state/runs/2026-11-18.md)、[11-17 回执](state/runs/2026-11-17.md)、[11-16 回执](state/runs/2026-11-16.md)、[11-13 回执](state/runs/2026-11-13.md)与 [11-11 回执](state/runs/2026-11-11.md)。
