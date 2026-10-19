# 知识研究待审 · 2026-10-19 起

本批次有四项 AI 候选，均尚未获用户逐项确认。此前 15/16 日七项已由 [PR #25](https://github.com/fsyv/fsyv.github.io/pull/25) 合入，本批次不重复待审；历史[15 日](digests/2026-10-15.md)、[16 日](digests/2026-10-16.md)简报保留，合并不自动把候选变为用户确认。

[2026-10-19 晨报](digests/2026-10-19.md)在正文展开问题、来源、公式和代表性数据；下表只列需要用户决定的具体增量。

| 日期 / 发现 | 具体提议 | 依据及接受范围 | 用户决定 |
| --- | --- | --- | --- |
| 2026-10-19/A1 | 在[迁移解释](../content/notes/storage-placement-and-migration.md#live-reconfiguration)中，分别观察字节到达、归属变化、副本确认和全局退出；将协议完成与逐请求服务评价分开 | [Squall §3–7 指定正文](../content/sources/paper-squall.md)给出路由复查、按需拉取、确认与恢复链；同机架闭环实验仍有局部阻塞。接受这一评价框架，不等于认可跨中心 SLO、任意恰好一次或旧算法计费解释 | 待审 |
| 2026-10-19/B1 | 在[KV 成本解释](../content/notes/kv-cache-optimization.md#remote-load-or-recompute)中，区分“正确命中”与“值得加载”，保留固定参数下带宽与前缀长度的联合门槛 | [远程 KV 预印本](../content/sources/paper-remote-kv-load-or-recompute.md)提供加载/重算模型，门槛展开为 AI 推导；约 17k 仅单点拟合。接受模型及比较口径，不把门槛当部署规则，也不将相对拥塞加载的收益说成相对重算加速 | 待审 |
| 2026-10-19/B2 | 在[字节容量与命中目标](../content/notes/probability-zipf.md#object-size-and-objective)中补两个目标的公式及三对象反例，说明请求命中更高仍可能字节命中更低 | [对象大小论文](../content/sources/paper-object-size-caching.md)支持指标区分；容量 2、大小 2/1/1、概率 0.4/0.3/0.3 的算例是 AI 静态推导。接受此边界，不据此确认动态策略最优或真实时延收益 | 待审 |
| 2026-10-19/C1 | 接受[统计物理入门地图](../content/maps/statistical-physics.md)及[非平衡功解释](../content/notes/nonequilibrium-work-and-free-energy.md)的组织：区分精确等式、有限样本估计与严格瞬时切换 KL 特例 | [Jarzynski / Seifert 指定部分](../content/sources/nonequilibrium-work-sources.md)支持物理命题；两态例、Jensen 与 KL 展开为 AI 推导。限定正则制备、相应动力学和所列耦合/瞬时切换条件，不包含训练或存储成本的物理映射 | 待审 |

可按“日期/发现 + 接受、暂缓或拒绝 + 具体小节与理由”记录决定，也可只接受一项中的部分解释。A1 的代码级恢复保证、B1 的跨长度与负载验证、B2 的真实轨迹收益、C1 的低功尾部与误差诊断均继续开放；不因接受入门解释而视为已验证。

独立审核、同提交构建与公开检查的实际 SHA 和结果见[当天运行回执](state/runs/2026-10-19.md)。新候选或表达有实质变化后重新审核；自动检查与合并均不能代替用户对具体判断的确认。
