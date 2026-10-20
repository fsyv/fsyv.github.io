---
title: "总分配相同，为什么执行顺序仍改变峰值内存？"
date: 2026-10-20
draft: false
tags: [optimization, systems, memory]
id: "6f920b7c-e124-4ec6-9716-86f48ab51b20"
kind: note
maturity: developing
endorsement: ai-candidate
math: true
---

**判断归属：AI 候选。** 事件模型、契约与实验事实来自[峰值内存调度论文指定部分](../sources/paper-peak-memory-schedules.md)；两分支例子与组织框架为 AI 推导，用户未确认，实验未复现。

## Question

分配过多少字节与最多同时持有多少字节不同。一个张量只要还有未来读取者，或须作为输出保留，就不能释放；固定算子和总工作量时，顺序仍改变同时存活集合。需要先算逻辑峰，再问编译器与分配器是否实现计划。

## Event-model

固定有向无环图，每操作执行一次。 $S$ 为已执行集合，包含成员的全部前置操作。某底层存储 root 已产生，而且仍有未来使用者或被固定保留时称它存活；views/别名共享存储，不能重复计费或仅删一个名字便视为释放。

令 $L(S)$ 为存活字节， $a(v)$ 为下一操作新分配， $s(v)\ge0$ 为临时空间。输出必须在输入最后一次使用后的释放之前分配，所以事件所需内存为

$$
M(S,v)=L(S)+a(v)+s(v).
$$

顺序 $\sigma$ 的峰 $P(\sigma)$ 是其最大事件成本；模型最优为全部合法拓扑顺序中的 $\mathrm{OPT}=\min_\sigma P(\sigma)$ 。分配器舍入、物理碎片、常驻权重/外部输入是否计入，要另定口径。

## Two-branches

AI 可复算例：两独立分支 $A\to C$ 、 $B\to D$ ，A/B 各产生 8 单位中间量，C/D 各分配 1 单位输出并保留到结束；中间量末次使用后立即释放，临时空间为 0。

| 顺序 | 各事件的“原存活 + 新分配” | 峰值 |
| --- | --- | --- |
| A、B、C、D | $0+8=8$ ； $8+8=16$ ； $16+1=17$ ； $9+1=10$ | 17 |
| A、C、B、D | $0+8=8$ ； $8+1=9$ ； $1+8=9$ ； $9+1=10$ | 10 |

两者总新分配均为 18，操作相同，差别是两个大中间量是否共同存活。第二种顺序执行 D 时仍持有 B 的 8 和两个输出的 2，峰值不能写成 9。该例不是“尽早消费在任意图上都最优”的证明。

## Certificate-and-realization

合法顺序给上界 $U$ ，有效下界 $\mathrm{LB}$ 限制任何顺序。 $\mathrm{LB}=U$ 时才证当前图/事件规则内最优；有 gap 不代表一定能改进。改变形状、kernel、重算次数或分配规则须重建模型。

将新顺序交给编译器重新生成代码，可能改变融合、临时量和原地复用，已不执行原模型。来源固定已生成 wrapper、kernel 对象和参数，只重排现有语句。Theorem 1 要求完整读写、准确所有权/完成时刻、确定性 kernel、固定分配事件、事件不依赖周围存活内存、重排不引入额外事件。逐事件维持存储、所有者与 buffer generation 对应，才推出峰值精确实现及结果一致。

这不是对库 kernel 的完整形式验证；新程序仍需重新 profiling 核对预测峰和输出。异步操作未完成就释放输入、allocator 因历史挑不同块，均可使模型与实现脱节。

## Measured-boundaries

论文 CPU 推理为 PyTorch 2.14.1、FP32、单线程，基线 Inductor 已默认 peak reorder/inplace reuse；指标为一次 warm step 内 tracked tensor-allocation peak，不含常驻权重和输入。22 个配置均达到预测峰、输出逐 bit 相同，但只有 DeepLabV3-ResNet50 512×512 省 10.0%；20 个原顺序已证最优，另一个仍有 gap。证书也能帮助停止无收益搜索。

GPU 暴露契约边界：RTX 2080 Ti/CUDA 12.6 的 50 个训练配置中，固定 wrapper 重排仍有 8 个物理峰上升，最多 1.5%。缓存 allocator 的舍入、块拆分和历史使分配依赖周围内存。因此分别报告逻辑请求字节、allocated、reserved 和静态 arena；ReDimNet B3/B6 的重算逻辑收益还可被 arena 碎片抵消，MAC 增量不能称为时延增量。

## Compression-and-offload

**2026-10-21 新增 AI 候选解释。** 上述固定事件模型只重排已有计算；若允许把训练激活换到主存，表示变化还会改变事件成本。[Gu 等的 PlaneZip（2026，v1）](../sources/paper-planezip.md)在 forward 末次使用与 backward 首次使用之间选择 keep/swap/drop：保留、换出再载回、或丢弃后重算。它按 128 B 块选择无损编码和 raw，4 KB chunk 另有长度头，压缩比计入 tag/header/padding。

压缩既减少换出字节，也受引擎限速。原文 §III-C 式 (2) 的单向有效成本为

$$
x_t=\min\left(\frac{m_t}{\gamma},
\max\left(\frac{m_t}{c_t\gamma},\frac{m_t}{B_{\rm CE}}\right)\right),
$$

其中 $m_t$ 为原始字节，$c_t$ 为预测的原始/压缩字节比，$\gamma$ 为链路每方向 B/s，$B_{\rm CE}$ 为以原始 B/s 计的引擎吞吐。内层取较慢瓶颈，外层允许旁路压缩。**AI 教学复算：**十进制 $m=120$ MB、$\gamma=12$ GB/s、$c=2$、$B_{\rm CE}=64$ GB/s 时，raw 为 10 ms、压缩链路为 5 ms、引擎为 1.875 ms，式子得到 5 ms。这里只是一条单向成本，尚无 setup、往返、排队和计算重叠，不能称训练快两倍。

可交换窗口与各操作 deadline 相互约束，传输变短后必须重新决定准入、顺序和双队列排程；固定旧计划只压缩并不能实现完整收益。论文 Table II 的平台 B 是 A100 40 GB/BF16 mixed，假设 PCIe 4 每方向 24 GB/s、引擎每方向 64 GB/s。§V-C 以无内存约束训练为参照，报告峰值激活 50% 预算下，同一事件模拟器、同一规划器的无压缩 BW 基线 mean rematerialization overhead 从 13.0% 降至 PlaneZip 的 9.0%，下降 4 个百分点；按报告值相对下降约 30.8%。所读正文未给出该指标正式分母公式，不自行定义整步时间开销，更不能换算成吞吐提高 31%；预算排除参数、梯度与 optimizer 状态。

五模型的压缩比几何均值为 BF16 1.71×、FP32 1.39×；比率由 CPU 小 batch 三轮取得，BF16 由 FP32 转换，形状 trace 使用 meta，没有 GPU 压缩引擎原型。模拟还忽略 fusion/copy 干扰；FlashAttention 不保存完整 attention 矩阵，也会缩小 GPT2 的此类收益。因此本节支持“传输表示改变规划问题”，尚不证明真实训练加速或推理 KV 收益。应固定模型、预算和同一实现，测量编码、双向传输、排队、重算、整步时间及输出，而不以压缩比替代结论。

## Revision

2026-10-21：原解释固定分配事件并比较顺序；新读 PlaneZip 后，将训练激活的表示、换出与重算明确为另一组可变条件，需要重建事件成本和规划。新增为 AI 候选，不改原固定事件模型的证书范围；硬件引擎与整步收益尚未复现，用户未确认。

## Links

- [优化与数值分析地图](../maps/optimization-and-numerics.md)新增调度分支：模型最优与实现符合模型是两层证据。
- [KV 驻留与可访问性](kv-cache-optimization.md#residency-and-accessibility)也需明确释放时刻、表示和计费；跨调用可重建会话对象不同于单次图的 root，量化/重算各有质量和时间代价。
- [条件数与稳定性](numerical-conditioning-and-stability.md)同样分开数学问题和执行，但条件数与内存契约没有数学等价关系。
- [基础验证问题](../questions/foundations-validation.md)继续要求同 kernel/形状、输出一致性、allocator 实测和完整请求耗时。本解释没有验证 KV 部署或关闭问题。
