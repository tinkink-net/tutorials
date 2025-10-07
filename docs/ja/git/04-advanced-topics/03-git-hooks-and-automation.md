# Git Hooks と自動化

## はじめに
Git hooks は特定ライフサイクルイベントで実行されるスクリプトで、品質・セキュリティ・コンプライアンス自動化を実現する。本稿はローカル hooks、サーバーサイド hooks（概念）、モダンツール統合を扱う。

## 種類
| 種別 | 実行タイミング | 用例 |
|------|----------------|------|
| クライアント | 開発者操作時 | commit 前 lint |
| サーバーサイド | push 受信時 | ポリシー強制 |

## 位置
`.git/hooks/` にサンプル (`.sample`)。拡張子除去 + 実行権付与で有効化。

## 代表的ローカル Hooks
| Hook | トリガー | 例 |
|------|----------|----|
| pre-commit | commit 直前 | Lint / 部分テスト |
| commit-msg | メッセージ入力後 | Conventional 形式検証 |
| pre-push | push 前 | 高速テスト |
| post-merge | マージ後 | 依存インストール |
| prepare-commit-msg | エディタ表示前 | テンプレ挿入 |

## pre-commit 例
```bash
#!/usr/bin/env bash
echo "Running lint..."
eslint . || exit 1
```
```bash
chmod +x .git/hooks/pre-commit
```

## commit メッセージ検証
```bash
#!/usr/bin/env bash
MSG_FILE=$1
PATTERN='^(feat|fix|docs|refactor|test|chore|perf)(\(.+\))?: .+'
if ! grep -Eq "$PATTERN" "$MSG_FILE"; then
  echo "Commit message must follow conventional format" >&2
  exit 1
fi
```

## 共有課題と解決策
ローカル hooks はバージョン管理されない。解決:
1. Husky / Lefthook / pre-commit など
2. `hooks/` ディレクトリを用意し symlink or copy

### Husky 例
```bash
npx husky add .husky/pre-commit "npm test"
```

### Python pre-commit 例
```yaml
repos:
  - repo: https://github.com/psf/black
    rev: 24.3.0
    hooks:
      - id: black
```
```bash
pre-commit install
```

## サーバーサイド Hooks（概要）
`pre-receive`, `update`, `post-receive` など。プラットフォームが抽象化（GitHub Actions / GitLab push rules）。

## 自動化対象
- Lint / Format
- 型チェック
- シークレット検出
- 高速単体テスト
- commit メッセージ検査
- ライセンスヘッダ付与

## Hooks に不向き
- 長時間統合テスト（CI へ）
- 重いビルド
- デプロイ（CI/CD トリガー）

## Fail Fast 原則
ローカルで低レベル問題を捕捉し、CI を常緑に保つ。

## セキュリティ
信頼できるコードのみ実行。第三者ツールはバージョン固定。

## 一時無効化
```bash
git commit --no-verify
```
頻用は避ける。

## パフォーマンス監視
所要時間ログ。>2–3s の pre-commit は敬遠される。変更ファイルのみに限定。

## 差分ファイルのみ lint 例
```bash
#!/usr/bin/env bash
CHANGED=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(js|ts|jsx|tsx)$') || true
if [ -z "$CHANGED" ]; then
  echo "No JS/TS changes."; exit 0
fi
eslint $CHANGED || exit 1
```

## まとめ
Hooks は基礎品質を底上げし、早期フィードバックを実現。高速・バージョン管理可能・透明性を確保すること。

## 次へ
- チームプラクティス (`git-best-practices-for-team-collaboration.md`)
- サブモジュール (`git-submodules-and-large-repositories.md`)

---
**主要コマンド**
```bash
git config core.hooksPath hooks
chmod +x .git/hooks/<hook>
```
