# 知识研究待审 · 2026-10-19 起

本批次从已核对的最新 origin/main 开始，仅列今日四项候选。此前15/16日七项已由 [PR #25](https://github.com/fsyv/fsyv.github.io/pull/25) 合入；原[15日](digests/2026-10-15.md)、[16日](digests/2026-10-16.md)简报和来源历史保留，不重复待审。合并不自动将 AI 候选改为用户确认。

| 日期 / 发现 | 候选理解与修改依据 | 知识位置 | 决定 |
| --- | --- | --- | --- |
| 2026-10-19/A1 | [Squall 指定正文](../content/sources/paper-squall.md)补确认、路由、恢复及完成口径；live不等于逐请求无停顿，旧计费/跨中心SLO未解 | [迁移执行链](../content/notes/storage-placement-and-migration.md#live-reconfiguration)、[迁移问题](../content/questions/storage-migration-evaluation.md) | 待审 |
| 2026-10-19/B1 | [远程KV预印本](../content/sources/paper-remote-kv-load-or-recompute.md)补加载/重算模型；联合带宽/长度门槛为候选推导，单点门槛不普适 | [KV成本](../content/notes/kv-cache-optimization.md#remote-load-or-recompute) | 待审 |
| 2026-10-19/B2 | [对象大小缓存正文](../content/sources/paper-object-size-caching.md)补请求/字节指标；静态三对象反例不验证动态策略或时延收益 | [字节容量与目标](../content/notes/probability-zipf.md#object-size-and-objective) | 待审 |
| 2026-10-19/C1 | [Jarzynski/Seifert指定部分](../content/sources/nonequilibrium-work-sources.md)支持非平衡功与采样边界；两态例/Jensen/KL为有条件AI推导 | [完整解释](../content/notes/nonequilibrium-work-and-free-energy.md)、[统计物理地图](../content/maps/statistical-physics.md) | 待审 |

## 每日简报

- [2026-10-19](digests/2026-10-19.md)：迁移执行、缓存目标与非平衡功采样。

## 需要判断

接受、拒绝或暂缓可按“日期/发现、文件或小节、理由”记录。A1的协议/观测解释与代码级正确性分开；B1/B2的模型与真实负载实验分开；C1的限定物理与数学联系不包含训练或存储系统映射。所有问题仍保持开放，没有代用户确认。

## 验证

本轮候选的独立审核、同提交构建和公开检查，以[当天运行回执](state/runs/2026-10-19.md)中的实际 SHA 和结果为准。旧批次回执不覆盖今日增量；加入新候选或同步基线后重新审核。
