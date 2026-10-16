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

2026-10-12 实际读取[作者主页保存的摘要](https://pages.cs.wisc.edu/~cao/papers/zipf-implications.html)：多个代理请求轨迹呈现 Zipf-like 分布，指数随轨迹变化；摘要还讨论独立请求模型。当日尝试的另一份 PDF 地址未成功读取，因此没有宣称全文阅读，没有复核数据、拟合参数或缓存实验。

[Zipf 笔记](../notes/probability-zipf.md)的有限集合公式、静态命中率和采样过程是明确假设下的定义与推导；这份摘要不证明所有请求流都遵循 Zipf，更不证明时间独立或热点漂移。

### 2026-10-16 增量阅读

增读[作者保存的 PostScript 稿](https://pages.cs.wisc.edu/~cao/papers/zipf-like.ps.gz)：p.1 身份、p.6 §III 续段和 III-C、p.7 §IV 开头、pp.8–9 §IV/V 及参考文献 3；视觉核对 pp.1/6/8/9，p.5 图仅浏览。网页不能直接读取压缩 PS，下载后在内存解压、转换读取；没有将论文原文保存到仓库。原来的摘要阅读范围仍保留，没有因此变成全文已读。

p.6 的模型假设请求独立且内容不失效；III-C 的有限缓存分析保留最热门的固定 C 页。pp.8–9 区分渐近解释与定量预测，后者可能需要相关性。这支持把边际流行度和时序条件分开，并不支持宣称真实轨迹 IID 或忽略相关性就可定量预测所有缓存。

[早稿入口](https://pages.cs.wisc.edu/~cao/papers/zipf-implication/)题为 *On the Implications of Zipf’s Law for Web Caching*；本次读 The Model、Drifts、Discussion，作为同一研究的早期版本别名，不将两版本的模型混写。其页脚 `6/2/1998` 的日期格式及首次公开日未核；作者稿 p.9 参考文献 3 另记 1998-07 技术报告。正式会议年份为 1999；作者稿的 `VOL. XX` 是占位，不能称已核出版社排版。

局限：没有复核原始请求轨迹、全部指数拟合、缓存实验或完整证明。上方 DOI 保留原标识，去重账本规范化为小写 `10.1109/infcom.1999.749260`。

## LRU

R. L. Mattson、J. Gecsei、D. R. Slutz、I. L. Traiger，*Evaluation techniques for storage hierarchies*，IBM Systems Journal 9(2):78–117，1970；DOI：[10.1147/sj.92.0078](https://doi.org/10.1147/sj.92.0078)。首次发表的月日及更早报告未核，不把扫描文件的 2002 元数据当文献修订日期。

2026-10-16 首读[原论文扫描](https://bitsavers.trailing-edge.com/pdf/ibm/IBM_Systems_Journal/092/ibmsj0902B.pdf)。指定深读印刷 pp.82–87：两级需求调页、LRU、包含性质、critical capacity、栈距离及式 (2)–(5)；辅助读取 pp.78–81 身份与模型，视觉核对 pp.78/83/85/86。DOI/IBM 与首个镜像入口未成功，替代扫描成功；没有通读 40 页或核验所有推广。

pp.85–86 的栈位置从 1 开始，首次访问为无穷；对应容量的 miss 计数可由栈距离分布取得。[Zipf 的时序扩展](../notes/probability-zipf.md#reuse-distance)把距离改记为两次请求之间的不同对象数，并独立给出命中判定的解释和反例。该教学推导不冒充本文原始实验，也不把等大需求调页模型直接推广到 TTL、变大小对象或前缀共享。
