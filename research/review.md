# 知识研究待审 · 2026-11-02 起

本批次从已核对的origin/main开始；上一批次[PR29](https://github.com/fsyv/fsyv.github.io/pull/29)已合并，其27项历史清单保留在该PR及[固定提交](https://github.com/fsyv/fsyv.github.io/blob/ec78a0817b5ca88527b88225621c4bd10e8b88e1/research/review.md)。合并不自动把旧AI候选改为user-confirmed。本页只维护当前批次累计决定；发布程序直接展示最新晨报，并在本PR内保留本批次往期全文。

| 日期 / 发现 | 具体提议与依据 | 知识位置及接受范围 | 决定 |
| --- | --- | --- | --- |
| 2026-11-02/A1 | Rocksteady作者固定历史实现中的迁移态CRUD/重试、版本/tombstone、后台计时与side-log提交证据 | [迁移解释](../content/notes/storage-placement-and-migration.md#implementation-and-completion)、原来源/两存储问题/跨层复评及地图；接受局部机制和测量分层，暂缓任意故障正确性、系统缺陷与论文数值重标。未运行故障注入 | 待审 |
| 2026-11-02/B1 | Ma等v1的最终输出分母、GPU板卡计量、同批量基线及DSpark能耗/平均时延；单步计数为AI | [SLO增量](../content/notes/storage-latency-and-slo.md#accepted-tokens-and-energy)、新来源及推理/存储路径；接受限定解释与算例，暂缓decode-only、线上尾部、整机节能或质量保证，prefill脚本未核。uGDS版本复核不增性能结论 | 待审 |
| 2026-11-02/C1 | Turing1952两细胞原例及AI平均/差异模态、特征值与等扩散对照 | [完整解释](../content/notes/diffusion-driven-pattern-instability.md)、来源/形态发生地图及生态/交通关系；接受局部稳定与空间失稳的区别，暂缓稳定生物图样、实际物质识别或跨系统等价 | 待审 |
| 2026-11-03/A1 | Twemcache历史实现中采样后独立缓冲舍弃路径及双向LRU教学反例 | [采样与事件保留](../content/notes/probability-zipf.md#logging-and-event-retention)、原来源/基础验证/地图；拟采纳完整性分层，暂缓公开轨迹实际丢条、生产TTL/status映射或命中偏差估计 | 待审 |
| 2026-11-03/B1 | HiState完整状态恢复条件及KV/循环检查点访问量与保留量不对称 | [混合检查点](../content/notes/kv-cache-optimization.md#hybrid-checkpoints)、新来源/机制/地图；拟采纳限定恢复与分层解释，不推广GPU-only倍数或命中差子集均值；源码/端到端待核 | 待审 |
| 2026-11-03/B2 | Flide共享主干的分支注意力/循环状态隔离、精确算术语义与浮点不变性区别 | [完整状态与分支](../content/notes/kv-cache-mechanism.md#hybrid-state-and-forks)、新来源/地图；拟采纳所列因果层条件，不含任意生成、跨硬件bit恒同、答案正确或与HiState已组合 | 待审 |
| 2026-11-03/C1 | Allan1966指定理论、现代相邻差整理与固定频偏反例、独立/相关平均边界 | [频率稳定度](../content/notes/frequency-stability-and-allan-variance.md)、新来源/计量地图及方法联系；拟采纳定义与限定代数，不将原式当均值误差、斜率当唯一噪声识别或稳定度当准确度 | 待审 |
| 2026-11-04/B1 | Lu等v1的会话寿命—缓存miss—重算反馈、人口模型与SLO合格会话口径 | [会话反馈](../content/notes/session-cache-pressure-and-metastability.md)、新来源/服务地图/SLO；拟采纳限定机制与证据分层，暂缓普适阈值、完整Basin硬件原型及部署建议 | 待审 |
| 2026-11-04/A1 | WorldPager指定增读的LPIPS保留率分母、开发集int2与封存测试int4的MUSIQ对照 | [相似性与画质](../content/notes/kv-cache-optimization.md#revisit-similarity-and-quality)、原来源/评价范围/地图；拟采纳不同指标与比值边界，不推画质等价、复制单因果或同语义尾部已验证 | 待审 |
| 2026-11-04/B2 | PDFP连续投影表示、整数外循环与同GPU基线/SGM10计时条件 | [完整可行性泵解释](../content/notes/feasibility-pump-and-continuous-projection.md)、新来源/优化地图；拟采纳保证对象和执行分层，暂缓最优性、普遍加速与纯投影器消融归因 | 待审 |
| 2026-11-04/C1 | Bragg1922几何与结构两步分析、AI同周期双中心强度和镜像例 | [衍射与结构推断](../content/notes/bragg-diffraction-and-structural-inference.md)、来源/晶体学地图及识别类比；拟采纳限定几何/代数，不推真实晶体精确峰顶、现代散射模型或唯一反演已解决 | 待审 |

## 每日简报源文件

- [2026-11-04](digests/2026-11-04.md)
- [2026-11-03](digests/2026-11-03.md)
- [2026-11-02](digests/2026-11-02.md)

## 审核范围

可按日期/发现部分接受、暂缓或拒绝；继续研究不代替接受结论。2026-11-02三项推论均为AI候选。研究partial及未完成的完整故障路径、跨层场景和prefill能量实现保留；实际独立审核、同SHA构建和发布状态见[当日回执](state/runs/2026-11-02.md)，这里不预填未来通过。

2026-11-03新增四项，累计七项均待审。2026-11-03的TDC作者实现审计未完成，研究partial；独立审核/同SHA构建由[11-03回执](state/runs/2026-11-03.md)记实。继续探索不代替采纳，11-02回执不覆盖11-03新内容。

2026-11-04再新增四项，累计十一项均待审。TDC实际作者实现仍未定位，终止/重置/terminal审计未完成；交通与ClaimSmoothing到期项本轮未外查，研究仍partial。继续研究与采纳分别判断，实际独立审核、同SHA构建和发布见[11-04回执](state/runs/2026-11-04.md)，不由旧回执继承通过。
