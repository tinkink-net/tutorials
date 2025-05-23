# Port Forwarding in VSCode

VSCode bietet eine Port-Forwarding-Funktion, die es Ihnen ermöglicht, auf die lokale oder Remote-Entwicklungsumgebung von der Außenwelt aus zuzugreifen. Diese Funktion ist sehr nützlich für Test- und Debugging-Zwecke.

## Hintergrund

Wir entwickeln oft in einer lokalen Umgebung oder einer Remote-Entwicklungsumgebung, auf die nicht öffentlich zugegriffen werden kann. Aber unter bestimmten Umständen müssen wir von der Außenwelt aus auf die lokale oder Remote-Entwicklungsumgebung zugreifen. Zum Beispiel müssen wir uns mit einem Drittanbieterdienst integrieren oder wir müssen das Web oder den Dienst von einem Gerät aus testen, das sich nicht im selben Netzwerk befindet.

## Verwendung

Starten Sie zunächst Ihre lokale Entwicklungsumgebung und stellen Sie sicher, dass der Dienst läuft. Er wird auf einem bestimmten Port lauschen, zum Beispiel `localhost:8080`.

Suchen Sie dann in VSCode die Funktion "Ports" im unteren Bereich. Sie sehen eine Schaltfläche "Port weiterleiten". Klicken Sie darauf und geben Sie die Portnummer ein, die Sie weiterleiten möchten. Zum Beispiel `8080`.

![Port Forwarding](/attachments/vscode/port-forwarding/01.panel.png)

![Port Forwarding](/attachments/vscode/port-forwarding/02.input.png)

Wenn Sie diese Funktion zum ersten Mal verwenden, werden Sie aufgefordert, sich bei Ihrem GitHub-Konto anzumelden und den Zugriff zu autorisieren.

![Port Forwarding](/attachments/vscode/port-forwarding/03.sign-in.png)

Wenn Sie MacOS verwenden, werden Sie auch aufgefordert, den Zugriff auf den Schlüsselbund für VSCode zu autorisieren. Geben Sie einfach Ihr Passwort ein und klicken Sie auf "Erlauben".

![Port Forwarding](/attachments/vscode/port-forwarding/04.keychain.png)

Warten Sie dann einige Sekunden, und Sie werden sehen, dass der Port erfolgreich weitergeleitet wurde.

![Port Forwarding](/attachments/vscode/port-forwarding/05.success.png)

Sie können jetzt über die weitergeleitete URL auf die lokale Entwicklungsumgebung zugreifen. Wenn Sie beispielsweise den Port `8080` weitergeleitet haben, können Sie über `https://xxx-1234.asse.devtunnels.ms` darauf zugreifen (die URL kann unterschiedlich sein).

![Port Forwarding](/attachments/vscode/port-forwarding/06.authorize.png)

Wie Sie sehen können, muss der Zugriff auf diese weitergeleitete URL immer noch autorisiert werden. Klicken Sie einfach auf "Autorisieren". Dies erfüllt in den meisten Fällen unsere Anforderungen und gewährleistet die Sicherheit unserer lokalen Entwicklungsumgebung.

Wenn Sie jedoch möchten, dass die Außenwelt ohne Autorisierung auf Ihre lokale Entwicklungsumgebung zugreifen kann, zum Beispiel auf einen API-Endpunkt oder einen Webhook, können Sie den Eintrag im VSCode "Ports"-Panel finden, mit der rechten Maustaste darauf klicken und ihn öffentlich machen.

> Bitte beachten Sie: Das Offenlegen Ihrer lokalen Entwicklungsumgebung für die Außenwelt kann Sicherheitsrisiken verursachen. Bitte stellen Sie sicher, dass Sie die Risiken verstehen, bevor Sie dies tun.

Denken Sie schließlich daran, die Portweiterleitung zu schließen, wenn Sie fertig sind.

## Fazit

In diesem Artikel haben wir die Port-Forwarding-Funktion in VSCode vorgestellt. Diese Funktion ermöglicht es Ihnen, von der Außenwelt aus auf Ihre lokale oder Remote-Entwicklungsumgebung zuzugreifen. Sie ist sehr nützlich für Test- und Debugging-Zwecke. Seien Sie jedoch vorsichtig, wenn Sie Ihre lokale Entwicklungsumgebung für die Außenwelt zugänglich machen, da dies Sicherheitsrisiken verursachen kann.