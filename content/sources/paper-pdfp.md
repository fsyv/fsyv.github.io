---
title: "PDFP：连续投影表示、整数外循环与GPU计时边界"
date: 2026-11-04
draft: false
tags: [optimization, gpu, evidence]
id: "e82a0516-c2f5-4d88-9684-21ce5b2011cd"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
math: true
---

## Identity

Liu、Lu、Mazumder，*PDFP: GPU-Accelerated Feasibility Pump via PDHG*，2026，[arXiv:2611.03629v1](https://arxiv.org/abs/2611.03629v1)，首次提交2026-11-02T18:54:16Z，所读recent索引列于11-03公告分组。[v1 HTML](https://arxiv.org/html/2611.03629v1)。属于本轮补遗漏，不称昨日最终核查后首发。

2026-11-04指定读取HTML §3.1、§4.1–4.3、§5的假设/sharpness/Thm5.4、§6.1–6.2主要算法与guard、§6.5、§7.1–7.5、§8.1–8.4/Table3。§6.1算法后的部分输出截断，不称完整读取该节；未PDF视觉、源码或运行。

## Mechanism-and-guarantees

可行性泵交替舍入整数目标与投影回连续松弛域，辅以扰动处理循环，目标是首个可行incumbent。PDFP以距离项的盒对偶保留原 $A/A^T$ 乘法与 $O(n)$ 向量操作，避免一般整数绝对值线性化引入的primal辅助变量/两条约束；仍新增距离对偶乘子，纯binary边界目标本来可直接线性化。

列缩放吸收进距离权重以保留目标。矩阵GPU驻留，CPU单线程round，每轮仍传整数目标/投影点；双轨不同seed共享同GPU，先成功停另一轨。

§5固定目标/权重/步长的单次连续凸投影分析要求LP可行及 $\eta\sigma\|K\|^2<1$，$K=[I_d;A]$、$I_d$ 为单位矩阵。局部有界sharpness及restart/reflected-Halpern支持相应线性收敛，问题常数依赖保留。不能推出整数外循环必成功或原MILP最优。

§6 guard在精确算术、最大fixed-point box和初始box fixed point等条件下讨论。批固定接受可等价于某个重排后的顺序 $\pi'$，不声称等于原顺序 $\pi$；未核浮点代码或所有分支。

## Experiment

Table3：MIPLIB2017至少1M非零的159候选，排4indicator/6infeasible/2unknown/5预处理后无法验证，142实例（53pure/89mixed）×4seed=568。H10080GB独占，双轨同卡；共用SCIP10.0.3预处理，排除读取/presolve/JIT，计入root LP和CPU/GPU pump，1800秒截止，统一 $10^{-6}$ 绝对容差检查整数/边界/约束。

完整对照表见[知识解释](../notes/feasibility-pump-and-continuous-projection.md#evidence-and-timing)。成功数/SGM10：FP2+cuPDLPx为381/133.6秒；cuOpt25.10.1 portfolio为401/195.0；Enhanced PDLP为380/159.7、双轨392/144.5；Enhanced PDFP为419/117.5、双轨424/113.4。SGM10平移10秒，失败按1800秒计；单PDFP mixed子集236.3秒略逊FP2的234.2秒。Enhanced同时改变阶段、round、容差及中间可行检查，不是只替投影器的消融。

## Limits-and-support

研究价值中（明确内外循环保证对象与表示成本）、启发价值高（保原矩阵的距离对偶），当前可靠性中（指定正文与表，未源码/复现）。支持[完整可行性泵解释](../notes/feasibility-pump-and-continuous-projection.md)，其中 $2x=1$ 整数无解例为AI教学构造。2026-11-11先核公开代码、数据搬移、guard与同条件消融；不把启发式或首可行解称全局优化保证。
