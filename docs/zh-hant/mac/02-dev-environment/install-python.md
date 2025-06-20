# 如何在 macOS 上安裝 Python 並設置虛擬環境

<Validator lang="zh-hant" :platform-list="['macOS 14.2.1']" date="2025-06-20" />

Python 是一種多功能的高級程式語言，廣泛用於網路開發、資料科學、自動化、人工智慧等領域。雖然 macOS 預裝了 Python，但有充分的理由安裝和管理自己的 Python 版本。

## macOS 上的原生 Python

macOS 預裝了 Python，但關於這個系統 Python，有一些重要的事項需要了解：

```sh
# 檢查系統 Python 版本
python3 --version
# 輸出：Python 3.9.6（或類似版本，取決於你的 macOS 版本）

# 檢查安裝位置
which python3
# 輸出：/usr/bin/python3
```

系統 Python 主要用於 macOS 的內部使用，有幾個限制：

- **版本過時**：系統 Python 通常比最新版本落後幾個版本
- **權限有限**：全局安裝包需要 `sudo` 權限，可能會破壞系統功能
- **無法切換版本**：你只能使用 Apple 提供的版本
- **潛在衝突**：系統更新可能會修改或替換 Python 安裝

## 為什麼要安裝另一個 Python？

安裝自己的 Python 發行版有幾個優勢：

1. **最新版本**：可以訪問最新的 Python 功能和安全更新
2. **多版本**：可以為不同專案安裝和切換不同的 Python 版本
3. **安全的包管理**：安裝包不會影響系統 Python
4. **更好的開發體驗**：完全控制你的 Python 環境
5. **一致的部署**：使開發環境與生產系統匹配

## 最佳實踐：使用 uv

[uv](https://github.com/astral-sh/uv) 是一個用 Rust 編寫的極速 Python 包和專案管理器。它旨在替代多種工具，包括 `pip`、`pip-tools`、`pipx`、`poetry`、`pyenv`、`virtualenv` 等。以下是推薦選擇 uv 的原因：

- **🚀 單一工具**：用一個統一的界面替代多個 Python 工具
- **⚡️ 速度**：比傳統工具如 `pip` 快 10-100 倍
- **🐍 Python 管理**：無縫安裝和管理 Python 版本
- **🗂️ 專案管理**：使用通用鎖文件進行全面的專案管理
- **🔩 熟悉的界面**：包含與 pip 兼容的界面，便於遷移

### 安裝 uv

在 macOS 上安裝 uv 最簡單的方法是使用官方安裝程序：

```sh
curl -LsSf https://astral.sh/uv/install.sh | sh
```

或者，你可以使用 Homebrew 安裝：

```sh
brew install uv
```

如果你已經安裝了 Python 和 pip：

```sh
pip install uv
```

安裝後，重啟終端或運行：

```sh
source ~/.zshrc
```

### 使用 uv 安裝 Python

一旦安裝了 uv，你可以輕鬆安裝 Python 版本：

```sh
# 安裝最新的 Python 版本
uv python install

# 安裝特定的 Python 版本
uv python install 3.12
uv python install 3.11
uv python install 3.10

# 列出可用的 Python 版本
uv python list
```

你還可以為系統設置默認的 Python 版本：

```sh
# 將 Python 3.12 設為默認
uv python pin 3.12
```

## 理解虛擬環境

虛擬環境是一個隔離的 Python 環境，允許你為特定專案安裝包，而不會影響其他專案或系統 Python。可以將其視為每個專案的單獨"沙盒"。

### 為什麼需要虛擬環境

1. **依賴隔離**：不同專案可以使用同一包的不同版本
2. **乾淨的開發**：避免專案依賴之間的衝突
3. **可重現的構建**：確保不同機器上環境的一致性
4. **輕鬆清理**：刪除虛擬環境不會影響其他專案
5. **權限管理**：安裝包無需管理員權限

例如，專案 A 可能需要 Django 4.0，而專案 B 需要 Django 5.0。沒有虛擬環境，這些會產生衝突。

## 使用 uv 設置虛擬環境

uv 使虛擬環境管理變得非常簡單和快速。

### 創建新專案

最簡單的方法是從新專案開始：

```sh
# 創建一個新的 Python 專案
uv init my-project
cd my-project

# 這會自動創建一個虛擬環境和基本專案結構
```

### 處理現有專案

對於現有專案，你可以創建和管理虛擬環境：

```sh
# 在當前目錄創建虛擬環境
uv venv

# 使用特定 Python 版本創建虛擬環境
uv venv --python 3.12

# 在自定義位置創建虛擬環境
uv venv my-custom-env
```

### 激活虛擬環境

```sh
# 激活虛擬環境（傳統方式）
source .venv/bin/activate

# 或使用 uv 的內置命令運行器（推薦）
uv run python --version
uv run python script.py
```

### 安裝包

```sh
# 向專案添加包（自動管理虛擬環境）
uv add requests
uv add django==5.0

# 安裝開發依賴
uv add --dev pytest black ruff

# 從 requirements.txt 安裝
uv pip install -r requirements.txt

# 在虛擬環境中運行命令
uv run python -m django startproject mysite
```

### 管理依賴

uv 自動創建和維護 `pyproject.toml` 文件和 `uv.lock` 文件：

```sh
# 同步依賴（根據鎖文件安裝/更新包）
uv sync

# 更新所有依賴
uv lock --upgrade

# 顯示已安裝的包
uv pip list
```

### 工作流示例

以下是設置新 Python 專案的完整示例：

```sh
# 創建新專案
uv init data-analysis-project
cd data-analysis-project

# 添加依賴
uv add pandas numpy matplotlib jupyter

# 創建 Python 腳本
echo "import pandas as pd; print('Hello Python!')" > analysis.py

# 運行腳本
uv run python analysis.py

# 啟動 Jupyter notebook
uv run jupyter notebook
```

## 替代安裝方法

雖然 uv 是推薦的方法，但這裡還有其他流行的方法：

### 選項 1：官方 Python 安裝程序

從 [python.org](https://www.python.org/downloads/) 下載。這會全局安裝 Python，但不提供版本管理。

### 選項 2：Homebrew

```sh
brew install python@3.12
```

### 選項 3：pyenv（傳統版本管理器）

```sh
# 安裝 pyenv
brew install pyenv

# 安裝 Python 版本
pyenv install 3.12.0
pyenv global 3.12.0
```

然而，uv 通常比這些替代方案更快、更全面。

## 總結

- macOS 自帶 Python，但為了開發最好安裝自己的版本
- **uv 是在 macOS 上推薦的 Python 和包管理工具**
- 虛擬環境對於隔離專案依賴至關重要
- uv 通過單一、快速的工具簡化了整個 Python 開發工作流
- 使用 `uv init` 開始新專案，並用 `uv add` 管理依賴

使用 uv，你可以獲得現代、快速且全面的 Python 開發體驗，它在一個工具中處理從 Python 安裝到專案管理的所有內容。