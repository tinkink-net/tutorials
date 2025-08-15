# MongoDB 在 Node.js 中的身份验证问题：修复带有 authSource 的连接问题

<Validator lang="zh-hans" :platform-list="['Node.js 18+', 'MongoDB 5+', 'Mongoose 7+']" date="2025-08-15" />

## 背景：MongoDB 身份验证和连接问题

在使用 Node.js 应用程序中的 Mongoose 连接到 MongoDB 时，开发人员经常遇到如下身份验证错误：

```
errmsg: 'Authentication failed.',
code: 18,
codeName: 'AuthenticationFailed'
```

即使用户名、密码和数据库名称都正确，这些错误也会特别令人困惑。这个问题的一个常见原因是没有指定正确的身份验证数据库，可以通过在连接选项中添加 `authSource: 'admin'` 来解决。

## 理解 MongoDB 身份验证数据库

在 MongoDB 中，身份验证默认由 `admin` 数据库处理。当你在 MongoDB 中创建用户时，他们可以与特定数据库关联，但身份验证过程本身通常通过 `admin` 数据库进行。

当你在连接字符串或选项中没有指定 `authSource` 参数时，MongoDB 可能会尝试对目标数据库而不是存储用户凭据的 `admin` 数据库进行身份验证。

## 问题：身份验证失败

让我们看一下常见的错误连接模式：

```javascript
const mongoose = require('mongoose');

// ❌ 错误 - 缺少 authSource
const connectionString = 'mongodb://username:password@localhost:27017/myDatabase';
mongoose.connect(connectionString);

// ❌ 同样错误 - 仍然缺少 authSource
mongoose.connect('mongodb://localhost:27017/myDatabase', {
  auth: {
    username: 'myUser',
    password: 'myPassword'
  }
});
```

即使你的用户名和密码正确，这两种连接尝试也可能会因身份验证错误而失败。

## 解决方案：添加 authSource

以下是使用正确身份验证源连接到 MongoDB 的正确方法：

### 方法 1：在连接字符串中使用 authSource

```javascript
const mongoose = require('mongoose');

// ✅ 正确 - 在连接字符串中添加 authSource
const connectionString = 'mongodb://username:password@localhost:27017/myDatabase?authSource=admin';
mongoose.connect(connectionString);
```

### 方法 2：使用连接选项

```javascript
const mongoose = require('mongoose');

// ✅ 正确 - 在连接选项中添加 authSource
mongoose.connect('mongodb://localhost:27017/myDatabase', {
  auth: {
    username: 'myUser',
    password: 'myPassword'
  },
  authSource: 'admin'  // 这是关键添加
});
```

## 环境变量设置

将连接详细信息存储在环境变量中是最佳实践：

`.env` 文件：
```env
MONGODB_URI=mongodb://localhost:27017/myDatabase
DB_USER=myUsername
DB_PASS=myPassword
```

连接代码：
```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = `${process.env.MONGODB_URI}?authSource=admin`;

  try {
    const conn = await mongoose.connect(uri, {
      auth: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS
      },
      authSource: 'admin'
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

connectDB();
```

## 需要 authSource 的常见场景

1. **MongoDB Atlas**：使用 MongoDB Atlas 时，通常需要指定 `authSource=admin`
2. **Docker 化的 MongoDB**：启用了身份验证的 MongoDB 容器
3. **生产环境 MongoDB 实例**：大多数生产环境 MongoDB 设置需要明确的身份验证源
4. **自定义 MongoDB 部署**：当身份验证数据库与目标数据库不同时

## 替代 authSource 值

虽然 `admin` 是 `authSource` 最常见的值，但你可能会遇到其他场景：

```javascript
// 当用户在同一数据库中创建时
mongoose.connect('mongodb://localhost:27017/myDatabase', {
  auth: {
    username: 'myUser',
    password: 'myPassword'
  },
  authSource: 'myDatabase'  // 用户在此数据库中创建
});

// 当使用自定义身份验证数据库时
mongoose.connect('mongodb://localhost:27017/myDatabase', {
  auth: {
    username: 'myUser',
    password: 'myPassword'
  },
  authSource: 'authDB'  // 自定义身份验证数据库
});
```

## 故障排除提示

1. **检查用户权限**：确保你的 MongoDB 用户具有适当的角色：
   ```javascript
   // 在 MongoDB shell 中
   db.createUser({
     user: "myUser",
     pwd: "myPassword",
     roles: [
       { role: "readWrite", db: "myDatabase" },
       { role: "dbAdmin", db: "myDatabase" }
     ]
   });
   ```

2. **验证连接字符串**：仔细检查连接字符串的所有部分：
   ```
   mongodb://[username:password@]host:port/database?authSource=admin
   ```

3. **检查 MongoDB 日志**：查看 MongoDB 服务器日志以获取更详细的错误消息。

4. **使用 MongoDB Shell 测试**：先尝试使用 mongo shell 连接：
   ```bash
   mongo mongodb://username:password@localhost:27017/myDatabase?authSource=admin
   ```

## 总结

`authSource: 'admin'` 参数在许多场景中对成功的 MongoDB 身份验证至关重要。当你遇到 Mongoose 身份验证错误时，始终检查是否正确指定了身份验证源。这个简单的添加可以解决许多连接问题，并且是生产环境 MongoDB 部署的常见要求。

记住：
- 连接到已认证的 MongoDB 实例时，始终指定 `authSource`
- 使用环境变量存储敏感连接信息
- 优雅地处理连接错误
- 在部署到生产环境之前先在开发环境中测试连接