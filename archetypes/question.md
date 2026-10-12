---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date | time.Format "2006-01-02" }}
draft: true
tags: []
id: "REPLACE-WITH-UUID"
kind: question
maturity: seed
endorsement: ai-candidate
status: open
---

<!-- 创建后用 uuidgen 替换 id；研究完成前保留问题及证据缺口。 -->

## Question

记录问题及其提出者。

## Motivation

说明为何值得研究。

## Known

关联已有知识与已读取资料。

## Gaps

说明尚缺少的知识或证据。

## Next

提出下一步研究方向。

## Resolution

完成后链接已整合结果的知识笔记，再标记 resolved。
