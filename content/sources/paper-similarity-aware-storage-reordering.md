---
title: "Huang 等：分布式文件系统的相似性感知客户端重排"
date: 2026-11-19
draft: false
tags: [storage, compression, systems]
id: "0d6da1de-86a1-4253-9838-7d0f2f8a9730"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
---

## Identity

Yuanhong Huang、Zicong Chen、Yili Ma、Jinwu Yang、Yulong Chen、Guangming Tan、Dingwen Tao，*Similarity-Aware Client-Side Reordering for Server-Side Storage Compression in Distributed File Systems*，2026。[arXiv 2611.22847v1](https://arxiv.org/abs/2611.22847v1) 首提 2026-11-17T14:28:30Z，11-18 公告；[实际读取 HTML](https://arxiv.org/html/2611.22847v1)。新预印本、本次新增监测；首提早于上一轮终点，不把公告日期冒充首提或精确公告小时。

2026-11-19 Domain Monitor 实读 §§2.1–2.3、3.1–3.4、Algorithm 1、§§4.1–4.4、Tables 1–2、Figures 4–7 图注与解释、§5。未视觉读取图、审查代码或运行原型。

## Evidence

§§2–3 与 Algorithm 1 支持独立压缩记录中的匹配局部性、64 MB 窗口/8 KB 块/128 KB 记录、四布局的两级采样选择、正逆映射及两个不可变对象的发布次序。服务器 Zstd level3 不变，重排未压缩字节仍经过网络；适用大文件顺序导入与追加。

§4 与 Tables 1–2、Figures 4–7 图注/解释给出两客户端、四存储节点的 SkyFS/OpenZFS 原型比较。空间包含持久恢复映射；IBD 3.91→6.85、VM 2.27→3.49、EXAFEL 1.13→1.14，原文空间减少42.9%/35.0%/0.9%。VM64线程总写时间4.71→5.81s，网络均1.93s；全数据集写吞吐保留70.8–81.1%。8KB随机读为冷ZFS数据、热客户端逆映射，排除首次映射加载及10,000次热身，64线程保留128KB基线92.9–98.2% IOPS；1MB记录对照仅约53.1–53.5%。

[完整解释](../notes/record-reordering-and-compression-granularity.md)把这些条件与 AI 空间换算放在一起。研究员和主控分别以有理数复核1−3.91/6.85及VM写时间比；不是重跑压缩器或原作者实验。教学块布局也为AI构造。

## Limits

两级样本都参与选择，不是独立保留集；试压数据比例不含特征提取、分组与打包。发布描述未由本轮故障注入验证；原位覆盖和同文件并发修改不在原型范围。原始测量、代码、冷映射与混合更新尚未审核，不用原型结果授予部署保证。研究与启发价值高；设计范围可核，性能可靠中，独立执行仍缺。
