# Instalación y Configuración de Git

Git es un sistema de control de versiones distribuido que te ayuda a rastrear cambios en tu código, colaborar con otros y gestionar diferentes versiones de tus proyectos. Este tutorial te guiará a través de la instalación de Git en diferentes sistemas operativos y la configuración inicial.

## ¿Qué es Git?

Git es un poderoso sistema de control de versiones que:
- Rastrea cambios en tus archivos a lo largo del tiempo
- Te permite volver a versiones anteriores
- Permite la colaboración con múltiples desarrolladores
- Gestiona diferentes versiones (ramas) de tu proyecto
- Funciona sin conexión y se sincroniza cuando está conectado

## Instalación de Git

### Windows

#### Opción 1: Git oficial para Windows
1. Visita [git-scm.com](https://git-scm.com/download/win)
2. Descarga la última versión para Windows
3. Ejecuta el instalador y sigue estas configuraciones recomendadas:
   - Elige "Use Git from the Windows Command Prompt"
   - Selecciona "Checkout Windows-style, commit Unix-style line endings"
   - Elige "Use Windows' default console window"

#### Opción 2: Usando el Gestor de Paquetes (Chocolatey)
Si tienes Chocolatey instalado:
```bash
choco install git
```

#### Opción 3: Usando el Gestor de Paquetes (Scoop)
Si tienes Scoop instalado:
```bash
scoop install git
```

### macOS

#### Opción 1: Usando Homebrew (Recomendado)
```bash
brew install git
```

#### Opción 2: Usando MacPorts
```bash
sudo port install git
```

#### Opción 3: Herramientas de Línea de Comandos de Xcode
```bash
xcode-select --install
```

#### Opción 4: Instalador Oficial
1. Visita [git-scm.com](https://git-scm.com/download/mac)
2. Descarga el instalador para macOS
3. Ejecuta el instalador y sigue las instrucciones

### Linux

#### Ubuntu/Debian
```bash
sudo apt update
sudo apt install git
```

#### CentOS/RHEL/Fedora
```bash
# CentOS/RHEL
sudo yum install git

# Fedora
sudo dnf install git
```

#### Arch Linux
```bash
sudo pacman -S git
```

#### OpenSUSE
```bash
sudo zypper install git
```

## Verificando la Instalación

Después de la instalación, verifica que Git esté instalado correctamente:

```bash
git --version
```

Deberías ver una salida similar a:
```
git version 2.39.0
```

## Configuración Inicial de Git

Antes de usar Git, necesitas configurar tu identidad. Esta información se adjuntará a tus commits.

### Configurando tu Identidad

Configura tu nombre y dirección de correo electrónico:

```bash
git config --global user.name "Tu Nombre Completo"
git config --global user.email "tu.correo@ejemplo.com"
```

Ejemplo:
```bash
git config --global user.name "John Doe"
git config --global user.email "john.doe@example.com"
```

### Configurando tu Editor Predeterminado

Configura tu editor de texto preferido para operaciones de Git:

```bash
# Para Visual Studio Code
git config --global core.editor "code --wait"

# Para Vim
git config --global core.editor "vim"

# Para Nano
git config --global core.editor "nano"

# Para Sublime Text
git config --global core.editor "subl -n -w"
```

### Configurando el Nombre de Rama Predeterminado

Establece el nombre de rama predeterminado para nuevos repositorios:

```bash
git config --global init.defaultBranch main
```

### Configurando Finales de Línea

#### Windows
```bash
git config --global core.autocrlf true
```

#### macOS/Linux
```bash
git config --global core.autocrlf input
```

## Opciones de Configuración Avanzadas

### Configurando Alias

Crea atajos para comandos comunes de Git:

```bash
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual '!gitk'
```

### Configurando el Comportamiento de Push

Establece el comportamiento predeterminado de push:

```bash
git config --global push.default simple
```

### Configurando el Almacenamiento de Credenciales

Para evitar escribir tu contraseña repetidamente:

#### Windows
```bash
git config --global credential.helper manager-core
```

#### macOS
```bash
git config --global credential.helper osxkeychain
```

#### Linux
```bash
git config --global credential.helper store
```

## Visualizando tu Configuración

Para ver todas tus configuraciones de Git:

```bash
git config --list
```

Para ver un valor de configuración específico:

```bash
git config user.name
git config user.email
```

Para ver dónde se define una configuración:

```bash
git config --show-origin user.name
```

## Ubicaciones de Archivos de Configuración

La configuración de Git se almacena en tres niveles:

1. **A nivel del sistema**: `/etc/gitconfig` (afecta a todos los usuarios)
2. **Específico del usuario**: `~/.gitconfig` o `~/.config/git/config` (afecta al usuario actual)
3. **Específico del repositorio**: `.git/config` (afecta solo al repositorio actual)

Cada nivel anula al anterior, por lo que la configuración específica del repositorio tiene prioridad.

## Configuración de Clave SSH (Opcional pero Recomendado)

Para autenticación segura con repositorios remotos como GitHub:

### Generar Clave SSH
```bash
ssh-keygen -t ed25519 -C "tu.correo@ejemplo.com"
```

### Añadir Clave SSH al Agente SSH
```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

### Copiar Clave Pública
```bash
# macOS
pbcopy < ~/.ssh/id_ed25519.pub

# Linux
xclip -sel clip < ~/.ssh/id_ed25519.pub

# Windows
clip < ~/.ssh/id_ed25519.pub
```

Luego añade esta clave pública a tu cuenta de GitHub/GitLab/Bitbucket.

## Solución de Problemas Comunes

### Error de Permiso Denegado
Si encuentras problemas de permisos:
```bash
sudo chown -R $(whoami) ~/.gitconfig
```

### HTTPS vs SSH
Si tienes problemas de autenticación, es posible que necesites cambiar entre HTTPS y SSH:
```bash
# Verificar URL remota actual
git remote -v

# Cambiar a SSH
git remote set-url origin git@github.com:username/repository.git

# Cambiar a HTTPS
git remote set-url origin https://github.com/username/repository.git
```

### Problemas de Certificados
Si encuentras errores de certificado SSL:
```bash
git config --global http.sslVerify false
```

**Nota**: Usa esto solo como solución temporal y vuelve a habilitar la verificación SSL después.

## Próximos Pasos

Ahora que tienes Git instalado y configurado, estás listo para:
- Crear tu primer repositorio Git
- Aprender comandos básicos de Git
- Comenzar a rastrear cambios en tus proyectos
- Colaborar con otros usando Git

## Resumen

En este tutorial, aprendiste cómo:
- Instalar Git en Windows, macOS y Linux
- Configurar tu identidad y preferencias de Git
- Configurar claves SSH para autenticación segura
- Solucionar problemas comunes de instalación
- Entender la jerarquía de configuración de Git

Git está ahora listo para ayudarte a rastrear cambios, colaborar con otros y gestionar tu código de manera efectiva. En el próximo tutorial, exploraremos los conceptos básicos y la terminología de Git para construir tu base.