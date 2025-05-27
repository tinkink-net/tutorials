# Utiliser la fonctionnalité Timeline/Historique des fichiers locaux de VSCode pour éviter la suppression accidentelle de fichiers

Il n'y a rien de plus effrayant dans le développement de code que de supprimer un fichier par erreur. Parfois, cela peut être une boîte de dialogue, un mauvais bouton ou une erreur git, et le fruit de plusieurs jours de travail acharné disparaît.

Il serait bien d'avoir une fonctionnalité qui pourrait enregistrer chaque version de votre code sauvegardé localement et la récupérer à tout moment, afin que vous n'ayez pas à vous soucier de perdre des fichiers par erreur.

Dans VSCode, cela se faisait auparavant en installant des plugins (comme le plugin Local History), mais après la version 1.44, VSCode dispose d'une fonctionnalité Timeline intégrée. Cet article examinera comment utiliser la fonctionnalité Timeline pour éviter la perte de fichiers par erreur.

## Utilisation

Lorsque vous ouvrez un fichier de code, un panneau "TIMELINE" apparaît sur le côté gauche, sous le panneau des fichiers, c'est la chronologie.

![Panneau TIMELINE](/attachments/vscode/timeline-local-history-usage/01.panel.png)

Après que le fichier a été modifié et sauvegardé, un nouveau nœud apparaît dans la chronologie, qui est la version historique du fichier de code.

![versions-historiques](/attachments/vscode/timeline-local-history-usage/02.timeline-versions.png)

> En plus de "Sauvegarder", les commits Git, les renommages de fichiers et d'autres actions sont également affichés dans le panneau comme une version.

Cliquer sur une version fera apparaître un écran de comparaison avec le fichier actuel, afin que vous puissiez voir ce qui a changé de la version historique à la dernière version.

Un clic droit sur une version révèle une série de menus.

![Historique des versions](/attachments/vscode/timeline-local-history-usage/03.context-menu.png)

Ces menus sont (pour les systèmes Mac, par exemple)

- Compare with File Comparer avec la version actuelle du fichier
- Compare with Previous Comparer avec la version précédente
- Select for Compare sélectionne la version actuelle comme version de comparaison (vous pouvez en sélectionner une autre dans l'arborescence des fichiers ou dans le panneau TIMELINE pour comparer les deux versions)
- Show Contents affiche le contenu de la version sélectionnée
- Restore Contents Restaure le contenu de la version sélectionnée
- Reveal in Finder Affiche la version sélectionnée du fichier dans le gestionnaire de fichiers
- Rename Renommer la version sélectionnée
- Delete Supprimer la version sélectionnée

Cliquez sur le bouton Filtre à droite du panneau TIMELINE pour sélectionner les types d'enregistrements qui seront affichés dans le panneau, qui comprend actuellement les enregistrements de fichiers locaux et les enregistrements de commits Git, qui peuvent être affichés à la demande.

Si vous ne cochez que l'enregistrement des commits Git, vous pourrez voir l'historique des commits Git de vos fichiers, ce qui est très pratique.

## Récupération de fichiers supprimés par erreur

Si un fichier est supprimé par erreur, il ne sera pas affiché, ouvert ou trouvé dans le panneau TIMELINE de VSCode. Mais en fait, bien que le fichier ait été supprimé par erreur, sa version historique est toujours présente localement.

Pour récupérer le fichier supprimé, vous pouvez simplement créer un nouveau fichier avec le même nom dans le même répertoire, puis ouvrir le panneau TIMELINE. Le fichier supprimé apparaîtra dans le panneau TIMELINE, et vous pourrez le restaurer en faisant un clic droit dessus.

C'est tout ! Le fichier supprimé est restauré. Mais si vous ne vous souvenez pas du nom du fichier que vous avez supprimé, il peut être un peu difficile de le retrouver.

Nous pouvons d'abord trouver un fichier, n'importe quelle version de n'importe quel fichier dans le même projet convient. Et ensuite ouvrir le fichier de version sélectionné dans le Gestionnaire de fichiers en faisant un clic droit dessus, afin que nous puissions trouver le dossier où VSCode conserve les versions historiques. Sur un système Mac, par exemple, le chemin est le suivant.

```
/Users/xxx/Library/Application Support/Code/User/History/61e8902
```

Le répertoire `History` est le répertoire où toutes les versions historiques sont stockées, il nous suffit donc de rechercher par mots-clés pour trouver les fichiers correspondants.

Par exemple, si nous recherchons le mot-clé `DbConnection`, la commande de recherche peut être trouvée comme suit

```sh
# Mac / Linux
grep -r DbConnection "/Users/xxx/Library/Application Support/Code/User/History"

# Windows
findstr /s /i DbConnection "C:\Users\xxx\AppData\Roaming\Code\User\History"
```

Une fois que vous avez recherché les résultats, vous pouvez ouvrir les fichiers correspondants, les vérifier un par un et trouver la version dont nous avons besoin.

## Résumé

Timeline est une fonctionnalité simple et pratique, avec elle vous n'avez pas besoin d'autres plug-ins pour sauvegarder tout l'historique des fichiers, vous n'avez donc plus à vous soucier de perdre du code en raison d'une suppression accidentelle de fichiers.