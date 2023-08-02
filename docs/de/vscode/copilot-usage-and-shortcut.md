# Wie man Github Copilot und Verknüpfungen verwendet

## Was ist Copilot

Copilot (<https://github.com/features/copilot/>) ist eine KI-Codierhilfe, die von Github bereitgestellt wird und während des Codierungsprozesses KI-gestützte Codierungsvorschläge bietet. In vielen Fällen reichen Kommentare oder Funktionsnamen aus, und Copilot kann den vollständigen Code instanziieren.

Copilot ist nicht mehr kostenlos, der Preis beträgt 10 US-Dollar/Monat oder 100 US-Dollar/Jahr. Sie können es jedoch 2 Monate lang kostenlos ausprobieren. Besuchen Sie die Github-Einstellungsseite (<https://github.com/settings/copilot>) und klicken Sie auf die Schaltflächen, um Zugriff zu erhalten. Sobald Sie Zugriff haben, können Sie Copilot auf Github verwenden.

![Screenshot](/attachments/vscode/copilot-usage-and-shortcut/01.website.png)

## Plugin installieren

Um Copilot zu verwenden, müssen Sie ein Plugin installieren. Suchen Sie im Plugin-Menü von VSCode nach `Copilot`, der Name des Plugins lautet `Github Copilot`. Die entsprechende Plugin-Marktplatz-Adresse lautet <https://marketplace.visualstudio.com/items?itemName=GitHub.copilot>. Installieren Sie es.

![Screenshot der Installation](/attachments/vscode/copilot-usage-and-shortcut/02.install.png)

Nach der Installation fordert das Plugin zur Github-Anmeldung auf. Befolgen Sie einfach die Anweisungen, um sich anzumelden.

Befolgen Sie die Anweisungen, um sich anzumelden.

![Screenshot der Anmeldung](/attachments/vscode/copilot-usage-and-shortcut/03.login.png)

## Verwendung

Bei normaler Verwendung erscheint der vorgeschlagene Code von Copilot hinter der Cursorposition und wird in grauem Text angezeigt. Wenn Sie den Vorschlag nicht verwenden möchten, geben Sie einfach den Code weiter ein. Wenn Sie den vorgeschlagenen Code verwenden möchten, drücken Sie einfach die Tab-Taste.

![Screenshot der Verwendung](/attachments/vscode/copilot-usage-and-shortcut/04.completion.png)

In VSCode hat Copilot ein Symbol, das bestätigt werden muss, dass der Status aktiviert ist. Wenn es ähnlich wie andere Symbole aussieht und keine Hintergrundfarbe hat, bedeutet dies, dass es aktiviert ist. Zu diesem Zeitpunkt, wenn Sie die Code-Datei bearbeiten, wird Copilot automatisch Codevorschläge anzeigen. Wenn es eine Hintergrundfarbe hat (rot, dunkelgelb, usw.), bedeutet dies, dass es deaktiviert ist. Wenn Sie den Status wechseln möchten, klicken Sie einfach darauf und wählen Sie "Global".

![status-icon](/attachments/vscode/copilot-usage-and-shortcut/05.icon.png)

## Tastenkombinationen

Copilot bietet auch einige Tastenkombinationen, die einfach verwendet werden können.

- Vorschläge akzeptieren: `Tab`
- Vorschlag ablehnen: `Esc`
- Copilot öffnen: `Strg + Eingabe` (öffnet ein separates Panel mit 10 Vorschlägen)
- Nächster Vorschlag: `Alt/Option + ]`
- Vorheriger Vorschlag: `Alt/Option + [`
- In-line Copilot auslösen: `Alt/Option + \` (Coplit hat keinen Vorschlag gemacht oder der Vorschlag wurde abgelehnt und soll manuell ausgelöst werden, um einen Vorschlag zu erhalten)

![Screenshot der Tastenkombinationen](/attachments/vscode/copilot-usage-and-shortcut/06.shortcut.jpg)

## Http-Proxy

Einige Benutzer (zum Beispiel Benutzer in Festlandchina) können auf das Problem stoßen, dass Copilot nicht funktioniert, und der Grund dafür ist, dass Copilot keinen Zugriff auf das Internet oder die Github-API hat. Sie können die folgende Fehlermeldung im Ausgabefenster sehen: `GitHub Copilot konnte keine Verbindung zum Server herstellen. Die Aktivierung der Erweiterung ist fehlgeschlagen: "connect ETIMEDOUT xxx.xxx.xxx.xxx:443"`.

In diesem Fall müssen Sie den Http-Proxy einstellen.

Zuerst erhalten Sie Ihre Http-Proxy-Informationen. Sie können Ihren Netzwerkadministrator nach der Proxy-Adresse und dem Port fragen, oder wenn Sie eine Proxy-Software verwenden, können Sie die Proxy-Adresse und den Port in den Einstellungen der Proxy-Software finden.

Nachfolgend finden Sie ein Beispiel für die Verwendung der Proxy-Software `ClashX`. Sie können die Proxy-Adresse und den Port im Tab `Einstellungen` finden. Die Proxy-Adresse lautet `127.0.0.1:1080`.

![Screenshot des Proxys](/attachments/vscode/copilot-usage-and-shortcut/07.proxy.png)

Öffnen Sie dann die Einstellungen von VSCode, suchen Sie nach `http.proxy` und setzen Sie die Proxy-Adresse und den Port.

![Screenshot der Proxy-Einstellungen](/attachments/vscode/copilot-usage-and-shortcut/08.proxy-settings.png)

Nachdem Sie die Einstellungen vorgenommen haben, starten Sie VSCode neu, und Copilot sollte normal funktionieren.