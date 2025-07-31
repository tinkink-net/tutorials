# Bash 脚本编程基础

Shell 脚本是自动化任务、管理系统和创建高效工作流程的强大工具。本教程将教您 bash 脚本编程的基础知识，从基本语法到高级技术。

## 什么是 Shell 脚本？

**Shell 脚本**是包含一系列 shell 可以执行的命令的文本文件。Shell 脚本允许您：

- **自动化重复任务** - 减少手动工作
- **管理系统操作** - 备份、监控、部署
- **处理数据** - 文本操作、文件操作
- **创建自定义工具** - 为您的工作流程构建实用程序
- **编排复杂操作** - 组合多个程序

## 入门

### 选择您的 Shell

```bash
# 检查可用的 shells
cat /etc/shells

# 检查当前 shell
echo $SHELL

# 切换到 bash（如果不是默认）
bash
```

### 创建您的第一个脚本

创建一个名为 `hello.sh` 的文件：

```bash
#!/bin/bash
# 这是一个注释
echo "Hello, World!"
echo "Current date: $(date)"
echo "Current user: $(whoami)"
echo "Current directory: $(pwd)"
```

### 使脚本可执行

```bash
# 使脚本可执行
chmod +x hello.sh

# 运行脚本
./hello.sh

# 或直接用 bash 运行
bash hello.sh
```

### Shebang 行

```bash
#!/bin/bash        # 最常见 - 使用 bash
#!/bin/sh          # POSIX 兼容 shell
#!/usr/bin/env bash # 在 PATH 中查找 bash
#!/bin/zsh         # 使用 zsh shell
```

## 变量和数据类型

### 变量声明和使用

```bash
#!/bin/bash

# 变量赋值（= 周围没有空格）
name="John Doe"
age=30
is_student=true

# 使用变量
echo "Name: $name"
echo "Age: $age"
echo "Is student: $is_student"

# 替代语法
echo "Name: ${name}"
echo "Age: ${age}"
```

### 变量作用域

```bash
#!/bin/bash

# 全局变量
global_var="I'm global"

function show_variables() {
    # 局部变量
    local local_var="I'm local"

    echo "Inside function:"
    echo "Global: $global_var"
    echo "Local: $local_var"
}

show_variables

echo "Outside function:"
echo "Global: $global_var"
echo "Local: $local_var"  # 这将为空
```

### 环境变量

```bash
#!/bin/bash

# 常见环境变量
echo "Home directory: $HOME"
echo "Current user: $USER"
echo "PATH: $PATH"
echo "Shell: $SHELL"

# 设置环境变量
export MY_VAR="Custom value"
export PATH="$PATH:/custom/path"

# 检查变量是否设置
if [ -z "$MY_VAR" ]; then
    echo "MY_VAR is not set"
else
    echo "MY_VAR is set to: $MY_VAR"
fi
```

### 特殊变量

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

## 输入和输出

### 读取用户输入

```bash
#!/bin/bash

# 基本输入
echo "Enter your name:"
read name
echo "Hello, $name!"

# 带提示的输入
read -p "Enter your age: " age
echo "You are $age years old"

# 静默输入（用于密码）
read -s -p "Enter password: " password
echo -e "\nPassword entered!"

# 带超时的输入
if read -t 5 -p "Enter something (5 seconds): " input; then
    echo "You entered: $input"
else
    echo -e "\nTimeout reached!"
fi
```

### 命令行参数

```bash
#!/bin/bash

# 检查是否提供了参数
if [ $# -eq 0 ]; then
    echo "Usage: $0 <name> [age]"
    exit 1
fi

name=$1
age=${2:-"Unknown"}  # 如果未提供则使用默认值

echo "Name: $name"
echo "Age: $age"

# 循环遍历所有参数
echo "All arguments:"
for arg in "$@"; do
    echo "  - $arg"
done
```

### 输出重定向

```bash
#!/bin/bash

# 标准输出重定向
echo "This goes to stdout" > output.txt
echo "This appends to file" >> output.txt

# 错误重定向
ls /nonexistent 2> error.log
ls /nonexistent 2>> error.log  # 追加

# 同时重定向 stdout 和 stderr
command > output.txt 2>&1
command &> output.txt  # 简写

# 抑制输出
command > /dev/null 2>&1
```

## 控制结构

### 条件语句

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

# 字符串比较
name="John"

if [ "$name" = "John" ]; then
    echo "Hello, John!"
elif [ "$name" = "Jane" ]; then
    echo "Hello, Jane!"
else
    echo "Hello, stranger!"
fi
```

### 文件和目录测试

```bash
#!/bin/bash

file="test.txt"
directory="test_dir"

# 文件测试
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

# 多个条件
if [ -f "$file" ] && [ -r "$file" ]; then
    echo "$file exists and is readable"
fi
```

### 循环

#### For 循环

```bash
#!/bin/bash

# 数字循环
for i in {1..5}; do
    echo "Number: $i"
done

# 数组循环
fruits=("apple" "banana" "orange")
for fruit in "${fruits[@]}"; do
    echo "Fruit: $fruit"
done

# 文件循环
for file in *.txt; do
    if [ -f "$file" ]; then
        echo "Processing: $file"
    fi
done

# C 风格 for 循环
for ((i=1; i<=5; i++)); do
    echo "Counter: $i"
done
```

#### While 循环

```bash
#!/bin/bash

# 基本 while 循环
counter=1
while [ $counter -le 5 ]; do
    echo "Counter: $counter"
    ((counter++))
done

# 逐行读取文件
while IFS= read -r line; do
    echo "Line: $line"
done < "input.txt"

# 带 break 的无限循环
while true; do
    read -p "Enter 'quit' to exit: " input
    if [ "$input" = "quit" ]; then
        break
    fi
    echo "You entered: $input"
done
```

#### Until 循环

```bash
#!/bin/bash

# Until 循环（与 while 相反）
counter=1
until [ $counter -gt 5 ]; do
    echo "Counter: $counter"
    ((counter++))
done
```

### Case 语句

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

# 带模式的 case
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

## 函数

### 函数定义和使用

```bash
#!/bin/bash

# 函数定义
greet() {
    echo "Hello, $1!"
}

# 带多个参数的函数
add_numbers() {
    local num1=$1
    local num2=$2
    local sum=$((num1 + num2))
    echo $sum
}

# 带返回值的函数
is_even() {
    local number=$1
    if [ $((number % 2)) -eq 0 ]; then
        return 0  # True
    else
        return 1  # False
    fi
}

# 使用函数
greet "John"
result=$(add_numbers 5 3)
echo "Sum: $result"

if is_even 4; then
    echo "4 is even"
fi
```

### 高级函数功能

```bash
#!/bin/bash

# 带默认参数的函数
create_user() {
    local username=$1
    local home_dir=${2:-"/home/$username"}
    local shell=${3:-"/bin/bash"}

    echo "Creating user: $username"
    echo "Home directory: $home_dir"
    echo "Shell: $shell"
}

# 带可变参数的函数
print_all() {
    echo "Number of arguments: $#"
    for arg in "$@"; do
        echo "  - $arg"
    done
}

# 递归函数
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

## 数组

### 数组声明和使用

```bash
#!/bin/bash

# 数组声明
fruits=("apple" "banana" "orange")
numbers=(1 2 3 4 5)

# 替代声明
declare -a colors
colors[0]="red"
colors[1]="green"
colors[2]="blue"

# 访问数组元素
echo "First fruit: ${fruits[0]}"
echo "Second fruit: ${fruits[1]}"

# 所有元素
echo "All fruits: ${fruits[@]}"
echo "All numbers: ${numbers[*]}"

# 数组长度
echo "Number of fruits: ${#fruits[@]}"

# 数组索引
echo "Fruit indices: ${!fruits[@]}"
```

### 数组操作

```bash
#!/bin/bash

# 添加元素
fruits=("apple" "banana")
fruits+=("orange")
fruits[3]="grape"

# 删除元素
unset fruits[1]  # 删除 banana

# 数组切片
numbers=(1 2 3 4 5 6 7 8 9 10)
echo "Elements 2-5: ${numbers[@]:2:4}"

# 循环遍历数组
for fruit in "${fruits[@]}"; do
    if [ -n "$fruit" ]; then  # 检查是否不为空
        echo "Fruit: $fruit"
    fi
done

# 带索引的循环
for i in "${!fruits[@]}"; do
    echo "Index $i: ${fruits[i]}"
done
```

### 关联数组

```bash
#!/bin/bash

# 声明关联数组
declare -A person
person[name]="John Doe"
person[age]=30
person[city]="New York"

# 替代语法
declare -A colors=(
    [red]="#FF0000"
    [green]="#00FF00"
    [blue]="#0000FF"
)

# 访问值
echo "Name: ${person[name]}"
echo "Age: ${person[age]}"

# 所有键和值
echo "All keys: ${!person[@]}"
echo "All values: ${person[@]}"

# 循环遍历关联数组
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

# 字符串长度
echo "Length: ${#text}"

# 子字符串提取
echo "Substring: ${text:0:5}"    # "Hello"
echo "Substring: ${text:7}"      # "World!"

# 字符串替换
echo "${text/World/Universe}"    # 替换第一个匹配
echo "${text//l/L}"             # 替换所有匹配

# 大小写转换
echo "${text,,}"                # 小写
echo "${text^^}"                # 大写
echo "${text^}"                 # 首字母大写

# 模式匹配
echo "${filename%.txt}"         # 从末尾删除最短匹配
echo "${filename%.*}"           # 删除扩展名
echo "${filename#*.}"           # 获取扩展名
```

### 字符串验证

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

### 文件和目录操作

```bash
#!/bin/bash

# 创建目录
mkdir -p "project/src/components"
mkdir -p "project/tests"

# 创建文件
touch "project/README.md"
touch "project/src/main.js"

# 复制文件和目录
cp "source.txt" "destination.txt"
cp -r "source_dir" "destination_dir"

# 移动/重命名文件
mv "old_name.txt" "new_name.txt"
mv "file.txt" "directory/"

# 删除文件和目录
rm "file.txt"
rm -r "directory"
rm -rf "directory"  # 强制删除

# 检查文件属性
file="test.txt"
if [ -f "$file" ]; then
    echo "File size: $(stat -c%s "$file") bytes"
    echo "Last modified: $(stat -c%y "$file")"
    echo "Permissions: $(stat -c%A "$file")"
fi
```

### 文件处理

```bash
#!/bin/bash

# 逐行读取文件
process_file() {
    local filename=$1
    local line_number=1

    while IFS= read -r line; do
        echo "Line $line_number: $line"
        ((line_number++))
    done < "$filename"
}

# 统计行数、单词数和字符数
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

# 在文件中搜索和替换
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

## 错误处理

### 退出代码和错误处理

```bash
#!/bin/bash

# 任何错误时退出
set -e

# 未定义变量时退出
set -u

# 显示正在执行的命令
set -x

# 自定义错误处理
handle_error() {
    local exit_code=$1
    local line_number=$2
    echo "Error: Command failed with exit code $exit_code at line $line_number"
    exit $exit_code
}

# 设置错误陷阱
trap 'handle_error $? $LINENO' ERR

# 带错误处理的函数
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

### 日志记录和调试

```bash
#!/bin/bash

# 日志记录函数
log() {
    local level=$1
    shift
    local message="$*"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')

    echo "[$timestamp] [$level] $message" | tee -a "script.log"
}

# 调试函数
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

## 实际示例

### 系统信息脚本

```bash
#!/bin/bash

# 系统信息收集脚本
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

### 备份脚本

```bash
#!/bin/bash

# 带轮转的备份脚本
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

# 主执行
create_backup
cleanup_old_backups
echo "Backup completed successfully"
```

### 服务监控脚本

```bash
#!/bin/bash

# 服务监控脚本
SERVICES=("nginx" "mysql" "ssh")
EMAIL="admin@example.com"

check_service() {
    local service=$1

    if systemctl is-active --quiet "$service"; then
        return 0  # 服务正在运行
    else
        return 1  # 服务未运行
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

# 主监控循环
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

## 最佳实践

### 1. 脚本结构

```bash
#!/bin/bash

# 带描述的脚本头部
# Purpose: This script does something useful
# Author: Your Name
# Date: 2024-01-01
# Version: 1.0

# 错误时退出
set -euo pipefail

# 配置
readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly SCRIPT_NAME="$(basename "$0")"
readonly LOG_FILE="/var/log/${SCRIPT_NAME}.log"

# 全局变量
declare -g DEBUG=0
declare -g VERBOSE=0

# 函数
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
    # 解析命令行参数
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

    # 主脚本逻辑在这里
    echo "Script execution completed"
}

# 执行主函数
main "$@"
```

### 2. 错误处理

```bash
#!/bin/bash

# 健壮的错误处理
set -euo pipefail

# 错误处理器
error_handler() {
    local exit_code=$?
    local line_number=$1
    echo "Error: Command failed with exit code $exit_code at line $line_number"
    cleanup
    exit $exit_code
}

# 清理函数
cleanup() {
    echo "Performing cleanup..."
    # 删除临时文件等
}

# 设置陷阱
trap 'error_handler $LINENO' ERR
trap cleanup EXIT

# 您的脚本逻辑在这里
```

### 3. 输入验证

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

## 结论

Bash 脚本编程是自动化和系统管理的强大工具。主要要点：

1. **从简单开始** - 从基本脚本开始，逐渐增加复杂性
2. **使用函数** - 将代码组织成可重用的函数
3. **处理错误** - 实现适当的错误处理和日志记录
4. **验证输入** - 始终验证用户输入和参数
5. **遵循约定** - 使用一致的命名和结构
6. **彻底测试** - 用各种输入和场景测试脚本
7. **记录代码** - 添加注释和使用说明

通过这些基础知识，您可以创建高效、可维护的 bash 脚本来自动化任务并提高生产力。

## 下一步

掌握 bash 脚本基础后，探索：

1. **高级文本处理** - sed、awk、grep 模式
2. **系统管理** - 进程管理、cron 作业
3. **网络操作** - API 调用、文件传输
4. **数据库操作** - MySQL、PostgreSQL 脚本
5. **CI/CD 集成** - 构建和部署脚本
6. **安全实践** - 安全脚本技术

Shell 脚本是开发人员和系统管理员的必备技能，为自动化和高效系统管理提供基础！