# Understanding Character Set and Sorting Rules in MySQL

When using MySQL, we often encounter problems related to character sets and sorting rules, such as some text being garbled when querying data, or errors when writing emoji expressions. To understand and solve these problems, you need to understand the character set and sorting rules in MySQL.

## Character Sets

In computers, characters are stored encoded, and each character has an encoding. For example, the letter `A` is encoded as `65` in the ASCII encoding scheme. However, ASCII has only 128 characters and contains only numbers, upper and lower case letters and common English punctuation marks. If Chinese is involved, you need to use more character sets, such as GK2312, GB18030, UTF8, etc.

After encoding each character according to the specified rules, we get a set of encoding table, which can be called "character set". Each character set has its own encoding rules, and the result of encoding the same character in different character sets is different. If different character sets are used when writing data and querying data, the corresponding characters cannot be correctly parsed, resulting in garbled code.

For Chinese, the commonly used character sets are GB2312, GBK, GB18030, UTF8 and so on. Because of the good internationalization feature of UTF8, it is recommended to use UTF8 encoding when there is no special reason.

## MySQL Setting Character Set for Fields

MySQL's character set is ultimately applied to fields. When creating a field (creating a table or modifying a table), you can specify the character set of the field as follows.

```sql
CREATE TABLE `test` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```

The `name` field in the above SQL uses the `utf8mb4` character set and the `utf8mb4_general_ci` sorting rule. So the character set of the field is `utf8mb4`.

Besides specifying the character set in the field, you can also specify the default character set for the whole table, such as the above SQL, which also specifies the default character set for the table as `utf8mb4`. In this case, if no character set is specified for the new field, the default character set of the table is used.

In addition, MySQL can also specify a default default character set for the database or even for the entire MySQL server. These character sets are also similar to the table default character sets, and when no field character set is specified, the default character set is used. In short: Field Character Set > Table Default Character Set > Database Default Character Set > MySQL Server Default Character Set.

Theoretically, when we set the character set of a field, the database can hold the characters under the corresponding character set. However, in practice, we often encounter situations where the character set of a field is set, but it still does not perform as expected, and this situation may involve the connection character set issue.

## Setting the connection character set

In addition to the character set stored in the database fields, there are some other concepts of character sets that appear elsewhere when using MySQL.

- `character_set_client` The set of characters used by the client to send SQL statements
- `character_set_connection` The character set that MySQL will convert to when it receives a SQL statement
- `character_set_results` The character set that MySQL will convert the result set to

The following SQL settings can be used separately.

```sql
SET character_set_client=utf8mb4;
SET character_set_connection=utf8mb4;
SET character_set_results=utf8mb4;
```

And there is another shortcut for setting these three character sets:

```sql
SET NAMES utf8mb4;
```

Just run the above SQL statement to set the three character sets mentioned above.

## Setting the character set in code

If you use MySQL in your code, you generally have to decide the character set of the connection through the MySQL library configuration. Take the `sequelize` module of Node.js as an example, you need to specify the character set in `dialectOptions.charset`.

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

## Sorting rules

You can see `COLLATE` in many places, and in the example above, `utf8mb4_general_ci` is the sorting rule.

As the name implies, sorting rules are used to determine how characters should be sorted. For example, the same `a` and `b` may be in front of `a` under one sorting rule and behind `b` under another.

MySQL provides many sorting rules for the `utf8mb4` character set, the common ones are.

- `utf8mb4_general_ci`: MySQL's default sorting rule, the Unicode part is not strictly sorted in Unicode order
- `utf8mb4_unicode_ci`: sorting by Unicode character order
- `utf8mb4_0900_ai_ci`: sorted by Unicode 9.0 characters, including characters outside the basic multilingual plane

Currently `utf8mb4_0900_ai_ci` or `utf8mb4_unicode_ci` is recommended.

## utf8 and utf8mb4 in MySQL

UTF8 A character consists of 1-6 bytes, but the maximum character used today is only 4 bytes. utf8 character set in MySQL can only store up to 3 bytes, so when you encounter a 4-byte character, you can't store it, which is why fields in utf8 character set can't store emoji expressions.

utf8mb4 is an extension of utf8 that can store 4 bytes of characters, so it can store emoji expressions.

The utf8mb4 character set should be used unless otherwise specified, and the utf8 character set should no longer be used.

## Summary

1. As long as you set the character set of the MySQL database fields and make sure that you are using the same character set when connecting, you can be sure that there is no problem of garbled characters caused by the character set.
2. utf8mb4 character set is recommended and utf8 character set is no longer used.
It is recommended to use utf8mb4_0900_ai_ci or utf8mb4_unicode_ci sorting rules.
