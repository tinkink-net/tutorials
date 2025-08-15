# Node.jsでのMongoDBの認証問題：authSourceを使用した接続問題の解決

<Validator lang="ja" :platform-list="['Node.js 18+', 'MongoDB 5+', 'Mongoose 7+']" date="2025-08-15" />

## 背景：MongoDBの認証と接続の問題

Node.jsアプリケーションでMongooseを使用してMongoDBに接続する際、開発者はしばしば以下のような認証エラーに遭遇します：

```
errmsg: 'Authentication failed.',
code: 18,
codeName: 'AuthenticationFailed'
```

これらのエラーは、ユーザー名、パスワード、データベース名がすべて正しい場合でも特に混乱を招くことがあります。この問題の一般的な原因の一つは、正しい認証データベースを指定していないことであり、接続オプションに`authSource: 'admin'`を追加することで解決できます。

## MongoDB認証データベースの理解

MongoDBでは、認証はデフォルトで`admin`データベースによって処理されます。MongoDBでユーザーを作成する場合、特定のデータベースに関連付けることができますが、認証プロセス自体は通常、`admin`データベースを通じて行われます。

接続文字列やオプションで`authSource`パラメータを指定しない場合、MongoDBはユーザー認証情報が実際に保存されている`admin`データベースではなく、ターゲットデータベースに対して認証を試みる可能性があります。

## 問題：認証の失敗

一般的な誤った接続パターンを見てみましょう：

```javascript
const mongoose = require('mongoose');

// ❌ 誤り - authSourceが欠けている
const connectionString = 'mongodb://username:password@localhost:27017/myDatabase';
mongoose.connect(connectionString);

// ❌ これも誤り - まだauthSourceが欠けている
mongoose.connect('mongodb://localhost:27017/myDatabase', {
  auth: {
    username: 'myUser',
    password: 'myPassword'
  }
});
```

これらの接続試行は、ユーザー名とパスワードが正しくても認証エラーで失敗する可能性があります。

## 解決策：authSourceの追加

MongoDBに適切な認証ソースで接続する正しい方法は以下の通りです：

### 方法1：authSourceを含む接続文字列の使用

```javascript
const mongoose = require('mongoose');

// ✅ 正しい - 接続文字列にauthSourceを追加
const connectionString = 'mongodb://username:password@localhost:27017/myDatabase?authSource=admin';
mongoose.connect(connectionString);
```

### 方法2：接続オプションの使用

```javascript
const mongoose = require('mongoose');

// ✅ 正しい - 接続オプションにauthSourceを追加
mongoose.connect('mongodb://localhost:27017/myDatabase', {
  auth: {
    username: 'myUser',
    password: 'myPassword'
  },
  authSource: 'admin'  // これが重要な追加部分
});
```

## 環境変数のセットアップ

接続詳細を環境変数に保存するのがベストプラクティスです：

`.env`ファイル：
```env
MONGODB_URI=mongodb://localhost:27017/myDatabase
DB_USER=myUsername
DB_PASS=myPassword
```

接続コード：
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

## authSourceが必要な一般的なシナリオ

1. **MongoDB Atlas**：MongoDB Atlasを使用する場合、通常`authSource=admin`を指定する必要があります
2. **DockerでのMongoDB**：認証が有効になっているMongoDBを実行しているコンテナ
3. **本番環境のMongoDBインスタンス**：ほとんどの本番環境のMongoDBセットアップでは明示的な認証ソースが必要です
4. **カスタムMongoDBデプロイメント**：認証データベースがターゲットデータベースと同じでない場合

## 代替のauthSource値

`admin`が`authSource`の最も一般的な値ですが、他のシナリオも考えられます：

```javascript
// ユーザーが同じデータベースで作成された場合
mongoose.connect('mongodb://localhost:27017/myDatabase', {
  auth: {
    username: 'myUser',
    password: 'myPassword'
  },
  authSource: 'myDatabase'  // このデータベースで作成されたユーザー
});

// カスタム認証データベースを使用する場合
mongoose.connect('mongodb://localhost:27017/myDatabase', {
  auth: {
    username: 'myUser',
    password: 'myPassword'
  },
  authSource: 'authDB'  // カスタム認証データベース
});
```

## トラブルシューティングのヒント

1. **ユーザー権限の確認**：MongoDBユーザーが適切なロールを持っていることを確認します：
   ```javascript
   // MongoDBシェルで
   db.createUser({
     user: "myUser",
     pwd: "myPassword",
     roles: [
       { role: "readWrite", db: "myDatabase" },
       { role: "dbAdmin", db: "myDatabase" }
     ]
   });
   ```

2. **接続文字列の確認**：接続文字列のすべての部分を再確認します：
   ```
   mongodb://[username:password@]host:port/database?authSource=admin
   ```

3. **MongoDBログの確認**：より詳細なエラーメッセージについてMongoDBサーバーログを確認します。

4. **MongoDBシェルでテスト**：まずmongoシェルで接続を試してみます：
   ```bash
   mongo mongodb://username:password@localhost:27017/myDatabase?authSource=admin
   ```

## まとめ

`authSource: 'admin'`パラメータは、多くのシナリオでMongoDBの認証を成功させるために重要です。Mongooseで認証エラーに遭遇した場合は、常に認証ソースを適切に指定しているかどうかを確認してください。この単純な追加で多くの接続問題を解決でき、本番環境のMongoDBデプロイメントでは一般的な要件です。

覚えておくべきこと：
- 認証されたMongoDBインスタンスに接続する際は常に`authSource`を指定する
- 機密性の高い接続情報には環境変数を使用する
- 接続エラーを適切に処理する
- 本番環境にデプロイする前に開発環境で接続をテストする