# Nginx Konfiguration von HTTPS

## Hintergrundwissen

HTTPS ist eine verschlüsselte HTTP-Verbindung, die ein verschlüsseltes Transportprotokoll verwendet, um die Sicherheit der Daten zu schützen. Speziell für den Verschlüsselungsprozess kann HTTPS in zwei Phasen unterteilt werden.

1. Der Handshake-Verhandlungsprozess verwendet einen asymmetrischen Verschlüsselungsalgorithmus, um den Schlüssel zu generieren.
2. Der Transportprozess verwendet einen symmetrischen Verschlüsselungsalgorithmus, um die Daten zu verschlüsseln.

Im Prozess des Handshake-Verhandlungsverfahrens mit asymmetrischem Algorithmus muss der Server einen von einer autorisierten Zertifizierungsstelle signierten öffentlichen Schlüssel ausstellen, der auch als Zertifikat bezeichnet wird. Entsprechend dazu verfügt die Serverseite auch über einen privaten Schlüssel.

Um HTTPS zu verwenden, muss die Serverseite ein Zertifikat bereitstellen, das in der Regel die Endung ".cer" oder ".crt" hat, sowie einen dazu passenden privaten Schlüssel, der in der Regel mit ".key" endet.

Die Beschaffung eines HTTPS-Zertifikats kann mit Hilfe verschiedener Zertifikatsdienstanbieter erfolgen, sowohl kostenpflichtig als auch kostenlos, sowohl rein manuell als auch mit automatisierten Skripten. Bitte beachten Sie andere Materialien.

## Grundkonfiguration

Bei der Konfiguration von HTTPS mit nginx ist es sehr einfach, wenn keine zusätzlichen Anforderungen vorliegen. Sie müssen lediglich Folgendes konfigurieren:

1. Hören Sie auf Port 443 mit dem SSL-Protokoll.
2. Verwenden Sie `server_name`, um den Domainnamen anzugeben, der mit dem Domainnamen des Zertifikats übereinstimmen muss.
3. Verwenden Sie `ssl_certificate`, um den Zertifikatpfad anzugeben.
4. Verwenden Sie `ssl_certificate_key`, um den Pfad zum privaten Schlüssel anzugeben.

```
server {
    listen 443 ssl;
    server_name www.xxx.com;
    ssl_certificate /etc/nginx/ssl/www.xxx.com.crt;
    ssl_certificate_key /etc/nginx/ssl/www.xxx.com.key;
}
```

Dies unterstützt den HTTPS-Zugriff.

## HTTP-Umleitung

Die obige Konfiguration funktioniert nicht, wenn der Benutzer das HTTP-Protokoll verwendet. Um auch auf das HTTP-Protokoll zugreifen zu können, muss eine Umleitungskonfiguration hinzugefügt werden. Es gibt zwei Ideen für die spezifische Konfiguration.

Die erste besteht darin, einen separaten `Server` einzurichten, um den HTTP-Zugriff zu unterstützen.

```
server {
    listen 80;
    server_name www.xxx.com;
    return 301 https://$host$request_uri;
}
```

Zweitens kann in demselben `Server` die `rewrite`-Funktion verwendet werden, um umzuleiten.

```
server {
    listen 80;
    listen 443 ssl;
    server_name www.xxx.com;
    ssl_certificate /etc/nginx/ssl/www.xxx.com.crt;
    ssl_certificate_key /etc/nginx/ssl/www.xxx.com.key;

    if ($scheme ! = "https") {
        rewrite ^ https://$host$request_uri permanent;
    }
}
```

## Häufige Probleme

### Das Zertifikat ist gültig, aber der Browser zeigt an, dass es nicht sicher ist

Es gibt mehrere Gründe, warum der Browser Unsicherheit anzeigen kann.

1. Das Stammzertifikat/zwischengeschaltete Zertifikat der Zertifizierungsstelle wird nicht vertraut.
2. Der Sicherheitsmechanismus des Zertifikats ist veraltet und der Browser/das Betriebssystem stuft es nicht mehr als sicher ein.
3. Die Zertifikatskette ist unvollständig.

Wenn das Zertifikat von einer gültigen Zertifizierungsstelle ausgestellt wurde, treten normalerweise die Probleme 1 und 2 nicht auf, und die größte Möglichkeit besteht darin, dass die Zertifikatskette unvollständig ist.

Im Allgemeinen hat ein sicheres Zertifikat zusätzlich zum Zertifikat selbst ein zugehöriges zwischengeschaltetes Zertifikat und ein Stammzertifikat. Die meisten Betriebssysteme/Browser haben ein gemeinsames Stammzertifikat integriert, aber zwischengeschaltete Zertifikate sind möglicherweise nicht immer integriert. Wenn das Betriebssystem/der Browser das zwischengeschaltete Zertifikat nicht finden kann, kann es anzeigen, dass es nicht sicher ist.

In diesem Fall müssen Sie unser Zertifikat mit dem zwischengeschalteten Zertifikat zusammenführen und dann das zusammengeführte Zertifikat für die Konfiguration des Servers verwenden.

Spezifische Vorgehensweise.

- Wenn das angewendete Zertifikat ein zusammengeführtes Zertifikat hat (wie z.B. `fullchain.crt` oder andere Dateien), können Sie es direkt verwenden.

- Wenn das angewendete Zertifikat kein zusammengeführtes Zertifikat hat, müssen Sie das angewendete Zertifikat mit dem Zwischenzertifikat zusammenführen. Öffnen Sie dazu die beiden Dateien mit einem beliebigen Texteditor und fügen Sie dann den Inhalt der beiden Zertifikatsdateien zusammen. Das Serverzertifikat sollte vor dem Zwischenzertifikat stehen. Speichern Sie die Datei anschließend unter einem neuen Namen ab.