---
title: "Agent serving的亚稳态：会话人口、缓存反馈与SLO口径"
date: 2026-11-04
draft: false
tags: [kv-cache, serving, evidence]
id: "9f70db5f-1760-44b3-ba0a-418121d613a0"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
math: true
---

## Identity

Lu、Zhou、Lin、Ustiugov，*When Cache Pressure Becomes a Trap: Metastability in Agent Serving*，2026，[arXiv:2611.02543v1](https://arxiv.org/abs/2611.02543v1)，首次提交2026-11-02T05:13:05Z，所读recent索引列于11-03公告分组。[v1 HTML](https://arxiv.org/html/2611.02543v1)。本轮补上次遗漏，非昨日最终核查后新发。

2026-11-04指定深读HTML §2、§3.1–3.4、§5.1–5.3、§6.6、§7.1–7.2、§9，§1作背景。未读PDF视觉、代码、原轨迹或复现；不是全文验证。

## Mechanism-and-evidence

§2–3区分外部会话与会话内部call/tool/call；工具期也保留未来前缀需求。§5用 $dN/dt=\lambda-X(N)/K$ 解释会话积压，$N$ 包含工具阶段、$X$ 是调用吞吐、$K$ 是每会话平均调用数。命中率下降可让离开率先增后降，形成有限冲击后持续拥塞的机制。

§3硬件为Qwen3.6-35B-A3B FP8、SGLang PD、NIXL，两H100 NVL的1P/1D。216条TerminalBench轨迹含7108calls，prompt中位25.6K/p90 77K token，复用98.2%，tool间隔中位0.42秒；P/D缓存约1.09M/1.66M token。Poisson外部到达，基准3.3sessions/min、第15–25min加倍再恢复。TTFT中位约0.2→60秒、hit约0.95→0.27；恢复后一小时到达会话的SLO合格goodput138→17sessions/h，调用完成量仅约0.80倍，不将88%下降改写为call吞吐。

§7.1 session goodput同时要求会话完成、slowdown≤4、至少95%decode steps满足50ms ITL；slowdown包含首次等待，并用无负载参考耗时归一，拒绝/shedding算失败。不同论文同名goodput不可直接合并。

§3.3另一次4倍基线短会话burst中，比较终止冲击会话与让其自然结束：短会话健康时约5min完成，第25min终止后约2min恢复；保留到90min时活跃会话约2.4倍无冲击。终止也移除后续需求，不是仅缓存单变量。

§5/6.6的容量判据来自实测hit cliff及decode饱和近似。36模拟中17cache-first全被覆盖，但19decode-first有8误报，合计28/36正确；不单列召回当普遍可靠。同 $W/C$ 约1.6–1.7时host hit可为0.26–0.37或0.81–0.93，历史不由工作集比例完全决定。

## Limits-and-support

Basin的完整预测peak-context/size排序证据限模拟；硬件仅arrival排序、当前context准入、lending/shedding等，不称完整预测原型已硬件验证。模型用平均上下文与测量曲线，非普适阈值或稳定性证书。未核源码配置，2026-11-11先复评明确实现。

支持[会话人口与缓存反馈](../notes/session-cache-pressure-and-metastability.md)的完整解释；局部导数稳定性推导属于AI，不冒充论文额外定理。研究价值高（把恢复失败连到内生服务率）、启发价值高（把工具期纳入状态），当前证据可靠性中（指定正文，未独立运行）。
