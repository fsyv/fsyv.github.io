---
title: "降雨与铁路延误传播：模型、外测与近似阈值"
date: 2026-10-21
draft: false
tags: [networks, transportation, dynamics]
id: "50494af3-7c74-4023-9cdd-1a7231b31abc"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
math: true
---

## Identity

Mauro Faccin、Tomas Scagliarini、Manlio De Domenico，*Systemic collapse emergence from climate-induced perturbations in transportation networks*，PNAS 2026，DOI [10.1073/pnas.2532180123](https://www.pnas.org/doi/10.1073/pnas.2532180123)。PNAS 与 Crossref 记录 online 2026-10-16、issue 2026-10-20。[arXiv:2610.26428v1](https://arxiv.org/abs/2610.26428) 首提 2026-10-19T13:54:12Z，为同研究别名，不作为第二候选或 10 月 19 日首次发表。

2026-10-21 实读 [v1 HTML](https://arxiv.org/html/2610.26428v1) §2.1–2.5、3、4.1–4.3，以及 A.3–A.6 的文字/图注。未读 A.1/A.2，未视觉核图、审计代码或复现；PNAS 仅核身份/日期。主控独立复核主文 §2.1–2.5/3 与 §4.1–4.3 的关键定义和阈值条件。

## Evidence

- §2.1 式 (1) 描述延误状态传播、降雨注入和吸收，文字规定负分量截为零。§4.1 的 $T$ 按列归一；以公式约定 $T_{ij}$ 从站点 $j$ 流向 $i$ ，不沿用个别口述方向歧义。
- §2.2 式 (2) 用沿线降雨积分、按列车流量加权构造注入；吸收来自站点最大吞吐，时间步为 1 h。意大利 2021–2023 数据用于训练/四折交叉验证，2024 留作测试。
- §2.3 在雨量超过其 144 mm/day（6 mm/h）条件的日级比较中，模型与观测的**超额延误** Spearman 约 0.80、 $p<0.01$ 。超额相对站点历史中位数，不能写成全部延误预测准确率；少雨日的延误原因不在该雨驱模型的解释范围。
- §2.4 的恒定均匀雨场、固定忙时 $T$ 数值情景出现无延误、有限 endemic、无界增长三阶段；作者明确真实数据未达到无界增长条件，不据此宣布现实系统已进入崩溃。

## Threshold-boundary

§4.3 “Disruption threshold” 的未编号推导先用 $T$ 而未保留传播系数 $\alpha$ ，再以随机矩阵保持总量写均值增量为 $\beta\langle g\rangle-\gamma\langle c\rangle$ ，没有处理逐分量正部截断。§2.4 与 Figure 4 图注明确将理论阈值称为 approximate。Table 1 拟合 $\alpha_{\rm IRN}=1.0005$（原表 CI 为 1–1.007），并非严格等于 1；已读 §4.3/A.3–A.6 未见显式声明 $\alpha=1$ 。

因此本页只将它作为作者的近似阈值/数值情景，不把该均值等式当完整模型的普遍精确结论，也不由条件遗漏判定全文普遍错误。[知识解释](../notes/transport-delay-propagation-and-thresholds.md#conditional-bound)另给有明确条件的 AI 下界与两个教学例，区分零初态与已有扰动；它们不是论文实验。

## Support-and-limits

[交通延误的结构—驱动—传播—吸收解释](../notes/transport-delay-propagation-and-thresholds.md)保留具体机制和外测口径，扩展[网络结构笔记](../notes/network-random-and-scale-free.md)已有的“度分布不决定动力学”边界。与生态恢复只有结构类比，交通延误不等于生态状态或存储修复；不跨系统搬阈值。真实极端状态、雨场异质性和时变运行图仍需额外证据。

## Implementation-followup

2026-10-28，主控重新读取 v1 HTML §2.1、2.4、4.1、4.3 与 arXiv history，仍仅 v1；没有全篇重读、视觉核图、审计执行函数或复现。新增知识是[截断总量恒等式及两站点反例](../notes/transport-delay-propagation-and-thresholds.md#clipped-balance)，均为 AI 推导，不能归为作者实验或新的发表。

原文 §4.3 后的代码声明链接到 [CoMuNeLab/adaptsys_train-delays](https://github.com/CoMuNeLab/adaptsys_train-delays)。主控通过 GitHub connector 实读 default `main` 的 [README](https://github.com/CoMuNeLab/adaptsys_train-delays/blob/main/README.md)，blob SHA `e79699b462b8c973039c28791b1fb1236d33e5f6`。README 仍使用 *Transport network response to external stressor fields* 题名，列出 `diffsys/main.py`、`models.py`、`code_steady_state.py` 和部分意大利数据，并说明额外气候数据从 Copernicus 获取。这里只核入口与范围，没有安装、执行或读取实现函数，不能说“没有代码”，也不能由 README 推出完整可复现。下一步是核已有实现的截断、矩阵归一、参数和数据取得条件。


## Static-implementation

2026-11-05指定部分增读作者仓库固定提交[8104d02cd15560dd1eccdd572018ca5c6d28757d](https://github.com/CoMuNeLab/adaptsys_train-delays/tree/8104d02cd15560dd1eccdd572018ca5c6d28757d)。研究员把所读main文件与该提交逐字比对相同，以下链接固定到该提交。不是新论文版本；未安装、执行、拟合或复算原图。

- [code_steady_state.py L25–30](https://github.com/CoMuNeLab/adaptsys_train-delays/blob/8104d02cd15560dd1eccdd572018ca5c6d28757d/code_steady_state.py#L25)：`graph_adj`由`full=False`生成；[base.py L56–121](https://github.com/CoMuNeLab/adaptsys_train-delays/blob/8104d02cd15560dd1eccdd572018ca5c6d28757d/base.py#L56)的对应图构造使用全时段平均，不把它称8点传播图。
- [code_steady_state.py L45–54](https://github.com/CoMuNeLab/adaptsys_train-delays/blob/8104d02cd15560dd1eccdd572018ca5c6d28757d/code_steady_state.py#L45)用8点子图的count产生雨驱；[L65–82](https://github.com/CoMuNeLab/adaptsys_train-delays/blob/8104d02cd15560dd1eccdd572018ca5c6d28757d/code_steady_state.py#L65)将`graph_adj`交Diffusion，并只传`base.params()`，没有在这条路径传`alt_graph`。同一段包含0与每站1000双初态循环。
- [base.py L124–154](https://github.com/CoMuNeLab/adaptsys_train-delays/blob/8104d02cd15560dd1eccdd572018ca5c6d28757d/base.py#L124)只返回alpha/beta/gamma；[diffsys/models.py L313–349](https://github.com/CoMuNeLab/adaptsys_train-delays/blob/8104d02cd15560dd1eccdd572018ca5c6d28757d/diffsys/models.py#L313)的weight默认1.0，演化构造并缓存T；[diffsys/main.py L510–559](https://github.com/CoMuNeLab/adaptsys_train-delays/blob/8104d02cd15560dd1eccdd572018ca5c6d28757d/diffsys/main.py#L510)据数值权重构造无向邻接、列归一。因此“这条默认调用链为固定等边权传播”是基于代码的AI静态推论；不能仅因原图保留count便认定实际传播已用count。
- [diffsys/models.py L351–370](https://github.com/CoMuNeLab/adaptsys_train-delays/blob/8104d02cd15560dd1eccdd572018ca5c6d28757d/diffsys/models.py#L351)在`generate`中注入、吸收并逐次非负截断；[L410–415](https://github.com/CoMuNeLab/adaptsys_train-delays/blob/8104d02cd15560dd1eccdd572018ca5c6d28757d/diffsys/models.py#L410)的`conclude_step`再次截断。停止判据位于[code_steady_state.py L76–129](https://github.com/CoMuNeLab/adaptsys_train-delays/blob/8104d02cd15560dd1eccdd572018ca5c6d28757d/code_steady_state.py#L76)：最多100000步、变化L1不超过1e-5或最大状态超过1e5；这些有限停止条件不是无限时收敛证明。

实际阅读是上述相关脚本/函数与README数据取得说明，不是全仓审计。尚未核拟合cache、`optimize_pars`生成路径、ERA5原输入、论文图与指定脚本输出对应，或真实无界阶段。静态路径与论文流量加权/忙时冻结的表述尚未闭合，不裁定作者全部运行或论文错误。支持[实现与输入解释](../notes/transport-delay-propagation-and-thresholds.md#implementation-and-inputs)，研究价值高、启发价值高；局部代码机制可靠性高，实验映射可靠性仍有限。
