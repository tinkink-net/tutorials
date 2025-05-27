# Transfert de Port dans VSCode

VSCode fournit une fonctionnalité de transfert de port qui vous permet d'accéder à l'environnement de développement local ou distant depuis le monde extérieur. Cette fonctionnalité est très utile à des fins de test et de débogage.

## Contexte

Nous développons souvent dans un environnement local ou un environnement de développement distant, qui ne peut pas être accessible publiquement. Mais dans certaines circonstances, nous devons accéder à l'environnement de développement local ou distant depuis le monde extérieur. Par exemple, nous devons nous intégrer à un service tiers, ou nous devons tester le web ou le service depuis un appareil qui n'est pas sur le même réseau.

## Comment l'utiliser

Tout d'abord, démarrez votre environnement de développement local, assurez-vous que le service est en cours d'exécution. Il écoutera sur un port spécifique, par exemple, `localhost:8080`.

Ensuite, dans VSCode, trouvez la fonctionnalité "Ports" dans le panneau inférieur. Vous verrez un bouton "Forward a Port". Cliquez dessus et entrez le numéro de port que vous souhaitez transférer. Par exemple, `8080`.

![Port Forwarding](/attachments/vscode/port-forwarding/01.panel.png)

![Port Forwarding](/attachments/vscode/port-forwarding/02.input.png)

Si c'est la première fois que vous utilisez cette fonctionnalité, vous serez invité à vous connecter à votre compte GitHub et à autoriser l'accès.

![Port Forwarding](/attachments/vscode/port-forwarding/03.sign-in.png)

Si vous utilisez MacOS, vous serez également invité à autoriser l'accès au trousseau pour VSCode. Entrez simplement votre mot de passe et cliquez sur "Allow".

![Port Forwarding](/attachments/vscode/port-forwarding/04.keychain.png)

Attendez ensuite quelques secondes, et vous verrez que le port est transféré avec succès.

![Port Forwarding](/attachments/vscode/port-forwarding/05.success.png)

Vous pouvez maintenant accéder à l'environnement de développement local via l'URL transférée. Par exemple, si vous avez transféré le port `8080`, vous pouvez y accéder via `https://xxx-1234.asse.devtunnels.ms` (l'URL peut être différente).

![Port Forwarding](/attachments/vscode/port-forwarding/06.authorize.png)

Comme vous pouvez le voir, lorsque vous accédez à cette URL transférée, elle doit encore être autorisée. Cliquez simplement sur "Authorize". Cela satisfait nos exigences dans la plupart des cas et garantit la sécurité de notre environnement de développement local.

Mais si vous souhaitez que le monde extérieur accède à votre environnement de développement local sans autorisation, par exemple, un point de terminaison API ou un webhook, vous pouvez trouver l'enregistrement dans le panneau "Ports" de VSCode, faire un clic droit dessus, puis le rendre public.

> Veuillez noter : Exposer votre environnement de développement local au monde extérieur peut entraîner des risques de sécurité. Assurez-vous de comprendre les risques avant de le faire.

Enfin, n'oubliez pas de fermer le transfert de port lorsque vous avez terminé.

## Conclusion

Dans cet article, nous avons présenté la fonctionnalité de transfert de port dans VSCode. Cette fonctionnalité vous permet d'accéder à votre environnement de développement local ou distant depuis le monde extérieur. Elle est très utile à des fins de test et de débogage. Mais soyez prudent lorsque vous exposez votre environnement de développement local au monde extérieur, car cela peut entraîner des risques de sécurité.