# Creando Tu Primer Repositorio Git

## Introducción

Ahora que entiendes los conceptos básicos y la terminología de Git, es hora de crear tu primer repositorio Git. Este tutorial te guiará a través del proceso de inicialización de un nuevo repositorio Git, comprensión de la estructura de directorios y configuración de tu primer proyecto para control de versiones.

Al final de este tutorial, tendrás un repositorio Git completamente funcional y entenderás cómo comenzar a rastrear los archivos de tu proyecto.

## Prerrequisitos

Antes de comenzar este tutorial, asegúrate de tener:
- Git instalado en tu sistema ([Instalación y Configuración de Git](./git-installation-and-setup.md))
- Comprensión básica de los conceptos de Git ([Entendiendo los Conceptos Básicos y Terminología de Git](./understanding-git-basics-and-terminology.md))
- Un editor de texto o IDE de tu elección
- Conocimiento básico de línea de comandos

## Dos Formas de Crear un Repositorio Git

Hay dos formas principales de crear un repositorio Git:

1. **Inicializar un nuevo repositorio** en un directorio existente
2. **Clonar un repositorio existente** desde una ubicación remota

Este tutorial se centra en el primer método. La clonación se cubrirá en tutoriales posteriores sobre repositorios remotos.

## Método 1: Inicializar un Nuevo Repositorio

### Paso 1: Crear un Directorio de Proyecto

Primero, crea un nuevo directorio para tu proyecto:

```bash
# Crear un nuevo directorio
mkdir my-first-git-project

# Navegar al directorio
cd my-first-git-project
```

### Paso 2: Inicializar Repositorio Git

Inicializa Git en tu directorio de proyecto:

```bash
git init
```

Deberías ver una salida similar a:
```
Initialized empty Git repository in /path/to/my-first-git-project/.git/
```

**¿Qué acaba de suceder?**
- Git creó un directorio oculto `.git` en tu carpeta de proyecto
- Este directorio `.git` contiene todos los metadatos de Git y la base de datos de objetos
- Tu directorio es ahora un repositorio Git (pero vacío)

### Paso 3: Verificar la Creación del Repositorio

Comprueba que Git está funcionando en tu directorio:

```bash
git status
```

Deberías ver:
```
On branch main

No commits yet

nothing to commit (create/copy files and use "git add" to track)
```

Esto confirma que:
- Estás en la rama `main`
- Aún no se han realizado commits
- No hay archivos siendo rastreados

## Entendiendo el Directorio .git

El directorio `.git` contiene todos los datos del repositorio Git. Exploremos su estructura:

```bash
ls -la .git/
```

Verás directorios y archivos como:
- `config` - Configuración del repositorio
- `description` - Descripción del repositorio (usado por GitWeb)
- `HEAD` - Apunta a la rama actual
- `hooks/` - Directorio para hooks de Git (scripts)
- `info/` - Información adicional del repositorio
- `objects/` - Base de datos de objetos Git
- `refs/` - Referencias (ramas, etiquetas)

**Importante**: ¡Nunca edites manualmente los archivos en el directorio `.git` a menos que sepas exactamente lo que estás haciendo!

## Creando Tus Primeros Archivos

### Paso 1: Crear un Archivo README

Crea un archivo README para tu proyecto:

```bash
echo "# My First Git Project" > README.md
```

O créalo con tu editor de texto:

```markdown
# My First Git Project

This is my first project using Git version control.

## Features

- Learning Git basics
- Understanding version control
- Building good development habits

## Getting Started

This project demonstrates basic Git workflow and commands.
```

### Paso 2: Crear Archivos Adicionales

Vamos a crear algunos archivos más para hacer nuestro proyecto más interesante:

```bash
# Crear un script simple de Python
cat > hello.py << 'EOF'
#!/usr/bin/env python3

def greet(name):
    """Return a greeting message."""
    return f"Hello, {name}!"

if __name__ == "__main__":
    print(greet("World"))
EOF

# Crear un archivo de texto simple
echo "This is a sample text file for Git practice." > sample.txt

# Crear un archivo de configuración del proyecto
cat > config.json << 'EOF'
{
  "project": "my-first-git-project",
  "version": "1.0.0",
  "author": "Your Name",
  "description": "Learning Git version control"
}
EOF
```

### Paso 3: Verificar el Estado del Repositorio

Ahora comprueba lo que Git ve:

```bash
git status
```

Deberías ver:
```
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	README.md
	config.json
	hello.py
	sample.txt

nothing added to commit but untracked files present (use "git add" to track)
```

**Entendiendo la salida:**
- `Untracked files` - Archivos que Git no está rastreando actualmente
- Git sugiere usar `git add` para comenzar a rastrear estos archivos

## Estado de Archivos en Git

Git categoriza los archivos en diferentes estados:

### 1. No Rastreados
- Archivos que existen en tu directorio de trabajo pero no son rastreados por Git
- Los archivos nuevos caen en esta categoría

### 2. Rastreados
Archivos que Git conoce, que pueden estar:
- **Sin modificar** - Sin cambios desde el último commit
- **Modificados** - Cambiados pero no preparados
- **Preparados** - Cambios marcados para el próximo commit

## Configuración Básica de Git (Opcional)

Antes de hacer commits, es posible que desees configurar Git con tu identidad:

```bash
# Establecer tu nombre y correo electrónico (si no se ha hecho globalmente)
git config user.name "Tu Nombre"
git config user.email "tu.email@example.com"

# Ver la configuración actual
git config --list
```

## Configuración Específica del Repositorio

También puedes establecer configuración específica para este repositorio:

```bash
# Establecer configuración específica del repositorio
git config user.name "Nombre Específico del Proyecto"
git config user.email "proyecto@example.com"

# Ver la configuración del repositorio
git config --local --list
```

## Creando un Archivo .gitignore

Crea un archivo `.gitignore` para especificar los archivos que Git debe ignorar:

```bash
cat > .gitignore << 'EOF'
# Ignore compiled Python files
*.pyc
__pycache__/

# Ignore temporary files
*.tmp
*.temp

# Ignore log files
*.log

# Ignore IDE files
.vscode/
.idea/
*.swp
*.swo

# Ignore OS-specific files
.DS_Store
Thumbs.db
EOF
```

### ¿Por qué Usar .gitignore?
- Evita que se rastreen archivos temporales
- Mantiene limpio el repositorio
- Reduce el ruido en `git status`
- Evita commits accidentales de datos sensibles

## Entendiendo la Estructura del Repositorio Git

Tu proyecto ahora tiene esta estructura:

```
my-first-git-project/
├── .git/                 # Datos del repositorio Git (oculto)
├── .gitignore           # Archivos a ignorar
├── README.md            # Documentación del proyecto
├── config.json          # Archivo de configuración
├── hello.py             # Script de Python
└── sample.txt           # Archivo de texto de muestra
```

## Verificando el Estado del Repositorio Nuevamente

Veamos cómo se ve nuestro repositorio ahora:

```bash
git status
```

Deberías ver:
```
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	.gitignore
	README.md
	config.json
	hello.py
	sample.txt

nothing added to commit but untracked files present (use "git add" to track)
```

## Mejores Prácticas para la Creación de Repositorios

### 1. Inicializar Temprano
Comienza con Git desde el principio de tu proyecto, no después de haber escrito mucho código.

### 2. Crear un Buen README
Siempre incluye un archivo README que explique:
- Qué hace el proyecto
- Cómo instalarlo/ejecutarlo
- Cómo contribuir

### 3. Usar .gitignore desde el Principio
Configura `.gitignore` temprano para evitar rastrear archivos innecesarios.

### 4. Elegir Nombres de Directorio Significativos
Usa nombres descriptivos para los directorios de tu proyecto.

### 5. Mantener Limpia la Raíz del Repositorio
No sobrecargues el directorio raíz con demasiados archivos.

## Errores Comunes a Evitar

### 1. No Inicializar Git en Tu Directorio Principal
```bash
# NO HAGAS ESTO
cd ~
git init
```

### 2. No Eliminar el Directorio .git
Eliminar `.git` destruye todo el historial de Git.

### 3. No Inicializar Git Dentro de Otro Repositorio Git
Esto puede causar confusión y conflictos.

### 4. No Rastrear Archivos Binarios Grandes
Usa Git LFS para archivos grandes en su lugar.

## Método 2: Inicializar con Archivos

Si ya tienes archivos en un directorio, puedes inicializar Git allí:

```bash
# Navegar al proyecto existente
cd existing-project

# Inicializar Git
git init

# Los archivos ahora no están rastreados, listos para ser añadidos
git status
```

## Solución de Problemas Comunes

### Problema: "Not a git repository"
**Solución**: Asegúrate de estar en el directorio correcto y haber ejecutado `git init`.

### Problema: Permission Denied
**Solución**: Verifica los permisos de los archivos y asegúrate de tener acceso de escritura al directorio.

### Problema: Repository Already Exists
**Solución**: Si ves "Reinitialized existing Git repository", Git detectó un directorio `.git` existente.

## Resumen

¡Has creado exitosamente tu primer repositorio Git! Esto es lo que has logrado:

1. **Creado un directorio de proyecto** e inicializado Git
2. **Entendido la estructura** y propósito del directorio .git
3. **Creado archivos de proyecto** incluyendo README, código y configuración
4. **Configurado .gitignore** para excluir archivos innecesarios
5. **Aprendido sobre los estados de los archivos** en Git (rastreados vs. no rastreados)
6. **Configurado Git** para tu repositorio

### Comandos Clave Utilizados:
- `git init` - Inicializar un nuevo repositorio
- `git status` - Verificar el estado del repositorio
- `git config` - Configurar ajustes de Git

### Estado Actual del Repositorio:
- ✅ Repositorio inicializado
- ✅ Archivos creados
- ✅ .gitignore configurado
- ⏳ Los archivos no están rastreados (listos para preparación)

## Próximos Pasos

Ahora que tienes un repositorio con archivos, estás listo para aprender el flujo de trabajo básico de Git:

1. **Añadir archivos al área de preparación** (git add)
2. **Confirmar cambios** (git commit)
3. **Enviar al repositorio remoto** (git push)

Continúa con: [Flujo de Trabajo Básico de Git: Add, Commit, Push](./basic-git-workflow-add-commit-push.md)

## Recursos Relacionados

- [Entendiendo los Conceptos Básicos y Terminología de Git](./understanding-git-basics-and-terminology.md)
- [Instalación y Configuración de Git](./git-installation-and-setup.md)
- [Git Usando Diferentes Configuraciones en Diferentes Proyectos](./git-using-different-config-in-different-projects.md)
- [Tutorial Oficial de Git](https://git-scm.com/docs/gittutorial)
- [Libro Pro Git - Comenzando](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup)