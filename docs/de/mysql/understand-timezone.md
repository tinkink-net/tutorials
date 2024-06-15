# Verstehen Sie die Zeitzone in MySQL

## Hintergrundwissen: Datum, Zeitstempel und Zeitzone

In den meisten Szenarien beziehen sich Datum und Uhrzeit auf die aktuelle Zeit in der lokalen Zeitzone. Wenn Sie beispielsweise `"2024-06-15 12:00:00"` sehen, bedeutet dies, dass es jetzt 12:00:00 Uhr am 15. Juni 2024 in Ihrer lokalen Zeitzone ist.

Wenn Ihre Anwendung jedoch Benutzer aus verschiedenen Zeitzonen bedient, müssen Sie das Zeitzone-Problem berücksichtigen. Wenn ein Benutzer in New York einen Datensatz um `"2024-06-15 12:00:00"` erstellt, bedeutet dies, dass der Datensatz um 12:00:00 Uhr in der New Yorker Zeitzone erstellt wurde. Wenn ein anderer Benutzer in Peking den Datensatz ansieht, sollte die Zeit in die Pekinger Zeitzone umgerechnet werden.

Zusammenfassend ist das Datum und die Uhrzeit die Zeit in der lokalen Zeitzone, Sie sollten Zeitzone-Informationen zum Datum und zur Uhrzeit hinzufügen, um sie weltweit verfügbar zu machen.

Auf der anderen Seite ist ein Zeitstempel die Anzahl der Sekunden, die seit dem 1. Januar 1970 um 00:00:00 UTC vergangen sind. Ein Zeitstempel ist unabhängig von der Zeitzone, er ist immer gleich, egal wo Sie sich befinden.

## Datum Zeit Datentypen in MySQL

In MySQL gibt es mehrere Datum Zeit Datentypen, aber die wichtigsten sind `DATETIME` und `TIMESTAMP`.

- `DATETIME`: Das Datum und die Zeit, das Format ist `JJJJ-MM-TT SS:MM:SS`. Es speichert das Datum und die Zeit, daher muss die Zeitzone berücksichtigt werden.
- `TIMESTAMP`: Der Zeitstempel, er speichert die Zeitstempelnummer, die unabhängig von der Zeitzone ist. Aber beim Schreiben oder Lesen des Zeitstempels erfolgt eine Zeitzonenumrechnung.

## Zeitzone in MySQL

MySQL verfügt über eine Systemvariable `time_zone`, um die Zeitzone festzulegen. Sie können die Zeitzone auf folgende Weise festlegen:

1. Setzen Sie die Zeitzone in der Konfigurationsdatei `my.cnf`:

    ```ini
    [mysqld]
    default-time-zone = '+00:00'
    ```

2. Setzen Sie die Zeitzone im MySQL-Client:

    ```sql
    SET time_zone = '+00:00';
    ```

3. Setzen Sie die Zeitzone in der Verbindungszeichenfolge:

    ```sql
    mysql -u root -p --default-time-zone='+00:00'
    ```

Wenn Sie die Zeitzone nicht festlegen, verwendet MySQL standardmäßig die Systemzeitzone.

## Zeitzone in der Anwendung einstellen

Wenn Sie MySQL in Ihrer Anwendung verwenden, sollten Sie die Zeitzone in der Anwendung einstellen. Zum Beispiel können Sie in Node.js die Zeitzone wie folgt einstellen:

```javascript
const mysql = require('mysql2');
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'test',
    timezone: '+00:00'
});
```

Bitte beachten Sie, dass es in vielen Fällen die einzige Möglichkeit ist, sicherzustellen, dass die Zeitzone korrekt ist, die Zeitzone in Ihrer Anwendung einzustellen. Denn möglicherweise haben Sie keine Möglichkeit, den MySQL-Server anzufassen, aber Sie können immer den Anwendungscode ändern.

Wenn Ihre Anwendung ein ORM verwendet, das das Einstellen der Zeitzone nicht unterstützt, haben Sie immer noch andere Optionen:

1. Führen Sie eine Abfrage zur Zeitzoneneinstellung vor anderen Abfragen aus. (`SET time_zone = '+00:00';`)
2. Verwenden Sie einen anderen Datentyp zur Speicherung des Datums- und Uhrzeitwerts, wie z.B. `INT` oder `VARCHAR`, und führen Sie die Zeitzonenkonvertierung in der Anwendung durch.
3. Konvertieren Sie jeden Datum- und Uhrzeitwert in dieselbe Zeitzone mit dem MySQL-Server, bevor Sie ihn in die Datenbank schreiben. Sie müssen auch eine Zeitzonenkonvertierung in der Anwendung durchführen, wenn Sie den Datum- und Uhrzeitwert lesen.

## Fazit

In diesem Artikel haben wir das Hintergrundwissen zu Datum, Uhrzeit und Zeitzone gelernt: Datum und Uhrzeit sollten Zeitzone-Informationen enthalten, während ein Zeitstempel unabhängig von der Zeitzone ist. Anschließend haben wir die Datums- und Uhrzeitdatentypen in MySQL kennengelernt: `DATETIME` und `TIMESTAMP`. Abschließend haben wir gelernt, wie man die Zeitzone in MySQL und in der Anwendung einstellt.