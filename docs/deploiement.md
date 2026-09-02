# Déploiement et exploitation

## Où tourne le site

| | |
|---|---|
| URL | https://myimpact.isit-europe.org |
| Hébergement | OVH, hébergement mutualisé (cluster128) |
| Chemin serveur | `~/myimpact` |
| Accès | SSH, compte `academi-linuxgg` |
| Dépôt | `Institut-du-Numerique-Responsable/myimpact` (public) |

Il n'y a **pas de déploiement automatique**. Le serveur porte un dépôt git, mais
il ne sert qu'à comparer : la publication se fait par copie de fichiers.

## Publier une modification

```bash
# 1. Travailler en local sur un clone à jour
git clone https://github.com/Institut-du-Numerique-Responsable/myimpact.git
cd myimpact

# 2. Régénérer les artefacts SEO si des pages ont été ajoutées ou renommées
python3 tools/build-seo.py

# 3. Déployer les fichiers modifiés
scp -i ~/.ssh/<clé> index.html sitemap.xml \
    academi-linuxgg@ssh.cluster128.hosting.ovh.net:myimpact/

#    ou, pour une langue entière
rsync -av -e "ssh -i ~/.ssh/<clé>" fr/ \
    academi-linuxgg@ssh.cluster128.hosting.ovh.net:myimpact/fr/

# 4. Vérifier en production (voir plus bas)
# 5. Committer et ouvrir une pull request
```

La branche `main` est protégée : une pull request approuvée est nécessaire.

## Vérifier après déploiement

Le pare-feu OVH **ne bloque pas** les requêtes sans User-Agent sur ce site, mais
mieux vaut en fournir un pour rester proche du comportement réel :

```bash
UA="Mozilla/5.0 (Macintosh) AppleWebKit/537.36 Chrome/141.0 Safari/537.36"

# Les pages répondent
for u in / /fr/ /de/ /es/ /it/ /nl/ /llms.txt /sitemap.xml /robots.txt; do
  printf "%-16s " "$u"
  curl -s -o /dev/null -A "$UA" -w "%{http_code}\n" "https://myimpact.isit-europe.org$u"
done

# Les en-têtes de sécurité sont présents
curl -sI -A "$UA" https://myimpact.isit-europe.org/ | grep -i \
  -e content-security-policy -e strict-transport -e x-frame-options
```

Dans le navigateur, sur une page de calculatrice :

- la console ne montre **aucune violation CSP** ;
- le bandeau de consentement s'affiche pour un visiteur sans choix enregistré ;
- le total en kg CO₂e s'affiche et les **équivalents carbone** se remplissent
  (c'est le test de l'appel à `impactco2.fr`).

## Comparer la production et le dépôt

À faire dès qu'un doute existe sur ce qui est réellement en ligne :

```bash
rsync -a -e "ssh -i ~/.ssh/<clé>" --exclude '.git' \
  academi-linuxgg@ssh.cluster128.hosting.ovh.net:myimpact/ /tmp/myimpact-prod/

cd /chemin/vers/le/clone
git ls-files | while read -r f; do
  if   [ ! -e "/tmp/myimpact-prod/$f" ]; then echo "MANQUANT EN PROD : $f"
  elif ! cmp -s "$f" "/tmp/myimpact-prod/$f"; then echo "DIFFERENT : $f"
  fi
done
```

Résultat attendu : aucune ligne.

## Revenir en arrière

Les sauvegardes des fichiers remplacés sont déposées dans
`~/backups/myimpact-<date>/` sur le serveur avant chaque intervention notable.
Pour restaurer, recopier le fichier sauvegardé par-dessus celui en ligne.

Le dépôt git du serveur permet aussi de repartir de l'état publié :

```bash
cd ~/myimpact
git fetch origin
git status            # ce qui diffère du dépôt
git checkout -- <fichier>   # restaure un fichier depuis le dépôt
```

## Le dépôt git du serveur

Il sert de **point de comparaison**, pas de mécanisme de publication. Le
`HEAD` doit rester aligné sur `origin/main` :

```bash
cd ~/myimpact && git fetch origin && git reset --mixed origin/main
```

`reset --mixed` repositionne le pointeur **sans toucher aux fichiers en ligne** :
c'est ce qu'il faut ici, un `--hard` écraserait la production.

> Historique : jusqu'en septembre 2026, ce dépôt local pointait sur un
> historique d'avril 2026 **sans racine commune** avec GitHub, ce qui faisait
> annoncer à `git status` « 3 commits d'avance, 41 de retard » alors que les
> fichiers en ligne étaient à jour. Cet historique parallèle est archivé dans
> `~/backups/myimpact-20260902/historique-local-avril2026.bundle`.
