# 编写更好 Shell 脚本的技巧

Shell 脚本是自动化和系统管理的强大工具，但如果编写不当，它们可能会很脆弱。以下是一些最佳实践，可以使您的 shell 脚本更加健壮、可维护和用户友好。

## 1. 使用 Shebang 行

```bash
#!/bin/bash
```

**为什么重要**：Shebang 行指定应该执行脚本的解释器。始终在顶部包含它，以确保一致性，无论脚本如何调用或用户的默认 shell 是什么。

## 2. 包含脚本文档

```bash
# backup-cleanup.sh
#
# Purpose: Clean up backup files based on retention policy
# Usage: ./backup-cleanup.sh [options]
# Author: Your Name
# Date: January 31, 2025
```

**为什么重要**：良好的文档解释了脚本的目的、用法和历史。这有助于其他人（和您未来的自己）理解脚本的作用以及如何正确使用它。

## 3. 使用 `set` 选项进行错误处理

```bash
# 如果命令失败立即退出
set -e
# 将未设置的变量视为错误
set -u
# 管道的返回值是最后一个以非零状态退出的命令
set -o pipefail
```

**为什么重要**：默认情况下，bash 即使在命令失败后也会继续执行。这些设置使您的脚本快速失败且大声失败，防止静默失败导致的级联错误。

## 4. 使用 `trap` 进行清理

```bash
TEMP_FILE=$(mktemp)
trap "rm -f $TEMP_FILE" EXIT
```

**为什么重要**：`trap` 命令确保在脚本退出时正确清理临时资源，即使由于错误而退出。这防止留下临时文件或其他资源。

## 5. 正确声明变量

```bash
# 常量（按约定使用大写）
declare -r MAX_RETRIES=5

# 数组
declare -a FILES_TO_PROCESS=()

# 整数
declare -i COUNTER=0

# 普通变量
VERSION="1.0.0"
```

**为什么重要**：使用 `declare` 显式定义变量类型和属性，使您的代码更易维护并防止细微的错误。

## 6. 正确逐行处理文件

```bash
while IFS= read -r line; do
    echo "Processing: $line"
done < "$INPUT_FILE"
```

**为什么重要**：这是在 bash 中逐行读取文件的正确方法。设置 `IFS=` 保留前导/尾随空白，`-r` 标志防止反斜杠转义被解释。

## 7. 使用 `mktemp` 创建临时文件

```bash
TEMP_FILE=$(mktemp)
LOG_FILE=$(mktemp -t logfile.XXXXXX)
```

**为什么重要**：使用 `mktemp` 创建具有唯一名称的临时文件，防止文件名冲突和潜在的安全漏洞。

## 8. 使用参数扩展设置默认值

```bash
# 如果参数未设置或为空则使用默认值
INPUT_FILE="${1:-default.txt}"

# 仅在参数未设置时使用默认值
LOG_LEVEL="${LOG_LEVEL-INFO}"
```

**为什么重要**：参数扩展提供了处理默认值的优雅方式，使脚本更加灵活和用户友好。

## 9. 谨慎使用正则表达式

```bash
if [[ $filename =~ ^backup-([0-9]{4})([0-9]{2})([0-9]{2})\.tar\.gz$ ]]; then
    year="${BASH_REMATCH[1]}"
    month="${BASH_REMATCH[2]}"
    day="${BASH_REMATCH[3]}"
    echo "Found backup from $year-$month-$day"
fi
```

**为什么重要**：带有双括号 `[[` 的 `=~` 操作符允许强大的模式匹配。`BASH_REMATCH` 数组包含捕获的组，使从字符串中提取部分变得容易。

## 10. 包含详细输出和日志记录

```bash
log_info() {
    echo "[INFO] $1"
}

log_error() {
    echo "[ERROR] $1" >&2
}

log_info "Starting backup process"
```

**为什么重要**：良好的脚本告诉用户它们在做什么，特别是对于无法撤销的操作。不同的日志级别有助于区分常规信息和关键错误。

## 11. 检查命令成功

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

**为什么重要**：在继续之前始终检查命令是否成功，特别是在执行破坏性操作之前。

## 12. 引用您的变量

```bash
# 好：防止单词分割和通配符展开
echo "Processing file: $filename"

# 坏：如果 $filename 包含空格或特殊字符可能会破坏
echo Processing file: $filename
```

**为什么重要**：始终引用变量以防止单词分割和通配符展开问题，特别是当值可能包含空格或特殊字符时。

## 13. 使用函数进行可重用代码

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

**为什么重要**：函数使您的脚本模块化和可重用。使用 `local` 变量防止污染全局命名空间。

## 14. 正确处理命令行参数

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

**为什么重要**：`getopts` 命令提供了处理命令行选项的标准方式，使您的脚本更加用户友好并符合 Unix 约定。

## 15. 尽早验证输入

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

**为什么重要**：尽早验证输入可以防止脚本后期出现错误，并为用户提供有意义的错误消息。

## 16. 使用有意义的退出代码

```bash
# 定义退出代码
readonly E_SUCCESS=0
readonly E_USAGE=64
readonly E_MISSING_FILE=65
readonly E_PERMISSION=66

if [[ ! -r "$INPUT_FILE" ]]; then
    log_error "Cannot read input file: $INPUT_FILE"
    exit $E_PERMISSION
fi
```

**为什么重要**：有意义的退出代码帮助自动化系统理解脚本失败的原因并采取适当的行动。

## 17. 使用 Shellcheck

定期通过 [ShellCheck](https://www.shellcheck.net/) 运行您的脚本，这是一个识别 shell 脚本中常见问题的静态分析工具。

**为什么重要**：ShellCheck 捕获许多细微的错误，并建议可能难以记住的最佳实践。

## 18. 逻辑地构建您的脚本

按清晰的结构组织您的脚本：
1. Shebang 和文档
2. 常量和配置
3. 函数定义
4. 主脚本逻辑

**为什么重要**：逻辑结构使脚本更容易理解、调试和修改。

## 结论

编写更好的 shell 脚本是关于使它们健壮、可读和可维护。通过遵循这些实践，您的脚本将更加可靠，其他人（包括您未来的自己）更容易理解和修改。