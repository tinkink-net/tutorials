# 基本的なGitワークフロー：Add、Commit、Push

## はじめに

Gitリポジトリを作成し、基本的な概念を理解したところで、基本的なGitワークフローを学ぶ時が来ました。このワークフローは日常的なGit使用の基盤となり、**Add**、**Commit**、**Push**という3つの主要なステップで構成されています。

このチュートリアルでは、これらの重要な操作を通して、変更を追跡し、作業のスナップショットを保存し、コードを他の人と共有する方法を理解するのに役立ちます。

## 前提条件

このチュートリアルを始める前に、以下を確認してください：
- Gitリポジトリが作成されていること（[初めてのGitリポジトリの作成](./creating-your-first-git-repository.md)）
- Gitの基本概念の理解（[Gitの基本と用語の理解](./understanding-git-basics-and-terminology.md)）
- 作業するためのリポジトリ内のいくつかのファイル

## 基本的なGitワークフロー

標準的なGitワークフローは以下のステップに従います：

```
1. 作業ディレクトリでファイルを変更する
2. 変更をステージングする（git add）
3. 変更をコミットする（git commit）
4. リモートリポジトリにプッシュする（git push）
```

それぞれのステップを詳しく見ていきましょう。

## ステップ1：現在の状態を理解する

変更を加える前に、リポジトリの現在の状態を確認しましょう：

```bash
git status
```

次のような表示が出るはずです：
```
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	.gitignore
	README.md
	config.json
	hello.py
	sample.txt

nothing added to commit but untracked files present (use "git add" to track)
```

これは以下を示しています：
- 現在のブランチ：`main`
- まだコミットがない
- いくつかの未追跡ファイルがある

## ステップ2：ファイルをステージングエリアに追加する（git add）

`git add`コマンドは、ファイルを作業ディレクトリからステージングエリアに移動させます。これは次のコミットを準備する場所です。

### 個別のファイルを追加する

ファイルを一つずつ追加します：

```bash
# READMEファイルを追加
git add README.md

# 状態を確認
git status
```

次のように表示されるはずです：
```
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
	new file:   README.md

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	.gitignore
	config.json
	hello.py
	sample.txt
```

**違いに注目してください：**
- `README.md`は「Changes to be committed」（ステージング済み）の下にあります
- 他のファイルは「Untracked」のままです

### 複数のファイルを追加する

複数のファイルを一度に追加します：

```bash
# 特定の複数ファイルを追加
git add hello.py config.json

# または現在のディレクトリのすべてのファイルを追加
git add .

# 状態を確認
git status
```

すべてのファイルを追加した後：
```
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
	new file:   .gitignore
	new file:   README.md
	new file:   config.json
	new file:   hello.py
	new file:   sample.txt
```

### 一般的なgit addパターン

```bash
# すべてのファイルを追加
git add .

# 現在のディレクトリとサブディレクトリのすべてのファイルを追加
git add -A

# 変更されたファイルのみを追加（新規ファイルは含まない）
git add -u

# 対話的にファイルを追加
git add -i

# 特定のファイルタイプを追加
git add *.py
git add *.md
```

### ステージングエリアを理解する

ステージングエリアでは以下のことができます：
- **正確なコミットを作成する** - 各コミットに含めるものを正確に選択できる
- **変更を確認する** - コミット前に何がコミットされるかを確認できる
- **変更を分割する** - 関連する変更を別々にコミットできる

## ステップ3：最初のコミットを作成する（git commit）

コミットはステージングされた変更のスナップショットを作成します。各コミットは論理的な作業単位を表すべきです。

### 基本的なコミットコマンド

```bash
git commit -m "Initial commit: Add project files"
```

次のような出力が表示されるはずです：
```
[main (root-commit) a1b2c3d] Initial commit: Add project files
 5 files changed, 23 insertions(+)
 create mode 100644 .gitignore
 create mode 100644 README.md
 create mode 100644 config.json
 create mode 100755 hello.py
 create mode 100644 sample.txt
```

**出力の理解：**
- `main` - 現在のブランチ
- `root-commit` - これは最初のコミット
- `a1b2c3d` - 短いコミットハッシュ
- `5 files changed, 23 insertions(+)` - 変更の概要

### コミットメッセージのベストプラクティス

良いコミットメッセージはプロジェクト管理に不可欠です：

#### 構造
```
短い要約（50文字以内）

必要に応じてより詳細な説明。72文字で折り返す。
何をしたかではなく、何をなぜしたかを説明する。

- 複数の変更にはビュレットポイントを使用
- 該当する場合は課題番号を参照する
```

#### 良いコミットメッセージの例
```bash
# 良い例 - 明確で簡潔
git commit -m "ユーザー認証システムを追加"

# 良い例 - なぜを説明
git commit -m "パスワードリセットを妨げるログインバグを修正"

# 良い例 - 複数行のコミット
git commit -m "ユーザープロフィール編集を実装

- フォームバリデーションを追加
- ユーザーモデルを更新
- プロフィール画像アップロードを追加
- モバイルでのスタイリングの問題を修正"
```

#### 悪いコミットメッセージの例
```bash
# 悪い例 - あまりにも曖昧
git commit -m "修正"

# 悪い例 - 説明的でない
git commit -m "更新"

# 悪い例 - 要約としては長すぎる
git commit -m "このコミットは、ユーザーがメール検証とパスワードリセット機能を使用してログインしてアカウントを登録できるようにする新しいユーザー認証システムを追加します"
```

### 代替コミット方法

#### デフォルトエディタを使用
```bash
# コミットメッセージ用にデフォルトエディタを開く
git commit
```

#### すべての変更をコミット
```bash
# 追跡されているすべてのファイルをステージングしてコミット
git commit -a -m "追跡されているすべてのファイルを更新"
```

## ステップ4：コミット履歴を表示する

コミットを作成した後、リポジトリの履歴を表示できます：

```bash
# コミット履歴を表示
git log
```

出力：
```
commit a1b2c3d4e5f6789... (HEAD -> main)
Author: Your Name <your.email@example.com>
Date:   Wed Jul 9 10:30:00 2025 +0000

    Initial commit: Add project files
```

### 便利なgit logオプション

```bash
# コンパクトな一行形式
git log --oneline

# 最新の3つのコミットを表示
git log -3

# ファイル変更を含むコミットを表示
git log --stat

# 実際の変更を含むコミットを表示
git log -p

# グラフィカルな表現
git log --graph --oneline
```

## 追加の変更を行う

いくつかの変更でワークフローを練習しましょう：

### ステップ1：ファイルを変更する

README.mdファイルを編集します：

```bash
echo "

## Recent Updates

- Added basic project structure
- Created initial configuration
- Set up Git repository" >> README.md
```

### ステップ2：状態を確認する

```bash
git status
```

次のように表示されるはずです：
```
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   README.md

no changes added to commit (use "git add" and commit)
```

### ステップ3：変更を表示する

何が変更されたかを確認します：

```bash
git diff
```

これにより、作業ディレクトリと最後のコミットの間の違いが表示されます。

### ステップ4：ステージングとコミット

```bash
# 変更をステージング
git add README.md

# 変更をコミット
git commit -m "Update README with project status"
```

## ファイルの状態を理解する

Gitのファイルはさまざまな状態を経ます：

```
未追跡 → ステージング済み → コミット済み
   ↓         ↓           ↓
 git add → git commit → git push
```

### ファイル状態の例

```bash
# 詳細な状態を確認
git status

# 短い状態を確認
git status -s
```

短い状態の記号：
- `??` - 未追跡ファイル
- `A` - 追加（ステージング済み）
- `M` - 変更済み
- `D` - 削除済み
- `R` - 名前変更済み

## ステップ5：リモートリポジトリの設定

変更をプッシュするには、リモートリポジトリが必要です。リモートを設定しましょう：

### GitHubを使用する（例）

1. GitHubで新しいリポジトリを作成
2. リポジトリURLをコピー
3. リモートとして追加：

```bash
# リモートリポジトリを追加
git remote add origin https://github.com/yourusername/my-first-git-project.git

# リモートを確認
git remote -v
```

### GitLabまたは他のサービスを使用する

プロセスは同様です：
```bash
# GitLabの例
git remote add origin https://gitlab.com/yourusername/my-first-git-project.git

# 自己ホスト型Gitサーバー
git remote add origin user@server:/path/to/repo.git
```

## ステップ6：リモートリポジトリにプッシュする（git push）

コミットをリモートリポジトリにプッシュします：

```bash
# リモートリポジトリにプッシュ
git push -u origin main
```

`-u`フラグは、ローカルの`main`ブランチとリモートの`main`ブランチの間のトラッキングを設定します。

### プッシュ出力を理解する

```
Enumerating objects: 7, done.
Counting objects: 100% (7/7), done.
Delta compression using up to 4 threads
Compressing objects: 100% (5/5), done.
Writing objects: 100% (7/7), 1.23 KiB | 1.23 MiB/s, done.
Total 7 (delta 0), reused 0 (delta 0)
To https://github.com/yourusername/my-first-git-project.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

### 今後のプッシュ

`-u`を使用した初回プッシュの後は、単純に以下を使用できます：

```bash
git push
```

## 完全なワークフロー例

Gitワークフローの完全な例を示します：

```bash
# 1. 変更を加える
echo "print('Hello, Git!')" > new_script.py

# 2. 状態を確認
git status

# 3. 変更をステージング
git add new_script.py

# 4. 変更をコミット
git commit -m "Add new Python script"

# 5. リモートにプッシュ
git push
```

## 一般的なGitワークフローパターン

### 機能開発ワークフロー
```bash
# 機能の作業を開始
git status
# ... 変更を加える ...
git add .
git commit -m "機能Xを実装"
git push
```

### バグ修正ワークフロー
```bash
# バグを修正
git status
# ... バグを修正 ...
git add -u  # 変更されたファイルのみを追加
git commit -m "ユーザー認証のバグを修正"
git push
```

### 通常の開発ワークフロー
```bash
# 日常的な開発サイクル
git status
# ... コードに取り組む ...
git add .
git commit -m "ユーザープロフィールの検証を追加"
# ... さらに作業 ...
git add .
git commit -m "エラー処理を更新"
git push
```

## ベストプラクティス

### 1. 頻繁にコミットする
- 小さく、焦点を絞ったコミットを作成する
- 関連する変更を一緒にコミットする
- コミット間の時間を長く空けない

### 2. 良いコミットメッセージを書く
- 現在形を使用する（「機能を追加」であり「機能を追加した」ではない）
- 最初の行は50文字以内に保つ
- 何をしたかだけでなく、なぜそうしたかを説明する

### 3. コミット前にレビューする
```bash
# コミットする内容を常に確認する
git status
git diff --staged
```

### 4. ステージングエリアを効果的に使用する
- 関連する変更のみをステージングする
- 部分的なファイルステージングには`git add -p`を使用する
- コミット前にステージングされた変更をレビューする

## 一般的な問題のトラブルシューティング

### 問題：「Nothing to commit」
**原因**：コミット用にステージングされた変更がない。
**解決策**：まず`git add`を使用して変更をステージングする。

### 問題：「Repository not found」
**原因**：リモートリポジトリのURLが正しくない。
**解決策**：`git remote -v`でリモートURLを確認する。

### 問題：「Authentication failed」
**原因**：認証情報または権限が正しくない。
**解決策**：ユーザー名/パスワードまたはSSH鍵を確認する。

### 問題：「Uncommitted changes」
**原因**：コミットされていない変更がある状態でプッシュしようとしている。
**解決策**：まず変更をコミットまたはスタッシュする。

## 便利なコマンドのまとめ

### 状態と情報
```bash
git status          # リポジトリの状態を確認
git log             # コミット履歴を表示
git diff            # 変更を表示
git remote -v       # リモートリポジトリを表示
```

### ステージングとコミット
```bash
git add <file>      # 特定のファイルをステージング
git add .           # すべてのファイルをステージング
git commit -m "msg" # メッセージ付きでコミット
git commit -a -m "msg" # 追跡されているファイルをステージングしてコミット
```

### リモート操作
```bash
git remote add origin <url>  # リモートリポジトリを追加
git push -u origin main      # プッシュしてアップストリームを設定
git push                     # 設定されたリモートにプッシュ
```

## まとめ

基本的なGitワークフローを無事に学びました！以下が達成したことです：

1. **ワークフローの理解**：Add → Commit → Push
2. **変更のステージング**：`git add`を使用してコミットを準備
3. **コミットの作成**：`git commit`でスナップショットを作成
4. **リモートの設定**：外部リポジトリへの接続
5. **変更のプッシュ**：`git push`で作業を共有
6. **ベストプラクティス**：良いコミットメッセージの作成と作業の整理

### マスターしたキーコマンド：
- `git add` - コミット用に変更をステージング
- `git commit` - ステージングされた変更のスナップショットを作成
- `git push` - コミットをリモートリポジトリにアップロード
- `git status` - 現在のリポジトリの状態を確認
- `git log` - コミット履歴を表示
- `git diff` - バージョン間の変更を確認

### ワークフローパターン：
```
ファイルを編集 → git add → git commit → git push
```

この基本的なワークフローはすべてのGit使用の基盤を形成します。一人で作業するか、チームで作業するかにかかわらず、これらのコマンドはバージョン管理のための日常的なツールとなります。

## 次のステップ

基本的なGitワークフローを理解したので、より高度なトピックを探索する準備ができました：

1. [Gitブランチの理解](./understanding-git-branches.md)
2. [ブランチの作成と切り替え](./creating-and-switching-branches.md)
3. [リモートリポジトリの操作](./working-with-remote-repositories.md)

## 関連リソース

- [初めてのGitリポジトリの作成](./creating-your-first-git-repository.md)
- [Gitの基本と用語の理解](./understanding-git-basics-and-terminology.md)
- [Gitのインストールとセットアップ](./git-installation-and-setup.md)
- [公式Gitチュートリアル](https://git-scm.com/docs/gittutorial)
- [Pro Gitブック - Gitの基本](https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository)