# Git 子模块与大型仓库

## 介绍
子模块允许你在一个 Git 仓库中嵌入另一个。合理使用很强大——误用则痛苦。本指南解释何时使用子模块、如何管理，以及大型代码库的替代方案。

## 何时使用子模块
| 适合 | 不理想 |
|------|--------|
| 需要固定共享库版本 | 高频跨仓库更改 |
| 外部 vendored 依赖 | 需原子提交的紧耦合集成 |
| 法律/审计要求隔离 | 开发者不熟悉子模块流程 |

## 添加子模块
```bash
git submodule add https://github.com/vendor/lib-a external/lib-a
git commit -m "Add lib-a submodule"
```
初始化 `.gitmodules` 配置。

### .gitmodules 示例
```
[submodule "external/lib-a"]
  path = external/lib-a
  url = https://github.com/vendor/lib-a
```

## 克隆含子模块仓库
```bash
git clone https://github.com/org/app.git
cd app
git submodule update --init --recursive
```
或单条命令：
```bash
git clone --recurse-submodules <url>
```

## 更新子模块
```bash
cd external/lib-a
git fetch
git checkout v2.4.0
cd ../..
git add external/lib-a
git commit -m "Bump lib-a to v2.4.0"
```
`git diff --submodule` 提供简洁摘要。

## 移除子模块
```bash
git submodule deinit -f external/lib-a
rm -rf .git/modules/external/lib-a
git rm -f external/lib-a
git commit -m "Remove lib-a submodule"
```

## 常见陷阱
| 问题 | 原因 | 缓解 |
|------|------|------|
| 子模块内 detached HEAD | 刚克隆默认状态 | 若需修改先建分支 |
| 忘记更新指针 | 只在子模块提交 | 在父仓库 stage 子模块路径 |
| 递归依赖混乱 | 嵌套子模块 | 使用 `--recursive` 或简化结构 |
| `.gitmodules` 合并冲突 | 并行编辑 | 协调 / 提前 rebase |

## 大型 Monorepo 考量
子模块 ≠ monorepo。对真正大型代码库可考虑：
| 策略 | 描述 |
|------|------|
| Monorepo | 统一历史与工具链 |
| Subtree | 嵌入 + 合并外部代码（无额外元数据） |
| 包管理 | 通过注册表发布库 |
| 多仓 + CI 编排 | 独立仓库由流水线协调 |

### Git Subtree（替代简介）
```bash
git subtree add --prefix=vendor/lib-a https://github.com/vendor/lib-a main --squash
```
后续更新：
```bash
git subtree pull --prefix=vendor/lib-a https://github.com/vendor/lib-a main --squash
```

## 性能技巧（大型仓库）
- CI 使用浅克隆：`git clone --depth 20`
- 启用部分克隆（Git 2.19+）：
```bash
git clone --filter=blob:none --sparse <url>
```
- 稀疏检出聚焦目录：
```bash
git sparse-checkout init --cone
git sparse-checkout set src/ docs/
```

## 审计子模块状态
```bash
git submodule status --recursive
```
显示当前指针。

## 安全考量
- 审查子模块来源（它们参与构建执行）
- 固定到 tag / commit（不要用移动分支）
- 关注供应链安全公告

## 总结
子模块在跨仓库版本固定上很有用，但带来操作摩擦。需有意使用；更大范围的集成需求应评估 subtree、包发布或 monorepo。

## 下一步
- 自动化（`git-hooks-and-automation.md`）
- 协作实践（`git-best-practices-for-team-collaboration.md`）

---
**关键命令**
```bash
git submodule add <url> <path>
git submodule update --init --recursive
git diff --submodule
git submodule status --recursive
```
