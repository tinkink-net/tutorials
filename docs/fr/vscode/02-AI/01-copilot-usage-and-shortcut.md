# Comment utiliser Github Copilot et ses raccourcis

## Qu'est-ce que Copilot

Copilot (<https://github.com/features/copilot/>) est une aide à la programmation basée sur l'IA fournie par Github qui propose des suggestions de code basées sur l'apprentissage automatique pendant le processus de codage. Dans de nombreux cas, il suffit de commentaires ou de noms de fonctions, et Copilot peut générer le code complet.

Copilot n'est plus gratuit, le prix est de 10 dollars/mois ou 100 dollars/an. Mais vous pouvez l'essayer gratuitement pendant 2 mois. Visitez la page des paramètres Github (<https://github.com/settings/copilot>) et cliquez sur les boutons pour y accéder. Une fois que vous avez obtenu l'accès, vous pouvez utiliser Copilot sur Github.

![Capture d'écran](/attachments/vscode/copilot-usage-and-shortcut/01.website.png)

## Installation du plugin

Pour utiliser Copilot, vous devez installer un plugin, recherchez `Copilot` dans le menu des plugins de VSCode pour trouver le plugin, le nom est `Github Copilot`, l'adresse correspondante sur le marketplace est <https://marketplace.visualstudio.com/items?itemName=GitHub.copilot>, installez-le.

![Capture d'écran d'installation](/attachments/vscode/copilot-usage-and-shortcut/02.install.png)

Après l'installation, le plugin vous demandera de vous connecter à Github, suivez simplement les instructions pour vous connecter.

Suivez les instructions pour vous connecter.

![capture d'écran de connexion](/attachments/vscode/copilot-usage-and-shortcut/03.login.png)

## Utilisation

En utilisation normale, lorsque Copilot donne une suggestion, le code suggéré apparaît derrière la position du curseur et est affiché en texte gris. Si vous ne souhaitez pas utiliser la suggestion, continuez simplement à saisir votre code, si vous souhaitez utiliser le code suggéré, appuyez simplement sur la touche Tab.

![Capture d'écran d'utilisation](/attachments/vscode/copilot-usage-and-shortcut/04.completion.png)

Dans VSCode, Copilot a une icône dont il faut vérifier que le statut est activé. Lorsqu'elle ressemble aux autres icônes et n'a pas de couleur de fond, cela signifie qu'elle est activée, à ce moment lorsque vous modifiez le fichier de code, Copilot proposera automatiquement des suggestions de code. Lorsqu'elle a une couleur de fond (rouge, jaune foncé, etc.), cela signifie qu'elle est désactivée. Si vous souhaitez changer le statut, cliquez simplement dessus et sélectionnez Globally.

![icône de statut](/attachments/vscode/copilot-usage-and-shortcut/05.icon.png)

## Touches de raccourci

Copilot fournit également quelques touches de raccourci qui peuvent être facilement utilisées.

- Accepter les suggestions : `Tab`
- Rejeter la suggestion : `Esc`
- Ouvrir Copilot : `Ctrl + Enter` (ouvrira un panneau séparé montrant 10 suggestions)
- Suggestion suivante : `Alt/Option + ]`
- Suggestion précédente : `Alt/Option + [`
- Déclencher Copilot en ligne : `Alt/Option + \` (Copilot n'a pas donné de suggestion ou la suggestion a été rejetée et vous souhaitez le déclencher manuellement pour qu'il fournisse une suggestion)

![Capture d'écran des raccourcis](/attachments/vscode/copilot-usage-and-shortcut/06.shortcut.jpg)

## Proxy Http

Certains utilisateurs (par exemple, les utilisateurs en Chine continentale) peuvent rencontrer le problème que Copilot ne fonctionne pas, et la raison est que Copilot ne peut pas accéder à Internet ou à l'API Github. Vous pouvez voir le message d'erreur suivant dans le panneau de sortie : `GitHub Copilot could not connect to server. Extension activation failed: "connect ETIMEDOUT xxx.xxx.xxx.xxx:443"`.

Dans ce cas, vous devez configurer le proxy http.

Tout d'abord, obtenez vos informations de proxy http. Vous pouvez demander l'adresse et le port du proxy à votre administrateur réseau, ou si vous utilisez un logiciel de proxy, vous pouvez trouver l'adresse et le port du proxy dans les paramètres du logiciel de proxy.

Ci-dessous est un exemple d'utilisation du logiciel de proxy `ClashX`, vous pouvez trouver l'adresse et le port du proxy dans l'onglet `Settings`, l'adresse du proxy est `127.0.0.1:1080`.

![Capture d'écran du proxy](/attachments/vscode/copilot-usage-and-shortcut/07.proxy.png)

Ensuite, ouvrez les paramètres de VSCode, recherchez `http.proxy`, et définissez l'adresse et le port du proxy.

![Capture d'écran des paramètres de proxy](/attachments/vscode/copilot-usage-and-shortcut/08.proxy-settings.png)

Après la configuration, redémarrez VSCode, et Copilot devrait fonctionner normalement.