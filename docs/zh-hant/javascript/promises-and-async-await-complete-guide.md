# JavaScript Promises 和 Async/Await - 完整指南

異步編程是現代 JavaScript 開發的基礎。這個綜合教程涵蓋了 Promises、async/await 和高級異步模式，將使您成為更有效的 JavaScript 開發者。

## 理解異步 JavaScript

### 什麼是異步編程？

**異步編程**允許代碼在不阻塞主線程的情況下運行，使 JavaScript 能夠同時處理多個操作。這對以下場景至關重要：

- **網絡請求**（API 調用）
- **文件操作**（讀取/寫入文件）
- **數據庫查詢**（連接到數據庫）
- **定時器操作**（setTimeout、setInterval）
- **用戶交互**（事件處理）

### 事件循環

JavaScript 運行在單線程上，但使用事件循環來處理異步操作：

```javascript
// 同步代碼 - 阻塞執行
console.log('Start');
console.log('Middle');
console.log('End');

// 異步代碼 - 非阻塞
console.log('Start');
setTimeout(() => {
    console.log('Async operation');
}, 0);
console.log('End');

// 輸出：
// Start
// End
// Async operation
```

### 回調模式（遺留）

在 Promises 之前，JavaScript 使用回調進行異步操作：

```javascript
// 回調示例
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

#### 回調地獄問題

```javascript
// 嵌套回調 - 難以閱讀和維護
getData(function(a) {
    getMoreData(a, function(b) {
        getMoreData(b, function(c) {
            getMoreData(c, function(d) {
                // 這就是回調地獄！
                console.log('Final result:', d);
            });
        });
    });
});
```

## 理解 Promises

### 什麼是 Promise？

**Promise** 是一個表示異步操作最終完成或失敗的對象。它有三種狀態：

1. **Pending** - 初始狀態，既未成功也未失敗
2. **Fulfilled** - 操作成功完成
3. **Rejected** - 操作失敗

### 創建 Promises

#### 基本 Promise 語法

```javascript
// 創建 Promise
const myPromise = new Promise((resolve, reject) => {
    // 異步操作
    const success = true;

    if (success) {
        resolve('Operation successful!');
    } else {
        reject('Operation failed!');
    }
});

// 使用 Promise
myPromise
    .then(result => {
        console.log('Success:', result);
    })
    .catch(error => {
        console.log('Error:', error);
    });
```

#### 帶超時的 Promise

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

#### 帶數據的 Promise

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

### Promise 方法

#### `.then()` 方法

```javascript
fetchUser(1)
    .then(user => {
        console.log('Got user:', user.name);
        return user.id; // 將數據傳遞給下一個 .then()
    })
    .then(userId => {
        console.log('User ID:', userId);
        return fetchUserPosts(userId);
    })
    .then(posts => {
        console.log('User posts:', posts);
    });
```

#### `.catch()` 方法

```javascript
fetchUser(-1)
    .then(user => {
        console.log('User:', user);
    })
    .catch(error => {
        console.error('Caught error:', error.message);
    });
```

#### `.finally()` 方法

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
        // 清理代碼在這裡
    });
```

### Promise 鏈

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
            throw error; // 重新拋出以便上游處理
        });
}
```

## 靜態 Promise 方法

### `Promise.all()` - 並行執行

```javascript
// 等待所有 promises 解決
const promises = [
    fetchUser(1),
    fetchUser(2),
    fetchUser(3)
];

Promise.all(promises)
    .then(users => {
        console.log('All users:', users);
        // 所有 promises 已解決
    })
    .catch(error => {
        console.error('One or more promises failed:', error);
        // 如果任何 promise 失敗，此 catch 運行
    });
```

### `Promise.allSettled()` - 所有結果

```javascript
// 等待所有 promises 完成（解決或拒絕）
const promises = [
    fetchUser(1),
    fetchUser(-1), // 這將拒絕
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

### `Promise.race()` - 第一個完成

```javascript
// 使用第一個完成的 promise 解決
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

### `Promise.any()` - 第一個解決

```javascript
// 使用第一個成功的 promise 解決
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

## Async/Await 語法

### 什麼是 Async/Await？

**Async/await** 是建立在 Promises 之上的語法糖，使異步代碼看起來和行為更像同步代碼。

### 基本 Async/Await

```javascript
// 基於 Promise 的方法
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

// Async/await 方法
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

### 異步函數聲明

```javascript
// 異步函數聲明
async function getData() {
    return 'data';
}

// 異步函數表達式
const getData = async function() {
    return 'data';
};

// 異步箭頭函數
const getData = async () => {
    return 'data';
};

// 對象中的異步方法
const obj = {
    async getData() {
        return 'data';
    }
};

// 類中的異步方法
class DataService {
    async getData() {
        return 'data';
    }
}
```

### Await 關鍵字

```javascript
async function processData() {
    // await 只能在異步函數內使用
    const data = await fetchData();
    const processedData = await processDataStep(data);
    const result = await saveData(processedData);

    return result;
}

// 這會導致錯誤 - 在異步函數外使用 await
// const data = await fetchData(); // SyntaxError
```

### 使用 Try/Catch 進行錯誤處理

```javascript
async function handleErrors() {
    try {
        const user = await fetchUser(1);
        const posts = await fetchUserPosts(user.id);
        const comments = await fetchUserComments(posts[0].id);

        return { user, posts, comments };
    } catch (error) {
        console.error('Error occurred:', error);

        // 處理特定錯誤類型
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

## 實際示例

### 1. API 數據獲取

```javascript
// 使用 async/await 的 Fetch API
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

// 使用
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

### 2. 順序 vs 並行操作

```javascript
// 順序操作（較慢）
async function sequentialOperations() {
    const startTime = Date.now();

    const user = await fetchUser(1);        // 等待 1 秒
    const posts = await fetchUserPosts(1);  // 再等待 1 秒
    const comments = await fetchComments(1); // 再等待 1 秒

    const endTime = Date.now();
    console.log(`Sequential took ${endTime - startTime}ms`); // ~3000ms

    return { user, posts, comments };
}

// 並行操作（更快）
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

### 3. 處理多個異步操作

```javascript
async function loadDashboardData(userId) {
    try {
        // 並行開始所有操作
        const userPromise = fetchUser(userId);
        const postsPromise = fetchUserPosts(userId);
        const notificationsPromise = fetchNotifications(userId);
        const settingsPromise = fetchUserSettings(userId);

        // 首先等待關鍵數據
        const user = await userPromise;

        // 等待其餘數據
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

### 4. 使用 Async/Await 的重試邏輯

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
                throw error; // 最後一次嘗試失敗
            }

            // 重試前等待
            await delay(1000 * (i + 1)); // 指數退避
        }
    }
}
```

### 5. 超時實現

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

## 高級模式

### 1. Promise 隊列

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

// 使用
const queue = new PromiseQueue();

queue.add(() => fetchUser(1)).then(user => console.log('User 1:', user));
queue.add(() => fetchUser(2)).then(user => console.log('User 2:', user));
queue.add(() => fetchUser(3)).then(user => console.log('User 3:', user));
```

### 2. 異步迭代器

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

// 使用
async function processAllUsers() {
    for await (const users of fetchUsersGenerator()) {
        console.log(`Processing ${users.length} users`);
        // 處理用戶
    }
}
```

### 3. 防抖異步函數

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

// 使用
const debouncedSearch = debounceAsync(async (query) => {
    const response = await fetch(`/api/search?q=${query}`);
    return await response.json();
}, 300);

// 只有 300ms 內的最後一次搜索會執行
debouncedSearch('javascript');
debouncedSearch('javascrip');
debouncedSearch('javascript promises'); // 這個會執行
```

### 4. 帶併發限制的異步映射

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

// 使用
const userIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const users = await mapWithConcurrency(userIds, fetchUser, 3);
```

## 錯誤處理最佳實踐

### 1. 適當的錯誤傳播

```javascript
async function processUserData(userId) {
    try {
        const user = await fetchUser(userId);
        const processedData = await processData(user);
        return processedData;
    } catch (error) {
        // 記錄錯誤
        console.error('Error in processUserData:', error);

        // 如果需要，轉換錯誤
        if (error.message.includes('not found')) {
            throw new Error(`User ${userId} not found`);
        }

        // 重新拋出原始錯誤
        throw error;
    }
}
```

### 2. 優雅降級

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

### 3. 使用 Async/Await 的錯誤邊界

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

// 使用
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

## 測試異步代碼

### 1. 測試 Promises

```javascript
// Jest 示例
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
        // 模擬 fetch 以模擬網絡錯誤
        global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

        await expect(fetchUserProfile(1)).rejects.toThrow('Network error');
    });
});
```

### 2. 使用模擬進行測試

```javascript
// 模擬異步函數
const mockFetchUser = jest.fn();
mockFetchUser.mockResolvedValue({ id: 1, name: 'John' });

test('should process user data', async () => {
    const result = await processUserData(1);
    expect(mockFetchUser).toHaveBeenCalledWith(1);
    expect(result).toEqual({ id: 1, name: 'John' });
});
```

### 3. 測試超時

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

## 性能考慮

### 1. 避免阻塞操作

```javascript
// ❌ 不好：阻塞循環
async function processItemsSequentially(items) {
    const results = [];
    for (const item of items) {
        const result = await processItem(item); // 在每個項目上阻塞
        results.push(result);
    }
    return results;
}

// ✅ 好：並行處理
async function processItemsInParallel(items) {
    const promises = items.map(item => processItem(item));
    return await Promise.all(promises);
}

// ✅ 好：受控併發
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

### 2. 內存管理

```javascript
// ❌ 不好：長時間運行操作的內存洩漏
async function processLargeDataset(data) {
    const results = [];

    for (const item of data) {
        const result = await processItem(item);
        results.push(result); // 在內存中累積所有結果
    }

    return results;
}

// ✅ 好：流處理
async function* processLargeDatasetStream(data) {
    for (const item of data) {
        const result = await processItem(item);
        yield result; // 一次處理一個
    }
}

// 使用
for await (const result of processLargeDatasetStream(data)) {
    console.log(result);
    // 立即處理結果，不存儲所有結果
}
```

## 常見陷阱和解決方案

### 1. 忘記 Await

```javascript
// ❌ 不好：忘記 await
async function badExample() {
    const user = fetchUser(1); // 返回 Promise，不是用戶數據
    console.log(user.name); // 錯誤：無法讀取 undefined 的屬性 'name'
}

// ✅ 好：正確使用 await
async function goodExample() {
    const user = await fetchUser(1);
    console.log(user.name);
}
```

### 2. 混合 Promises 和 Async/Await

```javascript
// ❌ 不好：混合模式
async function mixedExample() {
    return fetchUser(1).then(user => {
        return processUser(user);
    });
}

// ✅ 好：一致的 async/await
async function consistentExample() {
    const user = await fetchUser(1);
    return await processUser(user);
}
```

### 3. 不處理被拒絕的 Promises

```javascript
// ❌ 不好：未處理的 promise 拒絕
async function unhandledExample() {
    const promises = [
        fetchUser(1),
        fetchUser(2),
        fetchUser(-1) // 這將拒絕
    ];

    const results = await Promise.all(promises); // 拋出錯誤
}

// ✅ 好：適當的錯誤處理
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

## 最佳實踐總結

### 1. 使用 Async/Await 提高可讀性

```javascript
// ✅ 首選：清潔且可讀
async function getUserData(userId) {
    try {
        const user = await fetchUser(userId);
        const posts = await fetchUserPosts(userId);
        return { user, posts };
    } catch (error) {
        throw new Error(`Failed to get user data: ${error.message}`);
    }
}

// ❌ 避免：當 async/await 更清潔時的 Promise 鏈
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

### 2. 適當處理錯誤

```javascript
// ✅ 好：全面的錯誤處理
async function robustFunction() {
    try {
        const result = await riskyOperation();
        return result;
    } catch (error) {
        // 記錄以便調試
        console.error('Operation failed:', error);

        // 為用戶轉換錯誤
        if (error.code === 'NETWORK_ERROR') {
            throw new Error('Please check your internet connection');
        }

        // 提供回退
        return getDefaultValue();
    }
}
```

### 3. 盡可能使用並行處理

```javascript
// ✅ 好：並行獨立操作
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

JavaScript Promises 和 async/await 是處理異步操作的強大工具。主要要點：

1. **使用 async/await 獲得更清潔的代碼** - 比 Promise 鏈更可讀
2. **正確處理錯誤** - 始終在 async/await 中使用 try/catch
3. **理解 Promise 方法** - `Promise.all()`、`Promise.allSettled()` 等
4. **考慮性能** - 適當時使用並行處理
5. **徹底測試異步代碼** - 模擬外部依賴
6. **避免常見陷阱** - 不要忘記 await，處理拒絕
7. **使用適當的模式** - 為工作選擇正確的工具

掌握異步 JavaScript 對現代 Web 開發至關重要。通過這些概念和模式，您將能夠編寫高效、可維護的異步代碼。

## 下一步

掌握 Promises 和 async/await 後，探索：

1. **Web APIs** - Fetch API、Web Workers、Service Workers
2. **響應式編程** - RxJS 和 Observables
3. **Node.js 流** - 處理數據流
4. **GraphQL** - 現代 API 查詢語言
5. **WebSockets** - 實時通信
6. **性能優化** - 防抖、節流、緩存

異步編程是現代 JavaScript 的核心 - 掌握這些概念來構建響應迅速、高效的應用程序！