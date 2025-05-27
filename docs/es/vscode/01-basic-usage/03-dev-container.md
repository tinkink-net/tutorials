# Aprovecha la función de Dev Container en VS Code

## ¿Qué es un Contenedor?

> Si estás familiarizado con contenedores o Docker, puedes omitir esta sección.

Un contenedor es una unidad ligera, portátil y autosuficiente que puede ejecutar software en un entorno aislado.

Empaqueta el código de la aplicación junto con sus dependencias, bibliotecas y archivos de configuración, asegurando que se ejecute de manera consistente en diferentes entornos informáticos.

Los contenedores se construyen sobre tecnologías de contenedorización como Docker, que permiten a los desarrolladores crear, implementar y gestionar aplicaciones fácilmente.

> El término "contenedor" a menudo se usa indistintamente con "contenedor Docker", ya que Docker es la plataforma de contenedorización más popular.

## ¿Qué es un Dev Container?

Un Dev Container es un tipo especial de contenedor diseñado específicamente para propósitos de desarrollo. Proporciona un entorno consistente y aislado para que los desarrolladores trabajen, asegurando que la aplicación se comporte de la misma manera independientemente de dónde se ejecute.

Puede resolver muchos problemas comunes de desarrollo, como conflictos de dependencias, inconsistencias en el entorno y desajustes de versiones. Al usar un Dev Container, los desarrolladores pueden asegurar que su entorno de desarrollo sea reproducible y consistente, facilitando la colaboración con otros y evitando problemas del tipo "funciona en mi máquina".

## Beneficios de usar Dev Containers

El uso de Dev Containers en tu flujo de trabajo de desarrollo ofrece varios beneficios:

1. **Entorno de desarrollo consistente**: Todos en el equipo trabajan con exactamente el mismo entorno, eliminando problemas del tipo "funciona en mi máquina".

2. **Aislamiento**: Tu entorno de desarrollo está aislado de tu sistema local, evitando conflictos entre diferentes proyectos o versiones de dependencias.

3. **Incorporación fácil**: Los nuevos miembros del equipo pueden comenzar rápidamente sin gastar tiempo configurando su entorno local.

4. **Compilaciones reproducibles**: El entorno de desarrollo se define como código, haciéndolo reproducible en diferentes máquinas.

5. **Máquina local limpia**: Mantén tu máquina local limpia ya que todas las dependencias específicas del proyecto están contenidas dentro del contenedor.

## Requisitos previos para usar Dev Containers

Antes de comenzar a usar Dev Containers en VS Code, debes asegurarte de tener instalados los siguientes requisitos previos:

**Docker**

Los Dev Containers dependen de Docker para crear y gestionar entornos de contenedores. Necesitas instalar Docker antes de usar Dev Containers.

> Puedes elegir Docker Desktop (en Windows y macOS) o Docker Engine (en Linux) desde [el sitio web oficial de Docker](https://www.docker.com/products/docker-desktop/). También puedes usar herramientas Docker de terceros como OrbStack, consulta [Usando Docker en computadoras Mac con chip Silicon (M1/M2/M3)](/es/mac/02-dev-environment/how-to-use-docker-on-m1-mac.html) para más detalles.


**VS Code**

Asegúrate de tener instalada la última versión de Visual Studio Code. Puedes descargarla desde [code.visualstudio.com](https://code.visualstudio.com/).


**Extensión Dev Containers**

Instala la extensión Dev Containers desde el Marketplace de VS Code.

![Instalar extensión Dev Containers](/attachments/vscode/dev-container/01-extension.png)

## Cómo usar Dev Containers en VS Code: Una guía paso a paso

Para usar Dev Containers en Visual Studio Code, primero abre tu proyecto, luego sigue estos pasos:

**Añadir configuración de Dev Container**:

Abre la Paleta de Comandos (`Ctrl`+`Shift`+`P` o `Cmd`+`Shift`+`P` en macOS) y escribe "Dev Containers: Add Development Container Configuration Files...", luego elige "Add configuration to workspace".

![Añadir configuración de Dev Container](/attachments/vscode/dev-container/02-add-config.png)

Selecciona una configuración predefinida de Dev Container de la lista. Por ejemplo, selecciona "Node.js & TypeScript" si estás trabajando en un proyecto Node.js.

![Seleccionar configuración de Node.js](/attachments/vscode/dev-container/03-select-nodejs.png)

Luego elige la versión de la imagen y otras opciones según los requisitos de tu proyecto, si no estás seguro, puedes usar las opciones predeterminadas.

Después de eso, VS Code creará una carpeta `.devcontainer` en tu espacio de trabajo con un archivo de configuración `devcontainer.json`:

```json
// For format details, see https://aka.ms/devcontainer.json. For config options, see the
// README at: https://github.com/devcontainers/templates/tree/main/src/javascript-node
{
	"name": "Node.js",
	// Or use a Dockerfile or Docker Compose file. More info: https://containers.dev/guide/dockerfile
	"image": "mcr.microsoft.com/devcontainers/javascript-node:1-22-bookworm"

	// Features to add to the dev container. More info: https://containers.dev/features.
	// "features": {},

	// Use 'forwardPorts' to make a list of ports inside the container available locally.
	// "forwardPorts": [],

	// Use 'postCreateCommand' to run commands after the container is created.
	// "postCreateCommand": "yarn install",

	// Configure tool-specific properties.
	// "customizations": {},

	// Uncomment to connect as root instead. More info: https://aka.ms/dev-containers-non-root.
	// "remoteUser": "root"
}
```

**Abrir tu proyecto en el Dev Container**:

Puedes abrir el Dev Container haciendo clic en el botón "Open a remote window" que aparece en la esquina inferior izquierda de la ventana de VS Code, luego seleccionando "Reopen in Container".

![Abrir una ventana remota](/attachments/vscode/dev-container/04-open-remote-window.png)

![Reabrir en contenedor](/attachments/vscode/dev-container/05-reopen-in-container.png)

Alternativamente, puedes abrir la Paleta de Comandos (`Ctrl`+`Shift`+`P` o `Cmd`+`Shift`+`P` en macOS) y escribir "Dev Containers: Reopen in Container".

Luego verás una barra de progreso que indica que VS Code está construyendo la imagen del Dev Container e iniciando el contenedor. Puedes hacer clic en el botón "Show Log" para ver los registros de construcción.

![Progreso](/attachments/vscode/dev-container/06-progress.png)

Si todo va bien, verás una nueva ventana de VS Code que está conectada al Dev Container. Antes de poder comenzar a trabajar, es posible que debas esperar a que el contenedor termine de inicializarse (descargar e instalar las dependencias y extensiones necesarias).

![Inicialización del contenedor](/attachments/vscode/dev-container/07-container-initializing.png)

Una vez que el contenedor esté listo, puedes comenzar a trabajar en tu proyecto dentro del contenedor.

## Solución de problemas comunes

Si encuentras algún problema con Dev Containers, prueba estos pasos de solución de problemas:

1. **Verifica que Docker esté en ejecución**: Asegúrate de que Docker esté instalado y ejecutándose en tu máquina.
2. **Aumenta la asignación de recursos**: Si los contenedores se ejecutan lentamente, intenta aumentar la asignación de memoria y CPU para Docker en la configuración de Docker Desktop.
3. **Actualiza VS Code y las extensiones**: Asegúrate de estar usando la última versión de VS Code y la extensión Dev Containers.
4. **Verifica la configuración de red**: Si tu contenedor necesita acceder a recursos de red, asegúrate de que la configuración del firewall no esté bloqueando las conexiones.
5. **Revisa los registros**: Usa el botón "Show Log" en la barra de progreso de Dev Containers para ver registros detallados para la solución de problemas.

## Conclusión

Los Dev Containers en VS Code proporcionan una forma poderosa de crear entornos de desarrollo consistentes y aislados. Al aprovechar la tecnología de contenedores, puedes asegurar que tu entorno de desarrollo sea reproducible en diferentes máquinas y evitar problemas comunes relacionados con el entorno.

Ya sea que estés trabajando en un proyecto personal o colaborando con un equipo, los Dev Containers pueden agilizar tu flujo de trabajo y facilitarte la concentración en escribir código en lugar de configurar entornos.