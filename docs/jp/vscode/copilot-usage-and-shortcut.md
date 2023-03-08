# Github Copilotとショートカットの使い方

## Copilotとは

Copilot (<https://github.com/features/copilot/>) は、コーディング中にAI学習に基づいたコーディングの提案を行う、Githubが提供するAIコーディング支援です。多くの場合、コメントや関数名だけで完全なコードを生成することができます。

Copilotはもはや無料ではありません。価格は月額10ドルまたは年額100ドルです。しかし、2か月間は無料でお試しいただけます。Githubの設定ページ (<https://github.com/settings/copilot>) にアクセスして、アクセスを取得するためのボタンをクリックしてください。アクセスを取得したら、GithubでCopilotを使用できます。

![スクリーンショット](/attachments/vscode/copilot-usage-and-shortcut/01.website.png)

## プラグインのインストール

Copilotを使用するには、プラグインをインストールする必要があります。VSCodeのプラグインメニューで `Copilot` を検索して、プラグイン名が `Github Copilot` で、対応するプラグインマーケットプレイスのアドレスが <https://marketplace.visualstudio.com/items?itemName=GitHub.copilot> であるプラグインをインストールしてください。

![インストールのスクリーンショット](/attachments/vscode/copilot-usage-and-shortcut/02.install.png)

インストール後、プラグインはGithubのログインを促します。指示に従ってログインしてください。

指示に従ってログインしてください。

![ログインのスクリーンショット](/attachments/vscode/copilot-usage-and-shortcut/03.login.png)

## 使用方法

通常の使用では、Copilotが提案を行うと、提案されたコードがカーソル位置の後ろに表示され、グレーのテキストで表示されます。提案を使用したくない場合は、コードを入力し続けてください。提案されたコードを使用したい場合は、Tabキーを押してください。

![使用のスクリーンショット](/attachments/vscode/copilot-usage-and-shortcut/04.completion.png)

VSCodeでは、Copilotにはアイコンがあり、ステータスがオンであることを確認する必要があります。他のアイコンと似ていて背景色がない場合は、オンであることを意味します。この時、コードファイルを編集すると、Copilotは自動的にコードの提案を行います。背景色がある場合（赤、濃い黄色など）、オフであることを意味します。ステータスを切り替えたい場合は、クリックしてグローバルを選択してください。

![ステータスアイコン](/attachments/vscode/copilot-usage-and-shortcut/05.icon.png)

## ショートカットキー

Copilotは、いくつかのショートカットキーも提供しています。

- 提案を受け入れる：`Tab`
- 提案を拒否する：`Esc`
- Copilotを開く：`Ctrl + Enter`（10の提案を表示する別のパネルが開きます）
- 次の提案：`Alt/Option + ]`
- 前の提案：`Alt/Option + [`
- インラインCopilotをトリガーする：`Alt/Option + \`（Coplitが提案を行っていないか、提案が拒否された場合、手動でトリガーして提案を行う）

![ショートカットのスクリーンショット](/attachments/vscode/copilot-usage-and-shortcut/06.shortcut.jpg)

## Httpプロキシ

一部のユーザー（たとえば、中国本土のユーザー）は、Copilotが機能しない問題に遭遇する場合があります。その理由は、CopilotがインターネットまたはGithub apiにアクセスできないためです。出力パネルに次のエラーメッセージが表示される場合があります：`GitHub Copilot could not connect to server. Extension activation failed: "connect ETIMEDOUT xxx.xxx.xxx.xxx:443"`。

この場合、httpプロキシを設定する必要があります。

まず、httpプロキシの情報を取得します。ネットワーク管理者にプロキシアドレスとポートを問い合わせるか、プロキシソフトウェアを使用している場合は、プロキシソフトウェアの設定でプロキシアドレスとポートを見つけることができます。

以下は、プロキシソフトウェア `ClashX` を使用する例です。`Settings`タブでプロキシアドレスとポートを見つけることができます。プロキシアドレスは `127.0.0.1:1080` です。

![プロキシのスクリーンショット](/attachments/vscode/copilot-usage-and-shortcut/07.proxy.png)

次に、VSCodeの設定を開き、 `http.proxy` を検索して、プロキシアドレスとポートを設定します。

![プロキシ設定のスクリーンショット](/attachments/vscode/copilot-usage-and-shortcut/08.proxy-settings.png)

設定後、VSCodeを再起動し、Copilotが正常に動作するはずです。