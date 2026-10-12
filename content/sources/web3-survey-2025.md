---
title: "Web 3.0 综述：架构、使能技术、应用与挑战"
date: 2026-10-12
draft: false
tags: [web3, foundations]
id: "5ca66227-7092-55a8-ab1a-294a7d0f96a2"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
---

## 资料

Bin Cao、Shaohe Xiao、Long Shi、Taotao Wang、Jinyu Chen、Jiaheng Wang、Xintong Ling、Hao Xu、Shengli Zhang、Erwu Liu，*Web 3.0: A Survey on the Architectures, Enabling Technologies, Applications, and Challenges*，2025。

- [公开作者版 PDF](https://ai.tongji.edu.cn/new_web/paper/25-07-1.pdf)
- [DOI：10.1109/COMST.2025.3589692](https://doi.org/10.1109/COMST.2025.3589692)

PDF 页脚说明已获 *IEEE Communications Surveys & Tutorials* 接收，正文尚可能在最终编辑时改变。本次未核对最终卷期与排版，不把作者版页码当作最终出版页码。

## 实际阅读

读取日期：2026-10-12。以 PDF 页面标注的页码定位，实际读取第 1–2、6–10、12 页；文件共有 41 页，本记录为**部分阅读**。

- 第 1–2 页：标题、作者、摘要与引言；“读—写—拥有”愿景，语义网与区块链 Web3 的不同用法。这里是综述作者组织领域的视角。
- 第 6–8 页、图 3：作者提出基础设施、区块链、用户界面的适应性三层架构，以及零信任、语义和 AI 的补充功能；第 8 页也承认技术不成熟和仅依赖区块链的限制。
- 第 8–9 页、图 4–5：身份管理、数据发布/检索、网络服务的流程组织；SSI、DID、VC，以及 Account、Authentication、Authorization、Audit 的职责划分。
- 第 10 页、图 6：授权和审计，以及数据发布/检索的实体与上传步骤。
- 第 12 页：网络流量隐私和本节小结，以及零信任使能技术的开头。

没有通读参考文献、逐项核验对比表中的全部方案、重现实验或审计所有技术主张。涉及具体协议的结论优先回到相应标准或原论文；例如 DID/VC 的保证另据 W3C，QMIX 另据其原论文。作者版 PDF 未复制进本库。

## 支持与局限

这份材料支持建立领域地图、追踪跨层职责和发现需要进一步核查的问题。三层与 4A 是作者用于综述的分析框架，不是所有 Web3 系统都已遵守的统一标准；“集成某技术可改善安全/性能”的愿景不能代替具体威胁模型或实验。

## Links

- 架构解释：[一次请求的职责链](../notes/web3-request-lifecycle.md)。
- 身份分支：[标识、声明、授权与审计](../notes/web3-identity-and-authorization.md)。
- 基础设施分支：[边缘位置、资源与治理](../notes/web3-edge-computing.md)。
- 导航：[Web3 基础地图](../maps/web3-foundations.md)。
