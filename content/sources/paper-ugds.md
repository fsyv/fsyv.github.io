---
title: "uGDS：GPU直存的数据、控制与完成路径"
date: 2026-10-26
draft: false
tags: [storage, inference, papers]
id: "bb940f39-3f8e-4b1a-9aec-bd91b2b42769"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
---

## Identity

- 作者：Jing Wei、Guanyi Chen、Qi Chen、Chuyu Zhang、Zheng Zhou、Chutian Wang、Jian Zhang。
- 原题：*uGDS: A User-Space Development Kit for High-Performance GPU Direct Storage*，2026。
- Canonical：[arXiv2610.30868v1](https://arxiv.org/abs/2610.30868v1)，首提2026-10-22T07:45:58Z；本轮仍仅v1。属于监测窗口补遗漏，非上次运行后新首发。
- 实际材料：[HTML](https://arxiv.org/html/2610.30868v1)，2026-10-26读取。

## Reading

§2.1–2.3、2.5–2.6、3.1–3.4、§4设置及4.3–4.6，另§4.2指定比较段；图仅图注和正文数字。未读PDF、代码、全部图像或复现实验，未核故障注入。正式出版限定检索没有取得可核记录，不证明没有发表。

## Evidence

NVMe命令构造、doorbell和完成队列在CPU用户态，payload经SSD→GPU的PCIe P2P DMA。预注册移出pinning/地址转换，不能据此说CPU控制成本消失。异步入口排入host callback，callback在上游stream工作完成后执行I/O并等待DMA完成，才放行下游kernel；同流严格顺序，独立流或无依赖批请求才可重叠/乱序完成。跨GPU/NVMe/RDMA的生产者—消费者同步仍需应用events或完成令牌。

§4.6同16MiB读，uGDS/GDS单线程同步为5.54/5.78GiB/s，单异步stream为5.49/2.36GiB/s。应用平台A100-SXM4-40GB、Samsung990PRO、PCIeGen4×4、cross-root-port P2P；Qwen3-0.6B、vLLM0.20.1+cu129、LMCache0.5.1.dev35、PyTorch2.11.0+cu129、CUDA12.9，关闭vLLM内存automatic prefix caching、强制SSD-only cache hit。32,768token单请求中位TTFT为GDS1915ms、uGDS715ms。不能把受控路径比较解释为物理链路上限提高或全部端到端因素已独立隔离。

Figure14用发起线程CPU time/wall time定义利用率：一线程/一QP/1MiB时，polling100%与中断4.15%，延迟232.6→245.3μs。中断涉及kernel MSI-X/eventfd/ppoll；不是整机CPU或能耗测量。

## Limits

解绑目标SSD的kernel NVMe driver，以raw block/aligned offset访问，放弃普通POSIX目录、锁和OS page-cache coherency，API相近不等于接口语义完全等价。硬件超时隔离handle并保留潜在DMA资源、等待外部reset是作者设计，未复现验证。应用只测特定命中路径，未覆盖miss、混合负载、长期稳定性或输出质量。原文goodput图注为logical KV tokens/s，未见SLO阈值/成功分母，不沿用本库SLO-goodput定义。

## Support

扩展[KV访问成本](../notes/kv-cache-optimization.md#direct-storage-and-ordering)中有效带宽的执行条件；不替代[逐请求服务目标](../notes/storage-latency-and-slo.md)的完整评价。

## Version-followup

2026-10-28，题录/history核到v2于2026-10-23T01:57:07Z提交，纠正10-26研究账本/回执曾称“仅v1”的版本核查。10-26实际读取固定v1的范围仍保留；本轮没有比较或读取v2正文，不把v1机制与数字升级为v2证据，也不将旧更新称为今日新发表。历史run不追溯改写。
