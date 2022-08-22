# MySQL 常用命令及常用语句速查

## 使用mysql客户端登录数据库

```sh
mysql -h host -P port -u user -p
```

还可以带上数据库名，登录后直接使用指定的数据库：

```sh
mysql -h host -P port -u user -p dbname
```

其中`host`是数据库服务器地址，`port`是端口号，`user`是用户名，`p`表示使用密码，但是不在命令中直接输入，而是按下回车后单独输入。

## 查看数据库

```sql
SHOW DATABASES;
```

## 创建数据库

```sql
-- 创建数据库
CREATE DATABASE db_name;
-- 仅当目标数据库不存在时创建
CREATE DATABASE IF NOT EXISTS db_name;
-- 创建数据库，并设置字符集
CREATE DATABASE db_name DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
-- 仅当目标数据库不存在时创建，并设置字符集
CREATE DATABASE IF NOT EXISTS db_name DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
```

## 删除数据库

```sql
DROP DATABASE db_name;
```

## 选择使用数据库

```sql
USE db_name;
```

## 查看表列表

```sql
SHOW TABLES;
```

## 创建表

首先需要了解每个字段的属性，如类型、长度、是否为空、是否为自增值等。常见的为：

- 类型(长度)，如`VARCHAR(255)`、`INT`、`TEXT`、`TIMESTAMP`、`DATETIME`等
- 是否为空，`NULL`、`NOT NULL`
- 默认值，`DEFAULT value`
- 自增 `AUTO_INCREMENT`
- 主键 `PRIMARY KEY`
- 备注 `COMMENT '备注'`
- 编码字符集 `CHARACTER SET utf8mb4`
- 排序方法 `COLLATE utf8mb4_general_ci`

写字段时先写字段名，再写字段属性。

创建表：

```sql
CREATE TABLE table_name (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE table_name (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL DEFAULT '' COMMENT '名字',
  age INT NOT NULL DEFAULT 0 COMMENT '年龄',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
);
```

## 查看表结构

```sql
-- 查看表结构
DESC table_name;
-- 查看创建表的SQL语句
SHOW CREATE TABLE table_name;
```

## 删除表

```sql
DROP TABLE table_name;
```

## 修改表名/重命名表

```sql
ALTER TABLE table_name RENAME TO new_table_name;
```

## 添加字段/添加列

```sql
ALTER TABLE table_name ADD COLUMN new_column_name;
ALTER TABLE table_name ADD COLUMN new_column_name VARCHAR(255) NOT NULL;
ALTER TABLE table_name ADD COLUMN new_column_name INT NOT NULL DEFAULT 0 COMMENT '备注';
ALTER TABLE table_name ADD COLUMN new_column_name INT NOT NULL DEFAULT 0 COMMENT '备注' AFTER column_name;
```

## 删除字段/删除列

```sql
ALTER TABLE table_name DROP COLUMN column_name;
```

## 修改字段属性/列属性

```sql
ALTER TABLE table_name MODIFY COLUMN column_name VARCHAR(255) NOT NULL;
ALTER TABLE table_name MODIFY COLUMN column_name VARCHAR(255) NOT NULL DEFAULT '' COMMENT '备注';
```

## 修改字段名/列名

```sql
ALTER TABLE table_name CHANGE COLUMN old_column_name new_column_name;
```

## 查看索引

```sql
SHOW INDEX FROM table_name;
```

## 添加索引

```sql
-- 添加单字段普通索引
ALTER TABLE table_name ADD INDEX index_name (column_name);
-- 添加多字段联合索引
ALTER TABLE table_name ADD INDEX index_name (column_name1, column_name2);
-- 添加唯一索引
ALTER TABLE table_name ADD UNIQUE INDEX index_name (column_name);
-- 添加主键索引
ALTER TABLE table_name ADD PRIMARY KEY (column_name);
```

## 删除索引

```sql
ALTER TABLE table_name DROP INDEX index_name;
ALTER TABLE table_name DROP PRIMARY KEY;
```

## 创建用户

MySQL 用户按 IP 授权，用户名+IP的组合才是完整的用户。例如`'user'@'172.8.8.1'`和`'user'@'172.8.8.2'`是不同的用户。

当一个用户允许所有 IP 访问时，可以使用`'%'`作为IP。当需要限制一个 IP 段访问时，需要指定子网，例如要允许`172.8.8.*`访问，需要使用`'172.8.8.0/255.255.255.0'`。

```sql
CREATE USER 'user'@'%' IDENTIFIED BY 'password';
CREATE USER 'user'@'172.8.8.1' IDENTIFIED BY 'password';
CREATE USER 'user'@'172.8.8.2' IDENTIFIED BY 'password';
CREATE USER 'user'@'172.8.8.0/255.255.255.0' IDENTIFIED BY 'password';
```

## 查看用户

```sql
SELECT * FROM mysql.user;
-- 只查看用户名和IP
SELECT user, host FROM mysql.user;
```

## 修改用户密码

```sql
ALTER USER 'user'@'%' IDENTIFIED BY 'new_password';
```

## 删除用户

```sql
DROP USER 'user'@'%';
```

## 将指定库表授权给用户

MySQL 有很多的权限，如`SELECT`、`INSERT`、`UPDATE`、`DELETE`、`ALTER`、`CREATE`、`DROP`等。如果需要授予所有权限，可以写`ALL`。

```sql
-- 授权指定表的SELECT权限
GRANT SELECT ON db_name.table_name TO 'user'@'%';
-- 授权指定表的SELECT、INSERT、UPDATE、DELETE权限
GRANT SELECT, INSERT, UPDATE, DELETE ON db_name.table_name TO 'user'@'%';
-- 授权db_name库的所有权限
GRANT ALL ON db_name.* TO 'user'@'%';
-- 授权所有权限
GRANT ALL ON *.* TO 'user'@'%';
```

## 取消指定库表的授权

```sql
REVOKE SELECT ON db_name.table_name FROM 'user'@'%';
REVOKE ALL ON db_name.* FROM 'user'@'%';
REVOKE ALL ON *.* FROM 'user'@'%';
```

## 导入数据

### 从SQL文件导入

可使用`mysql`命令导入SQL文件：

```sh
# 不带数据库名，需要在sql中指定数据库
mysql -h host -P port -u user -p password < file_name.sql
# 指定数据库，可在sql中不指定数据库
mysql -h host -P port -u user -p password db_name < file_name.sql
```

也可使用 SQL 语句导入文件：

```sql
SOURCE file_name.sql;
```

### 从文本文件导入

文本文件可以导入数据库，如果使用换行符分隔，每行一条数据，字段之间使用制表符（tab/`\t`）分隔，则可以直接使用`mysqlimport`导入数据库：

```sh
# 按默认字段和顺序导入
mysqlimport -h host -P port -u user -p db_name file_name.txt
# 指定字段和顺序导入
mysqlimport -h host -P port -u user -p db_name --columns=filed1,filed2,field3 file_name.txt
```

可以指定分隔符：

```sh
# 按默认字段和顺序导入
mysqlimport -h host -P port -u user -p db_name --fields-terminated-by=, --lines-terminated-by="\r\n" file_name.txt
# 指定字段和顺序导入
mysqlimport -h host -P port -u user -p db_name --fields-terminated-by=, --lines-terminated-by="\r\n" --columns=filed1,filed2,field3 file_name.txt
```

也可以使用 SQL 语句导入文本文件：

```sql
-- 按默认字段和顺序导入
LOAD DATA INFILE 'file_name.sql' INTO TABLE table_name;
-- 指定字段和顺序导入
LOAD DATA INFILE 'file_name.sql' INTO TABLE table_name (field1, field2, field3);
```

使用 SQL 语句导入也可以指定分隔符，如：

```sql
-- 按默认字段和顺序导入
LOAD DATA INFILE 'file_name.txt' INTO TABLE table_name FIELDS TERMINATED BY ',' LINES TERMINATED BY '\r\n';
-- 指定字段和顺序导入
LOAD DATA INFILE 'file_name.txt' INTO TABLE table_name FIELDS TERMINATED BY ',' LINES TERMINATED BY '\r\n' (field1, field2, field3);
```

## 导出数据

### 使用SQL导出CSV文本格式数据

```sql
-- 以CSV文本格式导出数据
SELECT * FROM table_name INTO OUTFILE '/tmp/table_name.csv' FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\n';
```

### 使用mysqldump导出SQL格式数据

```sh
mysqldump -h host -P port -u user -p db_name > /tmp/db_name.sql
mysqldump -h host -P port -u user -p db_name table_name > /tmp/table_name.sql
```

### 使用mysql导出文本格式数据

```sh
mysql -h host -P port -u user -p -e "select * from table_name" db_name > /tmp/table_name.txt
```

导出的数据带表头，一条数据占一行，每个字段用制表符（tab/`\t`）分隔。

```
column1 column2 column3
value11 value12 value13
value21 value22 value23
```
