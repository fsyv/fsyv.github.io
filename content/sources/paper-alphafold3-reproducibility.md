---
title: "AlphaFold 3：同种子跨平台的排名与成功标签"
date: 2026-11-27
draft: false
tags: [numerical-analysis, reproducibility, scientific-ml]
id: "fa284b19-b52d-4fde-91b4-69fc480c493d"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
---

## Identity

Lorenzo Pazienza，*Same Seed, Different Top Prediction: Cross-Platform Reproducibility of AlphaFold 3 Inference on TPUs, GPUs, and CPUs*，[arXiv:2611.34462v1](https://arxiv.org/abs/2611.34462v1)，首次提交 2026-11-25T14:35:24Z、11-26 公告。本轮 11-27 发现的新预印本。

实际读取 [v1 HTML](https://arxiv.org/html/2611.34462v1) I–III、IV-A–E 与表 II–IV、V-A–C、VI 及 Data/Code availability 指定主文。未读另列的 88 页 supplement、作者代码、原始 run 或逐预测评分表，未视觉核 PDF、运行 AF3 或复现。下述数据均为作者报告。

## Evidence

- III-A 固定 DeepMind AF3 v3.0.4、commit `85c4d20`、官方权重及其 hash、冻结 ColabFold 输入和 seed。60 个 PoseBusters V2 蛋白—配体 target×5 seed，每 prediction 五候选中取 full-precision score 最大者，即 300 prediction/平台。target 限 ≤1024 token、一条 protein/一个 ligand、无模板/cofactor；21 个可能训练见过。TPU v5e/v6e 与 L4 基线统一 portable XLA attention，但 TPU 有七行非官方 patch，平台不只指芯片。
- 表 II：v5e–v6e top1 翻转 54/300=18.0%，95% CI [14.3,21.7]，两 TPU 重编译均 0/300。v6e–L4 20.7% [16.3,25.3]，L4 重编译 7.3% [4.7,10.3]，超重编译 13.3 pp [8.7,18.0]。CI 按 target 配对 bootstrap 10,000 次，不按独立 prediction 二项解释。
- IV-B/C：同索引候选配体的 TPU 中位 RMSD 0.0165 Å，top1 翻转后 returned candidate 的中位差 0.18 Å。TPU 中位排名 score 漂移 0.000321，top2 margin 中位数 0.0012；margin 分析为 posthoc exploratory，不是已定位的数值因果。
- 成功定义为对实验配体的 symmetry-corrected heavy-atom RMSD <2 Å 且通过 PoseBusters 0.6.5。TPU 成功标签翻转 3.7% [1.7,5.7]；v6e–L4 3.3% [1.0,6.0]，超过 L4 重编译仅 1.7 pp [−0.7,4.3]。这是双向标签变化，不是平均质量下降。九组比较中同时 top1/成功翻转的 39 case，33 仅变 protein minimum-distance check，另六跨 2 Å，仅一 target 换 binding mode。
- IV-C 表 IV、V：仅 highest float32 matmul precision 时 v6e–L4 top1 翻转 20.7%；仅 float32 trunk 仍 20.0%。联合使用后五加速器十组 top1 翻转 0.3%–2.0%，同 seed 成功率 70.7%，原为 70.0%–71.0%，不能称更成功。运行时间 ratio 中位约 1.43–1.58，最大 token bucket 可到 2.19。deterministic flag 使 L4 重编译翻转为零，跨 v6e–L4 仍 21.0%。

## Support-and-limits

支持[固定问题之后的跨平台离散选择](../notes/numerical-conditioning-and-stability.md#af3-cross-platform-selection)，把教学算子与真实模型作者测量分开。host preparation 的 26,550 个比较一致支持已测差异不来自这一步，但未排除 trunk 内表示舍入，精确出错 operation 未知。跨五 seed 合 25 候选的 main-output 是另一 posthoc 口径，不与本页 per-seed 300 prediction 混合。

论文提供作者仓库 `lorenzopazienza/af3-cross-platform`、tag `zenodo-v1` 及 R1/R2 数据 DOI、OSF 指针；本轮未独立读取这些原件，不把它们另列为已读来源。12-04 优先核冻结评分表、候选身份和阈值。研究价值高、启发价值高，原测量可靠性中；不据结果推断所有科学机器学习结论失效。
