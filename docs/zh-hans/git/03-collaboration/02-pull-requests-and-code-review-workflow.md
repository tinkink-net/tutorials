# Pull Request 与代码评审工作流

## 介绍
Pull Request（PR）形式化集成：它打包更改、展示 diff、触发自动化并支持同伴反馈。本教程提供端到端的、平台无关的流程（GitHub/GitLab/Bitbucket 概念相似）。

## 为什么使用 PR？
- 质量闸（测试、lint、安全扫描）
- 知识共享
- 变更责任与审计跟踪
- 鼓励更小、可评审单元

## 标准分支命名
| 类型 | 模式 | 示例 |
|------|------|------|
| Feature | `feature/<scope>` | `feature/payment-intents` |
| Bugfix | `fix/<issue-id>` | `fix/342-null-pointer` |
| Refactor | `refactor/<area>` | `refactor/auth-middleware` |
| Docs | `docs/<topic>` | `docs/api-pagination` |

## PR 生命周期概览
```
Plan → Branch → Commit → Sync → Open PR → Review → Update → Approve → Merge → Clean up
```

## 创建 PR（示例：GitHub CLI）
```bash
git checkout -b feature/user-deactivation
# ... commits ...
git push -u origin feature/user-deactivation
gh pr create --fill --base main --head feature/user-deactivation
```

## 构建高质量 PR
**检查清单：**
- 标题清晰（祈使语）
- 描述简洁：问题 → 方案 → 备注
- UI 改动附截图 / GIF
- 关联 issue ID（`Fixes #123`）
- 测试覆盖说明
- 回滚考虑

### 描述模板示例
```
## Summary
实现用户软删除停用流程。

## Changes
- 新增 `status` 列
- 引入服务层方法 `deactivateUser()`
- 迁移现有 active 用户

## Testing
- 添加单元测试
- 手动 API 测试 (POST /users/:id/deactivate)

## Rollback
Revert migration 202510071230_add_status_column.sql
```

## 评审最佳实践
评审者责任：
1. 在语法吹毛求疵前先理解意图
2. 评估正确性、安全、性能、可读性
3. 建议而非命令（除非策略强制）
4. 仅在生产安全时批准

作者责任：
1. 保持 PR 小（理想 < ~400 行新增）
2. 回应每条评论（解决 / 解释）
3. 评审后避免 force-push（最终 squash 除外）
4. CI 保持绿色

## 处理反馈
```bash
# 修改
git commit -m "Refactor: extract validation helper"
git push
```
平台将自动更新 diff。

## 草稿 vs 就绪
逻辑尚未稳定时用 draft。测试 & 自检通过后转换为 ready。

## 可考虑的自动化
| 自动化 | 目的 |
|--------|------|
| CI pipeline | 运行测试 / lint / build |
| 静态分析 | 安全 / 质量门控 |
| 规范化提交检查 | 强制消息风格 |
| 大小标签 | 标记超大 PR |
| 自动指派评审 | 缩短等待 |

## PR 合并策略
| 策略 | 描述 | 使用场景 |
|------|------|----------|
| Squash | 将提交合并为一个 | 小而噪音多的历史 |
| Rebase & merge | 线性化分支 | 追求线性历史的团队 |
| Merge commit | 保留分支上下文 | 功能集合 / 发布列车 |

## 合并前 Rebase（若策略要求）
```bash
git fetch origin
git rebase origin/main
git push --force-with-lease
```

## 避免常见反模式
| 反模式 | 问题 |
|--------|------|
| 巨型 PR | 难以评审 → 漏洞易混入 |
| 重构 + 功能混杂 | 模糊意图 |
| 评审后 force-push | 使之前评审失效 |
| 无描述 | 评审者需猜意图 |
| 忽视失败 CI | 浪费评审时间 |

## 合并后清理
```bash
git checkout main
git pull origin main
git branch -d feature/user-deactivation
git push origin --delete feature/user-deactivation
```

## 团队层面可跟踪指标
- 评审响应时间
- PR 大小分布
- 被重新打开 / 回滚次数
- squash 与普通 merge 比例

## 总结
结构良好的 PR 加速安全交付。优化清晰度、小范围、自动验证与尊重且可执行的反馈循环。

## 下一步
- 冲突策略（`git-conflict-resolution-strategies.md`）
- 团队协作指南（`git-best-practices-for-team-collaboration.md`）

---
**关键命令**
```bash
git push -u origin <branch>
git branch -d <branch>
git push origin --delete <branch>
```
