# 团队协作的 Git 最佳实践

## 介绍
超越命令，本指南关注 *共享纪律*。它列出从小团队到大型组织都可执行的务实实践。

## 哲学
黄金原则：
1. **清晰胜于聪明**（历史应讲述故事）
2. **更小的更改发布更快**
3. **自动化优先于人工监管**
4. **可复现 = 可靠**

## 分支策略模式
| 策略 | 描述 | 适用场景 |
|------|------|----------|
| Trunk-Based | 短期分支快速合回 `main` | 快速迭代、CI 成熟 |
| GitHub Flow | 功能分支 → PR → merge → deploy | SaaS，持续交付 |
| Git Flow | `develop`、release、hotfix 分支 | 版本化产品、较慢节奏 |
| Release Train | 按时间盒合并与发布 | 多团队协调发车 |

选择满足治理需求的最简单方案，避免过度设计。

## 提交信息规范（示例）
```
<type>(<scope>): <short summary>

<body>

<footer>
```
类型：`feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `perf`。
采用 conventional commits 以生成自动变更日志。

## 通过 Hooks / CI 强制
示例：
```bash
# .husky/commit-msg
#!/bin/sh
exec < /dev/tty
commitlint -E HUSKY_GIT_PARAMS
```

## Pull Request 卫生
| 实践 | 目标 |
|------|------|
| 最大修改行数 | ~400（软上限） |
| 评审响应时间 | < 24h |
| 所有检查通过 | 必需 |
| 关联 issue | 100% |

## 避免长期分支
缓解策略：
- 功能开关（增量合并）
- API 兼容层
- 暗发布 / toggle
- 及早 upstream rebase

## 处理 Hotfix
工作流：
```bash
git checkout main
git pull
git checkout -b hotfix/critical-timezone
# 修复、提交、测试
git push origin hotfix/critical-timezone
# PR → merge → tag → deploy
```

## 打标签发布
```bash
git tag -a v2.3.0 -m "Release v2.3.0"
git push origin v2.3.0
```

## 保护主分支
平台设置：
- 必需状态检查
- 必需评审（≥1 或 ≥2）
- 禁止 force push
- 线性历史（可选）
- 签名提交（安全需要）

## 大文件 & Monorepo 指南
- 用 Git LFS 处理二进制
- 大仓库使用 sparse checkout
- 对关键路径使用 CODEOWNERS

## 标准 .gitignore 基线
保持精简 + 项目相关；避免提交生成产物。

## 合并前检查（尽量自动化）
- [ ] 测试通过
- [ ] Lint/格式化干净
- [ ] 安全扫描通过
- [ ] 无遗留 TODO（或已建 issue）
- [ ] 行为变更的文档已更新

## 重写历史策略
| 动作 | 允许？ | 备注 |
|------|--------|------|
| 本地功能分支 rebase | 是 | 分享前 |
| force-push 共享分支 | 罕见 | 用 `--force-with-lease` |
| rebase 受保护分支 | 否 | 破坏消费者 |
| 合并时 squash | 视情况 | 若不需保留粒度 |

## 协作反模式
| 模式 | 问题 | 解决 |
|------|------|------|
| 随意 force push | 破坏同伴 clone | 权限限制 |
| 混合关注点 PR | 难评审 | 按关注拆分 |
| 静默合并 | 可见性低 | 要求 PR 讨论 |
| 直接在 main 上开发 | 生产风险 | 启用分支保护 |

## 文档锚点
维护：
- CONTRIBUTING.md
- CODEOWNERS
- 架构决策记录（ADR）
- Onboarding 速查

## 健康指标
- 平均合并时间（MTTM）
- 超过 1,000 LOC 的 PR 百分比（需降低）
- Flaky 测试率
- 合并后 revert 频次

## 总结
高效 Git 协作融合社会约定、自动化与纪律化的工作流。让“正确路径”成为*最容易的路径*。

## 下一步
- 钩子与自动化（`git-hooks-and-automation.md`）
- 撤销策略（`git-reset-revert-and-checkout-explained.md`）

---
**关键命令**
```bash
git tag -a <tag> -m "msg"
git push origin <tag>
git push origin --delete <branch>
```
