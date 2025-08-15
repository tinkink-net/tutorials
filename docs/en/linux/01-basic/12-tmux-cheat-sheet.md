# Tmux Cheat Sheet

<Validator lang="en" :platform-list="['Ubuntu 22.04','Debian 11.6','CentOS 7.9','MacOS 13.2']" date="2023-05-01" />

This cheat sheet provides a quick reference for the most commonly used tmux commands. All commands require the prefix key (by default `Ctrl+b`) to be pressed first, followed by the command key.

## Session Management

| Command | Description |
|---------|-------------|
| `tmux` | Start a new tmux session |
| `tmux new -s name` | Start a new named session |
| `tmux ls` | List all sessions |
| `tmux attach -t name` | Attach to a named session |
| `tmux kill-session -t name` | Kill a named session |
| `tmux kill-server` | Kill all sessions and the tmux server |

## Prefix Key Combinations

All the following commands require pressing the prefix key (`Ctrl+b` by default) first:

### Session Commands
| Key | Description |
|-----|-------------|
| `d` | Detach from current session |
| `s` | List sessions |
| `$` | Rename session |
| `(` | Switch to previous session |
| `)` | Switch to next session |

### Window Commands
| Key | Description |
|-----|-------------|
| `c` | Create new window |
| `n` | Next window |
| `p` | Previous window |
| `w` | List windows |
| `,` | Rename current window |
| `&` | Close current window |
| `0-9` | Switch to window number |

### Pane Commands
| Key | Description |
|-----|-------------|
| `%` | Split pane vertically |
| `"` | Split pane horizontally |
| `o` | Switch to next pane |
| `;` | Switch to last active pane |
| `x` | Close current pane |
| `z` | Toggle pane zoom |
| `{` | Move current pane left |
| `}` | Move current pane right |
| `space` | Toggle between pane layouts |
| `q` | Show pane numbers |
| `Up/Down/Left/Right` | Switch to pane in specified direction (with mouse mode) |

### Copy Mode
| Key | Description |
|-----|-------------|
| `[` | Enter copy mode |
| `]` | Paste copied text |
| `PgUp/PgDn` | Page up/down in copy mode |
| `/` | Search forward |
| `?` | Search backward |

## Advanced Pane Management

| Command | Description |
|---------|-------------|
| `Ctrl+b Ctrl+o` | Rotate panes forward |
| `Ctrl+b !` | Convert pane to window |
| `Ctrl+b Ctrl+Left/Right/Up/Down` | Resize pane |
| `Ctrl+b Alt+1` | Evenly distribute panes |
| `Ctrl+b q` | Show pane numbers (temporarily) |

## Copy Mode Navigation (Vim Style)

When in copy mode (`Ctrl+b [`), you can use vim-style navigation:

| Key | Description |
|-----|-------------|
| `h/j/k/l` | Move left/down/up/right |
| `w/W` | Move to next word/start of next word |
| `b/B` | Move to previous word/start of previous word |
| `0/^` | Move to beginning of line |
| `$` | Move to end of line |
| `H/M/L` | Move to top/middle/bottom of screen |
| `gg/G` | Move to top/bottom of buffer |
| `Ctrl+u/d` | Move half page up/down |
| `Ctrl+b/f` | Move page up/down |

## Copy Mode Operations

| Key | Description |
|-----|-------------|
| `Space` | Start selection |
| `Enter` | Copy selection |
| `Esc` | Clear selection |
| `v` | Start selecting in character mode |
| `V` | Start selecting in line mode |
| `Ctrl+v` | Start selecting in block mode |

## Customization Tips

### Change Prefix Key
To change the prefix key from `Ctrl+b` to `Ctrl+a` (like GNU Screen), add this to `~/.tmux.conf`:
```bash
unbind C-b
set -g prefix C-a
bind C-a send-prefix
```

### Enable Mouse Support
```bash
set -g mouse on
```

### Reload Configuration
After modifying `~/.tmux.conf`:
```sh
Ctrl+b : source-file ~/.tmux.conf
```

## Status Bar Customization

Common status bar customizations for `~/.tmux.conf`:

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

## Quick Reference Summary

- **Prefix key**: `Ctrl+b` (default)
- **Create session**: `tmux new -s session_name`
- **Detach**: `Ctrl+b d`
- **Reattach**: `tmux attach -t session_name`
- **New window**: `Ctrl+b c`
- **Split pane**: `Ctrl+b %` (vertical) or `Ctrl+b "` (horizontal)
- **Switch panes**: `Ctrl+b o` or arrow keys (with mouse mode)
- **Copy mode**: `Ctrl+b [`
- **Paste**: `Ctrl+b ]`

This cheat sheet covers the most essential tmux commands. With these, you'll be able to efficiently manage multiple terminal sessions and workflows.
