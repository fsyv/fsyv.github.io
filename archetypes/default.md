---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date | time.Format "2006-01-02" }}
draft: true
tags: []
id: "REPLACE-WITH-UUID"
kind: note
maturity: seed
endorsement: ai-candidate
---

<!-- 创建后用 uuidgen 替换 id；不要将 AI 候选观点视为用户已经确认。 -->

## Question

这篇笔记完整回答什么问题？

## Explanation

采用适合知识本身的结构，保留完整的解释、论证或推导。

## Boundaries

说明假设、成立条件、反例和不确定性。

## Links

用带语义说明的相对 Markdown 文件链接关联已有笔记、来源和问题。
