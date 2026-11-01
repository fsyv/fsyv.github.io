---
title: "Only Accepted Tokens Count：投机解码的GPU能耗与平均时延"
date: 2026-11-02
draft: false
tags: [inference, energy, papers]
id: "8a5fe2fe-fdd0-4af8-81a6-cd56f448637f"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
---

## Identity

- 作者：Bole Ma、Ayesha Afzal、Jan Eitzinger、Harald Koestler、Gerhard Wellein。
- 原题：*Only Accepted Tokens Count: An Energy Accounting of Speculative Decoding Under Latency Targets*，2026。
- Canonical：[arXiv2610.40287v1](https://arxiv.org/abs/2610.40287v1)，首次提交2026-10-29T15:37:45Z；本轮补上次监测遗漏，不称10-30核查终点之后首发。
- 实际材料：[v1 HTML](https://arxiv.org/html/2610.40287v1)，2026-11-02读取。

## Reading

研究员实际读§2–3、§4/4.1、§5–10指定段与Tables1–4，图仅图注/邻段。未读PDF、代码或原日志，未复现。Table2逐模型/批量选节能最优方案，Table4选时延最快方案，不能一般拼为同一方案；本轮使用Qwen3-14B/H100三行均为DSpark的可对应对照。Table3另为独立campaign，且Qwen3.6硬件改变，不与之拼数字。

## Measurement

11模型、4种attention家族。主批量实验用代码池96个不同prompt，中位长度16–18token再加chat template；另做对话/长文及英罗曼什语检查，默认thinking计入输出。每批B个请求同时提交，没有持续到达，每请求512个最终输出token。拒绝的draft不进最终token分母，但消耗验证资源；验证还含上次接受token及可能额外target token。

BF16权重/KV、greedy；固定模型对应SGLang0.5.12或较新构建、CUDA13.2/GPU graphs。对照为同模型、B、prompt、生成长度、GPU和引擎的非投机执行；每单元至少3seed。

NVML累计板卡能量计数以10Hz读取，一次generation前后作差；不是对瞬时功率求简单平均，也不分摊短draft/verify阶段。范围仅GPU板卡，不含CPU、主存、网络、冷却或host n-gram。作者称decode，但§3描述whole generation；本轮没有可复核的读取时间戳或prefill扣能实现，不能替作者补足该边界。Table4多数模型时间扣prefill，JoyAI行未扣，且没有逐token时间戳。

## Evidence

Qwen3-14B/H100、代码池、graphs，Table1的DSpark每步验证7token。Table2能耗节省为重复中位数±半极差，非置信区间，±0经过四舍五入；Table4是每用户每代的平均ms/token：

| 批量B | DSpark相对同B非投机节能 | 非投机平均ms/token | DSpark平均ms/token |
| --- | --- | ---: | ---: |
| 1 | 54±1% | 15.4 | 7.3 |
| 32 | 34±0% | 16.9 | 9.8 |
| 64 | 18±1% | 17.9 | 14.7 |

目标模型仍验证全部候选，批量已摊薄权重读取，投机进一步摊销的空间因B、硬件和任务改变。长draft增加验证工作，接受率不能独自决定节能。没有由这些均值建立P99或线上服务SLO。

## Support-and-limits

支持[服务目标解释](../notes/storage-latency-and-slo.md#accepted-tokens-and-energy)新增“最终产出token、GPU能量边界、批量与平均时延”分层。10ms目标和单步能量计数例均为该笔记的AI教学对照，非论文统一SLO或实测参数。受控静态批次不直接代表动态到达、整机/机房节能、尾时延或任务质量保证。研究价值高、启发价值高、当前可靠性中；下一步先核脚本中的prefill边界与同请求输出，不自动部署。
