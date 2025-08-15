# MongoDB 在 Node.js 中的身份驗證問題：修復帶有 authSource 的連接問題

<Validator lang="zh-hant" :platform-list="['Node.js 18+', 'MongoDB 5+', 'Mongoose 7+']" date="2025-08-15" />

## 背景：MongoDB 身份驗證和連接問題

在使用 Node.js 應用程序中的 Mongoose 連接到 MongoDB 時，開發人員經常遇到如下身份驗證錯誤：

```
errmsg: 'Authentication failed.',
code: 18,
codeName: 'AuthenticationFailed'
```

即使用戶名、密碼和數據庫名稱都正確，這些錯誤也會特別令人困惑。這個問題的一個常見原因是沒有指定正確的身份驗證數據庫，可以通過在連接選項中添加 `authSource: 'admin'` 來解決。

## 理解 MongoDB 身份驗證數據庫

在 MongoDB 中，身份驗證默認由 `admin` 數據庫處理。當你在 MongoDB 中創建用戶時，他們可以與特定數據庫關聯，但身份驗證過程本身通常通過 `admin` 數據庫進行。

當你在連接字符串或選項中沒有指定 `authSource` 參數時，MongoDB 可能會嘗試對目標數據庫而不是存儲用戶憑據的 `admin` 數據庫進行身份驗證。

## 問題：身份驗證失敗

讓我們看一下常見的錯誤連接模式：

```javascript
const mongoose = require('mongoose');

// ❌ 錯誤 - 缺少 authSource
const connectionString = 'mongodb://username:password@localhost:27017/myDatabase';
mongoose.connect(connectionString);

// ❌ 同樣錯誤 - 仍然缺少 authSource
mongoose.connect('mongodb://localhost:27017/myDatabase', {
  auth: {
    username: 'myUser',
    password: 'myPassword'
  }
});
```

即使你的用戶名和密碼正確，這兩種連接嘗試也可能會因身份驗證錯誤而失敗。

## 解決方案：添加 authSource

以下是使用正確身份驗證源連接到 MongoDB 的正確方法：

### 方法 1：在連接字符串中使用 authSource

```javascript
const mongoose = require('mongoose');

// ✅ 正確 - 在連接字符串中添加 authSource
const connectionString = 'mongodb://username:password@localhost:27017/myDatabase?authSource=admin';
mongoose.connect(connectionString);
```

### 方法 2：使用連接選項

```javascript
const mongoose = require('mongoose');

// ✅ 正確 - 在連接選項中添加 authSource
mongoose.connect('mongodb://localhost:27017/myDatabase', {
  auth: {
    username: 'myUser',
    password: 'myPassword'
  },
  authSource: 'admin'  // 這是關鍵添加
});
```

## 環境變量設置

將連接詳細信息存儲在環境變量中是最佳實踐：

`.env` 文件：
```env
MONGODB_URI=mongodb://localhost:27017/myDatabase
DB_USER=myUsername
DB_PASS=myPassword
```

連接代碼：
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

## 需要 authSource 的常見場景

1. **MongoDB Atlas**：使用 MongoDB Atlas 時，通常需要指定 `authSource=admin`
2. **Docker 化的 MongoDB**：啟用了身份驗證的 MongoDB 容器
3. **生產環境 MongoDB 實例**：大多數生產環境 MongoDB 設置需要明確的身份驗證源
4. **自定義 MongoDB 部署**：當身份驗證數據庫與目標數據庫不同時

## 替代 authSource 值

雖然 `admin` 是 `authSource` 最常見的值，但你可能會遇到其他場景：

```javascript
// 當用戶在同一數據庫中創建時
mongoose.connect('mongodb://localhost:27017/myDatabase', {
  auth: {
    username: 'myUser',
    password: 'myPassword'
  },
  authSource: 'myDatabase'  // 用戶在此數據庫中創建
});

// 當使用自定義身份驗證數據庫時
mongoose.connect('mongodb://localhost:27017/myDatabase', {
  auth: {
    username: 'myUser',
    password: 'myPassword'
  },
  authSource: 'authDB'  // 自定義身份驗證數據庫
});
```

## 故障排除提示

1. **檢查用戶權限**：確保你的 MongoDB 用戶具有適當的角色：
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

2. **驗證連接字符串**：仔細檢查連接字符串的所有部分：
   ```
   mongodb://[username:password@]host:port/database?authSource=admin
   ```

3. **檢查 MongoDB 日誌**：查看 MongoDB 服務器日誌以獲取更詳細的錯誤消息。

4. **使用 MongoDB Shell 測試**：先嘗試使用 mongo shell 連接：
   ```bash
   mongo mongodb://username:password@localhost:27017/myDatabase?authSource=admin
   ```

## 總結

`authSource: 'admin'` 參數在許多場景中對成功的 MongoDB 身份驗證至關重要。當你遇到 Mongoose 身份驗證錯誤時，始終檢查是否正確指定了身份驗證源。這個簡單的添加可以解決許多連接問題，並且是生產環境 MongoDB 部署的常見要求。

記住：
- 連接到已認證的 MongoDB 實例時，始終指定 `authSource`
- 使用環境變量存儲敏感連接信息
- 優雅地處理連接錯誤
- 在部署到生產環境之前先在開發環境中測試連接