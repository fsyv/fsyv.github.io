---
title: "Brandão 与 Peralta（2021）：隐私计算与差分隐私的互补"
date: 2026-10-12
draft: false
tags: [web3, foundations]
id: "e12fff10-97d7-4d0e-91e8-917b53ccc65b"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
---

## 书目与读取

Luís T. A. N. Brandão、René Peralta，*Privacy-Enhancing Cryptography to Complement Differential Privacy*，NIST Cybersecurity Insights，2021。[官方文章](https://www.nist.gov/blogs/cybersecurity-insights/privacy-enhancing-cryptography-complement-differential-privacy)。2026-10-12 读取 What is safe to compute、Privacy-enhancing cryptography techniques 中 SMPC、ZKP、FHE 说明，以及结论；未读取其引用论文。

## 支持与边界

文章区分计算过程保密与输出泄露：密码学工具可限制暴露为约定输出，差分隐私约束输出对个体的泄露。ZKP 证明声明，FHE 处理密文，MPC 联合计算，三者职责不同。这里记录的是概念性说明，不提供具体安全参数、协议实现或成本保证。

支持[隐私保护各层](../notes/web3-privacy-layers.md)。
