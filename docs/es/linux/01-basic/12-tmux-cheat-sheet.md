# Hoja de Trucos de Tmux

<Validator lang="es" :platform-list="['Ubuntu 22.04','Debian 11.6','CentOS 7.9','MacOS 13.2']" date="2023-05-01" />

Esta hoja de trucos proporciona una referencia rápida para los comandos más comúnmente utilizados de tmux. Todos los comandos requieren que se presione primero la tecla de prefijo (por defecto `Ctrl+b`), seguida de la tecla de comando.

## Gestión de Sesiones

| Comando | Descripción |
|---------|-------------|
| `tmux` | Iniciar una nueva sesión de tmux |
| `tmux new -s name` | Iniciar una nueva sesión con nombre |
| `tmux ls` | Listar todas las sesiones |
| `tmux attach -t name` | Conectarse a una sesión con nombre |
| `tmux kill-session -t name` | Matar una sesión con nombre |
| `tmux kill-server` | Matar todas las sesiones y el servidor tmux |

## Combinaciones de Teclas de Prefijo

Todos los siguientes comandos requieren presionar primero la tecla de prefijo (`Ctrl+b` por defecto):

### Comandos de Sesión
| Tecla | Descripción |
|-----|-------------|
| `d` | Desconectar de la sesión actual |
| `s` | Listar sesiones |
| `$` | Renombrar sesión |
| `(` | Cambiar a la sesión anterior |
| `)` | Cambiar a la siguiente sesión |

### Comandos de Ventana
| Tecla | Descripción |
|-----|-------------|
| `c` | Crear nueva ventana |
| `n` | Siguiente ventana |
| `p` | Ventana anterior |
| `w` | Listar ventanas |
| `,` | Renombrar ventana actual |
| `&` | Cerrar ventana actual |
| `0-9` | Cambiar a ventana por número |

### Comandos de Panel
| Tecla | Descripción |
|-----|-------------|
| `%` | Dividir panel verticalmente |
| `"` | Dividir panel horizontalmente |
| `o` | Cambiar al siguiente panel |
| `;` | Cambiar al último panel activo |
| `x` | Cerrar panel actual |
| `z` | Alternar zoom del panel |
| `{` | Mover panel actual a la izquierda |
| `}` | Mover panel actual a la derecha |
| `space` | Alternar entre diseños de panel |
| `q` | Mostrar números de panel |
| `Up/Down/Left/Right` | Cambiar al panel en la dirección especificada (con modo ratón) |

### Modo Copia
| Tecla | Descripción |
|-----|-------------|
| `[` | Entrar en modo copia |
| `]` | Pegar texto copiado |
| `PgUp/PgDn` | Página arriba/abajo en modo copia |
| `/` | Buscar hacia adelante |
| `?` | Buscar hacia atrás |

## Gestión Avanzada de Paneles

| Comando | Descripción |
|---------|-------------|
| `Ctrl+b Ctrl+o` | Rotar paneles hacia adelante |
| `Ctrl+b !` | Convertir panel en ventana |
| `Ctrl+b Ctrl+Left/Right/Up/Down` | Redimensionar panel |
| `Ctrl+b Alt+1` | Distribuir paneles uniformemente |
| `Ctrl+b q` | Mostrar números de panel (temporalmente) |

## Navegación en Modo Copia (Estilo Vim)

Cuando estás en modo copia (`Ctrl+b [`), puedes usar navegación estilo vim:

| Tecla | Descripción |
|-----|-------------|
| `h/j/k/l` | Mover izquierda/abajo/arriba/derecha |
| `w/W` | Mover a la siguiente palabra/inicio de la siguiente palabra |
| `b/B` | Mover a la palabra anterior/inicio de la palabra anterior |
| `0/^` | Mover al principio de la línea |
| `$` | Mover al final de la línea |
| `H/M/L` | Mover a la parte superior/media/inferior de la pantalla |
| `gg/G` | Mover al principio/final del buffer |
| `Ctrl+u/d` | Mover media página arriba/abajo |
| `Ctrl+b/f` | Mover página arriba/abajo |

## Operaciones en Modo Copia

| Tecla | Descripción |
|-----|-------------|
| `Space` | Iniciar selección |
| `Enter` | Copiar selección |
| `Esc` | Limpiar selección |
| `v` | Comenzar a seleccionar en modo carácter |
| `V` | Comenzar a seleccionar en modo línea |
| `Ctrl+v` | Comenzar a seleccionar en modo bloque |

## Consejos de Personalización

### Cambiar la Tecla de Prefijo
Para cambiar la tecla de prefijo de `Ctrl+b` a `Ctrl+a` (como GNU Screen), añade esto a `~/.tmux.conf`:
```bash
unbind C-b
set -g prefix C-a
bind C-a send-prefix
```

### Habilitar Soporte para Ratón
```bash
set -g mouse on
```

### Recargar Configuración
Después de modificar `~/.tmux.conf`:
```sh
Ctrl+b : source-file ~/.tmux.conf
```

## Personalización de la Barra de Estado

Personalizaciones comunes de la barra de estado para `~/.tmux.conf`:

```bash
# Change status bar colors
set -g status-style bg=blue,fg=white

# Show system stats
set -g status-right "#[fg=white,bg=black] #H #[fg=white,bg=blue] %H:%M %d-%b-%y "

# Show window list with better formatting
set -g status-justify centre
setw -g window-status-format "#I:#W#F"
setw -g window-status-current-format "#I:#W#F"
```

## Resumen de Referencia Rápida

- **Tecla de prefijo**: `Ctrl+b` (por defecto)
- **Crear sesión**: `tmux new -s nombre_sesion`
- **Desconectar**: `Ctrl+b d`
- **Reconectar**: `tmux attach -t nombre_sesion`
- **Nueva ventana**: `Ctrl+b c`
- **Dividir panel**: `Ctrl+b %` (vertical) o `Ctrl+b "` (horizontal)
- **Cambiar paneles**: `Ctrl+b o` o teclas de flecha (con modo ratón)
- **Modo copia**: `Ctrl+b [`
- **Pegar**: `Ctrl+b ]`

Esta hoja de trucos cubre los comandos más esenciales de tmux. Con estos, podrás gestionar eficientemente múltiples sesiones de terminal y flujos de trabajo.