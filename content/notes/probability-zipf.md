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

这是一种可检验模型，不是所有网络请求必须遵守的定律。[Breslau 等人的作者摘要](../sources/foundations-probability.md#zipf)报告了多个 Web 代理轨迹的 Zipf-like 现象，并强调指数随轨迹变化；2026-10-12 整理时仅读取其摘要，未复核原始数据或全部实验。

2026-10-16 增读作者稿的模型及讨论部分，范围见[来源记录](../sources/foundations-probability.md#zipf)。原摘要阅读记录保留；新增阅读仍未复核原始轨迹、全部拟合或实验。

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

### Reuse-distance

**2026-10-16 新增 AI 候选解释。** 考虑容量为 $M$ 个等大对象、全相联、初始为空的精确 LRU；每次 miss 立即插入，没有预取、绕过、TTL 或失效。定义第 $t$ 次请求的重用距离 $d_t$ 为：从同一对象的上次请求到本次请求之间，出现过的**不同对象数**；首次请求记为 $\infty$。重复访问同一中间对象只计一次。

LRU 保留最近使用的 $M$ 个不同对象。某对象刚被请求时位于最新位置；之后每出现一个比它更新的不同对象，它的排名便落后一位。因此它再次被请求前位于第 $d_t+1$ 位，恰有

$$
\mathrm{hit}_t\iff d_t<M,\qquad H_M=\frac1T\sum_{t=1}^{T}\mathbf1[d_t<M].
$$

这是一条给定轨迹上的判定，不要求请求 IID。[Mattson 等原文印刷 pp.85–86、式 (2)–(5)](../sources/foundations-probability.md#lru)使用从 1 开始的栈位置 $\Delta=d+1$，命中条件相应为 $\Delta\le M$；不能混用两个距离定义的边界。

### Same-counts-different-hits

下面是可逐步核算的教学反例，**不是采样实验或真实负载**。两条确定性轨迹均有 A 六次、B 三次、C 两次；其经验频率恰为有限 $N=3,\alpha=1$ 的 Zipf 比例 $(6,3,2)/11$。频率相同没有使它们成为 IID 过程。

| 轨迹（从左至右） | 空缓存、容量 2 的 LRU 命中 | 首次 miss / 其余 miss |
| --- | --- | --- |
| `AAAAAABBBCC` | $8/11$ | 3 / 0 |
| `ABCABCABAAA` | $3/11$ | 3 / 5 |

第二条的前八次均 miss，最后三次 A 的 $d$ 分别为 1、0、0，因此均命中。第一条除三个对象首次出现外均命中。这说明边际热度不能确定 LRU 的命中率。若预装固定集合 $\{A,B\}$ 且始终不更换，两条轨迹都会命中 $9/11$：这是直接计数，不需要独立性。上节独立固定概率模型足以计算静态期望，却不是固定集合命中恒等式的必要前提。

### Validation-route

要把反例推进为负载证据，可选一条可公开轨迹，对比原始顺序与**保留计数的均匀随机排列**；记录对象单位、容量、初始状态、准入/淘汰、预热范围、命中率和重用距离分布。条件于同一计数的排列彼此有约束，不应叫作 IID；真正 IID 重采样通常会改变有限样本计数。

之后分别加入热点阶段、对象大小、时间戳、更新与失效，检查哪项假设改变了结果。重用距离数的是不同对象，不能直接代替经过时间，也不能单独预测 TTL、排队或端到端延迟。[真实负载验证问题](../questions/foundations-validation.md)因此仍开放。此判定为[协同缓存收益检验](../questions/web3-caching-evaluation.md)提供一个前置对照；KV 前缀共享的对象单位和共享条件不同，尚未建立等价映射。

## Different-power-laws

Zipf 是**排名—概率**关系；[网络模型](network-random-and-scale-free.md)的幂律度分布是**度值—节点频率**关系。二者即使都画成双对数图，也不允许互用指数或由一者推断另一者。

**组织入口：**[概率与网络地图](../maps/probability-and-networks.md)。**潜在工程联系：**[前缀缓存](kv-cache-optimization.md#prefix-sharing)也依赖请求重复性，但相同对象的热度与可共享 token 前缀是不同的命中条件。

## Revision

2026-10-12：补有限集合的广义归一化公式、ID与排名分离以及采样的时间假设；取消由静态 Zipf 直接解释热点迁移或学习算法有效性的推断。以上为 AI 候选。

2026-10-16：原理解已经指出边际热度遗漏时序，但未给可执行判定；增读 Mattson 的栈分析与 Breslau 的独立模型边界后，用 LRU 不变量、11 次请求反例和对照规程说明遗漏如何改变命中。新解释限定于上述 LRU 模型，真实负载尚未验证，用户确认情况为未确认。
