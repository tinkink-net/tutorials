# JavaScript Promises et Async/Await - Guide Complet

La programmation asynchrone est fondamentale pour le développement JavaScript moderne. Ce tutoriel complet couvre les Promises, async/await et les patterns asynchrones avancés qui feront de vous un développeur JavaScript plus efficace.

## Comprendre le JavaScript Asynchrone

### Qu'est-ce que la programmation asynchrone ?

La **programmation asynchrone** permet au code de s'exécuter sans bloquer le thread principal, permettant à JavaScript de gérer plusieurs opérations simultanément. Ceci est crucial pour :

- **Les requêtes réseau** (appels d'API)
- **Les opérations de fichiers** (lecture/écriture de fichiers)
- **Les requêtes de base de données** (connexion aux bases de données)
- **Les opérations de minuteurs** (setTimeout, setInterval)
- **Les interactions utilisateur** (gestion d'événements)

### La Boucle d'Événements

JavaScript s'exécute sur un seul thread mais utilise une boucle d'événements pour gérer les opérations asynchrones :

```javascript
// Code synchrone - bloque l'exécution
console.log('Start');
console.log('Middle');
console.log('End');

// Code asynchrone - non bloquant
console.log('Start');
setTimeout(() => {
    console.log('Async operation');
}, 0);
console.log('End');

// Sortie :
// Start
// End
// Async operation
```

### Pattern de Callback (Legacy)

Avant les Promises, JavaScript utilisait des callbacks pour les opérations asynchrones :

```javascript
// Exemple de callback
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

#### Problème du Callback Hell

```javascript
// Callbacks imbriqués - difficiles à lire et maintenir
getData(function(a) {
    getMoreData(a, function(b) {
        getMoreData(b, function(c) {
            getMoreData(c, function(d) {
                // Ceci est le callback hell !
                console.log('Final result:', d);
            });
        });
    });
});
```

## Comprendre les Promises

### Qu'est-ce qu'une Promise ?

Une **Promise** est un objet représentant la complétion ou l'échec éventuel d'une opération asynchrone. Elle a trois états :

1. **Pending** - État initial, ni accomplie ni rejetée
2. **Fulfilled** - Opération complétée avec succès
3. **Rejected** - Opération échouée

### Créer des Promises

#### Syntaxe de base des Promises

```javascript
// Créer une Promise
const myPromise = new Promise((resolve, reject) => {
    // Opération asynchrone
    const success = true;

    if (success) {
        resolve('Opération réussie !');
    } else {
        reject('Opération échouée !');
    }
});

// Utiliser la Promise
myPromise
    .then(result => {
        console.log('Succès :', result);
    })
    .catch(error => {
        console.log('Erreur :', error);
    });
```

#### Promise avec Timeout

```javascript
function delay(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

delay(2000).then(() => {
    console.log('2 secondes se sont écoulées');
});
```

#### Promise avec Données

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
                reject(new Error('ID utilisateur invalide'));
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

### Méthodes des Promises

#### Méthode `.then()`

```javascript
fetchUser(1)
    .then(user => {
        console.log('Utilisateur obtenu :', user.name);
        return user.id; // Passer les données au prochain .then()
    })
    .then(userId => {
        console.log('ID utilisateur :', userId);
        return fetchUserPosts(userId);
    })
    .then(posts => {
        console.log('Posts utilisateur :', posts);
    });
```

#### Méthode `.catch()`

```javascript
fetchUser(-1)
    .then(user => {
        console.log('User:', user);
    })
    .catch(error => {
        console.error('Erreur attrapée :', error.message);
    });
```

#### Méthode `.finally()`

```javascript
fetchUser(1)
    .then(user => {
        console.log('Succès :', user);
    })
    .catch(error => {
        console.error('Erreur :', error);
    })
    .finally(() => {
        console.log('Opération complétée');
        // Code de nettoyage ici
    });
```

### Chaînage de Promises

```javascript
function fetchUserData(userId) {
    return fetchUser(userId)
        .then(user => {
            console.log('Utilisateur récupéré :', user.name);
            return fetchUserPosts(user.id);
        })
        .then(posts => {
            console.log('Posts récupérés :', posts.length);
            return fetchUserComments(posts[0].id);
        })
        .then(comments => {
            console.log('Commentaires récupérés :', comments.length);
            return comments;
        })
        .catch(error => {
            console.error('Erreur dans la chaîne :', error);
            throw error; // Relancer pour gestion en amont
        });
}
```

## Méthodes Statiques des Promises

### `Promise.all()` - Exécution Parallèle

```javascript
// Attendre que toutes les promises se résolvent
const promises = [
    fetchUser(1),
    fetchUser(2),
    fetchUser(3)
];

Promise.all(promises)
    .then(users => {
        console.log('Tous les utilisateurs :', users);
        // Toutes les promises résolues
    })
    .catch(error => {
        console.error('Une ou plusieurs promises ont échoué :', error);
        // Si N'IMPORTE QUELLE promise échoue, ce catch s'exécute
    });
```

### `Promise.allSettled()` - Tous les Résultats

```javascript
// Attendre que toutes les promises se règlent (résolues ou rejetées)
const promises = [
    fetchUser(1),
    fetchUser(-1), // Celle-ci sera rejetée
    fetchUser(3)
];

Promise.allSettled(promises)
    .then(results => {
        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                console.log(`Promise ${index} résolue :`, result.value);
            } else {
                console.log(`Promise ${index} rejetée :`, result.reason);
            }
        });
    });
```

### `Promise.race()` - Premier à Finir

```javascript
// Se résoudre avec la première promise qui se règle
const promises = [
    delay(1000).then(() => 'Premier'),
    delay(2000).then(() => 'Deuxième'),
    delay(500).then(() => 'Troisième')
];

Promise.race(promises)
    .then(result => {
        console.log('Gagnant :', result); // "Troisième"
    });
```

### `Promise.any()` - Premier à se Résoudre

```javascript
// Se résoudre avec la première promise qui s'accomplit
const promises = [
    Promise.reject('Erreur 1'),
    delay(1000).then(() => 'Succès 1'),
    delay(500).then(() => 'Succès 2')
];

Promise.any(promises)
    .then(result => {
        console.log('Premier succès :', result); // "Succès 2"
    })
    .catch(error => {
        console.log('Toutes les promises rejetées :', error);
    });
```

## Syntaxe Async/Await

### Qu'est-ce qu'Async/Await ?

**Async/await** est du sucre syntaxique construit sur les Promises, faisant ressembler et se comporter le code asynchrone comme du code synchrone.

### Async/Await de Base

```javascript
// Approche basée sur les Promises
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

// Approche Async/await
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

### Déclaration de Fonction Async

```javascript
// Déclaration de fonction async
async function getData() {
    return 'data';
}

// Expression de fonction async
const getData = async function() {
    return 'data';
};

// Fonction fléchée async
const getData = async () => {
    return 'data';
};

// Méthode async dans un objet
const obj = {
    async getData() {
        return 'data';
    }
};

// Méthode async dans une classe
class DataService {
    async getData() {
        return 'data';
    }
}
```

### Mot-clé Await

```javascript
async function processData() {
    // await ne peut être utilisé qu'à l'intérieur de fonctions async
    const data = await fetchData();
    const processedData = await processDataStep(data);
    const result = await saveData(processedData);

    return result;
}

// Ceci causerait une erreur - await en dehors d'une fonction async
// const data = await fetchData(); // SyntaxError
```

### Gestion d'Erreurs avec Try/Catch

```javascript
async function handleErrors() {
    try {
        const user = await fetchUser(1);
        const posts = await fetchUserPosts(user.id);
        const comments = await fetchUserComments(posts[0].id);

        return { user, posts, comments };
    } catch (error) {
        console.error('Erreur survenue :', error);

        // Gérer des types d'erreurs spécifiques
        if (error.message.includes('network')) {
            throw new Error('Erreur réseau survenue');
        } else if (error.message.includes('auth')) {
            throw new Error('Authentification échouée');
        } else {
            throw new Error('Erreur inconnue survenue');
        }
    }
}
```

## Exemples Pratiques

### 1. Récupération de Données API

```javascript
// API Fetch avec async/await
async function fetchUserProfile(userId) {
    try {
        const response = await fetch(`/api/users/${userId}`);

        if (!response.ok) {
            throw new Error(`Erreur HTTP ! statut : ${response.status}`);
        }

        const user = await response.json();
        return user;
    } catch (error) {
        console.error('Échec de récupération utilisateur :', error);
        throw error;
    }
}

// Utilisation
async function displayUserProfile(userId) {
    try {
        const user = await fetchUserProfile(userId);
        document.getElementById('username').textContent = user.name;
        document.getElementById('email').textContent = user.email;
    } catch (error) {
        document.getElementById('error').textContent = 'Échec de chargement du profil utilisateur';
    }
}
```

### 2. Opérations Séquentielles vs Parallèles

```javascript
// Opérations séquentielles (plus lent)
async function sequentialOperations() {
    const startTime = Date.now();

    const user = await fetchUser(1);        // Attendre 1 seconde
    const posts = await fetchUserPosts(1);  // Attendre encore 1 seconde
    const comments = await fetchComments(1); // Attendre encore 1 seconde

    const endTime = Date.now();
    console.log(`Séquentiel a pris ${endTime - startTime}ms`); // ~3000ms

    return { user, posts, comments };
}

// Opérations parallèles (plus rapide)
async function parallelOperations() {
    const startTime = Date.now();

    const [user, posts, comments] = await Promise.all([
        fetchUser(1),
        fetchUserPosts(1),
        fetchComments(1)
    ]);

    const endTime = Date.now();
    console.log(`Parallèle a pris ${endTime - startTime}ms`); // ~1000ms

    return { user, posts, comments };
}
```

### 3. Gérer Plusieurs Opérations Asynchrones

```javascript
async function loadDashboardData(userId) {
    try {
        // Démarrer toutes les opérations en parallèle
        const userPromise = fetchUser(userId);
        const postsPromise = fetchUserPosts(userId);
        const notificationsPromise = fetchNotifications(userId);
        const settingsPromise = fetchUserSettings(userId);

        // Attendre d'abord les données critiques
        const user = await userPromise;

        // Attendre le reste
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
        console.error('Échec de chargement du tableau de bord :', error);
        throw error;
    }
}
```

### 4. Logique de Retry avec Async/Await

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
            console.log(`Tentative ${i + 1} échouée :`, error.message);

            if (i === maxRetries - 1) {
                throw error; // Dernière tentative échouée
            }

            // Attendre avant retry
            await delay(1000 * (i + 1)); // Backoff exponentiel
        }
    }
}
```

### 5. Implémentation de Timeout

```javascript
function timeout(ms) {
    return new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Opération timeout')), ms);
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
        if (error.message === 'Opération timeout') {
            throw new Error('Requête timeout');
        }
        throw error;
    }
}
```

## Patterns Avancés

### 1. File de Promises

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

// Utilisation
const queue = new PromiseQueue();

queue.add(() => fetchUser(1)).then(user => console.log('User 1:', user));
queue.add(() => fetchUser(2)).then(user => console.log('User 2:', user));
queue.add(() => fetchUser(3)).then(user => console.log('User 3:', user));
```

### 2. Itérateur Async

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

// Utilisation
async function processAllUsers() {
    for await (const users of fetchUsersGenerator()) {
        console.log(`Traitement de ${users.length} utilisateurs`);
        // Traiter les utilisateurs
    }
}
```

### 3. Fonction Async Debouncée

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

// Utilisation
const debouncedSearch = debounceAsync(async (query) => {
    const response = await fetch(`/api/search?q=${query}`);
    return await response.json();
}, 300);

// Seule la dernière recherche dans les 300ms s'exécutera
debouncedSearch('javascript');
debouncedSearch('javascrip');
debouncedSearch('javascript promises'); // Celle-ci s'exécute
```

### 4. Map Async avec Limite de Concurrence

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

// Utilisation
const userIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const users = await mapWithConcurrency(userIds, fetchUser, 3);
```

## Meilleures Pratiques de Gestion d'Erreurs

### 1. Propagation d'Erreurs Appropriée

```javascript
async function processUserData(userId) {
    try {
        const user = await fetchUser(userId);
        const processedData = await processData(user);
        return processedData;
    } catch (error) {
        // Logger l'erreur
        console.error('Erreur dans processUserData :', error);

        // Transformer l'erreur si nécessaire
        if (error.message.includes('not found')) {
            throw new Error(`Utilisateur ${userId} non trouvé`);
        }

        // Relancer l'erreur originale
        throw error;
    }
}
```

### 2. Dégradation Gracieuse

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

### 3. Boundaries d'Erreurs avec Async/Await

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

// Utilisation
const errorBoundary = new AsyncErrorBoundary();

errorBoundary.addErrorHandler('NetworkError', async (error) => {
    console.log('Erreur réseau gérée');
    return getCachedData();
});

errorBoundary.addErrorHandler('AuthError', async (error) => {
    console.log('Erreur auth gérée');
    await refreshToken();
    return retryOperation();
});
```

## Tester le Code Async

### 1. Tester les Promises

```javascript
// Exemple Jest
describe('User API', () => {
    test('devrait récupérer utilisateur avec succès', async () => {
        const user = await fetchUser(1);
        expect(user).toHaveProperty('id', 1);
        expect(user).toHaveProperty('name');
    });

    test('devrait rejeter avec ID invalide', async () => {
        await expect(fetchUser(-1)).rejects.toThrow('ID utilisateur invalide');
    });

    test('devrait gérer les erreurs réseau', async () => {
        // Mocker fetch pour simuler une erreur réseau
        global.fetch = jest.fn().mockRejectedValue(new Error('Erreur réseau'));

        await expect(fetchUserProfile(1)).rejects.toThrow('Erreur réseau');
    });
});
```

### 2. Tester avec des Mocks

```javascript
// Mocker les fonctions async
const mockFetchUser = jest.fn();
mockFetchUser.mockResolvedValue({ id: 1, name: 'John' });

test('devrait traiter les données utilisateur', async () => {
    const result = await processUserData(1);
    expect(mockFetchUser).toHaveBeenCalledWith(1);
    expect(result).toEqual({ id: 1, name: 'John' });
});
```

### 3. Tester les Timeouts

```javascript
test('devrait timeout après 5 secondes', async () => {
    const slowPromise = new Promise(resolve => {
        setTimeout(resolve, 6000);
    });

    await expect(
        Promise.race([
            slowPromise,
            timeout(5000)
        ])
    ).rejects.toThrow('Opération timeout');
});
```

## Considérations de Performance

### 1. Éviter les Opérations Bloquantes

```javascript
// ❌ Mauvais : Boucle bloquante
async function processItemsSequentially(items) {
    const results = [];
    for (const item of items) {
        const result = await processItem(item); // Bloque sur chaque item
        results.push(result);
    }
    return results;
}

// ✅ Bon : Traitement parallèle
async function processItemsInParallel(items) {
    const promises = items.map(item => processItem(item));
    return await Promise.all(promises);
}

// ✅ Bon : Concurrence contrôlée
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

### 2. Gestion Mémoire

```javascript
// ❌ Mauvais : Fuite mémoire avec opérations longues
async function processLargeDataset(data) {
    const results = [];

    for (const item of data) {
        const result = await processItem(item);
        results.push(result); // Accumule tous les résultats en mémoire
    }

    return results;
}

// ✅ Bon : Traitement en flux
async function* processLargeDatasetStream(data) {
    for (const item of data) {
        const result = await processItem(item);
        yield result; // Traiter un à la fois
    }
}

// Utilisation
for await (const result of processLargeDatasetStream(data)) {
    console.log(result);
    // Traiter le résultat immédiatement, ne pas tout stocker
}
```

## Pièges Courants et Solutions

### 1. Await Oublié

```javascript
// ❌ Mauvais : Await oublié
async function badExample() {
    const user = fetchUser(1); // Retourne une Promise, pas des données utilisateur
    console.log(user.name); // Erreur : Ne peut pas lire la propriété 'name' de undefined
}

// ✅ Bon : Utilisation correcte d'await
async function goodExample() {
    const user = await fetchUser(1);
    console.log(user.name);
}
```

### 2. Mélanger Promises et Async/Await

```javascript
// ❌ Mauvais : Mélanger les patterns
async function mixedExample() {
    return fetchUser(1).then(user => {
        return processUser(user);
    });
}

// ✅ Bon : Async/await cohérent
async function consistentExample() {
    const user = await fetchUser(1);
    return await processUser(user);
}
```

### 3. Promises Rejetées Non Gérées

```javascript
// ❌ Mauvais : Rejet de Promise non géré
async function unhandledExample() {
    const promises = [
        fetchUser(1),
        fetchUser(2),
        fetchUser(-1) // Celle-ci sera rejetée
    ];

    const results = await Promise.all(promises); // Lance une erreur
}

// ✅ Bon : Gestion d'erreurs appropriée
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

## Résumé des Meilleures Pratiques

### 1. Utiliser Async/Await pour la Lisibilité

```javascript
// ✅ Préféré : Propre et lisible
async function getUserData(userId) {
    try {
        const user = await fetchUser(userId);
        const posts = await fetchUserPosts(userId);
        return { user, posts };
    } catch (error) {
        throw new Error(`Échec d'obtention des données utilisateur : ${error.message}`);
    }
}

// ❌ Éviter : Chaînes de Promises quand async/await est plus propre
function getUserDataPromise(userId) {
    return fetchUser(userId)
        .then(user => {
            return fetchUserPosts(userId)
                .then(posts => ({ user, posts }));
        })
        .catch(error => {
            throw new Error(`Échec d'obtention des données utilisateur : ${error.message}`);
        });
}
```

### 2. Gérer les Erreurs Appropriément

```javascript
// ✅ Bon : Gestion d'erreurs complète
async function robustFunction() {
    try {
        const result = await riskyOperation();
        return result;
    } catch (error) {
        // Logger pour débogage
        console.error('Opération échouée :', error);

        // Transformer l'erreur pour l'utilisateur
        if (error.code === 'NETWORK_ERROR') {
            throw new Error('Veuillez vérifier votre connexion internet');
        }

        // Fournir un fallback
        return getDefaultValue();
    }
}
```

### 3. Utiliser le Traitement Parallèle Quand Possible

```javascript
// ✅ Bon : Opérations indépendantes parallèles
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

Les JavaScript Promises et async/await sont des outils puissants pour gérer les opérations asynchrones. Points clés :

1. **Utiliser async/await pour un code plus propre** - Plus lisible que les chaînes de Promises
2. **Gérer les erreurs correctement** - Toujours utiliser try/catch avec async/await
3. **Comprendre les méthodes Promise** - `Promise.all()`, `Promise.allSettled()`, etc.
4. **Considérer la performance** - Utiliser le traitement parallèle quand approprié
5. **Tester le code async minutieusement** - Mocker les dépendances externes
6. **Éviter les pièges courants** - Ne pas oublier await, gérer les rejets
7. **Utiliser les patterns appropriés** - Choisir le bon outil pour le travail

Maîtriser le JavaScript asynchrone est essentiel pour le développement web moderne. Avec ces concepts et patterns, vous pourrez écrire du code asynchrone efficace et maintenable.

## Prochaines Étapes

Après avoir maîtrisé Promises et async/await, explorez :

1. **Web APIs** - Fetch API, Web Workers, Service Workers
2. **Programmation Réactive** - RxJS et Observables
3. **Flux Node.js** - Travailler avec des flux de données
4. **GraphQL** - Langage de requête API moderne
5. **WebSockets** - Communication temps réel
6. **Optimisation de performance** - Debouncing, throttling, mise en cache

La programmation asynchrone est au cœur du JavaScript moderne - maîtrisez ces concepts pour construire des applications réactives et efficaces !