# Git ブランチの理解

Git ブランチは Git バージョン管理システムの最も強力な機能の一つです。メインの開発ラインから分岐して、メインコードベースに影響を与えることなく、異なる機能、バグ修正、または実験を行うことができます。

## Git ブランチとは？

Git におけるブランチは、本質的に特定のコミットを指す可動ポインタです。新しいブランチを作成すると、Git は現在いるコミットを指す新しいポインタを作成します。ほとんどの Git リポジトリのデフォルトブランチは `main`（古いリポジトリでは `master`）と呼ばれます。

ブランチをコードの平行宇宙のように考えてください - 異なる機能を同時に作業でき、それらが互いに干渉することはありません。

## なぜブランチを使うのか？

### 1. **並行開発**
複数の開発者が競合することなく、異なる機能を同時に作業できます。

### 2. **機能の分離**
各機能を独立して開発でき、テストとデバッグが容易になります。

### 3. **安全な実験**
メインコードベースを破壊するリスクなしに新しいアイデアを試すことができます。

### 4. **コードレビュー**
ブランチはプル/マージリクエストを通じて適切なコードレビュープロセスを可能にします。

## 基本的なブランチ操作

### ブランチの表示

リポジトリ内のすべてのブランチを表示するには：

```bash
# すべてのローカルブランチをリスト表示
git branch

# すべてのブランチ（ローカルとリモート）をリスト表示
git branch -a

# リモートブランチのみをリスト表示
git branch -r
```

現在のブランチはアスタリスク (*) でハイライト表示されます。

### 新しいブランチの作成

新しいブランチを作成する方法はいくつかあります：

```bash
# 新しいブランチを作成するが現在のブランチに留まる
git branch feature-login

# 新しいブランチを作成して切り替える
git checkout -b feature-login

# モダンな方法：新しいブランチを作成して切り替える
git switch -c feature-login
```

### ブランチ間の切り替え

```bash
# 既存のブランチに切り替える（従来の方法）
git checkout main

# 既存のブランチに切り替える（モダンな方法）
git switch main
```

### ブランチ命名規則

良いブランチ名は説明的で一貫したパターンに従います：

```bash
# 機能ブランチ
git branch feature/user-authentication
git branch feature/shopping-cart
git branch feat/add-payment-gateway

# バグ修正ブランチ
git branch bugfix/login-error
git branch fix/navbar-responsive
git branch hotfix/security-patch

# リリースブランチ
git branch release/v1.2.0
git branch release/2024-01-15
```

## ブランチでの作業

### ブランチでの変更

1. **ブランチに切り替える**：
```bash
git switch feature-login
```

2. **変更を行い**コミットする：
```bash
# ファイルを編集
echo "Login functionality" > login.js

# 変更をステージング
git add login.js

# 変更をコミット
git commit -m "Add basic login functionality"
```

3. **ブランチをリモートにプッシュ**：
```bash
# 新しいブランチを初回プッシュ
git push -u origin feature-login

# 後続のプッシュ
git push
```

### リモートブランチの追跡

リモートリポジトリと作業する際：

```bash
# リモートから最新の変更を取得
git fetch origin

# リモートブランチを追跡するローカルブランチを作成
git checkout -b feature-login origin/feature-login

# またはモダンな構文を使用
git switch -c feature-login origin/feature-login
```

## ブランチの状態と情報

### ブランチの状態確認

```bash
# 現在のブランチとコミットされていない変更を表示
git status

# ブランチのコミット履歴を表示
git log --oneline

# ブランチの差分を表示
git diff main..feature-login
```

### ブランチの比較

```bash
# feature-login にあって main にないコミットを表示
git log main..feature-login

# ブランチ間のファイル差分を表示
git diff main feature-login

# 変更されたファイル名のみを表示
git diff --name-only main feature-login
```

## ブランチ管理のベストプラクティス

### 1. **ブランチを短命にする**
特定の機能や修正のためのブランチを作成し、迅速にマージし直す。

### 2. **定期的な更新**
機能ブランチを main の最新変更で更新し続ける：

```bash
# main に切り替えて最新の変更をプル
git switch main
git pull origin main

# 機能ブランチに戻って main をマージ
git switch feature-login
git merge main
```

### 3. **ブランチの整理**
マージ後にブランチを削除：

```bash
# ローカルブランチを削除
git branch -d feature-login

# リモートブランチを削除
git push origin --delete feature-login
```

### 4. **説明的な名前を使用**
ブランチ名はそのブランチの目的を明確に示すべきです。

## 一般的なブランチシナリオ

### シナリオ 1：機能開発

```bash
# main から開始
git switch main
git pull origin main

# 機能ブランチを作成
git switch -c feature/user-profile

# 機能を作業
echo "Profile page" > profile.html
git add profile.html
git commit -m "Add user profile page"

# リモートにプッシュ
git push -u origin feature/user-profile
```

### シナリオ 2：バグ修正

```bash
# main からバグ修正ブランチを作成
git switch main
git switch -c bugfix/navbar-mobile

# バグを修正
echo "Fixed navbar" > navbar.css
git add navbar.css
git commit -m "Fix navbar responsiveness on mobile"

# プッシュしてプルリクエストを作成
git push -u origin bugfix/navbar-mobile
```

### シナリオ 3：緊急ホットフィックス

```bash
# main からホットフィックスブランチを作成
git switch main
git switch -c hotfix/security-patch

# 緊急修正を適用
echo "Security update" > security.js
git add security.js
git commit -m "Apply security patch for user authentication"

# 即座にマージするためにプッシュ
git push -u origin hotfix/security-patch
```

## 一般的な問題のトラブルシューティング

### 問題：コミットされていない変更のためブランチを切り替えられない

```bash
# オプション 1：変更を一時的にスタッシュ
git stash
git switch other-branch
git stash pop

# オプション 2：最初に変更をコミット
git add .
git commit -m "WIP: temporary commit"
git switch other-branch
```

### 問題：ブランチがリモートから分岐した

```bash
# 強制プッシュ（注意して使用）
git push --force-with-lease

# または新しいブランチを作成
git switch -c feature-login-fixed
git push -u origin feature-login-fixed
```

## 高度なブランチコマンド

### インタラクティブなブランチ作成

```bash
# 特定のコミットからブランチを作成
git branch feature-login abc123

# タグからブランチを作成
git branch release-branch v1.0.0

# 孤立ブランチを作成（コミット履歴なし）
git checkout --orphan gh-pages
```

### ブランチ情報

```bash
# 各ブランチの最後のコミットを表示
git branch -v

# マージされたブランチを表示
git branch --merged main

# マージされていないブランチを表示
git branch --no-merged main
```

## 次のステップ

Git ブランチを理解したので、次を学ぶべきです：

1. **ブランチのマージ** - 異なるブランチからの変更を結合する方法
2. **マージ競合の解決** - マージ時の競合の処理
3. **プルリクエスト** - コードレビューのための協働ワークフロー
4. **Git Rebase** - よりクリーンな履歴のためのマージの代替

## 結論

Git ブランチはあらゆる開発ワークフローに不可欠です。メインコードベースを安定に保ちながら、複数の機能を同時に作業する柔軟性を提供します。この強力な Git 機能に慣れるために、ブランチの作成、変更の実施、ブランチ間の切り替えを練習してください。

覚えておいてください：Git ではブランチは安価で高速なので、行っている新しい作業のために自由にブランチを作成することを躊躇しないでください！