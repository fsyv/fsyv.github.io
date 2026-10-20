# 知识研究待审 · 2026-10-21 起

今日从核对过的 origin/main `af525f779464752dfa4d08a8e895dc54cd93ef81` 开始唯一 `research/batch-2026-10-21`。昨日四项已由 [PR #28](https://github.com/fsyv/fsyv.github.io/pull/28) 合入，不再重复待审；[昨日晨报](digests/2026-10-20.md)、历史来源与判断归属保留，合并不自动升级 endorsement。

本批次四项为 AI 候选，尚未获用户逐项确认。[今日晨报](digests/2026-10-21.md)完整展开问题、机制、数据及边界；本页只维护累计决定，正文不复制到第二处。

| 日期 / 发现 | 具体提议与依据 | 知识位置及接受范围 | 决定 |
| --- | --- | --- | --- |
| 2026-10-21/A1 | [公开固定缓存样本](../content/sources/paper-twitter-cache-workloads.md)中，保留计数的文件序/单次排列有不同 LRU 命中，新增可复算数据对照及非严格时间序/操作寿命边界 | 扩[Zipf](../content/notes/probability-zipf.md#public-sample-projection)、基础验证问题与概率图；仅接受声明模型内的有限 GET 计算，不接受生产命中、样本代表性、策略优越或完整回放已完成 | 待审 |
| 2026-10-21/B1 | [PlaneZip 指定正文](../content/sources/paper-planezip.md)显示压缩表示改变传输成本和可行窗口，须重做准入/排序/重算；120 MB 算例为 AI 复算 | 扩[张量存活解释](../content/notes/tensor-liveness-and-peak-memory.md#compression-and-offload)和优化/推理路径；接受建模方法，不把 13%→9% 模拟残余开销写成吞吐提高 31%，不含硬件原型或推理 KV 收益 | 待审 |
| 2026-10-21/B2 | [铁路雨驱模型](../content/sources/paper-climate-transport-collapse.md)把结构、注入、传播和吸收分开；原阈值为近似，另给保留列随机/α/截断条件的 AI 增长充分界和反例 | 新[完整解释](../content/notes/transport-delay-propagation-and-thresholds.md)，扩网络/生态语义链接与概率图；接受限定模型与证据口径，不认定现实已崩溃，不搬阈值到生态或存储 | 待审 |
| 2026-10-21/C1 | [Hubble 1929 六页原文](../content/sources/hubble-velocity-distance-1929.md)提供异质距离、太阳修正和共同运动事实；共同尺度与系数抵消为 AI 代数推导，Table 2 反算距离不独立验证 | 新[天文解释](../content/notes/velocity-distance-and-calibration.md)与[地图](../content/maps/astronomy-and-observational-inference.md)，双向关联数值分析；不补现代 H₀、归功史或未读独立标定结论 | 待审 |

## 每日简报源文件

- [2026-10-21](digests/2026-10-21.md)

## 审核范围

可按“日期/发现 + 接受、暂缓或拒绝 + 小节/理由”作决定，也可只接受一部分。A 的样本选择/遗漏/实例范围、B1 的同实现整步验证、B2 的完整更新与近似阈值差异、C 的独立校准和跨星系团证据继续开放。接受基础解释不关闭这些问题，也不自动改变研究长期权重。

独立 Reviewer 与主控同提交构建、公开检查的实际 SHA 和结果见[当天回执](state/runs/2026-10-21.md)；这里不预填成功。新候选或基线变化后须重新审核。
