# Git 冲突解决策略

## 介绍
在协作开发中冲突不可避免。本指南超越基础——提供模式、决策框架与工具技巧，帮助高效、安全地解决冲突。

## 冲突类型
| 类型 | 示例 | 原因 |
|------|------|------|
| 内容 (Content) | 同一行被编辑 | 并行修改 |
| 添加/删除 (Add/Delete) | 一端删除一端修改 | 分叉重构 |
| 重命名/编辑 (Rename/Edit) | 文件被重命名同时被修改 | 未同步的大改动 |
| 二进制 (Binary) | 图片两侧都改 | 无法逐行合并格式 |
| 目录/文件 | 目录变文件或相反 | 结构性调整 |

## 一般解决流程
```
检测 → 分类 → 明确意图 → 编辑/择优 → 测试 → 提交
```

## 快速检查冲突
```bash
git status
git diff --name-only --diff-filter=U
git diff --merge   # 带 base 显示冲突段
```

## 选择 Ours vs Theirs
```bash
# 保留当前分支版本
git checkout --ours path/file.txt
# 保留合并进来的版本
git checkout --theirs path/file.txt
git add path/file.txt
```
谨慎使用——确保语义正确。

## 结构化手动合并模式
1. 完整阅读双方差异
2. 识别意图（业务逻辑 / 格式化 / 热修复？）
3. 重建期望组合行为
4. 移除标记并重新运行测试
5. `git add` 继续流程

## 使用 `git add -p` 的前置减冲突策略
通过更细粒度、内聚的提交降低冲突：
```bash
git add -p
```

## 长期分支的战略性 Rebase
```bash
git fetch origin
git rebase origin/main
```

## 工具
| 工具 | 命令 | 备注 |
|------|------|------|
| VS Code | 内置合并编辑器 | 清晰并排视图 |
| Meld | `git mergetool` | 可视化 diff/merge |
| Beyond Compare | `git mergetool` 配置 | 商业软件 |
| IntelliJ | 自动冲突分组 | IDE 集成 |

## 冲突标注示例
```
<<<<<<< HEAD (current: main)
applyDiscount(cart, 0.10)
=======
applyDiscount(cart, discountRate())
>>>>>>> feature/dynamic-discount
```
决策：保留动态，增加兜底。结果：
```js
applyDiscount(cart, discountRate() ?? 0.10)
```

## 解决二进制冲突
选择其一：
```bash
git checkout --theirs assets/logo.png
git add assets/logo.png
```
或重新生成资源。

## 终止或继续
合并 / rebase 中：
```bash
git merge --abort
git rebase --abort
git rebase --continue
```

## 高级：Rerere（复用已记录解决方案）
```bash
git config --global rerere.enabled true
```
Git 会记录解决方式，重复冲突时自动应用。

## 预防措施
| 技术 | 好处 |
|------|------|
| 一致的格式化工具 | 去除样式差异 |
| 小型 PR | 减少重叠 |
| 早期同步分支 | 降低分叉点数量 |
| 架构沟通 | 避免重复开发 |
| 功能开关 | 未完功能也可早合并 |

## 回归安全保护网
每次解决后务必：
```bash
./run-tests.sh
git diff --check        # 检查多余空白
```

## 错误解决的恢复
```bash
git reflog              # 找回合并前状态
git reset --hard <hash>
```

## 总结
冲突是并行创新的信号，而非失败。系统化处理、主动卫生与合适工具让它只成为小阻碍。

## 下一步
- 撤销操作（`git-reset-revert-and-checkout-explained.md`）
- 临时更改（`git-stash-and-temporary-changes.md`）

---
**关键命令**
```bash
git diff --name-only --diff-filter=U
git checkout --ours <file>
git checkout --theirs <file>
git merge --abort
git rebase --continue
```
