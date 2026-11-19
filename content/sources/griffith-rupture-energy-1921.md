---
title: "Griffith 裂纹能量原文与现代系数的阅读范围"
date: 2026-11-20
draft: false
tags: [fracture-mechanics, elasticity]
id: "8540cceb-a3cd-4389-bf27-69ea1988030f"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
math: true
---

## Identity

- A. A. Griffith，*The Phenomena of Rupture and Flow in Solids*，**Philosophical Transactions of the Royal Society A 221, 163–198**，[DOI](https://doi.org/10.1098/rsta.1921.0006) · [实际读取扫描](https://imechanica.org/sites/default/files/1921%20Griffith%20The%20phenomena%20of%20rupture%20and%20flow%20in%20solids.pdf)。题录卷年通常为 1921；视觉核 p.163 页脚印刷日为 **1920-10-21**，收到和宣读分别为 1920-02-11、02-26。两种日期并列，不将旧文称近期发表。
- Zhigang Suo，*The Griffith Paper*，ES247 Fracture Mechanics 讲义，页脚 **2016-02-05**，[实际读取讲义](https://imechanica.egr.uh.edu/sites/default/files/Griffith%202016%2002%2005.pdf)。用于现代薄板能量式和旧系数辨认，未将讲义当原实验。

2026-11-20 Frontier Explorer 实际视觉读 Griffith p.163 的题录和目录、165–166 §2、169–170 §3 指定式、172–176 §4 指定材料/测量/Table I–III 及比较、198 作者末注。Suo 讲义指定读 pp.1–2、7–11，视觉核 8、11；主控另核 pp.7–10 文本与主要算术。两对象各一次指定部分深读，非全文、完整边值求解或实验复现。Architect 据会话交接整合。

出版者 403、Alabama 镜像超时；web PDF 缺 OCR，截图只返回引用。研究员最终以本机已有 Poppler 在内存渲染原页核读，未将论文或截图存入公开仓库。扫描红色现代批注与黑色原印分开。

## Evidence

| 位置 | 证据 | 边界 |
| --- | --- | --- |
| Griffith 165–166 | 表面形成需要能量；比较包含外力势的系统机械势能 | 恒载下不能写成试样应变能下降 |
| Griffith 169–170、Suo 7–11 | 裂纹弹性释放项、表面项、临界关系与旧式的泊松比错误 | 现代式限大薄板、平面应力、线弹性和表面能主耗散；$\pi$ 来自边值解 |
| Griffith 172–174，Table I | $E=9.01\times10^6$ psi、$\nu=0.251$；高温测量后外推 $T=0.0031$ lb/in 至 15°C | 不是直接测得室温表面能，高温到低温的外推须保留 |
| Griffith 174–175，Table II | 四行球泡裂长、直径、双轴应力及近常数 $R\sqrt c$ | 原表圆整量重算不逐行完全一致，不据此改原表 |
| Griffith 176 | 旧式系数约 266，与所有试样平均约 239 的比较 | 数值近似吻合须结合末注重审 |
| Griffith 198 | 作者承认 §3 能量计算须更正，影响多式数值，并要求重审实验验证 | 不是 PDF 红色现代批注，未由此确定剩余差异的物理原因 |

## Support-and-limits

支持 [裂纹能量与系数验证](../notes/griffith-crack-energy-and-coefficient-validation.md)。四行乘积和固定原参数下 266.162/133.347 的比较为 AI 算术，研究通道与主控独立复算一致；不是作者数据复现或球泡和无限板的严格同条件预测。

原表、题录差异和末注可定位；限定现代能量模型可靠性高。研究价值中、启发价值高，首次新增材料断裂视角。有限曲率、双轴应力、退火和表面状态、额外耗散及真实裂纹速度仍需独立证据。
