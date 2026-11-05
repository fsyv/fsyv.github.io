---
title: "非前缀 KV 修复：目标数值与上下文兼容的对照"
date: 2026-11-06
draft: false
tags: [kv-cache, approximation, evaluation]
id: "20eefafa-af94-4f60-9391-548f846b39ea"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
---

## Identity

Peng、Tang、Jia，*Where Should a KV-Cache Repair Budget Go? Distractor Structure and Contextual Compatibility in Non-Prefix Reuse*，arXiv:2611.06397v1，2026。[题录](https://arxiv.org/abs/2611.06397v1)；[HTML](https://arxiv.org/html/2611.06397v1)。首次提交 2026-11-04T12:02:58Z，11-05 分组公告，本库 11-06 首读，为窗口内补遗漏。

实际读取 §1–5 主要机制与代表表、§3.2 Proposition 1、Appendix A 的数据/Q*、B 的实现/评分/分配/统计 Holm/硬件、F Tables 33–34；另局部读取 F Table 26 计时说明与 Table 32 大模型结果。没有通读全 36 页、代码、原日志或复现；图与整页 PDF 像素未核。

## Conditions

Qwen3-8B（thinking off）、Llama-3.1-8B、Mistral-7B-v0.2，BF16、greedy，RTX 4090D 24GB，任务 LoCoMo/NQ/TriviaQA/Gorilla APIBench。Q* 是无上下文错误而 full 在 SIM/RAND/OTHER（相似干扰块、同类随机块、跨领域散文）三种配置中均正确的条件子集，0.5 阈值二值化；full=1 来自筛选定义，不是总体准确率。

独立编码块缺跨块条件化；RoPE 对齐不补这个依赖。插入 full 目标块与在 reuse 前文重算目标块，是不同干预；后者也没有重算所有后继块。

## Evidence

以下任务差值区间为配对问题的 95% bootstrap 区间；显著性比较另区分未经校正与 Holm 校正。

Table 33 七个设置固定按标识符取前 40 个 Q*，Llama 为 30 个，目标非首块。NQ/Qwen 40 题：未修保留率 0.15，插 full 目标仍 0.15，在 reuse 前文重算 0.53；后者对插 full 增量 0.38，区间 [0.23,0.53]。重算到 full 的中位相对 L2 为 0.26，未修为 0.36；插 full 的目标距离为 0，却没有更好的任务结果。七设置增量为 0.13–0.38，未经校正均显著，Holm 后四项保留显著。

Table 34 相同 270 题，插 full 目标、earlier reuse 时平均增量 0.11，[0.06,0.17]；earlier 也 full 时为 0.25，[0.20,0.31]；交互为 0.14，[0.08,0.20]。已知目标（oracle）对照支持上下文兼容的机制，不能当部署目标选择成功率。

已知目标所需 token 中位约 2.5%–3.3%，但现实目标未知；问题 attention 的目标命中最高 18.8%，58%–100% 选择最后块。BGE-M3 检索、移动 top 块至 question 前再重算的组合必须拆开选择、位置和重算贡献。5% token 预算不是等 GPU 时间。

九 QA/API 设置相对 InfoFlow-style，同预算未经校正六项改善、Holm 后五项；同重排 token 对照分别四项、三项。LoCoMo 的 7–8B 整块修复无显著优势，检索错误可更差，部分 baseline 是简化实现，非完整原系统排名。

## Support-and-limits

[上下文兼容解释](../notes/kv-cache-mechanism.md#contextual-compatibility)承接精确前缀与近似复用，说明局部误差不必代表混合状态的任务质量。诊断性干预不唯一识别全部机制；选择性条件子集、oracle 目标和 token 预算须与总体准确率、真实选择和 GPU 时间分别报告。11-13 优先固定 artifact 下的无 oracle 质量/时延联合比较，不推任意任务普适修复。
