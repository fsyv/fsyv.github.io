---
title: "GPT 式 Transformer 如何从 token 生成下一 token？"
date: 2026-10-12
draft: false
tags: ["foundations"]
id: "ab7cc0ba-4211-50ef-a160-8d0603517546"
kind: note
maturity: developing
endorsement: ai-candidate
math: true
---

**判断归属：AI 候选。** 定义与文献事实注明来源；例子、推导和组织方式是本次整理的解释，尚未经过用户逐项确认。


## Scope

本文讨论具有因果自注意力的 decoder-only 语言模型，并以 GPT-2 的公开实现作具体参照。Transformer 是架构家族；2017 年原论文是编码器—解码器翻译模型，并非所有 Transformer 都按下一 token 预测训练。模型变体和阅读范围见[原论文、GPT-2 报告与实现](../sources/foundations-transformer.md).

## Representation

文本先由 tokenizer 转成 token ID；token 不必等于一个词。设 ID 为 $x_i$，词嵌入表为 $E$，GPT-2 使用可学习的位置嵌入 $P$，起始表示为

$$
h_i^{(0)}=E[x_i]+P[i].
$$

这是 GPT-2 的具体选择。其他模型可能采用不同的位置机制，不能把相加的位置向量写成所有 Transformer 的通则。

## Block

令 $H$ 是一层输入，忽略推理时关闭的 dropout。GPT-2 的一个块可简写为

$$
U=H+\operatorname{MHA}(\operatorname{LN}(H)),\qquad
H'=U+\operatorname{MLP}(\operatorname{LN}(U)).
$$

[注意力的 QKV、掩码与多头推导](attention-qkv.md)说明第一项如何在合法的历史位置之间传递信息。MLP 则对每个位置独立使用同一组参数，可写成两次线性变换之间夹一个非线性函数：

$$
\operatorname{MLP}(u)=\phi(uW_1+b_1)W_2+b_2.
$$

注意力混合不同位置的信息，MLP 变换每个位置的特征。残差把子层输出加回输入，使子层可以学习对既有表示的修正；LayerNorm 在特征维度进行归一化并带可学习仿射参数。它们是完整块的一部分，不能在说明“信息如何流动”时省成只有注意力和 MLP 的直线串接。

原始 Transformer 将 LayerNorm 放在残差相加之后，GPT-2 将其移至子层之前，并在最终输出前再归一化。上式描述后者，不声称两种结构等价。

## Distribution-and-training

经过多层块和最终归一化后，最后一个有效位置的表示映射到词表大小的 logits：

$$
z=\operatorname{LN}(h_t^{(L)})W_{\mathrm{vocab}}+b,\qquad
p(x_{t+1}=v\mid x_{\le t})=\frac{e^{z_v}}{\sum_u e^{z_u}}.
$$

这里的偏置可按具体实现省略。训练时可把整段已知序列并行输入，用因果掩码保证位置 $i$ 预测 $x_{i+1}$ 时看不到它。损失为各位置的负对数概率之和，为什么这等价于交叉熵，见[最大似然与交叉熵](probability-cross-entropy.md)。并行处理已知训练 token，并没有消除自由生成时对尚未产生 token 的依赖。

## Sampling

生成时从分布中选一个 token，把它追加到上下文，然后计算下一个分布。最大概率选择是贪心解码；随机采样则保留多种可能。温度 $\tau>0$ 使用

$$
p_\tau(v)=\operatorname{softmax}(z/\tau)_v.
$$

两类 logit 的差除以较小的正温度会扩大相对概率比，因此分布更尖锐；较大温度使其更平缓。除数是 $\tau$，不是 $e^\tau$。这改变采样分布，不保证事实正确性。

Top-k 保留概率最大的 $k$ 个 token；top-p 按概率从高到低选择累计质量达到阈值的最短前缀。设保留集合为 $S$，二者都从重新归一化的分布采样：

$$
p'(v)=\begin{cases}p_\tau(v)/\sum_{u\in S}p_\tau(u),&v\in S,\\0,&v\notin S.\end{cases}
$$

集合内不是均匀采样。定义与适用背景见[采样论文 §3](../sources/foundations-transformer.md#sampling)。策略效果依赖任务，不能把开放式续写实验的优胜结论推广到所有生成任务。

## Inference

同一前缀每次完整重算会浪费工作。因果结构允许[缓存各层历史 KV](kv-cache-mechanism.md)，使后续一步只处理新 token；这减少重复计算，却增加随上下文增长的存储和读取。模型的表示计算、概率建模、采样决策与缓存实现是相连而不同的四个环节。

## Revision

2026-10-12：将架构范围限定为 GPT 式生成；补残差、归一化、训练与推理的区别，修正 QKV 投影、温度及截断后采样解释。依据公开实现重写，尚待用户确认。
