# Git Hooks 与自动化

## 介绍
Git hooks 是在特定生命周期事件触发的脚本，用于质量、安全与合规自动化。本教程涵盖本地 hooks、服务器端 hooks（概念）与现代工具包装。

## Hook 分类
| 类型 | 触发时机 | 示例用途 |
|------|----------|----------|
| 客户端 (local) | 开发者操作 | 提交前 lint |
| 服务器端 | push / receive | 强制提交策略 |

## 位置
`.git/hooks/` 目录包含带 `.sample` 后缀的示例脚本。移除后缀并赋执行权限即可启用。

## 常见客户端 Hooks
| Hook | 触发 | 示例 |
|------|------|------|
| pre-commit | 提交暂存快照前 | Lint / format / 子集测试 |
| commit-msg | 输入信息后 | 强制 conventional commits |
| pre-push | push 前 | 运行快速测试集 |
| post-merge | 合并后 | 安装依赖 |
| prepare-commit-msg | 编辑器打开前 | 注入模板 |

## 简单 pre-commit 示例
`.git/hooks/pre-commit`:
```bash
#!/usr/bin/env bash
echo "Running lint..."
eslint . || exit 1
```
赋权：
```bash
chmod +x .git/hooks/pre-commit
```

## 提交信息校验
`.git/hooks/commit-msg`:
```bash
#!/usr/bin/env bash
MSG_FILE=$1
PATTERN='^(feat|fix|docs|refactor|test|chore|perf)(\(.+\))?: .+'
if ! grep -Eq "$PATTERN" "$MSG_FILE"; then
  echo "Commit message must follow conventional format" >&2
  exit 1
fi
```

## 共享 Hooks（问题与方案）
本地 hooks 默认不进版本控制。解决：
1. 使用包装工具（Husky, Lefthook, pre-commit）
2. 自定义方案：仓库存放 `./hooks` 再 symlink / copy

### Husky 示例（JavaScript 项目）
```bash
npx husky add .husky/pre-commit "npm test"
```
创建受版本控制的 `.husky/pre-commit`。

### Python `pre-commit` 框架示例
`.pre-commit-config.yaml` 片段：
```yaml
repos:
  - repo: https://github.com/psf/black
    rev: 24.3.0
    hooks:
      - id: black
```
安装：
```bash
pre-commit install
```

## 服务器端 Hooks（概览）
存在于远程（裸仓库）：`pre-receive`, `update`, `post-receive`，用于策略（签名提交、大小限制）。多由平台（GitHub Actions / GitLab push rules）管理。

## 应该自动化的内容
- Lint & format
- 类型检查
- Secret 扫描
- 单元测试（快速子集）
- 提交信息质量
- License 头插入

## 不适合放在 Hooks 的内容
- 长时间集成测试（放 CI）
- 重型构建（拖慢本地循环）
- 外部部署（用 CI/CD 触发）

## 快速失败理念
本地捕获低价值问题；保持 CI 绿色，让评审关注逻辑而非风格。

## 安全考虑
仅运行可信 hook 代码。审查第三方框架并锁定版本。

## 临时跳过
```bash
git commit --no-verify
```
谨慎使用；调查失败原因。

## 性能审计
记录耗时；若 pre-commit > 2–3s，开发者更易绕过。通过只 lint 变更文件来优化。

## 变更文件快速 Lint 示例
```bash
#!/usr/bin/env bash
CHANGED=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(js|ts|jsx|tsx)$') || true
if [ -z "$CHANGED" ]; then
  echo "No JS/TS changes."; exit 0
fi
eslint $CHANGED || exit 1
```

## 总结
Hooks 提升基线质量、左移反馈并编码文化规范。确保其快速、可版本化且透明。

## 下一步
- 团队实践（`git-best-practices-for-team-collaboration.md`）
- 子模块（`git-submodules-and-large-repositories.md`）

---
**关键命令**
```bash
git config core.hooksPath hooks
chmod +x .git/hooks/<hook>
```
