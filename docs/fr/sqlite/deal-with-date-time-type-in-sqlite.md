# Comment stocker et traiter les types de date et d'heure dans SQLite

SQLite est un système de base de données qui stocke les données dans un fichier. C'est un système de base de données petit, rapide et facile à utiliser qui est souvent utilisé dans les applications mobiles et web.

Selon la documentation officielle, SQLite ne prend pas en charge les types de date et d'heure, les types de données suggérés pour la date et l'heure sont :

- `TEXT` : Le type de données texte, qui est une chaîne de caractères. Stocke la date et l'heure sous forme de chaîne au format ISO 8601, comme `YYYY-MM-DD HH:MM:SS`.
- `INTEGER` : Le type de données entier, qui est un nombre entier. Stocke la date et l'heure sous forme de nombre de secondes depuis le 1er janvier 1970, 00:00:00 UTC, également connu sous le nom d'horodatage Unix.
- `REAL` : Le type de données nombre réel, qui est un nombre avec un point décimal. Stocke la date et l'heure sous forme de nombre de jours depuis le 24 novembre 4714 av. J.-C., 12:00:00 UTC, également connu sous le nom de numéro de jour julien.

## Quel type de données devrais-je utiliser ?

En fait, vous pouvez utiliser n'importe quel format que vous souhaitez pour stocker et traiter les types de date et d'heure dans SQLite, car le type de données le plus flexible est `TEXT`, qui est une chaîne de caractères.

Pourquoi SQLite suggère-t-il d'utiliser `TEXT` pour stocker et traiter la date et l'heure au format ISO 8601 plutôt que d'autres formats ? Parce que SQLite dispose de certaines fonctions intégrées liées à la date, par exemple, `timediff` pour calculer la différence de temps entre deux dates, `strftime` pour formater une valeur de date.

Mais si vous utilisez vraiment `TEXT`, vous pourriez rencontrer certains problèmes :

- Le format peut être différent de ce que vous attendez, il existe tellement de formats différents.
- Vous pourriez perdre certaines informations, par exemple, le fuseau horaire.
- Vous pourriez ne pas être en mesure de comparer les types de date et d'heure, par exemple, vous ne pouvez pas comparer les types de date et d'heure en utilisant l'opérateur `>` ou `<`. (Certains formats sont comparables, mais pas tous.)

La méthode recommandée est d'utiliser `INTEGER` pour stocker l'horodatage. Comme il s'agit simplement d'un nombre, le stockage est efficace, et il est facile de comparer les types de date et d'heure.

De plus, vous n'avez pas de "problème de fuseau horaire", car le fuseau horaire de la même heure dans le monde entier est exactement le même. Vous pouvez formater vers n'importe quel fuseau horaire et format selon vos besoins.

## Conclusion

En pratique, lors du traitement des types de date et d'heure dans SQLite, vous devriez utiliser `INTEGER` pour stocker les horodatages.