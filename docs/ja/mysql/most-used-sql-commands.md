# MySQLの共通コマンドと共通ステートメントのクイック検索

## mysqlクライアントを使用してデータベースにログインする

```sh
mysql -h ホスト -P ポート -u ユーザー -p
```

また、データベース名を指定してログイン後、指定したデータベースを直接使用することもできます。

```sh
mysql -h ホスト -P ポート -u ユーザー -p データベース名
```

ここで、`host`はデータベースサーバーのアドレス、`port`はポート番号、`user`はユーザー名、`p`はパスワードを使用することを意味しますが、コマンドに直接入力する代わりに、Enterを押して別途入力してください。

## データベースを表示する

```sql
SHOW DATABASES;
```

## データベースを作成する

```sql
-- データベースを作成する
CREATE DATABASE db_name;
-- ターゲットのデータベースが存在しない場合にのみ作成する
CREATE DATABASE IF NOT EXISTS db_name;
-- データベースを作成し、文字セットを設定する
CREATE DATABASE db_name DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
-- ターゲットのデータベースが存在しない場合にのみ作成し、文字セットを設定する
CREATE DATABASE IF NOT EXISTS db_name DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
```

## データベースを削除する

```sql
DROP DATABASE db_name;
```

## 使用するデータベースを選択する

```sql
USE db_name;
```

## テーブルのリストを表示する

```sql
SHOW TABLES;
```
## テーブルの作成

最初に、各フィールドのプロパティを知る必要があります。例えば、タイプ、長さ、空であるかどうか、自己値であるかどうかなどです。一般的なものは以下の通りです。

- タイプ（長さ）：`VARCHAR(255)`、`INT`、`TEXT`、`TIMESTAMP`、`DATETIME`など。
- NULLかどうか：`NULL`、`NOT NULL`
- デフォルト値：`DEFAULT value`
- 自動インクリメント：`AUTO_INCREMENT`
- プライマリキー：`PRIMARY KEY`
- 備考：`COMMENT 'Remarks'`
- エンコーディング文字セット：` CHARACTER SET utf8mb4`
- ソート：`COLLATE utf8mb4_general_ci`

フィールド名を先に書き、その後にフィールド属性を書きます。

テーブルを作成します。

```sql
CREATE TABLE table_name (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE table_name (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL DEFAULT '' COMMENT '名前',
  age INT NOT NULL DEFAULT 0 COMMENT '年齢',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '作成日時',
);
```

## テーブル構造の表示

```sql
-- テーブル構造の表示
DESC table_name;
-- テーブルを作成したSQL文の表示
SHOW CREATE TABLE table_name;
```

## テーブルの削除

```sql
DROP TABLE table_name;
```

## テーブル名の変更/テーブルの名前変更

```sql
ALTER TABLE table_name RENAME TO new_table_name;
```
## フィールド/カラムの追加

```sql
ALTER TABLE table_name ADD COLUMN new_column_name;
ALTER TABLE table_name ADD COLUMN new_column_name VARCHAR(255) NOT NULL;
ALTER TABLE table_name ADD COLUMN new_column_name INT NOT NULL DEFAULT 0 COMMENT 'Remarks';
ALTER TABLE table_name ADD COLUMN new_column_name INT NOT NULL DEFAULT 0 COMMENT 'Remarks' AFTER column_name;
```

## フィールド/カラムの削除

```sql
ALTER TABLE table_name DROP COLUMN column_name;
```

## フィールド属性/カラム属性の変更

```sql
ALTER TABLE table_name MODIFY COLUMN column_name VARCHAR(255) NOT NULL;
ALTER TABLE table_name MODIFY COLUMN column_name VARCHAR(255) NOT NULL DEFAULT '' COMMENT 'Remarks';
```

## フィールド名/カラム名の変更

```sql
ALTER TABLE table_name CHANGE COLUMN old_column_name new_column_name;
```

## インデックスの表示

```sql
SHOW INDEX FROM table_name;
```

## インデックスの追加

```sql
-- 単一フィールド一般インデックスの追加
ALTER TABLE table_name ADD INDEX index_name (column_name);
-- 複数フィールド結合インデックスの追加
ALTER TABLE table_name ADD INDEX index_name (column_name1, column_name2);
-- ユニークインデックスの追加
ALTER TABLE table_name ADD UNIQUE INDEX index_name (column_name);
-- 主キーインデックスの追加
ALTER TABLE table_name ADD PRIMARY KEY (column_name);
```
## インデックスの削除

```sql
ALTER TABLE table_name DROP INDEX index_name;
ALTER TABLE table_name DROP PRIMARY KEY;
```

## ユーザーの作成

MySQLのユーザーはIPによって認証されます。ユーザー名+IPの組み合わせが完全なユーザーです。例えば、`'user'@'172.8.8.1'`と`'user'@'172.8.8.2'`は異なるユーザーです。

ユーザーがすべてのIPからアクセスを許可する場合、IPに`'%'`を使用できます。IPセグメントへのアクセスを制限する必要がある場合は、サブネットを指定する必要があります。たとえば、`172.8.8.*`へのアクセスを許可するには、`'172.8.8.0/255.255.255.0'`を使用する必要があります。

```sql
CREATE USER 'user'@'%' IDENTIFIED BY 'password';
CREATE USER 'user'@'172.8.8.1' IDENTIFIED BY 'password';
CREATE USER 'user'@'172.8.8.2' IDENTIFIED BY 'password';
CREATE USER 'user'@'172.8.8.0/255.255.255.0' IDENTIFIED BY 'password';
```

## ユーザーリストの表示

```sql
SELECT * FROM mysql.user;
-- ユーザー名とIPのみ表示
SELECT user, host FROM mysql.user;
```

## ユーザーパスワードの変更

```sql
ALTER USER 'user'@'%' IDENTIFIED BY 'new_password';
```

## ユーザーの削除

```sql
DROP USER 'user'@'%';
```
## 特定のデータベースとテーブルをユーザーに認可する

MySQLには、`SELECT`、`INSERT`、`UPDATE`、`DELETE`、`ALTER`、`CREATE`、`DROP`などの多くの権限があります。すべての権限を付与する必要がある場合は、`ALL`と書くことができます。

```sql
-- 指定されたテーブルにSELECT権限を付与する
GRANT SELECT ON db_name.table_name TO 'user'@'%';
-- 指定されたテーブルにSELECT、INSERT、UPDATE、DELETE権限を付与する
GRANT SELECT, INSERT, UPDATE, DELETE ON db_name.table_name TO 'user'@'%';
-- db_nameライブラリにすべての権限を付与する
GRANT ALL ON db_name.* TO 'user'@'%';
-- すべての権限を認可する
GRANT ALL ON *.* TO 'user'@'%';
```

## 特定のデータベースとテーブルの認可を取り消す

```sql
REVOKE SELECT ON db_name.table_name FROM 'user'@'%';
REVOKE ALL ON db_name.* FROM 'user'@'%';
REVOKE ALL ON *.* FROM 'user'@'%';
```


## データのインポート

### SQLファイルからのインポート

SQLファイルは、`mysql`コマンドを使用してインポートできます。

```sh
## データベース名がない場合は、sqlでデータベースを指定する必要があります
mysql -h ホスト -P ポート -u ユーザー名 -p パスワード < ファイル名.sql
# データベースを指定する場合は、sqlで指定できます
mysql -h ホスト -P ポート -u ユーザー名 -p パスワード db_name < ファイル名.sql
```

SQLステートメントを使用してファイルをインポートすることもできます。

```sql
SOURCE ファイル名.sql;
```
### テキストファイルからのインポート

テキストファイルは、1行につき1行のデータで区切られ、タブ（タブ/`\t`）でフィールドが区切られている場合、データベースにインポートすることができます。その場合、`mysqlimport`を使用してデータベースを直接インポートできます。```sh

```sh
# デフォルトのフィールドと順序でインポート
mysqlimport -h ホスト -P ポート -u ユーザー -p データベース名 ファイル名.txt
# フィールドとインポートの順序を指定する
mysqlimport -h ホスト -P ポート -u ユーザー -p データベース名 --columns=filed1,filed2,field3 ファイル名.txt
```

区切り文字を指定することもできます。

```sh
# デフォルトのフィールドと順序でインポート
mysqlimport -h ホスト -P ポート -u ユーザー -p データベース名 --fields-terminated-by=, --lines-terminated-by="\r\n" ファイル名.txt
# インポートするフィールドと順序を指定する
mysqlimport -h ホスト -P ポート -u ユーザー -p db_name --fields-terminated-by=, --lines-terminated-by="\r\n" --columns=filed1,filed2,field3 file_name. txt
```

また、SQLステートメントを使用してテキストファイルをインポートすることもできます。

```sql
-- デフォルトのフィールドと順序でインポート
LOAD DATA INFILE 'file_name.sql' INTO TABLE table_name;
-- 指定されたフィールドと順序でインポート
LOAD DATA INFILE 'file_name.sql' INTO TABLE table_name (field1, field2, field3);
```

SQLステートメントを使用したインポートでは、区切り文字を指定することもできます。

```sql
-- デフォルトのフィールドと順序でインポート
LOAD DATA INFILE 'file_name.txt' INTO TABLE table_name FIELDS TERMINATED BY ',' LINES TERMINATED BY '\r\n';
-- インポートするフィールドと順序を指定する
LOAD DATA INFILE 'file_name.txt' INTO TABLE table_name FIELDS TERMINATED BY ',' LINES TERMINATED BY '\r\n' (field1, field2, field3);
```

## データのエクスポート

### SQLを使用してCSVテキスト形式のデータをエクスポートする

```sql
-- CSVテキスト形式でデータをエクスポートする
SELECT * FROM table_name INTO OUTFILE '/tmp/table_name.csv' FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\n';
```
### mysqldumpを使ってSQL形式のデータをエクスポートする

```sh
mysqldump -h ホスト -P ポート -u ユーザー -p データベース名 > /tmp/データベース名.sql
mysqldump -h ホスト -P ポート -u ユーザー -p データベース名 テーブル名 > /tmp/テーブル名.sql
```

### mysqlを使ってテキスト形式のデータをエクスポートする

```sh
mysql -h ホスト -P ポート -u ユーザー -p -e "select * from テーブル名" データベース名 > /tmp/テーブル名.txt
```

テーブルヘッダーを含むエクスポートされたデータで、1つのデータは1行を占め、各フィールドはタブ（タブ/`\t`）で区切られます。

```
column1 column2 column3
value11 value12 value13
value21 value22 value23
```