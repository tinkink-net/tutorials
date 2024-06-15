# Understand Timezone in MySQL

## Background Knowledge: Date Time, Timestamp and Timezone

In most scenarios, date and time refer to the current time in local timezone. For example, when you see `"2024-06-15 12:00:00"`, it means now it's 12:00:00 on June 15, 2024 in your local timezone.

However, when your application serves users from different timezones, you need to consider the timezone issue. For example, if a user in New York creates a record at `"2024-06-15 12:00:00"`, it meas the record is created at 12:00:00 in New York timezone. If another user in Beijing views the record, the time should be converted to Beijing timezone.

In summary, date time is the time in local timezone, you should add timezone information to the date time to make it available around the world.

On the other side, timestamp is the number of seconds that have elapsed since January 1, 1970 at 00:00:00 UTC. Timestamp is timezone-independent, it's always the same no matter where you are.

## Date Time Data Types in MySQL

In MySQL, there are several date time data types, but the most important ones are `DATETIME` and `TIMESTAMP`.

- `DATETIME`: The date and time, format is `YYYY-MM-DD HH:MM:SS`. It stores the date and time, so timezone has to be considered.
- `TIMESTAMP`: The timestamp, it stores the timestamp number, which is timezone-independent. But when you write or read the timestamp, there will be a timezone conversion.

## Timezone in MySQL

MySQL has a system variable `time_zone` to set the timezone. You can set the timezone in the following ways:

1. Set the timezone in the configuration file `my.cnf`:

    ```ini
    [mysqld]
    default-time-zone = '+00:00'
    ```

2. Set the timezone in the MySQL client:

    ```sql
    SET time_zone = '+00:00';
    ```

3. Set the timezone in the connection string:

    ```sql
    mysql -u root -p --default-time-zone='+00:00'
    ```

If you don't set the timezone, MySQL will use the system timezone by default.

## Set Timezone in Application

When you use MySQL in your application, you should set the timezone in the application. For example, in Node.js, you can set the timezone like this:

```javascript
const mysql = require('mysql2');
const conn = mysql.createConnection({
    host: 'localhost
    user: 'root
    password: 'password',
    database: 'test',
    timezone: '+00:00'
});
```

Please note, in many cases, setting the timezone in your application is the only way to make sure the timezone is correct. Because you may have to chance to touch the MySQL server, but you can always change the application code.

If your application uses some ORM which doesn't support setting timezone, you still have other options:

1. Do a timezone setting query before any other queries. (`SET time_zone = '+00:00';`)
2. Use a different data type to store the date time, such as `INT` or `VARCHAR`, and handle the timezone conversion in the application.
3. Convert any date time value to the same timezone with MySQL server before write it to the database. You also have to do a timezone conversion in the application when you read the date time value.

## Conclusion

In this article, we learned the background knowledge of date time, timestamp and timezone: date time should have timezone information, timestamp is timezone-independent. Then we learned the date time data types in MySQL: `DATETIME` and `TIMESTAMP`. Finally, we learned how to set the timezone in MySQL and in the application.
