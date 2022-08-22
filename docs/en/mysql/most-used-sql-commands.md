# MySQL Common Commands and Common Statements Quick Search

## Login to database using mysql client

```sh
mysql -h host -P port -u user -p
```

You can also bring the database name and use the specified database directly after logging in:

```sh
mysql -h host -P port -u user -p dbname
```

where `host` is the database server address, `port` is the port number, `user` is the user name, and `p` means use the password, but instead of entering it directly in the command, press enter and enter it separately.

## View database

```sql
SHOW DATABASES;
```

## Create a database

```sql
-- Create the database
CREATE DATABASE db_name;
-- create only if the target database does not exist
CREATE DATABASE IF NOT EXISTS db_name;
-- create the database and set the character set
CREATE DATABASE db_name DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
-- create only if the target database does not exist, and set the character set
CREATE DATABASE IF NOT EXISTS db_name DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
```

## Delete database

```sql
DROP DATABASE db_name;
```

## Select the database to use

```sql
USE db_name;
```

## View the list of tables

```sql
SHOW TABLES;
```

## Create a table

First you need to know the properties of each field, such as type, length, whether it is empty, whether it is self-valued, etc. The common ones are.

- Type (length), such as `VARCHAR(255)`, `INT`, `TEXT`, `TIMESTAMP`, `DATETIME`, etc.
- Whether to be null, `NULL`, `NOT NULL`
- Default value, `DEFAULT value`
- auto-increment `AUTO_INCREMENT`
- primary key `PRIMARY KEY`
- Remarks `COMMENT 'Remarks'`
- Encoding character set ` CHARACTER SET utf8mb4`
- Sort by `COLLATE utf8mb4_general_ci`

Write the field with the field name first, then the field attributes.

Create the table.

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

## View table structure

```sql
-- View table structure
DESC table_name;
-- View the SQL statement that created the table
SHOW CREATE TABLE table_name;
```

## Delete a table

```sql
DROP TABLE table_name;
```

## Modify table name/rename table

```sql
ALTER TABLE table_name RENAME TO new_table_name;
```

## Add fields/add columns

```sql
ALTER TABLE table_name ADD COLUMN new_column_name;
ALTER TABLE table_name ADD COLUMN new_column_name VARCHAR(255) NOT NULL;
ALTER TABLE table_name ADD COLUMN new_column_name INT NOT NULL DEFAULT 0 COMMENT 'Remarks';
ALTER TABLE table_name ADD COLUMN new_column_name INT NOT NULL DEFAULT 0 COMMENT 'Remarks' AFTER column_name;
```

## Delete field/delete column

```sql
ALTER TABLE table_name DROP COLUMN column_name;
```

## Modify field attributes/column attributes

```sql
ALTER TABLE table_name MODIFY COLUMN column_name VARCHAR(255) NOT NULL;
ALTER TABLE table_name MODIFY COLUMN column_name VARCHAR(255) NOT NULL DEFAULT '' COMMENT 'Remarks';
```

## Modify field name/column name

```sql
ALTER TABLE table_name CHANGE COLUMN old_column_name new_column_name;
```

## View index

```sql
SHOW INDEX FROM table_name;
```

## Add an index

```sql
-- Add a single-field general index
ALTER TABLE table_name ADD INDEX index_name (column_name);
-- Add a multifield joint index
ALTER TABLE table_name ADD INDEX index_name (column_name1, column_name2);
-- Add a unique index
ALTER TABLE table_name ADD UNIQUE INDEX index_name (column_name);
-- Add a primary key index
ALTER TABLE table_name ADD PRIMARY KEY (column_name);
```

## Delete index

```sql
ALTER TABLE table_name DROP INDEX index_name;
ALTER TABLE table_name DROP PRIMARY KEY;
```

## Create User

MySQL users are authorized by IP, the combination of username + IP is the complete user. For example, `'user'@'172.8.8.1'` and `'user'@'172.8.8.2'` are different users.

When a user allows access to all IPs, you can use `'%'` as the IP. when you need to restrict access to an IP segment, you need to specify the subnet, for example to allow access to `172.8.8.*`, you need to use `'172.8.8.0/255.255.255.0'`.

```sql
CREATE USER 'user'@'%' IDENTIFIED BY 'password';
CREATE USER 'user'@'172.8.8.1' IDENTIFIED BY 'password';
CREATE USER 'user'@'172.8.8.2' IDENTIFIED BY 'password';
CREATE USER 'user'@'172.8.8.0/255.255.255.0' IDENTIFIED BY 'password';
```

## View user list

```sql
SELECT * FROM mysql.user;
-- View only the user name and IP
SELECT user, host FROM mysql.user;
```

## Change user password

```sql
ALTER USER 'user'@'%' IDENTIFIED BY 'new_password';
```

## Delete user

```sql
DROP USER 'user'@'%';
```

## Authorize the specified db & table to a user

MySQL has many permissions such as `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `ALTER`, `CREATE`, `DROP`, etc. If you need to grant all privileges, you can write `ALL`.

```sql
-- Grant SELECT privileges on the specified table
GRANT SELECT ON db_name.table_name TO 'user'@'%';
-- Authorize SELECT, INSERT, UPDATE, DELETE privileges for the specified table
GRANT SELECT, INSERT, UPDATE, DELETE ON db_name.table_name TO 'user'@'%';
-- Grant all privileges to the db_name library
GRANT ALL ON db_name.* TO 'user'@'%';
-- authorize all permissions
GRANT ALL ON *. * TO 'user'@'%';
```

## Deauthorize the specified db & table

```sql
REVOKE SELECT ON db_name.table_name FROM 'user'@'%';
REVOKE ALL ON db_name.* FROM 'user'@'%';
REVOKE ALL ON *. * FROM 'user'@'%';
```


## Importing data

### Import from SQL file

SQL files can be imported using the `mysql` command.

```sh
## Without database name, you need to specify the database in sql
mysql -h host -P port -u user -p password < file_name.sql
# Specify database, can be specified in sql without database
mysql -h host -P port -u user -p password db_name < file_name.sql
```

The file can also be imported using the SQL statement

```sql
SOURCE file_name.sql;
```

### Importing from a text file

Text files can be imported into a database, if they are delimited by newlines, one line of data per line, with tabs (tab/`\t`) separating the fields, then you can import the database directly using `mysqlimport`: ```sh

```sh
# Import by default fields and order
mysqlimport -h host -P port -u user -p db_name file_name.txt
# Specify the fields and order of import
mysqlimport -h host -P port -u user -p db_name --columns=filed1,filed2,field3 file_name.txt
```

You can specify the delimiter.

```sh
# Import by default fields and order
mysqlimport -h host -P port -u user -p db_name --fields-terminated-by=, --lines-terminated-by="\r\n" file_name.txt
# Specify the fields and order to import
mysqlimport -h host -P port -u user -p db_name --fields-terminated-by=, --lines-terminated-by="\r\n" --columns=filed1,filed2,field3 file_name. txt
```

You can also import a text file using the SQL statement

```sql
-- Import by default fields and order
LOAD DATA INFILE 'file_name.sql' INTO TABLE table_name;
-- import by specified fields and order
LOAD DATA INFILE 'file_name.sql' INTO TABLE table_name (field1, field2, field3);
```

Importing with SQL statements also allows you to specify delimiters, e.g.

```sql
-- Import by default fields and order
LOAD DATA INFILE 'file_name.txt' INTO TABLE table_name FIELDS TERMINATED BY ',' LINES TERMINATED BY '\r\n';
-- Specify the fields and order of import
LOAD DATA INFILE 'file_name.txt' INTO TABLE table_name FIELDS TERMINATED BY ',' LINES TERMINATED BY '\r\n' (field1, field2, field3);
```

## Exporting data

### Export CSV text format data using SQL

```sql
-- Export data in CSV text format
SELECT * FROM table_name INTO OUTFILE '/tmp/table_name.csv' FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\n';
```

### Export SQL format data using mysqldump

```sh
mysqldump -h host -P port -u user -p db_name > /tmp/db_name.sql
mysqldump -h host -P port -u user -p db_name table_name > /tmp/table_name.sql
```

### Export data in text format using mysql

```sh
mysql -h host -P port -u user -p -e "select * from table_name" db_name > /tmp/table_name.txt
```

Exported data with table header, one data occupies one row, each field is separated by tabs (tab/`\t`).

```
column1 column2 column3
value11 value12 value13
value21 value22 value23
```
