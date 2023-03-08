# MySQL 常用命令及常用語句速查

## 使用mysql客戶端登錄數據庫

```sh
mysql -h host -P port -u user -p
```

還可以帶上數據庫名，登錄後直接使用指定的數據庫：

```sh
mysql -h host -P port -u user -p dbname
```

其中`host`是數據庫服務器地址，`port`是端口號，`user`是用戶名，`p`表示使用密碼，但是不在命令中直接輸入，而是按下回車後單獨輸入。

## 查看數據庫

```sql
SHOW DATABASES;
```

## 創建數據庫

```sql
-- 創建數據庫
CREATE DATABASE db_name;
-- 僅當目標數據庫不存在時創建
CREATE DATABASE IF NOT EXISTS db_name;
-- 創建數據庫，並設置字符集
CREATE DATABASE db_name DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
-- 僅當目標數據庫不存在時創建，並設置字符集
CREATE DATABASE IF NOT EXISTS db_name DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
```

## 刪除數據庫

```sql
DROP DATABASE db_name;
```

## 選擇使用數據庫

```sql
USE db_name;
```

## 查看錶列表

```sql
SHOW TABLES;
```

## 創建表

首先需要了解每個字段的屬性，如類型、長度、是否爲空、是否爲自增值等。常見的爲：

- 類型(長度)，如`VARCHAR(255)`、`INT`、`TEXT`、`TIMESTAMP`、`DATETIME`等
- 是否爲空，`NULL`、`NOT NULL`
- 默認值，`DEFAULT value`
- 自增 `AUTO_INCREMENT`
- 主鍵 `PRIMARY KEY`
- 備註 `COMMENT '備註'`
- 編碼字符集 `CHARACTER SET utf8mb4`
- 排序方法 `COLLATE utf8mb4_general_ci`

寫字段時先寫字段名，再寫字段屬性。

創建表：

```sql
CREATE TABLE table_name (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE table_name (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL DEFAULT '' COMMENT '名字',
  age INT NOT NULL DEFAULT 0 COMMENT '年齡',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '創建時間',
);
```

## 查看錶結構

```sql
-- 查看錶結構
DESC table_name;
-- 查看創建表的SQL語句
SHOW CREATE TABLE table_name;
```

## 刪除表

```sql
DROP TABLE table_name;
```

## 修改表名/重命名錶

```sql
ALTER TABLE table_name RENAME TO new_table_name;
```

## 添加字段/添加列

```sql
ALTER TABLE table_name ADD COLUMN new_column_name;
ALTER TABLE table_name ADD COLUMN new_column_name VARCHAR(255) NOT NULL;
ALTER TABLE table_name ADD COLUMN new_column_name INT NOT NULL DEFAULT 0 COMMENT '備註';
ALTER TABLE table_name ADD COLUMN new_column_name INT NOT NULL DEFAULT 0 COMMENT '備註' AFTER column_name;
```

## 刪除字段/刪除列

```sql
ALTER TABLE table_name DROP COLUMN column_name;
```

## 修改字段屬性/列屬性

```sql
ALTER TABLE table_name MODIFY COLUMN column_name VARCHAR(255) NOT NULL;
ALTER TABLE table_name MODIFY COLUMN column_name VARCHAR(255) NOT NULL DEFAULT '' COMMENT '備註';
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
-- 添加單字段普通索引
ALTER TABLE table_name ADD INDEX index_name (column_name);
-- 添加多字段聯合索引
ALTER TABLE table_name ADD INDEX index_name (column_name1, column_name2);
-- 添加唯一索引
ALTER TABLE table_name ADD UNIQUE INDEX index_name (column_name);
-- 添加主鍵索引
ALTER TABLE table_name ADD PRIMARY KEY (column_name);
```

## 刪除索引

```sql
ALTER TABLE table_name DROP INDEX index_name;
ALTER TABLE table_name DROP PRIMARY KEY;
```

## 創建用戶

MySQL 用戶按 IP 授權，用戶名+IP的組合纔是完整的用戶。例如`'user'@'172.8.8.1'`和`'user'@'172.8.8.2'`是不同的用戶。

當一個用戶允許所有 IP 訪問時，可以使用`'%'`作爲IP。當需要限制一個 IP 段訪問時，需要指定子網，例如要允許`172.8.8.*`訪問，需要使用`'172.8.8.0/255.255.255.0'`。

```sql
CREATE USER 'user'@'%' IDENTIFIED BY 'password';
CREATE USER 'user'@'172.8.8.1' IDENTIFIED BY 'password';
CREATE USER 'user'@'172.8.8.2' IDENTIFIED BY 'password';
CREATE USER 'user'@'172.8.8.0/255.255.255.0' IDENTIFIED BY 'password';
```

## 查看用戶

```sql
SELECT * FROM mysql.user;
-- 只查看用戶名和IP
SELECT user, host FROM mysql.user;
```

## 修改用戶密碼

```sql
ALTER USER 'user'@'%' IDENTIFIED BY 'new_password';
```

## 刪除用戶

```sql
DROP USER 'user'@'%';
```

## 將指定庫表授權給用戶

MySQL 有很多的權限，如`SELECT`、`INSERT`、`UPDATE`、`DELETE`、`ALTER`、`CREATE`、`DROP`等。如果需要授予所有權限，可以寫`ALL`。

```sql
-- 授權指定表的SELECT權限
GRANT SELECT ON db_name.table_name TO 'user'@'%';
-- 授權指定表的SELECT、INSERT、UPDATE、DELETE權限
GRANT SELECT, INSERT, UPDATE, DELETE ON db_name.table_name TO 'user'@'%';
-- 授權db_name庫的所有權限
GRANT ALL ON db_name.* TO 'user'@'%';
-- 授權所有權限
GRANT ALL ON *.* TO 'user'@'%';
```

## 取消指定庫表的授權

```sql
REVOKE SELECT ON db_name.table_name FROM 'user'@'%';
REVOKE ALL ON db_name.* FROM 'user'@'%';
REVOKE ALL ON *.* FROM 'user'@'%';
```

## 導入數據

### 從SQL文件導入

可使用`mysql`命令導入SQL文件：

```sh
# 不帶數據庫名，需要在sql中指定數據庫
mysql -h host -P port -u user -p password < file_name.sql
# 指定數據庫，可在sql中不指定數據庫
mysql -h host -P port -u user -p password db_name < file_name.sql
```

也可使用 SQL 語句導入文件：

```sql
SOURCE file_name.sql;
```

### 從文本文件導入

文本文件可以導入數據庫，如果使用換行符分隔，每行一條數據，字段之間使用製表符（tab/`\t`）分隔，則可以直接使用`mysqlimport`導入數據庫：

```sh
# 按默認字段和順序導入
mysqlimport -h host -P port -u user -p db_name file_name.txt
# 指定字段和順序導入
mysqlimport -h host -P port -u user -p db_name --columns=filed1,filed2,field3 file_name.txt
```

可以指定分隔符：

```sh
# 按默認字段和順序導入
mysqlimport -h host -P port -u user -p db_name --fields-terminated-by=, --lines-terminated-by="\r\n" file_name.txt
# 指定字段和順序導入
mysqlimport -h host -P port -u user -p db_name --fields-terminated-by=, --lines-terminated-by="\r\n" --columns=filed1,filed2,field3 file_name.txt
```

也可以使用 SQL 語句導入文本文件：

```sql
-- 按默認字段和順序導入
LOAD DATA INFILE 'file_name.sql' INTO TABLE table_name;
-- 指定字段和順序導入
LOAD DATA INFILE 'file_name.sql' INTO TABLE table_name (field1, field2, field3);
```

使用 SQL 語句導入也可以指定分隔符，如：

```sql
-- 按默認字段和順序導入
LOAD DATA INFILE 'file_name.txt' INTO TABLE table_name FIELDS TERMINATED BY ',' LINES TERMINATED BY '\r\n';
-- 指定字段和順序導入
LOAD DATA INFILE 'file_name.txt' INTO TABLE table_name FIELDS TERMINATED BY ',' LINES TERMINATED BY '\r\n' (field1, field2, field3);
```

## 導出數據

### 使用SQL導出CSV文本格式數據

```sql
-- 以CSV文本格式導出數據
SELECT * FROM table_name INTO OUTFILE '/tmp/table_name.csv' FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\n';
```

### 使用mysqldump導出SQL格式數據

```sh
mysqldump -h host -P port -u user -p db_name > /tmp/db_name.sql
mysqldump -h host -P port -u user -p db_name table_name > /tmp/table_name.sql
```

### 使用mysql導出文本格式數據

```sh
mysql -h host -P port -u user -p -e "select * from table_name" db_name > /tmp/table_name.txt
```

導出的數據帶表頭，一條數據佔一行，每個字段用製表符（tab/`\t`）分隔。

```
column1 column2 column3
value11 value12 value13
value21 value22 value23
```
