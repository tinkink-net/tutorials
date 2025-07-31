# JavaScript Promises y Async/Await - Guía Completa

La programación asíncrona es fundamental para el desarrollo moderno de JavaScript. Este tutorial integral cubre Promises, async/await y patrones asíncronos avanzados que te convertirán en un desarrollador JavaScript más efectivo.

## Entender JavaScript Asíncrono

### ¿Qué es la programación asíncrona?

La **programación asíncrona** permite que el código se ejecute sin bloquear el hilo principal, permitiendo que JavaScript maneje múltiples operaciones simultáneamente. Esto es crucial para:

- **Solicitudes de red** (llamadas a APIs)
- **Operaciones de archivos** (lectura/escritura de archivos)
- **Consultas a bases de datos** (conexión a bases de datos)
- **Operaciones de temporizador** (setTimeout, setInterval)
- **Interacciones del usuario** (manejo de eventos)

### El Bucle de Eventos

JavaScript se ejecuta en un solo hilo pero usa un bucle de eventos para manejar operaciones asíncronas:

```javascript
// Código síncrono - bloquea la ejecución
console.log('Start');
console.log('Middle');
console.log('End');

// Código asíncrono - no bloqueante
console.log('Start');
setTimeout(() => {
    console.log('Async operation');
}, 0);
console.log('End');

// Salida:
// Start
// End
// Async operation
```

### Patrón de Callback (Legado)

Antes de las Promises, JavaScript usaba callbacks para operaciones asíncronas:

```javascript
// Ejemplo de callback
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

#### Problema del Callback Hell

```javascript
// Callbacks anidados - difíciles de leer y mantener
getData(function(a) {
    getMoreData(a, function(b) {
        getMoreData(b, function(c) {
            getMoreData(c, function(d) {
                // ¡Esto es callback hell!
                console.log('Final result:', d);
            });
        });
    });
});
```

## Entender las Promises

### ¿Qué es una Promise?

Una **Promise** es un objeto que representa la eventual finalización o falla de una operación asíncrona. Tiene tres estados:

1. **Pending** - Estado inicial, ni cumplida ni rechazada
2. **Fulfilled** - Operación completada exitosamente
3. **Rejected** - Operación falló

### Crear Promises

#### Sintaxis Básica de Promise

```javascript
// Crear una Promise
const myPromise = new Promise((resolve, reject) => {
    // Operación asíncrona
    const success = true;

    if (success) {
        resolve('¡Operación exitosa!');
    } else {
        reject('¡Operación falló!');
    }
});

// Usar la Promise
myPromise
    .then(result => {
        console.log('Éxito:', result);
    })
    .catch(error => {
        console.log('Error:', error);
    });
```

#### Promise con Timeout

```javascript
function delay(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

delay(2000).then(() => {
    console.log('Han pasado 2 segundos');
});
```

#### Promise con Datos

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
                reject(new Error('ID de usuario inválido'));
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

### Métodos de Promise

#### Método `.then()`

```javascript
fetchUser(1)
    .then(user => {
        console.log('Usuario obtenido:', user.name);
        return user.id; // Pasar datos al siguiente .then()
    })
    .then(userId => {
        console.log('ID de usuario:', userId);
        return fetchUserPosts(userId);
    })
    .then(posts => {
        console.log('Posts del usuario:', posts);
    });
```

#### Método `.catch()`

```javascript
fetchUser(-1)
    .then(user => {
        console.log('User:', user);
    })
    .catch(error => {
        console.error('Error capturado:', error.message);
    });
```

#### Método `.finally()`

```javascript
fetchUser(1)
    .then(user => {
        console.log('Éxito:', user);
    })
    .catch(error => {
        console.error('Error:', error);
    })
    .finally(() => {
        console.log('Operación completada');
        // Código de limpieza aquí
    });
```

### Encadenamiento de Promises

```javascript
function fetchUserData(userId) {
    return fetchUser(userId)
        .then(user => {
            console.log('Usuario obtenido:', user.name);
            return fetchUserPosts(user.id);
        })
        .then(posts => {
            console.log('Posts obtenidos:', posts.length);
            return fetchUserComments(posts[0].id);
        })
        .then(comments => {
            console.log('Comentarios obtenidos:', comments.length);
            return comments;
        })
        .catch(error => {
            console.error('Error en la cadena:', error);
            throw error; // Re-lanzar para manejo upstream
        });
}
```

## Métodos Estáticos de Promise

### `Promise.all()` - Ejecución Paralela

```javascript
// Esperar a que todas las promises se resuelvan
const promises = [
    fetchUser(1),
    fetchUser(2),
    fetchUser(3)
];

Promise.all(promises)
    .then(users => {
        console.log('Todos los usuarios:', users);
        // Todas las promises resueltas
    })
    .catch(error => {
        console.error('Una o más promises fallaron:', error);
        // Si CUALQUIER promise falla, este catch se ejecuta
    });
```

### `Promise.allSettled()` - Todos los Resultados

```javascript
// Esperar a que todas las promises se establezcan (resuelvan o rechacen)
const promises = [
    fetchUser(1),
    fetchUser(-1), // Esta será rechazada
    fetchUser(3)
];

Promise.allSettled(promises)
    .then(results => {
        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                console.log(`Promise ${index} resuelta:`, result.value);
            } else {
                console.log(`Promise ${index} rechazada:`, result.reason);
            }
        });
    });
```

### `Promise.race()` - Primera en Terminar

```javascript
// Resolver con la primera promise que se establezca
const promises = [
    delay(1000).then(() => 'Primera'),
    delay(2000).then(() => 'Segunda'),
    delay(500).then(() => 'Tercera')
];

Promise.race(promises)
    .then(result => {
        console.log('Ganadora:', result); // "Tercera"
    });
```

### `Promise.any()` - Primera en Resolverse

```javascript
// Resolver con la primera promise que se cumpla
const promises = [
    Promise.reject('Error 1'),
    delay(1000).then(() => 'Éxito 1'),
    delay(500).then(() => 'Éxito 2')
];

Promise.any(promises)
    .then(result => {
        console.log('Primer éxito:', result); // "Éxito 2"
    })
    .catch(error => {
        console.log('Todas las promises rechazadas:', error);
    });
```

## Sintaxis Async/Await

### ¿Qué es Async/Await?

**Async/await** es azúcar sintáctica construida sobre Promises, haciendo que el código asíncrono se vea y comporte más como código síncrono.

### Async/Await Básico

```javascript
// Enfoque basado en Promises
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

// Enfoque Async/await
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

### Declaración de Función Async

```javascript
// Declaración de función async
async function getData() {
    return 'data';
}

// Expresión de función async
const getData = async function() {
    return 'data';
};

// Función flecha async
const getData = async () => {
    return 'data';
};

// Método async en objeto
const obj = {
    async getData() {
        return 'data';
    }
};

// Método async en clase
class DataService {
    async getData() {
        return 'data';
    }
}
```

### Palabra Clave Await

```javascript
async function processData() {
    // await solo puede usarse dentro de funciones async
    const data = await fetchData();
    const processedData = await processDataStep(data);
    const result = await saveData(processedData);

    return result;
}

// Esto causaría un error - await fuera de función async
// const data = await fetchData(); // SyntaxError
```

### Manejo de Errores con Try/Catch

```javascript
async function handleErrors() {
    try {
        const user = await fetchUser(1);
        const posts = await fetchUserPosts(user.id);
        const comments = await fetchUserComments(posts[0].id);

        return { user, posts, comments };
    } catch (error) {
        console.error('Error ocurrido:', error);

        // Manejar tipos específicos de errores
        if (error.message.includes('network')) {
            throw new Error('Error de red ocurrido');
        } else if (error.message.includes('auth')) {
            throw new Error('Autenticación falló');
        } else {
            throw new Error('Error desconocido ocurrido');
        }
    }
}
```

## Ejemplos Prácticos

### 1. Obtención de Datos de API

```javascript
// API Fetch con async/await
async function fetchUserProfile(userId) {
    try {
        const response = await fetch(`/api/users/${userId}`);

        if (!response.ok) {
            throw new Error(`¡Error HTTP! estado: ${response.status}`);
        }

        const user = await response.json();
        return user;
    } catch (error) {
        console.error('Fallo al obtener usuario:', error);
        throw error;
    }
}

// Uso
async function displayUserProfile(userId) {
    try {
        const user = await fetchUserProfile(userId);
        document.getElementById('username').textContent = user.name;
        document.getElementById('email').textContent = user.email;
    } catch (error) {
        document.getElementById('error').textContent = 'Fallo al cargar perfil de usuario';
    }
}
```

### 2. Operaciones Secuenciales vs Paralelas

```javascript
// Operaciones secuenciales (más lento)
async function sequentialOperations() {
    const startTime = Date.now();

    const user = await fetchUser(1);        // Esperar 1 segundo
    const posts = await fetchUserPosts(1);  // Esperar otro 1 segundo
    const comments = await fetchComments(1); // Esperar otro 1 segundo

    const endTime = Date.now();
    console.log(`Secuencial tomó ${endTime - startTime}ms`); // ~3000ms

    return { user, posts, comments };
}

// Operaciones paralelas (más rápido)
async function parallelOperations() {
    const startTime = Date.now();

    const [user, posts, comments] = await Promise.all([
        fetchUser(1),
        fetchUserPosts(1),
        fetchComments(1)
    ]);

    const endTime = Date.now();
    console.log(`Paralelo tomó ${endTime - startTime}ms`); // ~1000ms

    return { user, posts, comments };
}
```

### 3. Manejar Múltiples Operaciones Asíncronas

```javascript
async function loadDashboardData(userId) {
    try {
        // Iniciar todas las operaciones en paralelo
        const userPromise = fetchUser(userId);
        const postsPromise = fetchUserPosts(userId);
        const notificationsPromise = fetchNotifications(userId);
        const settingsPromise = fetchUserSettings(userId);

        // Esperar primero los datos críticos
        const user = await userPromise;

        // Esperar el resto
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
        console.error('Fallo de carga del dashboard:', error);
        throw error;
    }
}
```

### 4. Lógica de Reintentos con Async/Await

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
            console.log(`Intento ${i + 1} falló:`, error.message);

            if (i === maxRetries - 1) {
                throw error; // Último intento falló
            }

            // Esperar antes del reintento
            await delay(1000 * (i + 1)); // Retroceso exponencial
        }
    }
}
```

### 5. Implementación de Timeout

```javascript
function timeout(ms) {
    return new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Operación timeout')), ms);
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
        if (error.message === 'Operación timeout') {
            throw new Error('Solicitud timeout');
        }
        throw error;
    }
}
```

## Patrones Avanzados

### 1. Cola de Promises

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

// Uso
const queue = new PromiseQueue();

queue.add(() => fetchUser(1)).then(user => console.log('User 1:', user));
queue.add(() => fetchUser(2)).then(user => console.log('User 2:', user));
queue.add(() => fetchUser(3)).then(user => console.log('User 3:', user));
```

### 2. Iterador Async

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

// Uso
async function processAllUsers() {
    for await (const users of fetchUsersGenerator()) {
        console.log(`Procesando ${users.length} usuarios`);
        // Procesar usuarios
    }
}
```

### 3. Función Async con Debounce

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

// Uso
const debouncedSearch = debounceAsync(async (query) => {
    const response = await fetch(`/api/search?q=${query}`);
    return await response.json();
}, 300);

// Solo la última búsqueda dentro de 300ms se ejecutará
debouncedSearch('javascript');
debouncedSearch('javascrip');
debouncedSearch('javascript promises'); // Esta se ejecuta
```

### 4. Map Async con Límite de Concurrencia

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

// Uso
const userIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const users = await mapWithConcurrency(userIds, fetchUser, 3);
```

## Mejores Prácticas de Manejo de Errores

### 1. Propagación Apropiada de Errores

```javascript
async function processUserData(userId) {
    try {
        const user = await fetchUser(userId);
        const processedData = await processData(user);
        return processedData;
    } catch (error) {
        // Registrar el error
        console.error('Error en processUserData:', error);

        // Transformar error si es necesario
        if (error.message.includes('not found')) {
            throw new Error(`Usuario ${userId} no encontrado`);
        }

        // Re-lanzar error original
        throw error;
    }
}
```

### 2. Degradación Elegante

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

### 3. Límites de Error con Async/Await

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

// Uso
const errorBoundary = new AsyncErrorBoundary();

errorBoundary.addErrorHandler('NetworkError', async (error) => {
    console.log('Error de red manejado');
    return getCachedData();
});

errorBoundary.addErrorHandler('AuthError', async (error) => {
    console.log('Error de auth manejado');
    await refreshToken();
    return retryOperation();
});
```

## Probar Código Async

### 1. Probar Promises

```javascript
// Ejemplo de Jest
describe('User API', () => {
    test('debería obtener usuario exitosamente', async () => {
        const user = await fetchUser(1);
        expect(user).toHaveProperty('id', 1);
        expect(user).toHaveProperty('name');
    });

    test('debería rechazar con ID inválido', async () => {
        await expect(fetchUser(-1)).rejects.toThrow('ID de usuario inválido');
    });

    test('debería manejar errores de red', async () => {
        // Simular fetch para simular error de red
        global.fetch = jest.fn().mockRejectedValue(new Error('Error de red'));

        await expect(fetchUserProfile(1)).rejects.toThrow('Error de red');
    });
});
```

### 2. Probar con Mocks

```javascript
// Simular funciones async
const mockFetchUser = jest.fn();
mockFetchUser.mockResolvedValue({ id: 1, name: 'John' });

test('debería procesar datos de usuario', async () => {
    const result = await processUserData(1);
    expect(mockFetchUser).toHaveBeenCalledWith(1);
    expect(result).toEqual({ id: 1, name: 'John' });
});
```

### 3. Probar Timeouts

```javascript
test('debería hacer timeout después de 5 segundos', async () => {
    const slowPromise = new Promise(resolve => {
        setTimeout(resolve, 6000);
    });

    await expect(
        Promise.race([
            slowPromise,
            timeout(5000)
        ])
    ).rejects.toThrow('Operación timeout');
});
```

## Consideraciones de Rendimiento

### 1. Evitar Operaciones Bloqueantes

```javascript
// ❌ Malo: Bucle bloqueante
async function processItemsSequentially(items) {
    const results = [];
    for (const item of items) {
        const result = await processItem(item); // Bloquea en cada elemento
        results.push(result);
    }
    return results;
}

// ✅ Bueno: Procesamiento paralelo
async function processItemsInParallel(items) {
    const promises = items.map(item => processItem(item));
    return await Promise.all(promises);
}

// ✅ Bueno: Concurrencia controlada
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

### 2. Gestión de Memoria

```javascript
// ❌ Malo: Fuga de memoria con operaciones de larga duración
async function processLargeDataset(data) {
    const results = [];

    for (const item of data) {
        const result = await processItem(item);
        results.push(result); // Acumula todos los resultados en memoria
    }

    return results;
}

// ✅ Bueno: Procesamiento en stream
async function* processLargeDatasetStream(data) {
    for (const item of data) {
        const result = await processItem(item);
        yield result; // Procesar uno a la vez
    }
}

// Uso
for await (const result of processLargeDatasetStream(data)) {
    console.log(result);
    // Procesar resultado inmediatamente, no almacenar todo
}
```

## Trampas Comunes y Soluciones

### 1. Await Olvidado

```javascript
// ❌ Malo: Await olvidado
async function badExample() {
    const user = fetchUser(1); // Devuelve Promise, no datos de usuario
    console.log(user.name); // Error: No se puede leer la propiedad 'name' de undefined
}

// ✅ Bueno: Uso correcto de await
async function goodExample() {
    const user = await fetchUser(1);
    console.log(user.name);
}
```

### 2. Mezclar Promises y Async/Await

```javascript
// ❌ Malo: Mezclar patrones
async function mixedExample() {
    return fetchUser(1).then(user => {
        return processUser(user);
    });
}

// ✅ Bueno: Async/await consistente
async function consistentExample() {
    const user = await fetchUser(1);
    return await processUser(user);
}
```

### 3. No Manejar Promises Rechazadas

```javascript
// ❌ Malo: Rechazo de Promise no manejado
async function unhandledExample() {
    const promises = [
        fetchUser(1),
        fetchUser(2),
        fetchUser(-1) // Esta será rechazada
    ];

    const results = await Promise.all(promises); // Lanza error
}

// ✅ Bueno: Manejo apropiado de errores
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

## Resumen de Mejores Prácticas

### 1. Usar Async/Await para Legibilidad

```javascript
// ✅ Preferido: Limpio y legible
async function getUserData(userId) {
    try {
        const user = await fetchUser(userId);
        const posts = await fetchUserPosts(userId);
        return { user, posts };
    } catch (error) {
        throw new Error(`Fallo al obtener datos de usuario: ${error.message}`);
    }
}

// ❌ Evitar: Cadenas de Promises cuando async/await es más limpio
function getUserDataPromise(userId) {
    return fetchUser(userId)
        .then(user => {
            return fetchUserPosts(userId)
                .then(posts => ({ user, posts }));
        })
        .catch(error => {
            throw new Error(`Fallo al obtener datos de usuario: ${error.message}`);
        });
}
```

### 2. Manejar Errores Apropiadamente

```javascript
// ✅ Bueno: Manejo integral de errores
async function robustFunction() {
    try {
        const result = await riskyOperation();
        return result;
    } catch (error) {
        // Registrar para depuración
        console.error('Operación falló:', error);

        // Transformar error para usuario
        if (error.code === 'NETWORK_ERROR') {
            throw new Error('Por favor verifica tu conexión a internet');
        }

        // Proporcionar respaldo
        return getDefaultValue();
    }
}
```

### 3. Usar Procesamiento Paralelo Cuando Sea Posible

```javascript
// ✅ Bueno: Operaciones independientes paralelas
async function efficientDataLoading() {
    const [user, settings, notifications] = await Promise.all([
        fetchUser(userId),
        fetchUserSettings(userId),
        fetchNotifications(userId)
    ]);

    return { user, settings, notifications };
}
```

## Conclusión

Las JavaScript Promises y async/await son herramientas poderosas para manejar operaciones asíncronas. Puntos clave:

1. **Usar async/await para código más limpio** - Más legible que cadenas de Promises
2. **Manejar errores correctamente** - Siempre usar try/catch con async/await
3. **Entender métodos Promise** - `Promise.all()`, `Promise.allSettled()`, etc.
4. **Considerar rendimiento** - Usar procesamiento paralelo cuando sea apropiado
5. **Probar código async minuciosamente** - Simular dependencias externas
6. **Evitar trampas comunes** - No olvidar await, manejar rechazos
7. **Usar patrones apropiados** - Elegir la herramienta correcta para el trabajo

Dominar JavaScript asíncrono es esencial para el desarrollo web moderno. Con estos conceptos y patrones, podrás escribir código asíncrono eficiente y mantenible.

## Próximos Pasos

Después de dominar Promises y async/await, explora:

1. **Web APIs** - Fetch API, Web Workers, Service Workers
2. **Programación Reactiva** - RxJS y Observables
3. **Streams de Node.js** - Trabajar con flujos de datos
4. **GraphQL** - Lenguaje de consulta de API moderno
5. **WebSockets** - Comunicación en tiempo real
6. **Optimización de rendimiento** - Debouncing, throttling, caché

¡La programación asíncrona está en el corazón del JavaScript moderno - domina estos conceptos para construir aplicaciones receptivas y eficientes!