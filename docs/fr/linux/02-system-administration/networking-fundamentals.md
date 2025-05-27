# Fondamentaux des réseaux Linux

<Validator lang="fr" :platform-list="['Ubuntu 24.10']" date="2025-05-23" />

En tant qu'administrateur système Linux ou développeur, vous vous retrouverez souvent à travailler avec des configurations réseau. Explorons les concepts et outils essentiels dont vous aurez besoin dans votre travail quotidien.

## Premiers pas avec les interfaces réseau

Lorsque vous examinez pour la première fois la configuration réseau sous Linux, vous rencontrerez des interfaces réseau. Considérez-les comme les points de connexion entre votre ordinateur et le réseau - similaires à la façon dont les ports d'un commutateur connectent différents appareils. Vous verrez généralement des interfaces nommées comme `eth0` pour votre première carte Ethernet, `wlan0` pour les connexions sans fil, et `lo` pour l'interface de bouclage que votre système utilise pour communiquer avec lui-même.

Lorsque vous travaillez avec des interfaces réseau, vous utiliserez fréquemment des commandes.

## La commande ip link

La commande `ip link show` est votre outil de prédilection pour vérifier l'état de toutes les interfaces réseau sur votre système. Elle affiche non seulement les interfaces, mais aussi leur état opérationnel et leurs adresses physiques/MAC. Vous la trouverez particulièrement utile lorsque vous :

- Dépannez des problèmes de connectivité réseau
- Configurez de nouvelles interfaces réseau
- Vérifiez si les cartes réseau sont correctement reconnues
- Contrôlez si les interfaces sont UP (actives) ou DOWN (inactives)

```bash
ip link show
```

Lorsque vous exécutez cette commande, vous verrez une sortie comme celle-ci :

```
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP mode DEFAULT
    link/ether 00:15:5d:01:ca:05 brd ff:ff:ff:ff:ff:ff
```

**Que signifie cette sortie ?** Décomposons-la :

Les parties importantes à remarquer sont les noms d'interface (`lo` et `eth0`) et leurs états (`UP` ou `DOWN`). Si vous avez besoin d'informations plus détaillées sur les adresses IP attribuées à ces interfaces, vous pouvez utiliser :

### Vérification des adresses IP

La commande `ip addr show` est plus complète que `ip link` car elle affiche à la fois les interfaces et les adresses IP qui leur sont attribuées. Cette commande est essentielle lorsque vous devez :

- Vérifier les attributions d'adresses IP
- Rechercher des adresses IP en double
- Déboguer des problèmes liés au DHCP
- Confirmer les configurations de masque de sous-réseau

Une fois que vous avez identifié vos interfaces, vous voudrez savoir quelles adresses IP elles possèdent. La commande `ip addr show` fournit cette information :

```bash
ip addr show
```

Lorsque vous exécutez cette commande, vous verrez quelque chose comme :
```
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
    inet6 ::1/128 scope host
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether 00:15:5d:01:ca:05 brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.100/24 brd 192.168.1.255 scope global dynamic eth0
    inet6 fe80::215:5dff:fe01:ca05/64 scope link
```

Décodons cette sortie :
- `inet 127.0.0.1/8` : L'adresse de bouclage avec son masque de sous-réseau
- `inet 192.168.1.100/24` : Votre adresse IP réelle et son sous-réseau
- `scope global` : Indique que cette adresse est valide pour une utilisation avec le monde extérieur
- `dynamic` : Montre que cette adresse a été attribuée par DHCP

Vous pouvez également utiliser `ifconfig` pour obtenir des informations similaires, mais cette commande est obsolète en faveur de `ip` :

> Comme `ifconfig` est obsolète, il se peut qu'elle ne soit pas installée par défaut sur les systèmes modernes. Si vous en avez besoin, vous pouvez installer le paquet `net-tools`.

```bash
ifconfig
```

Lorsque vous exécutez cette commande, vous verrez une sortie comme celle-ci :

```
eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet

```

Vous pouvez également voir l'adresse MAC de l'interface, l'IP et d'autres détails.

## Gestion des connexions réseau

### Configuration IP statique vs dynamique

Lors de la configuration d'un serveur ou d'un poste de travail, l'une des premières décisions que vous devrez prendre est d'utiliser une adresse IP statique ou dynamique.

Si vous configurez un serveur, vous voudrez probablement une IP statique. Voici comment procéder :

Lors de la configuration d'une adresse IP statique, la commande `ip addr add` vous donne un contrôle immédiat. La syntaxe suit le modèle `ip addr add ADRESSE_IP/MASQUE_SOUS_RÉSEAU dev INTERFACE`. Par exemple :

```bash
sudo ip addr add 192.168.1.100/24 dev eth0
```

Cette commande est parfaite pour :
- Tester rapidement des configurations réseau
- Réparer d'urgence le réseau
- Attribuer temporairement une IP pendant le dépannage
- Ajouter des adresses IP secondaires à une interface

> Astuce : pour supprimer une adresse IP, utilisez : `sudo ip addr del ADRESSE_IP dev INTERFACE`, vous pouvez utiliser `ip --help` pour voir toutes les options disponibles.

Mais n'oubliez pas que cette configuration ne survivra pas à un redémarrage. Pour une configuration permanente sur les systèmes Ubuntu ou Debian modernes, vous devrez modifier la configuration netplan, qui se trouve souvent dans `/etc/netplan/01-netcfg.yaml` ou similaire. Voici un exemple de configuration statique :

```yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    eth0:
      addresses: [192.168.1.100/24]
      gateway4: 192.168.1.1
      nameservers:
        addresses: [8.8.8.8, 1.1.1.1]
```

ou utiliser dhcp :

```yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    eth0:
      dhcp4: true
```

Après avoir édité le fichier, appliquez les changements avec :

```bash
sudo netplan apply
```

## Outils essentiels de dépannage réseau

Quand les choses tournent mal (et cela arrivera), vous aurez besoin d'une solide compréhension de ces outils de diagnostic :

### Test de connectivité réseau

Commençons par les bases - la commande `ping`. Vous pourriez penser qu'elle est simple, mais elle est incroyablement puissante :

La commande `ping` peut sembler basique, mais elle est incroyablement polyvalente. L'option `-c` limite le nombre de paquets envoyés, ce qui est utile pour les scripts et les tests rapides :

```bash
ping -c 4 google.com  # Envoie exactement 4 paquets puis s'arrête
```

Lorsque vous exécutez la commande ping, vous verrez une sortie comme celle-ci :
```
PING google.com (142.250.189.78) 56(84) bytes of data.
64 bytes from lhr25s35-in-f14.1e100.net (142.250.189.78): icmp_seq=1 ttl=116 time=14.3 ms
64 bytes from lhr25s35-in-f14.1e100.net (142.250.189.78): icmp_seq=2 ttl=116 time=13.9 ms
64 bytes from lhr25s35-in-f14.1e100.net (142.250.189.78): icmp_seq=3 ttl=116 time=14.1 ms
64 bytes from lhr25s35-in-f14.1e100.net (142.250.189.78): icmp_seq=4 ttl=116 time=14.0 ms

--- google.com ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3005ms
rtt min/avg/max/mdev = 13.915/14.075/14.284/0.151 ms
```

Cette sortie vous indique :
- L'adresse IP distante (142.250.189.78)
- Le temps d'aller-retour pour chaque paquet (par exemple, 14,3 ms)
- Le pourcentage de perte de paquets (0% dans ce cas)
- Des statistiques sur les variations de temps

Utilisez ping pour :
- Tester la connectivité de base
- Mesurer la latence du réseau
- Vérifier la résolution DNS
- Surveiller la disponibilité d'un hôte

Vous voulez savoir pourquoi une connexion est lente ou défaillante ? C'est là qu'intervient `traceroute` :

Lorsque vous devez comprendre le chemin que prend votre trafic, `traceroute` devient inestimable :

```bash
traceroute google.com
```

En utilisant traceroute, vous pourriez voir :
```
traceroute to google.com (142.250.189.78), 30 hops max, 60 byte packets
 1  _gateway (192.168.1.1)  0.344 ms  0.313 ms  0.307 ms
 2  isp-router.net (10.0.0.1)  12.132 ms  12.125 ms  12.119 ms
 3  core-router.isp.net (172.16.0.1)  13.225 ms  13.219 ms  13.213 ms
 4  google-peer.isp.net (192.0.2.1)  13.376 ms  13.370 ms  13.364 ms
 5  lhr25s35-in-f14.1e100.net (142.250.189.78)  14.090 ms  14.084 ms  14.078 ms
```

Chaque ligne représente un "saut" dans votre connexion :
- Le nombre au début est le compte de sauts
- Le nom d'hôte et l'adresse IP de chaque routeur
- Trois mesures de temps montrant la latence jusqu'à ce saut

Cet outil vous aide à :
- Identifier les goulots d'étranglement du réseau
- Résoudre les problèmes de routage
- Vérifier les chemins réseau
- Détecter les points de congestion du réseau

### Résolution DNS

Lorsque vous devez vérifier si un nom de domaine se résout correctement, `dig` est votre meilleur ami. C'est plus puissant que `nslookup` et fournit des informations détaillées sur les requêtes DNS :

```bash
dig google.com
```

Lorsque vous exécutez cette commande, vous verrez une sortie comme celle-ci :
```
; <<>> DiG 9.16.1-Ubuntu <<>> google.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 12345
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 0
;; QUESTION SECTION:
;google.com.			IN	A
;; ANSWER SECTION:
google.com.		299	IN		142.250.189.78
;; Query time: 14 msec
;; SERVER:  8.8.8.8#53
;; WHEN: Wed Oct 25 12:34:56 UTC 2023
;; MSG SIZE  rcvd: 55
```

Cette sortie fournit :
- Le serveur DNS utilisé pour la requête (8.8.8.8)
- Le temps nécessaire pour obtenir une réponse (14 msec)
- La taille du message de réponse (55 octets)

### Analyse de connexion

Pour des problèmes plus complexes, vous devrez approfondir avec des outils comme `ss` et `netstat` :

La commande `ss` est le remplaçant moderne de netstat, fournissant des statistiques détaillées sur les sockets :

```bash
ss -tuln  # Affiche les ports TCP(-t) et UDP(-u) en écoute(-l) numériques(-n)
```

En exécutant la commande ss :
```
Netid  State    Recv-Q  Send-Q   Local Address:Port    Peer Address:Port
tcp    LISTEN   0       128      0.0.0.0:22            0.0.0.0:*
tcp    LISTEN   0       128      0.0.0.0:80            0.0.0.0:*
tcp    ESTAB    0       0        192.168.1.100:22      192.168.1.10:52414
```

Cette sortie montre :
- `LISTEN` : Services en attente de connexions
- `ESTAB` : Connexions établies
- Paires adresse:port locales et distantes
- Longueurs de file d'attente pour les données entrantes/sortantes

Cette commande est essentielle pour :
- L'audit de sécurité
- Le débogage de services
- La résolution de conflits de ports
- L'analyse de l'état des connexions

## Conclusion

Il reste encore de nombreux sujets et outils à explorer dans le domaine des réseaux Linux, tels que les pare-feu (iptables/nftables), les VPN, le filtrage de paquets et l'optimisation des performances réseau. Cependant, maîtriser les bases vous donnera une solide fondation sur laquelle construire.

N'oubliez pas que maîtriser les réseaux Linux est un voyage, pas une destination. Commencez par les bases, pratiquez régulièrement et explorez progressivement des sujets plus avancés à mesure que vos besoins augmentent.