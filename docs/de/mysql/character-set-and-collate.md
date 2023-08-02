# Verständnis von Zeichensätzen und Sortierregeln in MySQL

Bei der Verwendung von MySQL stoßen wir oft auf Probleme im Zusammenhang mit Zeichensätzen und Sortierregeln, wie zum Beispiel Text, der beim Abfragen von Daten verfälscht wird, oder Fehler beim Schreiben von Emoji-Ausdrücken. Um diese Probleme zu verstehen und zu lösen, müssen Sie die Zeichensätze und Sortierregeln in MySQL verstehen.

## Zeichensätze

In Computern werden Zeichen codiert gespeichert, und jedes Zeichen hat eine Codierung. Zum Beispiel wird der Buchstabe `A` in der ASCII-Codierung als `65` codiert. ASCII hat jedoch nur 128 Zeichen und enthält nur Zahlen, Groß- und Kleinbuchstaben sowie gängige englische Satzzeichen. Wenn Chinesisch involviert ist, müssen Sie weitere Zeichensätze verwenden, wie zum Beispiel GB2312, GB18030, UTF8 usw.

Nachdem jedes Zeichen gemäß den angegebenen Regeln codiert wurde, erhalten wir eine Reihe von Codierungstabellen, die als "Zeichensatz" bezeichnet werden können. Jeder Zeichensatz hat seine eigenen Codierungsregeln, und das Ergebnis der Codierung des gleichen Zeichens in verschiedenen Zeichensätzen ist unterschiedlich. Wenn beim Schreiben von Daten und Abfragen von Daten unterschiedliche Zeichensätze verwendet werden, können die entsprechenden Zeichen nicht korrekt analysiert werden, was zu unleserlichem Code führt.

Für Chinesisch werden häufig die Zeichensätze GB2312, GBK, GB18030, UTF8 usw. verwendet. Aufgrund der guten Internationalisierungsfunktion von UTF8 wird empfohlen, die UTF8-Codierung zu verwenden, wenn es keinen besonderen Grund gibt.

## MySQL Einstellung des Zeichensatzes für Felder

Der Zeichensatz von MySQL wird letztendlich auf Felder angewendet. Beim Erstellen eines Feldes (Erstellen oder Ändern einer Tabelle) können Sie den Zeichensatz des Feldes wie folgt angeben.

```sql
CREATE TABLE `test` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```

Das oben genannte SQL verwendet den Zeichensatz `utf8mb4` und die Sortierreihenfolge `utf8mb4_general_ci` für das Feld `name`. Der Zeichensatz des Feldes ist also `utf8mb4`.

Neben der Angabe des Zeichensatzes im Feld können Sie auch den Standardzeichensatz für die gesamte Tabelle angeben, wie im obigen SQL, das auch den Standardzeichensatz für die Tabelle als `utf8mb4` angibt. In diesem Fall wird, wenn für das neue Feld kein Zeichensatz angegeben ist, der Standardzeichensatz der Tabelle verwendet.

Darüber hinaus kann MySQL auch einen Standardzeichensatz für die Datenbank oder sogar für den gesamten MySQL-Server festlegen. Diese Zeichensätze ähneln auch den standardmäßigen Zeichensätzen der Tabelle, und wenn kein Feldzeichensatz angegeben ist, wird der Standardzeichensatz verwendet. Kurz gesagt: Feldzeichensatz > Tabellenstandardzeichensatz > Datenbankstandardzeichensatz > MySQL-Serverstandardzeichensatz.

Theoretisch kann die Datenbank, wenn wir den Zeichensatz eines Feldes festlegen, die Zeichen unter dem entsprechenden Zeichensatz speichern. In der Praxis stoßen wir jedoch oft auf Situationen, in denen der Zeichensatz eines Feldes festgelegt ist, aber dennoch nicht wie erwartet funktioniert, und diese Situation kann das Problem des Verbindungszeichensatzes betreffen.

## Einstellen des Verbindungszeichensatzes

Neben dem Zeichensatz, der in den Datenbankfeldern gespeichert ist, gibt es einige andere Konzepte von Zeichensätzen, die an anderen Stellen bei der Verwendung von MySQL auftreten.

- `character_set_client` Der Zeichensatz, den der Client verwendet, um SQL-Anweisungen zu senden
- `character_set_connection` Der Zeichensatz, den MySQL in einen umwandelt, wenn es eine SQL-Anweisung empfängt
- `character_set_results` Der Zeichensatz, den MySQL in den Ergebnissatz umwandelt

Die folgenden SQL-Einstellungen können separat verwendet werden.

```sql
SET character_set_client=utf8mb4;
SET character_set_connection=utf8mb4;
SET character_set_results=utf8mb4;
```

Und es gibt eine weitere Abkürzung zum Einstellen dieser drei Zeichensätze:

```sql
SET NAMES utf8mb4;
```

Führen Sie einfach die oben genannte SQL-Anweisung aus, um die drei oben genannten Zeichensätze einzustellen.

## Festlegen des Zeichensatzes im Code

Wenn Sie MySQL in Ihrem Code verwenden, müssen Sie in der Regel den Zeichensatz der Verbindung über die Konfiguration der MySQL-Bibliothek festlegen. Nehmen Sie das `sequelize`-Modul von Node.js als Beispiel. Sie müssen den Zeichensatz in `dialectOptions.charset` angeben.

```js
const sequelize = new Sequelize({
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'test',
    dialect: 'mysql',
    dialectOptions: {
        charset: 'utf8mb4'
    }
});
```

## Sortierregeln

Sie können `COLLATE` an vielen Stellen sehen, und im obigen Beispiel ist `utf8mb4_general_ci` die Sortierregel.

Wie der Name schon sagt, werden Sortierregeln verwendet, um festzulegen, wie Zeichen sortiert werden sollen. Zum Beispiel können das gleiche `a` und `b` unter einer Sortierregel vor `a` stehen und unter einer anderen hinter `b`.

MySQL bietet viele Sortierregeln für den Zeichensatz `utf8mb4`, die gängigsten sind:

- `utf8mb4_general_ci`: MySQLs Standard-Sortierregel, der Unicode-Teil wird nicht streng nach Unicode-Sortierung sortiert
- `utf8mb4_unicode_ci`: Sortierung nach Unicode-Zeichenreihenfolge
- `utf8mb4_0900_ai_ci`: Sortiert nach Unicode 9.0-Zeichen, einschließlich Zeichen außerhalb der grundlegenden mehrsprachigen Ebene

Derzeit wird `utf8mb4_0900_ai_ci` oder `utf8mb4_unicode_ci` empfohlen.

## utf8 und utf8mb4 in MySQL

UTF8 Ein Zeichen besteht aus 1-6 Bytes, aber das heute am häufigsten verwendete Zeichen besteht nur aus 4 Bytes. Der utf8-Zeichensatz in MySQL kann nur bis zu 3 Bytes speichern, daher können Sie es nicht speichern, wenn Sie auf ein 4-Byte-Zeichen stoßen. Deshalb können Felder im utf8-Zeichensatz keine Emoji-Ausdrücke speichern.

utf8mb4 ist eine Erweiterung von utf8, die 4-Byte-Zeichen speichern kann, daher kann sie Emoji-Ausdrücke speichern.

Der utf8mb4-Zeichensatz sollte verwendet werden, sofern nicht anders angegeben, und der utf8-Zeichensatz sollte nicht mehr verwendet werden.

## Zusammenfassung

1. Solange Sie den Zeichensatz der MySQL-Datenbankfelder festlegen und sicherstellen, dass Sie beim Verbinden den gleichen Zeichensatz verwenden, können Sie sicher sein, dass es kein Problem mit falsch dargestellten Zeichen aufgrund des Zeichensatzes gibt.
2. Der utf8mb4-Zeichensatz wird empfohlen und der utf8-Zeichensatz wird nicht mehr verwendet.
Es wird empfohlen, die Sortierregeln utf8mb4_0900_ai_ci oder utf8mb4_unicode_ci zu verwenden.