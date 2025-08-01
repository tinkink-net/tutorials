# シェルスクリプト作成のためのヒント

シェルスクリプトはオートメーションやシステム管理のための強力なツールですが、注意深く書かれていないと脆弱になる可能性があります。以下は、シェルスクリプトをより堅牢で保守しやすく、ユーザーフレンドリーにするためのベストプラクティスです。

## 1. シバン行を使用する

```bash
#!/bin/bash
```

**重要な理由**: シバン行は、スクリプトを実行するインタープリターを指定します。スクリプトがどのように呼び出されるか、またはユーザーのデフォルトシェルが何であるかに関わらず、一貫性を確保するために常に先頭に含めてください。

## 2. スクリプトのドキュメントを含める

```bash
# backup-cleanup.sh
#
# 目的: 保持ポリシーに基づいてバックアップファイルをクリーンアップする
# 使用法: ./backup-cleanup.sh [オプション]
# 作成者: あなたの名前
# 日付: 2025年1月31日
```

**重要な理由**: 良いドキュメントはスクリプトの目的、使用方法、履歴を説明します。これは他の人（そして将来のあなた自身）がスクリプトの機能と適切な使用方法を理解するのに役立ちます。

## 3. `set`オプションによるエラー処理

```bash
# コマンドが失敗した場合、即座に終了する
set -e
# 未設定の変数をエラーとして扱う
set -u
# パイプラインの戻り値は、非ゼロステータスで終了した最後のコマンドになる
set -o pipefail
```

**重要な理由**: デフォルトでは、bashはコマンドが失敗しても実行を続けます。これらの設定により、スクリプトは早く明確に失敗し、サイレントな失敗による連鎖的なエラーを防ぎます。

## 4. クリーンアップに`trap`を使用する

```bash
TEMP_FILE=$(mktemp)
trap "rm -f $TEMP_FILE" EXIT
```

**重要な理由**: `trap`コマンドは、スクリプトが終了したときに一時的なリソースが適切にクリーンアップされることを保証します。エラーで終了した場合でも同様です。これにより、一時ファイルやその他のリソースが残されることを防ぎます。

## 5. 変数を適切に宣言する

```bash
# 定数（慣例的に大文字を使用）
declare -r MAX_RETRIES=5

# 配列
declare -a FILES_TO_PROCESS=()

# 整数
declare -i COUNTER=0

# 通常の変数
VERSION="1.0.0"
```

**重要な理由**: `declare`を使用すると、変数の型と属性を明示的に定義でき、コードの保守性が向上し、微妙なバグを防ぐことができます。

## 6. ファイルを行ごとに正しく処理する

```bash
while IFS= read -r line; do
    echo "処理中: $line"
done < "$INPUT_FILE"
```

**重要な理由**: これはbashでファイルを行ごとに読み込む正しい方法です。`IFS=`を設定すると先頭/末尾の空白が保持され、`-r`フラグはバックスラッシュエスケープが解釈されるのを防ぎます。

## 7. 一時ファイルには`mktemp`を使用する

```bash
TEMP_FILE=$(mktemp)
LOG_FILE=$(mktemp -t logfile.XXXXXX)
```

**重要な理由**: `mktemp`を使用すると、一意の名前を持つ一時ファイルが作成され、ファイル名の衝突や潜在的なセキュリティ脆弱性を防ぐことができます。

## 8. デフォルト値にはパラメータ展開を使用する

```bash
# パラメータが未設定または空の場合、デフォルト値を使用
INPUT_FILE="${1:-default.txt}"

# パラメータが未設定の場合のみデフォルトを使用
LOG_LEVEL="${LOG_LEVEL-INFO}"
```

**重要な理由**: パラメータ展開はデフォルト値を扱うエレガントな方法を提供し、スクリプトをより柔軟でユーザーフレンドリーにします。

## 9. 正規表現を注意して使用する

```bash
if [[ $filename =~ ^backup-([0-9]{4})([0-9]{2})([0-9]{2})\.tar\.gz$ ]]; then
    year="${BASH_REMATCH[1]}"
    month="${BASH_REMATCH[2]}"
    day="${BASH_REMATCH[3]}"
    echo "Found backup from $year-$month-$day"
fi
```

**重要な理由**: 二重括弧`[[`を使った`=~`演算子は強力なパターンマッチングを可能にします。`BASH_REMATCH`配列にはキャプチャされたグループが含まれ、文字列の一部を簡単に抽出できます。

## 10. 詳細な出力とロギングを含める

```bash
log_info() {
    echo "[INFO] $1"
}

log_error() {
    echo "[ERROR] $1" >&2
}

log_info "バックアッププロセスを開始します"
```

**重要な理由**: 良いスクリプトは、特に元に戻せない操作について、ユーザーに何をしているかを伝えます。異なるログレベルは、日常的な情報と重大なエラーを区別するのに役立ちます。

## 11. コマンドの成功を確認する

```bash
if ! command -v aws >/dev/null 2>&1; then
    log_error "AWS CLIがインストールされていません"
    exit 1
fi

if ! cp "$SOURCE" "$DESTINATION"; then
    log_error "$SOURCEから$DESTINATIONへのコピーに失敗しました"
    exit 1
fi
```

**重要な理由**: 特に破壊的な操作を実行する前に、常にコマンドが成功したことを確認してください。

## 12. 変数を引用符で囲む

```bash
# 良い例: 単語分割とグロブを防ぐ
echo "処理中のファイル: $filename"

# 悪い例: $filenameにスペースや特殊文字が含まれていると問題が発生する可能性がある
echo 処理中のファイル: $filename
```

**重要な理由**: 単語分割とグロブの問題を防ぐために、常に変数を引用符で囲んでください。特に値にスペースや特殊文字が含まれる可能性がある場合は重要です。

## 13. 再利用可能なコードには関数を使用する

```bash
function backup_database() {
    local db_name="$1"
    local output_file="$2"

    log_info "データベース$db_nameを$output_fileにバックアップします"
    pg_dump "$db_name" > "$output_file"
    return $?
}

# 使用例
backup_database "myapp" "/tmp/myapp_backup.sql"
```

**重要な理由**: 関数はスクリプトをモジュール化し再利用可能にします。`local`変数を使用すると、グローバル名前空間の汚染を防ぎます。

## 14. コマンドライン引数を適切に処理する

```bash
function show_usage() {
    echo "使用法: $(basename "$0") [-v] [-h] [-f FILE]"
    echo "  -v: 詳細な出力を有効にする"
    echo "  -h: このヘルプメッセージを表示する"
    echo "  -f FILE: 入力ファイルを指定する"
}

VERBOSE=false
FILE=""

while getopts "vhf:" opt; do
    case ${opt} in
        v ) VERBOSE=true ;;
        h ) show_usage; exit 0 ;;
        f ) FILE=$OPTARG ;;
        * ) show_usage; exit 1 ;;
    esac
done
```

**重要な理由**: `getopts`コマンドはコマンドラインオプションを処理する標準的な方法を提供し、スクリプトをよりユーザーフレンドリーにし、Unixの慣例に準拠させます。

## 15. 入力を早期に検証する

```bash
if [[ ! -f "$INPUT_FILE" ]]; then
    log_error "入力ファイルが存在しません: $INPUT_FILE"
    exit 1
fi

if [[ ! $PORT =~ ^[0-9]+$ ]] || [[ $PORT -lt 1 ]] || [[ $PORT -gt 65535 ]]; then
    log_error "無効なポート番号: $PORT"
    exit 1
fi
```

**重要な理由**: 入力を早期に検証することで、スクリプトの後半でのエラーを防ぎ、ユーザーに意味のあるエラーメッセージを提供します。

## 16. 意味のある終了コードを使用する

```bash
# 終了コードを定義
readonly E_SUCCESS=0
readonly E_USAGE=64
readonly E_MISSING_FILE=65
readonly E_PERMISSION=66

if [[ ! -r "$INPUT_FILE" ]]; then
    log_error "入力ファイルを読み込めません: $INPUT_FILE"
    exit $E_PERMISSION
fi
```

**重要な理由**: 意味のある終了コードは、自動化システムがスクリプトが失敗した理由を理解し、適切なアクションを取るのに役立ちます。

## 17. Shellcheckを使用する

定期的にスクリプトを[ShellCheck](https://www.shellcheck.net/)で実行してください。これはシェルスクリプトの一般的な問題を特定する静的解析ツールです。

**重要な理由**: ShellCheckは、覚えておくのが難しい多くの微妙なバグを捕捉し、ベストプラクティスを提案します。

## 18. スクリプトを論理的に構造化する

スクリプトを明確な構造で整理してください：
1. シバンとドキュメント
2. 定数と設定
3. 関数定義
4. メインスクリプトロジック

**重要な理由**: 論理的な構造により、スクリプトの理解、デバッグ、修正が容易になります。

## 結論

より良いシェルスクリプトを書くことは、それらを堅牢で読みやすく、保守しやすくすることです。これらのプラクティスに従うことで、スクリプトはより信頼性が高くなり、他の人（将来のあなた自身を含む）が理解し修正しやすくなります。