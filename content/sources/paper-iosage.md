---
title: "IOSage：I/O模式诊断与端到端收益的证据链（2026）"
date: 2026-10-30
draft: false
tags: [storage, performance, evidence]
id: "f490dc66-1018-4724-b576-a86145a4f37c"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
---

## Identity

Mahdi Banisharif、Tabassum Mahmud、Ahmad Tarraf、Suren Byna、Ali Jannesari，*IOSage: Detecting HPC I/O Bottleneck Patterns to Guide LLM Recommendations*，2026。[arXiv2610.36370v1](https://arxiv.org/abs/2610.36370v1) · [实际HTML](https://arxiv.org/html/2610.36370v1)。v1首提2026-10-26T22:35:54Z，本轮是七日窗口补遗漏，不是昨日监测终点后首次发表。

2026-10-30 Domain Monitor实读HTML §II-A–C、III-A–F、IV-A–E/Tables I–IV、IV-F计时总体指定段、VI–VII，引言辅助；图只读图注。Architect据会话交接整合，未读PDF像素、代码、原日志或复现实验。§VII称代码、模型及测量将在接受后发布，未据此断言其他代码必不存在。

## Mechanism

Darshan汇总操作次数、大小、文件和累计I/O时间，没有应用语义、其他作业或存储状态的完整因果信息。IOSage门禁使用七个模式标签的XGBoost模型，以0.3门槛取得命中模式；另有一个无登记模式标签模型用于分类评估。随后将命中模式、训练模式卡、逐文件证据与配置交给LLM提出建议。零命中仍调用LLM，可回答无需改变，也可能提出建议，不能称安全拦截。某种fsync模式可能承担durability语义，日志模式不能单独授权删除。

## Classification-and-grounding

689个合成benchmark日志分为201训练、488测试，另有91,807个弱标生产日志；可信benchmark权重100，生产日志权重1。汇总micro-F1为0.929；但488中330个共享训练配置/job，158个不共享时为0.832，留整种benchmark时为0–0.64。不能把较低隔离要求下的汇总分数当跨应用泛化；另一个0.916门禁口径也不能混作0.929。

78个无登记模式日志上，同一prompt的Sonnet4单独调用提出64条建议，带分类/模式卡后为9条；其中7条来自分类误报，2条发生于零命中仍建议。无登记模式不等于没有性能问题，这也不是78次收益验证。减少建议数量不直接度量建议正确或执行安全。

## End-to-end-evaluation

作者在NCSA Delta CPU节点、同一Lustre文件系统上手动实施建议，负载使用1–4节点、4–256 ranks。每个版本11次，交替测量并按相邻运行组成11对；以完整srun墙钟时间计量，核对工作量与输出等价。加速比是11个配对时间比的中位数，不是分别求两版本中位时间再相除。

| 场景与改动 | 整个srun加速比中位数［区间］ | 局部指标或反例 |
| --- | --- | --- |
| WRF一小时模拟，hourly restart，serialnetCDF→PnetCDF | 1.42［1.37,1.50］ | 写步2.09倍 |
| 同一小时模拟，10分钟restart | 1.93［1.83,1.99］ | 写步3.26倍 |
| 相同10分钟restart场景，另一天重复 | 1.17［1.13,1.30］ | 同配置的性能也随运行日漂移 |
| hourly history，serialnetCDF→PnetCDF history | 0.99［0.93,1.08］ | 写步1.82倍而总时间未见相应改善 |
| Nek5000每步32文件改1个共享文件 | 0.95［0.88,0.99］ | 总体变慢 |

区间取11个排序配对比值中的第3–9个；在配对比值独立同分布等假设下，名义覆盖约93.5%，不是任意集群负载的可靠性保证。serialnetCDF先用MPI将数据汇集到rank0，这部分不在Darshan I/O调用计时内；因此仅看I/O调用耗时，会漏掉数据组织和通信成本。

## Support-and-limits

扩展[服务评价中的模式、建议与端到端验证](../notes/storage-latency-and-slo.md#patterns-and-end-to-end)，不另建同义评价笔记。增量是区分识别模式、建议实施与等价工作端到端净收益三个证据义务，不能由一个分类分数跨过中间环节。

prompt使用这些场景开发，样本小、建议手动实施、仅一套文件系统，未取得代码/原日志、未测专家劳动成本，也没有自动执行的安全或跨环境收益保证。不能由LLM建议减少或局部写步加速，推断全部应用更快。
