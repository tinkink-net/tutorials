# Git Reset / Revert / Checkout 解説

## はじめに
「元に戻したい」ときに正しいコマンドを選ぶとデータ損失を防ぎ、安全に履歴を保てる。本ガイドは `reset`, `revert`, `checkout`（および `restore` / `switch`）を比較する。

## クイック比較
| コマンド | 作用範囲 | 履歴書換? | 主用途 |
|----------|----------|-----------|--------|
| reset | ブランチ参照/ステージを移動 | はい (公開前のみ) | ローカル commit やり直し |
| revert | 逆パッチ commit 追加 | いいえ | 公開済み変更の取り消し |
| checkout (file) | ワークツリーのファイル復旧 | いいえ | ローカル変更破棄 |
| checkout (branch) | HEAD 切替 | いいえ | ブランチ移動 |
| restore | ファイル操作の新構文 | いいえ | 安全な復元/unstage |
| switch | ブランチ切替新構文 | いいえ | 明確なブランチ操作 |

## reset モード
```bash
git reset --soft HEAD~1   # 変更はステージに残す
git reset --mixed HEAD~1  # (デフォルト) unstage して作業ツリー保持
git reset --hard HEAD~1   # すべて破棄（危険）
```
用途:
- soft: 直近 commit をまとめて amend したい
- mixed: コミット内容を再構成
- hard: ローカル実験を捨てる

## ブランチポインタ移動
```bash
git reset --hard <commit>
```
push 済みなら避け、`revert` を使う。

## 最終 commit 修正
```bash
git commit --amend -m "Refine API error handling"
```
公開後は要調整。

## revert（安全な公開取消）
```bash
git revert <commit>
git revert <old>..<new>
```
逆パッチ commit を追加し履歴を壊さない。

### マージ commit の revert
```bash
git revert -m 1 <merge-hash>
```
`-m 1` は mainline 親指定。

## ローカルファイル変更破棄
旧式:
```bash
git checkout -- path/file.txt
```
新式:
```bash
git restore path/file.txt
git restore --staged path/file.txt
```

## ブランチ切替（新構文）
```bash
git switch main
git switch -c feature/new-dashboard
```

## 失われた commit の復旧
```bash
git reflog
git checkout <lost-hash>
```
必要ならブランチ化:
```bash
git switch -c recovery/<topic>
```

## インタラクティブ履歴編集
```bash
git rebase -i HEAD~5
```
共有前の整形に有効。

## 判断ガイド
| 状況 | 選択 |
|------|------|
| 直近2 commit をまとめ修正 | `git reset --soft HEAD~2` + amend |
| 公開済み commit の取り消し | `git revert <hash>` |
| 未ステージ変更捨てる | `git restore <file>` |
| 誤ってステージした | `git restore --staged <file>` |
| 明確な既知良好状態へ戻る (ローカル) | `git reset --hard <hash>` |
| 過去 commit の調査 | `git checkout <hash>` (detached) |

## 安全 Tips
1. `--hard` 前に本当に不要か確認（必要なら stash）
2. 共有後は revert 優先
3. ブランチを安全ネットに
4. `reflog` を覚える

## まとめ
破壊性の少ない手段から選ぶ。Reset は書換、Revert は補正記録、Checkout/Restore は作業領域操作。

## 次へ
- `git-stash-and-temporary-changes.md`
- `git-hooks-and-automation.md`

---
**主要コマンド**
```bash
git reset --soft|--mixed|--hard <ref>
git revert <commit>
git restore [--staged] <file>
git reflog
```
