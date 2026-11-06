---
title: "Luria–Delbrück 1943：独立培养的波动与选择前克隆"
date: 2026-11-05
draft: false
tags: [genetics, experimental-inference, probability]
id: "81298525-a273-4820-bcff-b3b0fce37c6b"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
---

## identity

Salvador E. Luria、Max Delbrück，*Mutations of Bacteria from Virus Sensitivity to Virus Resistance*，*Genetics* 28(6):491–511，1943。DOI [10.1093/genetics/28.6.491](https://doi.org/10.1093/genetics/28.6.491)。期刊题录给出1943-11-20发表、1943-05-29收稿；[PMC题录](https://pmc.ncbi.nlm.nih.gov/articles/1209226/)按月记1943-11，日期粒度不同。[Caltech原篇PDF镜像](https://bi116.caltech.edu/documents/7724/Wk2-LuriaDelbruck1943.pdf)与期刊/PMC为同一研究，不重复计数。本轮为近期发现旧资料。

2026-11-05指定部分深读印刷491–497、499–500（含抽样脚注）、501–507、509–510；未完整核498图1和508表4。原文503、504、510由临时PDF渲染后视觉核表与讨论，主控和独立角色另核；未重做原培养实验、追现代估计方法或重建全部原表统计量。原篇和图不保存在公开仓库。

## competing-hypotheses

492–494把关键区别放在选择前是否已有克隆关联：若暴露时每个细胞独立、以同一小概率生存，计数近似Poisson；若选择前已有可遗传变异，早发生事件会留下更多后代，培养间波动可以很大。作者区分(a)预存抗性与(b1)选择前已有遗传性存活倾向、接触后才获得不吸附性质，以及(b2)无克隆关系的随机生存。试验主要区分选择前克隆与后者，不能删去b1。

495–500理论采用稀有变异、增长与遗传后代等简化，处理变异事件数与最终抗性细胞数的区别。平均变异细胞比例不是每次分裂的变异率，具体估计需保留模型和抽样方式。500脚注说明对从培养取小样本的计数，需要扣除抽样波动再比较培养间变异。

## experiment-and-tables

501–504先用同一培养液分样检验铺板与抽样是否引入额外大波动，再比较小而相等接种量建立的平行独立培养。二者改变的是选择前增长历史是否独立，不只是把培养皿数量增加。

503 Table1 Exp3同一培养液的10个样本，作者报告每样本mean3.3、variance3.8。504 Table2 Exp11为10个10.0cc独立培养，各取0.05cc样本，报告mean62、扣除抽样成分的variance3498。两表的方差口径不同，这里只转述视觉核对的原表报告值，不将其当统一无偏样本方差、直接比倍数或声称逐行重算一致。原表支持的是：独立培养的差异远超同培养分样所表现的抽样波动。

505–507对理论与实验的偏差、假设和估计作进一步讨论，不能把数量级一致写成全部精确拟合。509–510明确仍可能是选择前已有遗传性存活倾向与接触后表面吸附性质改变的组合；作者认为直接变异解释更可能，但没有据这项统计试验独立完成所有生化表型的时序识别。

## support-and-limits

支持[波动试验与选择前变异](../notes/fluctuation-tests-and-preexisting-variation.md)的机制解释。该页Poisson双时段算例为AI教学构造，不来自作者拟合。高方差可由其他异质机制产生是AI建模提醒，尚未核新替代模型数据；不把任意重尾现象判为相同谱系机制。

研究价值中（新建实验识别分支），启发价值高（用重复设计观察历史）；限定原文事实与代数可靠性高，普遍生物机制和现代突变率估计不在已核范围。
