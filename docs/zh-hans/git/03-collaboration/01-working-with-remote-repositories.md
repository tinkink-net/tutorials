# 使用远程仓库

## 介绍
远程（remote）让你协作、备份与部署。本教程涵盖添加、检查、同步、清理（prune）与安全管理远程分支。

## 关键概念
| 术语 | 含义 |
|------|------|
| Remote | 指向托管仓库的命名引用（如 `origin`） |
| Tracking branch | 关联远程分支的本地分支（如 `main` 追踪 `origin/main`） |
| Fetch | 下载对象与引用（不改工作区） |
| Pull | Fetch + 集成（merge 或 rebase） |
| Push | 上传本地提交到远程分支 |

## 列出远程
```bash
git remote -v
```
输出显示 fetch/push URL。

## 添加远程
```bash
git remote add origin https://github.com/example/app.git
git remote add upstream https://github.com/org/app.git
```

## 修改 URL
```bash
git remote set-url origin git@github.com:example/app.git
```

## 移除远程
```bash
git remote remove upstream
```

## 获取更新
```bash
git fetch
git fetch --all          # 所有远程
git fetch origin main    # 指定分支
```

## 查看远程分支
```bash
git branch -r            # 仅远程引用
git branch -a            # 本地 + 远程
```

## 创建追踪分支
```bash
git checkout -b feature/ui origin/feature/ui
# 或
git switch -c feature/ui --track origin/feature/ui
```

## 创建后设置上游
```bash
git branch --set-upstream-to=origin/main main
# 或首次推送
git push -u origin main
```

## Pull 策略
默认 pull 做 merge。许多团队偏好 rebase：
```bash
git config --global pull.rebase true
```
或针对当前仓库：
```bash
git config pull.rebase true
```

## 安全更新模式
```bash
git fetch origin
git rebase origin/main   # 若策略要求也可 merge
```

## 推送分支
```bash
git push origin feature/auth
```
删除远程分支：
```bash
git push origin --delete feature/auth
```

## 重命名本地分支（及远程）
```bash
git branch -m old-name new-name
git push origin :old-name new-name
git push origin -u new-name
```

## 清理陈旧远程引用
```bash
git remote prune origin
git fetch --prune
```

## 检查远程详情
```bash
git remote show origin
```
显示追踪、陈旧分支与 push/pull 配置。

## 多远程工作流
Fork 模式示例：
```bash
git remote add upstream https://github.com/original/project.git
git fetch upstream
git rebase upstream/main   # 保持 fork 更新
git push origin main
```

## 镜像（管理用途）
```bash
git clone --mirror https://github.com/source/repo.git
cd repo.git
git push --mirror git@internal:backup/repo.git
```

## 认证提示
- 优先使用 SSH 稳定
- HTTPS + 2FA 时用个人访问令牌
- 缓存凭据：`git config --global credential.helper cache`

## 常见问题
| 问题 | 原因 | 解决 |
|------|------|------|
| 推送被拒（non-fast-forward） | 远程有新提交 | `git pull --rebase` 后再 push |
| 认证失败 | token / key 无效 | 重新生成凭据 |
| Detached HEAD 编辑 | 直接检出远程引用 | 创建分支：`git switch -c fix upstream/main` |
| 追踪分支陈旧 | 远程分支已删除 | `git fetch --prune` |

## 最佳实践
1. 使用一致的远程命名（`origin`, `upstream`）
2. 启用 prune 减少杂乱
3. 避免 force-push 共享分支
4. 保护 `main`（平台分支保护规则）
5. 定期轮换 token / SSH key

## 总结
掌握远程提升协作效率。有意识地 fetch，明确策略地 pull，定期 prune，并保持上游整洁。

## 下一步
- 代码评审流程（`pull-requests-and-code-review-workflow.md`）
- 冲突处理（`git-conflict-resolution-strategies.md`）

---
**关键命令**
```bash
git remote -v
git fetch --all --prune
git push origin <branch>
git remote show origin
git remote prune origin
```
