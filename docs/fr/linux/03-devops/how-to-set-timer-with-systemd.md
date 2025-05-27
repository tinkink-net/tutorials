# Comment configurer un minuteur avec systemd sous Linux

<Validator lang="fr" :platformList="['Ubuntu 22.10', 'Debian 11', 'CentOS Stream 9']" date="2023-03-29" />

## Contexte

Le minuteur est largement utilisé sous Linux. Il sert à planifier des tâches pour qu'elles s'exécutent à un moment précis ou à intervalles réguliers. Par exemple, vous pouvez utiliser un minuteur pour planifier l'exécution d'un script de sauvegarde à une heure précise chaque jour, semaine ou mois.

Quelques utilisations :

- Planification de sauvegardes automatisées : Par exemple, vous pouvez configurer un minuteur pour exécuter une sauvegarde de base de données à une heure précise chaque jour.
- Surveillance des performances du système : Planification de vérifications périodiques de l'utilisation du CPU, de la mémoire, de l'espace disque et d'autres métriques système. Cela aide les administrateurs à identifier et résoudre les problèmes de performance avant qu'ils ne deviennent critiques.
- Exécution de scripts à intervalles réguliers : Les minuteurs Linux peuvent être utilisés pour exécuter des scripts à intervalles réguliers. C'est utile pour des tâches comme le nettoyage de fichiers temporaires ou l'exécution de scripts de maintenance système.

Les anciennes versions de Linux utilisent le démon cron pour planifier des tâches. Cependant, le démon cron n'est plus recommandé pour les nouvelles installations. À la place, vous devriez utiliser le minuteur systemd.

## Lister les minuteurs existants

Pour lister tous les minuteurs existants, utilisez la commande suivante :

```sh
systemctl list-timers
```

Vous verrez une liste de minuteurs, comprenant le nom du minuteur, la prochaine fois qu'il se déclenchera, et la dernière fois qu'il s'est déclenché.

```
NEXT                        LEFT          LAST PASSED UNIT                         ACTIVATES
Wed 2023-03-29 10:06:35 CST 4min 49s left n/a  n/a    ua-timer.timer               ua-timer.service
Wed 2023-03-29 10:14:03 CST 12min left    n/a  n/a    systemd-tmpfiles-clean.timer systemd-tmpfiles-clean.service
Wed 2023-03-29 17:35:56 CST 7h left       n/a  n/a    motd-news.timer              motd-news.service
Thu 2023-03-30 00:00:00 CST 13h left      n/a  n/a    dpkg-db-backup.timer         dpkg-db-backup.service
Thu 2023-03-30 00:00:00 CST 13h left      n/a  n/a    logrotate.timer              logrotate.service
Thu 2023-03-30 03:27:59 CST 17h left      n/a  n/a    apt-daily.timer              apt-daily.service
Thu 2023-03-30 06:58:06 CST 20h left      n/a  n/a    apt-daily-upgrade.timer      apt-daily-upgrade.service
Sun 2023-04-02 03:10:16 CST 3 days left   n/a  n/a    e2scrub_all.timer            e2scrub_all.service
```

## Configurer un minuteur avec systemd sous Linux

> Pour configurer un minuteur, vous devez utiliser l'utilisateur root ou un utilisateur avec des privilèges sudo.

Pour configurer un minuteur avec systemd sous Linux et enregistrer la sortie dans un fichier, suivez ces étapes :

D'abord, créez un nouveau fichier d'unité de minuteur dans le répertoire `/etc/systemd/system`. Vous pouvez le nommer comme vous voulez, mais il doit avoir une extension `.timer`. Par exemple, créez un fichier nommé `helloworld.timer`.

Dans le fichier d'unité de minuteur, ajoutez les lignes suivantes :

```
[Unit]
Description=Hello World Timer

[Timer]
OnCalendar=*:0/10
Unit=helloworld.service

[Install]
WantedBy=timers.target
```

Le fichier `.timer` est un fichier d'unité systemd qui définit un minuteur. Il contient une section `[Unit]`, qui fournit une description du minuteur, une section `[Timer]`, qui définit quand le minuteur doit se déclencher et quel service exécuter, et une section `[Install]`, qui spécifie où le minuteur doit être installé.

Cela indique au système d'exécuter l'unité `helloworld.service` toutes les 10 minutes, et configure le minuteur pour qu'il se déclenche toutes les 10 minutes de n'importe quelle heure (`*`) en utilisant `OnCalendar`.

> Remarque : `OnCalendar` utilise une syntaxe flexible pour définir quand le minuteur doit se déclencher. Dans cet exemple, `*:0/10` signifie "toutes les 10 minutes". Vous pouvez utiliser d'autres valeurs pour spécifier différents intervalles.
>
> Pour plus d'informations, consultez l'Annexe.

Ensuite, créez un nouveau fichier d'unité de service dans le même répertoire. Encore une fois, vous pouvez le nommer comme vous voulez, mais il doit avoir une extension `.service`. Par exemple, créez un fichier nommé `helloworld.service`.

Dans le fichier d'unité de service, ajoutez les lignes suivantes :

```
[Unit]
Description=Hello World Service

[Service]
Type=oneshot
ExecStart=/bin/echo "Hello World"

[Install]
WantedBy=multi-user.target
```

Le fichier `.service` est un fichier d'unité systemd qui définit un service. Les sections `[Unit]` et `[Install]` sont similaires au fichier `.timer`. La section `[Service]` définit comment le service doit être exécuté.

Cela indique au système d'exécuter la commande `/bin/echo "Hello World"` lorsque le minuteur se déclenche.

Rechargez le démon systemd pour charger les nouveaux fichiers d'unité :

```sh
sudo systemctl daemon-reload
```

Activez et démarrez le minuteur :

```sh
sudo systemctl enable helloworld.timer
sudo systemctl start helloworld.timer
```

Maintenant, le système affichera "Hello World" toutes les 10 minutes et enregistrera la sortie dans un fichier. Nous pouvons vérifier à nouveau la liste des minuteurs pour voir que le minuteur est en cours d'exécution :

```sh
systemctl list-timers
```

```
NEXT                        LEFT          LAST                        PASSED       UNIT                         ACTIVATES
Wed 2023-03-29 10:10:00 CST 1min 46s left n/a                         n/a          helloworld.timer             helloworld.service
Wed 2023-03-29 10:14:03 CST 5min left     n/a                         n/a          systemd-tmpfiles-clean.timer systemd-tmpfiles-clean.service
Wed 2023-03-29 16:14:38 CST 6h left       Wed 2023-03-29 10:06:43 CST 1min 29s ago ua-timer.timer               ua-timer.service
Wed 2023-03-29 17:18:24 CST 7h left       n/a                         n/a          motd-news.timer              motd-news.service
Thu 2023-03-30 00:00:00 CST 13h left      n/a                         n/a          dpkg-db-backup.timer         dpkg-db-backup.service
Thu 2023-03-30 00:00:00 CST 13h left      n/a                         n/a          logrotate.timer              logrotate.service
Thu 2023-03-30 05:50:50 CST 19h left      n/a                         n/a          apt-daily.timer              apt-daily.service
Thu 2023-03-30 06:41:07 CST 20h left      n/a                         n/a          apt-daily-upgrade.timer      apt-daily-upgrade.service
Sun 2023-04-02 03:10:39 CST 3 days left   n/a                         n/a          e2scrub_all.timer            e2scrub_all.service
```

Comme vous pouvez le voir, le `helloworld.timer` est en cours d'exécution et le prochain déclenchement est dans 1 minute et 46 secondes. Attendez quelques minutes et vérifiez le fichier journal :

```sh
journalctl -u helloworld.service
```

Vous devriez voir la sortie de la commande `echo` :

```
Mar 29 10:10:02 ubuntu systemd[1]: Starting Hello World Service...
Mar 29 10:10:02 ubuntu echo[7942]: Hello World
Mar 29 10:10:02 ubuntu systemd[1]: helloworld.service: Deactivated successfully.
Mar 29 10:10:02 ubuntu systemd[1]: Finished Hello World Service.
```

Si vous voulez rediriger la sortie vers un fichier, vous pouvez modifier la ligne `ExecStart` dans le fichier d'unité de service comme suit :

```sh
ExecStart=/bin/sh -c '/bin/echo "Hello World" >> /tmp/helloworld.log'
```

## Annexe

### OnCalendar

`OnCalendar` est une option dans la section `[Timer]` d'un fichier d'unité de minuteur qui spécifie quand le minuteur doit se déclencher. La syntaxe pour `OnCalendar` est la suivante :

```
OnCalendar=
```

L'expression de calendrier peut être une expression simple ou complexe qui spécifie le planning de la tâche. L'expression complète est comme ceci :

```
jourDeLaSemaine année-mois-jour heure:minute:seconde
```

- Jour de la semaine : `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`, `Sun`
- Année/Mois/Jour : Utilisez des nombres
- Heure/Minute/Seconde : Utilisez des nombres

Chaque partie peut être une plage, une liste, ou un intervalle, ou `*` pour correspondre à n'importe quelle valeur. Par exemple :

- `Mon..Fri` : Du lundi au vendredi
- `Mon,Fri` : Lundi et vendredi
- `8..18/2` : De 8h00 à 18h00, toutes les 2 heures
- `*-*-1` : Le premier jour de chaque mois

Chaque partie peut être omise. Par exemple :

- Pour exécuter une tâche toutes les heures, utilisez `OnCalendar=*:0`
- Pour exécuter une tâche à 15h30 tous les jours, utilisez `OnCalendar=15:30`
- Pour exécuter une tâche tous les lundis à 9h00, utilisez `OnCalendar=Mon 9:00`
- Pour exécuter une tâche toutes les 15 minutes, utilisez `OnCalendar=*:0/15`
- Pour exécuter une tâche tous les jours de la semaine à 8h00, utilisez `OnCalendar=Mon..Fri 8:00`

En plus de ces expressions de base, vous pouvez utiliser des expressions plus complexes qui incluent des plages, des listes et des intervalles. Voici quelques exemples :

- Pour exécuter une tâche toutes les 2 heures entre 8h00 et 18h00, utilisez `OnCalendar=8..18/2:0`
- Pour exécuter une tâche le 15ème jour de chaque mois à 10h00, utilisez `OnCalendar=*-*-15 10:00`

Vous pouvez également utiliser les mots-clés spéciaux `minutely`, `hourly`, `daily`, `weekly`, `monthly` et `yearly` pour spécifier des plannings courants.

Vous pouvez toujours valider votre expression `OnCalendar` en utilisant la commande `systemd-analyze` :

```sh
systemd-analyze calendar "Mon..Fri 8:00"
```

La sortie montrera la forme normalisée de l'expression et le prochain temps écoulé :

```
  Original form: Mon..Fri 8:00
Normalized form: Mon..Fri *-*-* 08:00:00
    Next elapse: Thu 2023-03-30 08:00:00 CST
       (in UTC): Thu 2023-03-30 00:00:00 UTC
       From now: 18h left
```

Dans l'ensemble, l'option `OnCalendar` offre une façon flexible et puissante de planifier des tâches sous Linux en utilisant les minuteurs systemd. En comprenant la syntaxe et en utilisant les expressions de calendrier appropriées, vous pouvez automatiser votre système et économiser du temps et des efforts.