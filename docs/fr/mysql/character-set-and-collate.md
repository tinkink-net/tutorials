# Comprendre les jeux de caractères et les règles de tri dans MySQL

Lorsque nous utilisons MySQL, nous rencontrons souvent des problèmes liés aux jeux de caractères et aux règles de tri, comme des textes illisibles lors de requêtes de données, ou des erreurs lors de l'écriture d'emojis. Pour comprendre et résoudre ces problèmes, vous devez comprendre les jeux de caractères et les règles de tri dans MySQL.

## Jeux de caractères

Dans les ordinateurs, les caractères sont stockés sous forme encodée, et chaque caractère possède un encodage. Par exemple, la lettre `A` est encodée comme `65` dans le schéma d'encodage ASCII. Cependant, ASCII ne contient que 128 caractères et comprend uniquement des chiffres, des lettres majuscules et minuscules et des signes de ponctuation anglais courants. Si le chinois est impliqué, vous devez utiliser d'autres jeux de caractères, tels que GK2312, GB18030, UTF8, etc.

Après avoir encodé chaque caractère selon les règles spécifiées, nous obtenons un ensemble de tables d'encodage, que l'on peut appeler "jeu de caractères". Chaque jeu de caractères a ses propres règles d'encodage, et le résultat de l'encodage du même caractère dans différents jeux de caractères est différent. Si différents jeux de caractères sont utilisés lors de l'écriture et de la requête de données, les caractères correspondants ne peuvent pas être correctement analysés, ce qui entraîne des caractères illisibles.

Pour le chinois, les jeux de caractères couramment utilisés sont GB2312, GBK, GB18030, UTF8, etc. En raison des bonnes caractéristiques d'internationalisation d'UTF8, il est recommandé d'utiliser l'encodage UTF8 en l'absence de raison particulière.

## Définir le jeu de caractères pour les champs dans MySQL

Le jeu de caractères de MySQL est finalement appliqué aux champs. Lors de la création d'un champ (création ou modification d'une table), vous pouvez spécifier le jeu de caractères du champ comme suit.

```sql
CREATE TABLE `test` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```

Le champ `name` dans le SQL ci-dessus utilise le jeu de caractères `utf8mb4` et la règle de tri `utf8mb4_general_ci`. Donc le jeu de caractères du champ est `utf8mb4`.

Outre la spécification du jeu de caractères dans le champ, vous pouvez également spécifier le jeu de caractères par défaut pour l'ensemble de la table, comme dans le SQL ci-dessus, qui spécifie également le jeu de caractères par défaut de la table comme `utf8mb4`. Dans ce cas, si aucun jeu de caractères n'est spécifié pour le nouveau champ, le jeu de caractères par défaut de la table est utilisé.

De plus, MySQL peut également spécifier un jeu de caractères par défaut pour la base de données ou même pour l'ensemble du serveur MySQL. Ces jeux de caractères sont également similaires aux jeux de caractères par défaut de la table, et lorsqu'aucun jeu de caractères de champ n'est spécifié, le jeu de caractères par défaut est utilisé. En résumé : Jeu de caractères du champ > Jeu de caractères par défaut de la table > Jeu de caractères par défaut de la base de données > Jeu de caractères par défaut du serveur MySQL.

Théoriquement, lorsque nous définissons le jeu de caractères d'un champ, la base de données peut contenir les caractères sous le jeu de caractères correspondant. Cependant, en pratique, nous rencontrons souvent des situations où le jeu de caractères d'un champ est défini, mais il ne fonctionne toujours pas comme prévu, et cette situation peut impliquer le problème de jeu de caractères de connexion.

## Définir le jeu de caractères de connexion

En plus du jeu de caractères stocké dans les champs de la base de données, il existe d'autres concepts de jeux de caractères qui apparaissent ailleurs lors de l'utilisation de MySQL.

- `character_set_client` L'ensemble de caractères utilisés par le client pour envoyer des instructions SQL
- `character_set_connection` Le jeu de caractères vers lequel MySQL convertira lors de la réception d'une instruction SQL
- `character_set_results` Le jeu de caractères vers lequel MySQL convertira le jeu de résultats

Les paramètres SQL suivants peuvent être utilisés séparément.

```sql
SET character_set_client=utf8mb4;
SET character_set_connection=utf8mb4;
SET character_set_results=utf8mb4;
```

Et il existe un raccourci pour définir ces trois jeux de caractères :

```sql
SET NAMES utf8mb4;
```

Il suffit d'exécuter l'instruction SQL ci-dessus pour définir les trois jeux de caractères mentionnés ci-dessus.

## Définir le jeu de caractères dans le code

Si vous utilisez MySQL dans votre code, vous devez généralement décider du jeu de caractères de la connexion via la configuration de la bibliothèque MySQL. Prenons l'exemple du module `sequelize` de Node.js, vous devez spécifier le jeu de caractères dans `dialectOptions.charset`.

```js
const sequelize = new Sequelize({
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'test',
    dialect: 'mysql',
    dialectOptions: {
        charset: 'utf8mb4'
    }
});
```

## Règles de tri

Vous pouvez voir `COLLATE` à de nombreux endroits, et dans l'exemple ci-dessus, `utf8mb4_general_ci` est la règle de tri.

Comme son nom l'indique, les règles de tri sont utilisées pour déterminer comment les caractères doivent être triés. Par exemple, les mêmes `a` et `b` peuvent être devant `a` sous une règle de tri et derrière `b` sous une autre.

MySQL fournit de nombreuses règles de tri pour le jeu de caractères `utf8mb4`, les plus courantes sont :

- `utf8mb4_general_ci` : règle de tri par défaut de MySQL, la partie Unicode n'est pas strictement triée dans l'ordre Unicode
- `utf8mb4_unicode_ci` : tri par ordre de caractères Unicode
- `utf8mb4_0900_ai_ci` : tri par caractères Unicode 9.0, y compris les caractères en dehors du plan multilingue de base

Actuellement, `utf8mb4_0900_ai_ci` ou `utf8mb4_unicode_ci` sont recommandés.

## utf8 et utf8mb4 dans MySQL

Un caractère UTF8 se compose de 1 à 6 octets, mais le caractère maximum utilisé aujourd'hui ne fait que 4 octets. Le jeu de caractères utf8 dans MySQL ne peut stocker que jusqu'à 3 octets, donc lorsque vous rencontrez un caractère de 4 octets, vous ne pouvez pas le stocker, c'est pourquoi les champs du jeu de caractères utf8 ne peuvent pas stocker d'emojis.

utf8mb4 est une extension d'utf8 qui peut stocker des caractères de 4 octets, il peut donc stocker des emojis.

Le jeu de caractères utf8mb4 doit être utilisé sauf indication contraire, et le jeu de caractères utf8 ne devrait plus être utilisé.

## Résumé

1. Tant que vous définissez le jeu de caractères des champs de la base de données MySQL et que vous vous assurez d'utiliser le même jeu de caractères lors de la connexion, vous pouvez être sûr qu'il n'y a pas de problème de caractères illisibles causé par le jeu de caractères.
2. Le jeu de caractères utf8mb4 est recommandé et le jeu de caractères utf8 n'est plus utilisé.
Il est recommandé d'utiliser les règles de tri utf8mb4_0900_ai_ci ou utf8mb4_unicode_ci.