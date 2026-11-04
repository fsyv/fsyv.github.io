---
title: "ExactLoop：融合的舍入边界与服务批次改变的区别"
date: 2026-11-05
draft: false
tags: [inference, numerical-analysis, systems]
id: "abcf7780-2e77-4ce2-89d5-1b2ebc391399"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
---

## identity

Dezhen Lu、Runguo Li、Zixiang Ni、Yuchen Tang、Xingquan Kong、Jiaxing Yang、Jiarui Guo、Lingxiang Gao，*What Sets the Serving Speed of Looped Language Models? Measurements and Optimizations Graded by Exactness*，2026。[arXiv:2611.05150v1](https://arxiv.org/abs/2611.05150v1) 首次提交2026-11-03T16:25:43Z；11-04为实际recent索引的公告分组，11-05补读，不称今日新发表。[v1 HTML](https://arxiv.org/html/2611.05150v1)。

2026-11-05实读HTML §1–4.5、§5.1、§5.4–5.8、Appendix A/B和D Tables A2–A5相关文字与表；§5.9–5.11及prefill/decode分离部分只浏览指定段。未读作者源码、PDF视觉图、原日志或运行复现。以下为作者报告及本库的条件化解释，非实现验证。

## rounding-and-batches

§3在RTX5090上把Ouro每token提交数从6降到3，batch1 TPOT为16.2→16.3ms；GH200 profile每token5689个kernel指向细粒度kernel成本，不能把所有开销归于循环提交次数。Ouro测试固定24层、4次循环。

§4.2的融合保留PyTorch归约次序，并用inline PTX conversion/multiply固定舍入边界。残差计算先对乘积舍入再相加，与保留高精度乘积到最终相加后才舍入，可以不同；作者75,776个BF16元素中18.4%相差1ulp。源码cast可能被编译器消除、合并或收缩，数学式相同并不足以固定机器计算。§4.2所述早期fused路径只用于graphs，因为eager prefill的host成本可能变慢；§5.6说明packed prefill把eager调用变大后，released defaults也对大于256 rows的eager调用使用exact kernels。这里是作者描述的配置演进，尚未审固定版本源码，不将早期局部限定当全部发布路径的永久规则。

§4.1 Huginn的256个layer slots中132个存活，压实后每页32块变17块。相同批次233/233请求相同；容量增加后请求分组改变，309/312相同。§4.3 loop fusion也可改变批组成及GEMM选择。论文r0的bitwise条件需固定输入和批组成，不能把整套服务配置称为始终不改变token。

§4.4按(seed, position, channel)定位Huginn噪声，避免cache skip改变抽样次序；GPU full cache hit对cold仍仅108/128相同，cold重复128/128。只计算suffix改变GEMM行数，随机性身份恢复并未单独保证GPU精确复用。

## controlled-comparison

Appendix D Table A2为standalone GH200、Ouro1.4B、512随机prompt token/128 greedy输出token；其他released defaults固定，仅开关fused kernel集合。两轮交错实验各三次、去首次，共保留四次。

| 并发请求 | unfused tok/s | exact吞吐比 | approximate吞吐比 |
| --- | --- | --- | --- |
| 1 | 54.9 | 1.55 | 1.58 |
| 8 | 350.2 | 1.59 | 1.67 |
| 32 | 782.4 | 1.51 | 1.40 |
| 128 | 1218.8 | 1.11 | 1.23 |

§5.6报告exact对unfused的1014/1014请求整段token相同，approximate为894/1014；作者结合run spread认为近似融合没有可辨速度收益。这是所测配置/请求的结果，不是任意输入或跨硬件的证明。全引擎1.6–3.2倍还包含其他变换，不归因于这一组kernel。

§5.8的87题近似融合初筛未过内部1百分点规则；1319题复查点估计又在规则内，但GPU、batch与reference均不同。作者未发布近似路径的理由还包括不bitwise和无可辨速度收益。内部规则不是显著性检验，不能由初筛断言近似融合普遍降低准确率。

## limits-and-support

Appendix A说明公开snapshot缺部分原campaign日志/harness且晚于部分结果；Appendix B保留2/10线上Poisson运行abort及未闭合原因。未据此承诺整套可复现或生产稳定性。

支持[KV复用中的舍入、随机性与批组成](../notes/kv-cache-mechanism.md#rounding-and-execution)：比Flide既有的逻辑/浮点区分增加可实施的舍入边界机制。研究价值高、启发价值高，限定正文证据可靠性中；固定代码、跨配置测试与线上稳定性仍待核。
