---
title: "Ou 与 Lentz：Callo 在精确预填期间生成草稿"
date: 2026-11-17
draft: false
tags: [kv-cache, serving, speculative-decoding]
id: "1a027054-5653-4692-9ec0-8a28b20f1002"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
---

## Identity

Jianjun Ou 与 Matthew Lentz，*Callo: Serving Cache-Miss Requests with Speculative Decoding on Invalidated KV under Prefill-Decode Disaggregation*，2026，[arXiv:2611.18459v1](https://arxiv.org/abs/2611.18459v1)。2026-11-13T17:28:37Z 首提，11-16 公告。11-17 指定读取 [HTML](https://arxiv.org/html/2611.18459v1) §§3.2、4.1–4.6、5.1–5.5、6–8、附录 E.1–E.2。

## Evidence

- §§4.2–4.4 给出编辑后的位置映射、对新 token 的暂存和逐块逐层传输。未编辑前缀仍由普通前缀缓存精确复用。预填侧在每个 prefill 分块内按层发送精确 KV。解码侧在等候期间可读到混合的草稿状态。收到精确 prompt KV 全部到达的通知后，验证前向重算草稿 KV，从首次拒绝处放弃草稿余项。推测中生成的 KV 与普通共享前缀缓存隔离。
- §5.1、Table 3 比较两张 H200 NVL（预填和解码各一）通过 NVLink/NIXL 通信，vLLM 0.29，同一 SWE-agent 记录的输入、目标输出长度、工具时延和到达计划。52% 基准容量、解码批上限 16、双方均完成请求的均值时延比 vLLM/Callo 为 1.05–1.19（全部请求）。Llama-3.3-70B FP8 保留最近 5/10 次完整工具输出时，未命中请求比值为 1.19/1.24，全部请求为 1.14/1.19。
- §5.2 Fig. 5 的三方共同完成请求中，比较沿用相同传输、关闭草稿的 Callo-Stream。批上限 16 时，草稿路径在 12%/100% 负载使全请求平均时延再降 8%/10%。上限 2 且处于该配置容量时，约降 3%。Fig. 6 与 E.2 对 52% 负载的 624 个实际推测未命中请求估计，完整方案平均节省约 0.81 秒，其中约 0.39 秒归于传输，0.42 秒归于推测。归因使用估计的基准 KV 到达时点。
- §5.5 带插桩的固定并列规则贪心核验独立于计时。1,928 次验证与 44,792 个提交 token 中，作者报告未发现 prompt KV 指纹、接受、提交或回滚违规。对齐目标是同次验证前向的 argmax。普通未推测请求与 Callo-Stream 比较，在主配置的轻载与近容量下，其从预填端响应到回复完成的均时分别约增加 2% 和 6%。

## Support-and-limits

[编辑后从旧 KV 提案与验证](../notes/kv-cache-optimization.md#invalidated-kv-and-verification)据此区分决策条件、临时状态和精确提交，也区分传输与草稿的收益。研究价值高，因为减少未命中等待仍能把提交依赖限定在精确状态。启发价值高，因为同一状态可满足提案的要求，却要经独立验证才能进入提交路径。实机证据限于作者固定重放，未在本库运行或重算原数据。推测收益会随解码空闲槽、旧 KV 驻留和竞争而变。96 GPU 部分为模拟，真实在线会话成功和跨运行浮点一致另需证据。
