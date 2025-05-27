# Comprendre le fuseau horaire dans MySQL

## Connaissances de base : Date, Heure, Timestamp et Fuseau horaire

Dans la plupart des scénarios, la date et l'heure font référence à l'heure actuelle dans le fuseau horaire local. Par exemple, lorsque vous voyez `"2024-06-15 12:00:00"`, cela signifie qu'il est 12:00:00 le 15 juin 2024 dans votre fuseau horaire local.

Cependant, lorsque votre application sert des utilisateurs de différents fuseaux horaires, vous devez tenir compte de cette problématique. Par exemple, si un utilisateur à New York crée un enregistrement à `"2024-06-15 12:00:00"`, cela signifie que l'enregistrement est créé à 12:00:00 dans le fuseau horaire de New York. Si un autre utilisateur à Pékin consulte l'enregistrement, l'heure devrait être convertie au fuseau horaire de Pékin.

En résumé, la date et l'heure correspondent à l'heure dans le fuseau horaire local, vous devez ajouter des informations de fuseau horaire à la date et l'heure pour les rendre disponibles dans le monde entier.

D'autre part, le timestamp est le nombre de secondes écoulées depuis le 1er janvier 1970 à 00:00:00 UTC. Le timestamp est indépendant du fuseau horaire, il est toujours le même peu importe où vous vous trouvez.

## Types de données Date et Heure dans MySQL

Dans MySQL, il existe plusieurs types de données pour les dates et heures, mais les plus importants sont `DATETIME` et `TIMESTAMP`.

- `DATETIME` : La date et l'heure, au format `YYYY-MM-DD HH:MM:SS`. Il stocke la date et l'heure, donc le fuseau horaire doit être pris en compte.
- `TIMESTAMP` : Le timestamp, il stocke le nombre de timestamp, qui est indépendant du fuseau horaire. Mais lorsque vous écrivez ou lisez le timestamp, il y aura une conversion de fuseau horaire.

## Fuseau horaire dans MySQL

MySQL possède une variable système `time_zone` pour définir le fuseau horaire. Vous pouvez définir le fuseau horaire des manières suivantes :

1. Définir le fuseau horaire dans le fichier de configuration `my.cnf` :

    ```ini
    [mysqld]
    default-time-zone = '+00:00'
    ```

2. Définir le fuseau horaire dans le client MySQL :

    ```sql
    SET time_zone = '+00:00';
    ```

3. Définir le fuseau horaire dans la chaîne de connexion :

    ```sql
    mysql -u root -p --default-time-zone='+00:00'
    ```

Si vous ne définissez pas le fuseau horaire, MySQL utilisera le fuseau horaire du système par défaut.

## Définir le fuseau horaire dans l'application

Lorsque vous utilisez MySQL dans votre application, vous devriez définir le fuseau horaire dans l'application. Par exemple, dans Node.js, vous pouvez définir le fuseau horaire comme ceci :

```javascript
const mysql = require('mysql2');
const conn = mysql.createConnection({
    host: 'localhost
    user: 'root
    password: 'password',
    database: 'test',
    timezone: '+00:00'
});
```

Veuillez noter que, dans de nombreux cas, définir le fuseau horaire dans votre application est le seul moyen de s'assurer que le fuseau horaire est correct. Car vous n'avez peut-être pas la possibilité de modifier le serveur MySQL, mais vous pouvez toujours modifier le code de l'application.

Si votre application utilise un ORM qui ne prend pas en charge la définition du fuseau horaire, vous avez toujours d'autres options :

1. Effectuer une requête de définition de fuseau horaire avant toute autre requête. (`SET time_zone = '+00:00';`)
2. Utiliser un type de données différent pour stocker la date et l'heure, comme `INT` ou `VARCHAR`, et gérer la conversion de fuseau horaire dans l'application.
3. Convertir toute valeur de date et d'heure au même fuseau horaire que le serveur MySQL avant de l'écrire dans la base de données. Vous devez également effectuer une conversion de fuseau horaire dans l'application lorsque vous lisez la valeur de date et d'heure.

## Conclusion

Dans cet article, nous avons appris les connaissances de base sur la date, l'heure, le timestamp et le fuseau horaire : la date et l'heure doivent avoir des informations de fuseau horaire, le timestamp est indépendant du fuseau horaire. Ensuite, nous avons appris les types de données de date et d'heure dans MySQL : `DATETIME` et `TIMESTAMP`. Enfin, nous avons appris comment définir le fuseau horaire dans MySQL et dans l'application.