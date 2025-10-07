# Git のブランチ作成と切り替え

ブランチは Git のスーパーパワーです。安定した main ラインを壊さずに、機能開発・バグ修正・実験を隔離できます。効率的にブランチを作成/切り替えできることは、効果的な Git ワークフローの基礎です。

---
## 1. ブランチの心的モデル
`main`（または `master`）は公開された履歴。ブランチは特定の commit への「動くポインタ」です。新しいブランチを作るとは「この時点から新しい作業線を始める」という宣言。何もコピーされず、軽量な参照が増えるだけ。

ポイント:
- ブランチは commit を指す
- `HEAD` は今どのブランチ (または commit) 上かを示す
- ブランチ上で commit するとポインタは前進

軽量なので多用すべき: 機能 / バグ修正 / 実験ごとに 1 ブランチ。

---
## 2. 既存ブランチの一覧
ローカル:
```
$ git branch
```
現在はアスタリスク付き。ローカル+リモート:
```
$ git branch -a
```
各ブランチの参照先と最終 commit:
```
$ git branch -v
```
削除済みリモートの古い追跡参照を掃除:
```
$ git fetch --prune
```

---
## 3. 新しいブランチ作成
通常は最新の `main` 等から:
```
$ git checkout main
$ git pull origin main
```
作成のみ:
```
$ git branch feature/login-form
```
作成 + 即切替（推奨）:
```
$ git switch -c feature/login-form
```
旧構文:
```
$ git checkout -b feature/login-form
```
命名ガイド:
- `feature/<name>` 新機能
- `bugfix/<ticket-id>` バグ修正
- `hotfix/<critical>` 本番緊急
- `chore/...`, `refactor/...` など

空白/大文字/曖昧 (`new`, `temp`) は避ける。

---
## 4. ブランチ切り替え
既存ブランチへ:
```
$ git switch feature/login-form
```
旧構文:
```
$ git checkout feature/login-form
```
未コミット変更が上書きされるなら拒否される。対処:
- コミットする
- スタッシュ `git stash push -m "WIP"`
- 破棄 `git restore .`

直前のブランチへ戻る:
```
$ git switch -
```

### Detached HEAD
特定 commit を checkout:
```
$ git checkout 4f2a9c1
```
"detached HEAD"。閲覧/ビルド/テストは可能だが、ブランチを作らず commit すると後で見失いやすい。保存したいなら:
```
$ git switch -c experiment/performance-tuning
```

---
## 5. ブランチを最新化
作業中に `main` に他の commit が入ることがある。取り込む:
```
$ git switch feature/login-form
$ git fetch origin
$ git merge origin/main
```
または線形履歴を好み、共有していないなら:
```
$ git fetch origin
$ git rebase origin/main
```
Rebase は commit を書き換えるので共有ブランチでは避ける。

---
## 6. ブランチをリモートへ
ローカルのみでは他人は見えない。push:
```
$ git push -u origin feature/login-form
```
`-u` で upstream 設定。

追跡確認:
```
$ git branch -vv
```

---
## 7. ブランチ名変更
名前が不明瞭/要件変更時:
現在そのブランチ上で:
```
$ git branch -m feature/login-form feature/auth-ui
```
既に push 済みなら旧名を削除し新名を push:
```
$ git push origin :feature/login-form
$ git push -u origin feature/auth-ui
```
ホスティングの Rename 機能があれば利用。

---
## 8. ブランチ削除
マージ済みで不要なら:
ローカル:
```
$ git branch -d feature/login-form
```
未マージでも強制:
```
$ git branch -D feature/login-form
```
リモート:
```
$ git push origin :feature/login-form
```
新構文:
```
$ git push origin --delete feature/login-form
```

---
## 9. 典型的フロー（機能ブランチ）
1. main 更新: `git switch main && git pull`
2. 作成: `git switch -c feature/report-export`
3. こまめに意味ある commit
4. 定期的に `origin/main` を取り込む (rebase/merge)
5. push: `git push -u origin feature/report-export`
6. PR/MR を開く
7. マージ後ローカル+リモート削除

---
## 10. トラブルシュート
| 状況 | 原因 | 解決 |
|------|------|------|
| 切替不可 | 上書きされる未コミット変更 | commit / stash / restore |
| Detached HEAD 警告 | commit を直接 checkout | `git switch -c new-branch` |
| clone したのに分岐不足 | デフォルトのみ取得 | `git fetch --all` 後 `git switch` |
| push 拒否 (non-fast-forward) | リモート先行 | `git pull --rebase` 後 push |
| 誤って削除 | 参照消失 | `git reflog` で位置特定 & branch 作成 |

---
## 11. 戦略的な使い方
用途は機能だけでなく:
- プロトタイプ
- リリースタグからの hotfix
- 長期統合（必要最小限 / フラグ活用）
- ドキュメント/インフラ変更

短命を心がける。長いほど衝突リスク増。

---
## 12. 練習
1. repo を clone / init
2. `feature/colors` でファイル追加
3. 意味ある commit 2 回
4. main に無関係 commit 後 rebase
5. ブランチ名を `feature/theme-colors` に
6. push & PR
7. merge 後削除

---
## 13. 要点
- 作成は即時 & 軽量、積極活用
- `switch` は分かりやすい現代コマンド
- 早めの更新で摩擦減
- 後片付けで脳内負荷軽減
- 実験も branch 上で

ブランチを極めると rebase/履歴編集/複数ブランチ戦略が自然に身につく。
