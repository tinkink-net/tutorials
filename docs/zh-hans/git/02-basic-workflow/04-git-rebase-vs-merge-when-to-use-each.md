# Git Rebase 与 Merge：何时使用各自方式

## 介绍
`merge` 与 `rebase` 都用于把一个分支的更改整合到另一个分支——但方法不同。理解它们的差异，有助于保持清晰、可导航的历史并最小化集成成本。

## 核心差异
| 操作 | 行为 | 历史形状 | 提交 ID | 典型用途 |
|------|------|----------|---------|----------|
| Merge | 创建连接两条历史的合并提交 | 非线性（图状） | 保持不变 | 集成完成的功能分支 |
| Rebase | 在另一分支之上重放提交 | 线性 | 重写（新 ID） | 合并前更新功能分支 |

## 可视化模型
初始分叉：
```
     A---B  (feature)
    /
---o---C---D (main)
```
Merge 结果：
```
---o---C---D----M (main)
        \   /
         A-B
```
Rebase 结果（feature rebase 到更新后的 main 上）：
```
---o---C---D---A'---B' (feature)
```

## 优缺点
### Merge
优点：
- 保留真实历史上下文
- 安全（不重写已发布提交）
- 显示整合节点

缺点：
- 图可能变得嘈杂
- 频繁合并膨胀历史

### Rebase
优点：
- 历史干净线性
- 更易 `git bisect`
- 逻辑发展故事连贯

缺点：
- 重写提交哈希
- 对已共享分支有风险
- 长链上冲突需重复解决

## 安全 Rebase 规则
1. 不要 rebase 已与他人共享的提交（除非协同）
2. 在本地用 rebase 同步 `main` 后再发起 PR
3. 评审开始后避免再 rebase（会迫使重新 diff）

## 更新功能分支（推荐模式）
```bash
git checkout feature/api-auth
git fetch origin
git rebase origin/main
# 冲突时逐个解决
git push --force-with-lease
```
`--force-with-lease` 防止无意覆盖他人工作。

## 交互式 Rebase 清理历史
```bash
git rebase -i HEAD~6
```
动作：
- `pick` 保留
- `squash` 合并进前一个
- `fixup` 类似 squash 但丢弃信息
- `reword` 修改提交信息
- `edit` 暂停以修改

### 清理示例
之前：
```
Add API skeleton
Fix route bug
Add logging
Fix logging typo
```
交互式 rebase 之后：
```
Add API skeleton with logging
```

## 何时偏向 Merge
使用场景：
- 将已完成功能分支整合进 `main`
- 保留大型协作上下文
- 发布分支的合并
- 需要审计整合顺序

## 何时偏向 Rebase
使用场景：
- 用最新 `main` 刷新功能分支
- 在共享前清理提交历史
- 拆分或压缩凌乱的探索性提交
- 小型仓库避免无谓合并提交

## 混合工作流（常见）
1. 在 `feature/*` 开发
2. 定期 `git fetch && git rebase origin/main`
3. 打开 PR
4. 用 `--no-ff` 合并（记录整合点）

## Rebase 期间冲突处理
发生冲突：
```bash
# 修复文件
git add <file>
git rebase --continue
```
其它命令：
```bash
git rebase --skip      # 跳过问题提交
git rebase --abort     # 回到 rebase 前状态
```

## 重构以线性化一个充满合并提交的历史
```bash
git checkout feature
git rebase --rebase-merges origin/main
```
`--rebase-merges` 尝试保留结构拓扑。

## 黄金法则（再强调）
未经所有相关协作者同意，不要 rebase 公共提交。如有不确定——选择 merge。

## 决策表
| 目标 | 首选 | 理由 |
|------|------|------|
| 保留整合上下文 | Merge | 展示分支登陆时间 |
| 保持线性可读历史 | Rebase | 简化导航 |
| 清理提交信息 | 交互式 Rebase | 逻辑重组 |
| 功能分支合 PR 前 | Rebase onto main | 避免合并噪声 |
| 紧急可回滚性 | Merge | 保留细粒度上下文 |

## 总结
Rebase 与 merge 互补：开发中使用 rebase 保持分支最新；集成时使用 merge 记录事件。刻意选择其一。

## 下一步
- 学习结构化冲突技巧（`git-conflict-resolution-strategies.md`）
- 探索撤销操作（`git-reset-revert-and-checkout-explained.md`）

---
**关键命令**
```bash
git rebase origin/main
git rebase -i HEAD~N
git merge <branch>
git push --force-with-lease
```
