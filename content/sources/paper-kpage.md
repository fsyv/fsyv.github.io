---
title: "KPage：固定稀疏图上的跨块页压实"
date: 2026-10-22
draft: false
tags: [attention, gpu, sparse-execution]
id: "62b03fe4-3451-4cfe-ac39-c241198ed706"
kind: source
math: true
maturity: developing
endorsement: not-applicable
read_status: partial
---

## Identity

Junwei Feng、Qiaorui Chen、Chenyu Liang、Zhen Guo、Jingyi Yang、Xiaoling Zhou、Jiahao Zhang、Dongliang Huang、Yiqiao Liao、Chengru Song，*KPage: Cross-Block Page Compaction for Hardware-Efficient Sparse Attention*，arXiv:2610.28096v1，2026-10-20T12:12:16Z 首次提交。[官方题录及版本](https://arxiv.org/abs/2610.28096)、[v1 HTML](https://arxiv.org/html/2610.28096v1)。规范标识 `arxiv:2610.28096`；HTML 中正式出版 DOI 为占位字符串，未记录为真实 DOI。限定同名正式出版检索未取得更早记录，不证明不存在。

2026-10-22 指定读取 HTML §1/Table 1、§3.1–3.4.1（式 1–6、Algorithm 1）、§4.1–4.6 文字及 Table 2 全表，§4.7 仅局部摘要；图仅图注。未全文、视觉核图、PDF、源码或复现。属于本周窗口补遗漏，早于昨日核查终点，不能称昨日之后新发。

## Mechanism

§3.2 将每个逻辑 128 行 K/V block 的有效行数 $c_b$ 变为 $p_b=\lceil c_b/16\rceil$ 个 Page-16；各块尾页浪费小于 16 行。跨所选 block 拼页，整页在前、尾页在后，加载时直接 gather 到 shared memory，不额外构建 HBM 紧凑 tensor。Q 有效行数不大于 64 时用 64×256 tile，其余用 128×128；面积同为 16,384，但不因此允许合并不同 Q 邻域。

§3.2.4 要求无效 K 的 score 在 row max 前置为负无穷，仅将 K 向量清零仍改变 softmax 分母。§3.3 backward 按 128 行 K/V owner、每 owner 8 页组织；Q 邻域并集引入的虚假边须由式 6 的 8×8 页对、64 位 mask 剔除。同一逻辑 block 不跨 owner。

## Measurements

Table 1 的每一行是相同稀疏图、相同有效行上的 KPage 与 BSA 比较（速度比定义为 BSA 耗时÷KPage 耗时）：8 heads、head dimension 128、BF16；每行 5 次 warmup 后计时 20 次，取同步墙钟中位数，单 GPU/单 stream。无 padding 四规模比值为 1.11/1.03/1.06/0.94，几何均值 1.03；3D partial 为 1.73/2.20/2.44/2.95，几何均值 2.29。两组之间图不同，不能作为同图 padding 消融，也不说明所有图都加速。

§4.1 指定 CUDA 13.2、cuDNN Frontend 1.28.0，并在不同 CUTLASS DSL 版本中选择更快 BSA 配置；本轮未在 HTML 找到明确实验 GPU 型号，不能把引用中的 H100 当本实验设备。计时只含 kernel，排除 graph/page-table/Q route/backward layout 构造；布局稳定时可复用，动态变化的摊销仍未计。Table 2(b) 的 partial BSA backward 还采用不同 whole-block 语义，相关 1.37×只作硬件计时参考，不作为精确训练加速。

§4.4 五代表负载有用 pair 为 160.611G，名义 whole-block 334.109G→Page-16/Q128 199.689G→Q 自适应 177.548G；另含 union-mask/walk-tail 的口径为 180.3G，不能混作同一数值。作者明确 334.109G 不是 BSA 实测 FLOPs。

§4.2 相对采样 FP32 masked oracle，forward 绝对误差约 $10^{-4}$、LSE 小于 $2\times10^{-6}$、gradient cosine 至少 0.99999；这是有限 BF16 数值检查，不是 bitwise 相同或端到端任务质量证据。

## Support-and-limits

支持[时空注意力的物理执行分支](../notes/attention-spatiotemporal.md#physical-execution)：改变连接图和改变既定图的布局属于不同优化。无效行 mask 的理由以前置 [QKV/softmax 解释](../notes/attention-qkv.md)为基础。示意页数算例为 AI 计算，不是论文测量。

代码尚待作者合规后开放，本轮未审源码。GPU 型号、动态元数据构造、完整视频训练耗时与质量仍缺证据；不把页压实等同于自回归 KV 分页或新的稀疏图。后续 2026-10-29 先核这些证据的可得性。
