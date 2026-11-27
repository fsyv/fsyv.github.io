---
title: "Rama 等：两个流行病预测流程的滚动比较"
date: 2026-11-17
draft: false
tags: [forecasting, epidemiology, validation]
id: "c99d2dc6-e5b5-4165-b479-2b3ff540e876"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
---

## Identity

Martina Rama、Yuhan Li、Bruno Lepri、Nicola Perra、Michele Tizzoni，*A systematic comparison of physics-informed neural networks and mechanistic models for epidemic modeling and forecasting*，2026，[arXiv:2611.18389v1](https://arxiv.org/abs/2611.18389v1)。2026-11-13T16:32:42Z 首提，11-16 公告。2026-11-17 指定读取 [HTML](https://arxiv.org/html/2611.18389v1) §§2.1–2.6、3.1–3.2、4、附 §§5.5、12，重点是 Tables 1、3、8。

## Evidence

- §§2.2–2.5 的两条流程共享年龄分层 SEIRD。PINN 预训练确定性 ODE 解代理，再用按近因加权的 Poisson 似然做参数后验采样。随机机制模型以二项转移推进状态，用加权误差校准 ABC-SMC。两者还采用不同的初始状态参数化。经验基线将已经观测到的增量及其相反数作为有放回抽样的经验分布，从最新值起累加并截零，每轮采样 10,000 条路径。
- §2.6 式 11–12 用 11 个区间和中位预测计算加权区间评分 WIS。分数随区间宽度、落点偏出区间的距离和中位误差增加。§3.1 Table 1 的合成目标是带负二项观测噪声的周新感染。两种基本再生数 1.5/2.0 下，PINN 的 WIS 为 0.224/0.126，随机机制模型为 0.191/0.094。各值按同场景的基线归一。名义 90% 区间覆盖分别是 54.6%/32.4% 与 100%/100%。
- §3.2 Table 3 的真实目标是 2020 年伦敦第一波周死亡。3 月 15 日首次起报，评价截止至 7 月 19 日，1–4 周各有 18、17、16、15 个配对。合计 66 个窗口与预测跨度的配对，目标周可重叠。PINN/随机机制/基线的归一 WIS 为 2.629/3.879/1.000，90% 名义区间实覆盖 39.4%/43.9%/78.8%。§12 Table 8 同时改到仅过去五周且不使用原权重时，两个模型的 WIS 为 2.206/3.841，PINN 的 90% 实覆盖 62.1%。

## Reproduction-scope

指定增读作者固定提交 da002cf63a4ddadf9fd6dcb9d8b82d9abb3f2e8e 的 [README](https://github.com/martina-rama/PINNvsMechanistic-models-for-epidemic-modeling-and-forecasting/blob/da002cf63a4ddadf9fd6dcb9d8b82d9abb3f2e8e/README.md)、[复现论文指标的 09 notebook](https://github.com/martina-rama/PINNvsMechanistic-models-for-epidemic-modeling-and-forecasting/blob/da002cf63a4ddadf9fd6dcb9d8b82d9abb3f2e8e/notebooks/09_forecast_metrics.ipynb)、[10 notebook](https://github.com/martina-rama/PINNvsMechanistic-models-for-epidemic-modeling-and-forecasting/blob/da002cf63a4ddadf9fd6dcb9d8b82d9abb3f2e8e/notebooks/10_best_seed.ipynb)及 [best_seed.py L52–81、105–125、150–163](https://github.com/martina-rama/PINNvsMechanistic-models-for-epidemic-modeling-and-forecasting/blob/da002cf63a4ddadf9fd6dcb9d8b82d9abb3f2e8e/src/pinnvsmech/evaluation/best_seed.py#L52-L163)。09 notebook 默认预计算且 PINN 选 best，伦敦全历史加权的路径落到 real_london_lookback25/best_WIS/forecast_h4/forecast_results.pickle。10 notebook 和评分代码从 100 个训练种子里按场景选全局种子，评分为各起报窗对已有观测拟合 WIS 的汇总，后窗拟合可包含前窗预测的目标周。该工件路径提供时序检查的依据。未读取 pickle 或运行 notebook，未估计种子规则改变对发表分数的影响。

## Support-and-limits

[滚动预测的区间、历史基线与选种时序](../notes/epidemic-forecast-interval-validation.md)解释为什么同一预测问题要同时查看相对分数、实际覆盖和起报时信息集。研究价值在于复杂流程相对基线在不同目标上的排名可能翻转。启发价值在于回测可将实时估计限制在历史数据，却仍需检查需要跨窗确定的配置。伦敦为单城单波，合成与真实区段改变了观测目标、噪声和生成过程，两流程也同时改变多项建模选择。本文结果与静态工件均可定位，未在本库重跑。
