# Tips for Writing Better Shell Scripts

Shell scripts are powerful tools for automation and system administration, but they can be brittle if not written carefully. Here are some best practices to make your shell scripts more robust, maintainable, and user-friendly.

## 1. Use Shebang Line

```bash
#!/bin/bash
```

**Why it matters**: The shebang line specifies which interpreter should execute the script. Always include it at the top to ensure consistency regardless of how the script is invoked or what the user's default shell is.

## 2. Include Script Documentation

```bash
# backup-cleanup.sh
#
# Purpose: Clean up backup files based on retention policy
# Usage: ./backup-cleanup.sh [options]
# Author: Your Name
# Date: January 31, 2025
```

**Why it matters**: Good documentation explains the script's purpose, usage, and history. This helps others (and your future self) understand what the script does and how to use it properly.

## 3. Error Handling with `set` Options

```bash
# Exit immediately if a command fails
set -e
# Treat unset variables as errors
set -u
# Return value of a pipeline is the last command to exit with non-zero status
set -o pipefail
```

**Why it matters**: By default, bash continues executing even after commands fail. These settings make your scripts fail fast and loudly, preventing cascading errors from silent failures.

## 4. Use `trap` for Cleanup

```bash
TEMP_FILE=$(mktemp)
trap "rm -f $TEMP_FILE" EXIT
```

**Why it matters**: The `trap` command ensures that temporary resources are properly cleaned up when the script exits, even if it exits due to an error. This prevents leaving behind temporary files or other resources.

## 5. Declare Variables Properly

```bash
# Constants (use uppercase by convention)
declare -r MAX_RETRIES=5

# Arrays
declare -a FILES_TO_PROCESS=()

# Integers
declare -i COUNTER=0

# Regular variables
VERSION="1.0.0"
```

**Why it matters**: Using `declare` explicitly defines variable types and attributes, making your code more maintainable and preventing subtle bugs.

## 6. Process Files Line by Line Correctly

```bash
while IFS= read -r line; do
    echo "Processing: $line"
done < "$INPUT_FILE"
```

**Why it matters**: This is the correct way to read a file line by line in bash. Setting `IFS=` preserves leading/trailing whitespace, and the `-r` flag prevents backslash escapes from being interpreted.

## 7. Use `mktemp` for Temporary Files

```bash
TEMP_FILE=$(mktemp)
LOG_FILE=$(mktemp -t logfile.XXXXXX)
```

**Why it matters**: Using `mktemp` creates temporary files with unique names, preventing file name collisions and potential security vulnerabilities.

## 8. Use Parameter Expansion for Defaults

```bash
# Use default value if parameter is unset or empty
INPUT_FILE="${1:-default.txt}"

# Use default only if parameter is unset
LOG_LEVEL="${LOG_LEVEL-INFO}"
```

**Why it matters**: Parameter expansion provides elegant ways to handle default values, making scripts more flexible and user-friendly.

## 9. Use Regex with Care

```bash
if [[ $filename =~ ^backup-([0-9]{4})([0-9]{2})([0-9]{2})\.tar\.gz$ ]]; then
    year="${BASH_REMATCH[1]}"
    month="${BASH_REMATCH[2]}"
    day="${BASH_REMATCH[3]}"
    echo "Found backup from $year-$month-$day"
fi
```

**Why it matters**: The `=~` operator with double brackets `[[` allows powerful pattern matching. The `BASH_REMATCH` array contains the captured groups, making it easy to extract parts of a string.

## 10. Include Verbose Output and Logging

```bash
log_info() {
    echo "[INFO] $1"
}

log_error() {
    echo "[ERROR] $1" >&2
}

log_info "Starting backup process"
```

**Why it matters**: Good scripts tell users what they're doing, especially for operations that can't be undone. Different logging levels help distinguish between routine information and critical errors.

## 11. Check Command Success

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

**Why it matters**: Always check that commands succeed before proceeding, especially before performing destructive operations.

## 12. Quote Your Variables

```bash
# Good: Prevents word splitting and globbing
echo "Processing file: $filename"

# Bad: Can break if $filename contains spaces or special characters
echo Processing file: $filename
```

**Why it matters**: Always quote variables to prevent word splitting and globbing issues, especially when the values might contain spaces or special characters.

## 13. Use Functions for Reusable Code

```bash
function backup_database() {
    local db_name="$1"
    local output_file="$2"

    log_info "Backing up database $db_name to $output_file"
    pg_dump "$db_name" > "$output_file"
    return $?
}

# Usage
backup_database "myapp" "/tmp/myapp_backup.sql"
```

**Why it matters**: Functions make your script modular and reusable. Using `local` variables prevents polluting the global namespace.

## 14. Process Command Line Arguments Properly

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

**Why it matters**: The `getopts` command provides a standard way to process command line options, making your scripts more user-friendly and conforming to Unix conventions.

## 15. Validate Input Early

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

**Why it matters**: Validating input early prevents errors later in the script and provides meaningful error messages to users.

## 16. Use Meaningful Exit Codes

```bash
# Define exit codes
readonly E_SUCCESS=0
readonly E_USAGE=64
readonly E_MISSING_FILE=65
readonly E_PERMISSION=66

if [[ ! -r "$INPUT_FILE" ]]; then
    log_error "Cannot read input file: $INPUT_FILE"
    exit $E_PERMISSION
fi
```

**Why it matters**: Meaningful exit codes help automated systems understand why a script failed and take appropriate action.

## 17. Use Shellcheck

Regularly run your scripts through [ShellCheck](https://www.shellcheck.net/), a static analysis tool that identifies common issues in shell scripts.

**Why it matters**: ShellCheck catches many subtle bugs and suggests best practices that can be difficult to remember.

## 18. Structure Your Script Logically

Organize your script with a clear structure:
1. Shebang and documentation
2. Constants and configuration
3. Function definitions
4. Main script logic

**Why it matters**: A logical structure makes scripts easier to understand, debug, and modify.

## Conclusion

Writing better shell scripts is about making them robust, readable, and maintainable. By following these practices, your scripts will be more reliable and easier for others (including your future self) to understand and modify.
