---
title: "注意力、生成结构与时空注意力：一手资料阅读范围"
date: 2026-10-12
draft: false
tags: [foundations]
id: "aba89872-8ca3-4b12-8d62-d9fc275635d6"
kind: source
maturity: developing
endorsement: ai-candidate
read_status: partial
---

**归属：资料事实的候选整理。** 以下为实际读取的局部范围，阅读日期2026-10-12；不是全文研究综述。没有复制原论文图表、长段正文或附录。

## Attention

- 作者：Ashish Vaswani、Noam Shazeer、Niki Parmar、Jakob Uszkoreit、Llion Jones、Aidan N. Gomez、Łukasz Kaiser、Illia Polosukhin。
- 标题与年份：*Attention Is All You Need*，2017；本次读取 arXiv v7（2023修订）。
- [原论文 HTML](https://arxiv.org/html/1706.03762v7)，标识 arXiv:1706.03762。
- 实读：§3.1–3.5、§4；式(1)、多头投影式、因果掩码说明、前馈结构、位置编码及复杂度表。
- 可支持：缩放点积、自/交叉注意力、多头与原始编码器—解码器结构的定义。
- 局限：未复核训练和翻译实验，不能将2017模型配置当作所有现代模型的配置。本文没有提供 KV 缓存全过程的复杂度证明，该项由知识笔记单独推导。

## GPT

Alec Radford 等，*Language Models are Unsupervised Multitask Learners*，2019，[作者机构报告](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf)。实读 §2 的语言概率分解及 §2.3（PDF第4页）的结构修改说明：pre-LN 与最终归一化。未读取全部任务评测。

另实际读取 OpenAI GPT-2 仓库公开实现：

- [model.py](https://raw.githubusercontent.com/openai/gpt-2/master/src/model.py)：`attn`、`mlp`、`block`、`positions_for`、`model`；核对 QKV 投影、历史 KV 拼接、可学习 token/位置表及残差/LN 顺序。
- [sample.py](https://raw.githubusercontent.com/openai/gpt-2/master/src/sample.py)：`top_k_logits`、`sample_sequence`；核对温度直接除法、logits 截断后按概率采样、缓存追加。

代码为访问日的 master 版本，未运行历史 TensorFlow 环境，也没有把其 API 当成当前软件使用建议。未以这份代码的 top-p 边界实现替代下一节论文中的数学定义。

## Sampling

Ari Holtzman、Jan Buys、Li Du、Maxwell Forbes、Yejin Choi，*The Curious Case of Neural Text Degeneration*，2019预印本／2020版本，[arXiv:1904.09751v2](https://arxiv.org/html/1904.09751)。实读 §2.2、§3.1–3.3 的任务范围、top-p/top-k 截断与重新归一化定义。没有重做论文实验，也不采用“某策略永远最好”的推广。

## Video

Gedas Bertasius、Heng Wang、Lorenzo Torresani，*Is Space-Time Attention All You Need for Video Understanding?*，ICML 2021，[PMLR原论文](https://proceedings.mlr.press/v139/bertasius21a/bertasius21a.pdf)，arXiv:2102.05095。

实读 §3 的联合与分解时空注意力，式(11)附近与每 patch 比较次数说明（PDF第4–5页），以及表1附近的参数量和比较条件。没有核验全部基准、训练配置或复现实验。成本解释忽略分类 token 的常数开销，不能把复杂度推导等同实测加速。

## Links

- [机制解释](../notes/attention-qkv.md)使用注意力定义，并保留缩放假设。
- [生成解释](../notes/transformer-generation.md)组合 GPT 结构和采样，不混同原始 Transformer。
- [时空分解](../notes/attention-spatiotemporal.md)从连接数量推导成本，不推广实验排序。
