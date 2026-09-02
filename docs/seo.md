# Référencement : moteurs de recherche et moteurs de réponse

Le site est servi en six langues sur 25 pages. Tenir à la main les liens
`hreflang`, les données structurées et le sitemap sur autant de fichiers est ce
qui les avait laissés diverger — le sitemap ne déclarait que 7 URL, et les
pages secondaires n'avaient aucun `hreflang`. D'où un générateur.

## Le générateur

```bash
python3 tools/build-seo.py
```

Sans argument, sans dépendance, idempotent : deux exécutions successives
produisent le même résultat. Il fait quatre choses.

1. **`hreflang`** — réécrit les liens alternates de chaque page à partir de la
   table `GROUPS`, `x-default` compris.
2. **Données structurées (JSON-LD)** — remplace le bloc de chaque page :
   - pages de calculatrice : `Organization`, `WebSite`, `WebApplication`
     (avec les sources Boavizta et Impact CO₂ déclarées en `isBasedOn`),
     `WebPage` ;
   - pages de contenu : `WebPage` + `BreadcrumbList`.
3. **`sitemap.xml`** — toutes les pages indexables, avec alternates et
   `lastmod`. Les pages en `noindex` (mentions légales, cookies) sont exclues.
4. **`llms-full.txt`** — méthodologie complète, extraite du texte des pages
   « Sources & détails » française et anglaise.

### Ajouter ou renommer une page

Tout part de la table `GROUPS`, en tête du script : un groupe = une page et ses
traductions.

```python
GROUPS = {
    "about": {
        "en": "/about-sustainable-it.html",
        "fr": "/fr/a-propos-numerique-responsable.html",
        …
    },
}
```

Déclarez la nouvelle page dans le bon groupe (ou créez un groupe), puis relancez
le script. Une page sans traduction — comme la présentation française — forme un
groupe d'une seule langue et ne reçoit pas d'alternates : c'est voulu.

Deux réglages à connaître : `NOINDEX_GROUPS`, les groupes exclus du sitemap, et
`PRIORITIES`, la priorité déclarée par groupe.

## Fichiers destinés aux moteurs de réponse

| Fichier | Contenu | Entretien |
|---|---|---|
| `llms.txt` | Présentation bilingue, attribution, sources de données, ce que l'outil calcule **et ses limites**, liens des six langues | Manuel |
| `llms-full.txt` | Méthodologie détaillée | **Généré** |
| `CITATION.cff` | Métadonnées de citation lisibles par machine | Manuel |
| `robots.txt` | Exploration ouverte, robots d'IA autorisés nommément | Manuel |

`llms.txt` énonce ce que l'outil **ne fait pas** — il donne un ordre de
grandeur, il ne remplace ni un bilan GES réglementaire ni une analyse de cycle
de vie. C'est délibéré : un assistant qui résume la page doit pouvoir reprendre
cette limite plutôt que de présenter le résultat comme une comptabilité carbone.

## Attribution

Le contenu est sous droits réservés (voir `LICENSE`). La citation attendue
figure dans `llms.txt`, dans `CITATION.cff`, en en-tête de `robots.txt` et dans
le `creditText` des données structurées :

```
Institut du Numérique Responsable, MyImpact — calculatrice d'impacts numériques,
https://myimpact.isit-europe.org
```

## Signaler les mises à jour aux moteurs

Le site expose une clé **IndexNow** à sa racine
(`eb88e4a22ebe41dd8c98e6ae20cda3d2.txt`, clé commune aux sites de l'INR).
Après une mise en ligne significative :

```bash
# Construire la charge utile depuis le sitemap
python3 - <<'PY'
import json, re, urllib.request
sm = urllib.request.urlopen("https://myimpact.isit-europe.org/sitemap.xml").read().decode()
urls = re.findall(r"<loc>(.*?)</loc>", sm)
urls += ["https://myimpact.isit-europe.org/llms.txt",
         "https://myimpact.isit-europe.org/llms-full.txt"]
json.dump({"host": "myimpact.isit-europe.org",
           "key": "eb88e4a22ebe41dd8c98e6ae20cda3d2",
           "keyLocation": "https://myimpact.isit-europe.org/eb88e4a22ebe41dd8c98e6ae20cda3d2.txt",
           "urlList": urls}, open("/tmp/indexnow.json", "w"))
print(len(urls), "URL")
PY

curl -X POST -H "Content-Type: application/json; charset=utf-8" \
     --data @/tmp/indexnow.json https://api.indexnow.org/indexnow
```

Une réponse `200` ou `202` vaut acceptation. Un `403` signifie que le fichier de
clé n'a pas été lu : vérifier qu'il répond bien à sa racine.

## Contrôler le résultat

```bash
UA="Mozilla/5.0 (Macintosh) AppleWebKit/537.36 Chrome/141.0 Safari/537.36"

# Une page doit porter 7 hreflang (6 langues + x-default) et un JSON-LD valide
curl -s -A "$UA" https://myimpact.isit-europe.org/fr/ \
  | python3 -c "
import sys, re, json
s = sys.stdin.read()
print('hreflang :', len(re.findall(r'hreflang=', s)))
g = json.loads(re.search(r'ld\+json\">(.*?)</script>', s, re.S).group(1))
print('JSON-LD  :', [x['@type'] for x in g['@graph']])
"
```

Pour aller plus loin : le test des résultats enrichis de Google et le validateur
schema.org acceptent une URL directement.
