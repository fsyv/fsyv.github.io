---
title: "Costan 与 Devadas（2016）：SGX 的保护目标与信任前提"
date: 2026-10-12
draft: false
tags: [web3, foundations]
id: "77eb2eb5-9aff-4bb0-a70e-1f261608e894"
kind: source
maturity: developing
endorsement: not-applicable
read_status: partial
---

## 书目与读取

Victor Costan、Srinivas Devadas，*Intel SGX Explained*，IACR Cryptology ePrint Archive 2016/086，2016；入口记录最后修订于 2017-02-21。[官方入口](https://eprint.iacr.org/2016/086)。2026-10-12 仅读取摘要与版本记录，没有读取完整 PDF。

## 证据边界

摘要将保护目标限定为：在包括内核/虚拟机监控器在内的特权软件可能恶意时，保护敏感计算的机密性和完整性。作者明确包含对未公开细节的推测；本库没有把这些推测当作硬件保证。本材料不能替代当前平台的安全公告、侧信道评估或远程认证实现审计。

作为[隐私保护各层](../notes/web3-privacy-layers.md)中硬件隔离思路的资料入口，不代表所有 TEE 的统一能力。
