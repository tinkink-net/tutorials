# Bashスクリプティングの基礎

シェルスクリプティングは、タスクの自動化、システム管理、効率的なワークフローの作成のための強力なツールです。このチュートリアルでは、基本的な構文から高度なテクニックまで、bashスクリプティングの基礎を学びます。

## シェルスクリプティングとは？

**シェルスクリプト**は、シェルが実行できるコマンドのシーケンスを含むテキストファイルです。シェルスクリプトを使用すると以下のことができます：

- **繰り返しタスクの自動化** - 手作業を減らす
- **システム操作の管理** - バックアップ、監視、デプロイメント
- **データ処理** - テキスト操作、ファイル操作
- **カスタムツールの作成** - ワークフロー用のユーティリティを構築
- **複雑な操作のオーケストレーション** - 複数のプログラムを組み合わせる

## はじめに

### シェルの選択

```bash
# 利用可能なシェルを確認
cat /etc/shells

# 現在のシェルを確認
echo $SHELL

# bashに切り替え（デフォルトでない場合）
bash
```

### 最初のスクリプトの作成

`hello.sh`というファイルを作成します：

```bash
#!/bin/bash
# これはコメントです
echo "Hello, World!"
echo "現在の日付: $(date)"
echo "現在のユーザー: $(whoami)"
echo "現在のディレクトリ: $(pwd)"
```

### スクリプトを実行可能にする

```bash
# スクリプトを実行可能にする
chmod +x hello.sh

# スクリプトを実行
./hello.sh

# または直接bashで実行
bash hello.sh
```

### シバン行

```bash
#!/bin/bash        # 最も一般的 - bashを使用
#!/bin/sh          # POSIX準拠シェル
#!/usr/bin/env bash # PATHからbashを見つける
#!/bin/zsh         # zshシェルを使用
```

## 変数とデータ型

### 変数の宣言と使用

```bash
#!/bin/bash

# 変数の代入（=の周りにスペースを入れない）
name="John Doe"
age=30
is_student=true

# 変数の使用
echo "名前: $name"
echo "年齢: $age"
echo "学生: $is_student"

# 代替構文
echo "名前: ${name}"
echo "年齢: ${age}"
```

### 変数のスコープ

```bash
#!/bin/bash

# グローバル変数
global_var="グローバルです"

function show_variables() {
    # ローカル変数
    local local_var="ローカルです"

    echo "関数内:"
    echo "グローバル: $global_var"
    echo "ローカル: $local_var"
}

show_variables

echo "関数外:"
echo "グローバル: $global_var"
echo "ローカル: $local_var"  # これは空になります
```

### 環境変数

```bash
#!/bin/bash

# 一般的な環境変数
echo "ホームディレクトリ: $HOME"
echo "現在のユーザー: $USER"
echo "PATH: $PATH"
echo "シェル: $SHELL"

# 環境変数の設定
export MY_VAR="カスタム値"
export PATH="$PATH:/custom/path"

# 変数が設定されているか確認
if [ -z "$MY_VAR" ]; then
    echo "MY_VARは設定されていません"
else
    echo "MY_VARの値: $MY_VAR"
fi
```

### 特殊変数

```bash
#!/bin/bash

echo "スクリプト名: $0"
echo "第1引数: $1"
echo "第2引数: $2"
echo "すべての引数: $@"
echo "引数の数: $#"
echo "最後のコマンドの終了ステータス: $?"
echo "スクリプトのプロセスID: $$"
echo "最後のバックグラウンドコマンドのプロセスID: $!"
```

## 入力と出力

### ユーザー入力の読み取り

```bash
#!/bin/bash

# 基本的な入力
echo "名前を入力してください:"
read name
echo "こんにちは、$name!"

# プロンプト付き入力
read -p "年齢を入力してください: " age
echo "あなたは$age歳です"

# サイレント入力（パスワード用）
read -s -p "パスワードを入力してください: " password
echo -e "\nパスワードが入力されました！"

# タイムアウト付き入力
if read -t 5 -p "何か入力してください（5秒）: " input; then
    echo "入力: $input"
else
    echo -e "\nタイムアウトしました！"
fi
```

### コマンドライン引数

```bash
#!/bin/bash

# 引数が提供されているか確認
if [ $# -eq 0 ]; then
    echo "使用法: $0 <名前> [年齢]"
    exit 1
fi

name=$1
age=${2:-"不明"}  # 提供されていない場合のデフォルト値

echo "名前: $name"
echo "年齢: $age"

# すべての引数をループ処理
echo "すべての引数:"
for arg in "$@"; do
    echo "  - $arg"
done
```

### 出力リダイレクト

```bash
#!/bin/bash

# 標準出力のリダイレクト
echo "これは標準出力に行きます" > output.txt
echo "これはファイルに追加されます" >> output.txt

# エラーリダイレクト
ls /nonexistent 2> error.log
ls /nonexistent 2>> error.log  # 追加

# 標準出力とエラーの両方をリダイレクト
command > output.txt 2>&1
command &> output.txt  # 短縮形

# 出力を抑制
command > /dev/null 2>&1
```

## 制御構造

### 条件文

```bash
#!/bin/bash

# if-then-else
number=10

if [ $number -gt 5 ]; then
    echo "数値は5より大きいです"
elif [ $number -eq 5 ]; then
    echo "数値は5と等しいです"
else
    echo "数値は5より小さいです"
fi

# 文字列比較
name="John"

if [ "$name" = "John" ]; then
    echo "こんにちは、John!"
elif [ "$name" = "Jane" ]; then
    echo "こんにちは、Jane!"
else
    echo "こんにちは、見知らぬ人!"
fi
```

### ファイルとディレクトリのテスト

```bash
#!/bin/bash

file="test.txt"
directory="test_dir"

# ファイルテスト
if [ -f "$file" ]; then
    echo "$fileは通常ファイルです"
fi

if [ -d "$directory" ]; then
    echo "$directoryはディレクトリです"
fi

if [ -r "$file" ]; then
    echo "$fileは読み取り可能です"
fi

if [ -w "$file" ]; then
    echo "$fileは書き込み可能です"
fi

if [ -x "$file" ]; then
    echo "$fileは実行可能です"
fi

if [ -e "$file" ]; then
    echo "$fileは存在します"
fi

# 複数条件
if [ -f "$file" ] && [ -r "$file" ]; then
    echo "$fileは存在し、読み取り可能です"
fi
```

### ループ

#### Forループ

```bash
#!/bin/bash

# 数値をループ処理
for i in {1..5}; do
    echo "数値: $i"
done

# 配列をループ処理
fruits=("apple" "banana" "orange")
for fruit in "${fruits[@]}"; do
    echo "フルーツ: $fruit"
done

# ファイルをループ処理
for file in *.txt; do
    if [ -f "$file" ]; then
        echo "処理中: $file"
    fi
done

# C形式のforループ
for ((i=1; i<=5; i++)); do
    echo "カウンター: $i"
done
```

#### Whileループ

```bash
#!/bin/bash

# 基本的なwhileループ
counter=1
while [ $counter -le 5 ]; do
    echo "カウンター: $counter"
    ((counter++))
done

# ファイルを1行ずつ読み込む
while IFS= read -r line; do
    echo "行: $line"
done < "input.txt"

# breakを使用した無限ループ
while true; do
    read -p "終了するには'quit'と入力: " input
    if [ "$input" = "quit" ]; then
        break
    fi
    echo "入力: $input"
done
```

#### Untilループ

```bash
#!/bin/bash

# Untilループ（whileの反対）
counter=1
until [ $counter -gt 5 ]; do
    echo "カウンター: $counter"
    ((counter++))
done
```

### Case文

```bash
#!/bin/bash

read -p "選択肢を入力してください（1-3）: " choice

case $choice in
    1)
        echo "オプション1を選択しました"
        ;;
    2)
        echo "オプション2を選択しました"
        ;;
    3)
        echo "オプション3を選択しました"
        ;;
    *)
        echo "無効な選択です"
        ;;
esac

# パターンを使用したcase
read -p "ファイル名を入力してください: " filename

case $filename in
    *.txt)
        echo "テキストファイル"
        ;;
    *.jpg|*.jpeg|*.png)
        echo "画像ファイル"
        ;;
    *.sh)
        echo "シェルスクリプト"
        ;;
    *)
        echo "不明なファイルタイプ"
        ;;
esac
```

## 関数

### 関数の定義と使用

```bash
#!/bin/bash

# 関数定義
greet() {
    echo "こんにちは、$1!"
}

# 複数のパラメータを持つ関数
add_numbers() {
    local num1=$1
    local num2=$2
    local sum=$((num1 + num2))
    echo $sum
}

# 戻り値を持つ関数
is_even() {
    local number=$1
    if [ $((number % 2)) -eq 0 ]; then
        return 0  # 真
    else
        return 1  # 偽
    fi
}

# 関数の使用
greet "John"
result=$(add_numbers 5 3)
echo "合計: $result"

if is_even 4; then
    echo "4は偶数です"
fi
```

### 高度な関数機能

```bash
#!/bin/bash

# デフォルトパラメータを持つ関数
create_user() {
    local username=$1
    local home_dir=${2:-"/home/$username"}
    local shell=${3:-"/bin/bash"}

    echo "ユーザー作成: $username"
    echo "ホームディレクトリ: $home_dir"
    echo "シェル: $shell"
}

# 可変引数を持つ関数
print_all() {
    echo "引数の数: $#"
    for arg in "$@"; do
        echo "  - $arg"
    done
}

# 再帰関数
factorial() {
    local n=$1
    if [ $n -le 1 ]; then
        echo 1
    else
        local prev=$(factorial $((n - 1)))
        echo $((n * prev))
    fi
}

# 使用法
create_user "john"
create_user "jane" "/custom/home"
print_all "arg1" "arg2" "arg3"
echo "5の階乗: $(factorial 5)"
```

## 配列

### 配列の宣言と使用

```bash
#!/bin/bash

# 配列宣言
fruits=("apple" "banana" "orange")
numbers=(1 2 3 4 5)

# 代替宣言
declare -a colors
colors[0]="red"
colors[1]="green"
colors[2]="blue"

# 配列要素へのアクセス
echo "最初のフルーツ: ${fruits[0]}"
echo "2番目のフルーツ: ${fruits[1]}"

# すべての要素
echo "すべてのフルーツ: ${fruits[@]}"
echo "すべての数値: ${numbers[*]}"

# 配列の長さ
echo "フルーツの数: ${#fruits[@]}"

# 配列のインデックス
echo "フルーツのインデックス: ${!fruits[@]}"
```

### 配列操作

```bash
#!/bin/bash

# 要素の追加
fruits=("apple" "banana")
fruits+=("orange")
fruits[3]="grape"

# 要素の削除
unset fruits[1]  # bananaを削除

# 配列のスライス
numbers=(1 2 3 4 5 6 7 8 9 10)
echo "要素2-5: ${numbers[@]:2:4}"

# 配列をループ処理
for fruit in "${fruits[@]}"; do
    if [ -n "$fruit" ]; then  # 空でないか確認
        echo "フルーツ: $fruit"
    fi
done

# インデックス付きループ
for i in "${!fruits[@]}"; do
    echo "インデックス $i: ${fruits[i]}"
done
```

### 連想配列

```bash
#!/bin/bash

# 連想配列の宣言
declare -A person
person[name]="John Doe"
person[age]=30
person[city]="New York"

# 代替構文
declare -A colors=(
    [red]="#FF0000"
    [green]="#00FF00"
    [blue]="#0000FF"
)

# 値へのアクセス
echo "名前: ${person[name]}"
echo "年齢: ${person[age]}"

# すべてのキーと値
echo "すべてのキー: ${!person[@]}"
echo "すべての値: ${person[@]}"

# 連想配列をループ処理
for key in "${!person[@]}"; do
    echo "$key: ${person[$key]}"
done
```

## 文字列操作

### 文字列操作

```bash
#!/bin/bash

text="Hello, World!"
filename="document.txt"

# 文字列の長さ
echo "長さ: ${#text}"

# 部分文字列の抽出
echo "部分文字列: ${text:0:5}"    # "Hello"
echo "部分文字列: ${text:7}"      # "World!"

# 文字列の置換
echo "${text/World/Universe}"    # 最初の出現を置換
echo "${text//l/L}"             # すべての出現を置換

# 大文字小文字変換
echo "${text,,}"                # 小文字
echo "${text^^}"                # 大文字
echo "${text^}"                 # 最初の文字を大文字に

# パターンマッチング
echo "${filename%.txt}"         # 末尾から最短一致を削除
echo "${filename%.*}"           # 拡張子を削除
echo "${filename#*.}"           # 拡張子を取得
```

### 文字列検証

```bash
#!/bin/bash

validate_email() {
    local email=$1
    local pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"

    if [[ $email =~ $pattern ]]; then
        return 0  # 有効
    else
        return 1  # 無効
    fi
}

validate_phone() {
    local phone=$1
    local pattern="^[0-9]{3}-[0-9]{3}-[0-9]{4}$"

    if [[ $phone =~ $pattern ]]; then
        return 0
    else
        return 1
    fi
}

# 使用法
email="user@example.com"
if validate_email "$email"; then
    echo "有効なメール: $email"
else
    echo "無効なメール: $email"
fi
```

## ファイル操作

### ファイルとディレクトリの操作

```bash
#!/bin/bash

# ディレクトリの作成
mkdir -p "project/src/components"
mkdir -p "project/tests"

# ファイルの作成
touch "project/README.md"
touch "project/src/main.js"

# ファイルとディレクトリのコピー
cp "source.txt" "destination.txt"
cp -r "source_dir" "destination_dir"

# ファイルの移動/名前変更
mv "old_name.txt" "new_name.txt"
mv "file.txt" "directory/"

# ファイルとディレクトリの削除
rm "file.txt"
rm -r "directory"
rm -rf "directory"  # 強制削除

# ファイルプロパティの確認
file="test.txt"
if [ -f "$file" ]; then
    echo "ファイルサイズ: $(stat -c%s "$file") バイト"
    echo "最終更新: $(stat -c%y "$file")"
    echo "権限: $(stat -c%A "$file")"
fi
```

### ファイル処理

```bash
#!/bin/bash

# ファイルを1行ずつ読み込む
process_file() {
    local filename=$1
    local line_number=1

    while IFS= read -r line; do
        echo "行 $line_number: $line"
        ((line_number++))
    done < "$filename"
}

# 行数、単語数、文字数のカウント
count_file_stats() {
    local filename=$1

    if [ -f "$filename" ]; then
        local lines=$(wc -l < "$filename")
        local words=$(wc -w < "$filename")
        local chars=$(wc -c < "$filename")

        echo "ファイル: $filename"
        echo "行数: $lines"
        echo "単語数: $words"
        echo "文字数: $chars"
    fi
}

# ファイル内の検索と置換
search_replace() {
    local filename=$1
    local search=$2
    local replace=$3

    if [ -f "$filename" ]; then
        sed -i "s/$search/$replace/g" "$filename"
        echo "'$search'を'$replace'に置換しました（$filename内）"
    fi
}
```

## エラー処理

### 終了コードとエラー処理

```bash
#!/bin/bash

# エラー時に終了
set -e

# 未定義変数時に終了
set -u

# 実行コマンドを表示
set -x

# カスタムエラー処理
handle_error() {
    local exit_code=$1
    local line_number=$2
    echo "エラー: コマンドが終了コード$exit_codeで$line_number行目で失敗しました"
    exit $exit_code
}

# エラートラップの設定
trap 'handle_error $? $LINENO' ERR

# エラー処理付き関数
safe_copy() {
    local source=$1
    local destination=$2

    if [ ! -f "$source" ]; then
        echo "エラー: ソースファイル'$source'が存在しません"
        return 1
    fi

    if ! cp "$source" "$destination"; then
        echo "エラー: '$source'を'$destination'にコピーできませんでした"
        return 1
    fi

    echo "'$source'を'$destination'に正常にコピーしました"
    return 0
}
```

### ロギングとデバッグ

```bash
#!/bin/bash

# ロギング関数
log() {
    local level=$1
    shift
    local message="$*"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')

    echo "[$timestamp] [$level] $message" | tee -a "script.log"
}

# デバッグ関数
debug() {
    if [ "${DEBUG:-0}" = "1" ]; then
        log "DEBUG" "$*"
    fi
}

# 使用法
log "INFO" "スクリプトが開始されました"
debug "これはデバッグメッセージです"
log "ERROR" "何か問題が発生しました"
```

## 実用的な例

### システム情報スクリプト

```bash
#!/bin/bash

# システム情報収集スクリプト
system_info() {
    echo "=== システム情報 ==="
    echo "ホスト名: $(hostname)"
    echo "OS: $(uname -o)"
    echo "カーネル: $(uname -r)"
    echo "アーキテクチャ: $(uname -m)"
    echo "稼働時間: $(uptime -p)"
    echo "ロードアベレージ: $(uptime | awk -F'load average:' '{print $2}')"
    echo

    echo "=== メモリ使用量 ==="
    free -h
    echo

    echo "=== ディスク使用量 ==="
    df -h
    echo

    echo "=== ネットワークインターフェース ==="
    ip addr show | grep -E '^[0-9]+:|inet'
}

system_info
```

### バックアップスクリプト

```bash
#!/bin/bash

# ローテーション付きバックアップスクリプト
BACKUP_SOURCE="/home/user/documents"
BACKUP_DEST="/backup"
BACKUP_NAME="documents_backup_$(date +%Y%m%d_%H%M%S).tar.gz"
KEEP_DAYS=7

create_backup() {
    echo "$BACKUP_SOURCEのバックアップを作成中..."

    if [ ! -d "$BACKUP_SOURCE" ]; then
        echo "エラー: ソースディレクトリが存在しません"
        exit 1
    fi

    mkdir -p "$BACKUP_DEST"

    if tar -czf "$BACKUP_DEST/$BACKUP_NAME" -C "$(dirname "$BACKUP_SOURCE")" "$(basename "$BACKUP_SOURCE")"; then
        echo "バックアップ作成: $BACKUP_DEST/$BACKUP_NAME"
    else
        echo "エラー: バックアップ失敗"
        exit 1
    fi
}

cleanup_old_backups() {
    echo "$KEEP_DAYS日より古いバックアップをクリーンアップ中..."
    find "$BACKUP_DEST" -name "documents_backup_*.tar.gz" -mtime +$KEEP_DAYS -delete
}

# メイン実行
create_backup
cleanup_old_backups
echo "バックアップが正常に完了しました"
```

### サービス監視スクリプト

```bash
#!/bin/bash

# サービス監視スクリプト
SERVICES=("nginx" "mysql" "ssh")
EMAIL="admin@example.com"

check_service() {
    local service=$1

    if systemctl is-active --quiet "$service"; then
        return 0  # サービスは実行中
    else
        return 1  # サービスは実行されていない
    fi
}

restart_service() {
    local service=$1

    echo "$serviceの再起動を試みています..."
    if systemctl restart "$service"; then
        echo "$serviceは正常に再起動されました"
        return 0
    else
        echo "$serviceの再起動に失敗しました"
        return 1
    fi
}

send_alert() {
    local message=$1
    echo "$message" | mail -s "サービスアラート" "$EMAIL"
}

# メイン監視ループ
for service in "${SERVICES[@]}"; do
    if ! check_service "$service"; then
        echo "警告: $serviceが実行されていません"

        if restart_service "$service"; then
            send_alert "$serviceがダウンしていましたが再起動されました"
        else
            send_alert "重大: $serviceがダウンしており、再起動できませんでした"
        fi
    else
        echo "$serviceは正常に実行されています"
    fi
done
```

## ベストプラクティス

### 1. スクリプト構造

```bash
#!/bin/bash

# 説明付きスクリプトヘッダー
# 目的: このスクリプトは何か役立つことを行います
# 作者: あなたの名前
# 日付: 2024-01-01
# バージョン: 1.0

# エラー時に終了
set -euo pipefail

# 設定
readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly SCRIPT_NAME="$(basename "$0")"
readonly LOG_FILE="/var/log/${SCRIPT_NAME}.log"

# グローバル変数
declare -g DEBUG=0
declare -g VERBOSE=0

# 関数
usage() {
    cat << EOF
使用法: $SCRIPT_NAME [オプション]
オプション:
    -h, --help      このヘルプメッセージを表示
    -v, --verbose   詳細出力を有効化
    -d, --debug     デバッグモードを有効化
EOF
}

main() {
    # コマンドライン引数の解析
    while [[ $# -gt 0 ]]; do
        case $1 in
            -h|--help)
                usage
                exit 0
                ;;
            -v|--verbose)
                VERBOSE=1
                shift
                ;;
            -d|--debug)
                DEBUG=1
                shift
                ;;
            *)
                echo "不明なオプション: $1"
                usage
                exit 1
                ;;
        esac
    done

    # メインスクリプトロジックをここに記述
    echo "スクリプト実行が完了しました"
}

# メイン関数を実行
main "$@"
```

### 2. エラー処理

```bash
#!/bin/bash

# 堅牢なエラー処理
set -euo pipefail

# エラーハンドラー
error_handler() {
    local exit_code=$?
    local line_number=$1
    echo "エラー: コマンドが終了コード$exit_codeで$line_number行目で失敗しました"
    cleanup
    exit $exit_code
}

# クリーンアップ関数
cleanup() {
    echo "クリーンアップを実行中..."
    # 一時ファイルの削除など
}

# トラップの設定
trap 'error_handler $LINENO' ERR
trap cleanup EXIT

# スクリプトロジックをここに記述
```

### 3. 入力検証

```bash
#!/bin/bash

validate_input() {
    local input=$1
    local type=$2

    case $type in
        "email")
            if [[ ! $input =~ ^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$ ]]; then
                return 1
            fi
            ;;
        "number")
            if [[ ! $input =~ ^[0-9]+$ ]]; then
                return 1
            fi
            ;;
        "file")
            if [[ ! -f $input ]]; then
                return 1
            fi
            ;;
        *)
            return 1
            ;;
    esac

    return 0
}

# 使用法
read -p "メールを入力: " email
if validate_input "$email" "email"; then
    echo "有効なメール"
else
    echo "無効なメール"
    exit 1
fi
```

## 結論

Bashスクリプティングは自動化とシステム管理のための強力なツールです。重要なポイント：

1. **シンプルに始める** - 基本的なスクリプトから始めて徐々に複雑さを追加する
2. **関数を使用する** - コードを再利用可能な関数に整理する
3. **エラーを処理する** - 適切なエラー処理とロギングを実装する
4. **入力を検証する** - ユーザー入力と引数を常に検証する
5. **規約に従う** - 一貫した命名と構造を使用する
6. **徹底的にテストする** - さまざまな入力とシナリオでスクリプトをテストする
7. **コードを文書化する** - コメントと使用方法の説明を追加する

これらの基礎を身につければ、タスクを自動化し生産性を向上させる効率的で保守可能なbashスクリプトを作成できます。

## 次のステップ

bashスクリプティングの基礎をマスターした後、以下を探求しましょう：

1. **高度なテキスト処理** - sed、awk、grepパターン
2. **システム管理** - プロセス管理、cronジョブ
3. **ネットワーク操作** - API呼び出し、ファイル転送
4. **データベース操作** - MySQL、PostgreSQLスクリプティング
5. **CI/CD統合** - ビルドとデプロイメントスクリプト
6. **セキュリティプラクティス** - 安全なスクリプティング技術

シェルスクリプティングは開発者とシステム管理者にとって不可欠なスキルであり、自動化と効率的なシステム管理の基盤を提供します！