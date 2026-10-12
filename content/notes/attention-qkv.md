---
title: "注意力怎样用 Q、K、V 形成上下文表示？"
date: 2026-10-12
draft: false
tags: ["foundations"]
id: "ba60abab-86ed-577f-aa4f-f544708f8c92"
kind: note
maturity: developing
endorsement: ai-candidate
math: true
---

**判断归属：AI 候选。** 定义与文献事实注明来源；例子、推导和组织方式是本次整理的解释，尚未经过用户逐项确认。


## Problem

一个词在不同句子里需要不同表示。固定词向量只回答“它通常表示什么”，上下文表示还要回答“在这里，它应从哪些位置取得什么信息”。注意力用当前查询与各位置的键比较，再把对应的值加权汇总。这里先讨论缩放点积注意力；它不是所有注意力机制的唯一定义。

## Computation

设查询数为 $m$、可供读取的位置数为 $n$，采用每行一个向量的约定：

$$
Q\in\mathbb R^{m\times d_k},\qquad K\in\mathbb R^{n\times d_k},\qquad V\in\mathbb R^{n\times d_v}.
$$

查询 $q_i$ 与键 $k_j$ 的点积衡量可学习表示空间中的匹配程度。对同一个查询，把所有分数归一化后，用权重组合值：

$$
s_{ij}=\frac{q_i k_j^\top}{\sqrt{d_k}},\qquad
A_{ij}=\frac{\exp(s_{ij})}{\sum_{r=1}^{n}\exp(s_{ir})},\qquad
O_i=\sum_{j=1}^{n}A_{ij}v_j.
$$

因此 $QK^\top$ 和 $A$ 都是 $m\times n$，输出 $O=AV$ 为 $m\times d_v$。softmax 沿被读取的位置归一化，每个查询都有自己的权重分布。键负责匹配，值负责提供被汇总的内容；两者不必相同。公式及多头结构的出处见[原论文 §3.2](../sources/foundations-transformer.md#attention)。

缩放因子不是人为限制信息量。若各分量相互独立、均值零、方差一，则点积的方差为 $d_k$，除以 $\sqrt{d_k}$ 后方差变为一。这解释了为何维度增长时可避免分数尺度同步增大；真实训练中的分量并不严格满足这些假设，不能把它当作普遍的梯度保证。

例如某个查询对两个位置的权重是 $(0.75,0.25)$，值分别为 $(2,0)$ 和 $(0,4)$，则输出为 $(1.5,1)$。这是信息混合，不是只复制权重最大的一个位置，也没有自动跳过另一个位置的计算。

## Self-and-cross-attention

自注意力中，三组向量由同一输入序列 $X\in\mathbb R^{n\times d}$ 产生：

$$
Q=XW^Q,\qquad K=XW^K,\qquad V=XW^V.
$$

其中 $W^Q,W^K\in\mathbb R^{d\times d_k}$，$W^V\in\mathbb R^{d\times d_v}$。三组表示同源，却承担不同作用。交叉注意力则可以从一组表示产生查询，从另一组表示产生键和值；例如解码器查询编码器结果。两者的加权计算形式相同。

掩码规定哪些连接合法。因果自注意力在分数上加入矩阵 $M$，当 $j>i$ 时令 $M_{ij}=-\infty$，其余为零：

$$
O=\operatorname{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}+M\right)V.
$$

这样未来位置的权重为零。序列表示如何经过多层组合，见[Transformer 的生成过程](transformer-generation.md)。

## Multiple-heads

单次加权平均会把信息压在同一组权重里。多头注意力学习不同投影，每个头得到自己的匹配与混合，再把结果拼接、投影回模型维度：

$$
\operatorname{head}_r=\operatorname{Attention}(XW_r^Q,XW_r^K,XW_r^V),\qquad
\operatorname{MultiHead}(X)=\operatorname{Concat}(\operatorname{head}_1,\ldots,\operatorname{head}_h)W^O.
$$

这提供了多种表示子空间；不能预先保证某头必定对应语法、距离或某个学科。实现可将所有头的线性投影合为一次矩阵乘法后 reshape，数学上仍是不同的可学习投影。

## Cost-and-boundaries

完整自注意力的分数矩阵有 $n^2$ 个元素；固定总特征宽度时，点积及值聚合的主要算术量为 $O(n^2d)$，另有投影开销。多头在总宽度固定时并不消除二次项，也不自动带来更快推理。权重高表示该层的加权作用大，不能仅凭它断言模型决策的全部因果解释。

**推广：**[时空注意力](attention-spatiotemporal.md)改变 token 的组织与连接范围，沿用这里的计算。**因果性的工程后果：**[KV 缓存](kv-cache-mechanism.md)复用历史状态，但当前查询仍要读取历史键和值。

## Revision

2026-10-12：将原有注意力、自注意力、多头解释合为一条计算链；补全矩阵形状和掩码，取消“加权关注必然减少计算”“多头必然提速”的推断。该修订为 AI 候选。
