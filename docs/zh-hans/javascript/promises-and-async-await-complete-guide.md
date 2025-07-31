# JavaScript Promises 和 Async/Await - 完整指南

异步编程是现代 JavaScript 开发的基础。这个综合教程涵盖了 Promises、async/await 和高级异步模式，将使您成为更有效的 JavaScript 开发者。

## 理解异步 JavaScript

### 什么是异步编程？

**异步编程**允许代码在不阻塞主线程的情况下运行，使 JavaScript 能够同时处理多个操作。这对以下场景至关重要：

- **网络请求**（API 调用）
- **文件操作**（读取/写入文件）
- **数据库查询**（连接到数据库）
- **定时器操作**（setTimeout、setInterval）
- **用户交互**（事件处理）

### 事件循环

JavaScript 运行在单线程上，但使用事件循环来处理异步操作：

```javascript
// 同步代码 - 阻塞执行
console.log('Start');
console.log('Middle');
console.log('End');

// 异步代码 - 非阻塞
console.log('Start');
setTimeout(() => {
    console.log('Async operation');
}, 0);
console.log('End');

// 输出：
// Start
// End
// Async operation
```

### 回调模式（遗留）

在 Promises 之前，JavaScript 使用回调进行异步操作：

```javascript
// 回调示例
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

#### 回调地狱问题

```javascript
// 嵌套回调 - 难以阅读和维护
getData(function(a) {
    getMoreData(a, function(b) {
        getMoreData(b, function(c) {
            getMoreData(c, function(d) {
                // 这就是回调地狱！
                console.log('Final result:', d);
            });
        });
    });
});
```

## 理解 Promises

### 什么是 Promise？

**Promise** 是一个表示异步操作最终完成或失败的对象。它有三种状态：

1. **Pending** - 初始状态，既未成功也未失败
2. **Fulfilled** - 操作成功完成
3. **Rejected** - 操作失败

### 创建 Promises

#### 基本 Promise 语法

```javascript
// 创建 Promise
const myPromise = new Promise((resolve, reject) => {
    // 异步操作
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

#### 带超时的 Promise

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

#### 带数据的 Promise

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
        return user.id; // 将数据传递给下一个 .then()
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
        // 清理代码在这里
    });
```

### Promise 链

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
            throw error; // 重新抛出以便上游处理
        });
}
```

## 静态 Promise 方法

### `Promise.all()` - 并行执行

```javascript
// 等待所有 promises 解决
const promises = [
    fetchUser(1),
    fetchUser(2),
    fetchUser(3)
];

Promise.all(promises)
    .then(users => {
        console.log('All users:', users);
        // 所有 promises 已解决
    })
    .catch(error => {
        console.error('One or more promises failed:', error);
        // 如果任何 promise 失败，此 catch 运行
    });
```

### `Promise.allSettled()` - 所有结果

```javascript
// 等待所有 promises 完成（解决或拒绝）
const promises = [
    fetchUser(1),
    fetchUser(-1), // 这将拒绝
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

### `Promise.race()` - 第一个完成

```javascript
// 使用第一个完成的 promise 解决
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

### `Promise.any()` - 第一个解决

```javascript
// 使用第一个成功的 promise 解决
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

## Async/Await 语法

### 什么是 Async/Await？

**Async/await** 是建立在 Promises 之上的语法糖，使异步代码看起来和行为更像同步代码。

### 基本 Async/Await

```javascript
// 基于 Promise 的方法
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

### 异步函数声明

```javascript
// 异步函数声明
async function getData() {
    return 'data';
}

// 异步函数表达式
const getData = async function() {
    return 'data';
};

// 异步箭头函数
const getData = async () => {
    return 'data';
};

// 对象中的异步方法
const obj = {
    async getData() {
        return 'data';
    }
};

// 类中的异步方法
class DataService {
    async getData() {
        return 'data';
    }
}
```

### Await 关键字

```javascript
async function processData() {
    // await 只能在异步函数内使用
    const data = await fetchData();
    const processedData = await processDataStep(data);
    const result = await saveData(processedData);

    return result;
}

// 这会导致错误 - 在异步函数外使用 await
// const data = await fetchData(); // SyntaxError
```

### 使用 Try/Catch 进行错误处理

```javascript
async function handleErrors() {
    try {
        const user = await fetchUser(1);
        const posts = await fetchUserPosts(user.id);
        const comments = await fetchUserComments(posts[0].id);

        return { user, posts, comments };
    } catch (error) {
        console.error('Error occurred:', error);

        // 处理特定错误类型
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

## 实际示例

### 1. API 数据获取

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

### 2. 顺序 vs 并行操作

```javascript
// 顺序操作（较慢）
async function sequentialOperations() {
    const startTime = Date.now();

    const user = await fetchUser(1);        // 等待 1 秒
    const posts = await fetchUserPosts(1);  // 再等待 1 秒
    const comments = await fetchComments(1); // 再等待 1 秒

    const endTime = Date.now();
    console.log(`Sequential took ${endTime - startTime}ms`); // ~3000ms

    return { user, posts, comments };
}

// 并行操作（更快）
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

### 3. 处理多个异步操作

```javascript
async function loadDashboardData(userId) {
    try {
        // 并行开始所有操作
        const userPromise = fetchUser(userId);
        const postsPromise = fetchUserPosts(userId);
        const notificationsPromise = fetchNotifications(userId);
        const settingsPromise = fetchUserSettings(userId);

        // 首先等待关键数据
        const user = await userPromise;

        // 等待其余数据
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

### 4. 使用 Async/Await 的重试逻辑

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
                throw error; // 最后一次尝试失败
            }

            // 重试前等待
            await delay(1000 * (i + 1)); // 指数退避
        }
    }
}
```

### 5. 超时实现

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

## 高级模式

### 1. Promise 队列

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

### 2. 异步迭代器

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
        // 处理用户
    }
}
```

### 3. 防抖异步函数

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

// 只有 300ms 内的最后一次搜索会执行
debouncedSearch('javascript');
debouncedSearch('javascrip');
debouncedSearch('javascript promises'); // 这个会执行
```

### 4. 带并发限制的异步映射

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

## 错误处理最佳实践

### 1. 适当的错误传播

```javascript
async function processUserData(userId) {
    try {
        const user = await fetchUser(userId);
        const processedData = await processData(user);
        return processedData;
    } catch (error) {
        // 记录错误
        console.error('Error in processUserData:', error);

        // 如果需要，转换错误
        if (error.message.includes('not found')) {
            throw new Error(`User ${userId} not found`);
        }

        // 重新抛出原始错误
        throw error;
    }
}
```

### 2. 优雅降级

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

### 3. 使用 Async/Await 的错误边界

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

## 测试异步代码

### 1. 测试 Promises

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
        // 模拟 fetch 以模拟网络错误
        global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

        await expect(fetchUserProfile(1)).rejects.toThrow('Network error');
    });
});
```

### 2. 使用模拟进行测试

```javascript
// 模拟异步函数
const mockFetchUser = jest.fn();
mockFetchUser.mockResolvedValue({ id: 1, name: 'John' });

test('should process user data', async () => {
    const result = await processUserData(1);
    expect(mockFetchUser).toHaveBeenCalledWith(1);
    expect(result).toEqual({ id: 1, name: 'John' });
});
```

### 3. 测试超时

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

## 性能考虑

### 1. 避免阻塞操作

```javascript
// ❌ 不好：阻塞循环
async function processItemsSequentially(items) {
    const results = [];
    for (const item of items) {
        const result = await processItem(item); // 在每个项目上阻塞
        results.push(result);
    }
    return results;
}

// ✅ 好：并行处理
async function processItemsInParallel(items) {
    const promises = items.map(item => processItem(item));
    return await Promise.all(promises);
}

// ✅ 好：受控并发
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

### 2. 内存管理

```javascript
// ❌ 不好：长时间运行操作的内存泄漏
async function processLargeDataset(data) {
    const results = [];

    for (const item of data) {
        const result = await processItem(item);
        results.push(result); // 在内存中累积所有结果
    }

    return results;
}

// ✅ 好：流处理
async function* processLargeDatasetStream(data) {
    for (const item of data) {
        const result = await processItem(item);
        yield result; // 一次处理一个
    }
}

// 使用
for await (const result of processLargeDatasetStream(data)) {
    console.log(result);
    // 立即处理结果，不存储所有结果
}
```

## 常见陷阱和解决方案

### 1. 忘记 Await

```javascript
// ❌ 不好：忘记 await
async function badExample() {
    const user = fetchUser(1); // 返回 Promise，不是用户数据
    console.log(user.name); // 错误：无法读取 undefined 的属性 'name'
}

// ✅ 好：正确使用 await
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

### 3. 不处理被拒绝的 Promises

```javascript
// ❌ 不好：未处理的 promise 拒绝
async function unhandledExample() {
    const promises = [
        fetchUser(1),
        fetchUser(2),
        fetchUser(-1) // 这将拒绝
    ];

    const results = await Promise.all(promises); // 抛出错误
}

// ✅ 好：适当的错误处理
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

## 最佳实践总结

### 1. 使用 Async/Await 提高可读性

```javascript
// ✅ 首选：清洁且可读
async function getUserData(userId) {
    try {
        const user = await fetchUser(userId);
        const posts = await fetchUserPosts(userId);
        return { user, posts };
    } catch (error) {
        throw new Error(`Failed to get user data: ${error.message}`);
    }
}

// ❌ 避免：当 async/await 更清洁时的 Promise 链
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

### 2. 适当处理错误

```javascript
// ✅ 好：全面的错误处理
async function robustFunction() {
    try {
        const result = await riskyOperation();
        return result;
    } catch (error) {
        // 记录以便调试
        console.error('Operation failed:', error);

        // 为用户转换错误
        if (error.code === 'NETWORK_ERROR') {
            throw new Error('Please check your internet connection');
        }

        // 提供回退
        return getDefaultValue();
    }
}
```

### 3. 尽可能使用并行处理

```javascript
// ✅ 好：并行独立操作
async function efficientDataLoading() {
    const [user, settings, notifications] = await Promise.all([
        fetchUser(userId),
        fetchUserSettings(userId),
        fetchNotifications(userId)
    ]);

    return { user, settings, notifications };
}
```

## 结论

JavaScript Promises 和 async/await 是处理异步操作的强大工具。主要要点：

1. **使用 async/await 获得更清洁的代码** - 比 Promise 链更可读
2. **正确处理错误** - 始终在 async/await 中使用 try/catch
3. **理解 Promise 方法** - `Promise.all()`、`Promise.allSettled()` 等
4. **考虑性能** - 适当时使用并行处理
5. **彻底测试异步代码** - 模拟外部依赖
6. **避免常见陷阱** - 不要忘记 await，处理拒绝
7. **使用适当的模式** - 为工作选择正确的工具

掌握异步 JavaScript 对现代 Web 开发至关重要。通过这些概念和模式，您将能够编写高效、可维护的异步代码。

## 下一步

掌握 Promises 和 async/await 后，探索：

1. **Web APIs** - Fetch API、Web Workers、Service Workers
2. **响应式编程** - RxJS 和 Observables
3. **Node.js 流** - 处理数据流
4. **GraphQL** - 现代 API 查询语言
5. **WebSockets** - 实时通信
6. **性能优化** - 防抖、节流、缓存

异步编程是现代 JavaScript 的核心 - 掌握这些概念来构建响应迅速、高效的应用程序！