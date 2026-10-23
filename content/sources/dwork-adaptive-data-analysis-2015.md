---
title: "Dwork 等：自适应数据分析与留出集复用（2015）"
date: 2026-10-23
draft: false
tags: [statistics, validation]
id: "bc7157bd-9364-4ee7-a169-b868d3c57085"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
---

## Identity

Cynthia Dwork、Vitaly Feldman、Moritz Hardt、Toniann Pitassi、Omer Reingold、Aaron Roth，*Generalization in Adaptive Data Analysis and Holdout Reuse*，NIPS 2015，卷 28。[会议原文](https://papers.nips.cc/paper_files/paper/2015/file/bad5f33780c42f2588878a9d07405083-Paper.pdf)；[arXiv 1506.02629](https://arxiv.org/abs/1506.02629)为同一研究的长版入口，v1 为 2015-06-08T19:34:29Z，v2 为 2015-09-25T19:04:32Z。近期发现旧资料，不是 2026 年动态。

2026-10-23 Researcher 实际读取会议九页文件的 §1、§1.1–1.2（pp.1–5）、§2 定义与定理（pp.5–6）、§3 算法/定理/实验文字（pp.7–8）。未读长版完整证明、全部引用，未视觉核图、审代码或复现。Architect 根据该交接整理。

## Evidence

引言将反馈驱动的自适应分析与非自适应评价区别开来；§2 讨论受控信息暴露与统计有效性的条件，§3 给出 Thresholdout。本文 §1.1 p.3 的简述与 §3 p.7 的返回值描述并不完全一致，本库采用 §3 的算法机制：未超带噪阈值返回训练均值，超出时返回带噪留出均值并扣预算，耗尽停止，不把留出分数无限公开。

## Support

[完整解释](../notes/adaptive-validation-and-holdout-reuse.md)用独立坐标的固定族挑优反例说明签名正确不等于泛化；1024 模型/10 样本的 0.63230026 及固定族并集界为 AI 独立推导，不冒称论文原实验。它为 [学习共识证据](../notes/learning-consensus-protocol.md)提供统计补充，不能直接裁定应用协议是否有实现漏洞。

## Limits

本轮未实施 Thresholdout，不把会议定理概括成任意反馈、任意时间相关流量或分布外评价保证。真实系统是否暴露了评分集、怎样使用反馈，仍需独立的数据与代码证据。
