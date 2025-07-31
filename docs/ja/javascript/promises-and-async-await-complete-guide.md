# JavaScript Promises と Async/Await - 完全ガイド

非同期プログラミングは現代の JavaScript 開発の基盤です。この包括的なチュートリアルでは、Promises、async/await、そして高度な非同期パターンをカバーし、より効果的な JavaScript 開発者になるためのものです。

## 非同期 JavaScript の理解

### 非同期プログラミングとは？

**非同期プログラミング**は、メインスレッドをブロックすることなくコードを実行できるようにし、JavaScript が複数の操作を同時に処理できるようにします。これは以下の場面で重要です：

- **ネットワークリクエスト**（API 呼び出し）
- **ファイル操作**（ファイルの読み取り/書き込み）
- **データベースクエリ**（データベースへの接続）
- **タイマー操作**（setTimeout、setInterval）
- **ユーザーインタラクション**（イベント処理）

### イベントループ

JavaScript はシングルスレッドで実行されますが、イベントループを使って非同期操作を処理します：

```javascript
// 同期コード - 実行をブロック
console.log('Start');
console.log('Middle');
console.log('End');

// 非同期コード - ノンブロッキング
console.log('Start');
setTimeout(() => {
    console.log('Async operation');
}, 0);
console.log('End');

// 出力：
// Start
// End
// Async operation
```

### コールバックパターン（レガシー）

Promises 以前、JavaScript は非同期操作にコールバックを使用していました：

```javascript
// コールバック例
function fetchData(callback) {
    setTimeout(() => {
        const data = { id: 1, name: 'John' };
        callback(null, data);
    }, 1000);
}

fetchData((error, data) => {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Data:', data);
    }
});
```

#### コールバック地獄の問題

```javascript
// ネストしたコールバック - 読みにくく、保守しにくい
getData(function(a) {
    getMoreData(a, function(b) {
        getMoreData(b, function(c) {
            getMoreData(c, function(d) {
                // これがコールバック地獄！
                console.log('Final result:', d);
            });
        });
    });
});
```

## Promises の理解

### Promise とは？

**Promise** は非同期操作の最終的な完了または失敗を表すオブジェクトです。3つの状態があります：

1. **Pending** - 初期状態、成功も失敗もしていない
2. **Fulfilled** - 操作が正常に完了した
3. **Rejected** - 操作が失敗した

### Promises の作成

#### 基本的な Promise 構文

```javascript
// Promise の作成
const myPromise = new Promise((resolve, reject) => {
    // 非同期操作
    const success = true;

    if (success) {
        resolve('Operation successful!');
    } else {
        reject('Operation failed!');
    }
});

// Promise の使用
myPromise
    .then(result => {
        console.log('Success:', result);
    })
    .catch(error => {
        console.log('Error:', error);
    });
```

#### タイムアウト付き Promise

```javascript
function delay(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

delay(2000).then(() => {
    console.log('2 seconds have passed');
});
```

#### データ付き Promise

```javascript
function fetchUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id > 0) {
                resolve({
                    id: id,
                    name: `User ${id}`,
                    email: `user${id}@example.com`
                });
            } else {
                reject(new Error('Invalid user ID'));
            }
        }, 1000);
    });
}

fetchUser(1)
    .then(user => {
        console.log('User:', user);
    })
    .catch(error => {
        console.error('Error:', error.message);
    });
```

### Promise メソッド

#### `.then()` メソッド

```javascript
fetchUser(1)
    .then(user => {
        console.log('Got user:', user.name);
        return user.id; // データを次の .then() に渡す
    })
    .then(userId => {
        console.log('User ID:', userId);
        return fetchUserPosts(userId);
    })
    .then(posts => {
        console.log('User posts:', posts);
    });
```

#### `.catch()` メソッド

```javascript
fetchUser(-1)
    .then(user => {
        console.log('User:', user);
    })
    .catch(error => {
        console.error('Caught error:', error.message);
    });
```

#### `.finally()` メソッド

```javascript
fetchUser(1)
    .then(user => {
        console.log('Success:', user);
    })
    .catch(error => {
        console.error('Error:', error);
    })
    .finally(() => {
        console.log('Operation completed');
        // クリーンアップコードをここに
    });
```

### Promise チェーン

```javascript
function fetchUserData(userId) {
    return fetchUser(userId)
        .then(user => {
            console.log('Fetched user:', user.name);
            return fetchUserPosts(user.id);
        })
        .then(posts => {
            console.log('Fetched posts:', posts.length);
            return fetchUserComments(posts[0].id);
        })
        .then(comments => {
            console.log('Fetched comments:', comments.length);
            return comments;
        })
        .catch(error => {
            console.error('Error in chain:', error);
            throw error; // 上流で処理するために再スロー
        });
}
```

## 静的 Promise メソッド

### `Promise.all()` - 並列実行

```javascript
// すべての promises が解決されるまで待つ
const promises = [
    fetchUser(1),
    fetchUser(2),
    fetchUser(3)
];

Promise.all(promises)
    .then(users => {
        console.log('All users:', users);
        // すべての promises が解決された
    })
    .catch(error => {
        console.error('One or more promises failed:', error);
        // いずれかの promise が失敗した場合、この catch が実行される
    });
```

### `Promise.allSettled()` - すべての結果

```javascript
// すべての promises が完了（解決または拒否）するまで待つ
const promises = [
    fetchUser(1),
    fetchUser(-1), // これは拒否される
    fetchUser(3)
];

Promise.allSettled(promises)
    .then(results => {
        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                console.log(`Promise ${index} resolved:`, result.value);
            } else {
                console.log(`Promise ${index} rejected:`, result.reason);
            }
        });
    });
```

### `Promise.race()` - 最初に完了

```javascript
// 最初に完了した promise で解決
const promises = [
    delay(1000).then(() => 'First'),
    delay(2000).then(() => 'Second'),
    delay(500).then(() => 'Third')
];

Promise.race(promises)
    .then(result => {
        console.log('Winner:', result); // "Third"
    });
```

### `Promise.any()` - 最初に解決

```javascript
// 最初に成功した promise で解決
const promises = [
    Promise.reject('Error 1'),
    delay(1000).then(() => 'Success 1'),
    delay(500).then(() => 'Success 2')
];

Promise.any(promises)
    .then(result => {
        console.log('First success:', result); // "Success 2"
    })
    .catch(error => {
        console.log('All promises rejected:', error);
    });
```

## Async/Await 構文

### Async/Await とは？

**Async/await** は Promises の上に構築された構文糖衣であり、非同期コードを同期コードのように見せて動作させます。

### 基本的な Async/Await

```javascript
// Promise ベースのアプローチ
function fetchUserPromise(id) {
    return fetchUser(id)
        .then(user => {
            console.log('User:', user);
            return fetchUserPosts(user.id);
        })
        .then(posts => {
            console.log('Posts:', posts);
            return posts;
        });
}

// Async/await アプローチ
async function fetchUserAsync(id) {
    try {
        const user = await fetchUser(id);
        console.log('User:', user);

        const posts = await fetchUserPosts(user.id);
        console.log('Posts:', posts);

        return posts;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
```

### 非同期関数の宣言

```javascript
// 非同期関数宣言
async function getData() {
    return 'data';
}

// 非同期関数式
const getData = async function() {
    return 'data';
};

// 非同期アロー関数
const getData = async () => {
    return 'data';
};

// オブジェクト内の非同期メソッド
const obj = {
    async getData() {
        return 'data';
    }
};

// クラス内の非同期メソッド
class DataService {
    async getData() {
        return 'data';
    }
}
```

### Await キーワード

```javascript
async function processData() {
    // await は非同期関数内でのみ使用可能
    const data = await fetchData();
    const processedData = await processDataStep(data);
    const result = await saveData(processedData);

    return result;
}

// これはエラーを引き起こす - 非同期関数外での await
// const data = await fetchData(); // SyntaxError
```

### Try/Catch でのエラーハンドリング

```javascript
async function handleErrors() {
    try {
        const user = await fetchUser(1);
        const posts = await fetchUserPosts(user.id);
        const comments = await fetchUserComments(posts[0].id);

        return { user, posts, comments };
    } catch (error) {
        console.error('Error occurred:', error);

        // 特定のエラータイプを処理
        if (error.message.includes('network')) {
            throw new Error('Network error occurred');
        } else if (error.message.includes('auth')) {
            throw new Error('Authentication failed');
        } else {
            throw new Error('Unknown error occurred');
        }
    }
}
```

## 実践的な例

### 1. API データ取得

```javascript
// async/await を使った Fetch API
async function fetchUserProfile(userId) {
    try {
        const response = await fetch(`/api/users/${userId}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const user = await response.json();
        return user;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw error;
    }
}

// 使用法
async function displayUserProfile(userId) {
    try {
        const user = await fetchUserProfile(userId);
        document.getElementById('username').textContent = user.name;
        document.getElementById('email').textContent = user.email;
    } catch (error) {
        document.getElementById('error').textContent = 'Failed to load user profile';
    }
}
```

### 2. 順次 vs 並列操作

```javascript
// 順次操作（遅い）
async function sequentialOperations() {
    const startTime = Date.now();

    const user = await fetchUser(1);        // 1秒待つ
    const posts = await fetchUserPosts(1);  // さらに1秒待つ
    const comments = await fetchComments(1); // さらに1秒待つ

    const endTime = Date.now();
    console.log(`Sequential took ${endTime - startTime}ms`); // ~3000ms

    return { user, posts, comments };
}

// 並列操作（速い）
async function parallelOperations() {
    const startTime = Date.now();

    const [user, posts, comments] = await Promise.all([
        fetchUser(1),
        fetchUserPosts(1),
        fetchComments(1)
    ]);

    const endTime = Date.now();
    console.log(`Parallel took ${endTime - startTime}ms`); // ~1000ms

    return { user, posts, comments };
}
```

### 3. 複数の非同期操作の処理

```javascript
async function loadDashboardData(userId) {
    try {
        // すべての操作を並列で開始
        const userPromise = fetchUser(userId);
        const postsPromise = fetchUserPosts(userId);
        const notificationsPromise = fetchNotifications(userId);
        const settingsPromise = fetchUserSettings(userId);

        // まず重要なデータを待つ
        const user = await userPromise;

        // 残りを待つ
        const [posts, notifications, settings] = await Promise.all([
            postsPromise,
            notificationsPromise,
            settingsPromise
        ]);

        return {
            user,
            posts,
            notifications,
            settings
        };
    } catch (error) {
        console.error('Dashboard load failed:', error);
        throw error;
    }
}
```

### 4. Async/Await でのリトライロジック

```javascript
async function fetchWithRetry(url, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.log(`Attempt ${i + 1} failed:`, error.message);

            if (i === maxRetries - 1) {
                throw error; // 最後の試行が失敗
            }

            // リトライ前に待機
            await delay(1000 * (i + 1)); // 指数バックオフ
        }
    }
}
```

### 5. タイムアウトの実装

```javascript
function timeout(ms) {
    return new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Operation timed out')), ms);
    });
}

async function fetchWithTimeout(url, timeoutMs = 5000) {
    try {
        const result = await Promise.race([
            fetch(url),
            timeout(timeoutMs)
        ]);

        return await result.json();
    } catch (error) {
        if (error.message === 'Operation timed out') {
            throw new Error('Request timed out');
        }
        throw error;
    }
}
```

## 高度なパターン

### 1. Promise キュー

```javascript
class PromiseQueue {
    constructor() {
        this.queue = [];
        this.running = false;
    }

    async add(promiseFunction) {
        return new Promise((resolve, reject) => {
            this.queue.push({
                promiseFunction,
                resolve,
                reject
            });
            this.run();
        });
    }

    async run() {
        if (this.running) return;
        this.running = true;

        while (this.queue.length > 0) {
            const { promiseFunction, resolve, reject } = this.queue.shift();

            try {
                const result = await promiseFunction();
                resolve(result);
            } catch (error) {
                reject(error);
            }
        }

        this.running = false;
    }
}

// 使用法
const queue = new PromiseQueue();

queue.add(() => fetchUser(1)).then(user => console.log('User 1:', user));
queue.add(() => fetchUser(2)).then(user => console.log('User 2:', user));
queue.add(() => fetchUser(3)).then(user => console.log('User 3:', user));
```

### 2. 非同期イテレータ

```javascript
async function* fetchUsersGenerator() {
    let page = 1;

    while (true) {
        const response = await fetch(`/api/users?page=${page}`);
        const data = await response.json();

        if (data.users.length === 0) break;

        yield data.users;
        page++;
    }
}

// 使用法
async function processAllUsers() {
    for await (const users of fetchUsersGenerator()) {
        console.log(`Processing ${users.length} users`);
        // ユーザーを処理
    }
}
```

### 3. デバウンスされた非同期関数

```javascript
function debounceAsync(func, delay) {
    let timeoutId;

    return function(...args) {
        clearTimeout(timeoutId);

        return new Promise((resolve, reject) => {
            timeoutId = setTimeout(async () => {
                try {
                    const result = await func.apply(this, args);
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            }, delay);
        });
    };
}

// 使用法
const debouncedSearch = debounceAsync(async (query) => {
    const response = await fetch(`/api/search?q=${query}`);
    return await response.json();
}, 300);

// 300ms 以内の最後の検索のみが実行される
debouncedSearch('javascript');
debouncedSearch('javascrip');
debouncedSearch('javascript promises'); // これが実行される
```

### 4. 同時実行数制限付き非同期マップ

```javascript
async function mapWithConcurrency(array, asyncFn, concurrency = 5) {
    const results = [];

    for (let i = 0; i < array.length; i += concurrency) {
        const batch = array.slice(i, i + concurrency);
        const batchPromises = batch.map(asyncFn);
        const batchResults = await Promise.all(batchPromises);
        results.push(...batchResults);
    }

    return results;
}

// 使用法
const userIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const users = await mapWithConcurrency(userIds, fetchUser, 3);
```

## エラーハンドリングのベストプラクティス

### 1. 適切なエラー伝播

```javascript
async function processUserData(userId) {
    try {
        const user = await fetchUser(userId);
        const processedData = await processData(user);
        return processedData;
    } catch (error) {
        // エラーをログ
        console.error('Error in processUserData:', error);

        // 必要に応じてエラーを変換
        if (error.message.includes('not found')) {
            throw new Error(`User ${userId} not found`);
        }

        // 元のエラーを再スロー
        throw error;
    }
}
```

### 2. グレースフルデグラデーション

```javascript
async function loadUserDashboard(userId) {
    const results = await Promise.allSettled([
        fetchUser(userId),
        fetchUserPosts(userId),
        fetchNotifications(userId),
        fetchUserSettings(userId)
    ]);

    const [userResult, postsResult, notificationsResult, settingsResult] = results;

    return {
        user: userResult.status === 'fulfilled' ? userResult.value : null,
        posts: postsResult.status === 'fulfilled' ? postsResult.value : [],
        notifications: notificationsResult.status === 'fulfilled' ? notificationsResult.value : [],
        settings: settingsResult.status === 'fulfilled' ? settingsResult.value : getDefaultSettings()
    };
}
```

### 3. Async/Await でのエラーバウンダリ

```javascript
class AsyncErrorBoundary {
    constructor() {
        this.errorHandlers = new Map();
    }

    addErrorHandler(errorType, handler) {
        this.errorHandlers.set(errorType, handler);
    }

    async execute(asyncFunction) {
        try {
            return await asyncFunction();
        } catch (error) {
            const handler = this.errorHandlers.get(error.constructor.name);
            if (handler) {
                return await handler(error);
            }
            throw error;
        }
    }
}

// 使用法
const errorBoundary = new AsyncErrorBoundary();

errorBoundary.addErrorHandler('NetworkError', async (error) => {
    console.log('Network error handled');
    return getCachedData();
});

errorBoundary.addErrorHandler('AuthError', async (error) => {
    console.log('Auth error handled');
    await refreshToken();
    return retryOperation();
});
```

## 非同期コードのテスト

### 1. Promises のテスト

```javascript
// Jest の例
describe('User API', () => {
    test('should fetch user successfully', async () => {
        const user = await fetchUser(1);
        expect(user).toHaveProperty('id', 1);
        expect(user).toHaveProperty('name');
    });

    test('should reject with invalid ID', async () => {
        await expect(fetchUser(-1)).rejects.toThrow('Invalid user ID');
    });

    test('should handle network errors', async () => {
        // ネットワークエラーをシミュレートするために fetch をモック
        global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

        await expect(fetchUserProfile(1)).rejects.toThrow('Network error');
    });
});
```

### 2. モックを使ったテスト

```javascript
// 非同期関数をモック
const mockFetchUser = jest.fn();
mockFetchUser.mockResolvedValue({ id: 1, name: 'John' });

test('should process user data', async () => {
    const result = await processUserData(1);
    expect(mockFetchUser).toHaveBeenCalledWith(1);
    expect(result).toEqual({ id: 1, name: 'John' });
});
```

### 3. タイムアウトのテスト

```javascript
test('should timeout after 5 seconds', async () => {
    const slowPromise = new Promise(resolve => {
        setTimeout(resolve, 6000);
    });

    await expect(
        Promise.race([
            slowPromise,
            timeout(5000)
        ])
    ).rejects.toThrow('Operation timed out');
});
```

## パフォーマンスの考慮事項

### 1. ブロッキング操作の回避

```javascript
// ❌ 悪い：ブロッキングループ
async function processItemsSequentially(items) {
    const results = [];
    for (const item of items) {
        const result = await processItem(item); // 各アイテムでブロック
        results.push(result);
    }
    return results;
}

// ✅ 良い：並列処理
async function processItemsInParallel(items) {
    const promises = items.map(item => processItem(item));
    return await Promise.all(promises);
}

// ✅ 良い：制御された同時実行
async function processItemsWithConcurrency(items, concurrency = 5) {
    const results = [];
    for (let i = 0; i < items.length; i += concurrency) {
        const batch = items.slice(i, i + concurrency);
        const batchResults = await Promise.all(batch.map(processItem));
        results.push(...batchResults);
    }
    return results;
}
```

### 2. メモリ管理

```javascript
// ❌ 悪い：長時間実行操作でのメモリリーク
async function processLargeDataset(data) {
    const results = [];

    for (const item of data) {
        const result = await processItem(item);
        results.push(result); // メモリ内にすべての結果を蓄積
    }

    return results;
}

// ✅ 良い：ストリーム処理
async function* processLargeDatasetStream(data) {
    for (const item of data) {
        const result = await processItem(item);
        yield result; // 一度に一つずつ処理
    }
}

// 使用法
for await (const result of processLargeDatasetStream(data)) {
    console.log(result);
    // すぐに結果を処理、すべてを保存しない
}
```

## 一般的な落とし穴と解決策

### 1. Await の忘れ

```javascript
// ❌ 悪い：await を忘れた
async function badExample() {
    const user = fetchUser(1); // Promise を返す、ユーザーデータではない
    console.log(user.name); // エラー：undefined のプロパティ 'name' を読み取れません
}

// ✅ 良い：適切な await の使用
async function goodExample() {
    const user = await fetchUser(1);
    console.log(user.name);
}
```

### 2. Promises と Async/Await の混合

```javascript
// ❌ 悪い：パターンの混合
async function mixedExample() {
    return fetchUser(1).then(user => {
        return processUser(user);
    });
}

// ✅ 良い：一貫した async/await
async function consistentExample() {
    const user = await fetchUser(1);
    return await processUser(user);
}
```

### 3. 拒否された Promises の未処理

```javascript
// ❌ 悪い：未処理の Promise 拒否
async function unhandledExample() {
    const promises = [
        fetchUser(1),
        fetchUser(2),
        fetchUser(-1) // これは拒否される
    ];

    const results = await Promise.all(promises); // エラーをスロー
}

// ✅ 良い：適切なエラーハンドリング
async function handledExample() {
    const promises = [
        fetchUser(1),
        fetchUser(2),
        fetchUser(-1)
    ];

    const results = await Promise.allSettled(promises);

    const successfulResults = results
        .filter(result => result.status === 'fulfilled')
        .map(result => result.value);

    const errors = results
        .filter(result => result.status === 'rejected')
        .map(result => result.reason);

    return { successfulResults, errors };
}
```

## ベストプラクティスの要約

### 1. 可読性のために Async/Await を使用

```javascript
// ✅ 推奨：クリーンで読みやすい
async function getUserData(userId) {
    try {
        const user = await fetchUser(userId);
        const posts = await fetchUserPosts(userId);
        return { user, posts };
    } catch (error) {
        throw new Error(`Failed to get user data: ${error.message}`);
    }
}

// ❌ 避ける：async/await がより清潔な場合の Promise チェーン
function getUserDataPromise(userId) {
    return fetchUser(userId)
        .then(user => {
            return fetchUserPosts(userId)
                .then(posts => ({ user, posts }));
        })
        .catch(error => {
            throw new Error(`Failed to get user data: ${error.message}`);
        });
}
```

### 2. 適切なエラーハンドリング

```javascript
// ✅ 良い：包括的なエラーハンドリング
async function robustFunction() {
    try {
        const result = await riskyOperation();
        return result;
    } catch (error) {
        // デバッグのためにログ
        console.error('Operation failed:', error);

        // ユーザー用にエラーを変換
        if (error.code === 'NETWORK_ERROR') {
            throw new Error('Please check your internet connection');
        }

        // フォールバックを提供
        return getDefaultValue();
    }
}
```

### 3. 可能な場合は並列処理を使用

```javascript
// ✅ 良い：独立した操作の並列実行
async function efficientDataLoading() {
    const [user, settings, notifications] = await Promise.all([
        fetchUser(userId),
        fetchUserSettings(userId),
        fetchNotifications(userId)
    ]);

    return { user, settings, notifications };
}
```

## 結論

JavaScript Promises と async/await は非同期操作を処理するための強力なツールです。重要なポイント：

1. **よりクリーンなコードのために async/await を使用** - Promise チェーンより読みやすい
2. **適切にエラーを処理** - async/await では常に try/catch を使用
3. **Promise メソッドを理解** - `Promise.all()`、`Promise.allSettled()` など
4. **パフォーマンスを考慮** - 適切な場合は並列処理を使用
5. **非同期コードを徹底的にテスト** - 外部依存関係をモック
6. **一般的な落とし穴を回避** - await を忘れない、拒否を処理
7. **適切なパターンを使用** - 仕事に適したツールを選択

非同期 JavaScript の習得は現代の Web 開発に不可欠です。これらの概念とパターンで、効率的で保守しやすい非同期コードを書けるようになります。

## 次のステップ

Promises と async/await を習得した後、以下を探求してください：

1. **Web APIs** - Fetch API、Web Workers、Service Workers
2. **リアクティブプログラミング** - RxJS と Observables
3. **Node.js ストリーム** - データストリームの操作
4. **GraphQL** - 現代的な API クエリ言語
5. **WebSockets** - リアルタイム通信
6. **パフォーマンス最適化** - デバウンス、スロットル、キャッシュ

非同期プログラミングは現代 JavaScript の中核です - これらの概念を習得して、レスポンシブで効率的なアプリケーションを構築しましょう！