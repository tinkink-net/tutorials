# Git Rebase vs Merge：どちらをいつ使うか

## はじめに
`merge` と `rebase` はどちらも一方のブランチの変更を他方へ取り込むが、手法と結果が異なる。違いを理解すると読みやすい履歴を保ちながら統合コストを下げられる。

## 本質的な違い
| 操作 | 何をするか | 履歴形状 | Commit ID | 典型用途 |
|------|------------|----------|-----------|----------|
| Merge | 2 親を持つ統合 commit 追加 | 非線形 (グラフ) | 既存保持 | 完了した機能を統合 |
| Rebase | 他ブランチ先頭に自分の commit を並べ替え再適用 | 線形 | 新しい ID (書換) | 統合前に機能ブランチを最新化 |

## 図解
初期:
```
     A---B  (feature)
    /
---o---C---D (main)
```
Merge 後:
```
---o---C---D----M (main)
        \   /
         A-B
```
Rebase 後:
```
---o---C---D---A'---B' (feature)
```

## Pros / Cons
### Merge
Pros:
- 実際の作業分岐点を保持
- 公開済 commit を書き換えない安全性
- 統合タイミングが明確
Cons:
- グラフが騒がしくなる
- 頻繁だと履歴が膨張

### Rebase
Pros:
- 線形で追いやすい
- `git bisect` が簡単
- 論理的ストーリーが連続
Cons:
- ハッシュ書換えリスク
- 共有済ブランチでは危険
- 長期分岐だと衝突を繰り返す

## 安全な Rebase ルール
1. 共有済 (push 済) commit は基本 rebase しない
2. PR 作成前に `main` へ追従する用途で使う
3. レビュー開始後の rebase は極力避ける

## 機能ブランチの最新化（推奨）
```bash
git checkout feature/api-auth
git fetch origin
git rebase origin/main
# 衝突を解決しつつ進める
git push --force-with-lease
```
`--force-with-lease` は他者の更新を誤って消さない安全枠。

## インタラクティブ Rebase で整理
```bash
git rebase -i HEAD~6
```
操作: `pick` 保持 / `squash` 直前へ統合 / `fixup` 統合(メッセージ破棄) / `reword` メッセージ編集 / `edit` 一時停止

### 例
Before:
```
Add API skeleton
Fix route bug
Add logging
Fix logging typo
```
After:
```
Add API skeleton with logging
```

## Merge を選ぶ場面
- 完了済機能統合
- 大規模/複数人作業のコンテキスト保持
- リリースブランチ統合作業
- 監査で統合順が重要

## Rebase を選ぶ場面
- 機能ブランチを最新 main に揃える
- 公開前に履歴を整理/圧縮
- 試行錯誤 commit をまとめる
- 小規模レポで余計な merge commit を減らす

## ハイブリッドワークフロー
1. `feature/*` で開発
2. 定期 `git fetch && git rebase origin/main`
3. PR 作成
4. 統合は `--no-ff` merge でイベントを記録

## Rebase 中の衝突
```bash
# 修正
git add <file>
git rebase --continue
```
その他:
```bash
git rebase --skip
git rebase --abort
```

## Merge 多用履歴を線形化
```bash
git checkout feature
git rebase --rebase-merges origin/main
```
`--rebase-merges` はサブトポロジを可能な範囲で保持。

## 黄金律
迷ったら rebase ではなく merge。公開 commit の書換は合意がある場合のみ。

## 決定表
| 目的 | 推奨 | 理由 |
|------|------|------|
| 統合点の文脈保持 | Merge | いつ入ったか明確 |
| 線形で読みやすく | Rebase | ナビゲーション容易 |
| メッセージ整理 | インタラクティブ Rebase | squash / reword |
| PR 前のノイズ削減 | Rebase onto main | merge commit 減 |
| 緊急ロールバック容易性 | Merge | 粒度保持 |

## まとめ
開発中は rebase でクリーンに、統合時は merge でイベント記録。目的に応じて意識的に使い分ける。

## 次へ
- `git-conflict-resolution-strategies.md`
- `git-reset-revert-and-checkout-explained.md`

---
**主要コマンド**
```bash
git rebase origin/main
git rebase -i HEAD~N
git merge <branch>
git push --force-with-lease
```
