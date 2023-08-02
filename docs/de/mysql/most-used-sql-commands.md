# MySQL Übliche Befehle und Übliche Anweisungen Schnellsuche

## Anmeldung an der Datenbank mit dem mysql-Client

```sh
mysql -h host -P port -u user -p
```

Sie können auch den Datenbanknamen angeben und die angegebene Datenbank direkt nach der Anmeldung verwenden:

```sh
mysql -h host -P port -u user -p dbname
```

wobei `host` die Adresse des Datenbankservers ist, `port` die Portnummer, `user` der Benutzername und `p` bedeutet, dass das Passwort verwendet wird. Anstatt es direkt im Befehl einzugeben, drücken Sie die Eingabetaste und geben Sie es separat ein.

## Datenbank anzeigen

```sql
SHOW DATABASES;
```

## Datenbank erstellen

```sql
-- Datenbank erstellen
CREATE DATABASE db_name;
-- nur erstellen, wenn die Ziel-Datenbank nicht existiert
CREATE DATABASE IF NOT EXISTS db_name;
-- Datenbank erstellen und den Zeichensatz festlegen
CREATE DATABASE db_name DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
-- nur erstellen, wenn die Ziel-Datenbank nicht existiert, und den Zeichensatz festlegen
CREATE DATABASE IF NOT EXISTS db_name DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
```

## Datenbank löschen

```sql
DROP DATABASE db_name;
```

## Verwenden der ausgewählten Datenbank

```sql
USE db_name;
```

## Liste der Tabellen anzeigen

```sql
SHOW TABLES;
```

## Tabelle erstellen

Zuerst müssen Sie die Eigenschaften jedes Feldes kennen, wie z.B. Typ, Länge, ob es leer ist, ob es selbstwertend ist, usw. Die gängigen sind:

- Typ (Länge), z.B. `VARCHAR(255)`, `INT`, `TEXT`, `TIMESTAMP`, `DATETIME`, usw.
- Ob es null sein soll, `NULL`, `NOT NULL`
- Standardwert, `DEFAULT Wert`
- Auto-Inkrement `AUTO_INCREMENT`
- Primärschlüssel `PRIMARY KEY`
- Bemerkungen `COMMENT 'Bemerkungen'`
- Codierungssatz ` CHARACTER SET utf8mb4`
- Sortieren nach `COLLATE utf8mb4_general_ci`

Schreiben Sie das Feld zuerst mit dem Feldnamen und dann mit den Feldattributen.

Tabelle erstellen.

```sql
CREATE TABLE table_name (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE table_name (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL DEFAULT '' COMMENT 'Name',
  age INT NOT NULL DEFAULT 0 COMMENT 'Alter',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Erstellungszeit',
);
```

## Tabellenstruktur anzeigen

```sql
-- Tabellenstruktur anzeigen
DESC table_name;
-- SQL-Anweisung anzeigen, die die Tabelle erstellt hat
SHOW CREATE TABLE table_name;
```

## Tabelle löschen

```sql
DROP TABLE table_name;
```

## Tabellennamen ändern

```sql
ALTER TABLE table_name RENAME TO new_table_name;
```

## Felder hinzufügen/Spalten hinzufügen

```sql
ALTER TABLE table_name ADD COLUMN new_column_name;
ALTER TABLE table_name ADD COLUMN new_column_name VARCHAR(255) NOT NULL;
ALTER TABLE table_name ADD COLUMN new_column_name INT NOT NULL DEFAULT 0 COMMENT 'Bemerkungen';
ALTER TABLE table_name ADD COLUMN new_column_name INT NOT NULL DEFAULT 0 COMMENT 'Bemerkungen' AFTER column_name;
```

## Feld löschen/Spalte löschen

```sql
ALTER TABLE table_name DROP COLUMN column_name;
```

## Feldattribute/Spaltenattribute ändern

```sql
ALTER TABLE table_name MODIFY COLUMN column_name VARCHAR(255) NOT NULL;
ALTER TABLE table_name MODIFY COLUMN column_name VARCHAR(255) NOT NULL DEFAULT '' COMMENT 'Bemerkungen';
```

## Feldname/Spaltenname ändern

```sql
ALTER TABLE table_name CHANGE COLUMN old_column_name new_column_name;
```

## Index anzeigen

```sql
SHOW INDEX FROM table_name;
```

## Index hinzufügen

```sql
-- Einzelnes Feld allgemeiner Index hinzufügen
ALTER TABLE table_name ADD INDEX index_name (column_name);
-- Mehrfeldverbundindex hinzufügen
ALTER TABLE table_name ADD INDEX index_name (column_name1, column_name2);
-- Eindeutigen Index hinzufügen
ALTER TABLE table_name ADD UNIQUE INDEX index_name (column_name);
-- Primärschlüsselindex hinzufügen
ALTER TABLE table_name ADD PRIMARY KEY (column_name);
```

## Index löschen

```sql
ALTER TABLE table_name DROP INDEX index_name;
ALTER TABLE table_name DROP PRIMARY KEY;
```

## Benutzer erstellen

MySQL-Benutzer werden über die IP autorisiert. Die Kombination aus Benutzername + IP ergibt den vollständigen Benutzer. Zum Beispiel sind `'user'@'172.8.8.1'` und `'user'@'172.8.8.2'` unterschiedliche Benutzer.

Wenn ein Benutzer den Zugriff auf alle IPs erlaubt, können Sie `'%'` als IP verwenden. Wenn Sie den Zugriff auf ein IP-Segment einschränken müssen, müssen Sie das Subnetz angeben. Um beispielsweise den Zugriff auf `172.8.8.*` zu ermöglichen, müssen Sie `'172.8.8.0/255.255.255.0'` verwenden.

```sql
CREATE USER 'user'@'%' IDENTIFIED BY 'password';
CREATE USER 'user'@'172.8.8.1' IDENTIFIED BY 'password';
CREATE USER 'user'@'172.8.8.2' IDENTIFIED BY 'password';
CREATE USER 'user'@'172.8.8.0/255.255.255.0' IDENTIFIED BY 'password';
```

## Benutzerliste anzeigen

```sql
SELECT * FROM mysql.user;
-- Nur Benutzernamen und IP anzeigen
SELECT user, host FROM mysql.user;
```

## Benutzerpasswort ändern

```sql
ALTER USER 'user'@'%' IDENTIFIED BY 'new_password';
```

## Benutzer löschen

```sql
DROP USER 'user'@'%';
```

## Autorisieren Sie die angegebene Datenbank und Tabelle für einen Benutzer

MySQL hat viele Berechtigungen wie `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `ALTER`, `CREATE`, `DROP`, usw. Wenn Sie alle Berechtigungen gewähren möchten, können Sie `ALL` schreiben.

```sql
-- Gewähren Sie SELECT-Berechtigungen für die angegebene Tabelle
GRANT SELECT ON db_name.table_name TO 'user'@'%';
-- Autorisieren Sie SELECT, INSERT, UPDATE, DELETE-Berechtigungen für die angegebene Tabelle
GRANT SELECT, INSERT, UPDATE, DELETE ON db_name.table_name TO 'user'@'%';
-- Gewähren Sie alle Berechtigungen für die Datenbank db_name
GRANT ALL ON db_name.* TO 'user'@'%';
-- Autorisieren Sie alle Berechtigungen
GRANT ALL ON *.* TO 'user'@'%';
```

## Deautorisieren Sie die angegebene Datenbank und Tabelle

```sql
REVOKE SELECT ON db_name.table_name FROM 'user'@'%';
REVOKE ALL ON db_name.* FROM 'user'@'%';
REVOKE ALL ON *.* FROM 'user'@'%';
```


## Daten importieren

### Importieren aus einer SQL-Datei

SQL-Dateien können mit dem `mysql`-Befehl importiert werden.

```sh
## Ohne Datenbanknamen müssen Sie die Datenbank in SQL angeben
mysql -h host -P port -u user -p password < file_name.sql
# Datenbank angeben, kann in SQL ohne Datenbank angegeben werden
mysql -h host -P port -u user -p password db_name < file_name.sql
```

Die Datei kann auch mit dem SQL-Befehl importiert werden

```sql
SOURCE file_name.sql;
```

### Importieren aus einer Textdatei

Textdateien können in eine Datenbank importiert werden, wenn sie durch Zeilenumbrüche getrennt sind, eine Datenzeile pro Zeile mit Tabs (Tabulator/`\t`) als Feldtrennzeichen. In diesem Fall können Sie die Datenbank direkt mit `mysqlimport` importieren: ```sh

```sh
# Importieren mit Standardfeldern und -reihenfolge
mysqlimport -h host -P port -u user -p db_name file_name.txt
# Felder und Importreihenfolge angeben
mysqlimport -h host -P port -u user -p db_name --columns=filed1,filed2,field3 file_name.txt
```

Sie können das Trennzeichen angeben.

```sh
# Importieren mit Standardfeldern und -reihenfolge
mysqlimport -h host -P port -u user -p db_name --fields-terminated-by=, --lines-terminated-by="\r\n" file_name.txt

# Felder und Reihenfolge zum Importieren angeben
mysqlimport -h host -P port -u user -p db_name --fields-terminated-by=, --lines-terminated-by="\r\n" --columns=filed1,filed2,field3 file_name. txt
```

Sie können auch eine Textdatei mit dem SQL-Statement importieren

```sql
-- Importieren nach Standardfeldern und Reihenfolge
LOAD DATA INFILE 'file_name.sql' INTO TABLE table_name;
-- Importieren nach angegebenen Feldern und Reihenfolge
LOAD DATA INFILE 'file_name.sql' INTO TABLE table_name (field1, field2, field3);
```

Das Importieren mit SQL-Statements ermöglicht es Ihnen auch, Trennzeichen anzugeben, z.B.

```sql
-- Importieren nach Standardfeldern und Reihenfolge
LOAD DATA INFILE 'file_name.txt' INTO TABLE table_name FIELDS TERMINATED BY ',' LINES TERMINATED BY '\r\n';
-- Felder und Reihenfolge des Imports angeben
LOAD DATA INFILE 'file_name.txt' INTO TABLE table_name FIELDS TERMINATED BY ',' LINES TERMINATED BY '\r\n' (field1, field2, field3);
```

## Daten exportieren

### Exportieren von Daten im CSV-Textformat mit SQL

```sql
-- Daten im CSV-Textformat exportieren
SELECT * FROM table_name INTO OUTFILE '/tmp/table_name.csv' FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\n';
```

### Exportieren Sie Daten im SQL-Format mit mysqldump

```sh
mysqldump -h host -P port -u user -p db_name > /tmp/db_name.sql
mysqldump -h host -P port -u user -p db_name table_name > /tmp/table_name.sql
```

### Exportieren Sie Daten im Textformat mit mysql

```sh
mysql -h host -P port -u user -p -e "select * from table_name" db_name > /tmp/table_name.txt
```

Exportierte Daten mit Tabellenkopf, ein Datensatz pro Zeile, jedes Feld ist durch Tabs (Tabulator/`\t`) getrennt.

```
Spalte1 Spalte2 Spalte3
Wert11 Wert12 Wert13
Wert21 Wert22 Wert23
```