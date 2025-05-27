# Commandes MySQL Courantes et Recherche Rapide des Instructions Courantes

## Connexion à la base de données avec le client mysql

```sh
mysql -h host -P port -u user -p
```

Vous pouvez également apporter le nom de la base de données et utiliser directement la base de données spécifiée après la connexion:

```sh
mysql -h host -P port -u user -p dbname
```

où `host` est l'adresse du serveur de base de données, `port` est le numéro de port, `user` est le nom d'utilisateur, et `p` signifie utiliser le mot de passe, mais au lieu de l'entrer directement dans la commande, appuyez sur entrée et saisissez-le séparément.

## Afficher les bases de données

```sql
SHOW DATABASES;
```

## Créer une base de données

```sql
-- Créer la base de données
CREATE DATABASE db_name;
-- créer seulement si la base de données cible n'existe pas
CREATE DATABASE IF NOT EXISTS db_name;
-- créer la base de données et définir le jeu de caractères
CREATE DATABASE db_name DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
-- créer seulement si la base de données cible n'existe pas, et définir le jeu de caractères
CREATE DATABASE IF NOT EXISTS db_name DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
```

## Supprimer une base de données

```sql
DROP DATABASE db_name;
```

## Sélectionner la base de données à utiliser

```sql
USE db_name;
```

## Afficher la liste des tables

```sql
SHOW TABLES;
```

## Créer une table

D'abord, vous devez connaître les propriétés de chaque champ, comme le type, la longueur, s'il peut être vide, s'il est auto-incrémenté, etc. Les plus courants sont:

- Type (longueur), comme `VARCHAR(255)`, `INT`, `TEXT`, `TIMESTAMP`, `DATETIME`, etc.
- Si peut être nul, `NULL`, `NOT NULL`
- Valeur par défaut, `DEFAULT value`
- Auto-incrémentation `AUTO_INCREMENT`
- Clé primaire `PRIMARY KEY`
- Remarques `COMMENT 'Remarques'`
- Encodage du jeu de caractères `CHARACTER SET utf8mb4`
- Tri par `COLLATE utf8mb4_general_ci`

Écrivez le champ avec le nom du champ d'abord, puis les attributs du champ.

Créer la table:

```sql
CREATE TABLE table_name (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE table_name (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL DEFAULT '' COMMENT 'name',
  age INT NOT NULL DEFAULT 0 COMMENT 'age',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'created time',
);
```

## Afficher la structure de la table

```sql
-- Afficher la structure de la table
DESC table_name;
-- Afficher l'instruction SQL qui a créé la table
SHOW CREATE TABLE table_name;
```

## Supprimer une table

```sql
DROP TABLE table_name;
```

## Modifier le nom de la table/renommer la table

```sql
ALTER TABLE table_name RENAME TO new_table_name;
```

## Ajouter des champs/ajouter des colonnes

```sql
ALTER TABLE table_name ADD COLUMN new_column_name;
ALTER TABLE table_name ADD COLUMN new_column_name VARCHAR(255) NOT NULL;
ALTER TABLE table_name ADD COLUMN new_column_name INT NOT NULL DEFAULT 0 COMMENT 'Remarques';
ALTER TABLE table_name ADD COLUMN new_column_name INT NOT NULL DEFAULT 0 COMMENT 'Remarques' AFTER column_name;
```

## Supprimer un champ/supprimer une colonne

```sql
ALTER TABLE table_name DROP COLUMN column_name;
```

## Modifier les attributs d'un champ/attributs de colonne

```sql
ALTER TABLE table_name MODIFY COLUMN column_name VARCHAR(255) NOT NULL;
ALTER TABLE table_name MODIFY COLUMN column_name VARCHAR(255) NOT NULL DEFAULT '' COMMENT 'Remarques';
```

## Modifier le nom d'un champ/nom de colonne

```sql
ALTER TABLE table_name CHANGE COLUMN old_column_name new_column_name;
```

## Afficher les index

```sql
SHOW INDEX FROM table_name;
```

## Ajouter un index

```sql
-- Ajouter un index général à champ unique
ALTER TABLE table_name ADD INDEX index_name (column_name);
-- Ajouter un index conjoint à plusieurs champs
ALTER TABLE table_name ADD INDEX index_name (column_name1, column_name2);
-- Ajouter un index unique
ALTER TABLE table_name ADD UNIQUE INDEX index_name (column_name);
-- Ajouter un index de clé primaire
ALTER TABLE table_name ADD PRIMARY KEY (column_name);
```

## Supprimer un index

```sql
ALTER TABLE table_name DROP INDEX index_name;
ALTER TABLE table_name DROP PRIMARY KEY;
```

## Créer un utilisateur

Les utilisateurs MySQL sont autorisés par IP, la combinaison du nom d'utilisateur + IP est l'utilisateur complet. Par exemple, `'user'@'172.8.8.1'` et `'user'@'172.8.8.2'` sont des utilisateurs différents.

Lorsqu'un utilisateur est autorisé à accéder à toutes les IPs, vous pouvez utiliser `'%'` comme IP. Lorsque vous devez restreindre l'accès à un segment d'IP, vous devez spécifier le sous-réseau, par exemple pour autoriser l'accès à `172.8.8.*`, vous devez utiliser `'172.8.8.0/255.255.255.0'`.

```sql
CREATE USER 'user'@'%' IDENTIFIED BY 'password';
CREATE USER 'user'@'172.8.8.1' IDENTIFIED BY 'password';
CREATE USER 'user'@'172.8.8.2' IDENTIFIED BY 'password';
CREATE USER 'user'@'172.8.8.0/255.255.255.0' IDENTIFIED BY 'password';
```

## Afficher la liste des utilisateurs

```sql
SELECT * FROM mysql.user;
-- Afficher uniquement le nom d'utilisateur et l'IP
SELECT user, host FROM mysql.user;
```

## Changer le mot de passe d'un utilisateur

```sql
ALTER USER 'user'@'%' IDENTIFIED BY 'new_password';
```

## Supprimer un utilisateur

```sql
DROP USER 'user'@'%';
```

## Autoriser la base de données et la table spécifiées à un utilisateur

MySQL a de nombreuses permissions comme `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `ALTER`, `CREATE`, `DROP`, etc. Si vous avez besoin d'accorder tous les privilèges, vous pouvez écrire `ALL`.

```sql
-- Accorder des privilèges SELECT sur la table spécifiée
GRANT SELECT ON db_name.table_name TO 'user'@'%';
-- Autoriser les privilèges SELECT, INSERT, UPDATE, DELETE pour la table spécifiée
GRANT SELECT, INSERT, UPDATE, DELETE ON db_name.table_name TO 'user'@'%';
-- Accorder tous les privilèges à la bibliothèque db_name
GRANT ALL ON db_name.* TO 'user'@'%';
-- autoriser toutes les permissions
GRANT ALL ON *. * TO 'user'@'%';
```

## Révoquer l'autorisation de la base de données et de la table spécifiées

```sql
REVOKE SELECT ON db_name.table_name FROM 'user'@'%';
REVOKE ALL ON db_name.* FROM 'user'@'%';
REVOKE ALL ON *. * FROM 'user'@'%';
```


## Importation de données

### Importer à partir d'un fichier SQL

Les fichiers SQL peuvent être importés à l'aide de la commande `mysql`.

```sh
## Sans nom de base de données, vous devez spécifier la base de données dans sql
mysql -h host -P port -u user -p password < file_name.sql
# Spécifier la base de données, peut être spécifié dans sql sans base de données
mysql -h host -P port -u user -p password db_name < file_name.sql
```

Le fichier peut également être importé à l'aide de l'instruction SQL

```sql
SOURCE file_name.sql;
```

### Importation à partir d'un fichier texte

Les fichiers texte peuvent être importés dans une base de données, s'ils sont délimités par des sauts de ligne, une ligne de données par ligne, avec des tabulations (tab/`\t`) séparant les champs, vous pouvez alors importer la base de données directement en utilisant `mysqlimport`:

```sh
# Importer par défaut les champs et l'ordre
mysqlimport -h host -P port -u user -p db_name file_name.txt
# Spécifier les champs et l'ordre d'importation
mysqlimport -h host -P port -u user -p db_name --columns=filed1,filed2,field3 file_name.txt
```

Vous pouvez spécifier le délimiteur.

```sh
# Importer par défaut les champs et l'ordre
mysqlimport -h host -P port -u user -p db_name --fields-terminated-by=, --lines-terminated-by="\r\n" file_name.txt
# Spécifier les champs et l'ordre à importer
mysqlimport -h host -P port -u user -p db_name --fields-terminated-by=, --lines-terminated-by="\r\n" --columns=filed1,filed2,field3 file_name.txt
```

Vous pouvez également importer un fichier texte à l'aide de l'instruction SQL

```sql
-- Importer par défaut les champs et l'ordre
LOAD DATA INFILE 'file_name.sql' INTO TABLE table_name;
-- importer par champs et ordre spécifiés
LOAD DATA INFILE 'file_name.sql' INTO TABLE table_name (field1, field2, field3);
```

L'importation avec des instructions SQL permet également de spécifier des délimiteurs, par exemple:

```sql
-- Importer par défaut les champs et l'ordre
LOAD DATA INFILE 'file_name.txt' INTO TABLE table_name FIELDS TERMINATED BY ',' LINES TERMINATED BY '\r\n';
-- Spécifier les champs et l'ordre d'importation
LOAD DATA INFILE 'file_name.txt' INTO TABLE table_name FIELDS TERMINATED BY ',' LINES TERMINATED BY '\r\n' (field1, field2, field3);
```

## Exportation de données

### Exporter des données au format texte CSV en utilisant SQL

```sql
-- Exporter des données au format texte CSV
SELECT * FROM table_name INTO OUTFILE '/tmp/table_name.csv' FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\n';
```

### Exporter des données au format SQL en utilisant mysqldump

```sh
mysqldump -h host -P port -u user -p db_name > /tmp/db_name.sql
mysqldump -h host -P port -u user -p db_name table_name > /tmp/table_name.sql
```

### Exporter des données au format texte en utilisant mysql

```sh
mysql -h host -P port -u user -p -e "select * from table_name" db_name > /tmp/table_name.txt
```

Données exportées avec en-tête de table, une donnée occupe une ligne, chaque champ est séparé par des tabulations (tab/`\t`).

```
column1 column2 column3
value11 value12 value13
value21 value22 value23
```