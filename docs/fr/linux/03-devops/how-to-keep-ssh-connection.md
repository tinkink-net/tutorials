# Comment maintenir la connexion ssh ouverte (Broken pipe)

Lorsque vous utilisez ssh, vous rencontrerez souvent une connexion interrompue. Parfois, vous quittez simplement la fenêtre pour faire un autre travail, et lorsque vous revenez à la fenêtre du terminal, vous constaterez que la connexion ssh a été interrompue. À ce moment-là, vous ne pouvez rien faire directement, mais après quelques secondes d'attente, le message suivant apparaît

```sh
Write failed: Broken pipe
```

C'est une situation très improductive.

## Raison

ssh utilise des connexions longues, donc lorsqu'il y a une communication de données, la connexion sera maintenue ouverte, mais sans modifier la configuration, ssh se déconnectera après une période sans communication de données, provoquant ainsi le phénomène ci-dessus.

## Solution

Puisque la connexion est déconnectée parce qu'il n'y a pas de communication de données, est-il possible que ssh génère une certaine communication à intervalles réguliers pendant les temps d'inactivité ? La réponse est oui. Et c'est un problème pour lequel les côtés serveur et client de ssh fournissent des solutions.

### Paramètres côté serveur

Le service ssh côté serveur s'appelle sshd, donc son fichier de configuration est `/etc/ssh/sshd_config`, et vous n'avez qu'à modifier ce fichier pour.

```
ClientAliveInterval 60
ClientAliveCountMax 5
```

Où `ClientAliveInterval` indique à quelle fréquence envoyer un "heartbeat" au client, et `ClientAliveCountMax` indique combien de fois se déconnecter si aucune réponse n'est reçue. Donc la configuration ci-dessus signifie : envoyer un heartbeat au client toutes les 60s, et se déconnecter lorsqu'aucune réponse n'est reçue 5 fois.

Redémarrez le service sshd après le réglage : `systemctl restart sshd.service` ou `service sshd restart`.

### Paramètres client

La configuration du client se trouve dans `/etc/ssh/ssh_config`, qui est un fichier de configuration global. Si vous configurez uniquement pour l'utilisateur actuel, vous pouvez également modifier `~/.ssh/ssh_config` pour.

```
TCPKeepAlive yes
ServerAliveInterval 60
ServerAliveCountMax 5
```

Les significations des paramètres sont presque les mêmes que celles définies du côté serveur.

### Solution temporaire côté client

En plus de modifier la configuration, le client peut également utiliser les paramètres suivants pour spécifier un "heartbeat" programmé lors de l'initiation d'une connexion

```sh
ssh -o ServerAliveInterval=60 root@xx.xx.xx.xx
```

## Résumé

Une fois que vous avez configuré le "heartbeat", vous n'aurez plus peur que ssh se déconnecte sans raison.