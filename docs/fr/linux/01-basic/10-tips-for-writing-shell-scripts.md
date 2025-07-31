# Conseils pour écrire de meilleurs scripts Shell

Les scripts shell sont des outils puissants pour l'automatisation et l'administration système, mais ils peuvent être fragiles s'ils ne sont pas écrits avec soin. Voici quelques bonnes pratiques pour rendre vos scripts shell plus robustes, maintenables et conviviaux.

## 1. Utilisez la ligne Shebang

```bash
#!/bin/bash
```

**Pourquoi c'est important** : La ligne shebang spécifie quel interpréteur doit exécuter le script. Incluez-la toujours en haut pour assurer la cohérence, quelle que soit la façon dont le script est invoqué ou quel est le shell par défaut de l'utilisateur.

## 2. Incluez la documentation du script

```bash
# backup-cleanup.sh
#
# Objectif : Nettoyer les fichiers de sauvegarde selon la politique de rétention
# Utilisation : ./backup-cleanup.sh [options]
# Auteur : Votre Nom
# Date : 31 janvier 2025
```

**Pourquoi c'est important** : Une bonne documentation explique l'objectif du script, son utilisation et son historique. Cela aide les autres (et votre futur vous) à comprendre ce que fait le script et comment l'utiliser correctement.

## 3. Gestion des erreurs avec les options `set`

```bash
# Quitter immédiatement si une commande échoue
set -e
# Traiter les variables non définies comme des erreurs
set -u
# La valeur de retour d'un pipeline est la dernière commande à se terminer avec un statut non nul
set -o pipefail
```

**Pourquoi c'est important** : Par défaut, bash continue l'exécution même après l'échec des commandes. Ces paramètres font échouer vos scripts rapidement et bruyamment, évitant les erreurs en cascade dues à des échecs silencieux.

## 4. Utilisez `trap` pour le nettoyage

```bash
TEMP_FILE=$(mktemp)
trap "rm -f $TEMP_FILE" EXIT
```

**Pourquoi c'est important** : La commande `trap` garantit que les ressources temporaires sont correctement nettoyées lorsque le script se termine, même s'il se termine en raison d'une erreur. Cela évite de laisser derrière des fichiers temporaires ou d'autres ressources.

## 5. Déclarez correctement les variables

```bash
# Constantes (utilisez des majuscules par convention)
declare -r MAX_RETRIES=5

# Tableaux
declare -a FILES_TO_PROCESS=()

# Entiers
declare -i COUNTER=0

# Variables régulières
VERSION="1.0.0"
```

**Pourquoi c'est important** : L'utilisation de `declare` définit explicitement les types et attributs des variables, rendant votre code plus maintenable et évitant des bugs subtils.

## 6. Traitez les fichiers ligne par ligne correctement

```bash
while IFS= read -r line; do
    echo "Traitement : $line"
done < "$INPUT_FILE"
```

**Pourquoi c'est important** : C'est la bonne façon de lire un fichier ligne par ligne dans bash. Définir `IFS=` préserve les espaces en début/fin de ligne, et l'option `-r` empêche l'interprétation des séquences d'échappement avec backslash.

## 7. Utilisez `mktemp` pour les fichiers temporaires

```bash
TEMP_FILE=$(mktemp)
LOG_FILE=$(mktemp -t logfile.XXXXXX)
```

**Pourquoi c'est important** : L'utilisation de `mktemp` crée des fichiers temporaires avec des noms uniques, évitant les collisions de noms de fichiers et les vulnérabilités de sécurité potentielles.

## 8. Utilisez l'expansion de paramètres pour les valeurs par défaut

```bash
# Utiliser une valeur par défaut si le paramètre n'est pas défini ou vide
INPUT_FILE="${1:-default.txt}"

# Utiliser la valeur par défaut uniquement si le paramètre n'est pas défini
LOG_LEVEL="${LOG_LEVEL-INFO}"
```

**Pourquoi c'est important** : L'expansion de paramètres offre des moyens élégants de gérer les valeurs par défaut, rendant les scripts plus flexibles et conviviaux.

## 9. Utilisez les expressions régulières avec précaution

```bash
if [[ $filename =~ ^backup-([0-9]{4})([0-9]{2})([0-9]{2})\.tar\.gz$ ]]; then
    year="${BASH_REMATCH[1]}"
    month="${BASH_REMATCH[2]}"
    day="${BASH_REMATCH[3]}"
    echo "Sauvegarde trouvée du $year-$month-$day"
fi
```

**Pourquoi c'est important** : L'opérateur `=~` avec les doubles crochets `[[` permet une correspondance de motifs puissante. Le tableau `BASH_REMATCH` contient les groupes capturés, facilitant l'extraction de parties d'une chaîne.

## 10. Incluez des sorties détaillées et des journaux

```bash
log_info() {
    echo "[INFO] $1"
}

log_error() {
    echo "[ERROR] $1" >&2
}

log_info "Démarrage du processus de sauvegarde"
```

**Pourquoi c'est important** : Les bons scripts indiquent aux utilisateurs ce qu'ils font, surtout pour les opérations qui ne peuvent pas être annulées. Différents niveaux de journalisation aident à distinguer les informations de routine des erreurs critiques.

## 11. Vérifiez le succès des commandes

```bash
if ! command -v aws >/dev/null 2>&1; then
    log_error "AWS CLI n'est pas installé"
    exit 1
fi

if ! cp "$SOURCE" "$DESTINATION"; then
    log_error "Échec de la copie de $SOURCE vers $DESTINATION"
    exit 1
fi
```

**Pourquoi c'est important** : Vérifiez toujours que les commandes réussissent avant de continuer, surtout avant d'effectuer des opérations destructrices.

## 12. Mettez vos variables entre guillemets

```bash
# Bon : Empêche la division des mots et le globbing
echo "Traitement du fichier : $filename"

# Mauvais : Peut échouer si $filename contient des espaces ou des caractères spéciaux
echo Traitement du fichier : $filename
```

**Pourquoi c'est important** : Mettez toujours les variables entre guillemets pour éviter les problèmes de division des mots et de globbing, surtout lorsque les valeurs peuvent contenir des espaces ou des caractères spéciaux.

## 13. Utilisez des fonctions pour le code réutilisable

```bash
function backup_database() {
    local db_name="$1"
    local output_file="$2"

    log_info "Sauvegarde de la base de données $db_name vers $output_file"
    pg_dump "$db_name" > "$output_file"
    return $?
}

# Utilisation
backup_database "myapp" "/tmp/myapp_backup.sql"
```

**Pourquoi c'est important** : Les fonctions rendent votre script modulaire et réutilisable. L'utilisation de variables `local` évite de polluer l'espace de noms global.

## 14. Traitez correctement les arguments de ligne de commande

```bash
function show_usage() {
    echo "Utilisation : $(basename "$0") [-v] [-h] [-f FICHIER]"
    echo "  -v : Activer la sortie détaillée"
    echo "  -h : Afficher ce message d'aide"
    echo "  -f FICHIER : Spécifier le fichier d'entrée"
}

VERBOSE=false
FILE=""

while getopts "vhf:" opt; do
    case ${opt} in
        v ) VERBOSE=true ;;
        h ) show_usage; exit 0 ;;
        f ) FILE=$OPTARG ;;
        * ) show_usage; exit 1 ;;
    esac
done
```

**Pourquoi c'est important** : La commande `getopts` fournit un moyen standard de traiter les options de ligne de commande, rendant vos scripts plus conviviaux et conformes aux conventions Unix.

## 15. Validez les entrées rapidement

```bash
if [[ ! -f "$INPUT_FILE" ]]; then
    log_error "Le fichier d'entrée n'existe pas : $INPUT_FILE"
    exit 1
fi

if [[ ! $PORT =~ ^[0-9]+$ ]] || [[ $PORT -lt 1 ]] || [[ $PORT -gt 65535 ]]; then
    log_error "Numéro de port invalide : $PORT"
    exit 1
fi
```

**Pourquoi c'est important** : Valider les entrées tôt évite les erreurs plus tard dans le script et fournit des messages d'erreur significatifs aux utilisateurs.

## 16. Utilisez des codes de sortie significatifs

```bash
# Définir les codes de sortie
readonly E_SUCCESS=0
readonly E_USAGE=64
readonly E_MISSING_FILE=65
readonly E_PERMISSION=66

if [[ ! -r "$INPUT_FILE" ]]; then
    log_error "Impossible de lire le fichier d'entrée : $INPUT_FILE"
    exit $E_PERMISSION
fi
```

**Pourquoi c'est important** : Des codes de sortie significatifs aident les systèmes automatisés à comprendre pourquoi un script a échoué et à prendre les mesures appropriées.

## 17. Utilisez Shellcheck

Exécutez régulièrement vos scripts avec [ShellCheck](https://www.shellcheck.net/), un outil d'analyse statique qui identifie les problèmes courants dans les scripts shell.

**Pourquoi c'est important** : ShellCheck détecte de nombreux bugs subtils et suggère des bonnes pratiques qui peuvent être difficiles à mémoriser.

## 18. Structurez votre script logiquement

Organisez votre script avec une structure claire :
1. Shebang et documentation
2. Constantes et configuration
3. Définitions de fonctions
4. Logique principale du script

**Pourquoi c'est important** : Une structure logique rend les scripts plus faciles à comprendre, à déboguer et à modifier.

## Conclusion

Écrire de meilleurs scripts shell consiste à les rendre robustes, lisibles et maintenables. En suivant ces pratiques, vos scripts seront plus fiables et plus faciles à comprendre et à modifier pour les autres (y compris votre futur vous).