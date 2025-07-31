# Fundamentos de Scripting en Bash

El scripting de shell es una herramienta poderosa para automatizar tareas, administrar sistemas y crear flujos de trabajo eficientes. Este tutorial te enseñará los fundamentos del scripting en bash, desde la sintaxis básica hasta técnicas avanzadas.

## ¿Qué es el Scripting de Shell?

Un **script de shell** es un archivo de texto que contiene una secuencia de comandos que el shell puede ejecutar. Los scripts de shell te permiten:

- **Automatizar tareas repetitivas** - Reducir el trabajo manual
- **Gestionar operaciones del sistema** - Respaldo, monitoreo, despliegue
- **Procesar datos** - Manipulación de texto, operaciones con archivos
- **Crear herramientas personalizadas** - Construir utilidades para tu flujo de trabajo
- **Orquestar operaciones complejas** - Combinar múltiples programas

## Primeros Pasos

### Elegir Tu Shell

```bash
# Verificar shells disponibles
cat /etc/shells

# Verificar shell actual
echo $SHELL

# Cambiar a bash (si no es el predeterminado)
bash
```

### Crear Tu Primer Script

Crea un archivo llamado `hello.sh`:

```bash
#!/bin/bash
# Esto es un comentario
echo "Hello, World!"
echo "Current date: $(date)"
echo "Current user: $(whoami)"
echo "Current directory: $(pwd)"
```

### Hacer Ejecutables los Scripts

```bash
# Hacer el script ejecutable
chmod +x hello.sh

# Ejecutar el script
./hello.sh

# O ejecutar con bash directamente
bash hello.sh
```

### La Línea Shebang

```bash
#!/bin/bash        # El más común - usa bash
#!/bin/sh          # Shell compatible con POSIX
#!/usr/bin/env bash # Encuentra bash en PATH
#!/bin/zsh         # Usa el shell zsh
```

## Variables y Tipos de Datos

### Declaración y Uso de Variables

```bash
#!/bin/bash

# Asignación de variables (sin espacios alrededor de =)
name="John Doe"
age=30
is_student=true

# Usando variables
echo "Name: $name"
echo "Age: $age"
echo "Is student: $is_student"

# Sintaxis alternativa
echo "Name: ${name}"
echo "Age: ${age}"
```

### Ámbito de Variables

```bash
#!/bin/bash

# Variable global
global_var="I'm global"

function show_variables() {
    # Variable local
    local local_var="I'm local"

    echo "Inside function:"
    echo "Global: $global_var"
    echo "Local: $local_var"
}

show_variables

echo "Outside function:"
echo "Global: $global_var"
echo "Local: $local_var"  # Esto estará vacío
```

### Variables de Entorno

```bash
#!/bin/bash

# Variables de entorno comunes
echo "Home directory: $HOME"
echo "Current user: $USER"
echo "PATH: $PATH"
echo "Shell: $SHELL"

# Configurar variables de entorno
export MY_VAR="Custom value"
export PATH="$PATH:/custom/path"

# Verificar si la variable está configurada
if [ -z "$MY_VAR" ]; then
    echo "MY_VAR is not set"
else
    echo "MY_VAR is set to: $MY_VAR"
fi
```

### Variables Especiales

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

## Entrada y Salida

### Leer Entrada del Usuario

```bash
#!/bin/bash

# Entrada básica
echo "Enter your name:"
read name
echo "Hello, $name!"

# Entrada con prompt
read -p "Enter your age: " age
echo "You are $age years old"

# Entrada silenciosa (para contraseñas)
read -s -p "Enter password: " password
echo -e "\nPassword entered!"

# Entrada con tiempo límite
if read -t 5 -p "Enter something (5 seconds): " input; then
    echo "You entered: $input"
else
    echo -e "\nTimeout reached!"
fi
```

### Argumentos de Línea de Comandos

```bash
#!/bin/bash

# Verificar si se proporcionaron argumentos
if [ $# -eq 0 ]; then
    echo "Usage: $0 <name> [age]"
    exit 1
fi

name=$1
age=${2:-"Unknown"}  # Valor predeterminado si no se proporciona

echo "Name: $name"
echo "Age: $age"

# Recorrer todos los argumentos
echo "All arguments:"
for arg in "$@"; do
    echo "  - $arg"
done
```

### Redirección de Salida

```bash
#!/bin/bash

# Redirección de salida estándar
echo "This goes to stdout" > output.txt
echo "This appends to file" >> output.txt

# Redirección de error
ls /nonexistent 2> error.log
ls /nonexistent 2>> error.log  # Añadir

# Redirigir tanto stdout como stderr
command > output.txt 2>&1
command &> output.txt  # Forma abreviada

# Suprimir salida
command > /dev/null 2>&1
```

## Estructuras de Control

### Declaraciones Condicionales

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

# Comparaciones de cadenas
name="John"

if [ "$name" = "John" ]; then
    echo "Hello, John!"
elif [ "$name" = "Jane" ]; then
    echo "Hello, Jane!"
else
    echo "Hello, stranger!"
fi
```

### Pruebas de Archivos y Directorios

```bash
#!/bin/bash

file="test.txt"
directory="test_dir"

# Pruebas de archivos
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

# Múltiples condiciones
if [ -f "$file" ] && [ -r "$file" ]; then
    echo "$file exists and is readable"
fi
```

### Bucles

#### Bucles For

```bash
#!/bin/bash

# Bucle a través de números
for i in {1..5}; do
    echo "Number: $i"
done

# Bucle a través de array
fruits=("apple" "banana" "orange")
for fruit in "${fruits[@]}"; do
    echo "Fruit: $fruit"
done

# Bucle a través de archivos
for file in *.txt; do
    if [ -f "$file" ]; then
        echo "Processing: $file"
    fi
done

# Bucle for estilo C
for ((i=1; i<=5; i++)); do
    echo "Counter: $i"
done
```

#### Bucles While

```bash
#!/bin/bash

# Bucle while básico
counter=1
while [ $counter -le 5 ]; do
    echo "Counter: $counter"
    ((counter++))
done

# Leer archivo línea por línea
while IFS= read -r line; do
    echo "Line: $line"
done < "input.txt"

# Bucle infinito con break
while true; do
    read -p "Enter 'quit' to exit: " input
    if [ "$input" = "quit" ]; then
        break
    fi
    echo "You entered: $input"
done
```

#### Bucles Until

```bash
#!/bin/bash

# Bucle until (opuesto a while)
counter=1
until [ $counter -gt 5 ]; do
    echo "Counter: $counter"
    ((counter++))
done
```

### Declaraciones Case

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

# Case con patrones
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

## Funciones

### Definición y Uso de Funciones

```bash
#!/bin/bash

# Definición de función
greet() {
    echo "Hello, $1!"
}

# Función con múltiples parámetros
add_numbers() {
    local num1=$1
    local num2=$2
    local sum=$((num1 + num2))
    echo $sum
}

# Función con valor de retorno
is_even() {
    local number=$1
    if [ $((number % 2)) -eq 0 ]; then
        return 0  # Verdadero
    else
        return 1  # Falso
    fi
}

# Usando funciones
greet "John"
result=$(add_numbers 5 3)
echo "Sum: $result"

if is_even 4; then
    echo "4 is even"
fi
```

### Características Avanzadas de Funciones

```bash
#!/bin/bash

# Función con parámetros predeterminados
create_user() {
    local username=$1
    local home_dir=${2:-"/home/$username"}
    local shell=${3:-"/bin/bash"}

    echo "Creating user: $username"
    echo "Home directory: $home_dir"
    echo "Shell: $shell"
}

# Función con argumentos variables
print_all() {
    echo "Number of arguments: $#"
    for arg in "$@"; do
        echo "  - $arg"
    done
}

# Función recursiva
factorial() {
    local n=$1
    if [ $n -le 1 ]; then
        echo 1
    else
        local prev=$(factorial $((n - 1)))
        echo $((n * prev))
    fi
}

# Uso
create_user "john"
create_user "jane" "/custom/home"
print_all "arg1" "arg2" "arg3"
echo "Factorial of 5: $(factorial 5)"
```

## Arrays

### Declaración y Uso de Arrays

```bash
#!/bin/bash

# Declaración de array
fruits=("apple" "banana" "orange")
numbers=(1 2 3 4 5)

# Declaración alternativa
declare -a colors
colors[0]="red"
colors[1]="green"
colors[2]="blue"

# Acceder a elementos del array
echo "First fruit: ${fruits[0]}"
echo "Second fruit: ${fruits[1]}"

# Todos los elementos
echo "All fruits: ${fruits[@]}"
echo "All numbers: ${numbers[*]}"

# Longitud del array
echo "Number of fruits: ${#fruits[@]}"

# Índices del array
echo "Fruit indices: ${!fruits[@]}"
```

### Operaciones con Arrays

```bash
#!/bin/bash

# Añadir elementos
fruits=("apple" "banana")
fruits+=("orange")
fruits[3]="grape"

# Eliminar elementos
unset fruits[1]  # Eliminar banana

# Dividir arrays
numbers=(1 2 3 4 5 6 7 8 9 10)
echo "Elements 2-5: ${numbers[@]:2:4}"

# Recorrer arrays
for fruit in "${fruits[@]}"; do
    if [ -n "$fruit" ]; then  # Verificar si no está vacío
        echo "Fruit: $fruit"
    fi
done

# Bucle con índices
for i in "${!fruits[@]}"; do
    echo "Index $i: ${fruits[i]}"
done
```

### Arrays Asociativos

```bash
#!/bin/bash

# Declarar array asociativo
declare -A person
person[name]="John Doe"
person[age]=30
person[city]="New York"

# Sintaxis alternativa
declare -A colors=(
    [red]="#FF0000"
    [green]="#00FF00"
    [blue]="#0000FF"
)

# Acceder a valores
echo "Name: ${person[name]}"
echo "Age: ${person[age]}"

# Todas las claves y valores
echo "All keys: ${!person[@]}"
echo "All values: ${person[@]}"

# Recorrer array asociativo
for key in "${!person[@]}"; do
    echo "$key: ${person[$key]}"
done
```

## Manipulación de Cadenas

### Operaciones con Cadenas

```bash
#!/bin/bash

text="Hello, World!"
filename="document.txt"

# Longitud de cadena
echo "Length: ${#text}"

# Extracción de subcadena
echo "Substring: ${text:0:5}"    # "Hello"
echo "Substring: ${text:7}"      # "World!"

# Reemplazo de cadena
echo "${text/World/Universe}"    # Reemplazar primera ocurrencia
echo "${text//l/L}"             # Reemplazar todas las ocurrencias

# Conversión de mayúsculas/minúsculas
echo "${text,,}"                # Minúsculas
echo "${text^^}"                # Mayúsculas
echo "${text^}"                 # Primera letra en mayúscula

# Coincidencia de patrones
echo "${filename%.txt}"         # Eliminar coincidencia más corta desde el final
echo "${filename%.*}"           # Eliminar extensión
echo "${filename#*.}"           # Obtener extensión
```

### Validación de Cadenas

```bash
#!/bin/bash

validate_email() {
    local email=$1
    local pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"

    if [[ $email =~ $pattern ]]; then
        return 0  # Válido
    else
        return 1  # Inválido
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

# Uso
email="user@example.com"
if validate_email "$email"; then
    echo "Valid email: $email"
else
    echo "Invalid email: $email"
fi
```

## Operaciones con Archivos

### Manipulación de Archivos y Directorios

```bash
#!/bin/bash

# Crear directorios
mkdir -p "project/src/components"
mkdir -p "project/tests"

# Crear archivos
touch "project/README.md"
touch "project/src/main.js"

# Copiar archivos y directorios
cp "source.txt" "destination.txt"
cp -r "source_dir" "destination_dir"

# Mover/renombrar archivos
mv "old_name.txt" "new_name.txt"
mv "file.txt" "directory/"

# Eliminar archivos y directorios
rm "file.txt"
rm -r "directory"
rm -rf "directory"  # Forzar eliminación

# Verificar propiedades de archivo
file="test.txt"
if [ -f "$file" ]; then
    echo "File size: $(stat -c%s "$file") bytes"
    echo "Last modified: $(stat -c%y "$file")"
    echo "Permissions: $(stat -c%A "$file")"
fi
```

### Procesamiento de Archivos

```bash
#!/bin/bash

# Leer archivo línea por línea
process_file() {
    local filename=$1
    local line_number=1

    while IFS= read -r line; do
        echo "Line $line_number: $line"
        ((line_number++))
    done < "$filename"
}

# Contar líneas, palabras y caracteres
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

# Buscar y reemplazar en archivo
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

## Manejo de Errores

### Códigos de Salida y Manejo de Errores

```bash
#!/bin/bash

# Salir ante cualquier error
set -e

# Salir ante variable no definida
set -u

# Mostrar comandos mientras se ejecutan
set -x

# Manejo de errores personalizado
handle_error() {
    local exit_code=$1
    local line_number=$2
    echo "Error: Command failed with exit code $exit_code at line $line_number"
    exit $exit_code
}

# Establecer trampa de error
trap 'handle_error $? $LINENO' ERR

# Función con manejo de errores
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

### Registro y Depuración

```bash
#!/bin/bash

# Función de registro
log() {
    local level=$1
    shift
    local message="$*"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')

    echo "[$timestamp] [$level] $message" | tee -a "script.log"
}

# Función de depuración
debug() {
    if [ "${DEBUG:-0}" = "1" ]; then
        log "DEBUG" "$*"
    fi
}

# Uso
log "INFO" "Script started"
debug "This is a debug message"
log "ERROR" "Something went wrong"
```

## Ejemplos Prácticos

### Script de Información del Sistema

```bash
#!/bin/bash

# Script de recopilación de información del sistema
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

### Script de Respaldo

```bash
#!/bin/bash

# Script de respaldo con rotación
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

# Ejecución principal
create_backup
cleanup_old_backups
echo "Backup completed successfully"
```

### Script de Monitoreo de Servicios

```bash
#!/bin/bash

# Script de monitoreo de servicios
SERVICES=("nginx" "mysql" "ssh")
EMAIL="admin@example.com"

check_service() {
    local service=$1

    if systemctl is-active --quiet "$service"; then
        return 0  # El servicio está funcionando
    else
        return 1  # El servicio no está funcionando
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

# Bucle principal de monitoreo
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

## Mejores Prácticas

### 1. Estructura del Script

```bash
#!/bin/bash

# Encabezado del script con descripción
# Propósito: Este script hace algo útil
# Autor: Tu Nombre
# Fecha: 2024-01-01
# Versión: 1.0

# Salir ante errores
set -euo pipefail

# Configuración
readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly SCRIPT_NAME="$(basename "$0")"
readonly LOG_FILE="/var/log/${SCRIPT_NAME}.log"

# Variables globales
declare -g DEBUG=0
declare -g VERBOSE=0

# Funciones
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
    # Analizar argumentos de línea de comandos
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

    # Lógica principal del script aquí
    echo "Script execution completed"
}

# Ejecutar función principal
main "$@"
```

### 2. Manejo de Errores

```bash
#!/bin/bash

# Manejo de errores robusto
set -euo pipefail

# Manejador de errores
error_handler() {
    local exit_code=$?
    local line_number=$1
    echo "Error: Command failed with exit code $exit_code at line $line_number"
    cleanup
    exit $exit_code
}

# Función de limpieza
cleanup() {
    echo "Performing cleanup..."
    # Eliminar archivos temporales, etc.
}

# Establecer trampas
trap 'error_handler $LINENO' ERR
trap cleanup EXIT

# Tu lógica de script aquí
```

### 3. Validación de Entrada

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

# Uso
read -p "Enter email: " email
if validate_input "$email" "email"; then
    echo "Valid email"
else
    echo "Invalid email"
    exit 1
fi
```

## Conclusión

El scripting en bash es una herramienta poderosa para la automatización y administración de sistemas. Puntos clave:

1. **Comienza simple** - Empieza con scripts básicos y gradualmente añade complejidad
2. **Usa funciones** - Organiza el código en funciones reutilizables
3. **Maneja errores** - Implementa un manejo adecuado de errores y registro
4. **Valida la entrada** - Siempre valida la entrada del usuario y los argumentos
5. **Sigue convenciones** - Usa nombres y estructura consistentes
6. **Prueba exhaustivamente** - Prueba los scripts con varias entradas y escenarios
7. **Documenta el código** - Añade comentarios e instrucciones de uso

Con estos fundamentos, puedes crear scripts de bash eficientes y mantenibles que automaticen tareas y mejoren tu productividad.

## Próximos Pasos

Después de dominar los conceptos básicos del scripting en bash, explora:

1. **Procesamiento avanzado de texto** - patrones de sed, awk, grep
2. **Administración de sistemas** - Gestión de procesos, trabajos cron
3. **Operaciones de red** - Llamadas a API, transferencias de archivos
4. **Operaciones de base de datos** - Scripting para MySQL, PostgreSQL
5. **Integración CI/CD** - Scripts de construcción y despliegue
6. **Prácticas de seguridad** - Técnicas de scripting seguro

¡El scripting de shell es una habilidad esencial para desarrolladores y administradores de sistemas, proporcionando la base para la automatización y la gestión eficiente del sistema!