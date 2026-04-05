# MyImpact — Multilingue, Corrections & SEO

**Date :** 2026-04-05  
**Projet :** myimpact.isit-europe.org  
**Auteurs :** Institut du Numérique Responsable (INR), ISIT Belgique, ISIT Suisse

---

## 1. Contexte

MyImpact est une calculatrice statique (HTML + jQuery) d'empreinte carbone numérique et professionnelle, hébergée sur OVH. Elle existe en 3 langues (EN, FR, NL). L'objectif est de :

1. Corriger les bugs et problèmes de qualité identifiés dans le code existant
2. Ajouter 3 nouvelles langues : Espagnol (ES), Italien (IT), Allemand (DE)
3. Auto-héberger les polices (conformité RGPD + fonctionnement hors réseau)
4. Ajouter les métadonnées SEO complètes
5. Produire un README.md pour GitHub

---

## 2. Bugs & corrections

### 2.1 HTML cassé — `fr/index.html` ligne 166

```html
<!-- AVANT (cassé) -->
<option value="placeholder" naem="visio_tool>Choisissez...</option>

<!-- APRÈS -->
<option value="placeholder">Choisissez...</option>
```

Attribut `naem` inexistant, guillemet non fermé sur `visio_tool`.

### 2.2 Fautes d'orthographe — `scripts-en.js` lignes 119, 123

```js
// AVANT
"Apple Mackbook Air 2010/2011"
"Apple Mackbook Air 2013/2016"

// APRÈS
"Apple MacBook Air 2010/2011"
"Apple MacBook Air 2013/2016"
```

Idem dans les scripts FR/NL/ES/IT/DE.

### 2.3 Variables globales non déclarées — `scripts-en.js` lignes 1–8

```js
// AVANT
francais = "...";
neerlandais = "...";
le_referer = document.referrer;
var index = ...

// APRÈS — supprimer ces lignes inutilisées
// (le bloc de redirection est commenté depuis l'origine, les variables ne servent à rien)
```

### 2.4 Texte dupliqué — `index.html` ligne 368

```html
<!-- AVANT -->
What can I compare my total impact* to? *&nbsp;?

<!-- APRÈS -->
What can I compare my total impact to?*
```

### 2.5 Variable `CO2streaming` inutilisée — `scripts-en.js` ligne 339

Suppression de `CO2streaming = 0.0015` (déclarée mais jamais référencée dans le calcul).

### 2.6 Champ vélo ignoré dans le calcul

`#deplacement_velo` est présent dans le HTML FR mais absent du JS. Le vélo/marche = 0 gCO2/km, donc l'intégrer dans la somme ne change pas le résultat mais lève l'incohérence. Ajouter un listener qui affiche `0.00` dans les résultats annuels.

### 2.7 URL externe dans le CSS

```css
/* AVANT */
background: url(https://monimpact.isit-europe.org/img/chevron.png) ...

/* APRÈS */
background: url(../img/chevron.png) ...
```

Chemin relatif, fonctionne sur serveur OVH et en local via HTTP server.

### 2.8 Lien brisé — The Shift Project

```html
<!-- AVANT -->
<a href="#">Source : The Shift Project</a>

<!-- APRÈS -->
<a href="https://theshiftproject.org/article/lean-ict-notre-nouveau-rapport/" ...>
```

---

## 3. Auto-hébergement des polices (Montserrat)

### Problème
```html
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;800&display=swap" rel="stylesheet">
```
- Envoie des données utilisateur à Google → non conforme RGPD
- Bloque le rendu si le réseau est indisponible

### Solution
Télécharger les fichiers `.woff2` pour les 3 graisses utilisées et les auto-héberger :

```
myimpact/
└── fonts/
    ├── montserrat-400.woff2
    ├── montserrat-600.woff2
    └── montserrat-800.woff2
```

Remplacer dans `stylesheet-inr.css` :
```css
@font-face {
  font-family: 'Montserrat';
  src: url('fonts/montserrat-400.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Montserrat';
  src: url('fonts/montserrat-600.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Montserrat';
  src: url('fonts/montserrat-800.woff2') format('woff2');
  font-weight: 800;
  font-style: normal;
  font-display: swap;
}
```

Supprimer les 3 balises `<link>` Google Fonts dans tous les fichiers HTML.

> Note : les chemins CSS sont relatifs à la feuille de style (racine). Les sous-dossiers (`fr/`, `es/`…) référencent le CSS via `../stylesheet-inr.css`, donc le chemin `fonts/` dans le CSS pointe toujours vers `myimpact/fonts/` — cohérent pour toutes les langues.

---

## 4. Nouvelles langues

### 4.1 Structure des dossiers

```
myimpact/
├── es/
│   ├── index.html
│   └── scripts.js
├── it/
│   ├── index.html
│   └── scripts.js
└── de/
    ├── index.html
    └── scripts.js
```

Même pattern que `fr/` et `nl/`. Le CSS et jQuery restent partagés à la racine.

### 4.2 Sélecteur de langue (toutes les pages)

Le header de chaque page passe de 3 à 6 liens :

```html
<div class="div-switch-language">
  <a class="switch-language" href="/" title="English">EN</a>
  <a class="switch-language" href="/fr/" title="Français">FR</a>
  <a class="switch-language" href="/nl/" title="Nederlands">NL</a>
  <a class="switch-language" href="/de/" title="Deutsch">DE</a>
  <a class="switch-language" href="/es/" title="Español">ES</a>
  <a class="switch-language" href="/it/" title="Italiano">IT</a>
</div>
```

Chemins absolus → fonctionnent sur OVH. Pour tester en local : `python3 -m http.server 8000` depuis la racine du projet.

### 4.3 Contenu traduit

Chaque nouvelle langue reprend la structure complète du HTML EN et traduit :
- Titre de page et méta-description
- Tous les textes de l'interface
- Les noms de catégories d'équipements dans `scripts.js`
- Les labels des sections (équipements, usage, cloud, emails, déplacements, résultats)

Les valeurs numériques (CO2, mix énergétique, constantes) sont identiques dans tous les scripts.

### 4.4 Mix énergétique par pays

Les nouveaux pays francophones/germanophones/hispanophones d'intérêt sont ajoutés dans le `select_country` de chaque version :

| Indicateur | Pays | gCO2/kWh |
|---|---|---|
| `fr` | France | 52 |
| `be` | Belgique | 220 |
| `ch` | Suisse | 27 |
| `de` | Allemagne | 420 |
| `at` | Autriche | 158 |
| `es` | Espagne | 207 |
| `it` | Italie | 233 |
| `lu` | Luxembourg | 89 |

Ces valeurs sont ajoutées dans le tableau `countries` de **tous** les scripts (EN, FR, NL, DE, ES, IT).

---

## 5. SEO

### 5.1 Balises par page

Chaque `index.html` reçoit dans le `<head>` :

```html
<!-- Canonical -->
<link rel="canonical" href="https://myimpact.isit-europe.org/{lang}/" />

<!-- Hreflang (toutes les langues) -->
<link rel="alternate" hreflang="en" href="https://myimpact.isit-europe.org/" />
<link rel="alternate" hreflang="fr" href="https://myimpact.isit-europe.org/fr/" />
<link rel="alternate" hreflang="nl" href="https://myimpact.isit-europe.org/nl/" />
<link rel="alternate" hreflang="de" href="https://myimpact.isit-europe.org/de/" />
<link rel="alternate" hreflang="es" href="https://myimpact.isit-europe.org/es/" />
<link rel="alternate" hreflang="it" href="https://myimpact.isit-europe.org/it/" />
<link rel="alternate" hreflang="x-default" href="https://myimpact.isit-europe.org/" />

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://myimpact.isit-europe.org/{lang}/" />
<meta property="og:title" content="{titre localisé}" />
<meta property="og:description" content="{description localisée}" />
<meta property="og:locale" content="{locale}" />
<meta property="og:image" content="https://myimpact.isit-europe.org/img/og-image.png" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="{titre localisé}" />
<meta name="twitter:description" content="{description localisée}" />
```

### 5.2 Schema.org JSON-LD

Bloc commun injecté dans chaque page :

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "MyImpact",
  "url": "https://myimpact.isit-europe.org/",
  "description": "Carbon footprint calculator for digital and professional usage",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Any",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
  "author": [
    {
      "@type": "Organization",
      "name": "Institut du Numérique Responsable (INR)",
      "url": "https://institutnr.org"
    },
    {
      "@type": "Organization",
      "name": "ISIT Belgique",
      "url": "https://isit-be.org"
    },
    {
      "@type": "Organization",
      "name": "ISIT Suisse",
      "url": "https://isit-europe.org"
    }
  ],
  "inLanguage": ["{lang}"]
}
```

### 5.3 Fichiers auxiliaires

- `sitemap.xml` — liste les 6 URLs avec `<lastmod>` et `<xhtml:link>` hreflang
- `robots.txt` — déjà présent, vérifier qu'il autorise l'indexation et pointe vers le sitemap

---

## 6. README.md

Structure du README pour GitHub :

1. **Titre + badge licence**
2. **Description** — calculatrice empreinte carbone numérique pro
3. **Auteurs** — INR, ISIT Belgique, ISIT Suisse (avec liens)
4. **Langues disponibles** — EN, FR, NL, DE, ES, IT
5. **Démo** — lien vers myimpact.isit-europe.org
6. **Structure du projet** — arborescence commentée
7. **Sources des données** — ADEME, ENERGY STAR, NUTS, Umweltbundesamt
8. **Tester en local** — `python3 -m http.server 8000`
9. **Contribuer** — comment ajouter une langue, modifier les données
10. **Licence**

---

## 7. Ordre d'implémentation

1. Télécharger et intégrer les polices Montserrat (fonts/)
2. Corriger le CSS (URL chevron + @font-face)
3. Corriger les bugs HTML/JS (EN, FR, NL)
4. Mettre à jour le tableau `countries` dans tous les scripts existants
5. Créer `es/`, `it/`, `de/` (HTML + scripts)
6. Mettre à jour le sélecteur de langue dans toutes les pages
7. Ajouter les balises SEO dans toutes les pages
8. Générer `sitemap.xml` et vérifier `robots.txt`
9. Écrire `README.md`
