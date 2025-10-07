# Gitのインストールとセットアップ

Gitは分散型バージョン管理システムで、コードの変更を追跡し、他の人と協力し、プロジェクトの異なるバージョンを管理するのに役立ちます。このチュートリアルでは、異なるオペレーティングシステムにGitをインストールし、初期設定を行う方法を説明します。

## Gitとは？

Gitは強力なバージョン管理システムで、以下のことができます：
- 時間の経過とともにファイルの変更を追跡する
- 以前のバージョンに戻すことができる
- 複数の開発者との協力を可能にする
- プロジェクトの異なるバージョン（ブランチ）を管理する
- オフラインで作業し、接続時に同期する

## Gitのインストール

### Windows

#### オプション1：公式Git for Windows
1. [git-scm.com](https://git-scm.com/download/win)にアクセス
2. Windows用の最新バージョンをダウンロード
3. インストーラーを実行し、以下の推奨設定に従ってください：
   - 「Use Git from the Windows Command Prompt」を選択
   - 「Checkout Windows-style, commit Unix-style line endings」を選択
   - 「Use Windows' default console window」を選択

#### オプション2：パッケージマネージャー（Chocolatey）を使用
Chocolateyがインストールされている場合：
```bash
choco install git
```

#### オプション3：パッケージマネージャー（Scoop）を使用
Scoopがインストールされている場合：
```bash
scoop install git
```

### macOS

#### オプション1：Homebrewを使用（推奨）
```bash
brew install git
```

#### オプション2：MacPortsを使用
```bash
sudo port install git
```

#### オプション3：Xcodeコマンドラインツール
```bash
xcode-select --install
```

#### オプション4：公式インストーラー
1. [git-scm.com](https://git-scm.com/download/mac)にアクセス
2. macOS用インストーラーをダウンロード
3. インストーラーを実行し、指示に従う

### Linux

#### Ubuntu/Debian
```bash
sudo apt update
sudo apt install git
```

#### CentOS/RHEL/Fedora
```bash
# CentOS/RHEL
sudo yum install git

# Fedora
sudo dnf install git
```

#### Arch Linux
```bash
sudo pacman -S git
```

#### OpenSUSE
```bash
sudo zypper install git
```

## インストールの確認

インストール後、Gitが正しくインストールされたことを確認します：

```bash
git --version
```

以下のような出力が表示されるはずです：
```
git version 2.39.0
```

## Gitの初期設定

Gitを使用する前に、あなたの身元を設定する必要があります。この情報はコミットに添付されます。

### 身元の設定

名前とメールアドレスを設定します：

```bash
git config --global user.name "あなたのフルネーム"
git config --global user.email "your.email@example.com"
```

例：
```bash
git config --global user.name "山田太郎"
git config --global user.email "john.doe@example.com"
```

### デフォルトエディタの設定

Git操作に使用する好みのテキストエディタを設定します：

```bash
# Visual Studio Codeの場合
git config --global core.editor "code --wait"

# Vimの場合
git config --global core.editor "vim"

# Nanoの場合
git config --global core.editor "nano"

# Sublime Textの場合
git config --global core.editor "subl -n -w"
```

### デフォルトブランチ名の設定

新しいリポジトリのデフォルトブランチ名を設定します：

```bash
git config --global init.defaultBranch main
```

### 改行コードの設定

#### Windows
```bash
git config --global core.autocrlf true
```

#### macOS/Linux
```bash
git config --global core.autocrlf input
```

## 高度な設定オプション

### エイリアスの設定

一般的なGitコマンドのショートカットを作成します：

```bash
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual '!gitk'
```

### プッシュ動作の設定

デフォルトのプッシュ動作を設定します：

```bash
git config --global push.default simple
```

### 認証情報の保存設定

パスワードを繰り返し入力しないようにするには：

#### Windows
```bash
git config --global credential.helper manager-core
```

#### macOS
```bash
git config --global credential.helper osxkeychain
```

#### Linux
```bash
git config --global credential.helper store
```

## 設定の確認

すべてのGit設定を確認するには：

```bash
git config --list
```

特定の設定値を確認するには：

```bash
git config user.name
git config user.email
```

設定がどこで定義されているかを確認するには：

```bash
git config --show-origin user.name
```

## 設定ファイルの場所

Git設定は3つのレベルで保存されます：

1. **システム全体**：`/etc/gitconfig`（すべてのユーザーに影響）
2. **ユーザー固有**：`~/.gitconfig`または`~/.config/git/config`（現在のユーザーに影響）
3. **リポジトリ固有**：`.git/config`（現在のリポジトリのみに影響）

各レベルは前のレベルを上書きするため、リポジトリ固有の設定が優先されます。

## SSHキーの設定（オプションですが推奨）

GitHubなどのリモートリポジトリとの安全な認証のために：

### SSHキーの生成
```bash
ssh-keygen -t ed25519 -C "your.email@example.com"
```

### SSHキーをSSHエージェントに追加
```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

### 公開キーのコピー
```bash
# macOS
pbcopy < ~/.ssh/id_ed25519.pub

# Linux
xclip -sel clip < ~/.ssh/id_ed25519.pub

# Windows
clip < ~/.ssh/id_ed25519.pub
```

その後、この公開キーをGitHub/GitLab/Bitbucketアカウントに追加します。

## 一般的な問題のトラブルシューティング

### 権限拒否エラー
権限の問題が発生した場合：
```bash
sudo chown -R $(whoami) ~/.gitconfig
```

### HTTPSとSSH
認証の問題がある場合は、HTTPSとSSHを切り替える必要があるかもしれません：
```bash
# 現在のリモートURLを確認
git remote -v

# SSHに変更
git remote set-url origin git@github.com:username/repository.git

# HTTPSに変更
git remote set-url origin https://github.com/username/repository.git
```

### 証明書の問題
SSL証明書エラーが発生した場合：
```bash
git config --global http.sslVerify false
```

**注意**：これは一時的な解決策としてのみ使用し、その後SSLの検証を再度有効にしてください。

## 次のステップ

Gitをインストールして設定したので、以下のことを行う準備ができました：
- 最初のGitリポジトリを作成する
- 基本的なGitコマンドを学ぶ
- プロジェクトの変更を追跡し始める
- Gitを使用して他の人と協力する

## まとめ

このチュートリアルでは、以下のことを学びました：
- Windows、macOS、LinuxにGitをインストールする方法
- Gitの身元と設定を構成する方法
- 安全な認証のためのSSHキーの設定方法
- 一般的なインストールの問題のトラブルシューティング方法
- Git設定の階層を理解する

これでGitを使用して変更を追跡し、他の人と協力し、コードを効果的に管理する準備ができました。次のチュートリアルでは、基礎を築くためにGitの基本と用語について探求します。