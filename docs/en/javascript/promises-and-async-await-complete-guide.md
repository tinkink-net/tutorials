# JavaScript Promises and Async/Await - Complete Guide

Asynchronous programming is fundamental to modern JavaScript development. This comprehensive tutorial covers Promises, async/await, and advanced asynchronous patterns that will make you a more effective JavaScript developer.

## Understanding Asynchronous JavaScript

### What is Asynchronous Programming?

**Asynchronous programming** allows code to run without blocking the main thread, enabling JavaScript to handle multiple operations simultaneously. This is crucial for:

- **Network requests** (API calls)
- **File operations** (reading/writing files)
- **Database queries** (connecting to databases)
- **Timer operations** (setTimeout, setInterval)
- **User interactions** (event handling)

### The Event Loop

JavaScript runs on a single thread but uses an event loop to handle asynchronous operations:

```javascript
// Synchronous code - blocks execution
console.log('Start');
console.log('Middle');
console.log('End');

// Asynchronous code - non-blocking
console.log('Start');
setTimeout(() => {
    console.log('Async operation');
}, 0);
console.log('End');

// Output:
// Start
// End
// Async operation
```

### Callback Pattern (Legacy)

Before Promises, JavaScript used callbacks for asynchronous operations:

```javascript
// Callback example
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

#### Callback Hell Problem

```javascript
// Nested callbacks - hard to read and maintain
getData(function(a) {
    getMoreData(a, function(b) {
        getMoreData(b, function(c) {
            getMoreData(c, function(d) {
                // This is callback hell!
                console.log('Final result:', d);
            });
        });
    });
});
```

## Understanding Promises

### What is a Promise?

A **Promise** is an object representing the eventual completion or failure of an asynchronous operation. It has three states:

1. **Pending** - Initial state, neither fulfilled nor rejected
2. **Fulfilled** - Operation completed successfully
3. **Rejected** - Operation failed

### Creating Promises

#### Basic Promise Syntax

```javascript
// Creating a Promise
const myPromise = new Promise((resolve, reject) => {
    // Asynchronous operation
    const success = true;

    if (success) {
        resolve('Operation successful!');
    } else {
        reject('Operation failed!');
    }
});

// Using the Promise
myPromise
    .then(result => {
        console.log('Success:', result);
    })
    .catch(error => {
        console.log('Error:', error);
    });
```

#### Promise with Timeout

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

#### Promise with Data

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

### Promise Methods

#### `.then()` Method

```javascript
fetchUser(1)
    .then(user => {
        console.log('Got user:', user.name);
        return user.id; // Pass data to next .then()
    })
    .then(userId => {
        console.log('User ID:', userId);
        return fetchUserPosts(userId);
    })
    .then(posts => {
        console.log('User posts:', posts);
    });
```

#### `.catch()` Method

```javascript
fetchUser(-1)
    .then(user => {
        console.log('User:', user);
    })
    .catch(error => {
        console.error('Caught error:', error.message);
    });
```

#### `.finally()` Method

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
        // Cleanup code here
    });
```

### Promise Chaining

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
            throw error; // Re-throw to handle upstream
        });
}
```

## Static Promise Methods

### `Promise.all()` - Parallel Execution

```javascript
// Wait for all promises to resolve
const promises = [
    fetchUser(1),
    fetchUser(2),
    fetchUser(3)
];

Promise.all(promises)
    .then(users => {
        console.log('All users:', users);
        // All promises resolved
    })
    .catch(error => {
        console.error('One or more promises failed:', error);
        // If ANY promise fails, this catch runs
    });
```

### `Promise.allSettled()` - All Results

```javascript
// Wait for all promises to settle (resolve or reject)
const promises = [
    fetchUser(1),
    fetchUser(-1), // This will reject
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

### `Promise.race()` - First to Finish

```javascript
// Resolves with the first promise that settles
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

### `Promise.any()` - First to Resolve

```javascript
// Resolves with the first promise that fulfills
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

## Async/Await Syntax

### What is Async/Await?

**Async/await** is syntactic sugar built on top of Promises, making asynchronous code look and behave more like synchronous code.

### Basic Async/Await

```javascript
// Promise-based approach
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

// Async/await approach
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

### Async Function Declaration

```javascript
// Async function declaration
async function getData() {
    return 'data';
}

// Async function expression
const getData = async function() {
    return 'data';
};

// Async arrow function
const getData = async () => {
    return 'data';
};

// Async method in object
const obj = {
    async getData() {
        return 'data';
    }
};

// Async method in class
class DataService {
    async getData() {
        return 'data';
    }
}
```

### Await Keyword

```javascript
async function processData() {
    // Await can only be used inside async functions
    const data = await fetchData();
    const processedData = await processDataStep(data);
    const result = await saveData(processedData);

    return result;
}

// This would cause an error - await outside async function
// const data = await fetchData(); // SyntaxError
```

### Error Handling with Try/Catch

```javascript
async function handleErrors() {
    try {
        const user = await fetchUser(1);
        const posts = await fetchUserPosts(user.id);
        const comments = await fetchUserComments(posts[0].id);

        return { user, posts, comments };
    } catch (error) {
        console.error('Error occurred:', error);

        // Handle specific error types
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

## Practical Examples

### 1. API Data Fetching

```javascript
// Fetch API with async/await
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

// Usage
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

### 2. Sequential vs Parallel Operations

```javascript
// Sequential operations (slower)
async function sequentialOperations() {
    const startTime = Date.now();

    const user = await fetchUser(1);        // Wait 1 second
    const posts = await fetchUserPosts(1);  // Wait another 1 second
    const comments = await fetchComments(1); // Wait another 1 second

    const endTime = Date.now();
    console.log(`Sequential took ${endTime - startTime}ms`); // ~3000ms

    return { user, posts, comments };
}

// Parallel operations (faster)
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

### 3. Handling Multiple Async Operations

```javascript
async function loadDashboardData(userId) {
    try {
        // Start all operations in parallel
        const userPromise = fetchUser(userId);
        const postsPromise = fetchUserPosts(userId);
        const notificationsPromise = fetchNotifications(userId);
        const settingsPromise = fetchUserSettings(userId);

        // Wait for critical data first
        const user = await userPromise;

        // Wait for the rest
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

### 4. Retry Logic with Async/Await

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
                throw error; // Last attempt failed
            }

            // Wait before retry
            await delay(1000 * (i + 1)); // Exponential backoff
        }
    }
}
```

### 5. Timeout Implementation

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

## Advanced Patterns

### 1. Promise Queue

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

// Usage
const queue = new PromiseQueue();

queue.add(() => fetchUser(1)).then(user => console.log('User 1:', user));
queue.add(() => fetchUser(2)).then(user => console.log('User 2:', user));
queue.add(() => fetchUser(3)).then(user => console.log('User 3:', user));
```

### 2. Async Iterator

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

// Usage
async function processAllUsers() {
    for await (const users of fetchUsersGenerator()) {
        console.log(`Processing ${users.length} users`);
        // Process users
    }
}
```

### 3. Debounced Async Function

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

// Usage
const debouncedSearch = debounceAsync(async (query) => {
    const response = await fetch(`/api/search?q=${query}`);
    return await response.json();
}, 300);

// Only the last search within 300ms will execute
debouncedSearch('javascript');
debouncedSearch('javascrip');
debouncedSearch('javascript promises'); // This one executes
```

### 4. Async Map with Concurrency Limit

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

// Usage
const userIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const users = await mapWithConcurrency(userIds, fetchUser, 3);
```

## Error Handling Best Practices

### 1. Proper Error Propagation

```javascript
async function processUserData(userId) {
    try {
        const user = await fetchUser(userId);
        const processedData = await processData(user);
        return processedData;
    } catch (error) {
        // Log the error
        console.error('Error in processUserData:', error);

        // Transform error if needed
        if (error.message.includes('not found')) {
            throw new Error(`User ${userId} not found`);
        }

        // Re-throw original error
        throw error;
    }
}
```

### 2. Graceful Degradation

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

### 3. Error Boundaries with Async/Await

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

// Usage
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

## Testing Async Code

### 1. Testing Promises

```javascript
// Jest example
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
        // Mock fetch to simulate network error
        global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

        await expect(fetchUserProfile(1)).rejects.toThrow('Network error');
    });
});
```

### 2. Testing with Mocks

```javascript
// Mock async functions
const mockFetchUser = jest.fn();
mockFetchUser.mockResolvedValue({ id: 1, name: 'John' });

test('should process user data', async () => {
    const result = await processUserData(1);
    expect(mockFetchUser).toHaveBeenCalledWith(1);
    expect(result).toEqual({ id: 1, name: 'John' });
});
```

### 3. Testing Timeouts

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

## Performance Considerations

### 1. Avoid Blocking Operations

```javascript
// ❌ Bad: Blocking loop
async function processItemsSequentially(items) {
    const results = [];
    for (const item of items) {
        const result = await processItem(item); // Blocks on each item
        results.push(result);
    }
    return results;
}

// ✅ Good: Parallel processing
async function processItemsInParallel(items) {
    const promises = items.map(item => processItem(item));
    return await Promise.all(promises);
}

// ✅ Good: Controlled concurrency
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

### 2. Memory Management

```javascript
// ❌ Bad: Memory leak with long-running operations
async function processLargeDataset(data) {
    const results = [];

    for (const item of data) {
        const result = await processItem(item);
        results.push(result); // Accumulates all results in memory
    }

    return results;
}

// ✅ Good: Stream processing
async function* processLargeDatasetStream(data) {
    for (const item of data) {
        const result = await processItem(item);
        yield result; // Process one at a time
    }
}

// Usage
for await (const result of processLargeDatasetStream(data)) {
    console.log(result);
    // Process result immediately, don't store all
}
```

## Common Pitfalls and Solutions

### 1. Forgotten Await

```javascript
// ❌ Bad: Forgot await
async function badExample() {
    const user = fetchUser(1); // Returns Promise, not user data
    console.log(user.name); // Error: Cannot read property 'name' of undefined
}

// ✅ Good: Proper await usage
async function goodExample() {
    const user = await fetchUser(1);
    console.log(user.name);
}
```

### 2. Mixing Promises and Async/Await

```javascript
// ❌ Bad: Mixing patterns
async function mixedExample() {
    return fetchUser(1).then(user => {
        return processUser(user);
    });
}

// ✅ Good: Consistent async/await
async function consistentExample() {
    const user = await fetchUser(1);
    return await processUser(user);
}
```

### 3. Not Handling Rejected Promises

```javascript
// ❌ Bad: Unhandled promise rejection
async function unhandledExample() {
    const promises = [
        fetchUser(1),
        fetchUser(2),
        fetchUser(-1) // This will reject
    ];

    const results = await Promise.all(promises); // Throws error
}

// ✅ Good: Proper error handling
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

## Best Practices Summary

### 1. Use Async/Await for Readability

```javascript
// ✅ Preferred: Clean and readable
async function getUserData(userId) {
    try {
        const user = await fetchUser(userId);
        const posts = await fetchUserPosts(userId);
        return { user, posts };
    } catch (error) {
        throw new Error(`Failed to get user data: ${error.message}`);
    }
}

// ❌ Avoid: Promise chains when async/await is cleaner
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

### 2. Handle Errors Appropriately

```javascript
// ✅ Good: Comprehensive error handling
async function robustFunction() {
    try {
        const result = await riskyOperation();
        return result;
    } catch (error) {
        // Log for debugging
        console.error('Operation failed:', error);

        // Transform error for user
        if (error.code === 'NETWORK_ERROR') {
            throw new Error('Please check your internet connection');
        }

        // Provide fallback
        return getDefaultValue();
    }
}
```

### 3. Use Parallel Processing When Possible

```javascript
// ✅ Good: Parallel independent operations
async function efficientDataLoading() {
    const [user, settings, notifications] = await Promise.all([
        fetchUser(userId),
        fetchUserSettings(userId),
        fetchNotifications(userId)
    ]);

    return { user, settings, notifications };
}
```

## Conclusion

JavaScript Promises and async/await are powerful tools for handling asynchronous operations. Key takeaways:

1. **Use async/await for cleaner code** - More readable than Promise chains
2. **Handle errors properly** - Always use try/catch with async/await
3. **Understand Promise methods** - `Promise.all()`, `Promise.allSettled()`, etc.
4. **Consider performance** - Use parallel processing when appropriate
5. **Test async code thoroughly** - Mock external dependencies
6. **Avoid common pitfalls** - Don't forget await, handle rejections
7. **Use appropriate patterns** - Choose the right tool for the job

Mastering asynchronous JavaScript is essential for modern web development. With these concepts and patterns, you'll be able to write efficient, maintainable asynchronous code.

## Next Steps

After mastering Promises and async/await, explore:

1. **Web APIs** - Fetch API, Web Workers, Service Workers
2. **Reactive Programming** - RxJS and Observables
3. **Node.js Streams** - Working with data streams
4. **GraphQL** - Modern API query language
5. **WebSockets** - Real-time communication
6. **Performance optimization** - Debouncing, throttling, caching

Asynchronous programming is at the heart of modern JavaScript - master these concepts to build responsive, efficient applications!
