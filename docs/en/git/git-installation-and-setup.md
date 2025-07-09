# Git Installation and Setup

Git is a distributed version control system that helps you track changes in your code, collaborate with others, and manage different versions of your projects. This tutorial will guide you through installing Git on different operating systems and setting up your initial configuration.

## What is Git?

Git is a powerful version control system that:
- Tracks changes in your files over time
- Allows you to revert to previous versions
- Enables collaboration with multiple developers
- Manages different versions (branches) of your project
- Works offline and synchronizes when connected

## Installing Git

### Windows

#### Option 1: Official Git for Windows
1. Visit [git-scm.com](https://git-scm.com/download/win)
2. Download the latest version for Windows
3. Run the installer and follow these recommended settings:
   - Choose "Use Git from the Windows Command Prompt"
   - Select "Checkout Windows-style, commit Unix-style line endings"
   - Choose "Use Windows' default console window"

#### Option 2: Using Package Manager (Chocolatey)
If you have Chocolatey installed:
```bash
choco install git
```

#### Option 3: Using Package Manager (Scoop)
If you have Scoop installed:
```bash
scoop install git
```

### macOS

#### Option 1: Using Homebrew (Recommended)
```bash
brew install git
```

#### Option 2: Using MacPorts
```bash
sudo port install git
```

#### Option 3: Xcode Command Line Tools
```bash
xcode-select --install
```

#### Option 4: Official Installer
1. Visit [git-scm.com](https://git-scm.com/download/mac)
2. Download the macOS installer
3. Run the installer and follow the instructions

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

## Verifying Installation

After installation, verify Git is installed correctly:

```bash
git --version
```

You should see output similar to:
```
git version 2.39.0
```

## Initial Git Configuration

Before using Git, you need to configure your identity. This information will be attached to your commits.

### Setting Your Identity

Configure your name and email address:

```bash
git config --global user.name "Your Full Name"
git config --global user.email "your.email@example.com"
```

Example:
```bash
git config --global user.name "John Doe"
git config --global user.email "john.doe@example.com"
```

### Setting Your Default Editor

Configure your preferred text editor for Git operations:

```bash
# For Visual Studio Code
git config --global core.editor "code --wait"

# For Vim
git config --global core.editor "vim"

# For Nano
git config --global core.editor "nano"

# For Sublime Text
git config --global core.editor "subl -n -w"
```

### Setting Default Branch Name

Set the default branch name for new repositories:

```bash
git config --global init.defaultBranch main
```

### Configuring Line Endings

#### Windows
```bash
git config --global core.autocrlf true
```

#### macOS/Linux
```bash
git config --global core.autocrlf input
```

## Advanced Configuration Options

### Setting Up Aliases

Create shortcuts for common Git commands:

```bash
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual '!gitk'
```

### Configuring Push Behavior

Set the default push behavior:

```bash
git config --global push.default simple
```

### Setting Up Credential Storage

To avoid typing your password repeatedly:

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

## Viewing Your Configuration

To see all your Git configuration settings:

```bash
git config --list
```

To see a specific configuration value:

```bash
git config user.name
git config user.email
```

To see where a setting is defined:

```bash
git config --show-origin user.name
```

## Configuration File Locations

Git configuration is stored in three levels:

1. **System-wide**: `/etc/gitconfig` (affects all users)
2. **User-specific**: `~/.gitconfig` or `~/.config/git/config` (affects current user)
3. **Repository-specific**: `.git/config` (affects current repository only)

Each level overrides the previous one, so repository-specific settings take precedence.

## SSH Key Setup (Optional but Recommended)

For secure authentication with remote repositories like GitHub:

### Generate SSH Key
```bash
ssh-keygen -t ed25519 -C "your.email@example.com"
```

### Add SSH Key to SSH Agent
```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

### Copy Public Key
```bash
# macOS
pbcopy < ~/.ssh/id_ed25519.pub

# Linux
xclip -sel clip < ~/.ssh/id_ed25519.pub

# Windows
clip < ~/.ssh/id_ed25519.pub
```

Then add this public key to your GitHub/GitLab/Bitbucket account.

## Troubleshooting Common Issues

### Permission Denied Error
If you encounter permission issues:
```bash
sudo chown -R $(whoami) ~/.gitconfig
```

### HTTPS vs SSH
If you're having authentication issues, you might need to switch between HTTPS and SSH:
```bash
# Check current remote URL
git remote -v

# Change to SSH
git remote set-url origin git@github.com:username/repository.git

# Change to HTTPS
git remote set-url origin https://github.com/username/repository.git
```

### Certificate Issues
If you encounter SSL certificate errors:
```bash
git config --global http.sslVerify false
```

**Note**: Only use this as a temporary solution and re-enable SSL verification afterward.

## Next Steps

Now that you have Git installed and configured, you're ready to:
- Create your first Git repository
- Learn basic Git commands
- Start tracking changes in your projects
- Collaborate with others using Git

## Summary

In this tutorial, you learned how to:
- Install Git on Windows, macOS, and Linux
- Configure your Git identity and preferences
- Set up SSH keys for secure authentication
- Troubleshoot common installation issues
- Understand Git configuration hierarchy

Git is now ready to help you track changes, collaborate with others, and manage your code effectively. In the next tutorial, we'll explore Git basics and terminology to build your foundation.
