# Flujo de Trabajo Básico de Git: Add, Commit, Push

## Introducción

Ahora que has creado tu primer repositorio Git y entiendes los conceptos básicos, es hora de aprender el flujo de trabajo fundamental de Git. Este flujo de trabajo forma la columna vertebral del uso diario de Git y consta de tres pasos principales: **Add**, **Commit** y **Push**.

Este tutorial te guiará a través de estas operaciones esenciales, ayudándote a entender cómo rastrear cambios, guardar instantáneas de tu trabajo y compartir tu código con otros.

## Prerrequisitos

Antes de comenzar este tutorial, asegúrate de tener:
- Un repositorio Git creado ([Creando Tu Primer Repositorio Git](./creating-your-first-git-repository.md))
- Comprensión básica de los conceptos de Git ([Entendiendo los Conceptos Básicos y Terminología de Git](./understanding-git-basics-and-terminology.md))
- Algunos archivos en tu repositorio para trabajar

## El Flujo de Trabajo Básico de Git

El flujo de trabajo estándar de Git sigue estos pasos:

```
1. Modificar archivos en el directorio de trabajo
2. Preparar cambios (git add)
3. Confirmar cambios (git commit)
4. Enviar al repositorio remoto (git push)
```

Exploremos cada paso en detalle.

## Paso 1: Entendiendo el Estado Actual

Antes de hacer cualquier cambio, verifiquemos el estado actual de nuestro repositorio:

```bash
git status
```

Deberías ver algo como:
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

Esto muestra:
- Rama actual: `main`
- Aún no hay commits
- Varios archivos sin seguimiento

## Paso 2: Añadiendo Archivos al Área de Preparación (git add)

El comando `git add` mueve archivos del directorio de trabajo al área de preparación. Aquí es donde preparas tu próximo commit.

### Añadiendo Archivos Individuales

Añade archivos uno por uno:

```bash
# Añadir el archivo README
git add README.md

# Verificar estado
git status
```

Deberías ver:
```
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
	new file:   README.md

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	.gitignore
	config.json
	hello.py
	sample.txt
```

**Nota la diferencia:**
- `README.md` ahora está bajo "Changes to be committed" (preparado)
- Otros archivos permanecen como "Untracked"

### Añadiendo Múltiples Archivos

Añade múltiples archivos a la vez:

```bash
# Añadir múltiples archivos específicos
git add hello.py config.json

# O añadir todos los archivos en el directorio actual
git add .

# Verificar estado
git status
```

Después de añadir todos los archivos:
```
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
	new file:   .gitignore
	new file:   README.md
	new file:   config.json
	new file:   hello.py
	new file:   sample.txt
```

### Patrones Comunes de git add

```bash
# Añadir todos los archivos
git add .

# Añadir todos los archivos en el directorio actual y subdirectorios
git add -A

# Añadir solo archivos modificados (no archivos nuevos)
git add -u

# Añadir archivos interactivamente
git add -i

# Añadir tipos específicos de archivos
git add *.py
git add *.md
```

### Entendiendo el Área de Preparación

El área de preparación te permite:
- **Crear commits precisos** - Elegir exactamente qué va en cada commit
- **Revisar cambios** - Ver qué será confirmado antes de hacer commit
- **Dividir cambios** - Confirmar cambios relacionados por separado

## Paso 3: Haciendo Tu Primer Commit (git commit)

Un commit crea una instantánea de tus cambios preparados. Cada commit debe representar una unidad lógica de trabajo.

### Comando Básico de Commit

```bash
git commit -m "Commit inicial: Añadir archivos del proyecto"
```

Deberías ver una salida como:
```
[main (root-commit) a1b2c3d] Commit inicial: Añadir archivos del proyecto
 5 files changed, 23 insertions(+)
 create mode 100644 .gitignore
 create mode 100644 README.md
 create mode 100644 config.json
 create mode 100755 hello.py
 create mode 100644 sample.txt
```

**Entendiendo la salida:**
- `main` - Rama actual
- `root-commit` - Este es el primer commit
- `a1b2c3d` - Hash corto del commit
- `5 files changed, 23 insertions(+)` - Resumen de cambios

### Mejores Prácticas para Mensajes de Commit

Los buenos mensajes de commit son cruciales para el mantenimiento del proyecto:

#### Estructura
```
Resumen corto (50 caracteres o menos)

Explicación más detallada si es necesaria. Ajustar a 72 caracteres.
Explicar qué y por qué, no cómo.

- Usar viñetas para múltiples cambios
- Referenciar números de issue si aplica
```

#### Ejemplos de Buenos Mensajes de Commit
```bash
# Bueno - Claro y conciso
git commit -m "Añadir sistema de autenticación de usuarios"

# Bueno - Explica el por qué
git commit -m "Arreglar bug de inicio de sesión que impedía restablecer contraseña"

# Bueno - Commit de múltiples líneas
git commit -m "Implementar edición de perfil de usuario

- Añadir validación de formulario
- Actualizar modelo de usuario
- Añadir carga de imagen de perfil
- Arreglar problemas de estilo en móvil"
```

#### Ejemplos de Malos Mensajes de Commit
```bash
# Malo - Demasiado vago
git commit -m "arreglar cosas"

# Malo - No descriptivo
git commit -m "actualización"

# Malo - Demasiado largo para un resumen
git commit -m "Este commit añade el nuevo sistema de autenticación de usuarios que permite a los usuarios iniciar sesión y registrar cuentas con validación de correo electrónico y funcionalidad de restablecimiento de contraseña"
```

### Métodos Alternativos de Commit

#### Usando el Editor Predeterminado
```bash
# Abre tu editor predeterminado para el mensaje de commit
git commit
```

#### Confirmando Todos los Cambios
```bash
# Prepara y confirma todos los archivos rastreados
git commit -a -m "Actualizar todos los archivos rastreados"
```

## Paso 4: Viendo el Historial de Commits

Después de hacer commits, puedes ver el historial de tu repositorio:

```bash
# Ver historial de commits
git log
```

Salida:
```
commit a1b2c3d4e5f6789... (HEAD -> main)
Author: Tu Nombre <tu.email@example.com>
Date:   Wed Jul 9 10:30:00 2025 +0000

    Commit inicial: Añadir archivos del proyecto
```

### Opciones Útiles de git log

```bash
# Formato compacto de una línea
git log --oneline

# Mostrar últimos 3 commits
git log -3

# Mostrar commits con cambios de archivos
git log --stat

# Mostrar commits con cambios reales
git log -p

# Representación gráfica
git log --graph --oneline
```

## Haciendo Cambios Adicionales

Practiquemos el flujo de trabajo con algunos cambios:

### Paso 1: Modificar un Archivo

Edita el archivo README.md:

```bash
echo "

## Actualizaciones Recientes

- Añadida estructura básica del proyecto
- Creada configuración inicial
- Configurado repositorio Git" >> README.md
```

### Paso 2: Verificar Estado

```bash
git status
```

Deberías ver:
```
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   README.md

no changes added to commit (use "git add" and commit)
```

### Paso 3: Ver Cambios

Mira qué ha cambiado:

```bash
git diff
```

Esto muestra las diferencias entre tu directorio de trabajo y el último commit.

### Paso 4: Preparar y Confirmar

```bash
# Preparar los cambios
git add README.md

# Confirmar los cambios
git commit -m "Actualizar README con estado del proyecto"
```

## Entendiendo los Estados de los Archivos

Los archivos en Git pasan por diferentes estados:

```
Sin seguimiento → Preparado → Confirmado
      ↓              ↓            ↓
   git add →     git commit →   git push
```

### Ejemplos de Estado de Archivos

```bash
# Verificar estado detallado
git status

# Ver estado corto
git status -s
```

Símbolos de estado corto:
- `??` - Archivo sin seguimiento
- `A` - Añadido (preparado)
- `M` - Modificado
- `D` - Eliminado
- `R` - Renombrado

## Paso 5: Configurando un Repositorio Remoto

Para enviar tus cambios, necesitas un repositorio remoto. Configuremos uno:

### Usando GitHub (Ejemplo)

1. Crea un nuevo repositorio en GitHub
2. Copia la URL del repositorio
3. Añádelo como remoto:

```bash
# Añadir repositorio remoto
git remote add origin https://github.com/tuusuario/mi-primer-proyecto-git.git

# Verificar remoto
git remote -v
```

### Usando GitLab u Otros Servicios

El proceso es similar:
```bash
# Ejemplo de GitLab
git remote add origin https://gitlab.com/tuusuario/mi-primer-proyecto-git.git

# Servidor Git auto-alojado
git remote add origin usuario@servidor:/ruta/al/repo.git
```

## Paso 6: Enviando al Repositorio Remoto (git push)

Envía tus commits al repositorio remoto:

```bash
# Enviar al repositorio remoto
git push -u origin main
```

La bandera `-u` establece el seguimiento entre tu rama local `main` y la rama remota `main`.

### Entendiendo la Salida de Push

```
Enumerating objects: 7, done.
Counting objects: 100% (7/7), done.
Delta compression using up to 4 threads
Compressing objects: 100% (5/5), done.
Writing objects: 100% (7/7), 1.23 KiB | 1.23 MiB/s, done.
Total 7 (delta 0), reused 0 (delta 0)
To https://github.com/tuusuario/mi-primer-proyecto-git.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

### Envíos Futuros

Después del envío inicial con `-u`, puedes simplemente usar:

```bash
git push
```

## Ejemplo Completo del Flujo de Trabajo

Aquí hay un ejemplo completo del flujo de trabajo de Git:

```bash
# 1. Hacer cambios
echo "print('¡Hola, Git!')" > nuevo_script.py

# 2. Verificar estado
git status

# 3. Preparar cambios
git add nuevo_script.py

# 4. Confirmar cambios
git commit -m "Añadir nuevo script de Python"

# 5. Enviar al remoto
git push
```

## Patrones Comunes del Flujo de Trabajo de Git

### Flujo de Trabajo de Desarrollo de Funcionalidades
```bash
# Comenzar a trabajar en una funcionalidad
git status
# ... hacer cambios ...
git add .
git commit -m "Implementar funcionalidad X"
git push
```

### Flujo de Trabajo de Corrección de Errores
```bash
# Arreglar un error
git status
# ... arreglar el error ...
git add -u  # Añadir solo archivos modificados
git commit -m "Arreglar error en autenticación de usuario"
git push
```

### Flujo de Trabajo de Desarrollo Regular
```bash
# Ciclo de desarrollo diario
git status
# ... trabajar en código ...
git add .
git commit -m "Añadir validación de perfil de usuario"
# ... más trabajo ...
git add .
git commit -m "Actualizar manejo de errores"
git push
```

## Mejores Prácticas

### 1. Hacer Commits Frecuentemente
- Hacer commits pequeños y enfocados
- Confirmar cambios relacionados juntos
- No esperar demasiado entre commits

### 2. Escribir Buenos Mensajes de Commit
- Usar tiempo presente ("Añadir funcionalidad" no "Añadida funcionalidad")
- Mantener la primera línea por debajo de 50 caracteres
- Explicar por qué, no solo qué

### 3. Revisar Antes de Confirmar
```bash
# Siempre verificar qué estás confirmando
git status
git diff --staged
```

### 4. Usar el Área de Preparación Efectivamente
- Preparar solo cambios relacionados
- Usar `git add -p` para preparación parcial de archivos
- Revisar cambios preparados antes de confirmar

## Solución de Problemas Comunes

### Problema: "Nothing to commit"
**Causa**: No hay cambios preparados para confirmar.
**Solución**: Usa `git add` para preparar cambios primero.

### Problema: "Repository not found"
**Causa**: La URL del repositorio remoto es incorrecta.
**Solución**: Verifica la URL remota con `git remote -v`.

### Problema: "Authentication failed"
**Causa**: Credenciales o permisos incorrectos.
**Solución**: Verifica tu nombre de usuario/contraseña o claves SSH.

### Problema: "Uncommitted changes"
**Causa**: Intentar enviar con cambios no confirmados.
**Solución**: Confirma o guarda temporalmente los cambios primero.

## Resumen de Comandos Útiles

### Estado e Información
```bash
git status          # Verificar estado del repositorio
git log             # Ver historial de commits
git diff            # Mostrar cambios
git remote -v       # Mostrar repositorios remotos
```

### Preparación y Confirmación
```bash
git add <archivo>   # Preparar archivo específico
git add .           # Preparar todos los archivos
git commit -m "msg" # Confirmar con mensaje
git commit -a -m "msg" # Preparar y confirmar archivos rastreados
```

### Operaciones Remotas
```bash
git remote add origin <url>  # Añadir repositorio remoto
git push -u origin main      # Enviar y establecer upstream
git push                     # Enviar al remoto configurado
```

## Resumen

¡Has aprendido con éxito el flujo de trabajo básico de Git! Esto es lo que has logrado:

1. **Entender el flujo de trabajo**: Add → Commit → Push
2. **Preparar cambios**: Usar `git add` para preparar commits
3. **Hacer commits**: Crear instantáneas con `git commit`
4. **Configurar remotos**: Conectar a repositorios externos
5. **Enviar cambios**: Compartir tu trabajo con `git push`
6. **Mejores prácticas**: Escribir buenos mensajes de commit y organizar el trabajo

### Comandos Clave Dominados:
- `git add` - Preparar cambios para commit
- `git commit` - Crear una instantánea de los cambios preparados
- `git push` - Subir commits al repositorio remoto
- `git status` - Verificar el estado actual del repositorio
- `git log` - Ver historial de commits
- `git diff` - Ver cambios entre versiones

### Patrón de Flujo de Trabajo:
```
Editar archivos → git add → git commit → git push
```

Este flujo de trabajo básico forma la base de todo uso de Git. Ya sea que trabajes solo o con un equipo, estos comandos serán tus herramientas diarias para el control de versiones.

## Próximos Pasos

Ahora que entiendes el flujo de trabajo básico de Git, estás listo para explorar temas más avanzados:

1. [Entendiendo las Ramas de Git](./understanding-git-branches.md)
2. [Creando y Cambiando entre Ramas](./creating-and-switching-branches.md)
3. [Trabajando con Repositorios Remotos](./working-with-remote-repositories.md)

## Recursos Relacionados

- [Creando Tu Primer Repositorio Git](./creating-your-first-git-repository.md)
- [Entendiendo los Conceptos Básicos y Terminología de Git](./understanding-git-basics-and-terminology.md)
- [Instalación y Configuración de Git](./git-installation-and-setup.md)
- [Tutorial Oficial de Git](https://git-scm.com/docs/gittutorial)
- [Libro Pro Git - Fundamentos de Git](https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository)