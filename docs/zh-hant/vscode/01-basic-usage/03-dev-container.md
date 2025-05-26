# 利用 VS Code 中的 Dev Container 功能

## 什麼是容器？

> 如果你熟悉容器或 Docker，可以跳過這一部分。

容器是一個輕量級、便攜且自給自足的單元，可以在隔離環境中運行軟件。

它將應用程序代碼與其依賴項、庫和配置文件打包在一起，確保它在不同的計算環境中一致運行。

容器建立在 Docker 等容器化技術之上，這些技術使開發人員能夠輕鬆創建、部署和管理應用程序。

> "容器"一詞通常與"Docker 容器"互換使用，因為 Docker 是最流行的容器化平台。

## 什麼是 Dev Container？

Dev Container 是一種專為開發目的設計的特殊容器類型。它為開發人員提供了一個一致且隔離的工作環境，確保應用程序無論在哪裡運行都表現相同。

它可以解決許多常見的開發問題，如依賴衝突、環境不一致和版本不匹配。通過使用 Dev Container，開發人員可以確保他們的開發環境是可複製和一致的，使與他人協作更容易，避免"在我的機器上可以運行"的問題。

## 使用 Dev Container 的好處

在開發工作流程中使用 Dev Container 提供了幾個好處：

1. **一致的開發環境**：團隊中的每個人都使用完全相同的環境，消除了"在我的機器上可以運行"的問題。

2. **隔離**：你的開發環境與本地系統隔離，防止不同項目或依賴版本之間的衝突。

3. **輕鬆入職**：新團隊成員可以快速上手，無需花時間配置本地環境。

4. **可複製的構建**：開發環境被定義為代碼，使其在不同機器上可複製。

5. **保持本地機器整潔**：保持本地機器整潔，因為所有特定於項目的依賴項都包含在容器內。

## 使用 Dev Container 的先決條件

在開始在 VS Code 中使用 Dev Container 之前，你需要確保已安裝以下先決條件：

**Docker**

Dev Container 依賴 Docker 創建和管理容器環境。在使用 Dev Container 之前，你需要安裝 Docker。

> 你可以從 [Docker 官方網站](https://www.docker.com/products/docker-desktop/) 選擇 Docker Desktop（在 Windows 和 macOS 上）或 Docker Engine（在 Linux 上）。你也可以使用第三方 Docker 工具如 OrbStack，詳情請參考 [在 Silicon 芯片 (M1/M2/M3) Mac 電腦上使用 Docker](/en/mac/02-dev-environment/how-to-use-docker-on-m1-mac.md)。

**VS Code**

確保你安裝了最新版本的 Visual Studio Code。你可以從 [code.visualstudio.com](https://code.visualstudio.com/) 下載。

**Dev Containers 擴展**

從 VS Code Marketplace 安裝 Dev Containers 擴展。

![安裝 Dev Containers 擴展](/attachments/vscode/dev-container/01-extension.png)

## 如何在 VS Code 中使用 Dev Container：分步指南

要在 Visual Studio Code 中使用 Dev Container，首先打開你的項目，然後按照以下步驟操作：

**添加 Dev Container 配置**：

打開命令面板（`Ctrl`+`Shift`+`P` 或在 macOS 上使用 `Cmd`+`Shift`+`P`）並輸入"Dev Containers: Add Development Container Configuration Files..."，然後選擇"Add configuration to workspace"。

![添加 Dev Container 配置](/attachments/vscode/dev-container/02-add-config.png)

從列表中選擇預定義的 Dev Container 配置。例如，如果你正在開發 Node.js 項目，選擇"Node.js & TypeScript"。

![選擇 Node.js 配置](/attachments/vscode/dev-container/03-select-nodejs.png)

然後根據你的項目需求選擇鏡像版本和其他選項，如果你不確定，可以使用默認選項。

之後，VS Code 將在你的工作區中創建一個 `.devcontainer` 文件夾，其中包含配置文件 `devcontainer.json`：

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

**在 Dev Container 中打開你的項目**：

你可以通過點擊 VS Code 窗口左下角的"Open a remote window"按鈕，然後選擇"Reopen in Container"來打開 Dev Container。

![打開遠程窗口](/attachments/vscode/dev-container/04-open-remote-window.png)

![在容器中重新打開](/attachments/vscode/dev-container/05-reopen-in-container.png)

或者，你可以打開命令面板（`Ctrl`+`Shift`+`P` 或在 macOS 上使用 `Cmd`+`Shift`+`P`）並輸入"Dev Containers: Reopen in Container"。

然後你會看到一個進度條，表示 VS Code 正在構建 Dev Container 鏡像並啟動容器。你可以點擊"Show Log"按鈕查看構建日誌。

![進度](/attachments/vscode/dev-container/06-progress.png)

如果一切順利，你將看到一個連接到 Dev Container 的新 VS Code 窗口。在開始工作之前，你可能需要等待容器完成初始化（下載並安裝必要的依賴項和擴展）。

![容器初始化](/attachments/vscode/dev-container/07-container-initializing.png)

一旦容器準備就緒，你就可以在容器內開始處理你的項目了。

## 常見問題排查

如果你遇到任何 Dev Container 問題，嘗試以下排查步驟：

1. **驗證 Docker 是否運行**：確保 Docker 已安裝並在你的機器上運行。
2. **增加資源分配**：如果容器運行緩慢，嘗試在 Docker Desktop 設置中增加 Docker 的內存和 CPU 分配。
3. **更新 VS Code 和擴展**：確保你使用的是最新版本的 VS Code 和 Dev Containers 擴展。
4. **檢查網絡設置**：如果你的容器需要訪問網絡資源，確保防火牆設置沒有阻止連接。
5. **查看日誌**：使用 Dev Containers 進度條中的"Show Log"按鈕查看詳細日誌以進行故障排除。

## 結論

VS Code 中的 Dev Container 提供了一種強大的方式來創建一致、隔離的開發環境。通過利用容器技術，你可以確保你的開發環境在不同機器上是可複製的，並避免常見的環境相關問題。

無論你是在個人項目上工作還是與團隊協作，Dev Container 都可以簡化你的工作流程，使你更容易專注於編寫代碼而不是配置環境。