---
title: "Twitter 缓存轨迹：论文、公开样本与受控投影"
date: 2026-10-21
draft: false
tags: [caching, workloads]
id: "55d10b16-c508-49b9-87da-ed6c1ec9511d"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
---

## Identity

Juncheng Yang、Yao Yue、K. V. Rashmi，*A large scale analysis of hundreds of in-memory cache clusters at Twitter*，OSDI 2020，pp.191–208；会议日期 2020-11-04—06。[USENIX 题录](https://www.usenix.org/conference/osdi20/presentation/yang)、[正式 PDF](https://www.usenix.org/system/files/osdi20-yang.pdf)。规范去重标识为 `usenix:osdi20:yang`；论文、仓库说明和样本属于同一研究。

2026-10-21 指定读取 §3.1–3.2（印刷 pp.193–194）、§4.4–4.5（pp.195–197，含脚注 3）、§6.1–6.2（p.200），另浏览 §6.3 开头。没有通读全文、审查模拟器或复现论文实验。

同时完整读取官方仓库[固定版本 README](https://github.com/twitter/cache-trace/blob/c59112085b927c50acbe2d51175ebb09a9a52461/README.md)，对应提交时间为 2020-11-05T03:08:32Z；完整解析并计算[固定版本 cluster026 样本](https://raw.githubusercontent.com/twitter/cache-trace/24347f630eca15f157a5f0e5925170c7a58815a6/samples/2020Mar/cluster026)，文件最后提交时间为 2020-10-24T20:24:19Z。日期由官方 GitHub API 核对。本轮是近期读取旧资料，没有新版本。

## Evidence

论文 §3 说明完整研究轨迹的采集；§6.1 的对象 LRU/FIFO 模拟忽略外部碎片，§6.2 采用五日预热、一日评价。这些条件不能自动移给仓库里的短样本，更不是下文冷缓存实验的设置。§4.5 使用 log-log 回归，脚注 3 也承认其不是统计上正确的 Zipf 建模；本轮不将拟合 R² 当严格分布检验证据。

README 的七列依次为接收时间戳（秒）、匿名 key、key 大小（字节）、value 大小（字节）、匿名 client ID、operation、TTL。非写请求 TTL 字段为 0；GET 的这个 0 不是“对象永不过期”的证据。README 介绍 54 个 2020 年 3 月 cluster 的周轨迹，但已读范围未说明样本的选择、请求遗漏与实例合并方式。样本来自公开官方仓库，不等于已知代表性或可直接恢复生产事件语义。

## Fixed-sample

选择 cluster026 是因为其为样本目录内体积最小的文件，便于预算内完整解析；没有按命中结果选样，也不主张它代表其他 cluster。原始文件为 11,115,448 字节、80,000 行无表头 CSV，各行七字段。SHA-256 为 `11a05d8e75402b9aaad18613e117ec2a287741c1fa1b8b47578b9c62a6861d2c`。

操作计数为 GET 61,874、SET 18,126；全部不同 key 67,681，GET 不同 key 51,729；SET 含 39 个不同 TTL 取值。时间戳范围 0–37,678 秒，存在一处逆序：第 65,633 行为 30,996 秒，下一行为 30,995 秒。因此“原顺序”仅指公布文件顺序；秒级字段也不足以恢复秒内物理全序。本轮保留文件顺序，不静默排序；不将 key 或原始行存入仓库。

## Controlled-projection

**以下是 AI 实际计算，不是论文结果或 Twitter 生产命中。** Python 3.9.6 在内存中取 GET key 的文件顺序；统一对象大小，容量按对象数计，全相联、初始为空、精确 LRU、miss 立即插入。SET、TTL、大小、时间戳和 client 均不参与状态转移。分母包括全部 61,874 次 GET，无预热排除。复制该序列，用 `random.Random(0).shuffle` 作一次保留计数的排列，并核对两序列 Counter 相同。

| 容量（对象） | 文件序命中 / GET | 单次排列命中 / GET |
| --- | --- | --- |
| 64 | 1,477 / 61,874（2.3871%） | 305 / 61,874（0.4929%） |
| 1,024 | 6,362 / 61,874（10.2822%） | 1,865 / 61,874（3.0142%） |
| 4,096 | 8,166 / 61,874（13.1978%） | 3,635 / 61,874（5.8748%） |

研究员另用 Fenwick 树计算零基不同对象重用距离，按距离小于容量统计，六个结果均一致；主控独立重新下载、复算主表和时间戳逆序也一致。下面最小代码复现主表与逆序，不包含 Fenwick 复核实现；不写入任何样本文件。

```python
import collections
import hashlib
import random
import urllib.request

sha = '24347f630eca15f157a5f0e5925170c7a58815a6'
url = (f'https://raw.githubusercontent.com/twitter/cache-trace/{sha}'
       '/samples/2020Mar/cluster026')
raw = urllib.request.urlopen(url, timeout=30).read()
assert len(raw) == 11115448
assert hashlib.sha256(raw).hexdigest() == (
    '11a05d8e75402b9aaad18613e117ec2a287741c1fa1b8b47578b9c62a6861d2c')
rows = [line.split(',') for line in raw.decode().splitlines()]
assert len(rows) == 80000
assert all(len(row) == 7 for row in rows)
seq = [row[1] for row in rows if row[5] == 'get']
permuted = seq.copy()
random.Random(0).shuffle(permuted)
assert collections.Counter(seq) == collections.Counter(permuted)

def lru_hits(sequence, capacity):
    cache = collections.OrderedDict()
    hits = 0
    for key in sequence:
        if key in cache:
            hits += 1
            cache.move_to_end(key)
        else:
            cache[key] = None
            if len(cache) > capacity:
                cache.popitem(last=False)
    return hits

print('rows', len(rows), 'GET', len(seq))
print('operations', dict(collections.Counter(r[5] for r in rows)))
for capacity in (64, 1024, 4096):
    print(capacity, lru_hits(seq, capacity), lru_hits(permuted, capacity))
times = [int(r[0]) for r in rows]
print('timestamp inversions', [
    (i, times[i-1], i+1, times[i])
    for i in range(1, len(times)) if times[i] < times[i-1]
])
```

## Limits-and-support

计算支持[Zipf 的时间顺序边界](../notes/probability-zipf.md#public-sample-projection)：同一有限样本计数不足以确定这个 LRU 模型的命中。固定计数排列不是 IID；一个种子不能估计所有排列的期望、方差或置信区间，也没有比较不同策略。过滤写入、取消过期、统一大小及 miss 即插均改变生产模型；没有字节容量、分配碎片、后端成本、完成率或时延证据，也没有从 value size 为 0 推断生产 hit/miss。

[基础验证问题](../questions/foundations-validation.md)仍开放：须先查样本选择、遗漏、实例范围和时间顺序说明，才能决定能否建立保留操作和寿命语义的回放。有限离散序列计算可复核，并不弥补这些代表性和语义缺口。[概率地图](../maps/probability-and-networks.md)将本例安排在教学反例之后。
