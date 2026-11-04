# 知识研究待审 · 2026-11-05 起

本批次从实核origin/main 850802624926eb2d839dd3d9bec34d520cdff488开始。上一批[PR30](https://github.com/fsyv/fsyv.github.io/pull/30)已合并，其十一项原清单保留在[固定提交](https://github.com/fsyv/fsyv.github.io/blob/ed52258e3b9d34c4ef62612a86a345096453e112/research/review.md)。合并不自动把AI候选改为user-confirmed。本页维护当前批次累计决定；发布程序直接展示最新晨报全文，后续往期全文在同PR保留。

| 日期 / 发现 | 具体提议与依据 | 知识位置及接受范围 | 决定 |
| --- | --- | --- | --- |
| 2026-11-05/A1 | 作者固定代码的传播/雨驱图、默认weight与矩阵归一、0/1000初态及有限停止条件 | [交通实现解释](../content/notes/transport-delay-propagation-and-thresholds.md#implementation-and-inputs)、原来源与网络地图；拟采纳限定调用链和AI权重例，暂缓论文全部实验同语义映射、阈值重标或错误裁决。未运行脚本 | 待审 |
| 2026-11-05/B1 | ExactLoop指定正文的舍入边界、随机性身份与服务批组成对照 | [舍入与执行](../content/notes/kv-cache-mechanism.md#rounding-and-execution)、新来源/数值链接/推理地图；拟采纳机制与有限实验，暂缓任意输入、跨硬件bitwise、线上稳定和全部提速归因。未审代码 | 待审 |
| 2026-11-05/A2 | SmoothScore完整rubric的语义修订与逻辑力度，固定README公开范围 | [语义修订解释](../content/notes/claim-scope-and-evidence-synthesis.md#semantic-repair-and-logical-strength)、原来源/知识地图；拟采纳五档判断参照，不当唯一自动评分算法。73标注/程序未取得，alpha内部差异不裁定 | 待审 |
| 2026-11-05/C1 | Luria–Delbrück1943独立培养与同培养分样、原表口径及AI双时段Poisson例 | [波动试验完整解释](../content/notes/fluctuation-tests-and-preexisting-variation.md)、新来源/遗传地图；拟采纳选择前克隆历史的限定识别，暂缓完整不吸附表型时序、任意高方差唯一机制或真实变异率估计 | 待审 |
| 2026-11-05/B2 | TapeSAC按需求重放、保存收益的共享依赖与近似峰/有限搜索边界 | [保存集合解释](../content/notes/tensor-liveness-and-peak-memory.md#demand-driven-replay)、新来源/优化与推理路径；拟采纳训练机制和条件化数据，不推全局Pareto最优、无额外显存加速、推理KV或压缩引擎已验证 | 待审 |

## 每日简报源文件

- [2026-11-05](digests/2026-11-05.md)

## 审核范围

五项均为AI候选。接受、拒绝或暂缓请按日期/编号说明范围；继续研究与采纳分别记录，不要求当日合并。交通原输入/图输出映射、评分原标注/程序和旧实现审计缺口仍在；Twitter导出、KPage metadata、准入正动作及EdgePace同负载本轮未外查，研究保留partial。

独立审核与同SHA构建的实际状态以[当天运行回执](state/runs/2026-11-05.md)为准，旧批次回执不覆盖本轮新增内容；这里不预填未来passed或发布成功。
