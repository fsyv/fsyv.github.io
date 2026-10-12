---
title: "交叉熵与 Zipf：定义、证据与阅读局限"
date: 2026-10-12
draft: false
tags: [foundations]
id: "f7fe78f2-b0ba-4615-8b06-f404a691efdb"
kind: source
maturity: developing
endorsement: ai-candidate
read_status: partial
---

**归属：资料事实的候选整理。** 阅读日期2026-10-12。

## Cross-entropy

Richard Socher，Stanford CS224d 讲义，2016-04-05，下载文件名 *CS224d-Lecture3.pdf*，页脚使用 Lecture 1；以该文件和页码定位，不据文件名推断另一份课程材料。

[作者课程讲义 PDF](https://web.stanford.edu/class/cs224d/lectures/CS224d-Lecture3.pdf)。实读幻灯片38–42（PDF第38–42页）：softmax、真实类别的负对数概率、one-hot 交叉熵、与熵/KL 的关系。没有阅读整个课程，也没有将讲义的文字提取错误当作公式依据；知识笔记显式展开代数推导。

可支持[交叉熵笔记](../notes/probability-cross-entropy.md)的定义背景。条件似然展开、logits 梯度和数值例子由笔记单独推导，不借讲义声称现实模型的泛化或校准结果。

## Zipf

Lee Breslau、Pei Cao、Li Fan、Graham Phillips、Scott Shenker，*Web Caching and Zipf-like Distributions: Evidence and Implications*，IEEE INFOCOM 1999，DOI：10.1109/INFCOM.1999.749260。

实际读取[作者主页保存的摘要](https://pages.cs.wisc.edu/~cao/papers/zipf-implications.html)：多个代理请求轨迹呈现 Zipf-like 分布，指数随轨迹变化；摘要还讨论独立请求模型。尝试的另一份 PDF 地址未成功读取，因此没有宣称全文阅读，没有复核数据、拟合参数或缓存实验。

[Zipf 笔记](../notes/probability-zipf.md)的有限集合公式、静态命中率和采样过程是明确假设下的定义与推导；这份摘要不证明所有请求流都遵循 Zipf，更不证明时间独立或热点漂移。
