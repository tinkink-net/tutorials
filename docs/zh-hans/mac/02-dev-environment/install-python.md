# 如何在 macOS 上安装 Python 并设置虚拟环境

<Validator lang="zh-hans" :platform-list="['macOS 14.2.1']" date="2025-06-20" />

Python 是一种多功能的高级编程语言，广泛用于网络开发、数据科学、自动化、人工智能等领域。虽然 macOS 预装了 Python，但有充分的理由安装和管理自己的 Python 版本。

## macOS 上的原生 Python

macOS 预装了 Python，但关于这个系统 Python，有一些重要的事项需要了解：

```sh
# 检查系统 Python 版本
python3 --version
# 输出：Python 3.9.6（或类似版本，取决于你的 macOS 版本）

# 检查安装位置
which python3
# 输出：/usr/bin/python3
```

系统 Python 主要用于 macOS 的内部使用，有几个限制：

- **版本过时**：系统 Python 通常比最新版本落后几个版本
- **权限有限**：全局安装包需要 `sudo` 权限，可能会破坏系统功能
- **无法切换版本**：你只能使用 Apple 提供的版本
- **潜在冲突**：系统更新可能会修改或替换 Python 安装

## 为什么要安装另一个 Python？

安装自己的 Python 发行版有几个优势：

1. **最新版本**：可以访问最新的 Python 功能和安全更新
2. **多版本**：可以为不同项目安装和切换不同的 Python 版本
3. **安全的包管理**：安装包不会影响系统 Python
4. **更好的开发体验**：完全控制你的 Python 环境
5. **一致的部署**：使开发环境与生产系统匹配

## 最佳实践：使用 uv

[uv](https://github.com/astral-sh/uv) 是一个用 Rust 编写的极速 Python 包和项目管理器。它旨在替代多种工具，包括 `pip`、`pip-tools`、`pipx`、`poetry`、`pyenv`、`virtualenv` 等。以下是推荐选择 uv 的原因：

- **🚀 单一工具**：用一个统一的界面替代多个 Python 工具
- **⚡️ 速度**：比传统工具如 `pip` 快 10-100 倍
- **🐍 Python 管理**：无缝安装和管理 Python 版本
- **🗂️ 项目管理**：使用通用锁文件进行全面的项目管理
- **🔩 熟悉的界面**：包含与 pip 兼容的界面，便于迁移

### 安装 uv

在 macOS 上安装 uv 最简单的方法是使用官方安装程序：

```sh
curl -LsSf https://astral.sh/uv/install.sh | sh
```

或者，你可以使用 Homebrew 安装：

```sh
brew install uv
```

如果你已经安装了 Python 和 pip：

```sh
pip install uv
```

安装后，重启终端或运行：

```sh
source ~/.zshrc
```

### 使用 uv 安装 Python

一旦安装了 uv，你可以轻松安装 Python 版本：

```sh
# 安装最新的 Python 版本
uv python install

# 安装特定的 Python 版本
uv python install 3.12
uv python install 3.11
uv python install 3.10

# 列出可用的 Python 版本
uv python list
```

你还可以为系统设置默认的 Python 版本：

```sh
# 将 Python 3.12 设为默认
uv python pin 3.12
```

## 理解虚拟环境

虚拟环境是一个隔离的 Python 环境，允许你为特定项目安装包，而不会影响其他项目或系统 Python。可以将其视为每个项目的单独"沙盒"。

### 为什么需要虚拟环境

1. **依赖隔离**：不同项目可以使用同一包的不同版本
2. **干净的开发**：避免项目依赖之间的冲突
3. **可重现的构建**：确保不同机器上环境的一致性
4. **轻松清理**：删除虚拟环境不会影响其他项目
5. **权限管理**：安装包无需管理员权限

例如，项目 A 可能需要 Django 4.0，而项目 B 需要 Django 5.0。没有虚拟环境，这些会产生冲突。

## 使用 uv 设置虚拟环境

uv 使虚拟环境管理变得非常简单和快速。

### 创建新项目

最简单的方法是从新项目开始：

```sh
# 创建一个新的 Python 项目
uv init my-project
cd my-project

# 这会自动创建一个虚拟环境和基本项目结构
```

### 处理现有项目

对于现有项目，你可以创建和管理虚拟环境：

```sh
# 在当前目录创建虚拟环境
uv venv

# 使用特定 Python 版本创建虚拟环境
uv venv --python 3.12

# 在自定义位置创建虚拟环境
uv venv my-custom-env
```

### 激活虚拟环境

```sh
# 激活虚拟环境（传统方式）
source .venv/bin/activate

# 或使用 uv 的内置命令运行器（推荐）
uv run python --version
uv run python script.py
```

### 安装包

```sh
# 向项目添加包（自动管理虚拟环境）
uv add requests
uv add django==5.0

# 安装开发依赖
uv add --dev pytest black ruff

# 从 requirements.txt 安装
uv pip install -r requirements.txt

# 在虚拟环境中运行命令
uv run python -m django startproject mysite
```

### 管理依赖

uv 自动创建和维护 `pyproject.toml` 文件和 `uv.lock` 文件：

```sh
# 同步依赖（根据锁文件安装/更新包）
uv sync

# 更新所有依赖
uv lock --upgrade

# 显示已安装的包
uv pip list
```

### 工作流示例

以下是设置新 Python 项目的完整示例：

```sh
# 创建新项目
uv init data-analysis-project
cd data-analysis-project

# 添加依赖
uv add pandas numpy matplotlib jupyter

# 创建 Python 脚本
echo "import pandas as pd; print('Hello Python!')" > analysis.py

# 运行脚本
uv run python analysis.py

# 启动 Jupyter notebook
uv run jupyter notebook
```

## 替代安装方法

虽然 uv 是推荐的方法，但这里还有其他流行的方法：

### 选项 1：官方 Python 安装程序

从 [python.org](https://www.python.org/downloads/) 下载。这会全局安装 Python，但不提供版本管理。

### 选项 2：Homebrew

```sh
brew install python@3.12
```

### 选项 3：pyenv（传统版本管理器）

```sh
# 安装 pyenv
brew install pyenv

# 安装 Python 版本
pyenv install 3.12.0
pyenv global 3.12.0
```

然而，uv 通常比这些替代方案更快、更全面。

## 总结

- macOS 自带 Python，但为了开发最好安装自己的版本
- **uv 是在 macOS 上推荐的 Python 和包管理工具**
- 虚拟环境对于隔离项目依赖至关重要
- uv 通过单一、快速的工具简化了整个 Python 开发工作流
- 使用 `uv init` 开始新项目，并用 `uv add` 管理依赖

使用 uv，你可以获得现代、快速且全面的 Python 开发体验，它在一个工具中处理从 Python 安装到项目管理的所有内容。