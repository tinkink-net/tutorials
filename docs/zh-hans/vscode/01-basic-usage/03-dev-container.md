# 利用 VS Code 中的 Dev Container 功能

## 什么是容器？

> 如果你熟悉容器或 Docker，可以跳过这一部分。

容器是一个轻量级、便携且自给自足的单元，可以在隔离环境中运行软件。

它将应用程序代码与其依赖项、库和配置文件打包在一起，确保它在不同的计算环境中一致运行。

容器建立在 Docker 等容器化技术之上，这些技术使开发人员能够轻松创建、部署和管理应用程序。

> "容器"一词通常与"Docker 容器"互换使用，因为 Docker 是最流行的容器化平台。

## 什么是 Dev Container？

Dev Container 是一种专为开发目的设计的特殊容器类型。它为开发人员提供了一个一致且隔离的工作环境，确保应用程序无论在哪里运行都表现相同。

它可以解决许多常见的开发问题，如依赖冲突、环境不一致和版本不匹配。通过使用 Dev Container，开发人员可以确保他们的开发环境是可复制和一致的，使与他人协作更容易，避免"在我的机器上可以运行"的问题。

## 使用 Dev Container 的好处

在开发工作流程中使用 Dev Container 提供了几个好处：

1. **一致的开发环境**：团队中的每个人都使用完全相同的环境，消除了"在我的机器上可以运行"的问题。

2. **隔离**：你的开发环境与本地系统隔离，防止不同项目或依赖版本之间的冲突。

3. **轻松入职**：新团队成员可以快速上手，无需花时间配置本地环境。

4. **可复制的构建**：开发环境被定义为代码，使其在不同机器上可复制。

5. **保持本地机器整洁**：保持本地机器整洁，因为所有特定于项目的依赖项都包含在容器内。

## 使用 Dev Container 的先决条件

在开始在 VS Code 中使用 Dev Container 之前，你需要确保已安装以下先决条件：

**Docker**

Dev Container 依赖 Docker 创建和管理容器环境。在使用 Dev Container 之前，你需要安装 Docker。

> 你可以从 [Docker 官方网站](https://www.docker.com/products/docker-desktop/) 选择 Docker Desktop（在 Windows 和 macOS 上）或 Docker Engine（在 Linux 上）。你也可以使用第三方 Docker 工具如 OrbStack，详情请参考 [在 Silicon 芯片 (M1/M2/M3) Mac 电脑上使用 Docker](/zh-hans/mac/how-to-use-docker-on-m1-mac.html)。

**VS Code**

确保你安装了最新版本的 Visual Studio Code。你可以从 [code.visualstudio.com](https://code.visualstudio.com/) 下载。

**Dev Containers 扩展**

从 VS Code Marketplace 安装 Dev Containers 扩展。

![安装 Dev Containers 扩展](/attachments/vscode/dev-container/01-extension.png)

## 如何在 VS Code 中使用 Dev Container：分步指南

要在 Visual Studio Code 中使用 Dev Container，首先打开你的项目，然后按照以下步骤操作：

**添加 Dev Container 配置**：

打开命令面板（`Ctrl`+`Shift`+`P` 或在 macOS 上使用 `Cmd`+`Shift`+`P`）并输入"Dev Containers: Add Development Container Configuration Files..."，然后选择"Add configuration to workspace"。

![添加 Dev Container 配置](/attachments/vscode/dev-container/02-add-config.png)

从列表中选择预定义的 Dev Container 配置。例如，如果你正在开发 Node.js 项目，选择"Node.js & TypeScript"。

![选择 Node.js 配置](/attachments/vscode/dev-container/03-select-nodejs.png)

然后根据你的项目需求选择镜像版本和其他选项，如果你不确定，可以使用默认选项。

之后，VS Code 将在你的工作区中创建一个 `.devcontainer` 文件夹，其中包含配置文件 `devcontainer.json`：

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

**在 Dev Container 中打开你的项目**：

你可以通过点击 VS Code 窗口左下角的"Open a remote window"按钮，然后选择"Reopen in Container"来打开 Dev Container。

![打开远程窗口](/attachments/vscode/dev-container/04-open-remote-window.png)

![在容器中重新打开](/attachments/vscode/dev-container/05-reopen-in-container.png)

或者，你可以打开命令面板（`Ctrl`+`Shift`+`P` 或在 macOS 上使用 `Cmd`+`Shift`+`P`）并输入"Dev Containers: Reopen in Container"。

然后你会看到一个进度条，表示 VS Code 正在构建 Dev Container 镜像并启动容器。你可以点击"Show Log"按钮查看构建日志。

![进度](/attachments/vscode/dev-container/06-progress.png)

如果一切顺利，你将看到一个连接到 Dev Container 的新 VS Code 窗口。在开始工作之前，你可能需要等待容器完成初始化（下载并安装必要的依赖项和扩展）。

![容器初始化](/attachments/vscode/dev-container/07-container-initializing.png)

一旦容器准备就绪，你就可以在容器内开始处理你的项目了。

## 常见问题排查

如果你遇到任何 Dev Container 问题，尝试以下排查步骤：

1. **验证 Docker 是否运行**：确保 Docker 已安装并在你的机器上运行。
2. **增加资源分配**：如果容器运行缓慢，尝试在 Docker Desktop 设置中增加 Docker 的内存和 CPU 分配。
3. **更新 VS Code 和扩展**：确保你使用的是最新版本的 VS Code 和 Dev Containers 扩展。
4. **检查网络设置**：如果你的容器需要访问网络资源，确保防火墙设置没有阻止连接。
5. **查看日志**：使用 Dev Containers 进度条中的"Show Log"按钮查看详细日志以进行故障排除。

## 结论

VS Code 中的 Dev Container 提供了一种强大的方式来创建一致、隔离的开发环境。通过利用容器技术，你可以确保你的开发环境在不同机器上是可复制的，并避免常见的环境相关问题。

无论你是在个人项目上工作还是与团队协作，Dev Container 都可以简化你的工作流程，使你更容易专注于编写代码而不是配置环境。
