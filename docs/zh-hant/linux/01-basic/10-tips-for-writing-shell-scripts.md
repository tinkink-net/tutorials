# 編寫更好 Shell 腳本的技巧

Shell 腳本是自動化和系統管理的強大工具，但如果編寫不當，它們可能會很脆弱。以下是一些最佳實踐，可以使您的 shell 腳本更加健壯、可維護和用戶友好。

## 1. 使用 Shebang 行

```bash
#!/bin/bash
```

**為什麼重要**：Shebang 行指定應該執行腳本的解釋器。始終在頂部包含它，以確保一致性，無論腳本如何調用或用戶的默認 shell 是什麼。

## 2. 包含腳本文檔

```bash
# backup-cleanup.sh
#
# Purpose: Clean up backup files based on retention policy
# Usage: ./backup-cleanup.sh [options]
# Author: Your Name
# Date: January 31, 2025
```

**為什麼重要**：良好的文檔解釋了腳本的目的、用法和歷史。這有助於其他人（和您未來的自己）理解腳本的作用以及如何正確使用它。

## 3. 使用 `set` 選項進行錯誤處理

```bash
# 如果命令失敗立即退出
set -e
# 將未設置的變量視為錯誤
set -u
# 管道的返回值是最後一個以非零狀態退出的命令
set -o pipefail
```

**為什麼重要**：默認情況下，bash 即使在命令失敗後也會繼續執行。這些設置使您的腳本快速失敗且大聲失敗，防止靜默失敗導致的級聯錯誤。

## 4. 使用 `trap` 進行清理

```bash
TEMP_FILE=$(mktemp)
trap "rm -f $TEMP_FILE" EXIT
```

**為什麼重要**：`trap` 命令確保在腳本退出時正確清理臨時資源，即使由於錯誤而退出。這防止留下臨時文件或其他資源。

## 5. 正確聲明變量

```bash
# 常量（按約定使用大寫）
declare -r MAX_RETRIES=5

# 數組
declare -a FILES_TO_PROCESS=()

# 整數
declare -i COUNTER=0

# 普通變量
VERSION="1.0.0"
```

**為什麼重要**：使用 `declare` 顯式定義變量類型和屬性，使您的代碼更易維護並防止細微的錯誤。

## 6. 正確逐行處理文件

```bash
while IFS= read -r line; do
    echo "Processing: $line"
done < "$INPUT_FILE"
```

**為什麼重要**：這是在 bash 中逐行讀取文件的正確方法。設置 `IFS=` 保留前導/尾隨空白，`-r` 標誌防止反斜杠轉義被解釋。

## 7. 使用 `mktemp` 創建臨時文件

```bash
TEMP_FILE=$(mktemp)
LOG_FILE=$(mktemp -t logfile.XXXXXX)
```

**為什麼重要**：使用 `mktemp` 創建具有唯一名稱的臨時文件，防止文件名衝突和潛在的安全漏洞。

## 8. 使用參數擴展設置默認值

```bash
# 如果參數未設置或為空則使用默認值
INPUT_FILE="${1:-default.txt}"

# 僅在參數未設置時使用默認值
LOG_LEVEL="${LOG_LEVEL-INFO}"
```

**為什麼重要**：參數擴展提供了處理默認值的優雅方式，使腳本更加靈活和用戶友好。

## 9. 謹慎使用正則表達式

```bash
if [[ $filename =~ ^backup-([0-9]{4})([0-9]{2})([0-9]{2})\.tar\.gz$ ]]; then
    year="${BASH_REMATCH[1]}"
    month="${BASH_REMATCH[2]}"
    day="${BASH_REMATCH[3]}"
    echo "Found backup from $year-$month-$day"
fi
```

**為什麼重要**：帶有雙括號 `[[` 的 `=~` 操作符允許強大的模式匹配。`BASH_REMATCH` 數組包含捕獲的組，使從字符串中提取部分變得容易。

## 10. 包含詳細輸出和日誌記錄

```bash
log_info() {
    echo "[INFO] $1"
}

log_error() {
    echo "[ERROR] $1" >&2
}

log_info "Starting backup process"
```

**為什麼重要**：良好的腳本告訴用戶它們在做什麼，特別是對於無法撤銷的操作。不同的日誌級別有助於區分常規信息和關鍵錯誤。

## 11. 檢查命令成功

```bash
if ! command -v aws >/dev/null 2>&1; then
    log_error "AWS CLI is not installed"
    exit 1
fi

if ! cp "$SOURCE" "$DESTINATION"; then
    log_error "Failed to copy $SOURCE to $DESTINATION"
    exit 1
fi
```

**為什麼重要**：在繼續之前始終檢查命令是否成功，特別是在執行破壞性操作之前。

## 12. 引用您的變量

```bash
# 好：防止單詞分割和通配符展開
echo "Processing file: $filename"

# 壞：如果 $filename 包含空格或特殊字符可能會破壞
echo Processing file: $filename
```

**為什麼重要**：始終引用變量以防止單詞分割和通配符展開問題，特別是當值可能包含空格或特殊字符時。

## 13. 使用函數進行可重用代碼

```bash
function backup_database() {
    local db_name="$1"
    local output_file="$2"

    log_info "Backing up database $db_name to $output_file"
    pg_dump "$db_name" > "$output_file"
    return $?
}

# 使用
backup_database "myapp" "/tmp/myapp_backup.sql"
```

**為什麼重要**：函數使您的腳本模塊化和可重用。使用 `local` 變量防止污染全局命名空間。

## 14. 正確處理命令行參數

```bash
function show_usage() {
    echo "Usage: $(basename "$0") [-v] [-h] [-f FILE]"
    echo "  -v: Enable verbose output"
    echo "  -h: Show this help message"
    echo "  -f FILE: Specify input file"
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

**為什麼重要**：`getopts` 命令提供了處理命令行選項的標準方式，使您的腳本更加用戶友好並符合 Unix 約定。

## 15. 儘早驗證輸入

```bash
if [[ ! -f "$INPUT_FILE" ]]; then
    log_error "Input file does not exist: $INPUT_FILE"
    exit 1
fi

if [[ ! $PORT =~ ^[0-9]+$ ]] || [[ $PORT -lt 1 ]] || [[ $PORT -gt 65535 ]]; then
    log_error "Invalid port number: $PORT"
    exit 1
fi
```

**為什麼重要**：儘早驗證輸入可以防止腳本後期出現錯誤，並為用戶提供有意義的錯誤消息。

## 16. 使用有意義的退出代碼

```bash
# 定義退出代碼
readonly E_SUCCESS=0
readonly E_USAGE=64
readonly E_MISSING_FILE=65
readonly E_PERMISSION=66

if [[ ! -r "$INPUT_FILE" ]]; then
    log_error "Cannot read input file: $INPUT_FILE"
    exit $E_PERMISSION
fi
```

**為什麼重要**：有意義的退出代碼幫助自動化系統理解腳本失敗的原因並採取適當的行動。

## 17. 使用 Shellcheck

定期通過 [ShellCheck](https://www.shellcheck.net/) 運行您的腳本，這是一個識別 shell 腳本中常見問題的靜態分析工具。

**為什麼重要**：ShellCheck 捕獲許多細微的錯誤，並建議可能難以記住的最佳實踐。

## 18. 邏輯地構建您的腳本

按清晰的結構組織您的腳本：
1. Shebang 和文檔
2. 常量和配置
3. 函數定義
4. 主腳本邏輯

**為什麼重要**：邏輯結構使腳本更容易理解、調試和修改。

## 結論

編寫更好的 shell 腳本是關於使它們健壯、可讀和可維護。通過遵循這些實踐，您的腳本將更加可靠，其他人（包括您未來的自己）更容易理解和修改。