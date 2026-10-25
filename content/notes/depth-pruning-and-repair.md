---
title: "删除哪些层，应按修复后的模型还是原模型评分？"
date: 2026-10-26
draft: false
tags: [inference, optimization, evaluation]
id: "daf3b89e-532a-4149-ba53-a2541c64afb4"
kind: note
maturity: developing
endorsement: ai-candidate
math: true
---

**判断归属：AI候选。** 来源事实为[修复感知剪枝论文](../sources/paper-repair-aware-depth-pruning.md)指定正文；复合目标和排序反例为AI解释，尚未获用户确认，未复现实验。

## Question

深度剪枝删除整个Transformer层以减少计算；删除后若还能拟合映射补偿输出，应该先按未修复模型挑层，再对胜者修复，还是从一开始比较修复后的候选？两个问题的目标函数不同，有限空间内的穷尽搜索也不能自动回答部署性能或未见任务质量。

## Composite-objective

论文对连续删除段用完整模型校准激活拟合最小二乘线性映射。直接跳过各层的误差会相互作用，拟合整段映射又能吸收部分段内作用，因此允许修复会改变有利的删除布局。首层开始的删除段没有前一保留层作接口；多个修复段间仍可能交互，不能把独立段误差简单相加当全模型误差。

**AI抽象：**设 $S$ 是删除层集合，$F_S$ 是直接剪枝模型，$R_S$ 是预定修复过程，$D$ 是评分数据；修复后的选择目标应写作

$$
S^*\in\mathop{\mathrm{argmin}}_{S\in\mathcal S}\mathcal L_D\bigl(R_S(F_S)\bigr),
$$

其中 $\mathcal S$ 是允许的删除集合，$\mathcal L_D$ 是在 $D$ 上定义的损失。它与先最小化 $\mathcal L_D(F_S)$ 的问题不同。虚构两个候选未修复损失10/12、修复后9/4，排名即可反转；这是逻辑反例，不是论文实测数据。若修复算法、拟合数据或部署约束改变，也需重定义目标。

## Exact-within-a-scope

原文Table14穷尽的是下列有限空间，每一候选分别评价有/无修复，不能写成所有模型或所有预算的全局最优。

| 模型与删除粒度 | 可选组数 $g$ | 最多删除 $k$ 组 | AI复算非空子集数 |
| --- | --- | --- | --- |
| Qwen3-1.7B，两层组 | 14 | 6 | 6475 |
| Gemma3-4B，两层组 | 17 | 6 | 21777 |
| Llama3.1-8B，两层组 | 16 | 6 | 14892 |
| Qwen3-14B，两层组 | 20 | 4 | 6195 |
| Qwen3-1.7B，单层 | 28 | 3 | 3682 |

AI组合复算为 $\sum_{j=1}^{k}\binom gj$ ，五组共53021个非空子集；不含空集，不把有/无修复两种评价再当两批不同删除集合。得到的最优只对指定模型、粒度、预算、修复类和评分数据成立。

选层使用16条WikiText2校准序列、每条256token，修复用128条训练序列拟合，独立16条test报告困惑度（PPL）。AppendixE中，校准最优与test最优只有13/17个设置一致。搜索穷尽消除了该空间内的搜索遗漏，却不消除抽样误差。Rgs每步以修复后的候选评分来删除一层，是经验贪心搜索；它没有因此获得[策略改进](greedy-policy-improvement.md)的适用条件或全局保证。

## Score-and-capability

Table3在同一Llama3.1-8B-Instruct、删除8/32层、相同最小二乘修复与WikiText选层数据下，给出以下独立评价。五任务为ARC-Easy、ARC-Challenge、HellaSwag、PIQA、WinoGrande，各1000项。

| 选择 | WikiText2 test PPL↓ | 五任务平均准确率↑ |
| --- | --- | --- |
| 完整模型 | 13.7 | 72.4% |
| ReplaceMe | 40.4 | 57.2% |
| Rgs | 22.6 | 55.4% |

Rgs相对ReplaceMe的PPL下降约44.06%，准确率却低1.8个百分点，两者也都未恢复完整模型水平。这支持“选层评分与需要保住的能力分别核验”，不证明哪一方法在全部任务更好。原文使用任务/MMLU目标时另取不重叠训练/验证项，会选不同层；更换目标也要支付数据和评估成本。

## Realization-and-cost

原文“与SLEB相同成本”主要指候选forward次数，不能转述成同wall time或无计算成本。AppendixE在RTX A6000、Llama删12/32层时，Rgs有319次候选评估、384s，SLEB+R为343s；每种修复法另需29s采集激活。

映射可否折入已有权重还受实际结构约束。§7.7作一般概括，但AppendixG/Table11明确Gemma3在post-feedforward normalization之后修复，不能fold，每段增加 $d\times d$ 方阵，$d$ 为隐藏维度；该开销未纳入推理成本表。因此不能泛称所有模型在修复后仍同大小、同速度。Fisher评分还采用经验Fisher、逐位置rank-one/block-diagonal近似，未独立复推，不能当精确损失定理。

## Links

- [固定执行事件与峰值内存](tensor-liveness-and-peak-memory.md)提供方法联系：最优结论依赖允许变换与实现契约；改变表示、修复或额外矩阵后需重建成本，二者优化对象不同。
- [留出评分与选择](adaptive-validation-and-holdout-reuse.md)支持区分有限评分最优与独立泛化；本轮没有证明这篇剪枝论文发生数据泄漏。
- [推理地图](../maps/transformer-and-inference.md)将本页放在模型计算之后；[优化地图](../maps/optimization-and-numerics.md)用它说明重定义目标与验证实现的顺序。

## Boundaries

当前支持复合目标、有限最优和能力指标分离，不支持所有模型连续块必优、通用贪心保证或生产收益。未核代码/CSV、全证明、现代部署或输出质量复现。下一步先核公开实现、映射折叠及匹配部署成本，再考虑应用；本页不以更低PPL替代服务成功。
