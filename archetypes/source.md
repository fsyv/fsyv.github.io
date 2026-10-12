---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date | time.Format "2006-01-02" }}
draft: true
tags: []
id: "REPLACE-WITH-UUID"
kind: source
maturity: seed
endorsement: not-applicable
read_status: unread
---

<!-- 创建后用 uuidgen 替换 id；未读全文时写明实际读取范围。 -->

## Identity

记录实际资料的标题、作者、年份、版本、URL 或 DOI、访问日期与读取范围。

## Summary

概括已读取的内容，区分原资料观点与推论。

## Evidence

记录关键证据所在页码、章节、图表或段落及其支持范围。

## Support

链接能够支持或反驳的知识。

## Limits

说明资料局限、未读取部分和不确定性。
