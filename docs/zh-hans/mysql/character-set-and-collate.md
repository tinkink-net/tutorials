# 理解MySQL中的字符集和排序规则

在使用 MySQL 的过程中，我们经常会碰到与字符集和排序规则相关的问题，例如查询数据时，部分文本乱码，或者在写入 emoji 表情时报错等。要理解并解决这些问题，就需要了解 MySQL 中的字符集和排序规则。

## 字符集

在计算机中，字符都是编码存储的，每个字符都有一个编码，比如字母`A`在 ASCII 编码方案中，编码为`65`。但 ASCII 只有 128 个字符，仅仅包含了数字、大小写字母和常用的英文标点符号。如果涉及到中文，就需要使用更多的字符集，比如 GK2312、GB18030、UTF8 等。

按指定的规则对每一个字符进行编码后，就得到一整套编码表，可称之为“字符集”。每一个字符集都有自己的编码规则，同一个字符在不同的字符集中，编码的结果是不一样的。如果写入数据和查询数据时使用不同的字符集，就无法正确地解析对应的字符，从而导致乱码。

针对中文，常用的字符集有 GB2312、GBK、GB18030、UTF8 等。由于 UTF8 良好的国际化特性，推荐在无特殊理由时，都使用 UTF8 编码。

## MySQL设置字段字符集

MySQL 的字符集最终是应用在字段上的，在创建字段（创建表或者修改表）时，可以指定字段的字符集：

```sql
CREATE TABLE `test` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```

上述 SQL 中的`name`字段使用了`utf8mb4`字符集，`utf8mb4_general_ci`排序规则。因此该字段的字符集就是`utf8mb4`。

除了字段中指定字符集外，还可以为整个表指定默认字符集，比如上述 SQL ，也指定了表的默认字符集为`utf8mb4`。此时如果新建的字段没有指定字符集，则使用表的默认字符集。

除此之外，MySQL 还可以为数据库甚至整个 MySQL 服务器指定默认默认字符集。这些字符集也都和表的默认字符集类似，当没有指定字段的字符集时，就使用默认字符集。简而言之：字段字符集 > 表默认字符集 > 数据库默认字符集 > MySQL服务器默认字符集。

理论上，当我们设置了字段的字符集之后，数据库中就能容纳对应字符集下的字符。但是实际使用过程中，往往会碰到字段的字符集设置好了，但表现依然不符合预期的情况，这种情况就可能涉及到连接字符集的问题。

## 设置连接字符集

除了数据库字段存储的字符集之外，在使用 MySQL 时，还会涉及到一些其它地方出现的字符集的概念：

- `character_set_client` 客户端发送 SQL 语句用的字集集
- `character_set_connection` MySQL 接到 SQL 语句后，要转换到的字符集
- `character_set_results` MySQL 将结果集转换成的字符集

可以分别使用以下 SQL 设置：

```sql
SET character_set_client=utf8mb4;
SET character_set_connection=utf8mb4;
SET character_set_results=utf8mb4;
```

而这三个字符集的设置还有一个快捷方式：

```sql
SET NAMES utf8mb4;
```

只要运行上面的 SQL 语句，就能设置上面提到的三个字符集。

## 在代码中设置字符集

如果代码中使用 MySQL ，一般要通过 MySQL 库的配置来决定连接的字符集，以 Node.js 的`sequelize`模块为例，需要在`dialectOptions.charset`中指定字符集：

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

## 排序规则

在很多地方都能看到`COLLATE`，在上面的示例中也有，`utf8mb4_general_ci`就是排序规则。

顾名思义，排序规则用于决定字符应该如何排序，例如同样是`a`和`b`，可能在某种排序规则下，`a`排在`b`前面，在另一种排序规则下，`a`排在`b`后面。

MySQL中针对`utf8mb4`字符集，提供了很多排序规则，常用的有：

- `utf8mb4_general_ci`：MySQL默认的排序规则，Unicode 部分未严格按 Unicode 顺序排序
- `utf8mb4_unicode_ci`：按照 Unicode 字符顺序排序
- `utf8mb4_0900_ai_ci`：按照 Unicode 9.0 的字符顺序排序，包括基本多语言平面之外的字符

目前推荐使用`utf8mb4_0900_ai_ci`或者`utf8mb4_unicode_ci`。

## MySQL 中的 utf8 和 utf8mb4

UTF8 一个字符由 1-6 字节组成，但现在使用的字符最长只有 4 个字节。MySQL 中的 utf8 字符集最多只能存储 3 个字节，因此碰到 4 字节的字符就无法存储，这就是为什么 utf8 字符集的字段无法存储 emoji 表情的原因。

utf8mb4 是 utf8 的扩展，它可以存储 4 个字节的字符，因此可以存储 emoji 表情。

如无特殊情况，都应该使用 utf8mb4 字符集，不再使用 utf8 字符集。

## 小结

1. 只要设置好 MySQL 数据库字段的字符集，并保证连接的时候使用的是相同的字符集，则可以确保没有字符集导致的乱码问题。
2. 推荐使用 utf8mb4 字符集，不再使用 utf8 字符集。
3. 推荐使用 utf8mb4_0900_ai_ci 或者 utf8mb4_unicode_ci 排序规则。
