# ブランチのマージとコンフリクト解決

## はじめに
ブランチで作業を分離し、マージで統合します。本チュートリアルでは安全なマージ方法、戦略の違い、Git が支援を必要とするときのコンフリクト解消手順を扱います。

## 前提
- 基本操作 (`add`, `commit`, `push`) に慣れている
- ブランチの作成/切替済み（`creating-and-switching-branches.md` 参照）
- `git log` と履歴の概要理解

## ゴール
1. 機能ブランチを main 系に統合
2. fast-forward と 非 fast-forward の選択基準
3. コンフリクトの検出・閲覧・解決
4. 問題のあるマージを中止/再試行
5. コンフリクト頻度を下げるベストプラクティス

## マージの心的モデル
マージは（fast-forward できない限り）**2 つの親**を持つ新しい commit を作成。Git は以下の 3-way merge を行う:
```
BASE (merge base)  ← 共通祖先
HEAD (現在のブランチ)
OTHER (取り込むブランチ)
```
BASE→HEAD / BASE→OTHER の差分を適用し競合部のみコンフリクトになる。

## Fast-Forward vs マージコミット
| シナリオ | 結果 | 条件 | 利点 | 欠点 |
|----------|------|------|------|------|
| Fast-forward | ポインタ前進 | 先行のみ | 線形履歴 | ブランチ境界消える |
| Merge commit | 2 親 commit | 履歴分岐 | 統合点保持 | 余計な commit 増加 |

### 明示的にマージコミットを残す
```bash
git merge --no-ff feature/login
```

## 基本マージ手順
```bash
# 1. main を最新化
git checkout main
git pull origin main

# 2. 機能ブランチを統合
git merge feature/login

# 3. 結果を push
git push origin main
```

## 事前に統合内容を確認
```bash
# マージ対象の commit
git log --oneline main..feature/login

# 予行練習（未コミット）
git merge --no-commit --no-ff feature/login
# 中止
git merge --abort
```

## 代表的コンフリクト例
```bash
git checkout main
git merge feature/rate-limit
# CONFLICT ...
```

### コンフリクトマーカー
```
<<<<<<< HEAD
"rateLimit": 200,
=======
"rateLimit": 500,
>>>>>>> feature/rate-limit
```
編集後マーカーを完全削除。

### 状態確認
```bash
git status
git diff
git diff --name-only --diff-filter=U
```

### 編集完了後
```bash
git add config/app.json
git commit
```
または独自メッセージ:
```bash
git commit -m "Merge feature/rate-limit into main: adjust limit to 300"
```

## マージ中止
```bash
git merge --abort
```

## 主なオプション
| オプション | 用途 |
|------------|------|
| `--no-ff` | マージコミット強制 |
| `--squash` | 変更を 1 回分にまとめ履歴合流しない |
| `--no-commit` | 自動 commit 抑止 |
| `--abort` | コンフリクト未解消で戻す |
| `-X ours` | 競合時 HEAD 優先 |
| `-X theirs` | 競合時 OTHER 優先 |

### Squash マージ
```bash
git checkout main
git merge --squash feature/search
git commit -m "Add search functionality"
```

## 視覚化
```bash
git log --graph --oneline --decorate
```

## ツール
```bash
git mergetool
git config merge.tool code
git config mergetool.code.cmd 'code --wait --merge $REMOTE $LOCAL $BASE $MERGED'
```

## 予防策
1. 長期ブランチは頻繁に rebase / merge
2. 小さな機能ブランチ
3. ロジックと整形変更を分離
4. 整形/順序を標準化
5. 大規模リファクタは早期共有

## バイナリ競合
```bash
git checkout --ours  path/to/asset.png
git checkout --theirs path/to/asset.png
git add path/to/asset.png
```

## ありがちな問題
| 問題 | 原因 | 対処 |
|------|------|------|
| 繰返す競合 | 長期乖離 | 早期 rebase |
| 巨大競合 | 整形混在 | 整形先行 commit |
| 予期せぬ merge commit | 設定/ポリシー | `git pull --ff-only` |
| 変更消失 | checkout で上書き | `git reflog` で復旧 |

## チェックリスト
- [ ] CI グリーン
- [ ] レビュー完了
- [ ] 最新 main を取り込み済
- [ ] 機密/デバッグなし
- [ ] メッセージ整然

## まとめ
マージは分岐履歴を統合。種類を理解し、入る commit を確認し、的確に競合を解消して明瞭なスナップショットを残す。

## 次へ
- `git-rebase-vs-merge-when-to-use-each.md`
- `git-conflict-resolution-strategies.md`

---
**主要コマンド**
```bash
git merge <branch>
git merge --no-ff <branch>
git merge --squash <branch>
git merge --abort
git diff --name-only --diff-filter=U
git log --graph --oneline --decorate
```
