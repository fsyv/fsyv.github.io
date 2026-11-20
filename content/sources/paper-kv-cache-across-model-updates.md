---
title: "来源：跨模型权重更新的 KV 状态移植"
date: 2026-11-13
draft: false
tags: [llm-inference, kv-cache]
id: "5f48d8af-50e3-46d6-ab00-21c45825c286"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
---

## Identity

Zhikun Tao、Fangyong Jin、Junping Zhao，*Can KV Cache Be Reused Across Model Updates? A DeepSeek-V4-Flash Case Study*。[arXiv:2611.14051v1 题录](https://arxiv.org/abs/2611.14051v1)记 2026-11-10T13:17:04Z 首提，11 月 11 日公告。[v1 正文](https://arxiv.org/html/2611.14051v1)。

2026-11-13 实读 §2.1–2.2、§3.1 与 Table 1、§3.2 的 QA 服务基准 正文及 Figure 4 图注、§3.3–3.4 与 Table 2、Figure 6 正文及图注、§4.1 和 Figure 7 正文及图注，附录 A.1 摘选、A.2、B.1–B.2、C.1、C.3 Tables 11–12 与 C.4 Table 14。未重跑引擎、核对完整日志或独立复现图表。

## Evidence

- §2–3 固定目标 checkpoint、输入 token ID 与 greedy 解码。Target 用目标权重计算历史前缀，Reuse 路径使用旧权重的前缀状态，再由目标处理问题和生成。DeepSeek 的完整状态移植包含压缩注意力相关状态。Table 1 的 32K 针测每对配置 192 次查询、来自 8 个历史。V4.1-Flash → 1017 的答案前缀正确率两组均为 97.92%，Qwen3-30B-A3B → Instruct-2507 在对齐 RoPE 位置后从 55.21% 降至 13.02%。
- §3.2 与附录 B 的 QA 服务基准 另用 SGLang 1fdd6c89、8 张 H100、张量并行 8。复用臂由文件后端加载 256 token 的完整页，目标权重重算未对齐尾部。TTFT 比值为逐样本 Target/Reuse 的中位数，计入恢复/加载，排除旧状态预填与服务启动。V4-Flash → 0731 的 HotpotQA 为 5.08 倍，token 级 F1 为 69.3 → 66.3；MultiFieldQA 为 2.51 倍，F1 为 45.9 → 46.2；较短的 BABILong 为 0.86 倍。
- 附录 C.3 的 MultiFieldQA 同输入有效成功配对为 80 例，70 例首 token 相同，其中 33 例全文相同、37 例随后分歧。同版本恢复的诊断中，85 个配对有 52 例全文相同。主服务比较同时包含权重改变和状态交接路径改变，两组诊断也有各自的样本分母。
- §4.1 与附录 C.4 在固定后续 token 与位置时比较两种状态下的条件输出分布，用 Jensen–Shannon 散度除以自然对数 2 再乘 100，将量纲映射到 0–100。Flash → 0731 针测的平均值由 512 token 的 2.87 升至 32K 的 30.62，自然文本续写匹配条件在所测六个长度中为 3.04–3.64。任务与被测位置不同，这组结果不单独识别是哪一种差异造成分布偏移。

## Support-and-limits

支持[跨版本状态的验收边界](../notes/kv-cache-mechanism.md#cross-checkpoint-reuse)。任务得分、输出行为和服务时延在同一对权重上也可能给出不同结论。配对结果限论文指定 checkpoint、任务与引擎，部署仍需自己测缓存加载、任务效用、行为一致和同版本恢复对照。
