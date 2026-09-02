# Architecture

> Documentation d'exploitation, rédigée en français : elle s'adresse à l'équipe
> qui maintient le site. Le `README.md`, destiné au public international, reste
> en anglais.

## Nature du projet

MyImpact est un **site statique**. Il n'y a ni serveur applicatif, ni base de
données, ni build à exécuter avant de publier : les fichiers du dépôt sont ceux
qui sont servis. Un navigateur suffit pour l'ouvrir en local.

Cette contrainte est un choix : la calculatrice doit rester frugale, sans
dépendance d'exécution, et vérifiable en lisant son code source.

## Arborescence

```
/                        Version anglaise (langue par défaut)
├── index.html           Calculatrice EN
├── about-sustainable-it.html   Sources & détails des calculs
├── legal-notice.html    Mentions légales
├── cookies.html         Gestion des cookies
├── scripts-en.js        Logique de la calculatrice (EN)
│
├── fr/ de/ es/ it/ nl/  Une version par langue, même structure
│   ├── index.html
│   ├── scripts.js       Logique de la calculatrice, traduite
│   └── …                Pages secondaires aux noms localisés
│
├── equipment-additions.js     Ajout/suppression de lignes « équipement »
├── location-additions.js      Ajout/suppression de lignes « déplacement »
├── impactco2-equivalents.js   Appel à l'API Impact CO₂ (ADEME)
├── cookie-consent.js          Configuration de tarteaucitron
├── jquery-3.7.1.min.js
├── stylesheet-inr.css
│
├── tarteaucitron/       Bandeau de consentement (bibliothèque tierce)
├── fonts/ img/          Police Montserrat auto-hébergée, images
│
├── llms.txt             Index destiné aux moteurs de réponse
├── llms-full.txt        Méthodologie complète, générée
├── sitemap.xml          Généré
├── robots.txt
├── CITATION.cff         Métadonnées de citation
│
├── tools/build-seo.py   Générateur SEO (hreflang, JSON-LD, sitemap, llms-full)
├── tests/               Contrôles statiques
└── docs/                Cette documentation
```

Les répertoires `tools/` et `.github/` sont versionnés **et** déployés, pour que
la production soit identique au dépôt, mais le `.htaccess` en interdit l'accès
HTTP : ils n'ont aucune raison d'être servis.

## Le calcul, de bout en bout

Tout se passe dans le navigateur. Aucune réponse saisie n'est transmise.

1. **Saisie.** L'utilisateur déclare ses équipements (type, modèle, durée
   d'utilisation) et ses usages (messagerie, stockage, visioconférence,
   déplacements liés au numérique).
2. **Facteurs d'impact.** Chaque équipement porte deux facteurs : l'impact de
   **fabrication**, amorti sur la durée de vie déclarée, et la **consommation
   électrique** d'usage, multipliée par l'intensité carbone du mix électrique du
   pays choisi. Ces valeurs sont figées dans `scripts-*.js` — elles ne sont pas
   récupérées à distance.
3. **Agrégation.** Les impacts sont additionnés et ramenés à une année, en
   kg CO₂e.
4. **Équivalents.** `impactco2-equivalents.js` interroge l'API publique
   **Impact CO₂** de l'ADEME pour convertir le total en repères du quotidien
   (kilomètres en voiture, vols, repas). En cas d'indisponibilité de l'API, des
   valeurs de repli intégrées au projet prennent le relais : le résultat
   principal ne dépend jamais du réseau.

Seule cette dernière étape sort du navigateur. La requête transmet à
`impactco2.fr` les données techniques de connexion (adresse IP, agent
utilisateur), jamais les réponses de l'utilisateur — c'est écrit dans les
mentions légales.

## Multilingue

Six langues : anglais (racine), français, néerlandais, allemand, espagnol,
italien. Chaque langue est un répertoire complet, pas une surcouche de
traduction : les textes sont dans le HTML et dans le `scripts.js` de la langue.

La cohérence entre ces répertoires — liens `hreflang`, données structurées,
sitemap — est **générée**, pas maintenue à la main : voir
[`docs/seo.md`](seo.md). C'est précisément ce qui avait dérivé auparavant.

## Mesure d'audience et consentement

- **Matomo** auto-hébergé (`analytic.institutnr.org`), site n° 8.
- **tarteaucitron** gère le consentement ; Matomo n'est activé qu'après accord,
  via le service `matomocloud` configuré dans `cookie-consent.js`.
- Aucune donnée n'est transmise à un tiers en dehors de Matomo et de l'appel
  Impact CO₂ décrit plus haut.

## Sécurité

Le `.htaccess` porte la redirection HTTPS, HSTS, `X-Frame-Options`,
`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, une
**politique de sécurité du contenu (CSP)** et le cache des ressources statiques.

La CSP autorise exactement trois origines externes :

| Directive | Origine autorisée | Pourquoi |
|---|---|---|
| `script-src` | `analytic.institutnr.org:8443` | script Matomo |
| `connect-src` | `analytic.institutnr.org:8443` | envoi des mesures |
| `connect-src` | `impactco2.fr` | équivalences carbone ADEME |

**Toute nouvelle ressource externe doit être ajoutée à la CSP**, sinon le
navigateur la bloque en silence. C'est arrivé : la CSP livrée initialement
omettait `impactco2.fr` et aurait coupé les équivalents carbone.
