# Uso de Docker en computadoras Mac con chip Silicon (M1/M2/M3)

<Validator lang="es" :platform-list="['macOS 13.2.1']" date="2023-03-14" />

## Antecedentes y dificultades

Apple lanzó oficialmente computadoras con su propio chip, Apple Silicon, en 2020, y el primer modelo de chip lanzado con la computadora fue el M1. La arquitectura de este chip cambió de la clásica x86 a la arquitectura ARM.

Para resolver el problema de incompatibilidad de software causado por el cambio en la arquitectura de CPU, Apple incluyó Rosetta 2 en MacOS, que traduce el código de las aplicaciones. Este software traduce el código de arquitectura x86 a código de arquitectura ARM en tiempo de ejecución, permitiendo que la mayoría del software funcione sin problemas en MacOS con los nuevos chips.

Aunque la mayoría del software ya funciona bien en los chips Apple Silicon (M1/M2/M3), hay una clase particular de software que no ha podido ejecutarse sin problemas: el software de virtualización. Esto incluye software como máquinas virtuales y Docker.

El software clásico de máquinas virtuales como VirtualBox indica explícitamente que no hay planes de soporte. Y aunque Parallels Desktop lo soporta, el precio es prohibitivo.

Debido a que Docker en realidad depende de un Linux virtualizado como Host en sistemas que no son Linux, no hay manera de que Docker funcione sin problemas sin una solución sólida para máquinas virtuales.

## Solución oficial

Docker Desktop For Mac proporciona una versión que se ejecuta en chips Apple Silicon, y utiliza QEMU para manejar la virtualización en diferentes arquitecturas. Pero ya no es gratuito para empresas de cierto tamaño. Así que si estás en una empresa un poco más grande, es posible que no elijas usar Docker Desktop For Mac, y si eres un usuario personal, entonces Docker Desktop For Mac sigue siendo una muy buena solución.

## Lima

[Lima](https://github.com/lima-vm/lima) es un software libre de código abierto que también utiliza QEMU para manejar la virtualización para diferentes arquitecturas. A diferencia de Docker Desktop For Mac, utiliza Containerd en lugar de Docker para su software de contenedores.

> Containerd es una implementación de este estándar, y Docker también se adhiere a él. Por lo tanto, Containerd y Docker son casi compatibles en su uso.

Sigue el tutorial oficial para instalar lima con Homebrew y estarás listo para usarlo:

```sh
# Instalar
brew install lima

# Iniciar
limactl start
```

En este punto, puedes usar ``nerdctl`` para realizar varias operaciones con Containerd.

```sh
lima nerdctl run -d --name nginx -p 80:80 nginx:alpine
```

Como puedes ver, el uso de ``lima nerdctl`` es casi idéntico a ``docker``. Además de apagar el contenedor cuando hayas terminado, también puedes apagar el entorno virtualizado para ahorrar memoria:

```sh
limactl stop
```

lima también te permite configurar muchos detalles de virtualización y configurar múltiples entornos virtuales. Más detalles de uso se pueden encontrar en la documentación oficial: <https://github.com/lima-vm/lima>

## Colima

[Colima](https://github.com/abiosoft/colima) es un paquete basado en Lima, también software libre y de código abierto, pero utiliza Docker para su software de contenedores.

Colima también es muy simple de instalar y usar:

```sh
# Si no tienes un cliente docker instalado, necesitas instalarlo primero
brew install docker
# Instalar colima
brew install colima
```

Para usarlo, simplemente usa el comando `colima`.

```sh
colima start
```

Después de que se complete el inicio, puedes usar el comando `docker` normalmente, no se necesita configuración adicional.

También puedes apagar el entorno virtualizado cuando hayas terminado de usarlo: ``sh colima start

```sh
colima stop
```

## OrbStack

"OrbStack es una forma rápida, ligera y simple de ejecutar contenedores Docker y máquinas Linux en macOS. Puedes pensar en él como un WSL y Docker Desktop potenciados para macOS, todo en una aplicación fácil de usar." (Del sitio web oficial.)

OrbStack ofrece una interfaz gráfica para gestionar contenedores Docker y máquinas Linux en macOS. Así como una interfaz de línea de comandos.

Puedes descargar desde el sitio web oficial: <https://orbstack.dev/>, o usar Homebrew para instalar:

```sh
brew install --cask orbstack
```

```sh
Running `brew update --auto-update`...

...

...

==> Caveats
Open the OrbStack app to finish setup.

==> Downloading https://cdn-updates.orbstack.dev/arm64/OrbStack_v0.5.1_985_arm64.dmg
######################################################################## 100.0%
==> Installing Cask orbstack
==> Moving App 'OrbStack.app' to '/Applications/OrbStack.app'
🍺  orbstack was successfully installed!
```

Solo inicia OrbStack y podrás usar docker ahora.

![Captura de pantalla de OrbStack](/attachments/mac/how-to-use-docker-on-m1-mac/01.screenshot-orbstack.png)

## Resumen

- Docker no es fácil de usar para dispositivos Mac con chips Apple Silicon
- Docker Desktop For Mac está disponible, pero cobra a empresas medianas y grandes
- Lima & Colima son soluciones gratuitas y de código abierto
- OrbStack es una solución con interfaz gráfica