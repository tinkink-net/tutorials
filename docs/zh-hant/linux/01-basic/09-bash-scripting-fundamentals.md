# Bash 脚本編程基礎

Shell 脚本是自動化任務、管理系統和創建高效工作流程的強大工具。本教程將教您 bash 脚本編程的基礎知識，從基本語法到高級技術。

## 什麼是 Shell 脚本？

**Shell 脚本**是包含一系列 shell 可以執行的命令的文本文件。Shell 脚本允許您：

- **自動化重複任務** - 減少手動工作
- **管理系統操作** - 備份、監控、部署
- **處理數據** - 文本操作、文件操作
- **創建自定義工具** - 為您的工作流程構建實用程序
- **編排複雜操作** - 組合多個程序

## 入門

### 選擇您的 Shell

```bash
# 檢查可用的 shells
cat /etc/shells

# 檢查當前 shell
echo $SHELL

# 切換到 bash（如果不是默認）
bash
```

### 創建您的第一個脚本

創建一個名為 `hello.sh` 的文件：

```bash
#!/bin/bash
# 這是一個註釋
echo "Hello, World!"
echo "Current date: $(date)"
echo "Current user: $(whoami)"
echo "Current directory: $(pwd)"
```

### 使脚本可執行

```bash
# 使脚本可執行
chmod +x hello.sh

# 運行脚本
./hello.sh

# 或直接用 bash 運行
bash hello.sh
```

### Shebang 行

```bash
#!/bin/bash        # 最常見 - 使用 bash
#!/bin/sh          # POSIX 兼容 shell
#!/usr/bin/env bash # 在 PATH 中查找 bash
#!/bin/zsh         # 使用 zsh shell
```

## 變量和數據類型

### 變量聲明和使用

```bash
#!/bin/bash

# 變量賦值（= 周圍沒有空格）
name="John Doe"
age=30
is_student=true

# 使用變量
echo "Name: $name"
echo "Age: $age"
echo "Is student: $is_student"

# 替代語法
echo "Name: ${name}"
echo "Age: ${age}"
```

### 變量作用域

```bash
#!/bin/bash

# 全局變量
global_var="I'm global"

function show_variables() {
    # 局部變量
    local local_var="I'm local"

    echo "Inside function:"
    echo "Global: $global_var"
    echo "Local: $local_var"
}

show_variables

echo "Outside function:"
echo "Global: $global_var"
echo "Local: $local_var"  # 這將為空
```

### 環境變量

```bash
#!/bin/bash

# 常見環境變量
echo "Home directory: $HOME"
echo "Current user: $USER"
echo "PATH: $PATH"
echo "Shell: $SHELL"

# 設置環境變量
export MY_VAR="Custom value"
export PATH="$PATH:/custom/path"

# 檢查變量是否設置
if [ -z "$MY_VAR" ]; then
    echo "MY_VAR is not set"
else
    echo "MY_VAR is set to: $MY_VAR"
fi
```

### 特殊變量

```bash
#!/bin/bash

echo "Script name: $0"
echo "First argument: $1"
echo "Second argument: $2"
echo "All arguments: $@"
echo "Number of arguments: $#"
echo "Exit status of last command: $?"
echo "Process ID of script: $$"
echo "Process ID of last background command: $!"
```

## 輸入和輸出

### 讀取用戶輸入

```bash
#!/bin/bash

# 基本輸入
echo "Enter your name:"
read name
echo "Hello, $name!"

# 帶提示的輸入
read -p "Enter your age: " age
echo "You are $age years old"

# 靜默輸入（用於密碼）
read -s -p "Enter password: " password
echo -e "\nPassword entered!"

# 帶超時的輸入
if read -t 5 -p "Enter something (5 seconds): " input; then
    echo "You entered: $input"
else
    echo -e "\nTimeout reached!"
fi
```

### 命令行參數

```bash
#!/bin/bash

# 檢查是否提供了參數
if [ $# -eq 0 ]; then
    echo "Usage: $0 <name> [age]"
    exit 1
fi

name=$1
age=${2:-"Unknown"}  # 如果未提供則使用默認值

echo "Name: $name"
echo "Age: $age"

# 循環遍歷所有參數
echo "All arguments:"
for arg in "$@"; do
    echo "  - $arg"
done
```

### 輸出重定向

```bash
#!/bin/bash

# 標準輸出重定向
echo "This goes to stdout" > output.txt
echo "This appends to file" >> output.txt

# 錯誤重定向
ls /nonexistent 2> error.log
ls /nonexistent 2>> error.log  # 追加

# 同時重定向 stdout 和 stderr
command > output.txt 2>&1
command &> output.txt  # 簡寫

# 抑制輸出
command > /dev/null 2>&1
```

## 控制結構

### 條件語句

```bash
#!/bin/bash

# if-then-else
number=10

if [ $number -gt 5 ]; then
    echo "Number is greater than 5"
elif [ $number -eq 5 ]; then
    echo "Number is equal to 5"
else
    echo "Number is less than 5"
fi

# 字符串比較
name="John"

if [ "$name" = "John" ]; then
    echo "Hello, John!"
elif [ "$name" = "Jane" ]; then
    echo "Hello, Jane!"
else
    echo "Hello, stranger!"
fi
```

### 文件和目錄測試

```bash
#!/bin/bash

file="test.txt"
directory="test_dir"

# 文件測試
if [ -f "$file" ]; then
    echo "$file is a regular file"
fi

if [ -d "$directory" ]; then
    echo "$directory is a directory"
fi

if [ -r "$file" ]; then
    echo "$file is readable"
fi

if [ -w "$file" ]; then
    echo "$file is writable"
fi

if [ -x "$file" ]; then
    echo "$file is executable"
fi

if [ -e "$file" ]; then
    echo "$file exists"
fi

# 多個條件
if [ -f "$file" ] && [ -r "$file" ]; then
    echo "$file exists and is readable"
fi
```

### 循環

#### For 循環

```bash
#!/bin/bash

# 數字循環
for i in {1..5}; do
    echo "Number: $i"
done

# 數組循環
fruits=("apple" "banana" "orange")
for fruit in "${fruits[@]}"; do
    echo "Fruit: $fruit"
done

# 文件循環
for file in *.txt; do
    if [ -f "$file" ]; then
        echo "Processing: $file"
    fi
done

# C 風格 for 循環
for ((i=1; i<=5; i++)); do
    echo "Counter: $i"
done
```

#### While 循環

```bash
#!/bin/bash

# 基本 while 循環
counter=1
while [ $counter -le 5 ]; do
    echo "Counter: $counter"
    ((counter++))
done

# 逐行讀取文件
while IFS= read -r line; do
    echo "Line: $line"
done < "input.txt"

# 帶 break 的無限循環
while true; do
    read -p "Enter 'quit' to exit: " input
    if [ "$input" = "quit" ]; then
        break
    fi
    echo "You entered: $input"
done
```

#### Until 循環

```bash
#!/bin/bash

# Until 循環（與 while 相反）
counter=1
until [ $counter -gt 5 ]; do
    echo "Counter: $counter"
    ((counter++))
done
```

### Case 語句

```bash
#!/bin/bash

read -p "Enter a choice (1-3): " choice

case $choice in
    1)
        echo "You chose option 1"
        ;;
    2)
        echo "You chose option 2"
        ;;
    3)
        echo "You chose option 3"
        ;;
    *)
        echo "Invalid choice"
        ;;
esac

# 帶模式的 case
read -p "Enter a file name: " filename

case $filename in
    *.txt)
        echo "Text file"
        ;;
    *.jpg|*.jpeg|*.png)
        echo "Image file"
        ;;
    *.sh)
        echo "Shell script"
        ;;
    *)
        echo "Unknown file type"
        ;;
esac
```

## 函數

### 函數定義和使用

```bash
#!/bin/bash

# 函數定義
greet() {
    echo "Hello, $1!"
}

# 帶多個參數的函數
add_numbers() {
    local num1=$1
    local num2=$2
    local sum=$((num1 + num2))
    echo $sum
}

# 帶返回值的函數
is_even() {
    local number=$1
    if [ $((number % 2)) -eq 0 ]; then
        return 0  # True
    else
        return 1  # False
    fi
}

# 使用函數
greet "John"
result=$(add_numbers 5 3)
echo "Sum: $result"

if is_even 4; then
    echo "4 is even"
fi
```

### 高級函數功能

```bash
#!/bin/bash

# 帶默認參數的函數
create_user() {
    local username=$1
    local home_dir=${2:-"/home/$username"}
    local shell=${3:-"/bin/bash"}

    echo "Creating user: $username"
    echo "Home directory: $home_dir"
    echo "Shell: $shell"
}

# 帶可變參數的函數
print_all() {
    echo "Number of arguments: $#"
    for arg in "$@"; do
        echo "  - $arg"
    done
}

# 遞歸函數
factorial() {
    local n=$1
    if [ $n -le 1 ]; then
        echo 1
    else
        local prev=$(factorial $((n - 1)))
        echo $((n * prev))
    fi
}

# 使用
create_user "john"
create_user "jane" "/custom/home"
print_all "arg1" "arg2" "arg3"
echo "Factorial of 5: $(factorial 5)"
```

## 數組

### 數組聲明和使用

```bash
#!/bin/bash

# 數組聲明
fruits=("apple" "banana" "orange")
numbers=(1 2 3 4 5)

# 替代聲明
declare -a colors
colors[0]="red"
colors[1]="green"
colors[2]="blue"

# 訪問數組元素
echo "First fruit: ${fruits[0]}"
echo "Second fruit: ${fruits[1]}"

# 所有元素
echo "All fruits: ${fruits[@]}"
echo "All numbers: ${numbers[*]}"

# 數組長度
echo "Number of fruits: ${#fruits[@]}"

# 數組索引
echo "Fruit indices: ${!fruits[@]}"
```

### 數組操作

```bash
#!/bin/bash

# 添加元素
fruits=("apple" "banana")
fruits+=("orange")
fruits[3]="grape"

# 刪除元素
unset fruits[1]  # 刪除 banana

# 數組切片
numbers=(1 2 3 4 5 6 7 8 9 10)
echo "Elements 2-5: ${numbers[@]:2:4}"

# 循環遍歷數組
for fruit in "${fruits[@]}"; do
    if [ -n "$fruit" ]; then  # 檢查是否不為空
        echo "Fruit: $fruit"
    fi
done

# 帶索引的循環
for i in "${!fruits[@]}"; do
    echo "Index $i: ${fruits[i]}"
done
```

### 關聯數組

```bash
#!/bin/bash

# 聲明關聯數組
declare -A person
person[name]="John Doe"
person[age]=30
person[city]="New York"

# 替代語法
declare -A colors=(
    [red]="#FF0000"
    [green]="#00FF00"
    [blue]="#0000FF"
)

# 訪問值
echo "Name: ${person[name]}"
echo "Age: ${person[age]}"

# 所有鍵和值
echo "All keys: ${!person[@]}"
echo "All values: ${person[@]}"

# 循環遍歷關聯數組
for key in "${!person[@]}"; do
    echo "$key: ${person[$key]}"
done
```

## 字符串操作

### 字符串操作

```bash
#!/bin/bash

text="Hello, World!"
filename="document.txt"

# 字符串長度
echo "Length: ${#text}"

# 子字符串提取
echo "Substring: ${text:0:5}"    # "Hello"
echo "Substring: ${text:7}"      # "World!"

# 字符串替換
echo "${text/World/Universe}"    # 替換第一個匹配
echo "${text//l/L}"             # 替換所有匹配

# 大小寫轉換
echo "${text,,}"                # 小寫
echo "${text^^}"                # 大寫
echo "${text^}"                 # 首字母大寫

# 模式匹配
echo "${filename%.txt}"         # 從末尾刪除最短匹配
echo "${filename%.*}"           # 刪除擴展名
echo "${filename#*.}"           # 獲取擴展名
```

### 字符串驗證

```bash
#!/bin/bash

validate_email() {
    local email=$1
    local pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"

    if [[ $email =~ $pattern ]]; then
        return 0  # Valid
    else
        return 1  # Invalid
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

# 使用
email="user@example.com"
if validate_email "$email"; then
    echo "Valid email: $email"
else
    echo "Invalid email: $email"
fi
```

## 文件操作

### 文件和目錄操作

```bash
#!/bin/bash

# 創建目錄
mkdir -p "project/src/components"
mkdir -p "project/tests"

# 創建文件
touch "project/README.md"
touch "project/src/main.js"

# 複製文件和目錄
cp "source.txt" "destination.txt"
cp -r "source_dir" "destination_dir"

# 移動/重命名文件
mv "old_name.txt" "new_name.txt"
mv "file.txt" "directory/"

# 刪除文件和目錄
rm "file.txt"
rm -r "directory"
rm -rf "directory"  # 強制刪除

# 檢查文件屬性
file="test.txt"
if [ -f "$file" ]; then
    echo "File size: $(stat -c%s "$file") bytes"
    echo "Last modified: $(stat -c%y "$file")"
    echo "Permissions: $(stat -c%A "$file")"
fi
```

### 文件處理

```bash
#!/bin/bash

# 逐行讀取文件
process_file() {
    local filename=$1
    local line_number=1

    while IFS= read -r line; do
        echo "Line $line_number: $line"
        ((line_number++))
    done < "$filename"
}

# 統計行數、單詞數和字符數
count_file_stats() {
    local filename=$1

    if [ -f "$filename" ]; then
        local lines=$(wc -l < "$filename")
        local words=$(wc -w < "$filename")
        local chars=$(wc -c < "$filename")

        echo "File: $filename"
        echo "Lines: $lines"
        echo "Words: $words"
        echo "Characters: $chars"
    fi
}

# 在文件中搜索和替換
search_replace() {
    local filename=$1
    local search=$2
    local replace=$3

    if [ -f "$filename" ]; then
        sed -i "s/$search/$replace/g" "$filename"
        echo "Replaced '$search' with '$replace' in $filename"
    fi
}
```

## 錯誤處理

### 退出代碼和錯誤處理

```bash
#!/bin/bash

# 任何錯誤時退出
set -e

# 未定義變量時退出
set -u

# 顯示正在執行的命令
set -x

# 自定義錯誤處理
handle_error() {
    local exit_code=$1
    local line_number=$2
    echo "Error: Command failed with exit code $exit_code at line $line_number"
    exit $exit_code
}

# 設置錯誤陷阱
trap 'handle_error $? $LINENO' ERR

# 帶錯誤處理的函數
safe_copy() {
    local source=$1
    local destination=$2

    if [ ! -f "$source" ]; then
        echo "Error: Source file '$source' does not exist"
        return 1
    fi

    if ! cp "$source" "$destination"; then
        echo "Error: Failed to copy '$source' to '$destination'"
        return 1
    fi

    echo "Successfully copied '$source' to '$destination'"
    return 0
}
```

### 日誌記錄和調試

```bash
#!/bin/bash

# 日誌記錄函數
log() {
    local level=$1
    shift
    local message="$*"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')

    echo "[$timestamp] [$level] $message" | tee -a "script.log"
}

# 調試函數
debug() {
    if [ "${DEBUG:-0}" = "1" ]; then
        log "DEBUG" "$*"
    fi
}

# 使用
log "INFO" "Script started"
debug "This is a debug message"
log "ERROR" "Something went wrong"
```

## 實際示例

### 系統信息脚本

```bash
#!/bin/bash

# 系統信息收集脚本
system_info() {
    echo "=== System Information ==="
    echo "Hostname: $(hostname)"
    echo "OS: $(uname -o)"
    echo "Kernel: $(uname -r)"
    echo "Architecture: $(uname -m)"
    echo "Uptime: $(uptime -p)"
    echo "Load Average: $(uptime | awk -F'load average:' '{print $2}')"
    echo

    echo "=== Memory Usage ==="
    free -h
    echo

    echo "=== Disk Usage ==="
    df -h
    echo

    echo "=== Network Interfaces ==="
    ip addr show | grep -E '^[0-9]+:|inet'
}

system_info
```

### 備份脚本

```bash
#!/bin/bash

# 帶輪轉的備份脚本
BACKUP_SOURCE="/home/user/documents"
BACKUP_DEST="/backup"
BACKUP_NAME="documents_backup_$(date +%Y%m%d_%H%M%S).tar.gz"
KEEP_DAYS=7

create_backup() {
    echo "Creating backup of $BACKUP_SOURCE..."

    if [ ! -d "$BACKUP_SOURCE" ]; then
        echo "Error: Source directory does not exist"
        exit 1
    fi

    mkdir -p "$BACKUP_DEST"

    if tar -czf "$BACKUP_DEST/$BACKUP_NAME" -C "$(dirname "$BACKUP_SOURCE")" "$(basename "$BACKUP_SOURCE")"; then
        echo "Backup created: $BACKUP_DEST/$BACKUP_NAME"
    else
        echo "Error: Backup failed"
        exit 1
    fi
}

cleanup_old_backups() {
    echo "Cleaning up backups older than $KEEP_DAYS days..."
    find "$BACKUP_DEST" -name "documents_backup_*.tar.gz" -mtime +$KEEP_DAYS -delete
}

# 主執行
create_backup
cleanup_old_backups
echo "Backup completed successfully"
```

### 服務監控脚本

```bash
#!/bin/bash

# 服務監控脚本
SERVICES=("nginx" "mysql" "ssh")
EMAIL="admin@example.com"

check_service() {
    local service=$1

    if systemctl is-active --quiet "$service"; then
        return 0  # 服務正在運行
    else
        return 1  # 服務未運行
    fi
}

restart_service() {
    local service=$1

    echo "Attempting to restart $service..."
    if systemctl restart "$service"; then
        echo "$service restarted successfully"
        return 0
    else
        echo "Failed to restart $service"
        return 1
    fi
}

send_alert() {
    local message=$1
    echo "$message" | mail -s "Service Alert" "$EMAIL"
}

# 主監控循環
for service in "${SERVICES[@]}"; do
    if ! check_service "$service"; then
        echo "Warning: $service is not running"

        if restart_service "$service"; then
            send_alert "$service was down but has been restarted"
        else
            send_alert "Critical: $service is down and could not be restarted"
        fi
    else
        echo "$service is running normally"
    fi
done
```

## 最佳實踐

### 1. 脚本結構

```bash
#!/bin/bash

# 帶描述的脚本頭部
# Purpose: This script does something useful
# Author: Your Name
# Date: 2024-01-01
# Version: 1.0

# 錯誤時退出
set -euo pipefail

# 配置
readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly SCRIPT_NAME="$(basename "$0")"
readonly LOG_FILE="/var/log/${SCRIPT_NAME}.log"

# 全局變量
declare -g DEBUG=0
declare -g VERBOSE=0

# 函數
usage() {
    cat << EOF
Usage: $SCRIPT_NAME [OPTIONS]
Options:
    -h, --help      Show this help message
    -v, --verbose   Enable verbose output
    -d, --debug     Enable debug mode
EOF
}

main() {
    # 解析命令行參數
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
                echo "Unknown option: $1"
                usage
                exit 1
                ;;
        esac
    done

    # 主脚本邏輯在這裡
    echo "Script execution completed"
}

# 執行主函數
main "$@"
```

### 2. 錯誤處理

```bash
#!/bin/bash

# 健壯的錯誤處理
set -euo pipefail

# 錯誤處理器
error_handler() {
    local exit_code=$?
    local line_number=$1
    echo "Error: Command failed with exit code $exit_code at line $line_number"
    cleanup
    exit $exit_code
}

# 清理函數
cleanup() {
    echo "Performing cleanup..."
    # 刪除臨時文件等
}

# 設置陷阱
trap 'error_handler $LINENO' ERR
trap cleanup EXIT

# 您的脚本邏輯在這裡
```

### 3. 輸入驗證

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

# 使用
read -p "Enter email: " email
if validate_input "$email" "email"; then
    echo "Valid email"
else
    echo "Invalid email"
    exit 1
fi
```

## 結論

Bash 脚本編程是自動化和系統管理的強大工具。主要要點：

1. **從簡單開始** - 從基本脚本開始，逐漸增加複雜性
2. **使用函數** - 將代碼組織成可重用的函數
3. **處理錯誤** - 實現適當的錯誤處理和日誌記錄
4. **驗證輸入** - 始終驗證用戶輸入和參數
5. **遵循約定** - 使用一致的命名和結構
6. **徹底測試** - 用各種輸入和場景測試脚本
7. **記錄代碼** - 添加註釋和使用說明

通過這些基礎知識，您可以創建高效、可維護的 bash 脚本來自動化任務並提高生產力。

## 下一步

掌握 bash 脚本基礎後，探索：

1. **高級文本處理** - sed、awk、grep 模式
2. **系統管理** - 進程管理、cron 作業
3. **網絡操作** - API 調用、文件傳輸
4. **數據庫操作** - MySQL、PostgreSQL 脚本
5. **CI/CD 集成** - 構建和部署脚本
6. **安全實踐** - 安全脚本技術

Shell 脚本是開發人員和系統管理員的必備技能，為自動化和高效系統管理提供基礎！