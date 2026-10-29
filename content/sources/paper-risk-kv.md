---
title: "RISK-KV：质量门禁下的历史 KV 重建（2026）"
date: 2026-10-23
draft: false
tags: [llm-inference, caching]
id: "4da6fe68-330c-4f92-884d-ac3f6d011319"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
---

## Identity

Wang Yuekai，*RISK-KV: Quality-Aware Selective KV Cache Reconstruction for Distributed LLM Inference*，2026。[arXiv 2610.29544](https://arxiv.org/abs/2610.29544)，v1 首提 2026-10-21T10:30:46Z；[实际读取 HTML](https://arxiv.org/html/2610.29544v1)。本轮是七日窗口补遗漏，非昨日监测终点后的首发。

2026-10-23 Domain Monitor 实读 §III-A–C 式1–12/Algorithm1、§IV-A/B 式13–20、§V-A/B 与 Tables I–III 全表/主要文字、§VI；引言相关段辅助，图仅图注。未读全文/PDF、源码或复现；Architect 依据交接整合。

## Mechanism

保持目标层组两侧精确 KV anchors；同历史位置的 K 先逆 RoPE，再与 V 一起拟合目标层 normalized attention projection input，之后用冻结原投影得到 K/V，K 恢复原位置的 RoPE。仿射映射可折叠以减少在线步骤，但精确算术下折叠等价不代表预测等于原 KV。在线不读取被删目标 KV 或真实 hidden；anchors 不预测。

对同一请求与 target token，比较重建与 exact 的 paired NLL 差。组单独恢复风险与可省字节排序后，重新评价联合前缀，不能把单组损失相加；G 组共测 exact、G 个 singleton、G−1 个非空联合前缀，即 2G 个不同配置，无全局最优证书。均值风险 bootstrap 单侧 90% 上端不超过 epsilon 才通过；它不是每请求达标或分布外严格保证。

## Evidence

评估模型依次为Qwen2.5-0.5B-Instruct、Qwen2.5-1.5B-Instruct和TinyLlama-1.1B-Chat-v1.0。WikiText2 历史 512 token、随后 512 token teacher forcing；每模型三 seed 各八个 paired test requests，拟合/验证选择/独立测试分开。Table I 三模型 Qwen0.5B/1.5B/TinyLlama 可省略 raw 历史 KV 2/4/2 MiB，即 33.3%/28.6%/18.2%；不是 GPU 净常驻节省。

Table II TinyLlama、epsilon=0.002、24 独立评估请求，违约定义为该请求观测 paired NLL 差超过 epsilon：MeanGate 10/24、均省1.667 MiB；Upper90 2/24、0.667；StableSplit 0/24、0.333，后者约三分之二评估请求回退 exact。0/24 不等于真实风险零，均值门禁不自动保证每个请求。

式15 的净节省为共享请求数乘每请求实际驱逐字节，再减共享 predictor 与额外辅助驻留，必须在同存储层计费。Table III 为每组均值，Qwen0.5B FoldedFP32 每组约 2.002 MiB；其 G2–G5 配置的预测器约为单请求省略 2 MiB 的四倍，不能把 raw 33.3%当净省略。不能用表中平均乘组数冒充精确 bank 测量。

局部计时使用 RTX3060 Laptop GPU、batch1、历史512加同一已知 current token，每模型八 validation 请求，五次预热/每请求30次。Replay 从 CPU token IDs 重放513位置；RISK 从 CPU 传保留 exact 历史 KV，使用已在GPU的 FoldedFP32 predictor、重建/装入完整KV，再处理同current token。两者模型/预测器已加载预热，比较 CPU→GPU/恢复/下一步 logits；按上述模型顺序，均值 Replay/RISK 为60.66/40.09、125.41/48.99、114.07/34.50 ms，即1.51/2.56/3.31倍。不是完整KV直接加载基线或无线迁移，后续decode已经物化完整KV。

## Support-and-limits

扩展 [KV 成本解释](../notes/kv-cache-optimization.md#selective-reconstruction)，不另建同义成本笔记。未真实无线、长上下文大模型或多负载复现；100 Mbps 下2MiB=167.8ms只字节/速率计算。teacher-forced PPL 不等于生成正确率，PPL与paired NLL聚合也不同，不能互相反算。

## Availability-followup

2026-10-30 Domain Monitor重核仍v1，增读/重核HTML §IV式13–16及TableIII，按保守口径另计一次指定正文深读。未取得精确predictor bank实测、长上下文净摊销或作者实现入口；限定原文链接/题名网页/精确仓库搜索未定位入口，不等于代码不存在，也不关闭原净收益缺口。不重复推荐旧省略比例。
