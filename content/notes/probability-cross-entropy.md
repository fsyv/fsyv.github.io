---
title: "为什么分类的最大似然训练会得到交叉熵？"
date: 2026-10-12
draft: false
tags: [foundations]
id: "d9ef7f77-403d-5f07-abb0-60bc92294b2a"
kind: note
maturity: developing
endorsement: ai-candidate
math: true
---

**判断归属：AI 候选。** 文献事实附来源；以下推导、例子和适用边界为本次整理的解释，尚未经过用户逐项确认。

## Likelihood

模型对输入 $x$ 给出类别概率 $q_\theta(c\mid x)$。在样本条件独立的假设下，数据 $(x_i,y_i)_{i=1}^N$ 的条件似然为

$$
L(\theta)=\prod_{i=1}^{N}q_\theta(y_i\mid x_i).
$$

取负对数并除以 $N$，最大化似然等价于最小化

$$
\mathcal L(\theta)=-\frac1N\sum_{i=1}^{N}\log q_\theta(y_i\mid x_i).
$$

乘积变成求和，让每次预测为真实类别分配的概率都进入目标。概率越小，惩罚越大；这是概率模型产生的损失，而非随意选择的一种距离。定义依据见[Socher 的 softmax 与交叉熵讲义](../sources/foundations-probability.md#cross-entropy)，以上似然展开为本文推导。

## Cross-entropy

把单个样本的真实类别写为 one-hot 分布 $p_c=\mathbf1\{c=y\}$，就有

$$
-\log q_y=-\sum_{c=1}^{C}p_c\log q_c=H(p,q).
$$

推广到软标签时，$p$ 可以是非退化分布，交叉熵是按目标分布加权的负对数概率期望；它不必再等于某个单独观测标签的负对数概率。二分类取 $p=(y,1-y)$，则

$$
H(p,q)=-y\log\hat y-(1-y)\log(1-\hat y).
$$

若真实类的预测概率为0.8，损失为 $-\ln0.8\approx0.223$；若只给0.1，损失约2.303。本文使用自然对数，单位为 nat；以二为底则单位为 bit。目标正概率处若 $q=0$，损失发散；$p=0$ 的项按极限取零。

## Entropy-and-KL

加上再减去目标自身的对数概率，可得

$$
\begin{aligned}
H(p,q)&=-\sum_cp_c\log p_c+\sum_cp_c\log\frac{p_c}{q_c}\\
&=H(p)+D_{\mathrm{KL}}(p\Vert q).
\end{aligned}
$$

当 $p$ 固定时，$H(p)$ 与模型无关，最小化交叉熵等价于最小化这个方向的 KL 散度。若目标分布也变了，不能只比较交叉熵数值便声称谁更接近；而且 KL 不对称，不是满足距离公理的度量。

## Gradient

设 $q_c=e^{z_c}/\sum_j e^{z_j}$，且 $\sum_cp_c=1$。交叉熵可写为

$$
H(p,q)=-\sum_cp_cz_c+\log\sum_je^{z_j},\qquad
\frac{\partial H}{\partial z_c}=q_c-p_c.
$$

这解释了对 logits 优化时，梯度怎样把预测拉向目标。直接对概率 $q_c$ 求导则为 $-p_c/q_c$，在接近零时可能很大，故不能笼统说“交叉熵在概率空间提供平滑、温和的梯度”。实际实现常把 softmax 与对数结合计算以改善数值稳定性；这里没有规定某个软件库的接口。

## Scope

对自回归语言模型，概率链式分解为各位置的条件概率，训练目标累加各位置的负对数概率，见[Transformer 训练与生成](transformer-generation.md#distribution-and-training)。较低的训练交叉熵不自动证明事实正确、概率校准或泛化更好；这些需要相应数据与指标。

**联系：**[Zipf](probability-zipf.md)描述被建模的数据热度分布；交叉熵描述如何评价目标分布与预测分布，二者不是同一种对象。

## Revision

2026-10-12：补从似然到损失的推导、固定目标条件、对数单位及 logits/概率梯度区别，修正无条件的“越小越接近”和“概率空间平滑梯度”解释。修订为 AI 候选。
