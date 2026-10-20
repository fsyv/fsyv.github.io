# 知识研究待审 · 2026-10-20 起

本批次有四项 AI 候选，尚未获用户逐项确认。昨日四项已由 [PR #26](https://github.com/fsyv/fsyv.github.io/pull/26) 合入本轮基线，不再重复待审；[昨日晨报](digests/2026-10-19.md)和历史来源归属保留，合并不自动升级 endorsement。10 月 13 日理论候选未审核的状态也保留，今日重新读取原文后重建同一知识身份，不把旧分支当作已接受知识。

[2026-10-20 晨报](digests/2026-10-20.md)完整展开背景、机制、可复算例子和边界；本页只列本批次需要用户决定的增量。

| 日期 / 发现 | 具体候选修改 | 依据与接受范围 | 决定 |
| --- | --- | --- | --- |
| 2026-10-20/A1 | [策略改进解释](../content/notes/greedy-policy-improvement.md)及[QMIX 三项证据义务](../content/notes/web3-cooperative-caching.md#three-obligations)：区分模型排序、联合模型最大化、真实回报改善，补误差覆盖的保守门槛 | [教材指定重读](../content/sources/sutton-barto-policy-improvement.md)与[QMIX 新增部分](../content/sources/web3-qmix-2020.md)；矩阵展开、误差界/门槛和例子为 AI 推导。仅接受有限平稳 MDP 和有效统一误差证书下的充分条件，不含缓存状态充分、误差证书已取得、训练收敛或部署收益 | 待审 |
| 2026-10-20/B1 | 扩展 [KV 驻留与可访问性](../content/notes/kv-cache-optimization.md#residency-and-accessibility)，分开驻留时限、表示和路由身份 | [Agentic KV 指定正文](../content/sources/paper-agentic-kv-residency.md)；两组实验的范围/计费/分母分开，首触下界为算术推导。接受评价框架不等于接受一小时或 int4 生产规则；恢复/质量/每副本容量仍未验证 | 待审 |
| 2026-10-20/B2 | 新增[张量存活与峰值内存](../content/notes/tensor-liveness-and-peak-memory.md)，扩优化/推理地图和基础验证问题 | [固定 wrapper 调度论文](../content/sources/paper-peak-memory-schedules.md)及 AI 两分支例；仅模型契约内谈最优和精确实现，区分逻辑字节/allocated/reserved/arena；不保证物理显存、时延或 KV 收益 | 待审 |
| 2026-10-20/C1 | 新增[分子遗传地图](../content/maps/molecular-genetics-and-experimental-inference.md)及 [DNA 复制与密度分布解释](../content/notes/dna-replication-and-density-distributions.md) | [1958 原扫描](../content/sources/meselson-stahl-1958.md)支持实验；三理想机制同平均/不同分布为 AI 推导。接受半保留分配与结构识别边界，不把子单位直接认作单链已由单篇证明，不含后续未读文献 | 待审 |

可按“日期/发现 + 接受、暂缓或拒绝 + 小节/理由”作决定，也可只接受一部分。A 的系统状态与误差证书、B 的真实恢复/分配器与服务测量、C 的后续结构证据均继续开放；接受基础解释不关闭应用或证据问题。

独立审核、同提交构建与公开检查的实际 SHA 和结果见[当天运行回执](state/runs/2026-10-20.md)，由主控完成后据实记录；新候选或基线变化后须重新审核。
