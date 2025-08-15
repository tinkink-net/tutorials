# Tmux Tutorial: Terminal Multiplexer for Linux

Tmux (Terminal Multiplexer) is a powerful tool that allows you to manage multiple terminal sessions within a single window. It's particularly useful for running long processes, organizing your workflow, and maintaining sessions that persist even after you disconnect from a server.

## What is Tmux?

Tmux is a terminal multiplexer, which means it allows you to run multiple terminal sessions within a single terminal window. Think of it as a window manager for your terminal - it enables you to create, access, and control multiple terminal sessions, each with multiple windows and panes.

The core concept behind tmux is the separation of the terminal (your terminal emulator like gnome-terminal, iTerm2, etc.) from the sessions running inside it. This separation provides powerful capabilities that would otherwise be impossible with a standard terminal.

## How Tmux Works

Tmux operates with a client-server architecture:

1. **Server**: When you first run a tmux command, a tmux server process starts in the background. This server manages all your sessions, windows, and panes.

2. **Sessions**: A session is an instance of tmux that can contain multiple windows. Each session is independent and can be attached to or detached from terminal clients.

3. **Client**: When you run tmux commands, you're actually creating client connections to the tmux server. These clients display what's happening in a session.

This architecture is what gives tmux its powerful persistence capabilities. Even if all clients disconnect, the server continues running, keeping your sessions alive.

## Why Use Tmux?

Tmux provides several key benefits that make it invaluable for terminal-based work:

### Persistent Sessions
One of tmux's most powerful features is session persistence. Your sessions continue running even when you disconnect from the terminal. This is particularly valuable when:
- Working on remote servers via SSH
- Running long processes that take hours to complete
- Getting disconnected unexpectedly from a terminal session

### Window and Pane Management
Tmux allows you to organize your terminal work efficiently:
- Create multiple windows within a single session (like browser tabs)
- Split windows into multiple panes for multitasking
- Resize and rearrange panes according to your needs
- Run multiple commands simultaneously in a structured layout

### Enhanced Productivity
Tmux significantly improves your terminal workflow:
- Switch between different projects or tasks without opening multiple terminal windows
- Maintain consistent work environments across terminal sessions
- Use keyboard shortcuts to navigate between windows and panes quickly
- Copy and paste text between panes and sessions

## Installing Tmux

Before using tmux, you'll need to install it:

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
# Using Homebrew
brew install tmux
```

## Basic Tmux Concepts

Understanding tmux's hierarchical structure is key to using it effectively:

- **Session**: The top-level container that can contain multiple windows. A session is what you attach to and detach from. Each session has a unique name and can be thought of as a project workspace.

- **Window**: Similar to a tab in a browser, a window exists within a session and can contain one or more panes. Each window has its own set of panes and can run different programs independently.

- **Pane**: A separate terminal view within a window. Panes allow you to run multiple programs side-by-side within the same window. You can split windows horizontally or vertically to create panes.

This three-level hierarchy (Session → Window → Pane) provides a powerful organizational system for your terminal work. For example, you might have a session for a web development project with multiple windows (one for code, one for logs, one for database), each with multiple panes (editor, terminal, output).

## Starting Tmux

There are several ways to start tmux, depending on your needs:

### Creating a New Session
To start a new unnamed tmux session:
```sh
tmux
```

This will open a new tmux session with a status bar at the bottom showing session information.

### Creating a Named Session
For better organization, especially when working on multiple projects, create named sessions:
```sh
tmux new -s session_name
```

Named sessions make it easier to identify and manage multiple sessions.

### Attaching to an Existing Session
To attach to an existing session:
```sh
tmux attach -t session_name
```

If you only have one session, you can simply use:
```sh
tmux attach
```

### Understanding the Status Bar
When you start tmux, you'll notice a status bar at the bottom of the terminal. This bar provides important information:
- Current session name
- Window list with the active window highlighted
- System information like time and date
- Hostname

The status bar is your main visual indicator of what's happening in tmux, and it can be customized to show additional information.

## Tmux Key Bindings

All tmux commands start with a prefix key. By default, this is `Ctrl+b`. After pressing the prefix key, you can press another key to execute a command.

For example, to create a new window, you would press `Ctrl+b` followed by `c`.

### Understanding the Prefix Key Mechanism

The prefix key mechanism is central to how tmux works. Since tmux runs inside a terminal, it needs a way to distinguish between:
1. Commands you want to send to programs running inside tmux
2. Commands you want to send to tmux itself

By requiring a prefix key before tmux commands, tmux can intercept those commands while still allowing all other keystrokes to pass through to your programs. This is why you can use vim, emacs, or any other terminal-based program normally inside tmux - tmux only captures the specific key combinations that begin with the prefix.

### Why Ctrl+b?

The default prefix key `Ctrl+b` was chosen because it's rarely used by other programs. However, many users change it to `Ctrl+a` (similar to GNU Screen) since it's easier to press with one hand.

### Command Mode

After pressing the prefix key, tmux enters command mode for a brief period (configurable) during which it waits for your command. If you press the wrong key or change your mind, you can press `Esc` or wait for the timeout to return to normal operation.

## Basic Tmux Commands

### Session Management
- `tmux new -s session_name` - Create a new session with a specific name
- `tmux ls` - List all sessions
- `tmux attach -t session_name` - Attach to an existing session
- `tmux kill-session -t session_name` - Kill a specific session

### Within a Tmux Session
- `Ctrl+b d` - Detach from the current session
- `Ctrl+b $` - Rename the current session
- `Ctrl+b s` - List all sessions and switch between them

### Window Management
- `Ctrl+b c` - Create a new window
- `Ctrl+b n` - Switch to the next window
- `Ctrl+b p` - Switch to the previous window
- `Ctrl+b w` - List all windows and select one
- `Ctrl+b ,` - Rename the current window
- `Ctrl+b &` - Close the current window

### Pane Management
- `Ctrl+b %` - Split the current pane vertically
- `Ctrl+b "` - Split the current pane horizontally
- `Ctrl+b o` - Switch between panes
- `Ctrl+b ;` - Switch to the last active pane
- `Ctrl+b x` - Close the current pane
- `Ctrl+b z` - Toggle pane zoom (maximize/minimize)
- `Ctrl+b {` - Move the current pane left
- `Ctrl+b }` - Move the current pane right

### Copy Mode
- `Ctrl+b [` - Enter copy mode
- Arrow keys or vim-style navigation (h,j,k,l) to move
- `Space` - Start selection
- `Enter` - Copy selection
- `Ctrl+b ]` - Paste copied text

## Practical Examples

### Example 1: Running a Long Process
One of the most common use cases for tmux is running long processes that need to continue even if you disconnect from the terminal.

1. Start a new named tmux session:
   ```sh
   tmux new -s long_process
   ```
   
   Creating a named session makes it easier to identify later.

2. Run your long process (e.g., a backup):
   ```sh
   tar -czf backup.tar.gz /home/user/data
   ```
   
   This process will run inside the tmux session.

3. If you need to disconnect:
   Press `Ctrl+b` then `d` to detach from the session.
   
   Detaching doesn't stop the process - it continues running in the background. This is the key mechanism that allows persistence.

4. Later, reattach to check on the process:
   ```sh
   tmux attach -t long_process
   ```
   
   When you reattach, you'll see the current state of your process exactly as it was when you left.

### Example 2: Organizing Your Development Work
Tmux excels at organizing complex workflows with multiple related tasks.

1. Start a new session for your project:
   ```sh
   tmux new -s project
   ```
   
   This creates a dedicated workspace for your project.

2. Create windows for different tasks:
   - Press `Ctrl+b c` to create a window for coding
   - Press `Ctrl+b c` again to create a window for logs
   - Press `Ctrl+b c` again to create a window for documentation
   
   Each window is like a tab, isolating different aspects of your work.

3. Within a window, split panes for multitasking:
   - Press `Ctrl+b %` to split vertically for editor and terminal
   - Press `Ctrl+b "` to split horizontally for output
   
   Panes allow you to see multiple related views simultaneously.

4. Navigate between your organized workspace:
   - Use `Ctrl+b n` and `Ctrl+b p` to switch between windows
   - Use `Ctrl+b o` to cycle between panes in the current window
   - Use `Ctrl+b w` to see a visual list of all windows

This organization allows you to maintain a consistent work environment for each project. When you return to your "project" session, everything is exactly as you left it.

### Example 3: Collaborative Session
Multiple users can attach to the same tmux session, enabling collaborative work:

1. User 1 creates a session:
   ```sh
   tmux new -s collaboration
   ```

2. User 2 (logged into the same system) attaches to the same session:
   ```sh
   tmux attach -t collaboration
   ```
   
Both users will see the same terminal, and actions by one user will be visible to the other. This is possible because tmux's client-server architecture allows multiple clients to connect to the same session.

## Customizing Tmux

Tmux is highly customizable through its configuration file `~/.tmux.conf`. This file is read when tmux starts and allows you to modify key bindings, appearance, behavior, and more.

### Understanding tmux Configuration

The tmux configuration file uses a simple syntax where each line is a command. Comments start with `#`. Here's a basic example with explanations:

```bash
# Set prefix key to Ctrl+a (like screen)
# This is often preferred as it's easier to press with one hand
unbind C-b          # Remove the default prefix key binding
set -g prefix C-a   # Set Ctrl+a as the new prefix key
bind C-a send-prefix # Allow Ctrl+a Ctrl+a to pass through to programs

# Enable mouse support
# With this enabled, you can click to select panes, resize panes, and scroll
set -g mouse on

# Set status bar style
# Customize the appearance of the status bar at the bottom
set -g status-style bg=black,fg=white

# Enable 256 color support
# This ensures programs inside tmux can display colors correctly
set -g default-terminal "screen-256color"

# Increase scrollback buffer
# This allows you to scroll up and see more history in each pane
set -g history-limit 10000

# Rebind pane switching to use vim-style keys
# This makes navigation more intuitive for vim users
bind h select-pane -L
bind j select-pane -D
bind k select-pane -U
bind l select-pane -R
```

### Applying Configuration Changes

After creating or modifying `~/.tmux.conf`, you have two options:

1. Restart tmux (which will end your sessions)
2. Reload the configuration in your existing tmux session:
   ```sh
   tmux source-file ~/.tmux.conf
   ```

The second option is preferred as it applies changes without disrupting your work. You can even bind a key to do this automatically:
```bash
# Reload config with prefix + r
bind r source-file ~/.tmux.conf
```

### Configuration Scope

Notice the `-g` flag in many configuration commands. This stands for "global" and means the setting applies to all sessions, windows, and panes. Without `-g`, settings only apply to the current session.

Configuration options can be set at different levels:
- Global (with `-g`): Applies everywhere
- Session: Applies to one session
- Window: Applies to one window
- Pane: Applies to one pane

## Summary

Tmux is an incredibly powerful tool for managing terminal sessions that operates on a client-server architecture, providing session persistence, window management, and pane organization. 

### Key Mechanisms

1. **Client-Server Architecture**: Tmux runs as a server process that manages sessions independently of terminal clients, enabling persistent sessions that survive disconnections.

2. **Hierarchical Organization**: The three-level structure (Session → Window → Pane) provides powerful organization for complex workflows.

3. **Prefix Key System**: The prefix key mechanism allows tmux to intercept commands while passing through all other keystrokes to programs running inside it.

4. **Detaching and Reattaching**: The ability to detach from sessions without stopping processes is what makes tmux invaluable for remote work and long-running tasks.

### Benefits

- **Persistence**: Never lose your work due to network issues or terminal closures
- **Organization**: Structure complex workflows with windows and panes
- **Collaboration**: Multiple users can view and interact with the same session
- **Resource Efficiency**: Run multiple terminals within a single terminal window
- **Productivity**: Navigate between tasks quickly with keyboard shortcuts

With practice, tmux can significantly improve your productivity when working in terminal environments. The initial learning curve is quickly rewarded by the efficiency gains of managing complex terminal workflows with ease.
