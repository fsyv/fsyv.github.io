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


## Metadata-followup

**2026-10-22 增读旧资料。** 重读原论文 §2.1–2.2（印刷 p.192）、§3.1–3.2（pp.193–194），完整复读上述固定 README；通过官方 GitHub API 完整读取 [issue #3](https://github.com/twitter/cache-trace/issues/3) 正文与 4 条评论、[issue #8](https://github.com/twitter/cache-trace/issues/8) 正文与 3 条评论。未通读原论文、审计采集/导出代码或取得完整轨迹。两条讨论是 2021/2023 年的作者说明，本日发现不等于本日新发表。

论文描述生产 cluster 有 20 至上千个实例，除故障外各实例 key 不重叠；原研究把 klog 请求采样配置由默认 1/100 改为 100%，每 cluster 选两个实例采集一周，共 153 clusters/306 instances，主要分析其中 54 个大 cluster。这里的 100% 是选中实例的请求采样配置，不能升级为已经审计日志绝无遗漏，也不表示 cluster 全部实例均被覆盖。

官方账号 `1a1a11a` 的 [GitHub profile](https://github.com/1a1a11a) 名称为 Juncheng Yang。其 [2021-03-29 第一条说明](https://github.com/twitter/cache-trace/issues/3#issuecomment-809402555)（created 14:02:52Z，updated 14:23:05Z）称公开 trace 每 cluster 取一个 node/container，收集时无请求抽样、对象在 node 间分片。其[样本回复](https://github.com/twitter/cache-trace/issues/3#issuecomment-809420086)（created 14:22:14Z，updated 14:24:06Z）在提问明确指向 `samples/2020Mar` 后称 samples 取前 100 万请求，结束时间因请求率不同而变化。这些是作者对发布范围与意图的说明；论文两个实例与公开一个实例应分别陈述，两者具体选择/映射未取得。

一般说明还不能替代逐文件清单。本日重新解析固定 cluster026，仍为 80,000 行、11,115,448 字节，GET/SET 计数与时间戳逆序均与昨日相同，没有重做 LRU 实验。官方 Git tree 核得初提交 `cf828b5e83fdd65e6db7613ecb4c929df6ed7523`（2020-10-13T03:56:14Z）的 `samples/2020Mar/cluster26`、重命名前版本及固定/当前 `cluster026` 均指向相同 blob `f7e6f458c79ed4aedcb80aba713d18f10148e28d`，size 11,115,448。因而不能把“前 100 万”写成这个文件已核实的实际行数，也不能由 80,000 行反推出采样率、遗漏率、完整前缀或后来裁剪。当前缺逐文件 manifest、导出脚本和对应完整区间。

排序另有已知修复历史。作者在 [2023-02-20 回复](https://github.com/twitter/cache-trace/issues/8#issuecomment-1437643683)（22:49:44Z）建议使用 `.sort` 文件；[2023-02-21 回复](https://github.com/twitter/cache-trace/issues/8#issuecomment-1437918603)（06:21:01Z）说明旧文件原本也按 timestamp 排序，但发现 sorting bug 后重新排序，并保留旧文件。该说明支持区分导出排序版本，不足以确定 cluster026 那一处逆序的成因，更不保证秒内物理全序。

固定 README 的最后修改仍为 `c59112085b927c50acbe2d51175ebb09a9a52461`（2020-11-05T03:08:32Z）；当前 master `1c503676d6972d4394a360e09162149a6c00f516` 最后提交为 2020-11-10T16:03:04Z。README 未记上述讨论细则。SNIA 完整 trace 入口本轮不可访问，未下载约 2.8 TB 数据；第三方修复 PR 代码未读。来源作者评论不是用户反馈。

本日增量支持 [Zipf 笔记的范围分层](../notes/probability-zipf.md#sample-scope-followup)：请求采样配置、实例覆盖、时间窗口和导出版本分别核验；[基础验证问题](../questions/foundations-validation.md)仍 open，未完成生产语义回放。
