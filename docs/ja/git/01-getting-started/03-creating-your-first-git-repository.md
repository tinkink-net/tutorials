# 最初のGitリポジトリを作成する

## はじめに

Gitの基本と用語を理解したところで、最初のGitリポジトリを作成する時が来ました。このチュートリアルでは、新しいGitリポジトリの初期化、ディレクトリ構造の理解、バージョン管理のための最初のプロジェクトのセットアップ方法を説明します。

このチュートリアルの終わりには、完全に機能するGitリポジトリを持ち、プロジェクトファイルの追跡を開始する方法を理解することができます。

## 前提条件

このチュートリアルを始める前に、以下のことを確認してください：
- システムにGitがインストールされていること（[Gitのインストールとセットアップ](./git-installation-and-setup.md)）
- Gitの概念の基本的な理解（[Gitの基本と用語の理解](./understanding-git-basics-and-terminology.md)）
- お好みのテキストエディタまたはIDE
- コマンドラインの基本的な知識

## Gitリポジトリを作成する2つの方法

Gitリポジトリを作成するには主に2つの方法があります：

1. 既存のディレクトリに**新しいリポジトリを初期化する**
2. リモートの場所から**既存のリポジトリをクローンする**

このチュートリアルでは最初の方法に焦点を当てます。クローンについては、リモートリポジトリに関する後のチュートリアルで説明します。

## 方法1：新しいリポジトリを初期化する

### ステップ1：プロジェクトディレクトリを作成する

まず、プロジェクト用の新しいディレクトリを作成します：

```bash
# 新しいディレクトリを作成
mkdir my-first-git-project

# ディレクトリに移動
cd my-first-git-project
```

### ステップ2：Gitリポジトリを初期化する

プロジェクトディレクトリでGitを初期化します：

```bash
git init
```

次のような出力が表示されるはずです：
```
Initialized empty Git repository in /path/to/my-first-git-project/.git/
```

**何が起きたのか？**
- Gitはプロジェクトフォルダに隠れた`.git`ディレクトリを作成しました
- この`.git`ディレクトリにはすべてのGitメタデータとオブジェクトデータベースが含まれています
- あなたのディレクトリは今Gitリポジトリになりました（ただし空です）

### ステップ3：リポジトリの作成を確認する

ディレクトリでGitが機能していることを確認します：

```bash
git status
```

次のように表示されるはずです：
```
On branch main

No commits yet

nothing to commit (create/copy files and use "git add" to track)
```

これにより以下のことが確認できます：
- `main`ブランチにいる
- まだコミットが行われていない
- 追跡されているファイルがない

## .gitディレクトリについて理解する

`.git`ディレクトリにはすべてのGitリポジトリデータが含まれています。その構造を見てみましょう：

```bash
ls -la .git/
```

次のようなディレクトリとファイルが表示されます：
- `config` - リポジトリの設定
- `description` - リポジトリの説明（GitWebで使用）
- `HEAD` - 現在のブランチを指す
- `hooks/` - Gitフック（スクリプト）のディレクトリ
- `info/` - 追加のリポジトリ情報
- `objects/` - Gitオブジェクトデータベース
- `refs/` - 参照（ブランチ、タグ）

**重要**：何をしているのか正確に理解していない限り、`.git`ディレクトリ内のファイルを手動で編集しないでください！

## 最初のファイルを作成する

### ステップ1：READMEファイルを作成する

プロジェクト用のREADMEファイルを作成します：

```bash
echo "# My First Git Project" > README.md
```

またはテキストエディタで作成します：

```markdown
# My First Git Project

This is my first project using Git version control.

## Features

- Learning Git basics
- Understanding version control
- Building good development habits

## Getting Started

This project demonstrates basic Git workflow and commands.
```

### ステップ2：追加ファイルを作成する

プロジェクトをより興味深くするために、いくつかのファイルを追加で作成しましょう：

```bash
# シンプルなPythonスクリプトを作成
cat > hello.py << 'EOF'
#!/usr/bin/env python3

def greet(name):
    """Return a greeting message."""
    return f"Hello, {name}!"

if __name__ == "__main__":
    print(greet("World"))
EOF

# シンプルなテキストファイルを作成
echo "This is a sample text file for Git practice." > sample.txt

# プロジェクト設定ファイルを作成
cat > config.json << 'EOF'
{
  "project": "my-first-git-project",
  "version": "1.0.0",
  "author": "Your Name",
  "description": "Learning Git version control"
}
EOF
```

### ステップ3：リポジトリのステータスを確認する

Gitが何を認識しているか確認しましょう：

```bash
git status
```

次のように表示されるはずです：
```
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	README.md
	config.json
	hello.py
	sample.txt

nothing added to commit but untracked files present (use "git add" to track)
```

**出力の理解：**
- `Untracked files` - Gitが現在追跡していないファイル
- Gitは`git add`を使用してこれらのファイルの追跡を開始することを提案しています

## Gitにおけるファイルの状態

Gitはファイルを異なる状態に分類します：

### 1. 未追跡（Untracked）
- 作業ディレクトリに存在するがGitによって追跡されていないファイル
- 新しいファイルはこのカテゴリに分類されます

### 2. 追跡済み（Tracked）
Gitが認識しているファイルで、以下の状態があります：
- **未変更（Unmodified）** - 前回のコミット以降変更がない
- **変更済み（Modified）** - 変更されたがステージングされていない
- **ステージング済み（Staged）** - 次のコミットのために変更がマークされている

## 基本的なGit設定（オプション）

コミットを行う前に、あなたの身元情報でGitを設定するとよいでしょう：

```bash
# 名前とメールを設定（グローバルに設定していない場合）
git config user.name "Your Name"
git config user.email "your.email@example.com"

# 現在の設定を表示
git config --list
```

## リポジトリ固有の設定

このリポジトリに固有の設定を行うこともできます：

```bash
# リポジトリ固有の設定を行う
git config user.name "Project Specific Name"
git config user.email "project@example.com"

# リポジトリの設定を表示
git config --local --list
```

## .gitignoreファイルの作成

Gitが無視すべきファイルを指定する`.gitignore`ファイルを作成します：

```bash
cat > .gitignore << 'EOF'
# Ignore compiled Python files
*.pyc
__pycache__/

# Ignore temporary files
*.tmp
*.temp

# Ignore log files
*.log

# Ignore IDE files
.vscode/
.idea/
*.swp
*.swo

# Ignore OS-specific files
.DS_Store
Thumbs.db
EOF
```

### なぜ.gitignoreを使用するのか？
- 一時ファイルが追跡されるのを防ぐ
- リポジトリをきれいに保つ
- `git status`のノイズを減らす
- 機密データの誤ったコミットを防ぐ

## Gitリポジトリ構造の理解

あなたのプロジェクトは現在この構造になっています：

```
my-first-git-project/
├── .git/                 # Gitリポジトリデータ（隠しフォルダ）
├── .gitignore           # 無視するファイル
├── README.md            # プロジェクトドキュメント
├── config.json          # 設定ファイル
├── hello.py             # Pythonスクリプト
└── sample.txt           # サンプルテキストファイル
```

## リポジトリのステータスを再度確認する

リポジトリがどのように見えるか確認しましょう：

```bash
git status
```

次のように表示されるはずです：
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

## リポジトリ作成のベストプラクティス

### 1. 早期に初期化する
多くのコードを書いた後ではなく、プロジェクトの最初からGitを使い始めましょう。

### 2. 良いREADMEを作成する
常に以下を説明するREADMEファイルを含めましょう：
- プロジェクトの目的
- インストール/実行方法
- 貢献方法

### 3. 最初から.gitignoreを使用する
不要なファイルを追跡しないように、早い段階で`.gitignore`を設定しましょう。

### 4. 意味のあるディレクトリ名を選ぶ
プロジェクトディレクトリには説明的な名前を使用しましょう。

### 5. リポジトリのルートをきれいに保つ
ルートディレクトリに多すぎるファイルを置かないようにしましょう。

## 避けるべき一般的なミス

### 1. ホームディレクトリでGitを初期化しない
```bash
# これはやめましょう
cd ~
git init
```

### 2. .gitディレクトリを削除しない
`.git`を削除するとすべてのGit履歴が破壊されます。

### 3. 別のGitリポジトリ内でGitを初期化しない
これは混乱と競合を引き起こす可能性があります。

### 4. 大きなバイナリファイルを追跡しない
大きなファイルには代わりにGit LFSを使用しましょう。

## 方法2：ファイルがある状態で初期化する

すでにディレクトリにファイルがある場合、そこでGitを初期化できます：

```bash
# 既存のプロジェクトに移動
cd existing-project

# Gitを初期化
git init

# ファイルは未追跡状態になり、追加する準備ができています
git status
```

## 一般的な問題のトラブルシューティング

### 問題：「Not a git repository」
**解決策**：正しいディレクトリにいることと`git init`を実行したことを確認してください。

### 問題：Permission Denied
**解決策**：ファイルのアクセス権を確認し、ディレクトリに書き込み権限があることを確認してください。

### 問題：Repository Already Exists
**解決策**：「Reinitialized existing Git repository」と表示される場合、Gitは既存の`.git`ディレクトリを検出しています。

## まとめ

最初のGitリポジトリを正常に作成しました！以下のことを達成しました：

1. **プロジェクトディレクトリを作成**し、Gitを初期化した
2. **.gitディレクトリの構造**と目的を理解した
3. README、コード、設定を含む**プロジェクトファイルを作成**した
4. 不要なファイルを除外するために**.gitignoreを設定**した
5. Gitにおける**ファイルの状態**（追跡済みvs未追跡）について学んだ
6. リポジトリ用に**Gitを設定**した

### 使用した主要コマンド：
- `git init` - 新しいリポジトリを初期化する
- `git status` - リポジトリの状態を確認する
- `git config` - Git設定を構成する

### 現在のリポジトリの状態：
- ✅ リポジトリが初期化された
- ✅ ファイルが作成された
- ✅ .gitignoreが設定された
- ⏳ ファイルは未追跡状態（ステージングの準備ができている）

## 次のステップ

ファイルを持つリポジトリができたので、基本的なGitワークフローを学ぶ準備ができました：

1. **ファイルをステージングエリアに追加する**（git add）
2. **変更をコミットする**（git commit）
3. **リモートリポジトリにプッシュする**（git push）

続きは：[基本的なGitワークフロー：追加、コミット、プッシュ](./basic-git-workflow-add-commit-push.md)

## 関連リソース

- [Gitの基本と用語の理解](./understanding-git-basics-and-terminology.md)
- [Gitのインストールとセットアップ](./git-installation-and-setup.md)
- [異なるプロジェクトで異なるGit設定を使用する](./git-using-different-config-in-different-projects.md)
- [公式Gitチュートリアル](https://git-scm.com/docs/gittutorial)
- [Pro Gitブック - 始めましょう](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup)