---
title: "Zipf 请求模型描述了什么，又没有描述什么？"
date: 2026-10-12
draft: false
tags: [foundations]
id: "b6d2a7e9-095f-5e17-ab3b-7decd797f856"
kind: note
maturity: developing
endorsement: ai-candidate
math: true
---

**判断归属：AI 候选。** 文献事实附来源；以下推导、例子和适用边界为本次整理的解释，尚未经过用户逐项确认。

## Ranked-probabilities

把 $N$ 个对象按长期访问热度从高到低排序，排名 $r$ 的请求概率可建模为

$$
p_r=\frac{r^{-\alpha}}{H_{N,\alpha}},\qquad H_{N,\alpha}=\sum_{j=1}^{N}j^{-\alpha}.
$$

分母保证总概率为一。$\alpha=1$ 是经典 Zipf 形式；有限对象集合中常讨论 $\alpha\ge0$ 的 Zipf-like 模型，$\alpha=0$ 是均匀分布。指数越大，头部相对尾部越集中，因为

$$
\frac{p_r}{p_s}=\left(\frac{s}{r}\right)^\alpha\quad(r<s).
$$

这是一种可检验模型，不是所有网络请求必须遵守的定律。[Breslau 等人的作者摘要](../sources/foundations-probability.md#zipf)报告了多个 Web 代理轨迹的 Zipf-like 现象，并强调指数随轨迹变化；本轮仅读取其摘要，不声称复核了原始数据或全部实验。

## Sampling

生成请求至少要区分“对象 ID”和“热度排名”。若对象1恰好排名1，可直接按上述概率采样；若先随机置换排名，只是让哪个 ID 更热变为随机，偏斜形状不变。以下教学示例采用 NumPy 的概率采样，明确使用有限集合和独立同分布请求：

```python
import numpy as np

def sample_zipf_requests(num_objects, num_requests, alpha, seed=0):
    rng = np.random.default_rng(seed)
    ranks = np.arange(1, num_objects + 1, dtype=float)
    weights = ranks ** (-alpha)
    probabilities = weights / weights.sum()
    # objects_by_rank[r - 1] 是热度排名 r 对应的对象 ID。
    objects_by_rank = rng.permutation(np.arange(num_objects))
    rank_indices = rng.choice(num_objects, size=num_requests, p=probabilities)
    return objects_by_rank[rank_indices]
```

约定 `num_objects` 为正整数、请求数量非负、`alpha` 非负；对象 ID 为0到 `num_objects-1`。固定随机种子便于重复实验，但不是现实流量真实性的证据。

## Static-cache

在对象等大、每次请求独立、概率固定、缓存始终保存同一集合的假设下，缓存集合 $C$ 的命中率为

$$
P(\mathrm{hit})=\sum_{r\in C}p_r.
$$

若只能保存 $M$ 个对象，选热度最高的 $M$ 个最优：任何被选的较冷对象若替换成未选的较热对象，都不会降低命中率。因此

$$
P(\mathrm{hit})_{\max}=\frac{\sum_{r=1}^{M}r^{-\alpha}}{H_{N,\alpha}}.
$$

例如 $N=5,M=2$，均匀分布时命中率为0.4；$\alpha=1$ 时约为0.657。这是静态模型的推导，不是 LRU 或某个学习算法的实测性能，也不说明请求必须精确符合 Zipf 才值得缓存。

## Missing-time

概率表描述边际热度，不能独自决定时间顺序。把同一批请求打乱或按对象聚在一起，统计频率可以相同，短时局部性却不同。上述固定概率独立采样没有热点迁移、周期、突发或对象生命周期。

若要表示热度变化，至少需要让 $p_r$、排名到 ID 的映射或请求过程随时间变化，并说明状态如何产生。不能把每次重新随机排名后的实验结果当成已证实的热点漂移模型。对象大小、更新频率和请求相关性也会改变缓存收益，等对象静态结论不能直接覆盖它们。

## Different-power-laws

Zipf 是**排名—概率**关系；[网络模型](network-random-and-scale-free.md)的幂律度分布是**度值—节点频率**关系。二者即使都画成双对数图，也不允许互用指数或由一者推断另一者。

**组织入口：**[概率与网络地图](../maps/probability-and-networks.md)。**潜在工程联系：**[前缀缓存](kv-cache-optimization.md#prefix-sharing)也依赖请求重复性，但相同对象的热度与可共享 token 前缀是不同的命中条件。

## Revision

2026-10-12：补有限集合的广义归一化公式、ID与排名分离以及采样的时间假设；取消由静态 Zipf 直接解释热点迁移或学习算法有效性的推断。以上为 AI 候选。
