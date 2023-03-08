# 理解MySQL中的字符集和排序規則

在使用 MySQL 的過程中，我們經常會碰到與字符集和排序規則相關的問題，例如查詢數據時，部分文本亂碼，或者在寫入 emoji 表情時報錯等。要理解並解決這些問題，就需要了解 MySQL 中的字符集和排序規則。

## 字符集

在計算機中，字符都是編碼存儲的，每個字符都有一個編碼，比如字母`A`在 ASCII 編碼方案中，編碼爲`65`。但 ASCII 只有 128 個字符，僅僅包含了數字、大小寫字母和常用的英文標點符號。如果涉及到中文，就需要使用更多的字符集，比如 GK2312、GB18030、UTF8 等。

按指定的規則對每一個字符進行編碼後，就得到一整套編碼表，可稱之爲“字符集”。每一個字符集都有自己的編碼規則，同一個字符在不同的字符集中，編碼的結果是不一樣的。如果寫入數據和查詢數據時使用不同的字符集，就無法正確地解析對應的字符，從而導致亂碼。

針對中文，常用的字符集有 GB2312、GBK、GB18030、UTF8 等。由於 UTF8 良好的國際化特性，推薦在無特殊理由時，都使用 UTF8 編碼。

## MySQL設置字段字符集

MySQL 的字符集最終是應用在字段上的，在創建字段（創建表或者修改表）時，可以指定字段的字符集：

```sql
CREATE TABLE `test` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```

上述 SQL 中的`name`字段使用了`utf8mb4`字符集，`utf8mb4_general_ci`排序規則。因此該字段的字符集就是`utf8mb4`。

除了字段中指定字符集外，還可以爲整個表指定默認字符集，比如上述 SQL ，也指定了表的默認字符集爲`utf8mb4`。此時如果新建的字段沒有指定字符集，則使用表的默認字符集。

除此之外，MySQL 還可以爲數據庫甚至整個 MySQL 服務器指定默認默認字符集。這些字符集也都和表的默認字符集類似，當沒有指定字段的字符集時，就使用默認字符集。簡而言之：字段字符集 > 表默認字符集 > 數據庫默認字符集 > MySQL服務器默認字符集。

理論上，當我們設置了字段的字符集之後，數據庫中就能容納對應字符集下的字符。但是實際使用過程中，往往會碰到字段的字符集設置好了，但表現依然不符合預期的情況，這種情況就可能涉及到連接字符集的問題。

## 設置連接字符集

除了數據庫字段存儲的字符集之外，在使用 MySQL 時，還會涉及到一些其它地方出現的字符集的概念：

- `character_set_client` 客戶端發送 SQL 語句用的字集集
- `character_set_connection` MySQL 接到 SQL 語句後，要轉換到的字符集
- `character_set_results` MySQL 將結果集轉換成的字符集

可以分別使用以下 SQL 設置：

```sql
SET character_set_client=utf8mb4;
SET character_set_connection=utf8mb4;
SET character_set_results=utf8mb4;
```

而這三個字符集的設置還有一個快捷方式：

```sql
SET NAMES utf8mb4;
```

只要運行上面的 SQL 語句，就能設置上面提到的三個字符集。

## 在代碼中設置字符集

如果代碼中使用 MySQL ，一般要通過 MySQL 庫的配置來決定連接的字符集，以 Node.js 的`sequelize`模塊爲例，需要在`dialectOptions.charset`中指定字符集：

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

## 排序規則

在很多地方都能看到`COLLATE`，在上面的示例中也有，`utf8mb4_general_ci`就是排序規則。

顧名思義，排序規則用於決定字符應該如何排序，例如同樣是`a`和`b`，可能在某種排序規則下，`a`排在`b`前面，在另一種排序規則下，`a`排在`b`後面。

MySQL中針對`utf8mb4`字符集，提供了很多排序規則，常用的有：

- `utf8mb4_general_ci`：MySQL默認的排序規則，Unicode 部分未嚴格按 Unicode 順序排序
- `utf8mb4_unicode_ci`：按照 Unicode 字符順序排序
- `utf8mb4_0900_ai_ci`：按照 Unicode 9.0 的字符順序排序，包括基本多語言平面之外的字符

目前推薦使用`utf8mb4_0900_ai_ci`或者`utf8mb4_unicode_ci`。

## MySQL 中的 utf8 和 utf8mb4

UTF8 一個字符由 1-6 字節組成，但現在使用的字符最長只有 4 個字節。MySQL 中的 utf8 字符集最多隻能存儲 3 個字節，因此碰到 4 字節的字符就無法存儲，這就是爲什麼 utf8 字符集的字段無法存儲 emoji 表情的原因。

utf8mb4 是 utf8 的擴展，它可以存儲 4 個字節的字符，因此可以存儲 emoji 表情。

如無特殊情況，都應該使用 utf8mb4 字符集，不再使用 utf8 字符集。

## 小結

1. 只要設置好 MySQL 數據庫字段的字符集，並保證連接的時候使用的是相同的字符集，則可以確保沒有字符集導致的亂碼問題。
2. 推薦使用 utf8mb4 字符集，不再使用 utf8 字符集。
3. 推薦使用 utf8mb4_0900_ai_ci 或者 utf8mb4_unicode_ci 排序規則。
