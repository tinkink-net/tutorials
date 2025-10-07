# チーム協調のための Git ベストプラクティス

## はじめに
コマンドだけでなく、*共有された規律* が効果的コラボレーションを生む。本ガイドは小規模から大規模組織まで拡張可能な現実的かつ強制しやすい手法を列挙します。

## 原則
1. **巧妙さより明快さ**（履歴はストーリー）
2. **小さい変更ほど速く届く**
3. **手動 policing より自動化**
4. **再現性 = 信頼性**

## ブランチ戦略パターン
| 戦略 | 説明 | 適用場面 |
|------|------|----------|
| Trunk-Based | 短命ブランチを即座に main へ | 高速開発 + 強い CI |
| GitHub Flow | Feature → PR → Merge → Deploy | SaaS / 連続デプロイ |
| Git Flow | `develop` / release / hotfix | バージョン製品 / 長期サイクル |
| Release Train | 時間箱でまとめてリリース | 複数チーム同期 |

過剰設計を避け、必要条件を最小で満たすものを選ぶ。

## Commit メッセージ (Conventional 例)
```
<type>(<scope>): <short summary>

<body>

<footer>
```
Type: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `perf`。
→ 自動 CHANGELOG を可能に。

## Hooks / CI で強制
例:
```bash
# .husky/commit-msg
#!/bin/sh
exec < /dev/tty
commitlint -E HUSKY_GIT_PARAMS
```

## PR 衛生指標
| 項目 | 目標 |
|------|------|
| 変更行 | ~400 以下（ソフト） |
| レビュー応答 | 24h 未満 |
| 全チェック | 必須 |
| Issue リンク | 100% |

## 長命ブランチ回避策
- Feature Flags で細切れ統合
- API 互換レイヤー
- ダークローンチ / トグル
- 早期 rebase

## Hotfix 流れ
```bash
git checkout main
git pull
git checkout -b hotfix/critical-timezone
# 修正
git push origin hotfix/critical-timezone
# PR → merge → tag → deploy
```

## リリースタグ
```bash
git tag -a v2.3.0 -m "Release v2.3.0"
git push origin v2.3.0
```

## main 保護
- 必須ステータスチェック
- 必須レビュー (≥1/2)
- 強制 push 禁止
- 線形履歴（任意）
- 署名 commit（高セキュリティ）

## 大規模 / Monorepo 指針
- Binary は Git LFS
- 巨大構成は sparse checkout
- 重要パスに CODEOWNERS

## .gitignore 方針
最小 + プロジェクト特化。生成物は commit しない。

## Pre-Merge チェック（自動化推奨）
- [ ] テスト Green
- [ ] Lint / Format OK
- [ ] セキュリティスキャン OK
- [ ] TODO は issue 化 or 解消
- [ ] Docs 更新済

## 履歴書換ポリシー
| 行為 | 許可 | 備考 |
|------|------|------|
| ローカル feature rebase | 可 | 共有前 |
| 共有ブランチ強制 push | 稀 | `--force-with-lease` |
| 保護ブランチ rebase | 不可 | 影響範囲大 |
| merge 時 squash | 条件付き | 粒度不要なら可 |

## 協調アンチパターン
| パターン | 問題 | 対策 |
|----------|------|------|
| Drive-by force push | 他者 clone 破損 | 権限/保護設定 |
| 混在 PR (refactor+feature) | 意図不明 | 分割 |
| サイレントマージ | 可視性低 | PR レビュー必須化 |
| main 直接作業 | 本番破壊リスク | 保護 + ワークフロー教育 |

## ドキュメント要素
- CONTRIBUTING.md
- CODEOWNERS
- ADR (Architecture Decision Records)
- Onboarding チートシート

## 健康メトリクス
- Mean Time To Merge (MTTM)
- >1000 LOC PR 割合（低いほど良）
- Flaky テスト率
- revert 発生率

## まとめ
Git 協調は社会的合意 + 自動化 + 規律的フローの複合。"正しい道" を最も簡単にする設計を目指す。

## 次へ
- Hooks / 自動化 (`git-hooks-and-automation.md`)
- Undo 戦略 (`git-reset-revert-and-checkout-explained.md`)

---
**主要コマンド**
```bash
git tag -a <tag> -m "msg"
git push origin <tag>
git push origin --delete <branch>
```
