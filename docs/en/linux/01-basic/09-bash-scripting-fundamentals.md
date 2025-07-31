# Bash Scripting Fundamentals

Shell scripting is a powerful tool for automating tasks, managing systems, and creating efficient workflows. This tutorial will teach you the fundamentals of bash scripting, from basic syntax to advanced techniques.

## What is Shell Scripting?

A **shell script** is a text file containing a sequence of commands that the shell can execute. Shell scripts allow you to:

- **Automate repetitive tasks** - Reduce manual work
- **Manage system operations** - Backup, monitoring, deployment
- **Process data** - Text manipulation, file operations
- **Create custom tools** - Build utilities for your workflow
- **Orchestrate complex operations** - Combine multiple programs

## Getting Started

### Choosing Your Shell

```bash
# Check available shells
cat /etc/shells

# Check current shell
echo $SHELL

# Switch to bash (if not default)
bash
```

### Creating Your First Script

Create a file called `hello.sh`:

```bash
#!/bin/bash
# This is a comment
echo "Hello, World!"
echo "Current date: $(date)"
echo "Current user: $(whoami)"
echo "Current directory: $(pwd)"
```

### Making Scripts Executable

```bash
# Make script executable
chmod +x hello.sh

# Run the script
./hello.sh

# Or run with bash directly
bash hello.sh
```

### The Shebang Line

```bash
#!/bin/bash        # Most common - uses bash
#!/bin/sh          # POSIX compliant shell
#!/usr/bin/env bash # Finds bash in PATH
#!/bin/zsh         # Uses zsh shell
```

## Variables and Data Types

### Variable Declaration and Usage

```bash
#!/bin/bash

# Variable assignment (no spaces around =)
name="John Doe"
age=30
is_student=true

# Using variables
echo "Name: $name"
echo "Age: $age"
echo "Is student: $is_student"

# Alternative syntax
echo "Name: ${name}"
echo "Age: ${age}"
```

### Variable Scope

```bash
#!/bin/bash

# Global variable
global_var="I'm global"

function show_variables() {
    # Local variable
    local local_var="I'm local"

    echo "Inside function:"
    echo "Global: $global_var"
    echo "Local: $local_var"
}

show_variables

echo "Outside function:"
echo "Global: $global_var"
echo "Local: $local_var"  # This will be empty
```

### Environment Variables

```bash
#!/bin/bash

# Common environment variables
echo "Home directory: $HOME"
echo "Current user: $USER"
echo "PATH: $PATH"
echo "Shell: $SHELL"

# Setting environment variables
export MY_VAR="Custom value"
export PATH="$PATH:/custom/path"

# Check if variable is set
if [ -z "$MY_VAR" ]; then
    echo "MY_VAR is not set"
else
    echo "MY_VAR is set to: $MY_VAR"
fi
```

### Special Variables

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

## Input and Output

### Reading User Input

```bash
#!/bin/bash

# Basic input
echo "Enter your name:"
read name
echo "Hello, $name!"

# Input with prompt
read -p "Enter your age: " age
echo "You are $age years old"

# Silent input (for passwords)
read -s -p "Enter password: " password
echo -e "\nPassword entered!"

# Input with timeout
if read -t 5 -p "Enter something (5 seconds): " input; then
    echo "You entered: $input"
else
    echo -e "\nTimeout reached!"
fi
```

### Command Line Arguments

```bash
#!/bin/bash

# Check if arguments are provided
if [ $# -eq 0 ]; then
    echo "Usage: $0 <name> [age]"
    exit 1
fi

name=$1
age=${2:-"Unknown"}  # Default value if not provided

echo "Name: $name"
echo "Age: $age"

# Loop through all arguments
echo "All arguments:"
for arg in "$@"; do
    echo "  - $arg"
done
```

### Output Redirection

```bash
#!/bin/bash

# Standard output redirection
echo "This goes to stdout" > output.txt
echo "This appends to file" >> output.txt

# Error redirection
ls /nonexistent 2> error.log
ls /nonexistent 2>> error.log  # Append

# Redirect both stdout and stderr
command > output.txt 2>&1
command &> output.txt  # Shorthand

# Suppress output
command > /dev/null 2>&1
```

## Control Structures

### Conditional Statements

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

# String comparisons
name="John"

if [ "$name" = "John" ]; then
    echo "Hello, John!"
elif [ "$name" = "Jane" ]; then
    echo "Hello, Jane!"
else
    echo "Hello, stranger!"
fi
```

### File and Directory Tests

```bash
#!/bin/bash

file="test.txt"
directory="test_dir"

# File tests
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

# Multiple conditions
if [ -f "$file" ] && [ -r "$file" ]; then
    echo "$file exists and is readable"
fi
```

### Loops

#### For Loops

```bash
#!/bin/bash

# Loop through numbers
for i in {1..5}; do
    echo "Number: $i"
done

# Loop through array
fruits=("apple" "banana" "orange")
for fruit in "${fruits[@]}"; do
    echo "Fruit: $fruit"
done

# Loop through files
for file in *.txt; do
    if [ -f "$file" ]; then
        echo "Processing: $file"
    fi
done

# C-style for loop
for ((i=1; i<=5; i++)); do
    echo "Counter: $i"
done
```

#### While Loops

```bash
#!/bin/bash

# Basic while loop
counter=1
while [ $counter -le 5 ]; do
    echo "Counter: $counter"
    ((counter++))
done

# Reading file line by line
while IFS= read -r line; do
    echo "Line: $line"
done < "input.txt"

# Infinite loop with break
while true; do
    read -p "Enter 'quit' to exit: " input
    if [ "$input" = "quit" ]; then
        break
    fi
    echo "You entered: $input"
done
```

#### Until Loops

```bash
#!/bin/bash

# Until loop (opposite of while)
counter=1
until [ $counter -gt 5 ]; do
    echo "Counter: $counter"
    ((counter++))
done
```

### Case Statements

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

# Case with patterns
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

## Functions

### Function Definition and Usage

```bash
#!/bin/bash

# Function definition
greet() {
    echo "Hello, $1!"
}

# Function with multiple parameters
add_numbers() {
    local num1=$1
    local num2=$2
    local sum=$((num1 + num2))
    echo $sum
}

# Function with return value
is_even() {
    local number=$1
    if [ $((number % 2)) -eq 0 ]; then
        return 0  # True
    else
        return 1  # False
    fi
}

# Using functions
greet "John"
result=$(add_numbers 5 3)
echo "Sum: $result"

if is_even 4; then
    echo "4 is even"
fi
```

### Advanced Function Features

```bash
#!/bin/bash

# Function with default parameters
create_user() {
    local username=$1
    local home_dir=${2:-"/home/$username"}
    local shell=${3:-"/bin/bash"}

    echo "Creating user: $username"
    echo "Home directory: $home_dir"
    echo "Shell: $shell"
}

# Function with variable arguments
print_all() {
    echo "Number of arguments: $#"
    for arg in "$@"; do
        echo "  - $arg"
    done
}

# Recursive function
factorial() {
    local n=$1
    if [ $n -le 1 ]; then
        echo 1
    else
        local prev=$(factorial $((n - 1)))
        echo $((n * prev))
    fi
}

# Usage
create_user "john"
create_user "jane" "/custom/home"
print_all "arg1" "arg2" "arg3"
echo "Factorial of 5: $(factorial 5)"
```

## Arrays

### Array Declaration and Usage

```bash
#!/bin/bash

# Array declaration
fruits=("apple" "banana" "orange")
numbers=(1 2 3 4 5)

# Alternative declaration
declare -a colors
colors[0]="red"
colors[1]="green"
colors[2]="blue"

# Accessing array elements
echo "First fruit: ${fruits[0]}"
echo "Second fruit: ${fruits[1]}"

# All elements
echo "All fruits: ${fruits[@]}"
echo "All numbers: ${numbers[*]}"

# Array length
echo "Number of fruits: ${#fruits[@]}"

# Array indices
echo "Fruit indices: ${!fruits[@]}"
```

### Array Operations

```bash
#!/bin/bash

# Adding elements
fruits=("apple" "banana")
fruits+=("orange")
fruits[3]="grape"

# Removing elements
unset fruits[1]  # Remove banana

# Slicing arrays
numbers=(1 2 3 4 5 6 7 8 9 10)
echo "Elements 2-5: ${numbers[@]:2:4}"

# Looping through arrays
for fruit in "${fruits[@]}"; do
    if [ -n "$fruit" ]; then  # Check if not empty
        echo "Fruit: $fruit"
    fi
done

# Loop with indices
for i in "${!fruits[@]}"; do
    echo "Index $i: ${fruits[i]}"
done
```

### Associative Arrays

```bash
#!/bin/bash

# Declare associative array
declare -A person
person[name]="John Doe"
person[age]=30
person[city]="New York"

# Alternative syntax
declare -A colors=(
    [red]="#FF0000"
    [green]="#00FF00"
    [blue]="#0000FF"
)

# Accessing values
echo "Name: ${person[name]}"
echo "Age: ${person[age]}"

# All keys and values
echo "All keys: ${!person[@]}"
echo "All values: ${person[@]}"

# Loop through associative array
for key in "${!person[@]}"; do
    echo "$key: ${person[$key]}"
done
```

## String Manipulation

### String Operations

```bash
#!/bin/bash

text="Hello, World!"
filename="document.txt"

# String length
echo "Length: ${#text}"

# Substring extraction
echo "Substring: ${text:0:5}"    # "Hello"
echo "Substring: ${text:7}"      # "World!"

# String replacement
echo "${text/World/Universe}"    # Replace first occurrence
echo "${text//l/L}"             # Replace all occurrences

# Case conversion
echo "${text,,}"                # Lowercase
echo "${text^^}"                # Uppercase
echo "${text^}"                 # Capitalize first letter

# Pattern matching
echo "${filename%.txt}"         # Remove shortest match from end
echo "${filename%.*}"           # Remove extension
echo "${filename#*.}"           # Get extension
```

### String Validation

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

# Usage
email="user@example.com"
if validate_email "$email"; then
    echo "Valid email: $email"
else
    echo "Invalid email: $email"
fi
```

## File Operations

### File and Directory Manipulation

```bash
#!/bin/bash

# Create directories
mkdir -p "project/src/components"
mkdir -p "project/tests"

# Create files
touch "project/README.md"
touch "project/src/main.js"

# Copy files and directories
cp "source.txt" "destination.txt"
cp -r "source_dir" "destination_dir"

# Move/rename files
mv "old_name.txt" "new_name.txt"
mv "file.txt" "directory/"

# Remove files and directories
rm "file.txt"
rm -r "directory"
rm -rf "directory"  # Force removal

# Check file properties
file="test.txt"
if [ -f "$file" ]; then
    echo "File size: $(stat -c%s "$file") bytes"
    echo "Last modified: $(stat -c%y "$file")"
    echo "Permissions: $(stat -c%A "$file")"
fi
```

### File Processing

```bash
#!/bin/bash

# Read file line by line
process_file() {
    local filename=$1
    local line_number=1

    while IFS= read -r line; do
        echo "Line $line_number: $line"
        ((line_number++))
    done < "$filename"
}

# Count lines, words, and characters
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

# Search and replace in file
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

## Error Handling

### Exit Codes and Error Handling

```bash
#!/bin/bash

# Exit on any error
set -e

# Exit on undefined variable
set -u

# Show commands as they execute
set -x

# Custom error handling
handle_error() {
    local exit_code=$1
    local line_number=$2
    echo "Error: Command failed with exit code $exit_code at line $line_number"
    exit $exit_code
}

# Set error trap
trap 'handle_error $? $LINENO' ERR

# Function with error handling
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

### Logging and Debugging

```bash
#!/bin/bash

# Logging function
log() {
    local level=$1
    shift
    local message="$*"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')

    echo "[$timestamp] [$level] $message" | tee -a "script.log"
}

# Debug function
debug() {
    if [ "${DEBUG:-0}" = "1" ]; then
        log "DEBUG" "$*"
    fi
}

# Usage
log "INFO" "Script started"
debug "This is a debug message"
log "ERROR" "Something went wrong"
```

## Practical Examples

### System Information Script

```bash
#!/bin/bash

# System information gathering script
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

### Backup Script

```bash
#!/bin/bash

# Backup script with rotation
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

# Main execution
create_backup
cleanup_old_backups
echo "Backup completed successfully"
```

### Service Monitor Script

```bash
#!/bin/bash

# Service monitoring script
SERVICES=("nginx" "mysql" "ssh")
EMAIL="admin@example.com"

check_service() {
    local service=$1

    if systemctl is-active --quiet "$service"; then
        return 0  # Service is running
    else
        return 1  # Service is not running
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

# Main monitoring loop
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

## Best Practices

### 1. Script Structure

```bash
#!/bin/bash

# Script header with description
# Purpose: This script does something useful
# Author: Your Name
# Date: 2024-01-01
# Version: 1.0

# Exit on errors
set -euo pipefail

# Configuration
readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly SCRIPT_NAME="$(basename "$0")"
readonly LOG_FILE="/var/log/${SCRIPT_NAME}.log"

# Global variables
declare -g DEBUG=0
declare -g VERBOSE=0

# Functions
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
    # Parse command line arguments
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

    # Main script logic here
    echo "Script execution completed"
}

# Execute main function
main "$@"
```

### 2. Error Handling

```bash
#!/bin/bash

# Robust error handling
set -euo pipefail

# Error handler
error_handler() {
    local exit_code=$?
    local line_number=$1
    echo "Error: Command failed with exit code $exit_code at line $line_number"
    cleanup
    exit $exit_code
}

# Cleanup function
cleanup() {
    echo "Performing cleanup..."
    # Remove temporary files, etc.
}

# Set traps
trap 'error_handler $LINENO' ERR
trap cleanup EXIT

# Your script logic here
```

### 3. Input Validation

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

# Usage
read -p "Enter email: " email
if validate_input "$email" "email"; then
    echo "Valid email"
else
    echo "Invalid email"
    exit 1
fi
```

## Conclusion

Bash scripting is a powerful tool for automation and system administration. Key takeaways:

1. **Start simple** - Begin with basic scripts and gradually add complexity
2. **Use functions** - Organize code into reusable functions
3. **Handle errors** - Implement proper error handling and logging
4. **Validate input** - Always validate user input and arguments
5. **Follow conventions** - Use consistent naming and structure
6. **Test thoroughly** - Test scripts with various inputs and scenarios
7. **Document code** - Add comments and usage instructions

With these fundamentals, you can create efficient, maintainable bash scripts that automate tasks and improve your productivity.

## Next Steps

After mastering bash scripting basics, explore:

1. **Advanced text processing** - sed, awk, grep patterns
2. **System administration** - Process management, cron jobs
3. **Network operations** - API calls, file transfers
4. **Database operations** - MySQL, PostgreSQL scripting
5. **CI/CD integration** - Build and deployment scripts
6. **Security practices** - Secure scripting techniques

Shell scripting is an essential skill for developers and system administrators, providing the foundation for automation and efficient system management!
