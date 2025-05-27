# Comandos Comunes de MySQL y Búsqueda Rápida de Sentencias Comunes

## Iniciar sesión en la base de datos usando el cliente mysql

```sh
mysql -h host -P port -u user -p
```

También puedes incluir el nombre de la base de datos y usar la base de datos especificada directamente después de iniciar sesión:

```sh
mysql -h host -P port -u user -p dbname
```

donde `host` es la dirección del servidor de base de datos, `port` es el número de puerto, `user` es el nombre de usuario, y `p` significa usar la contraseña, pero en lugar de ingresarla directamente en el comando, presiona enter e ingrésala por separado.

## Ver bases de datos

```sql
SHOW DATABASES;
```

## Crear una base de datos

```sql
-- Crear la base de datos
CREATE DATABASE db_name;
-- crear solo si la base de datos objetivo no existe
CREATE DATABASE IF NOT EXISTS db_name;
-- crear la base de datos y establecer el conjunto de caracteres
CREATE DATABASE db_name DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
-- crear solo si la base de datos objetivo no existe, y establecer el conjunto de caracteres
CREATE DATABASE IF NOT EXISTS db_name DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
```

## Eliminar base de datos

```sql
DROP DATABASE db_name;
```

## Seleccionar la base de datos a usar

```sql
USE db_name;
```

## Ver la lista de tablas

```sql
SHOW TABLES;
```

## Crear una tabla

Primero necesitas conocer las propiedades de cada campo, como tipo, longitud, si está vacío, si es autovalorado, etc. Los comunes son:

- Tipo (longitud), como `VARCHAR(255)`, `INT`, `TEXT`, `TIMESTAMP`, `DATETIME`, etc.
- Si puede ser nulo, `NULL`, `NOT NULL`
- Valor predeterminado, `DEFAULT value`
- Auto-incremento `AUTO_INCREMENT`
- Clave primaria `PRIMARY KEY`
- Comentarios `COMMENT 'Comentarios'`
- Conjunto de caracteres de codificación `CHARACTER SET utf8mb4`
- Ordenar por `COLLATE utf8mb4_general_ci`

Escribe el campo con el nombre del campo primero, luego los atributos del campo.

Crear la tabla.

```sql
CREATE TABLE table_name (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE table_name (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL DEFAULT '' COMMENT 'nombre',
  age INT NOT NULL DEFAULT 0 COMMENT 'edad',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'tiempo de creación',
);
```

## Ver estructura de tabla

```sql
-- Ver estructura de tabla
DESC table_name;
-- Ver la sentencia SQL que creó la tabla
SHOW CREATE TABLE table_name;
```

## Eliminar una tabla

```sql
DROP TABLE table_name;
```

## Modificar nombre de tabla/renombrar tabla

```sql
ALTER TABLE table_name RENAME TO new_table_name;
```

## Agregar campos/agregar columnas

```sql
ALTER TABLE table_name ADD COLUMN new_column_name;
ALTER TABLE table_name ADD COLUMN new_column_name VARCHAR(255) NOT NULL;
ALTER TABLE table_name ADD COLUMN new_column_name INT NOT NULL DEFAULT 0 COMMENT 'Comentarios';
ALTER TABLE table_name ADD COLUMN new_column_name INT NOT NULL DEFAULT 0 COMMENT 'Comentarios' AFTER column_name;
```

## Eliminar campo/eliminar columna

```sql
ALTER TABLE table_name DROP COLUMN column_name;
```

## Modificar atributos de campo/atributos de columna

```sql
ALTER TABLE table_name MODIFY COLUMN column_name VARCHAR(255) NOT NULL;
ALTER TABLE table_name MODIFY COLUMN column_name VARCHAR(255) NOT NULL DEFAULT '' COMMENT 'Comentarios';
```

## Modificar nombre de campo/nombre de columna

```sql
ALTER TABLE table_name CHANGE COLUMN old_column_name new_column_name;
```

## Ver índice

```sql
SHOW INDEX FROM table_name;
```

## Agregar un índice

```sql
-- Agregar un índice general de campo único
ALTER TABLE table_name ADD INDEX index_name (column_name);
-- Agregar un índice conjunto de múltiples campos
ALTER TABLE table_name ADD INDEX index_name (column_name1, column_name2);
-- Agregar un índice único
ALTER TABLE table_name ADD UNIQUE INDEX index_name (column_name);
-- Agregar un índice de clave primaria
ALTER TABLE table_name ADD PRIMARY KEY (column_name);
```

## Eliminar índice

```sql
ALTER TABLE table_name DROP INDEX index_name;
ALTER TABLE table_name DROP PRIMARY KEY;
```

## Crear Usuario

Los usuarios de MySQL están autorizados por IP, la combinación de nombre de usuario + IP es el usuario completo. Por ejemplo, `'user'@'172.8.8.1'` y `'user'@'172.8.8.2'` son usuarios diferentes.

Cuando un usuario permite el acceso a todas las IPs, puedes usar `'%'` como IP. Cuando necesitas restringir el acceso a un segmento de IP, debes especificar la subred, por ejemplo, para permitir el acceso a `172.8.8.*`, debes usar `'172.8.8.0/255.255.255.0'`.

```sql
CREATE USER 'user'@'%' IDENTIFIED BY 'password';
CREATE USER 'user'@'172.8.8.1' IDENTIFIED BY 'password';
CREATE USER 'user'@'172.8.8.2' IDENTIFIED BY 'password';
CREATE USER 'user'@'172.8.8.0/255.255.255.0' IDENTIFIED BY 'password';
```

## Ver lista de usuarios

```sql
SELECT * FROM mysql.user;
-- Ver solo el nombre de usuario e IP
SELECT user, host FROM mysql.user;
```

## Cambiar contraseña de usuario

```sql
ALTER USER 'user'@'%' IDENTIFIED BY 'new_password';
```

## Eliminar usuario

```sql
DROP USER 'user'@'%';
```

## Autorizar la db y tabla especificada a un usuario

MySQL tiene muchos permisos como `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `ALTER`, `CREATE`, `DROP`, etc. Si necesitas otorgar todos los privilegios, puedes escribir `ALL`.

```sql
-- Otorgar privilegios SELECT en la tabla especificada
GRANT SELECT ON db_name.table_name TO 'user'@'%';
-- Autorizar privilegios SELECT, INSERT, UPDATE, DELETE para la tabla especificada
GRANT SELECT, INSERT, UPDATE, DELETE ON db_name.table_name TO 'user'@'%';
-- Otorgar todos los privilegios a la biblioteca db_name
GRANT ALL ON db_name.* TO 'user'@'%';
-- autorizar todos los permisos
GRANT ALL ON *. * TO 'user'@'%';
```

## Desautorizar la db y tabla especificada

```sql
REVOKE SELECT ON db_name.table_name FROM 'user'@'%';
REVOKE ALL ON db_name.* FROM 'user'@'%';
REVOKE ALL ON *. * FROM 'user'@'%';
```


## Importar datos

### Importar desde archivo SQL

Los archivos SQL se pueden importar usando el comando `mysql`.

```sh
## Sin nombre de base de datos, necesitas especificar la base de datos en sql
mysql -h host -P port -u user -p password < file_name.sql
# Especificar base de datos, puede especificarse en sql sin base de datos
mysql -h host -P port -u user -p password db_name < file_name.sql
```

El archivo también se puede importar usando la sentencia SQL

```sql
SOURCE file_name.sql;
```

### Importar desde un archivo de texto

Los archivos de texto se pueden importar a una base de datos, si están delimitados por saltos de línea, una línea de datos por línea, con tabulaciones (tab/`\t`) separando los campos, entonces puedes importar la base de datos directamente usando `mysqlimport`:

```sh
# Importar por campos y orden predeterminados
mysqlimport -h host -P port -u user -p db_name file_name.txt
# Especificar los campos y el orden de importación
mysqlimport -h host -P port -u user -p db_name --columns=filed1,filed2,field3 file_name.txt
```

Puedes especificar el delimitador.

```sh
# Importar por campos y orden predeterminados
mysqlimport -h host -P port -u user -p db_name --fields-terminated-by=, --lines-terminated-by="\r\n" file_name.txt
# Especificar los campos y el orden de importación
mysqlimport -h host -P port -u user -p db_name --fields-terminated-by=, --lines-terminated-by="\r\n" --columns=filed1,filed2,field3 file_name.txt
```

También puedes importar un archivo de texto usando la sentencia SQL

```sql
-- Importar por campos y orden predeterminados
LOAD DATA INFILE 'file_name.sql' INTO TABLE table_name;
-- importar por campos y orden especificados
LOAD DATA INFILE 'file_name.sql' INTO TABLE table_name (field1, field2, field3);
```

La importación con sentencias SQL también permite especificar delimitadores, por ejemplo:

```sql
-- Importar por campos y orden predeterminados
LOAD DATA INFILE 'file_name.txt' INTO TABLE table_name FIELDS TERMINATED BY ',' LINES TERMINATED BY '\r\n';
-- Especificar los campos y el orden de importación
LOAD DATA INFILE 'file_name.txt' INTO TABLE table_name FIELDS TERMINATED BY ',' LINES TERMINATED BY '\r\n' (field1, field2, field3);
```

## Exportar datos

### Exportar datos en formato de texto CSV usando SQL

```sql
-- Exportar datos en formato de texto CSV
SELECT * FROM table_name INTO OUTFILE '/tmp/table_name.csv' FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\n';
```

### Exportar datos en formato SQL usando mysqldump

```sh
mysqldump -h host -P port -u user -p db_name > /tmp/db_name.sql
mysqldump -h host -P port -u user -p db_name table_name > /tmp/table_name.sql
```

### Exportar datos en formato de texto usando mysql

```sh
mysql -h host -P port -u user -p -e "select * from table_name" db_name > /tmp/table_name.txt
```

Datos exportados con encabezado de tabla, un dato ocupa una fila, cada campo está separado por tabulaciones (tab/`\t`).

```
column1 column2 column3
value11 value12 value13
value21 value22 value23
```