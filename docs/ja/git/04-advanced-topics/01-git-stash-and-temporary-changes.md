# Git Stash と一時的変更

## はじめに
`git stash` は未コミット作業を「棚上げ」し、タスク切替・更新取得・緊急修正を未完成コードを commit せずに実行できるようにする。

## 何を保存するか
既定: 変更済み追跡ファイル + ステージ済み。オプションで未追跡 / 無視ファイルを含められる。

## 基本
```bash
git stash push -m "WIP: form validation"
git stash list
```
例:
```
stash@{0}: On feature/form: WIP: form validation
```

## 復元
```bash
git stash apply stash@{0}   # stash を保持
git stash pop               # 適用して削除
```

## 未追跡ファイル込み
```bash
git stash push -u -m "WIP: add config prototype"
```
無視ファイルも:
```bash
git stash push -a -m "WIP: full env"
```

## 部分 (インタラクティブ)
```bash
git stash push -p -m "WIP: selected changes"
```

## 差分表示
```bash
git stash show stash@{1}
git stash show -p stash@{1}
```

## 破棄
```bash
git stash drop stash@{2}
git stash clear
```

## 別ブランチへ適用
```bash
git checkout feature/new-ui
git stash apply stash@{0}
```

## Stash からブランチ生成
```bash
git stash branch feature/resume stash@{0}
```

## パターン
| シナリオ | コマンド |
|----------|----------|
| Pull して続行 | `git stash push -m "WIP" && git pull && git stash pop` |
| main で Hotfix | Stash → switch → 修正 → 戻る → pop |
| ビルド用クリーン | ノイズを stash |

## 避けるべき使用
- 長期保存（WIP ブランチ commit の方が安全）
- 共有用途（ブランチ利用）
- 大量バイナリ（オブジェクト膨張）

## 代替
| ニーズ | 代替 |
|--------|------|
| 安全チェックポイント | 一時ブランチ commit |
| 実験 | `feature/spike-*` |
| すぐ破棄 | `git restore` |

## トラブルシュート
| 問題 | 対処 |
|------|------|
| 適用時衝突 | 解決し `git add` (既に適用済) |
| pop 後喪失 | `git fsck --lost-found` 試行 |
| 重要未追跡を誤 stash | 以後はブランチ運用 |

## まとめ
Stash は短期中断向け。永続進捗には明示 commit を優先する。

## 次へ
- `git-reset-revert-and-checkout-explained.md`
- `git-conflict-resolution-strategies.md`

---
**主要コマンド**
```bash
git stash push -m "msg"
git stash list
git stash show -p stash@{n}
git stash pop
git stash branch <name> stash@{n}
```
