---
title: "Liu、Dai 与 Wen：经典双块 ADMM 的乘子步长边界"
date: 2026-11-10
draft: false
tags: [optimization, admm, convex-analysis]
id: "932e637f-ffc0-4d75-b39c-41b06a0c1c22"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
math: true
---

## Identity

Benqi Liu、Qiming Dai、Zaiwen Wen，*The multiplier step size in classical two-block ADMM: convergence and counterexamples*，2026，[arXiv:2611.09169v1](https://arxiv.org/abs/2611.09169v1)。首提于 2026-11-06T08:51:05Z，11-09 官方公告。指定读取 [HTML](https://arxiv.org/html/2611.09169v1) §1–2、§3.1–3.3 和 Table 1、§4.1–4.2 的 Eq. (4.1)–(4.4) 和 Table 2、§5.1–5.2、§6、Appendix C.1–C.3。未读 PDF 视觉，未执行作者证书或验证轨道和数值。

## Evidence

- §1 的迭代式固定罚参数，两块按序精确最小化，单独改变乘子反馈倍数。Theorem 2.1 保证有限维闭真凸、存在 KKT 解且每步取得最小值的轨道，在 $0<\gamma\le L$ 时约束像和乘子收敛、残差趋零、目标趋最优。两块约束矩阵均满列秩足以推出原变量收敛。
- §3 先还原为像空间的两个近端步。证明把凸次梯度的内积不等式加权，验证有限记忆能量的下降和有下界这两种不同条件。Appendix C.1–C.2 近 $L$ 使用 256 项滞后乘子，在单位圆上检查 Hermitian 型不等式，并以有理 Bernstein 正性证书验证全频率条件。
- §4 构造两个固定凸多面体，逐相位验算投影法向量与凸集顶点的支持不等式。Theorem 2.2 的 96 维 48 相位投影周期适用于 $\gamma\ge\widehat{\gamma}$。§5 的严格化与有限插值在 $\widehat{\gamma}$ 处给出光滑强凸版本。
- Corollary 2.3 把统一端点严格夹在 $L=1.886882470025$ 与 $U=1.886882643762680$ 之间。上界来自 Appendix C.3 的另一条 1024 相位严格投影周期。支持不等式严格，故稍降步长仍有反例。论文保留精确端点与该端点是否收敛。

## Support-and-limits

支持[双块 ADMM 的反馈边界](../notes/two-block-admm-multiplier-step.md)。统一保证需要问题与迭代的明确条件，不能当成任一近似实现的推荐值。研究价值高在推进一般凸问题的证明区间；启发价值高在把周期轨道作为可检验反例。定理和构造的定位可核，独立执行和完整证书复核仍缺。
