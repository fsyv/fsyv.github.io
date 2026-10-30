---
title: "WorldPager：预取、陈旧回退与分层世界模型的等待边界"
date: 2026-10-28
draft: false
tags: [kv-cache, world-models, offloading]
id: "242d9277-6cd3-46f3-ab4a-116c6119a9f1"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
math: true
---

## Identity

Bingnan Liu、Ruini Xue，*WorldPager: Zero-Stall Tiered Memory for Long-Horizon World Models on a Single Consumer GPU*，2026，[arXiv:2610.35529v1](https://arxiv.org/abs/2610.35529v1)，首次提交 2026-10-26T14:44:33Z。[v1 HTML](https://arxiv.org/html/2610.35529v1)。本轮窗口内新预印本，不将标题视为已经证明的普遍保证。

2026-10-28 读取 §II-A–E、III-A–E、IV-A–F、VII；未深读 V/附录、未读 PDF、代码或复现，图只读图注与正文数值，没有像素核图。

## Mechanism

GPU、主存与 NVMe 分层保存生成历史；远端块 int4、sink/window/current 保持 bf16。系统按匀速外推下一相机 pose，在当前 denoise 时预取下一 chunk。预测检索块未到时可复用前一 chunk 的 stale retrieval set，以检索内容晚一 chunk 换掉等待；反量化位于 compute stream。dirty 块后台写回，只驱逐 clean 块，O_DIRECT 避免 page cache 重复计主存。

§II-E 用 $\max(0,r_{\rm new}/\mathrm{BW}_R-T_c)$ 近似读等待，并要求写带宽 $\mathrm{BW}_W\ge B_c/T_c$ 。$r_{\rm new}$ 为新读字节、$T_c$ 为计算窗口、$B_c$ 为每 chunk 保存字节，带宽是实际读/写 B/s。该平均模型不含全部波动、争用和预测错误。

## Evidence

RTX 4090 24GB、单 NVMe 顺序读 5.82GB/s，32GiB cgroup、无 swap，pinned 计主存；MG2 1.8B，每 chunk 12 帧、四次 denoise、检索三个旧 chunk。每 chunk bf16 486.6MB，int4 加每 64 元素 bf16 scales 后 129.4MB，K/channel、V/token。

§IV-C 两条 synthetic dense-revisit 轨迹各 36 chunks，去一 warmup、五 rollouts，共各 165 稳态 chunks；同 image/seed，没有 timing CI。强制检索块从 NVMe 读取的 unlimited a_yaw，WorldPager 中位 chunk 1255.8ms、stall 0；按需且保留 LRU staging reuse 的对照为 1309.5ms、stall 60.2ms。没有复用的同步对照另含复用差异，不能只归因预取。

软件 token-bucket 限速 0.25GB/s 时，b1_ws median stall 0.03ms、p99 399ms；0.1/0.05GB/s 时，其预取 p99 2621/6490ms，反劣于按需的 2424/4844ms。stall 只计等待 retrieved KV，排除反量化与写回，超过 0.5ms 才记为 stalled。不能把“zero”扩大为所有 I/O 免费或普遍尾时延改善。

§IV-E 3000 chunks 对应播放 37.5 分钟、wall 63.2 分钟，约 9.5fps，并非 16fps 实时。该轨迹没有重访 spilled chunk，主要验证写路径；另有 2000-chunk 三场景往返读取测试。600-chunk 三场景往返、五 seeds、每 tier 39 events 中，间隔超过 300 chunks 的 int4 相对 bf16 MUSIQ 差为 −1.28，95% 事件级 bootstrap 区间 [−2.25,−0.36]（每事件先跨保留 seeds 平均）；短程无可测质量损失不能覆盖长间隔。

## Limits-and-support

作者重实现全部基线；ReWorld-style 加入 stale fallback，且没有原 bank cap/training，不能当官方原实现横评。RoPE 表在 341 chunks 的独立限制通过重新旋转处理，不能与存储容量收益混为一因。第二 LingBot 只有系统指标，未观察一致性改善。未读代码、真实慢盘或 LLM 负载，不建议直接部署。

支持[KV 预取的预测可得性与语义代价](../notes/kv-cache-optimization.md#predictive-prefetch-and-staleness)：容量、可预知检索、等待边界和质量应分别验证。其带宽例子是 AI 复算，不是作者硬件测量。
