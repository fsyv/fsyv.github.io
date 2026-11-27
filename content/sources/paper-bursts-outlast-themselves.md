---
title: "Huang 与 Liu：前缀缓存恢复与会话积压"
date: 2026-11-17
draft: false
tags: [kv-cache, serving, queueing]
id: "9326ce6d-adfe-42ad-b72a-d0940ebbe74c"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
---

## Identity

Wen Huang 与 Jack Liu，*Bursts That Outlast Themselves: Persistent Degradation in Prefix-Cached Agent Serving*，2026，[arXiv:2611.13412v1](https://arxiv.org/abs/2611.13412v1)。2026-11-10T00:46:51Z 首提，11-11 公告。11-16 仅筛摘要，11-17 指定读取 [HTML](https://arxiv.org/html/2611.13412v1) §§2–6、8。下列结论主要定位于 §5 Algorithm、§6 Recovery after collapse、Table 3、Fig. 5 及 §8 Threats to validity。

## Evidence

- §5 的客户端预算器按当前上下文与预留输出估计每条活动会话需求。队首下一会话计入后不超过池容量的 75% 才再准入。活动需求超过 95% 时，只暂停刚到轮次边界的会话，在途调用继续。暂停者优先恢复。账面需求可能重复计算共享前缀，也可能在两次边界之间短时越限，故需与实际 KV 驻留分开。
- §6 Table 3 的 Qwen3-8B 单 MI300X vLLM 对照用 40 万 token 池、基准每秒 0.04 会话、10–14 分钟双倍到达、20 分钟介入、60 分钟截止。七个匹配种子在各臂都已崩溃时开始控制，共用每个种子的到达计划，起始在系统会话数 29–48、剩余轮数 421–831，各臂相对本种子均值偏差不超过 6%。预算暂停 7/7 达到持续命中恢复，会话数上限加暂停 7/7，仅管准入 1/7，无控制 0/7。表中仅管准入 2/8 使用该臂全部崩溃运行的分母。恢复采用五分钟宽、每分钟推进的 token 加权命中窗口，首个达 0.8 且后续窗口持续达标的时点，要求至少十分钟随访。小于五分钟表示首个测量窗口达标。
- §6 中基准每秒 0.025 会话的另一独立设置使用 Qwen3-32B 单 MI300X 与约 36.5 万 token 池、SWE-bench 形状的长度和工具间隔重放、38K 输入截断。三倍突发持续五分钟，25 分钟施加控制，100 分钟截止，共三个种子。预算暂停与自适应会话上限加暂停的末十分钟命中率分别为 0.92–0.97 和 0.86–0.93。介入后 20 分钟到达者在截止前完成的比例分别是 54%–96% 和 83%–97%，无控制为 0%–7%。两种控制下，总积压最后 30 分钟仍每十分钟净增 4–8 个，末五分钟平均有 73–101 个会话在系统内。原文报告缓存已经热起来时到达和完成分别约为每分钟 1.5–1.6 与 0.7–1.3 个。此组数值来自 §6 的 100 分钟实验。

## Support-and-limits

[持续高命中与系统积压](../notes/session-cache-pressure-and-metastability.md#cache-recovery-and-session-backlog)补入缓存重新有效后的容量限制。研究价值在于用同一种子、同一到达计划、相近起始状态分辨恢复控制差异，并把命中与完整会话完成连回同一观察窗。启发价值在于即使服务效率恢复，完成速率仍须超过供给速率才能消化积压。上述结果为论文报告，未重跑 GPU、回放原日志或测部署 SLO。两种模型负载、不同控制器及不同时间窗应分别对照。实际任务正确性和线上控制触发仍待证据。
