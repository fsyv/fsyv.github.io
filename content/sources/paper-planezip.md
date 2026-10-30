---
title: "PlaneZip：训练激活的无损压缩与调度证据"
date: 2026-10-21
draft: false
tags: [training, compression, scheduling]
id: "4479db9e-4c1c-46e6-bf17-4b86fc0dc8a4"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
math: true
---

## Identity

Zhufan Gu、Qizhe Tang、Yuxin Wang、Xun Zhou、Hui Feng，*PlaneZip: Lossless Bit-Plane Compression of Training Activations Offloaded over PCIe*，arXiv:2610.25033v1，首次提交 2026-10-18T05:44:24Z。[官方题录](https://arxiv.org/abs/2610.25033)、[v1 HTML](https://arxiv.org/html/2610.25033v1)。未检得更早正式发表记录，不据此断言不存在。

2026-10-21 读取 HTML §II-A–III-D、IV、V-A 正文/V-B–F、Table I/II/IV；Table III 只读前部。图仅图注，没有视觉核验、源码审计或复现，不称全文已读。属于本周窗口补遗漏，而非上次监测终点后的新发表。

## Mechanism

训练激活在 forward 末次使用与 backward 首次使用之间可保留、换出或丢弃后重算。§III 的压缩器按 128 B 块比较 ZVC、DBX、BX、ZBX 和 raw；ZBX 先去零再作 bit-plane，块有 3 bit tag，4 KB chunk 有 16 bit 长度头。报告压缩比包含 tag/header/padding。

§III-C 式 (2) 给出单向有效传输成本

$$
x_t=\min\left(\frac{m_t}{\gamma},
\max\left(\frac{m_t}{c_t\gamma},\frac{m_t}{B_{\rm CE}}\right)\right).
$$

$m_t$ 为原始字节， $c_t$ 为预测的原始/压缩字节比， $\gamma$ 为 PCIe 每方向带宽（B/s）， $B_{\rm CE}$ 为压缩引擎吞吐（以原始 B/s 计）。外层最小值允许旁路压缩；内层最大值表示压缩链路与引擎两瓶颈。传输变短后仍需重算 keep/swap/drop 准入、排序及两队列 deadline 规划，不能只缩小原有计划中的字节。

## Evidence

§V-A 五个模型（三 CNN、ViT-B/16、GPT2-124M）的压缩比几何均值为 BF16 1.71×、FP32 1.39×。§III-A 作者报告 4,000 个真实块加 1,800 个角落例的 bit-exact 测试；本库未复现，不将编码测试扩大为完整训练质量验证。

§IV/V-C 是**同事件模拟器**对照，Table II 给出平台配置。平台 B 为 A100 40 GB、BF16 mixed precision，假设 PCIe 4 每方向 24 GB/s、引擎每方向 64 GB/s。在峰值激活内存 50% 预算下，§V-C 以无内存约束训练为参照，报告 mean rematerialization overhead 由同一规划器但无压缩的 BW 基线 13.0% 降为 PlaneZip 9.0%，下降 4 个百分点。 $(13-9)/13\approx30.77\%$ 仅按作者报告值计算相对下降，不是吞吐提高 31%；预算不含参数、梯度和 optimizer 状态。

研究员逐项检索官方 HTML 的 overhead/normalized/unlimited 文段及 MathML alttext，主控核对 §IV/V-C/V-D/V-F 的相关定义与数据，未找到该开销的正式分母公式；Figure 4 图注只明确吞吐相对 unlimited memory 归一。未核 PDF 图内文字或源码，因此不自行补入“时间差除以基准时间”的开销定义，也不换算完整训练步吞吐。

§V-D 的 30% 预算消融中，固定原计划仅加入压缩，只恢复平台 A/B 的 0.3/0.2 个百分点；完整方案差异为 5.2/9.5 个百分点。这在所声明模拟中支持重新规划的重要性，不证明真实引擎已取得该收益。§V-E 链路敏感性另用 $B_{\rm CE}=4\gamma$ ；24 GB/s 时其 5.7 点不能直接拼入 §V-C 默认平台配置下的 4.0 点差异，比较条件须分别保留。

## Limits-and-support

压缩比分布来自 CPU 小 batch 三轮；BF16 由 FP32 转换，形状 trace 使用 meta。没有 GPU 压缩引擎原型，模拟忽略 kernel fusion/copy 干扰。§V-F 指出 FlashAttention 不保存完整 attention 矩阵，GPT2 的收益会更小。不能由压缩比直接推训练加速，也不能推广为推理 KV 收益。

支持[张量生命周期中的压缩与重规划](../notes/tensor-liveness-and-peak-memory.md#compression-and-offload)：表示变化会同时改变空间和事件成本。该页的 120 MB 教学例是 AI 按式 (2) 复算，不是作者测量。[基础验证问题](../questions/foundations-validation.md)仍缺同实现压缩引擎、端到端时间与输出核验。

## Availability-followup

2026-10-28 仅复核题录/history（仍 v1，2026-10-18T05:44:24Z）、HTML §VII 结尾 next steps 及正文链接可得性；未重新深读编码或模拟。GPU copy engine/software prototype 仍在未来工作表述，限定题名网页和 GitHub repository 搜索未定位作者实现，不据零命中断言代码不存在。保留 10-21 指定阅读及无真实引擎复现的边界；2026-11-04 仅有新原型、源码或实现证据再深读。
