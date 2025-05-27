# Comment utiliser Github Copilot Chat

## Qu'est-ce que Copilot Chat

Copilot (<https://github.com/features/copilot/>) est une aide à la programmation basée sur l'IA fournie par Github qui propose des suggestions de code basées sur l'apprentissage par IA pendant le processus de codage. Dans de nombreux cas, il suffit de commentaires ou de noms de fonctions, et Copilot peut générer le code complet.

Pour plus d'informations, veuillez consulter [Comment utiliser Github Copilot et ses raccourcis](/fr/vscode/copilot-usage-and-shortcut.html).

Copilot Chat est lié à Copilot, il partage l'abonnement avec Copilot, mais ce n'est pas la même chose. Copilot Chat est un chatbot qui peut être utilisé dans VSCode. Il peut être utilisé pour discuter avec Copilot, et Copilot vous donnera des suggestions de code basées sur le contenu de votre conversation. Par exemple, vous pouvez poser des questions techniques à Copilot Chat, ou demander à Copilot Chat de vous aider à écrire du code.

Ce qui distingue Copilot Chat de Copilot, c'est que Copilot Chat est un chatbot, ce qui signifie que vous n'avez pas besoin de l'inviter avec du code, vous pouvez simplement discuter avec lui, et il vous donnera la réponse ou des suggestions de code.

## Installation du plugin

Pour utiliser Copilot Chat, vous devez installer un plugin, recherchez `Copilot Chat` dans le menu des plugins de VSCode pour trouver le plugin, le nom est `Github Copilot Chat`, l'adresse correspondante sur la marketplace des plugins est <https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat>, installez-le.

![Capture d'écran d'installation](/attachments/vscode/copilot-chat-usage/01.png)

## Utilisation

Cliquez sur le menu `Chat` dans la barre latérale gauche de VSCode pour ouvrir la fenêtre de chat, puis vous pouvez discuter avec Copilot Chat.

Vous pouvez poser à Copilot Chat des questions sur la programmation, comme `Quel est l'opérateur en JavaScript pour effectuer un XOR bit à bit ?`, il répondra `En JavaScript, l'opérateur XOR bit à bit est représenté par le symbole caret (^)`, et vous donnera un exemple de code et son explication. C'est très utile lorsque vous voulez rechercher des connaissances en programmation.

![Capture d'écran de la fenêtre de chat](/attachments/vscode/copilot-chat-usage/02.png)

### Écrire du code

En plus des connaissances en programmation, vous pouvez également demander à Copilot Chat de vous aider à écrire du code, comme `Écrivez une fonction pour calculer la somme de deux nombres en JavaScript`, il vous donnera un exemple de code de la fonction que vous souhaitez écrire :

```
Sure, here is a simple JavaScript function that calculates the sum of two numbers:

function sum(a, b) {
    return a + b;
}

You can use this function by calling it with two numbers as arguments, like so: sum(5, 3). This would return 8.
```

Lorsque votre souris survole l'exemple de code, vous pouvez voir plusieurs boutons d'action, vous pouvez copier le code, ou insérer le code à la position actuelle du curseur dans l'éditeur, vous pouvez également enregistrer le code dans un nouveau fichier ou exécuter le code dans le terminal (s'il s'agit d'une commande shell exécutable).

![Capture d'écran d'exemple de code](/attachments/vscode/copilot-chat-usage/03.png)

Le bouton le plus utile est le bouton `Insert`, vous pouvez insérer le code nouvellement créé dans un fichier existant, ou vous pouvez utiliser ce bouton pour remplacer un morceau de code sélectionné, nous en parlerons en détail plus tard.

Si vous n'êtes pas satisfait de l'exemple de code, vous pouvez parler à nouveau à Copilot Chat, comme `Veuillez vérifier le type de données d'entrée, si l'un d'eux n'est pas un nombre, retournez 0`, Copilot Chat vous donnera un nouvel exemple de code :

```
Sure, here is a revised version of the function that checks the input data types:

function sum(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        return 0;
    }
    return a + b;
}

In this version, the function checks if either a or b is not a number. If either is not a number, the function returns 0. Otherwise, it returns the sum of a and b.
```

Comme vous pouvez le voir, vous pouvez demander à Copilot Chat d'améliorer le code encore et encore, jusqu'à ce que vous soyez satisfait du code. Le plus important est : Il ne se plaindra jamais de vous, quel gentil garçon !

### Modifier du code

Si vous avez un morceau de code que vous souhaitez modifier, vous pouvez sélectionner le code puis cliquer sur le menu `Chat` dans la barre latérale gauche de VSCode pour ouvrir la fenêtre de chat, puis vous pouvez discuter avec Copilot Chat. Le code sélectionné sera envoyé à Copilot Chat comme contexte, et Copilot Chat vous donnera des suggestions de code basées sur le contexte et ce que vous dites.

Par exemple, nous avons un morceau de code avec un bug :

```javascript
function sumArr(arr) {
    let sum = 0;
    for (let i in arr) {
        sum += i;
    }
    return sum;
}
```

Cette fonction prend un tableau de nombres en entrée et renvoie la somme des nombres du tableau. Mais il y a un bug dans le code, il lit la clé du tableau au lieu de la valeur, donc il renvoie la somme des index du tableau au lieu de la somme des valeurs du tableau.

Nous voulons corriger le bug, alors nous sélectionnons le code et ouvrons la fenêtre de chat, puis nous disons `Veuillez corriger le bug`, Copilot Chat nous donnera un exemple de code qui corrige le bug :

```
function sumArr(arr) {
    let sum = 0;
    for (let i of arr) {
        sum += i;
    }
    return sum;
}

In the original code, the for...in loop was used, which iterates over the enumerable properties of an object, in this case, the indices of the array. To fix the bug, the for...of loop should be used instead, which iterates over the values of an iterable object, in this case, the elements of the array.
```

Comme vous pouvez le voir, Copilot Chat a corrigé le bug pour nous, et il nous donne également une explication du code.

De plus, vous pouvez faire la même chose d'une manière plus simple, vous pouvez sélectionner le code puis saisir `/fix` ou cliquer sur `/fix the problems in my code`, Copilot Chat corrigera le code comme nous l'avons fait précédemment.

### Convertir du code

Parfois, vous pourriez avoir besoin de convertir une liste de valeurs en tableau, ou en map ou autre chose, par exemple, nous copions une map de paires clé-valeur à partir d'un tableau excel :

```
name    age
John    20
Mary    21
Rose    22
Robert  18
Jane    19
```

Vous pouvez sélectionner le texte puis ouvrir la fenêtre de chat, puis vous pouvez dire `Convertir le texte en tableau (JSON), l'élément du tableau est un autre tableau contenant le nom et l'âge, par exemple : [['John', 20]], donnez juste le résultat, pas besoin de donner le code, pas d'explication`, Copilot Chat vous donnera un exemple de code qui convertit le texte en tableau :

```
Here is the converted text to an array:

[
    ["John", 20],
    ["Mary", 21],
    ["Rose", 22],
    ["Robert", 18],
    ["Jane", 19]
]
```

Notez que vous devriez décrire vos demandes de manière aussi détaillée que possible, afin que Copilot Chat puisse comprendre votre demande et vous donner le résultat correct. Par exemple, si vous ne précisez pas le format de sortie, Copilot Chat vous donnera l'exemple de code qui convertit le texte en tableau, ce qui n'est pas ce que vous voulez.

Bien sûr, vous pouvez demander à Copilot Chat de convertir le texte en d'autres structures de données, comme une map, ou une liste d'objets, etc.

## Conclusion

Nous pouvons utiliser Copilot Chat pour faire beaucoup de choses, comme :

- convertir du texte en structure de données
- ajouter des types pour le code
- convertir un morceau de code dans un autre langage de programmation
- traduire votre fichier i18n dans une autre langue
- ajouter la gestion des erreurs pour le code
- corriger de petits bugs
- refactoriser le code pour le rendre plus lisible
- ...

La seule limite est votre imagination et votre patience. Parfois, Copilot Chat peut ne pas comprendre votre demande, ou il peut vous donner un résultat erroné, mais vous pouvez continuer à améliorer votre demande jusqu'à obtenir le résultat correct. Après un peu de pratique, vous constaterez que Copilot Chat est un outil très utile.