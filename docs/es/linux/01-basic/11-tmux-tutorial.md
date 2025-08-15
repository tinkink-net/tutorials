# Tutorial de Tmux: Multiplexor de Terminal para Linux

Tmux (Terminal Multiplexer) es una herramienta poderosa que te permite gestionar múltiples sesiones de terminal dentro de una sola ventana. Es particularmente útil para ejecutar procesos largos, organizar tu flujo de trabajo y mantener sesiones que persisten incluso después de desconectarte de un servidor.

## ¿Qué es Tmux?

Tmux es un multiplexor de terminal, lo que significa que te permite ejecutar múltiples sesiones de terminal dentro de una sola ventana de terminal. Piensa en él como un gestor de ventanas para tu terminal - te permite crear, acceder y controlar múltiples sesiones de terminal, cada una con múltiples ventanas y paneles.

El concepto central detrás de tmux es la separación de la terminal (tu emulador de terminal como gnome-terminal, iTerm2, etc.) de las sesiones que se ejecutan dentro de ella. Esta separación proporciona capacidades poderosas que de otro modo serían imposibles con una terminal estándar.

## Cómo funciona Tmux

Tmux opera con una arquitectura cliente-servidor:

1. **Servidor**: Cuando ejecutas un comando tmux por primera vez, se inicia un proceso servidor de tmux en segundo plano. Este servidor gestiona todas tus sesiones, ventanas y paneles.

2. **Sesiones**: Una sesión es una instancia de tmux que puede contener múltiples ventanas. Cada sesión es independiente y puede ser conectada o desconectada de los clientes de terminal.

3. **Cliente**: Cuando ejecutas comandos tmux, en realidad estás creando conexiones de cliente al servidor tmux. Estos clientes muestran lo que está sucediendo en una sesión.

Esta arquitectura es lo que le da a tmux sus poderosas capacidades de persistencia. Incluso si todos los clientes se desconectan, el servidor continúa ejecutándose, manteniendo tus sesiones activas.

## ¿Por qué usar Tmux?

Tmux proporciona varios beneficios clave que lo hacen invaluable para el trabajo basado en terminal:

### Sesiones Persistentes
Una de las características más poderosas de tmux es la persistencia de sesión. Tus sesiones continúan ejecutándose incluso cuando te desconectas de la terminal. Esto es particularmente valioso cuando:
- Trabajas en servidores remotos a través de SSH
- Ejecutas procesos largos que tardan horas en completarse
- Te desconectas inesperadamente de una sesión de terminal

### Gestión de Ventanas y Paneles
Tmux te permite organizar tu trabajo en terminal de manera eficiente:
- Crear múltiples ventanas dentro de una sola sesión (como pestañas de navegador)
- Dividir ventanas en múltiples paneles para multitarea
- Redimensionar y reorganizar paneles según tus necesidades
- Ejecutar múltiples comandos simultáneamente en un diseño estructurado

### Productividad Mejorada
Tmux mejora significativamente tu flujo de trabajo en terminal:
- Cambiar entre diferentes proyectos o tareas sin abrir múltiples ventanas de terminal
- Mantener entornos de trabajo consistentes a través de sesiones de terminal
- Usar atajos de teclado para navegar rápidamente entre ventanas y paneles
- Copiar y pegar texto entre paneles y sesiones

## Instalando Tmux

Antes de usar tmux, necesitarás instalarlo:

### Ubuntu/Debian:
```sh
sudo apt update
sudo apt install tmux
```

### CentOS/RHEL/Fedora:
```sh
# CentOS/RHEL
sudo yum install tmux

# Fedora
sudo dnf install tmux
```

### macOS:
```sh
# Usando Homebrew
brew install tmux
```

## Conceptos Básicos de Tmux

Entender la estructura jerárquica de tmux es clave para usarlo efectivamente:

- **Sesión**: El contenedor de nivel superior que puede contener múltiples ventanas. Una sesión es a lo que te conectas y desconectas. Cada sesión tiene un nombre único y puede considerarse como un espacio de trabajo de proyecto.

- **Ventana**: Similar a una pestaña en un navegador, una ventana existe dentro de una sesión y puede contener uno o más paneles. Cada ventana tiene su propio conjunto de paneles y puede ejecutar diferentes programas de forma independiente.

- **Panel**: Una vista de terminal separada dentro de una ventana. Los paneles te permiten ejecutar múltiples programas lado a lado dentro de la misma ventana. Puedes dividir ventanas horizontal o verticalmente para crear paneles.

Esta jerarquía de tres niveles (Sesión → Ventana → Panel) proporciona un poderoso sistema organizativo para tu trabajo en terminal. Por ejemplo, podrías tener una sesión para un proyecto de desarrollo web con múltiples ventanas (una para código, una para logs, una para base de datos), cada una con múltiples paneles (editor, terminal, salida).

## Iniciando Tmux

Hay varias formas de iniciar tmux, dependiendo de tus necesidades:

### Creando una Nueva Sesión
Para iniciar una nueva sesión tmux sin nombre:
```sh
tmux
```

Esto abrirá una nueva sesión tmux con una barra de estado en la parte inferior mostrando información de la sesión.

### Creando una Sesión con Nombre
Para una mejor organización, especialmente cuando trabajas en múltiples proyectos, crea sesiones con nombre:
```sh
tmux new -s nombre_sesion
```

Las sesiones con nombre facilitan la identificación y gestión de múltiples sesiones.

### Conectándose a una Sesión Existente
Para conectarte a una sesión existente:
```sh
tmux attach -t nombre_sesion
```

Si solo tienes una sesión, puedes simplemente usar:
```sh
tmux attach
```

### Entendiendo la Barra de Estado
Cuando inicias tmux, notarás una barra de estado en la parte inferior de la terminal. Esta barra proporciona información importante:
- Nombre de la sesión actual
- Lista de ventanas con la ventana activa resaltada
- Información del sistema como hora y fecha
- Nombre del host

La barra de estado es tu principal indicador visual de lo que está sucediendo en tmux, y puede ser personalizada para mostrar información adicional.

## Combinaciones de Teclas en Tmux

Todos los comandos de tmux comienzan con una tecla prefijo. Por defecto, esta es `Ctrl+b`. Después de presionar la tecla prefijo, puedes presionar otra tecla para ejecutar un comando.

Por ejemplo, para crear una nueva ventana, presionarías `Ctrl+b` seguido de `c`.

### Entendiendo el Mecanismo de Tecla Prefijo

El mecanismo de tecla prefijo es central para el funcionamiento de tmux. Como tmux se ejecuta dentro de una terminal, necesita una forma de distinguir entre:
1. Comandos que quieres enviar a programas ejecutándose dentro de tmux
2. Comandos que quieres enviar a tmux mismo

Al requerir una tecla prefijo antes de los comandos de tmux, tmux puede interceptar esos comandos mientras permite que todas las demás pulsaciones de teclas pasen a tus programas. Por eso puedes usar vim, emacs o cualquier otro programa basado en terminal normalmente dentro de tmux - tmux solo captura las combinaciones de teclas específicas que comienzan con el prefijo.

### ¿Por qué Ctrl+b?

La tecla prefijo predeterminada `Ctrl+b` fue elegida porque rara vez es utilizada por otros programas. Sin embargo, muchos usuarios la cambian a `Ctrl+a` (similar a GNU Screen) ya que es más fácil de presionar con una mano.

### Modo Comando

Después de presionar la tecla prefijo, tmux entra en modo comando por un breve período (configurable) durante el cual espera tu comando. Si presionas la tecla incorrecta o cambias de opinión, puedes presionar `Esc` o esperar el tiempo de espera para volver a la operación normal.

## Comandos Básicos de Tmux

### Gestión de Sesiones
- `tmux new -s nombre_sesion` - Crear una nueva sesión con un nombre específico
- `tmux ls` - Listar todas las sesiones
- `tmux attach -t nombre_sesion` - Conectarse a una sesión existente
- `tmux kill-session -t nombre_sesion` - Terminar una sesión específica

### Dentro de una Sesión Tmux
- `Ctrl+b d` - Desconectarse de la sesión actual
- `Ctrl+b $` - Renombrar la sesión actual
- `Ctrl+b s` - Listar todas las sesiones y cambiar entre ellas

### Gestión de Ventanas
- `Ctrl+b c` - Crear una nueva ventana
- `Ctrl+b n` - Cambiar a la siguiente ventana
- `Ctrl+b p` - Cambiar a la ventana anterior
- `Ctrl+b w` - Listar todas las ventanas y seleccionar una
- `Ctrl+b ,` - Renombrar la ventana actual
- `Ctrl+b &` - Cerrar la ventana actual

### Gestión de Paneles
- `Ctrl+b %` - Dividir el panel actual verticalmente
- `Ctrl+b "` - Dividir el panel actual horizontalmente
- `Ctrl+b o` - Cambiar entre paneles
- `Ctrl+b ;` - Cambiar al último panel activo
- `Ctrl+b x` - Cerrar el panel actual
- `Ctrl+b z` - Alternar zoom del panel (maximizar/minimizar)
- `Ctrl+b {` - Mover el panel actual a la izquierda
- `Ctrl+b }` - Mover el panel actual a la derecha

### Modo Copia
- `Ctrl+b [` - Entrar en modo copia
- Teclas de flecha o navegación estilo vim (h,j,k,l) para moverse
- `Espacio` - Iniciar selección
- `Enter` - Copiar selección
- `Ctrl+b ]` - Pegar texto copiado

## Ejemplos Prácticos

### Ejemplo 1: Ejecutando un Proceso Largo
Uno de los casos de uso más comunes para tmux es ejecutar procesos largos que necesitan continuar incluso si te desconectas de la terminal.

1. Inicia una nueva sesión tmux con nombre:
   ```sh
   tmux new -s proceso_largo
   ```
   
   Crear una sesión con nombre facilita su identificación posterior.

2. Ejecuta tu proceso largo (por ejemplo, una copia de seguridad):
   ```sh
   tar -czf backup.tar.gz /home/user/data
   ```
   
   Este proceso se ejecutará dentro de la sesión tmux.

3. Si necesitas desconectarte:
   Presiona `Ctrl+b` y luego `d` para desconectarte de la sesión.
   
   Desconectarse no detiene el proceso - continúa ejecutándose en segundo plano. Este es el mecanismo clave que permite la persistencia.

4. Más tarde, reconéctate para verificar el proceso:
   ```sh
   tmux attach -t proceso_largo
   ```
   
   Cuando te reconectes, verás el estado actual de tu proceso exactamente como estaba cuando lo dejaste.

### Ejemplo 2: Organizando Tu Trabajo de Desarrollo
Tmux sobresale en la organización de flujos de trabajo complejos con múltiples tareas relacionadas.

1. Inicia una nueva sesión para tu proyecto:
   ```sh
   tmux new -s proyecto
   ```
   
   Esto crea un espacio de trabajo dedicado para tu proyecto.

2. Crea ventanas para diferentes tareas:
   - Presiona `Ctrl+b c` para crear una ventana para codificar
   - Presiona `Ctrl+b c` nuevamente para crear una ventana para logs
   - Presiona `Ctrl+b c` nuevamente para crear una ventana para documentación
   
   Cada ventana es como una pestaña, aislando diferentes aspectos de tu trabajo.

3. Dentro de una ventana, divide paneles para multitarea:
   - Presiona `Ctrl+b %` para dividir verticalmente para editor y terminal
   - Presiona `Ctrl+b "` para dividir horizontalmente para salida
   
   Los paneles te permiten ver múltiples vistas relacionadas simultáneamente.

4. Navega entre tu espacio de trabajo organizado:
   - Usa `Ctrl+b n` y `Ctrl+b p` para cambiar entre ventanas
   - Usa `Ctrl+b o` para ciclar entre paneles en la ventana actual
   - Usa `Ctrl+b w` para ver una lista visual de todas las ventanas

Esta organización te permite mantener un entorno de trabajo consistente para cada proyecto. Cuando regresas a tu sesión "proyecto", todo está exactamente como lo dejaste.

### Ejemplo 3: Sesión Colaborativa
Múltiples usuarios pueden conectarse a la misma sesión tmux, permitiendo trabajo colaborativo:

1. Usuario 1 crea una sesión:
   ```sh
   tmux new -s colaboracion
   ```

2. Usuario 2 (conectado al mismo sistema) se conecta a la misma sesión:
   ```sh
   tmux attach -t colaboracion
   ```
   
Ambos usuarios verán la misma terminal, y las acciones de un usuario serán visibles para el otro. Esto es posible porque la arquitectura cliente-servidor de tmux permite que múltiples clientes se conecten a la misma sesión.

## Personalizando Tmux

Tmux es altamente personalizable a través de su archivo de configuración `~/.tmux.conf`. Este archivo se lee cuando tmux inicia y te permite modificar combinaciones de teclas, apariencia, comportamiento y más.

### Entendiendo la Configuración de tmux

El archivo de configuración de tmux usa una sintaxis simple donde cada línea es un comando. Los comentarios comienzan con `#`. Aquí hay un ejemplo básico con explicaciones:

```bash
# Establecer tecla prefijo a Ctrl+a (como screen)
# Esto a menudo se prefiere ya que es más fácil de presionar con una mano
unbind C-b          # Eliminar la vinculación de tecla prefijo predeterminada
set -g prefix C-a   # Establecer Ctrl+a como la nueva tecla prefijo
bind C-a send-prefix # Permitir que Ctrl+a Ctrl+a pase a los programas

# Habilitar soporte para ratón
# Con esto habilitado, puedes hacer clic para seleccionar paneles, redimensionar paneles y desplazarte
set -g mouse on

# Establecer estilo de barra de estado
# Personalizar la apariencia de la barra de estado en la parte inferior
set -g status-style bg=black,fg=white

# Habilitar soporte para 256 colores
# Esto asegura que los programas dentro de tmux puedan mostrar colores correctamente
set -g default-terminal "screen-256color"

# Aumentar buffer de desplazamiento
# Esto te permite desplazarte hacia arriba y ver más historial en cada panel
set -g history-limit 10000

# Reasignar cambio de panel para usar teclas estilo vim
# Esto hace que la navegación sea más intuitiva para usuarios de vim
bind h select-pane -L
bind j select-pane -D
bind k select-pane -U
bind l select-pane -R
```

### Aplicando Cambios de Configuración

Después de crear o modificar `~/.tmux.conf`, tienes dos opciones:

1. Reiniciar tmux (lo que terminará tus sesiones)
2. Recargar la configuración en tu sesión tmux existente:
   ```sh
   tmux source-file ~/.tmux.conf
   ```

La segunda opción es preferible ya que aplica cambios sin interrumpir tu trabajo. Incluso puedes vincular una tecla para hacer esto automáticamente:
```bash
# Recargar config con prefijo + r
bind r source-file ~/.tmux.conf
```

### Alcance de la Configuración

Observa la bandera `-g` en muchos comandos de configuración. Esto significa "global" y significa que la configuración se aplica a todas las sesiones, ventanas y paneles. Sin `-g`, las configuraciones solo se aplican a la sesión actual.

Las opciones de configuración pueden establecerse en diferentes niveles:
- Global (con `-g`): Se aplica en todas partes
- Sesión: Se aplica a una sesión
- Ventana: Se aplica a una ventana
- Panel: Se aplica a un panel

## Resumen

Tmux es una herramienta increíblemente poderosa para gestionar sesiones de terminal que opera en una arquitectura cliente-servidor, proporcionando persistencia de sesión, gestión de ventanas y organización de paneles.

### Mecanismos Clave

1. **Arquitectura Cliente-Servidor**: Tmux se ejecuta como un proceso servidor que gestiona sesiones independientemente de los clientes de terminal, permitiendo sesiones persistentes que sobreviven a desconexiones.

2. **Organización Jerárquica**: La estructura de tres niveles (Sesión → Ventana → Panel) proporciona una poderosa organización para flujos de trabajo complejos.

3. **Sistema de Tecla Prefijo**: El mecanismo de tecla prefijo permite a tmux interceptar comandos mientras pasa todas las demás pulsaciones de teclas a los programas que se ejecutan dentro de él.

4. **Desconexión y Reconexión**: La capacidad de desconectarse de sesiones sin detener procesos es lo que hace que tmux sea invaluable para trabajo remoto y tareas de larga duración.

### Beneficios

- **Persistencia**: Nunca pierdas tu trabajo debido a problemas de red o cierres de terminal
- **Organización**: Estructura flujos de trabajo complejos con ventanas y paneles
- **Colaboración**: Múltiples usuarios pueden ver e interactuar con la misma sesión
- **Eficiencia de Recursos**: Ejecuta múltiples terminales dentro de una sola ventana de terminal
- **Productividad**: Navega entre tareas rápidamente con atajos de teclado

Con práctica, tmux puede mejorar significativamente tu productividad cuando trabajas en entornos de terminal. La curva de aprendizaje inicial se ve rápidamente recompensada por las ganancias de eficiencia al gestionar flujos de trabajo complejos de terminal con facilidad.