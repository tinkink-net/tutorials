# How to store and process date and time types in SQLite

SQLite is a database system that stores data in a file. It is a small, fast, and easy-to-use database system that is often used in mobile and web applications.

According to the Office documentation, SQLite does not support date and time types, the suggested data types for date and time are:

- `TEXT`: The text data type, which is a string of characters. Stores the date and time as a string in ISO 8601 format, such as `YYYY-MM-DD HH:MM:SS`.
- `INTEGER`: The integer data type, which is a whole number. Stores the date and time as a number of seconds since January 1, 1970, 00:00:00 UTC, also known as the Unix timestamp.
- `REAL`: The real number data type, which is a number with a decimal point. Stores the date and time as a number of days since November 24, 4714 BC, 12:00:00 UTC, also known as the Julian day number.

## What data type should I use?

In fact, you can use any format you want to store and process date and time types in SQLite, because the most flexible data type is `TEXT`, which is a string of characters.

Why SQLite suggests to use `TEXT` to store and process date and time in ISO 8601 format instead of other formats? Because SQLite has some built-in date related functions, for example, `timediff` to calculate the time difference between two dates, `strftime` to format a date value.

But if you really use `TEXT`, you may face some problems:

- The format may be different from what you expect, there are so many different formats.
- You may lose some information, for example, the time zone.
- You may not be able to compare the date and time types, for example, you can't compare the date and time types by using the `>` or `<` operator. (Some formats are comparable, but not all.)

The recommended way is to use `INTEGER` to store the timestamp. Since it's just a number, the storage is efficient, and it's easy to compare the date and time types.

Besides, you have no "timezone problem", because the timezone of the same time around the world are exactly the same. You can format to any timezone and format as you need.

## Conclusion

In practice, when processing date and time types in SQLite, you should use `INTEGER` to store timestamps.