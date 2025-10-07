# Pull Request とコードレビュー ワークフロー

## はじめに
Pull Request (PR) は統合を形式化し、変更差分、オートメーション、レビュー機会を提供します。本ガイドはプラットフォーム非依存（GitHub / GitLab / Bitbucket 共通概念）のエンドツーエンド手順です。

## なぜ PR を使うか
- 品質ゲート（テスト / Lint / セキュリティ）
- ナレッジ共有
- 変更の説明責任と監査性
- 小さくレビューしやすい単位を促す

## ブランチ命名標準
| 種別 | パターン | 例 |
|------|----------|----|
| Feature | `feature/<scope>` | `feature/payment-intents` |
| Bugfix | `fix/<issue-id>` | `fix/342-null-pointer` |
| Refactor | `refactor/<area>` | `refactor/auth-middleware` |
| Docs | `docs/<topic>` | `docs/api-pagination` |

## ライフサイクル概要
```
Plan → Branch → Commit → Sync → Open PR → Review → Update → Approve → Merge → Clean up
```

## PR 作成例 (GitHub CLI)
```bash
git checkout -b feature/user-deactivation
# ... commits ...
git push -u origin feature/user-deactivation
gh pr create --fill --base main --head feature/user-deactivation
```

## 高品質 PR チェックリスト
- 明確なタイトル（命令形）
- 簡潔な説明：課題 → 解決 → 備考
- UI 変更はスクリーンショット/GIF
- Issue 連携 (`Fixes #123`)
- テスト範囲・カバレッジメモ
- ロールバック手順

### 説明テンプレート例
```
## Summary
ユーザーのソフトデアクティベーションフロー実装。

## Changes
- `status` カラム追加
- サービス層に `deactivateUser()` 追加
- 既存 active ユーザー移行

## Testing
- 単体テスト追加
- 手動 API テスト (POST /users/:id/deactivate)

## Rollback
Revert migration 202510071230_add_status_column.sql
```

## レビューのベストプラクティス
レビュア責務:
1. 構文より意図理解を優先
2. 正しさ / セキュリティ / 性能 / 可読性
3. 強制でなく提案（ポリシー例外除く）
4. 本番安全性を確認して承認

作者責務:
1. PR を小さく (< ~400 added LOC が望ましい)
2. すべてのコメントに反応（resolve / explain）
3. レビュー開始後の無闇な force-push を避ける（最終 squash は可）
4. CI を常にグリーンに保つ

## フィードバック反映
```bash
# 修正
git commit -m "Refactor: extract validation helper"
git push
```
PR diff は自動更新。

## Draft vs Ready
ロジック安定前は Draft、自己レビューとテスト完了で Ready に切替。

## 推奨オートメーション
| 種類 | 目的 |
|------|------|
| CI pipeline | テスト / Lint / Build |
| 静的解析 | セキュリティ / 品質 |
| Conventional commit チェック | メッセージ規約統一 |
| サイズラベル | 大型 PR の早期察知 |
| 自動アサイン | レビュー遅延削減 |

## マージ戦略
| 戦略 | 説明 | 用途 |
|------|------|------|
| Squash | commit を一つに集約 | 小さくノイズ多い履歴 |
| Rebase & merge | 履歴を線形化 | 線形重視チーム |
| Merge commit | ブランチ文脈保持 | 大きな機能/リリース列車 |

## マージ前 Rebase（ポリシー時）
```bash
git fetch origin
git rebase origin/main
git push --force-with-lease
```

## アンチパターン回避
| パターン | 問題 |
|----------|------|
| 巨大 PR | レビュー困難 → バグ混入 |
| リファクタ + 機能混在 | 意図不明瞭 |
| レビュー後の force-push | 過去レビュー無効化 |
| 説明なし | レビュアが推測強要 |
| CI 赤を放置 | 時間浪費 |

## マージ後クリーンアップ
```bash
git checkout main
git pull origin main
git branch -d feature/user-deactivation
git push origin --delete feature/user-deactivation
```

## チーム指標例
- レビュー応答時間
- PR サイズ分布
- 再オープン / revert 数
- squash vs merge 比率

## まとめ
構造化された PR は安全なデリバリを加速。明瞭さ・小規模・自動検証・相互尊重のフィードバックループを最適化する。

## 次へ
- コンフリクト戦略 (`git-conflict-resolution-strategies.md`)
- チーム協業ガイド (`git-best-practices-for-team-collaboration.md`)

---
**主要コマンド**
```bash
git push -u origin <branch>
git branch -d <branch>
git push origin --delete <branch>
```
