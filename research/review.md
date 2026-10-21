# 知识研究待审 · 2026-10-21 起

本批次于 2026-10-21 从核对过的 origin/main `af525f779464752dfa4d08a8e895dc54cd93ef81` 开始唯一 `research/batch-2026-10-21`。2026-10-20 四项已由 [PR #28](https://github.com/fsyv/fsyv.github.io/pull/28) 合入，不再重复待审；[10-20 晨报](digests/2026-10-20.md)、历史来源与判断归属保留，合并不自动升级 endorsement。

本批次现累计 2026-10-21 与 10-22 各四项，共八项 AI 候选，尚未获用户逐项确认。[最新晨报](digests/2026-10-22.md)与[10-21 晨报](digests/2026-10-21.md)分别完整展开问题、机制、数据及边界；本页只维护累计决定，正文不复制到第二处。当前 PR #29 仍 open draft，主控未取得新增真实评论，沉默不构成接受或拒绝。

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

## 每日简报源文件

- [2026-10-22](digests/2026-10-22.md)
- [2026-10-21](digests/2026-10-21.md)

## 审核范围

可按“日期/发现 + 接受、暂缓或拒绝 + 小节/理由”作决定，也可只接受一部分。2026-10-21/A1 的样本范围、2026-10-21/B1 的同实现整步验证、2026-10-21/B2 的完整更新与近似阈值差异、2026-10-21/C1 的独立校准和跨星系团证据继续开放。接受基础解释不关闭这些问题，也不自动改变研究长期权重。

10-22 新增范围是采集/导出分层、固定图物理执行、三层预算保证与海洋磁异常历史机制；昨日四项及其缺口继续保留。接受其中一项不关闭生产回放、同实现端到端性能、正动作保护或独立年代证据问题，也不自动调整长期主题权重。

独立 Reviewer 与主控同提交构建、公开检查的最新实际 SHA 和结果见[10-22 回执](state/runs/2026-10-22.md)；[10-21 回执](state/runs/2026-10-21.md)只覆盖其历史 SHA。这里不预填成功，新候选或基线变化后须重新审核。
