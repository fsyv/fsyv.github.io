# 每日研究与晨间审核

每天的目标是推进已有问题、监测重要变化、探索未知领域，再把少量候选理解交给用户审核。完整任务在 [daily-research.md](prompts/daily-research.md)，策略在 [config.md](config.md)。简报不是永久笔记的批量生产入口。

## 每日使用

1. 从 Codex 定时任务结果打开 `research/digests/YYYY-MM-DD.md` 或当日 Draft PR；先看今日判断、证据边界及需要决定的事项。
2. 用发现编号讨论，例如“深入解释 A1”“C1 的类比哪里失效？”；必要时阅读来源。
3. 在 PR 评论中写清范围：`[A1] 证据不足：请补……`、`[C1] 有启发，继续探索`、`接受 notes/... 的 ... 小节；拒绝 ...；暂缓 ...`。
4. 对 Codex 说“处理 YYYY-MM-DD 研究 PR 中我的反馈并更新候选”。它采集反馈、整理候选、重审与构建；最后由你在 GitHub 决定合并或关闭。没有自动合并入口。

手动补跑只需在本项目对 Codex 说：

> 按 research/prompts/daily-research.md 补跑今天的每日研究。先检查已有当日结果和反馈，复用工作树与 PR，不推送基础改造，不自动合并。

无需每天手工整理文件或操作 Git。所有长期资产都是 Markdown/Git；浏览器中的 PR 与本地候选都能继续迁移。

## 文件与工作树

```text
research/
  config.md                     时区、三通道比例、质量与资源上限
  prompts/daily-research.md      可重复的主控任务
  templates/daily-digest.md      简报结构
  digests/YYYY-MM-DD.md          简报（不进入 Hugo）
  feedback/                     显式意见与处理结果
  state/sources.md              来源标识/版本/阅读范围/去重
  state/coverage.md             选题轮换、探索覆盖与问题回访
  state/runs/YYYY-MM-DD.md       运行、独立审核与构建回执
scripts/research.mjs             Git/gh 辅助，不调用模型
scripts/test-research.mjs       临时 Git + fake gh 行为验证
```

正式分支为 `research/YYYY-MM-DD`，工作树在主仓库同级 `.<仓库名>-research/YYYY-MM-DD/`。简报、状态与候选知识都保存在这个 Git 工作树内；主工作区的 `content/` 保持不变。正式合并后这些 Markdown 才进入 main，网站仅发布 `content/`。

同日重跑复用路径、稳定发现编号和已有 open PR。closed/merged 当日 PR 不再创建；需要独立争议提案先说明具体拆分，不偷偷追加第二个综合 PR。处理过的来源也读取未合并 PR 的来源账本，避免每天等待合并期间重复推荐。

本地研究的账本保存在候选分支，未合入主目录；后续任务也读取本地 `research/*` 分支的账本与反馈，保证跨日去重。当天研究结果不必为了读取而提前接受。可在对应工作树打开简报，或用 `git show research/YYYY-MM-DD:research/digests/YYYY-MM-DD.md` 读取。

**首次启用发布前，必须由用户先将本地基础改造审核并合入远端 main，再有意同步本地 main 和 origin/main，保持主目录干净。** 基础尚未同步时，普通 prepare 应当拒绝；自动研究不能为了通过检查提交或推送基础改造。

本地模拟允许 `--local-snapshot`：临时 Git index 收集当前最新的公开允许文件、未跟踪新内容与删除状态，创建本地快照，不更改主 index 或 main；过滤忽略文件、个人工作区和常见凭据。快照不是第二份长期 Markdown 源，只是本次候选的版本基线。该分支永远不符合 helper 的发布条件，**禁止手工 push 这种快照分支**。未安装 Git hooks，不能声称可阻止绕过 helper 的手工 Git 操作。未知隐私仍需人工/Reviewer 检查。

## 模型与权限

| 任务/角色 | 目标模型 | 强度 | 边界 |
| --- | --- | --- | --- |
| 主控 | gpt-6.1-sol | xhigh | 选题、预算、汇总、GitHub |
| researcher / Question Researcher | gpt-6.1-sol | xhigh | A，只读研究问题与证据 |
| domain_monitor | gpt-6.1-sol | xhigh | B、日期核验、去重、C 基础初筛，只读 |
| frontier_explorer | gpt-6-astra | high | C 高潜力方向、理论与映射边界，只读 |
| architect | gpt-6.1-sol | xhigh | 独占候选工作树的指定文件 |
| reviewer | gpt-6-astra | high | 独立复核重要证据与候选，只读 |

项目默认及每个独立角色文件使用[官方 Agent 配置](https://learn.chatgpt.com/docs/agent-configuration/subagents)，并发上限 4。当前宿主实际最多同时运行 3 个子任务时排队，不扩大到无效并行。Astra 不无条件重复初筛，重点深读开放探索与高风险审核。

项目和定时任务均使用 Sol 6.1 xhigh；Astra 角色使用 high，不配置额外 API Key。调用时核对实际模型与强度。显式按职责委派与按名字自动加载 TOML 是不同验证事项，不把配置解析成功当成角色运行成功。

## 定时运行

目标 **周一至周五 07:30 Asia/Shanghai** 启动，争取 09:30 前交付，不保证硬性完成时间。调度的实际 ID/模型/状态与时区换算见 `state/schedule.md`。任务提示词会每次读取仓库完整任务，不依赖本聊天记忆。

使用原生独立项目定时任务；原生工具当前只提供项目本地入口，因此由提示词先创建独立 worktree，再进行任何候选写入。当前基础未就绪时可以本地快照运行简报，但发布检查必须阻止远端写入。任务能创建不代表无人值守执行已通过。

按[官方调度说明](https://learn.chatgpt.com/docs/automations?surface=app)，本地电脑必须开机、唤醒、应用保持运行且项目在磁盘上；睡眠/退出、网络、模型额度、工具权限都可能导致延迟或失败。没有安装系统唤醒任务或另计费云端代理。任务结果在客户端 Scheduled 中查看，可手动补跑。

每次运行检查：本地读取/写入、搜索、子 Agent、Git、gh 登录/目标仓库及远端主分支。外部检索失败只做本地问题梳理；记录 partial/failed 和失败阶段，不能称有当天新研究或晨报已完成。07:30 定时真正触发及无人值守权限需后续真实运行观察，手动成功不是调度成功。

## GitHub 辅助与发布检查

需要 Node.js（沿用现有站点检查器）、Git、gh 和 Hugo Extended 0.166.0。本机已将验证过的 Hugo 缓存至共享 Git 目录的 `research-tools/hugo`，不会提交二进制；没有全局安装 Hugo。提示词会解析该位置，换机器后需重新准备相同版本。以下命令供 Codex 主控使用：

```sh
node scripts/research.mjs prepare YYYY-MM-DD
# 基础尚未同步远端时，仅在本地研究：
node scripts/research.mjs prepare YYYY-MM-DD --local-snapshot
node scripts/research.mjs check-publish YYYY-MM-DD
node scripts/research.mjs publish YYYY-MM-DD
node scripts/research.mjs publish YYYY-MM-DD --execute
node scripts/research.mjs feedback YYYY-MM-DD
node scripts/test-research.mjs
```

prepare/check/publish 检查主目录、main/origin/main/实际远端 SHA、基础文件、研究基线、允许变更范围、独立审核回执及同日 PR；不自动 reset、clean、更新 main 或强推。允许候选范围为 `content/` 及 `research/digests/`、`research/feedback/`、`research/state/`；基础配置变更不允许混入每日 PR。仅简报/状态且无知识修改时不创建空知识 PR。

publish 默认只打印计划；只有 `--execute` 执行普通 push 和 `gh pr create --draft` 或更新已有 PR。标题为 `[Daily Research] YYYY-MM-DD 每日知识研究`，正文采用简报全文，因此须包含推荐依据、三通道、修改、待判断与检查结果。创建成功由主控 attach_artifact；手动命令不会自动附加客户端附件。

原始基线未就绪、网络/登录失败、远端已有无法确认的同名分支、冲突或非快进 push 都会停止。保留本地报告与候选，修复前不强推。明确的人工发布步骤是：在已完成同步/重审的正式研究分支运行上述 `check-publish`、计划、`--execute`，**不能推当前 local-only 模拟分支**。

候选知识和简报先单独提交；Reviewer 和构建核验同一完整提交 SHA 后，在 `research/state/runs/YYYY-MM-DD.md` 追加如下机器可读行，再单独提交回执（不自动填 passed）：

```text
reviewed_commit: 40位候选提交SHA
reviewer: 独立Reviewer会话或身份
architect: 不同的Architect会话或身份
review_result: passed
build_commit: 与reviewed_commit相同
source_check: passed
hugo_build: passed
site_check: passed
diff_check: passed
```

只有真实通过才使用 passed，失败写实际状态。回执之后仅可改变当天回执；任何其他变动必须重新提交、独立重审、构建。字段是可审计的声明，不能数学证明审核真的发生。主控负责诚实记录实际来源核验与公开检查。每日任务持有原子 `.run-lock`，helper 另有短期命令锁；异常残留须人工/主控核查，不能盲目删除。

## 接受、拒绝与反馈积累

普通评论、review 和行级评论通过 gh 获取；保留原文、作者、ID/修订、URL、时间、文件/行号和提交。采集与语义处理分开，见 [feedback/README.md](feedback/README.md)。明确反馈先落实具体候选，再记录可迁移的理由；不从沉默或一次拒绝推导永久兴趣。已关闭拒绝的研究 PR 仍可保留有用来源去重记录，不能据此接受候选知识。

本版本没有自动 merge 命令、API 模型调用、数据库、后台服务或 GitHub Actions 研究 Agent。GitHub Actions 保持网站构建/PR 验证；只有用户最终合并正式知识后才会走原有 Pages 发布。

## 私有旧知识

旧笔记先迁入同一 Vault 的 `content/_private/`，供本地阅读与整理，不进入公开仓库、Hugo 或公开晨报。目录已被 Git 忽略、Hugo 排除，公开检查还会拒绝强制暂存私有文件。私有内容用独立的本地 Git 记录版本，没有远端。需要研究时明确告诉 Codex“研究私有问题，结果仅保存在本地私有区，不推送或创建 PR”。公开提升须逐篇审核，不以 draft 代替隐私保护。
