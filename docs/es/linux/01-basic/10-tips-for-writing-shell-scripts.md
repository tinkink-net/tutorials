# Consejos para Escribir Mejores Scripts de Shell

Los scripts de shell son herramientas poderosas para la automatización y administración de sistemas, pero pueden ser frágiles si no se escriben con cuidado. Aquí hay algunas mejores prácticas para hacer que tus scripts de shell sean más robustos, mantenibles y fáciles de usar.

## 1. Usa la Línea Shebang

```bash
#!/bin/bash
```

**Por qué importa**: La línea shebang especifica qué intérprete debe ejecutar el script. Inclúyela siempre al principio para garantizar la consistencia independientemente de cómo se invoque el script o cuál sea el shell predeterminado del usuario.

## 2. Incluye Documentación del Script

```bash
# backup-cleanup.sh
#
# Propósito: Limpiar archivos de respaldo según la política de retención
# Uso: ./backup-cleanup.sh [opciones]
# Autor: Tu Nombre
# Fecha: 31 de enero de 2025
```

**Por qué importa**: Una buena documentación explica el propósito, uso e historial del script. Esto ayuda a otros (y a tu futuro yo) a entender qué hace el script y cómo usarlo correctamente.

## 3. Manejo de Errores con Opciones `set`

```bash
# Salir inmediatamente si un comando falla
set -e
# Tratar variables no definidas como errores
set -u
# El valor de retorno de una tubería es el último comando que sale con estado distinto de cero
set -o pipefail
```

**Por qué importa**: Por defecto, bash continúa ejecutándose incluso después de que los comandos fallen. Estas configuraciones hacen que tus scripts fallen rápida y ruidosamente, evitando errores en cascada por fallos silenciosos.

## 4. Usa `trap` para Limpieza

```bash
TEMP_FILE=$(mktemp)
trap "rm -f $TEMP_FILE" EXIT
```

**Por qué importa**: El comando `trap` asegura que los recursos temporales se limpien adecuadamente cuando el script termina, incluso si termina debido a un error. Esto evita dejar archivos temporales u otros recursos.

## 5. Declara Variables Correctamente

```bash
# Constantes (usa mayúsculas por convención)
declare -r MAX_RETRIES=5

# Arrays
declare -a FILES_TO_PROCESS=()

# Enteros
declare -i COUNTER=0

# Variables regulares
VERSION="1.0.0"
```

**Por qué importa**: Usar `declare` define explícitamente los tipos y atributos de las variables, haciendo tu código más mantenible y previniendo errores sutiles.

## 6. Procesa Archivos Línea por Línea Correctamente

```bash
while IFS= read -r line; do
    echo "Procesando: $line"
done < "$INPUT_FILE"
```

**Por qué importa**: Esta es la forma correcta de leer un archivo línea por línea en bash. Establecer `IFS=` preserva los espacios en blanco al principio/final, y la bandera `-r` evita que se interpreten los escapes de barra invertida.

## 7. Usa `mktemp` para Archivos Temporales

```bash
TEMP_FILE=$(mktemp)
LOG_FILE=$(mktemp -t logfile.XXXXXX)
```

**Por qué importa**: Usar `mktemp` crea archivos temporales con nombres únicos, evitando colisiones de nombres de archivos y posibles vulnerabilidades de seguridad.

## 8. Usa Expansión de Parámetros para Valores Predeterminados

```bash
# Usar valor predeterminado si el parámetro no está definido o está vacío
INPUT_FILE="${1:-default.txt}"

# Usar predeterminado solo si el parámetro no está definido
LOG_LEVEL="${LOG_LEVEL-INFO}"
```

**Por qué importa**: La expansión de parámetros proporciona formas elegantes de manejar valores predeterminados, haciendo los scripts más flexibles y fáciles de usar.

## 9. Usa Regex con Cuidado

```bash
if [[ $filename =~ ^backup-([0-9]{4})([0-9]{2})([0-9]{2})\.tar\.gz$ ]]; then
    year="${BASH_REMATCH[1]}"
    month="${BASH_REMATCH[2]}"
    day="${BASH_REMATCH[3]}"
    echo "Found backup from $year-$month-$day"
fi
```

**Por qué importa**: El operador `=~` con dobles corchetes `[[` permite un potente emparejamiento de patrones. El array `BASH_REMATCH` contiene los grupos capturados, facilitando la extracción de partes de una cadena.

## 10. Incluye Salida Detallada y Registro

```bash
log_info() {
    echo "[INFO] $1"
}

log_error() {
    echo "[ERROR] $1" >&2
}

log_info "Iniciando proceso de respaldo"
```

**Por qué importa**: Los buenos scripts informan a los usuarios lo que están haciendo, especialmente para operaciones que no se pueden deshacer. Los diferentes niveles de registro ayudan a distinguir entre información rutinaria y errores críticos.

## 11. Verifica el Éxito de los Comandos

```bash
if ! command -v aws >/dev/null 2>&1; then
    log_error "AWS CLI no está instalado"
    exit 1
fi

if ! cp "$SOURCE" "$DESTINATION"; then
    log_error "Error al copiar $SOURCE a $DESTINATION"
    exit 1
fi
```

**Por qué importa**: Siempre verifica que los comandos tengan éxito antes de continuar, especialmente antes de realizar operaciones destructivas.

## 12. Entrecomilla tus Variables

```bash
# Bueno: Previene la división de palabras y la expansión de comodines
echo "Procesando archivo: $filename"

# Malo: Puede fallar si $filename contiene espacios o caracteres especiales
echo Procesando archivo: $filename
```

**Por qué importa**: Siempre entrecomilla las variables para evitar problemas de división de palabras y expansión de comodines, especialmente cuando los valores pueden contener espacios o caracteres especiales.

## 13. Usa Funciones para Código Reutilizable

```bash
function backup_database() {
    local db_name="$1"
    local output_file="$2"

    log_info "Respaldando base de datos $db_name en $output_file"
    pg_dump "$db_name" > "$output_file"
    return $?
}

# Uso
backup_database "myapp" "/tmp/myapp_backup.sql"
```

**Por qué importa**: Las funciones hacen que tu script sea modular y reutilizable. Usar variables `local` evita contaminar el espacio de nombres global.

## 14. Procesa Argumentos de Línea de Comandos Correctamente

```bash
function show_usage() {
    echo "Uso: $(basename "$0") [-v] [-h] [-f ARCHIVO]"
    echo "  -v: Habilitar salida detallada"
    echo "  -h: Mostrar este mensaje de ayuda"
    echo "  -f ARCHIVO: Especificar archivo de entrada"
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

**Por qué importa**: El comando `getopts` proporciona una forma estándar de procesar opciones de línea de comandos, haciendo tus scripts más fáciles de usar y conformes a las convenciones de Unix.

## 15. Valida la Entrada Temprano

```bash
if [[ ! -f "$INPUT_FILE" ]]; then
    log_error "El archivo de entrada no existe: $INPUT_FILE"
    exit 1
fi

if [[ ! $PORT =~ ^[0-9]+$ ]] || [[ $PORT -lt 1 ]] || [[ $PORT -gt 65535 ]]; then
    log_error "Número de puerto inválido: $PORT"
    exit 1
fi
```

**Por qué importa**: Validar la entrada temprano previene errores posteriores en el script y proporciona mensajes de error significativos a los usuarios.

## 16. Usa Códigos de Salida Significativos

```bash
# Define códigos de salida
readonly E_SUCCESS=0
readonly E_USAGE=64
readonly E_MISSING_FILE=65
readonly E_PERMISSION=66

if [[ ! -r "$INPUT_FILE" ]]; then
    log_error "No se puede leer el archivo de entrada: $INPUT_FILE"
    exit $E_PERMISSION
fi
```

**Por qué importa**: Los códigos de salida significativos ayudan a los sistemas automatizados a entender por qué falló un script y a tomar las acciones apropiadas.

## 17. Usa Shellcheck

Ejecuta regularmente tus scripts a través de [ShellCheck](https://www.shellcheck.net/), una herramienta de análisis estático que identifica problemas comunes en scripts de shell.

**Por qué importa**: ShellCheck detecta muchos errores sutiles y sugiere mejores prácticas que pueden ser difíciles de recordar.

## 18. Estructura tu Script Lógicamente

Organiza tu script con una estructura clara:
1. Shebang y documentación
2. Constantes y configuración
3. Definiciones de funciones
4. Lógica principal del script

**Por qué importa**: Una estructura lógica hace que los scripts sean más fáciles de entender, depurar y modificar.

## Conclusión

Escribir mejores scripts de shell consiste en hacerlos robustos, legibles y mantenibles. Siguiendo estas prácticas, tus scripts serán más confiables y más fáciles de entender y modificar para otros (incluido tu futuro yo).