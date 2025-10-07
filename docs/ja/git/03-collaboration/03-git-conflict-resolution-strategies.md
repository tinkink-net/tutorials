# Git コンフリクト解決戦略

## はじめに
協調開発ではコンフリクトは不可避。本ガイドは基礎を超え、パターン・判断フレームワーク・ツール活用で効率/安全に解決する方法を示す。

## コンフリクト種別
| 種類 | 例 | 原因 |
|------|----|------|
| Content | 同じ行を変更 | 並行編集 |
| Add/Delete | 片方で削除 / 片方で編集 | 分岐リファクタ |
| Rename/Edit | リネーム + 内容変更 | 大規模変更の非同期 |
| Binary | 画像双方編集 | 行単位マージ不可 |
| Directory/File | ディレクトリ ↔ ファイル 変換 | 構造再編 |

## 一般フロー
```
Detect → Classify → 意図確認 → (編集/採択) → テスト → Commit
```

## 迅速な状況確認
```bash
git status
git diff --name-only --diff-filter=U
git diff --merge
```

## ours / theirs 選択
```bash
# 自ブランチを採用
git checkout --ours path/file.txt
# 相手ブランチを採用
git checkout --theirs path/file.txt
git add path/file.txt
```
意味的正しさを必ず確認。

## 構造化手動マージ手順
1. 両側変更を全文読む
2. 変更意図分類 (ビジネス / フォーマット / ホットフィックス)
3. 望ましい結合挙動を再構築
4. マーカー削除 & テスト実行
5. `git add` → 続行

## 事前の細分化コミット
```bash
git add -p
```
小さく意味の塊でコミットしコンフリクト面積を削減。

## 長期ブランチの戦略的 rebase
```bash
git fetch origin
git rebase origin/main
```

## ツール一覧
| ツール | コマンド | メモ |
|--------|----------|------|
| VS Code | GUI マージエディタ | 視認性高い |
| Meld | `git mergetool` | 視覚 diff |
| Beyond Compare | `git mergetool` 統合 | 商用 |
| IntelliJ | 自動グルーピング | IDE 連携 |

## マーカー例
```
<<<<<<< HEAD (current: main)
applyDiscount(cart, 0.10)
=======
applyDiscount(cart, discountRate())
>>>>>>> feature/dynamic-discount
```
最終形:
```js
applyDiscount(cart, discountRate() ?? 0.10)
```

## バイナリ
```bash
git checkout --theirs assets/logo.png
git add assets/logo.png
```
または再生成。

## 中断 / 継続
```bash
git merge --abort
git rebase --abort
git rebase --continue
```

## Rerere 再利用
```bash
git config --global rerere.enabled true
```
過去と同型の競合解決を自動適用。

## 予防
| 手法 | 効果 |
|------|------|
| 統一フォーマッタ | スタイル差分排除 |
| 小型 PR | 重複編集減 |
| 早期同期 | 乖離縮小 |
| アーキ議論共有 | 重複実装回避 |
| Feature flag | 未完成でも早期統合 |

## 回帰安全網
```bash
./run-tests.sh
git diff --check
```

## 誤った解決の復旧
```bash
git reflog
git reset --hard <hash>
```

## まとめ
コンフリクトは並行イノベーションの信号。体系的プロセスと衛生習慣、適切ツールで影響を最小化できる。

## 次へ
- `git-reset-revert-and-checkout-explained.md`
- `git-stash-and-temporary-changes.md`

---
**主要コマンド**
```bash
git diff --name-only --diff-filter=U
git checkout --ours <file>
git checkout --theirs <file>
git merge --abort
git rebase --continue
```
