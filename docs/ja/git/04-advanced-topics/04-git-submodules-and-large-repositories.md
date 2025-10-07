# Git サブモジュールと大規模リポジトリ

## はじめに
サブモジュールは 1 つの Git リポジトリ内に別のリポジトリを埋め込む仕組み。強力だが運用摩擦も生む。ここでは適用判断・管理方法・大規模構成の代替策を説明する。

## 使うべき/避けるべき場面
| 適合 | 不適合 |
|------|--------|
| 共有ライブラリのバージョン固定 | 高頻度な双方向変更 |
| 外部依存のベンダリング | 密結合かつ同時変更要求 |
| 法務/監査で独立性必要 | フロー未習熟の開発者多数 |

## 追加
```bash
git submodule add https://github.com/vendor/lib-a external/lib-a
git commit -m "Add lib-a submodule"
```
`.gitmodules` が生成。

### .gitmodules 例
```
[submodule "external/lib-a"]
  path = external/lib-a
  url = https://github.com/vendor/lib-a
```

## クローン
```bash
git clone https://github.com/org/app.git
cd app
git submodule update --init --recursive
```
一括:
```bash
git clone --recurse-submodules <url>
```

## 更新
```bash
cd external/lib-a
git fetch
git checkout v2.4.0
cd ../..
git add external/lib-a
git commit -m "Bump lib-a to v2.4.0"
```
`git diff --submodule` で要約。

## 削除
```bash
git submodule deinit -f external/lib-a
rm -rf .git/modules/external/lib-a
git rm -f external/lib-a
git commit -m "Remove lib-a submodule"
```

## ピットフォール
| 問題 | 原因 | 緩和 |
|------|------|------|
| サブモジュール内 detached HEAD | 初期状態 | 変更するならブランチ作成 |
| ポインタ更新忘れ | サブモジュール内だけ commit | 親 repo でパスを stage |
| ネスト混乱 | 多段サブモジュール | `--recursive` or 構造簡素化 |
| `.gitmodules` 競合 | 並行編集 | 早期 rebase / 調整 |

## 大規模 Monorepo 代替
| 戦略 | 説明 |
|------|------|
| Monorepo | 単一履歴 + 共通ツール |
| Subtree | メタデータ過少で外部コード取り込み |
| パッケージマネージャ | Registry 配布 |
| 複数 repo + CI オーケストレーション | 分離管理と自動連携 |

### Subtree 簡易例
```bash
git subtree add --prefix=vendor/lib-a https://github.com/vendor/lib-a main --squash
```
更新:
```bash
git subtree pull --prefix=vendor/lib-a https://github.com/vendor/lib-a main --squash
```

## パフォーマンス Tips
- CI 浅クローン: `git clone --depth 20`
- 部分クローン (Git 2.19+):
```bash
git clone --filter=blob:none --sparse <url>
```
- Sparse checkout:
```bash
git sparse-checkout init --cone
git sparse-checkout set src/ docs/
```

## 状態監査
```bash
git submodule status --recursive
```

## セキュリティ
- ソースをレビュー（ビルドで実行される）
- 動くブランチでなく tag/commit 固定
- サプライチェーン警告監視

## まとめ
サブモジュールは明示的なバージョン固定に有効だが摩擦も伴う。用途を明確にし、広範統合要件には subtree / パッケージ / monorepo を評価せよ。

## 次へ
- 自動化 (`git-hooks-and-automation.md`)
- チーム協業 (`git-best-practices-for-team-collaboration.md`)

---
**主要コマンド**
```bash
git submodule add <url> <path>
git submodule update --init --recursive
git diff --submodule
git submodule status --recursive
```
