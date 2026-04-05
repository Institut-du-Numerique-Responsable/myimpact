# MyImpact — Multilingue, Corrections & SEO — Plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Corriger les bugs, mettre à jour jQuery, auto-héberger les polices, ajouter ES/IT/DE, et ajouter le SEO complet au projet myimpact.

**Architecture:** Site statique multi-langues avec un dossier par langue (`/fr/`, `/nl/`, `/es/`, `/it/`, `/de/`), CSS et jQuery partagés à la racine. Chaque langue a son propre `index.html` + `scripts.js`. Pas de build system, pas de bundler.

**Tech Stack:** HTML5, CSS3, jQuery 3.7.1, tarteaucitron (RGPD), hébergement OVH. Test local via `python3 -m http.server 8000`.

---

## Fichiers modifiés / créés

| Fichier | Action |
|---|---|
| `jquery-3.7.1.min.js` | Créer (remplace 3.3.1) |
| `fonts/montserrat-400.woff2` | Créer |
| `fonts/montserrat-600.woff2` | Créer |
| `fonts/montserrat-800.woff2` | Créer |
| `stylesheet-inr.css` | Modifier (chevron URL, @font-face) |
| `index.html` | Modifier (bugs, SEO, sélecteur langue, polices) |
| `scripts-en.js` | Modifier (bugs, pays, jQuery ref) |
| `fr/index.html` | Modifier (bug HTML, SEO, sélecteur langue, polices) |
| `fr/scripts.js` | Modifier (bugs, pays) |
| `nl/index.html` | Modifier (lang attr, SEO, sélecteur langue, polices) |
| `nl/scripts.js` | Modifier (bugs, pays) |
| `es/index.html` | Créer |
| `es/scripts.js` | Créer |
| `it/index.html` | Créer |
| `it/scripts.js` | Créer |
| `de/index.html` | Créer |
| `de/scripts.js` | Créer |
| `sitemap.xml` | Créer |
| `robots.txt` | Modifier (ajouter sitemap) |
| `README.md` | Créer |

---

## Task 1 : Mettre à jour jQuery (3.3.1 → 3.7.1)

**Files:**
- Create: `jquery-3.7.1.min.js`

- [ ] **Étape 1 : Télécharger jQuery 3.7.1**

```bash
cd /Users/ggallon/Downloads/myimpact
curl -L "https://code.jquery.com/jquery-3.7.1.min.js" -o jquery-3.7.1.min.js
```

- [ ] **Étape 2 : Vérifier le téléchargement**

```bash
head -1 jquery-3.7.1.min.js
# Attendu : /*! jQuery v3.7.1 ...
wc -c jquery-3.7.1.min.js
# Attendu : ~88 000 octets
```

- [ ] **Étape 3 : Commit**

```bash
git add jquery-3.7.1.min.js
git commit -m "chore: update jQuery 3.3.1 → 3.7.1"
```

---

## Task 2 : Auto-héberger les polices Montserrat

**Files:**
- Create: `fonts/montserrat-400.woff2`, `fonts/montserrat-600.woff2`, `fonts/montserrat-800.woff2`

- [ ] **Étape 1 : Créer le dossier et télécharger les polices**

```bash
cd /Users/ggallon/Downloads/myimpact
mkdir -p fonts

# Télécharger le CSS depuis Google Fonts avec un UA moderne pour obtenir woff2
FONT_CSS=$(curl -sH "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" \
  "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;800&display=swap")

# Extraire les URLs woff2 et télécharger
echo "$FONT_CSS" | grep -oE 'https://fonts\.gstatic\.com/[^)]+\.woff2' | while IFS= read -r url; do
  weight=$(echo "$FONT_CSS" | grep -B10 "$url" | grep "font-weight:" | tail -1 | grep -oE '[0-9]+')
  if [ -n "$weight" ]; then
    curl -sL "$url" -o "fonts/montserrat-${weight}.woff2"
    echo "Téléchargé : montserrat-${weight}.woff2"
  fi
done
```

- [ ] **Étape 2 : Vérifier les 3 fichiers**

```bash
ls -lh fonts/
# Attendu :
# montserrat-400.woff2  ~15–20 Ko
# montserrat-600.woff2  ~15–20 Ko
# montserrat-800.woff2  ~15–20 Ko
file fonts/montserrat-400.woff2
# Attendu : Web Open Font Format (Version 2), TrueType, length ...
```

- [ ] **Étape 3 : Commit**

```bash
git add fonts/
git commit -m "feat: auto-hébergement polices Montserrat (RGPD + offline)"
```

---

## Task 3 : Corriger le CSS

**Files:**
- Modify: `stylesheet-inr.css`

- [ ] **Étape 1 : Remplacer l'URL externe du chevron par un chemin relatif**

Dans `stylesheet-inr.css`, trouver et remplacer :
```css
/* AVANT */
background: url(https://monimpact.isit-europe.org/img/chevron.png) no-repeat center right #fff;

/* APRÈS */
background: url(img/chevron.png) no-repeat center right #fff;
```

- [ ] **Étape 2 : Ajouter les déclarations @font-face en tête de fichier**

Insérer au tout début de `stylesheet-inr.css`, avant toute autre règle :
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

- [ ] **Étape 3 : Vérifier visuellement**

```bash
python3 -m http.server 8000 --directory /Users/ggallon/Downloads/myimpact
# Ouvrir http://localhost:8000 dans le navigateur
# Vérifier que la police Montserrat s'affiche correctement
# Vérifier dans les DevTools (Network) : 0 requête vers fonts.googleapis.com
```

- [ ] **Étape 4 : Commit**

```bash
git add stylesheet-inr.css
git commit -m "fix: auto-hébergement polices dans CSS, correction URL chevron"
```

---

## Task 4 : Corriger `scripts-en.js`

**Files:**
- Modify: `scripts-en.js`

- [ ] **Étape 1 : Supprimer les variables globales orphelines et code mort (lignes 1–32)**

Remplacer le début du fichier (lignes 1 à 32, avant `var deviceTypes`) par :
```js
/* globals $ */
```

- [ ] **Étape 2 : Corriger les fautes d'orthographe MacBook (lignes 119, 123)**

```js
// AVANT
{"name": "Apple Mackbook Air 2010/2011", "production": 202.53, "usage": 48},
{"name": "Apple Mackbook Air 2013/2016", "production": 363.41, "usage": 48},

// APRÈS
{"name": "Apple MacBook Air 2010/2011", "production": 202.53, "usage": 48},
{"name": "Apple MacBook Air 2013/2016", "production": 363.41, "usage": 48},
```

- [ ] **Étape 3 : Supprimer `CO2streaming` inutilisé**

Supprimer la ligne :
```js
CO2streaming = 0.0015;
```

- [ ] **Étape 4 : Ajouter les nouveaux pays dans le tableau `countries`**

Remplacer le tableau `countries` par :
```js
countries = [
  {"indicator": "fr", "energyMix": 0.052},
  {"indicator": "be", "energyMix": 0.22},
  {"indicator": "ch", "energyMix": 0.027},
  {"indicator": "de", "energyMix": 0.420},
  {"indicator": "at", "energyMix": 0.158},
  {"indicator": "es", "energyMix": 0.207},
  {"indicator": "it", "energyMix": 0.233},
  {"indicator": "lu", "energyMix": 0.089}
],
```

- [ ] **Étape 5 : Commit**

```bash
git add scripts-en.js
git commit -m "fix: corrections scripts EN (MacBook typo, variables globales, pays)"
```

---

## Task 5 : Corriger `index.html` (EN)

**Files:**
- Modify: `index.html`

- [ ] **Étape 1 : Remplacer les balises Google Fonts et jQuery**

Remplacer dans le `<head>` :
```html
<!-- SUPPRIMER ces 3 lignes -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;800&display=swap" rel="stylesheet">

<!-- ET remplacer -->
<script src="jquery-3.3.1.min.js"></script>
<!-- PAR -->
<script src="jquery-3.7.1.min.js"></script>
```

- [ ] **Étape 2 : Corriger le texte dupliqué dans les résultats**

```html
<!-- AVANT -->
<h3 class="results__equivalents__title">What can I compare my total impact* to? *&nbsp;?</h3>

<!-- APRÈS -->
<h3 class="results__equivalents__title">What can I compare my total impact to?*</h3>
```

- [ ] **Étape 3 : Corriger le lien brisé The Shift Project**

```html
<!-- AVANT -->
<a href="#" title="Link to the source - New tab" target="_blank">Source: The Shift Project</a>

<!-- APRÈS -->
<a href="https://theshiftproject.org/article/lean-ict-notre-nouveau-rapport/" title="Link to the source - New tab" target="_blank">Source: The Shift Project</a>
```

- [ ] **Étape 4 : Ajouter les balises SEO dans le `<head>`**

Après `<meta name="description" ...>`, ajouter :
```html
<!-- SEO -->
<link rel="canonical" href="https://myimpact.isit-europe.org/" />
<link rel="alternate" hreflang="en" href="https://myimpact.isit-europe.org/" />
<link rel="alternate" hreflang="fr" href="https://myimpact.isit-europe.org/fr/" />
<link rel="alternate" hreflang="nl" href="https://myimpact.isit-europe.org/nl/" />
<link rel="alternate" hreflang="de" href="https://myimpact.isit-europe.org/de/" />
<link rel="alternate" hreflang="es" href="https://myimpact.isit-europe.org/es/" />
<link rel="alternate" hreflang="it" href="https://myimpact.isit-europe.org/it/" />
<link rel="alternate" hreflang="x-default" href="https://myimpact.isit-europe.org/" />
<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://myimpact.isit-europe.org/" />
<meta property="og:title" content="MyImpact | Digital Carbon Footprint Calculator" />
<meta property="og:description" content="Calculate your individual and professional digital environmental footprint in kg CO2 eq. Free tool by ISIT." />
<meta property="og:locale" content="en_GB" />
<meta property="og:image" content="https://myimpact.isit-europe.org/img/og-image.png" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="MyImpact | Digital Carbon Footprint Calculator" />
<meta name="twitter:description" content="Calculate your individual and professional digital environmental footprint in kg CO2 eq. Free tool by ISIT." />
<!-- Schema.org -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "MyImpact",
  "url": "https://myimpact.isit-europe.org/",
  "description": "Carbon footprint calculator for digital and professional usage",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Any",
  "inLanguage": "en",
  "offers": {"@type": "Offer", "price": "0", "priceCurrency": "EUR"},
  "author": [
    {"@type": "Organization", "name": "Institut du Numérique Responsable (INR)", "url": "https://institutnr.org"},
    {"@type": "Organization", "name": "ISIT Belgique", "url": "https://isit-be.org"},
    {"@type": "Organization", "name": "ISIT Suisse", "url": "https://isit-europe.org"}
  ]
}
</script>
```

- [ ] **Étape 5 : Mettre à jour le sélecteur de langue**

```html
<!-- REMPLACER -->
<div class="div-switch-language">
  <a class="switch-language" href="/" title="Link to access english version">EN</a>
  <a class="switch-language" href="/fr" title="Lien pour accéder à la version française">FR</a>
  <a class="switch-language" href="/nl" title="Link naar de Nederlandse versie">NL</a>
</div>

<!-- PAR -->
<div class="div-switch-language">
  <a class="switch-language" href="/" title="English">EN</a>
  <a class="switch-language" href="/fr/" title="Français">FR</a>
  <a class="switch-language" href="/nl/" title="Nederlands">NL</a>
  <a class="switch-language" href="/de/" title="Deutsch">DE</a>
  <a class="switch-language" href="/es/" title="Español">ES</a>
  <a class="switch-language" href="/it/" title="Italiano">IT</a>
</div>
```

- [ ] **Étape 6 : Ajouter les nouveaux pays dans le `<select id="select_country">`**

```html
<!-- REMPLACER -->
<select id="select_country">
  <option value="fr" selected="selected">France</option>
  <option value="be">Belgium</option>
  <option value="ch">Switzerland</option>
</select>

<!-- PAR -->
<select id="select_country">
  <option value="fr" selected="selected">France</option>
  <option value="be">Belgium</option>
  <option value="ch">Switzerland</option>
  <option value="de">Germany</option>
  <option value="at">Austria</option>
  <option value="es">Spain</option>
  <option value="it">Italy</option>
  <option value="lu">Luxembourg</option>
</select>
```

- [ ] **Étape 7 : Commit**

```bash
git add index.html
git commit -m "fix: corrections + SEO + langues EN index"
```

---

## Task 6 : Corriger `fr/index.html` et `fr/scripts.js`

**Files:**
- Modify: `fr/index.html`, `fr/scripts.js`

- [ ] **Étape 1 : Corriger le HTML cassé ligne 166 de `fr/index.html`**

```html
<!-- AVANT (cassé) -->
<option value="placeholder" naem="visio_tool>Choisissez...</option>

<!-- APRÈS -->
<option value="placeholder">Choisissez...</option>
```

- [ ] **Étape 2 : Supprimer Google Fonts et mettre à jour jQuery dans `fr/index.html`**

```html
<!-- SUPPRIMER -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;800&display=swap" rel="stylesheet">

<!-- REMPLACER -->
<script src="../jquery-3.3.1.min.js"></script>
<!-- PAR -->
<script src="../jquery-3.7.1.min.js"></script>
```

- [ ] **Étape 3 : Mettre à jour le sélecteur de langue dans `fr/index.html`**

```html
<!-- REMPLACER -->
<div class="div-switch-language">
  <a class="switch-language" href="/" title="Link to access english version">EN</a>
  <a class="switch-language" href="./" title="Lien pour accéder à la version française">FR</a>
  <a class="switch-language" href="/nl" title="Link naar de Nederlandse versie">NL</a>
</div>

<!-- PAR -->
<div class="div-switch-language">
  <a class="switch-language" href="/" title="English">EN</a>
  <a class="switch-language" href="/fr/" title="Français">FR</a>
  <a class="switch-language" href="/nl/" title="Nederlands">NL</a>
  <a class="switch-language" href="/de/" title="Deutsch">DE</a>
  <a class="switch-language" href="/es/" title="Español">ES</a>
  <a class="switch-language" href="/it/" title="Italiano">IT</a>
</div>
```

- [ ] **Étape 4 : Ajouter les nouveaux pays dans le select FR**

```html
<select name="select_country" id="select_country">
  <option value="fr" selected="selected">France</option>
  <option value="be">Belgique</option>
  <option value="ch">Suisse</option>
  <option value="de">Allemagne</option>
  <option value="at">Autriche</option>
  <option value="es">Espagne</option>
  <option value="it">Italie</option>
  <option value="lu">Luxembourg</option>
</select>
```

- [ ] **Étape 5 : Ajouter les balises SEO dans `fr/index.html`**

Après `<meta name="description" ...>` :
```html
<link rel="canonical" href="https://myimpact.isit-europe.org/fr/" />
<link rel="alternate" hreflang="en" href="https://myimpact.isit-europe.org/" />
<link rel="alternate" hreflang="fr" href="https://myimpact.isit-europe.org/fr/" />
<link rel="alternate" hreflang="nl" href="https://myimpact.isit-europe.org/nl/" />
<link rel="alternate" hreflang="de" href="https://myimpact.isit-europe.org/de/" />
<link rel="alternate" hreflang="es" href="https://myimpact.isit-europe.org/es/" />
<link rel="alternate" hreflang="it" href="https://myimpact.isit-europe.org/it/" />
<link rel="alternate" hreflang="x-default" href="https://myimpact.isit-europe.org/" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://myimpact.isit-europe.org/fr/" />
<meta property="og:title" content="MyImpact | Calculatrice empreinte carbone numérique" />
<meta property="og:description" content="Calculez votre empreinte environnementale numérique individuelle et professionnelle en kg CO2 éq. Outil gratuit par l'INR." />
<meta property="og:locale" content="fr_FR" />
<meta property="og:image" content="https://myimpact.isit-europe.org/img/og-image.png" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="MyImpact | Calculatrice empreinte carbone numérique" />
<meta name="twitter:description" content="Calculez votre empreinte environnementale numérique individuelle et professionnelle en kg CO2 éq. Outil gratuit par l'INR." />
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "MyImpact",
  "url": "https://myimpact.isit-europe.org/fr/",
  "description": "Calculatrice d'empreinte carbone numérique et professionnelle",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Any",
  "inLanguage": "fr",
  "offers": {"@type": "Offer", "price": "0", "priceCurrency": "EUR"},
  "author": [
    {"@type": "Organization", "name": "Institut du Numérique Responsable (INR)", "url": "https://institutnr.org"},
    {"@type": "Organization", "name": "ISIT Belgique", "url": "https://isit-be.org"},
    {"@type": "Organization", "name": "ISIT Suisse", "url": "https://isit-europe.org"}
  ]
}
</script>
```

- [ ] **Étape 6 : Corriger `fr/scripts.js` — variables orphelines, MacBook, pays**

Remplacer les lignes 1–30 (code mort) par :
```js
/* globals $ */
```

Corriger MacBook :
```js
{"name": "Apple MacBook Air 2010/2011", "production": 202.53, "usage": 48},
{"name": "Apple MacBook Air 2013/2016", "production": 363.41, "usage": 48},
```

Mettre à jour `countries` :
```js
countries = [
  {"indicator": "fr", "energyMix": 0.052},
  {"indicator": "be", "energyMix": 0.22},
  {"indicator": "ch", "energyMix": 0.027},
  {"indicator": "de", "energyMix": 0.420},
  {"indicator": "at", "energyMix": 0.158},
  {"indicator": "es", "energyMix": 0.207},
  {"indicator": "it", "energyMix": 0.233},
  {"indicator": "lu", "energyMix": 0.089}
],
```

- [ ] **Étape 7 : Commit**

```bash
git add fr/index.html fr/scripts.js
git commit -m "fix: corrections + SEO + pays version FR"
```

---

## Task 7 : Corriger `nl/index.html` et `nl/scripts.js`

**Files:**
- Modify: `nl/index.html`, `nl/scripts.js`

- [ ] **Étape 1 : Corriger l'attribut lang erroné dans `nl/index.html`**

```html
<!-- AVANT (bug) -->
<html lang="fr">

<!-- APRÈS -->
<html lang="nl">
```

- [ ] **Étape 2 : Corriger le favicon cassé**

```html
<!-- AVANT (chemin manquant) -->
<link rel="shortcut icon" href="img/favicon.ico" />

<!-- APRÈS -->
<link rel="shortcut icon" href="../img/favicon.ico" />
```

- [ ] **Étape 3 : Supprimer Google Fonts, mettre à jour jQuery**

Mêmes changements que FR (remplacer les 3 `<link>` Google Fonts, jQuery 3.3.1 → 3.7.1 avec `../`).

- [ ] **Étape 4 : Mettre à jour le sélecteur de langue**

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

- [ ] **Étape 5 : Ajouter les nouveaux pays dans le select NL**

```html
<select id="select_country">
  <option value="be" selected="selected">België</option>
  <option value="nl">Nederland</option>
  <option value="fr">Frankrijk</option>
  <option value="ch">Zwitserland</option>
  <option value="de">Duitsland</option>
  <option value="at">Oostenrijk</option>
  <option value="es">Spanje</option>
  <option value="it">Italië</option>
  <option value="lu">Luxemburg</option>
</select>
```

Note : ajouter `nl` (Pays-Bas, 0.284 kg/kWh) dans le tableau `countries` aussi.

- [ ] **Étape 6 : Ajouter les balises SEO dans `nl/index.html`**

```html
<link rel="canonical" href="https://myimpact.isit-europe.org/nl/" />
<link rel="alternate" hreflang="en" href="https://myimpact.isit-europe.org/" />
<link rel="alternate" hreflang="fr" href="https://myimpact.isit-europe.org/fr/" />
<link rel="alternate" hreflang="nl" href="https://myimpact.isit-europe.org/nl/" />
<link rel="alternate" hreflang="de" href="https://myimpact.isit-europe.org/de/" />
<link rel="alternate" hreflang="es" href="https://myimpact.isit-europe.org/es/" />
<link rel="alternate" hreflang="it" href="https://myimpact.isit-europe.org/it/" />
<link rel="alternate" hreflang="x-default" href="https://myimpact.isit-europe.org/" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://myimpact.isit-europe.org/nl/" />
<meta property="og:title" content="MyImpact | Rekenmachine digitale CO2-voetafdruk" />
<meta property="og:description" content="Bereken uw individuele en professionele digitale ecologische voetafdruk in kg CO2-equivalent. Gratis tool van ISIT." />
<meta property="og:locale" content="nl_BE" />
<meta property="og:image" content="https://myimpact.isit-europe.org/img/og-image.png" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="MyImpact | Rekenmachine digitale CO2-voetafdruk" />
<meta name="twitter:description" content="Bereken uw individuele en professionele digitale ecologische voetafdruk in kg CO2-equivalent. Gratis tool van ISIT." />
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "MyImpact",
  "url": "https://myimpact.isit-europe.org/nl/",
  "description": "Rekenmachine voor digitale en professionele CO2-voetafdruk",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Any",
  "inLanguage": "nl",
  "offers": {"@type": "Offer", "price": "0", "priceCurrency": "EUR"},
  "author": [
    {"@type": "Organization", "name": "Institut du Numérique Responsable (INR)", "url": "https://institutnr.org"},
    {"@type": "Organization", "name": "ISIT Belgique", "url": "https://isit-be.org"},
    {"@type": "Organization", "name": "ISIT Suisse", "url": "https://isit-europe.org"}
  ]
}
</script>
```

- [ ] **Étape 7 : Mettre à jour `nl/scripts.js`**

Supprimer lignes 1–30 (code mort), corriger MacBook, mettre à jour `countries` (ajouter `nl`, `de`, `at`, `es`, `it`, `lu`) :
```js
/* globals $ */

var deviceTypes = [ /* inchangé */ ],
/* ... */
countries = [
  {"indicator": "be", "energyMix": 0.22},
  {"indicator": "nl", "energyMix": 0.284},
  {"indicator": "fr", "energyMix": 0.052},
  {"indicator": "ch", "energyMix": 0.027},
  {"indicator": "de", "energyMix": 0.420},
  {"indicator": "at", "energyMix": 0.158},
  {"indicator": "es", "energyMix": 0.207},
  {"indicator": "it", "energyMix": 0.233},
  {"indicator": "lu", "energyMix": 0.089}
],
```

- [ ] **Étape 8 : Commit**

```bash
git add nl/index.html nl/scripts.js
git commit -m "fix: corrections + SEO + pays version NL"
```

---

## Task 8 : Créer la version Espagnol (ES)

**Files:**
- Create: `es/index.html`, `es/scripts.js`

- [ ] **Étape 1 : Créer `es/index.html`**

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <title>ISIT | Evaluación de mi huella ambiental digital individual/profesional</title>
    <meta name="description" content="El ISIT ha creado una calculadora que permite calcular de forma sencilla nuestro impacto digital profesional en kg CO2 eq." />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="stylesheet" href="../stylesheet-inr.css" />
    <script src="../jquery-3.7.1.min.js"></script>
    <script src="scripts.js"></script>
    <link rel="shortcut icon" href="../img/favicon.ico" />
    <link rel="icon" href="../img/favicon-32x32.png" sizes="32x32" />
    <link rel="icon" href="../img/android-chrome-192x192.png" sizes="192x192" />
    <link rel="apple-touch-icon-precomposed" href="../img/apple-touch-icon.png" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <!-- SEO -->
    <link rel="canonical" href="https://myimpact.isit-europe.org/es/" />
    <link rel="alternate" hreflang="en" href="https://myimpact.isit-europe.org/" />
    <link rel="alternate" hreflang="fr" href="https://myimpact.isit-europe.org/fr/" />
    <link rel="alternate" hreflang="nl" href="https://myimpact.isit-europe.org/nl/" />
    <link rel="alternate" hreflang="de" href="https://myimpact.isit-europe.org/de/" />
    <link rel="alternate" hreflang="es" href="https://myimpact.isit-europe.org/es/" />
    <link rel="alternate" hreflang="it" href="https://myimpact.isit-europe.org/it/" />
    <link rel="alternate" hreflang="x-default" href="https://myimpact.isit-europe.org/" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://myimpact.isit-europe.org/es/" />
    <meta property="og:title" content="MyImpact | Calculadora de huella de carbono digital" />
    <meta property="og:description" content="Calcule su huella ambiental digital individual y profesional en kg CO2 eq. Herramienta gratuita del ISIT." />
    <meta property="og:locale" content="es_ES" />
    <meta property="og:image" content="https://myimpact.isit-europe.org/img/og-image.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="MyImpact | Calculadora de huella de carbono digital" />
    <meta name="twitter:description" content="Calcule su huella ambiental digital individual y profesional en kg CO2 eq. Herramienta gratuita del ISIT." />
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "MyImpact",
      "url": "https://myimpact.isit-europe.org/es/",
      "description": "Calculadora de huella de carbono digital y profesional",
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "Any",
      "inLanguage": "es",
      "offers": {"@type": "Offer", "price": "0", "priceCurrency": "EUR"},
      "author": [
        {"@type": "Organization", "name": "Institut du Numérique Responsable (INR)", "url": "https://institutnr.org"},
        {"@type": "Organization", "name": "ISIT Belgique", "url": "https://isit-be.org"},
        {"@type": "Organization", "name": "ISIT Suisse", "url": "https://isit-europe.org"}
      ]
    }
    </script>
    <script type="text/javascript" src="../tarteaucitron/tarteaucitron.js"></script>
    <script>
      tarteaucitron.user.matomoId = 8;
      (tarteaucitron.job = tarteaucitron.job || []).push('matomo');
      tarteaucitron.user.matomoHost = 'https://analytics.academie-nr.org';
      var _paq = window._paq = window._paq || [];
      _paq.push(['trackPageView']);
      _paq.push(['enableLinkTracking']);
      (function() {
        var u="//analytics.academie-nr.org/";
        _paq.push(['setTrackerUrl', u+'matomo.php']);
        _paq.push(['setSiteId', '8']);
        var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
        g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
      })();
    </script>
  </head>
  <body>
    <header class="header">
      <div id="head">
        <div id="head_container">
          <div id="logo"><img src="../img/isit.png" alt="ISIT, Institute for Sustainable IT" /></div>
          <div class="div-switch-language">
            <a class="switch-language" href="/" title="English">EN</a>
            <a class="switch-language" href="/fr/" title="Français">FR</a>
            <a class="switch-language" href="/nl/" title="Nederlands">NL</a>
            <a class="switch-language" href="/de/" title="Deutsch">DE</a>
            <a class="switch-language" href="/es/" title="Español">ES</a>
            <a class="switch-language" href="/it/" title="Italiano">IT</a>
          </div>
        </div>
        <div id="title">
          <h1>Evaluación de mi huella ambiental digital individual/profesional en kg CO<sub>2</sub> eq.</h1>
          <div class="version">Versión 1.1 publicada el 4 de julio de 2022</div>
        </div>
        <div class="head-wrapper">
          <div id="header_text">
            <p>Nuestro uso de la tecnología digital aumenta constantemente, tanto en el ámbito personal como profesional. Nuestros impactos son difíciles de cuantificar porque están desmaterializados. Sin embargo, ahora existen muchas herramientas de medición para facilitar este proceso.</p>
            <div class="panel">
              <p>Para arrojar luz sobre los impactos vinculados a nuestro consumo excesivo de tecnología digital, el ISIT ha creado una calculadora que nos permite calcular de forma sencilla nuestro impacto digital profesional. La arquitectura de la calculadora v1.0 fue puesta a disposición del INR por Decathlon. La versión 1.1 se desplegó en julio de 2022 con indicadores actualizados y la adición de nuevas secciones para refinar el cálculo.</p>
              <p>Los datos provienen principalmente del centro de recursos de gases de efecto invernadero de la ADEME, el programa ENERGY STAR y la herramienta en línea NUTS, un datalake con datos de fabricantes sobre emisiones de GEI.</p>
            </div>
            <button type="button" class="collapsible">Leer más</button>
          </div>
          <nav class="direct-access">
            <h2 class="direct-access__title">Resumen</h2>
            <ul class="direct-access__list">
              <li><a class="direct-access__link" href="#device">Equipos</a></li>
              <li><a class="direct-access__link" href="#online">Uso online</a></li>
              <li><a class="direct-access__link" href="#cloud">Almacenamiento en la nube</a></li>
              <li><a class="direct-access__link" href="#emails">Envío de correos</a></li>
              <li><a class="direct-access__link" href="#business-trips">Viajes de negocio</a></li>
              <li><a class="direct-access__link" href="#total_impact_section">Mi impacto en kg CO<sub>2</sub> eq. / año</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
    <div id="page">
      <div id="content">
        <div class="background-image"></div>
        <div id="data">
          <section id="device" class="section">
            <header class="section__header">
              <h2 class="section__title">Equipos</h2>
              <div class="section__intro">
                <p>La fabricación de equipos representa la gran mayoría de la huella digital. Los requisitos medios de materiales y recursos para fabricar equipos de oficina representan más del 70% del balance ambiental de su ciclo de vida, durante un período de uso promedio de 5 años (<a href="https://librairie.ademe.fr/cadic/6555/guide-en-route-vers-sobriete-numerique.pdf" title="Enlace a la fuente - Nueva pestaña" target="_blank">Fuente ADEME - PDF, 2,5 MB</a>).</p>
                <p>El impacto vinculado a la fabricación es un equivalente en kgCO2 proporcionado por el fabricante según el modelo. La duración de uso permite tener en cuenta el impacto total del uso de este equipo y calcular un promedio por año, incluyendo el impacto de la fabricación.</p>
              </div>
            </header>
            <div class="section__main">
              <div class="input_part">
                <label class="question" for="select_country">Mi ubicación</label>
                <div class="answer">
                  <select id="select_country">
                    <option value="es" selected="selected">España</option>
                    <option value="fr">Francia</option>
                    <option value="be">Bélgica</option>
                    <option value="ch">Suiza</option>
                    <option value="de">Alemania</option>
                    <option value="at">Austria</option>
                    <option value="it">Italia</option>
                    <option value="lu">Luxemburgo</option>
                  </select>
                </div>
                <div class="groupe" data-device-id="1">
                  <div class="device-title">Mi equipo n°1</div>
                  <div class="groupe__inner">
                    <div class="qOne">
                      <label class="question" for="model">Modelo</label>
                      <div class="answer">
                        <select data-device-field="model" id="model"></select>
                      </div>
                    </div>
                    <div class="qTwo">
                      <label class="question" for="lifetime">Duración de uso (años)</label>
                      <div class="answer">
                        <select data-device-field="lifetime" id="lifetime">
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3" selected="selected">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <button class="add-device" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="40%" style="margin-right: 1rem;" fill="currentColor"><path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"/></svg>
                  Añadir un equipo
                </button>
              </div>
              <div class="boxes">
                <div class="box"><h3>FABRICACIÓN</h3><div id="device_production_1">0</div></div>
                <div class="box"><h3>USO</h3><div id="device_use_1">0</div></div>
                <div class="box -total"><h3>TOTAL</h3><div id="device_total_1">0</div></div>
                <div class="box"><h3>ANUAL</h3><div id="device_impact_annuel_1">0</div></div>
              </div>
            </div>
          </section>
          <section id="online" class="section">
            <header class="section__header">
              <h2 class="section__title">Uso online</h2>
              <div class="section__intro">
                <p>Hoy en día, el consumo de vídeo representa más del 60% del ancho de banda mundial (<a href="https://theshiftproject.org/article/lean-ict-notre-nouveau-rapport/" title="Enlace a la fuente - Nueva pestaña" target="_blank">Fuente: The Shift Project</a>).</p>
              </div>
            </header>
            <div class="section__main">
              <div class="input_part">
                <div class="groupe">
                  <div class="groupe__inner">
                    <div>
                      <label for="visio_tool" class="question">Herramienta de videoconferencia más utilizada</label>
                      <div class="answer"><select id="visio_tool"><option value="placeholder">Elegir...</option></select></div>
                    </div>
                    <div class="visio-hours-wrapper">
                      <label for="visio_hours" class="question">Horas por semana</label>
                      <div class="answer"><input type="number" id="visio_hours" min="0"></div>
                    </div>
                    <div>
                      <label for="visio_camera" class="question">Cámara más a menudo...</label>
                      <div class="answer">
                        <select id="visio_camera">
                          <option value="on">Encendida</option>
                          <option value="off">Apagada</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <label for="surf_hours" class="question">Horas de navegación web por semana</label>
                <div class="answer"><input type="number" id="surf_hours" min="0"></div>
              </div>
              <div class="boxes">
                <div class="box"><h3>SEMANAL</h3><div id="impact_visio_weekly">0</div><div id="impact_surf_weekly">0</div></div>
                <div class="box"><h3>ANUAL</h3><div id="impact_visio_annuel">0</div><div id="impact_surf_annuel">0</div></div>
              </div>
            </div>
          </section>
          <section id="cloud" class="section">
            <header class="section__header">
              <h2 class="section__title">Almacenamiento en la nube</h2>
              <div class="section__intro">
                <p>La huella que podemos estimar para el manejo de datos en la nube sigue sujeta a estudios existentes con resultados dispares.</p>
                <p>Hemos elegido utilizar las cifras del <a href="https://www.umweltbundesamt.de/sites/default/files/medien/5750/publikationen/2021-06-17_texte_94-2021_green-cloud-computing.pdf" title="Enlace a la fuente - Nueva pestaña" target="_blank">estudio Green Cloud Computing (2021) - PDF, 4,4 MB</a> basado en los trabajos de Umweltbundesamt (la Agencia Federal de Medio Ambiente alemana) que permite un enfoque racional del tema, utilizado como referencia por DINUM (209,5 g CO<sub>2</sub> / GB / año).</p>
              </div>
            </header>
            <div class="section__main">
              <div class="input_part">
                <label for="storage_google" class="question">Mi almacenamiento en la nube en Gb</label>
                <div class="answer"><input type="number" id="storage_google" min="0"></div>
              </div>
              <div class="boxes"><div class="box"><h3>ANUAL</h3><div id="storage_google_annuel"></div></div></div>
            </div>
          </section>
          <section id="emails" class="section">
            <header class="section__header">
              <h2 class="section__title">Envío de correos electrónicos</h2>
              <div class="section__intro">
                <p>La parte de la huella ambiental vinculada al correo electrónico sigue siendo muy pequeña. Pero es importante saber que cuanto más pesado es el correo electrónico, mayor es su impacto, y esto se multiplica por el número de destinatarios.</p>
                <p>El reto es ante todo ser conscientes de la inmensa cantidad de datos que manipulamos sin preocuparnos siempre por el tamaño de cada archivo transferido.</p>
              </div>
            </header>
            <div class="section__main">
              <div class="input_part">
                <label for="num_emails_without_attachments" class="question">Número de correos enviados por día (SIN adjuntos)</label>
                <div class="answer"><input type="number" id="num_emails_without_attachments" min="0"></div>
                <label for="num_emails_with_attachments" class="question">Número de correos enviados por día (CON adjuntos)</label>
                <div class="answer"><input type="number" id="num_emails_with_attachments" min="0"></div>
              </div>
              <div class="boxes">
                <div class="box"><h3>DIARIO</h3><div id="impact_emails_without_attachments_quotidien">0</div><div id="impact_emails_with_attachments_quotidien">0</div></div>
                <div class="box"><h3>ANUAL</h3><div id="impact_emails_without_attachments_annuel">0</div><div id="impact_emails_with_attachments_annuel">0</div></div>
              </div>
            </div>
          </section>
          <section id="business-trips" class="section">
            <header class="section__header">
              <h2 class="section__title">Viajes de negocio</h2>
              <div class="section__intro">
                <p>En el mundo profesional, no solo la tecnología digital tiene un impacto negativo en el medio ambiente. ¡Los viajes también juegan un papel importante! Le invitamos a comparar el impacto de sus viajes de negocio, incluidos los desplazamientos al trabajo, con el de la tecnología digital.</p>
                <p class="u-color-meta">Herramienta para calcular distancias: <a href="https://www.distance.to/" title="Enlace a la herramienta - Nueva pestaña" target="_blank">https://www.distance.to</a></p>
              </div>
            </header>
            <div class="section__main">
              <div class="input_part">
                <label for="deplacement_plane" class="question">Kilómetros recorridos en avión / año</label>
                <div class="answer"><input type="number" id="deplacement_plane" min="0"></div>
                <label for="deplacement_train" class="question">Kilómetros recorridos en tren / año</label>
                <div class="answer"><input type="number" id="deplacement_train" min="0"></div>
                <label for="deplacement_car" class="question">Kilómetros recorridos en coche / año</label>
                <div class="answer"><input type="number" id="deplacement_car" min="0"></div>
                <label for="deplacement_velo" class="question">Kilómetros recorridos en bicicleta o a pie / año</label>
                <div class="answer"><input type="number" id="deplacement_velo" min="0"></div>
              </div>
              <div class="boxes">
                <div class="box"><h3>ANUAL</h3><div id="impact_plane_annuel"></div><div id="impact_train_annuel"></div><div id="impact_car_annuel"></div><div>0</div></div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
    <footer class="footer">
      <div class="footer__inner">
        <div class="results" id="total_impact_section">
          <h2 class="results__title">Mi impacto <span class="results__title__meta">en kg CO<sub>2</sub> eq.</span></h2>
          <div class="results__grid">
            <div class="results__grid__item -width-40">
              <div class="results__sum">
                <div class="results__sum__item">
                  <div class="results__variable"><div class="results__variable__content"><div class="results__variable__value" id="total_impact_numerique"></div><div class="results__variable__name">Digital</div></div></div>
                </div>
                <div class="results__sum__item">
                  <div class="results__variable"><div class="results__variable__content"><div class="results__variable__value" id="total_impact_deplacement"></div><div class="results__variable__name">Viajes</div></div></div>
                </div>
              </div>
              <div class="results__total">
                <div class="results__variable -theme-white">
                  <div class="results__variable__content"><div class="results__variable__value" id="total_impact"></div><div class="results__variable__name">Mi impacto total por año</div></div>
                  <div class="results__variable__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor" width="50%"><path d="M304 16.58C304 7.555 310.1 0 320 0C443.7 0 544 100.3 544 224C544 233 536.4 240 527.4 240H304V16.58zM32 272C32 150.7 122.1 50.34 238.1 34.25C248.2 32.99 256 40.36 256 49.61V288L412.5 444.5C419.2 451.2 418.7 462.2 411 467.7C371.8 495.6 323.8 512 272 512C139.5 512 32 404.6 32 272zM558.4 288C567.6 288 575 295.8 573.8 305C566.1 360.9 539.1 410.6 499.9 447.3C493.9 452.1 484.5 452.5 478.7 446.7L320 288H558.4z"/></svg></div>
                </div>
              </div>
            </div>
            <div class="results__grid__item -width-60">
              <div class="results__charts">
                <div class="results__charts__item">
                  <div class="results__chart">
                    <div class="pie"><div class="pie__value" id="p_carbon_footprint_per_resident"></div><div class="pie__segment" style="--bg: #fff; --offset: 0;"></div><div class="pie__segment" style="--bg: #0d3146;"></div></div>
                    <div class="results__chart__legend">
                      <div class="results__chart__legend__title">De la huella de carbono promedio de un ciudadano europeo</div>
                      <div class="results__chart__legend__info">Media estimada de 9,9 toneladas de CO<sub>2</sub> eq. / habitante / año<br />(Fuente: SDES &amp; Carbone4)</div>
                    </div>
                  </div>
                </div>
                <div class="results__charts__item">
                  <div class="results__chart">
                    <div class="pie"><div class="pie__value" id="p_target_2050"></div><div class="pie__segment" style="--bg: #fff; --offset: 0;"></div><div class="pie__segment" style="--bg: #0d3146;"></div></div>
                    <div class="results__chart__legend">
                      <div class="results__chart__legend__title">% De la cuota a respetar en 2050 para cumplir con el <a href="https://unfccc.int/fr/processus-et-reunions/l-accord-de-paris/l-accord-de-paris" title="Enlace a la fuente - Nueva pestaña" target="_blank">Acuerdo de París</a></div>
                      <div class="results__chart__legend__info">Fijado en 2 toneladas de CO<sub>2</sub> eq. / año por habitante</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="results__grid__item -width-100">
              <div class="results__equivalents">
                <div class="results__equivalents__item">
                  <h3 class="results__equivalents__title">¿Con qué puedo comparar mi impacto total?*</h3>
                  <div class="results__equivalents__intro">Algunos ejemplos...<br />Fuente: <a href="https://monconvertisseurco2.fr/" title="Enlace a la fuente - Nueva pestaña" target="_blank">My CO<sub>2</sub> Converter</a><br />*Impacto total = digital + viajes</div>
                </div>
                <div class="results__equivalents__item">
                  <div class="results__variable -theme-rose"><div class="results__variable__content"><div class="results__variable__value" id="impact_eq_beef_meal"></div><div class="results__variable__name">comidas con carne de vacuno</div></div><div class="results__variable__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width="50%"><path d="M481.9 270.1C490.9 279.1 496 291.3 496 304C496 316.7 490.9 328.9 481.9 337.9C472.9 346.9 460.7 352 448 352H64C51.27 352 39.06 346.9 30.06 337.9C21.06 328.9 16 316.7 16 304C16 291.3 21.06 279.1 30.06 270.1C39.06 261.1 51.27 256 64 256H448C460.7 256 472.9 261.1 481.9 270.1zM475.3 388.7C478.3 391.7 480 395.8 480 400V416C480 432.1 473.3 449.3 461.3 461.3C449.3 473.3 432.1 480 416 480H96C79.03 480 62.75 473.3 50.75 461.3C38.74 449.3 32 432.1 32 416V400C32 395.8 33.69 391.7 36.69 388.7C39.69 385.7 43.76 384 48 384H464C468.2 384 472.3 385.7 475.3 388.7zM50.39 220.8C45.93 218.6 42.03 215.5 38.97 211.6C35.91 207.7 33.79 203.2 32.75 198.4C31.71 193.5 31.8 188.5 32.99 183.7C54.98 97.02 146.5 32 256 32C365.5 32 457 97.02 479 183.7C480.2 188.5 480.3 193.5 479.2 198.4C478.2 203.2 476.1 207.7 473 211.6C469.1 215.5 466.1 218.6 461.6 220.8C457.2 222.9 452.3 224 447.3 224H64.67C59.73 224 54.84 222.9 50.39 220.8z"/></svg></div></div>
                </div>
                <div class="results__equivalents__item">
                  <div class="results__variable -theme-indigo"><div class="results__variable__content"><div class="results__variable__value" id="impact_eq_car_km"></div><div class="results__variable__name">km en coche<br /><span id="impact_eq_paris_brussels"></span> trayectos París / Bruselas</div></div><div class="results__variable__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor" width="50%"><path d="M640 320V368C640 385.7 625.7 400 608 400H574.7C567.1 445.4 527.6 480 480 480C432.4 480 392.9 445.4 385.3 400H254.7C247.1 445.4 207.6 480 160 480C112.4 480 72.94 445.4 65.33 400H32C14.33 400 0 385.7 0 368V256C0 228.9 16.81 205.8 40.56 196.4L82.2 92.35C96.78 55.9 132.1 32 171.3 32H353.2C382.4 32 409.1 45.26 428.2 68.03L528.2 193C591.2 200.1 640 254.8 640 319.1V320z"/></svg></div></div>
                </div>
                <div class="results__equivalents__item">
                  <div class="results__variable -theme-blue"><div class="results__variable__content"><div class="results__variable__value" id="impact_eq_plane_km"></div><div class="results__variable__name">km en avión<br /><span id="impact_eq_ar_paris_nyc"></span> viajes de ida y vuelta París / Nueva York</div></div><div class="results__variable__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor" width="50%"><path d="M484.6 62C502.6 52.8 522.6 48 542.8 48H600.2C627.2 48 645.9 74.95 636.4 100.2C618.2 148.9 582.1 188.9 535.6 212.2L262.8 348.6C258.3 350.8 253.4 352 248.4 352H110.7C101.4 352 92.5 347.9 86.42 340.8L13.34 255.6C6.562 247.7 9.019 235.5 18.33 230.8L50.49 214.8C59.05 210.5 69.06 210.2 77.8 214.1L135.1 239.1L234.6 189.7L87.64 95.2C77.21 88.49 78.05 72.98 89.14 67.43L135 44.48C150.1 36.52 169.5 35.55 186.1 41.8L381 114.9L484.6 62z"/></svg></div></div>
                </div>
                <div class="results__equivalents__item">
                  <div class="results__variable -theme-emerald"><div class="results__variable__content"><div class="results__variable__value" id="impact_eq_laptop"></div><div class="results__variable__name">ordenadores portátiles fabricados</div></div><div class="results__variable__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor" width="50%"><path d="M128 96h384v256h64v-272c0-26.38-21.62-48-48-48h-416c-26.38 0-48 21.62-48 48V352h64V96zM624 383.1h-608c-8.75 0-16 7.25-16 16v16c0 35.25 28.75 64 64 64h512c35.25 0 64-28.75 64-64v-16C640 391.2 632.8 383.1 624 383.1z"/></svg></div></div>
                </div>
                <div class="results__equivalents__item">
                  <div class="results__variable -theme-yellow"><div class="results__variable__content"><div class="results__variable__value" id="impact_eq_smartphone"></div><div class="results__variable__name">smartphones fabricados</div></div><div class="results__variable__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor" height="50%"><path d="M320 0H64C37.5 0 16 21.5 16 48v416C16 490.5 37.5 512 64 512h256c26.5 0 48-21.5 48-48v-416C368 21.5 346.5 0 320 0zM240 447.1C240 456.8 232.8 464 224 464H159.1C151.2 464 144 456.8 144 448S151.2 432 160 432h64C232.8 432 240 439.2 240 447.1zM304 384h-224V64h224V384z"/></svg></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="credits">
          <h2 class="credits__title">Sobre el ISIT</h2>
          <p>El ISIT (<a href="https://isit-europe.org" title="Enlace al sitio web del ISIT - Nueva pestaña" target="_blank">Institute for Sustainable IT</a>) es un think &amp; do tank cuya misión es abordar los tres problemas clave del IT Sostenible: reducir la huella digital (económica, social y ambiental), la capacidad de la tecnología digital para reducir la huella de la humanidad, y la creación de valor sostenible / innovación responsable a través de la tecnología digital.</p>
          <p>El <a href="https://isit-be.org/the-institute" title="Enlace al sitio web del ISIT - Nueva pestaña" target="_blank">ISIT</a> está presente en tres países (Francia, Bélgica y Suiza) y cuenta con casi 200 organizaciones miembros (julio de 2022).</p>
          <p>Esta calculadora fue creada en 2020 y actualizada en julio de 2022.</p>
          <p class="opacity-light">Actualización de julio de 2022 por <a href="https://athom.co/" target="_blank">athom</a><br />Contribución inicial 2020 de <a href="https://www.linkedin.com/in/gontier-julien-06653312" target="_blank">Julien Gontier</a> (Decathlon)</p>
          <p class="opacity-light"><a href="../about-sustainable-it.html" title="Ver las fuentes">Ver el detalle de las fuentes para los cálculos</a> | <a href="../legal-notice.html" title="Aviso legal">Aviso legal</a></p>
        </div>
      </div>
    </footer>
    <script>
      var acc = document.getElementsByClassName("collapsible"); var i;
      for (i = 0; i < acc.length; i++) { acc[i].addEventListener("click", function () { this.classList.toggle("active"); var panel = this.previousElementSibling; if (panel.style.maxHeight) { panel.style.maxHeight = null; } else { panel.style.maxHeight = panel.scrollHeight + "px"; } }); }
      $(document).ready(function () { $('.info').stop().mouseout(function () { $(this).parents('.question').next('.encart').hide('slow'); return false; }); $('.encart').stop().click(function () { $('.encart').hide('fast'); return false; }); $('.info').stop().mouseover(function () { $(this).parents('.question').next('.encart').show('fast'); return false; }); });
    </script>
  </body>
</html>
```

- [ ] **Étape 2 : Créer `es/scripts.js`**

```js
/* globals $ */

var deviceTypes = [
  {
    "name": "Ordenador de sobremesa",
    "devices": [
      {"name": "Apple iMac 21,5 pulgadas", "production": 406.16, "usage": 151},
      {"name": "Apple iMac 27 pulgadas", "production": 589.98, "usage": 151},
      {"name": "Apple iMac Pro", "production": 674.28, "usage": 151},
      {"name": "Apple Mac Mini", "production": 486.6, "usage": 151},
      {"name": "Lenovo ThinkStation", "production": 994.38, "usage": 151},
      {"name": "Lenovo Ideacentre", "production": 487.79, "usage": 151},
      {"name": "Lenovo Legion", "production": 499.03, "usage": 151},
      {"name": "Lenovo other", "production": 420.32, "usage": 151},
      {"name": "HP Thin", "production": 111.13, "usage": 151},
      {"name": "HP Workstation", "production": 807.01, "usage": 151},
      {"name": "HP other", "production": 484.74, "usage": 151},
      {"name": "Fujitsu Primergy", "production": 2536.74, "usage": 151},
      {"name": "Fujitsu other", "production": 478.11, "usage": 151},
      {"name": "Dell", "production": 320.86, "usage": 151},
      {"name": "Sobremesa other", "production": 294.93, "usage": 151}
    ]
  },
  {
    "name": "Portátil",
    "devices": [
      {"name": "Apple MacBook Air 2010/2011", "production": 202.53, "usage": 48},
      {"name": "Apple MacBook Air 2013/2016", "production": 363.41, "usage": 48},
      {"name": "Apple MacBook Pro 2011", "production": 323.33, "usage": 48},
      {"name": "Apple MacBook Pro with Retina Display", "production": 580.28, "usage": 48},
      {"name": "Dell Latitude", "production": 266.02, "usage": 48},
      {"name": "HP", "production": 301.98, "usage": 48},
      {"name": "Lenovo Thinkpad & X1", "production": 314.41, "usage": 48},
      {"name": "Lenovo Ideapad", "production": 271.4, "usage": 48},
      {"name": "Lenovo Chromebook", "production": 225.58, "usage": 48},
      {"name": "Lenovo Legion / Yoga", "production": 279.94, "usage": 48},
      {"name": "Lenovo other", "production": 264.28, "usage": 48},
      {"name": "Portátil other", "production": 331.48, "usage": 48}
    ]
  },
  {
    "name": "Smartphone",
    "devices": [
      {"name": "Apple iPhone", "production": 62.09, "usage": 1.5},
      {"name": "Teléfono other < 128Go", "production": 44.07, "usage": 1.5},
      {"name": "Teléfono other > 128Go", "production": 58.33, "usage": 1.5}
    ]
  },
  {
    "name": "Tableta",
    "devices": [
      {"name": "Apple iPad", "production": 123.23, "usage": 5},
      {"name": "Dell", "production": 180.05, "usage": 5},
      {"name": "HP Elite", "production": 161.15, "usage": 5},
      {"name": "Tableta other", "production": 135.39, "usage": 5}
    ]
  },
  {
    "name": "Pantalla",
    "devices": [
      {"name": "Apple LED Cinema", "production": 485.2, "usage": 50},
      {"name": "Pantalla other", "production": 348.6, "usage": 50}
    ]
  },
  {
    "name": "Impresora",
    "devices": [
      {"name": "Impresora gran formato", "production": 717.79, "usage": 71},
      {"name": "Impresora multifunción de oficina", "production": 234.4, "usage": 71}
    ]
  }
],
visioTools = [
  {"key": "google-meet", "name": "Google Meet", "usage": 0.16},
  {"key": "microsoft-teams", "name": "Microsoft Teams", "usage": 0.17},
  {"key": "bigblue-buttons", "name": "BigBlue Buttons", "usage": 0.18},
  {"key": "go-to-meeting", "name": "Go To Meeting", "usage": 0.18},
  {"key": "skype", "name": "Skype", "usage": 0.2},
  {"key": "cisco-webex", "name": "Cisco Webex", "usage": 0.21},
  {"key": "zoom", "name": "Zoom", "usage": 0.22},
  {"key": "click-meeting", "name": "Click Meeting", "usage": 0.22},
  {"key": "jitsi", "name": "JITSI", "usage": 0.23},
  {"key": "infomaniak-kmeet", "name": "Infomaniak (Kmeet)", "usage": 0.28},
  {"key": "whereby", "name": "Whereby", "usage": 0.31},
  {"key": "discord", "name": "Discord", "usage": 0.42}
],
countries = [
  {"indicator": "es", "energyMix": 0.207},
  {"indicator": "fr", "energyMix": 0.052},
  {"indicator": "be", "energyMix": 0.22},
  {"indicator": "ch", "energyMix": 0.027},
  {"indicator": "de", "energyMix": 0.420},
  {"indicator": "at", "energyMix": 0.158},
  {"indicator": "it", "energyMix": 0.233},
  {"indicator": "lu", "energyMix": 0.089}
],
nb_jours_travailles = 215,
numWeeks = 46,
CO2GigaByteCloud = 0.2095,
C02navigation_web = 10,
CO2kmvoiture = 0.193,
CO2kmtrain = 0.00173,
CO2kmavion = 0.186;

$(document).ready(function () {
  var e = 0, t = 0, a = 0, numOfDevices = 1, currentEnergyMix;

  function n(a, e) {
    a.append('<option value="placeholder">Elegir...</option>');
    $.each(e, function (f, t) {
      var html = '';
      $.each(t.devices, function(f, u) { html += '<option value="' + u.name + '">' + u.name + '</option>'; });
      a.append('<optgroup value="' + f + '" label="' + t.name + '">' + html + '</optgroup>');
    });
  }
  function m(a, e) {
    $.each(e, function (e, t) { a.append("<option value=" + t.key + ">" + t.name + "</option>"); });
  }
  function l() {
    var deviceImpactAnnual = 0;
    $.each($('[id^="device_impact_annuel_"]'), function(e, t) { deviceImpactAnnual += Number($(t).html()); });
    e = deviceImpactAnnual + Number($("#storage_google_annuel").html()) + Number($("#impact_visio_annuel").html()) + Number($("#impact_emails_without_attachments_annuel").html()) + Number($("#impact_emails_with_attachments_annuel").html()) + Number($("#impact_surf_annuel").html());
    t = Number($("#impact_plane_annuel").html()) + Number($("#impact_train_annuel").html()) + Number($("#impact_car_annuel").html());
    a = e + t;
    $("#total_impact_numerique").html(e.toFixed(2));
    $("#total_impact_deplacement").html(t.toFixed(2));
    $("#total_impact").html(a.toFixed(2));
    var pCarbonFootprintPerResident = a / 1000 / 9.9 * 100;
    $("#p_carbon_footprint_per_resident").html(pCarbonFootprintPerResident.toFixed(1) + "%");
    var pieSegments = $("#p_carbon_footprint_per_resident ~ .pie__segment");
    var pieSegment0Value = Math.min(pCarbonFootprintPerResident.toFixed(), 100);
    var pieSegment1Value = 100 - pieSegment0Value;
    $(pieSegments[0]).css({"--value": "" + pieSegment0Value + "", "--over50": pieSegment0Value > 50 ? "1" : "0"});
    $(pieSegments[1]).css({"--value": "" + pieSegment1Value + "", "--offset": "" + pieSegment0Value + "", "--over50": pieSegment1Value > 50 ? "1" : "0"});
    var pTarget2050 = a / 1000 / 2 * 100;
    $("#p_target_2050").html(pTarget2050.toFixed(1) + "%");
    pieSegments = $("#p_target_2050 ~ .pie__segment");
    pieSegment0Value = Math.min(pTarget2050.toFixed(), 100);
    pieSegment1Value = 100 - pieSegment0Value;
    $(pieSegments[0]).css({"--value": "" + pieSegment0Value + "", "--over50": pieSegment0Value > 50 ? "1" : "0"});
    $(pieSegments[1]).css({"--value": "" + pieSegment1Value + "", "--offset": "" + pieSegment0Value + "", "--over50": pieSegment1Value > 50 ? "1" : "0"});
    $("#impact_eq_beef_meal").html((a / 7.26).toFixed());
    $("#impact_eq_car_km").html((a / 0.193).toFixed());
    $("#impact_eq_paris_brussels").html((a / 0.193 / 309).toFixed(1));
    $("#impact_eq_plane_km").html((a / 0.186).toFixed());
    $("#impact_eq_ar_paris_nyc").html((a / 0.186 / 5800 / 2).toFixed(1));
    $("#impact_eq_laptop").html((a / 156).toFixed());
    $("#impact_eq_smartphone").html((a / 32.8).toFixed());
  }
  function w() {
    var selectedCountryIndicator = $('#select_country').val();
    currentEnergyMix = $.grep(countries, function(e) { return e.indicator === selectedCountryIndicator; })[0].energyMix;
    $('[data-device-field="model"]').change();
  }
  function i() {
    var deviceFieldGroup = $(this).closest('.groupe[data-device-id]');
    var deviceID = $(deviceFieldGroup).attr('data-device-id');
    var deviceModel = $(deviceFieldGroup).find('[data-device-field="model"]');
    var deviceName = $(deviceModel).val();
    var lifetime = 0, usage = 0, device = {"production": 0};
    if (deviceName != "placeholder") {
      var deviceTypeKey = $(deviceModel).find('option:selected').closest('optgroup').attr('value');
      device = $.grep(deviceTypes[deviceTypeKey].devices, function(e) { return e.name === deviceName; })[0];
      lifetime = $(deviceFieldGroup).find('[data-device-field="lifetime"]').val();
      usage = currentEnergyMix * device.usage * lifetime;
    }
    $("#device_total_" + deviceID).html((usage + device.production).toFixed(2));
    $("#device_production_" + deviceID).html(device.production.toFixed(2));
    $("#device_use_" + deviceID).html(usage.toFixed(2));
    if (lifetime == 0) { $("#device_impact_annuel_" + deviceID).html("0.00"); }
    else { $("#device_impact_annuel_" + deviceID).html(((usage + device.production) / lifetime).toFixed(2)); }
    l();
  }
  function y() {
    var impactHebdo = 0, impactAnnuel = 0;
    var visioTool = $.grep(visioTools, function(e) { return e.key === $("#visio_tool").val(); });
    var visioHours = $("#visio_hours").val();
    if (visioTool.length > 0 && visioHours != "") {
      impactHebdo = Number(visioHours) * 60 * visioTool[0].usage / 1000;
      if ($("#visio_camera").val() == "on") { impactHebdo = impactHebdo * 2.6; }
      impactAnnuel = impactHebdo * 46;
    }
    $("#impact_visio_weekly").html(impactHebdo.toFixed(2));
    $("#impact_visio_annuel").html(impactAnnuel.toFixed(2));
    l();
  }
  function o() {
    var fieldID = $(this).attr('id');
    var impactDaily = 0, impactAnnuel = 0;
    if ($(this).val() != "") {
      var CO2mail = fieldID.includes("without") ? 4 : 35;
      impactDaily = (Number($(this).val()) * CO2mail) / 1000;
      impactAnnuel = impactDaily * 46 * 5;
    }
    $("#impact_" + fieldID.replace("num_", "") + "_quotidien").html(impactDaily.toFixed(2));
    $("#impact_" + fieldID.replace("num_", "") + "_annuel").html(impactAnnuel.toFixed(2));
    l();
  }
  $(".add-device").on('click', function() {
    var newDeviceID = numOfDevices + 1;
    $("#device_production_" + numOfDevices).after('<div id="device_production_' + newDeviceID + '"></div>');
    $("#device_use_" + numOfDevices).after('<div id="device_use_' + newDeviceID + '"></div>');
    $("#device_total_" + numOfDevices).after('<div id="device_total_' + newDeviceID + '"></div>');
    $("#device_impact_annuel_" + numOfDevices).after('<div id="device_impact_annuel_' + newDeviceID + '"></div>');
    var newDevice = $('.groupe[data-device-id="1"]').clone().attr("data-device-id", newDeviceID);
    newDevice.find('.device-title').html('Mi equipo n°' + newDeviceID);
    $(".add-device").before(newDevice);
    newDevice.find('[data-device-field="model"]').change();
    numOfDevices = newDeviceID;
  });
  n($('[data-device-field="model"]'), deviceTypes);
  m($("#visio_tool"), visioTools);
  $(document).on('change', '#select_country', w);
  $(document).on('change', '[data-device-field]', i);
  w();
  $("#visio_tool").change(y);
  $("#visio_hours").change(y);
  $("#visio_camera").change(y);
  $("#surf_hours").change(function () {
    var surfHours = $("#surf_hours").val();
    if ("" != surfHours) { $('#impact_surf_weekly').html((Number(surfHours) * C02navigation_web / 1000).toFixed(2)); $('#impact_surf_annuel').html((Number(surfHours) * C02navigation_web / 1000 * numWeeks).toFixed(2)); }
    else { $('#impact_surf_weekly').html("0"); $('#impact_surf_annuel').html("0"); }
    l();
  });
  $("#storage_google").change(function () {
    "" != $("#storage_google").val() ? $("#storage_google_annuel").html(($("#storage_google").val() * CO2GigaByteCloud).toFixed(2)) : $("#storage_google_annuel").html("0");
    l();
  });
  $("#num_emails_without_attachments").change(o);
  $("#num_emails_with_attachments").change(o);
  $("#deplacement_plane").change(function () {
    "" != $("#deplacement_plane").val() ? $("#impact_plane_annuel").html(Number($("#deplacement_plane").val() * CO2kmavion).toFixed(2)) : $("#impact_plane_annuel").html("0");
    l();
  });
  $("#deplacement_train").change(function () {
    "" != $("#deplacement_train").val() ? $("#impact_train_annuel").html(Number($("#deplacement_train").val() * CO2kmtrain).toFixed(2)) : $("#impact_train_annuel").html("0");
    l();
  });
  $("#deplacement_car").change(function () {
    "" != $("#deplacement_car").val() ? $("#impact_car_annuel").html(Number($("#deplacement_car").val() * CO2kmvoiture).toFixed(2)) : $("#impact_car_annuel").html("0");
    l();
  });
  $("#storage_google").change();
  $("#deplacement_plane").change();
  $("#deplacement_train").change();
  $("#deplacement_car").change();

  jQuery(document).ready(function($) {
    tarteaucitron.init({
      "privacyUrl": "https://numeriqueresponsable.org/mentions-legales.php",
      "hashtag": "#tarteaucitron",
      "cookieName": "tarteaucitron",
      "orientation": "bottom",
      "groupServices": false,
      "showAlertSmall": false,
      "cookieslist": false,
      "closePopup": false,
      "showIcon": false,
      "iconPosition": "BottomRight",
      "adblocker": false,
      "DenyAllCta": true,
      "AcceptAllCta": true,
      "highPrivacy": true,
      "handleBrowserDNTRequest": false,
      "removeCredit": false,
      "moreInfoLink": true,
      "useExternalCss": false,
      "useExternalJs": false,
      "readmoreLink": "",
      "mandatory": true
    });
  });
});
```

- [ ] **Étape 3 : Vérifier dans le navigateur**

```bash
python3 -m http.server 8000 --directory /Users/ggallon/Downloads/myimpact
# Ouvrir http://localhost:8000/es/
# Vérifier :
# - Textes en espagnol
# - Logo ISIT affiché
# - Sélecteur de langue avec 6 options
# - Sélection d'un équipement met à jour les calculs
# - Changement de pays recalcule l'usage
```

- [ ] **Étape 4 : Commit**

```bash
git add es/
git commit -m "feat: ajout version espagnol (ES)"
```

---

## Task 9 : Créer la version Italien (IT)

**Files:**
- Create: `it/index.html`, `it/scripts.js`

- [ ] **Étape 1 : Créer `it/index.html`**

Structure identique à `es/index.html` avec ces différences :

```html
<html lang="it">
<title>ISIT | Valutazione della mia impronta ambientale digitale individuale/professionale</title>
<meta name="description" content="L'ISIT ha creato una calcolatrice che permette di calcolare semplicemente il nostro impatto digitale professionale in kg CO2 eq." />
<!-- canonical -->
<link rel="canonical" href="https://myimpact.isit-europe.org/it/" />
<!-- og: -->
<meta property="og:url" content="https://myimpact.isit-europe.org/it/" />
<meta property="og:title" content="MyImpact | Calcolatrice impronta carbonio digitale" />
<meta property="og:description" content="Calcola la tua impronta ambientale digitale individuale e professionale in kg CO2 eq. Strumento gratuito dell'ISIT." />
<meta property="og:locale" content="it_IT" />
<!-- twitter: même chose -->
<!-- JSON-LD : "inLanguage": "it", "url": "https://myimpact.isit-europe.org/it/" -->
```

Traductions des textes :
- H1 : `Valutazione della mia impronta ambientale digitale individuale/professionale in kg CO<sub>2</sub> eq.`
- Version : `Versione 1.1 rilasciata il 4 luglio 2022`
- Sommaire titre : `Sommario`
- Sections : `Apparecchiature`, `Utilizzo online`, `Archiviazione cloud`, `Invio di email`, `Viaggi di lavoro`
- Résultats : `Il mio impatto`, `Digitale`, `Viaggi`, `Il mio impatto totale per anno`
- Équipement : `La mia apparecchiatura n°1`, `Modello`, `Durata d'uso (anni)`, `Aggiungi un'apparecchiatura`
- Boxes : `PRODUZIONE`, `USO`, `TOTALE`, `ANNUALE`
- Vidéo : `Strumento video più utilizzato`, `Ore a settimana`, `Fotocamera più spesso...`, `Accesa`, `Spenta`
- Web : `Ore di navigazione web a settimana`
- Cloud : `Il mio spazio cloud in Gb`
- Emails : `Numero di email inviate al giorno (SENZA allegati)`, `(CON allegati)`
- Déplacements : `Km percorsi in aereo / anno`, `in treno / anno`, `in auto / anno`, `in bicicletta o a piedi / anno`
- Equiv : `A cosa posso paragonare il mio impatto totale?*`, `Alcuni esempi...`, `pasti con carne bovina`, `km in auto`, `tragitti Parigi / Bruxelles`, `km in aereo`, `andata e ritorno Parigi / New York`, `laptop prodotti`, `smartphone prodotti`
- Crédits : `Informazioni sull'ISIT`
- Select country (IT par défaut) : `Italia`, `Francia`, `Belgio`, `Svizzera`, `Germania`, `Austria`, `Spagna`, `Lussemburgo`
- `Leer más` → `Per saperne di più`

- [ ] **Étape 2 : Créer `it/scripts.js`**

Identique à `es/scripts.js` avec :
- Catégories traduites : `"Computer desktop"`, `"Laptop"`, `"Smartphone"`, `"Tablet"`, `"Monitor"`, `"Stampante"`
- Noms des modèles spécifiques IT : `"Laptop other"` → `"Laptop altro"`, `"Desktop other"` → `"Desktop altro"`, etc.
- `countries` : `es` en premier remplacé par `it` en premier : `{"indicator": "it", "energyMix": 0.233}` en tête
- Dans `$(".add-device").on('click')` : `'La mia apparecchiatura n°' + newDeviceID`
- Dans `n()` : `a.append('<option value="placeholder">Scegliere...</option>');`

- [ ] **Étape 3 : Vérifier**

```bash
# http://localhost:8000/it/
# Vérifier textes en italien, logo ISIT, calculs fonctionnels
```

- [ ] **Étape 4 : Commit**

```bash
git add it/
git commit -m "feat: ajout version italien (IT)"
```

---

## Task 10 : Créer la version Allemand (DE)

**Files:**
- Create: `de/index.html`, `de/scripts.js`

- [ ] **Étape 1 : Créer `de/index.html`**

Structure identique avec :

```html
<html lang="de">
<title>ISIT | Bewertung meines individuellen/beruflichen digitalen Umwelt-Fußabdrucks</title>
<meta name="description" content="Das ISIT hat einen Rechner erstellt, mit dem wir einfach unsere beruflichen digitalen Auswirkungen berechnen können." />
<link rel="canonical" href="https://myimpact.isit-europe.org/de/" />
<meta property="og:url" content="https://myimpact.isit-europe.org/de/" />
<meta property="og:title" content="MyImpact | Rechner für den digitalen CO2-Fußabdruck" />
<meta property="og:description" content="Berechnen Sie Ihren individuellen und beruflichen digitalen Umwelt-Fußabdruck in kg CO2-Äquivalent. Kostenloses Tool des ISIT." />
<meta property="og:locale" content="de_DE" />
<!-- JSON-LD : "inLanguage": "de", "url": "https://myimpact.isit-europe.org/de/" -->
```

Traductions :
- H1 : `Bewertung meines individuellen/beruflichen digitalen Umwelt-Fußabdrucks in kg CO<sub>2</sub>-Äquivalent`
- Version : `Version 1.1 veröffentlicht am 4. Juli 2022`
- Sommaire : `Inhaltsverzeichnis`
- Sections : `Geräte`, `Online-Nutzung`, `Cloud-Speicher`, `E-Mail-Versand`, `Geschäftsreisen`
- Résultats : `Meine Auswirkungen`, `Digital`, `Reisen`, `Meine Gesamtauswirkungen pro Jahr`
- Équipement : `Mein Gerät Nr. 1`, `Modell`, `Nutzungsdauer (Jahre)`, `Gerät hinzufügen`
- Boxes : `HERSTELLUNG`, `NUTZUNG`, `GESAMT`, `JÄHRLICH`
- Vidéo : `Meistgenutztes Videokonferenz-Tool`, `Stunden pro Woche`, `Kamera meistens...`, `Eingeschaltet`, `Ausgeschaltet`
- Web : `Stunden Webbrowsing pro Woche`
- Cloud : `Mein Cloud-Speicher in Gb`
- Emails : `Anzahl gesendeter E-Mails pro Tag (OHNE Anhänge)`, `(MIT Anhängen)`
- Déplacements : `Gefahrene km mit dem Flugzeug / Jahr`, `mit dem Zug / Jahr`, `mit dem Auto / Jahr`, `mit dem Fahrrad oder zu Fuß / Jahr`
- Equiv : `Womit kann ich meine Gesamtauswirkungen vergleichen?*`, `Einige Beispiele...`, `Mahlzeiten mit Rindfleisch`, `km mit dem Auto`, `Fahrten Paris / Brüssel`, `km mit dem Flugzeug`, `Hin- und Rückfahrten Paris / New York`, `hergestellte Laptops`, `hergestellte Smartphones`
- Crédits : `Über das ISIT`
- Select country (DE par défaut) : `Deutschland`, `Frankreich`, `Belgien`, `Schweiz`, `Österreich`, `Spanien`, `Italien`, `Luxemburg`
- `Leer más` → `Mehr lesen`

- [ ] **Étape 2 : Créer `de/scripts.js`**

Identique à `es/scripts.js` avec :
- Catégories : `"Desktop-Computer"`, `"Laptop"`, `"Smartphone"`, `"Tablet"`, `"Bildschirm"`, `"Drucker"`
- Noms spécifiques : `"Desktop-Computer andere"`, `"Laptop andere"`, etc.
- `countries` : `de` en premier : `{"indicator": "de", "energyMix": 0.420}` en tête
- `'Mein Gerät Nr. ' + newDeviceID`
- `a.append('<option value="placeholder">Auswählen...</option>');`

- [ ] **Étape 3 : Vérifier**

```bash
# http://localhost:8000/de/
# Vérifier textes en allemand, logo ISIT, calculs fonctionnels
```

- [ ] **Étape 4 : Commit**

```bash
git add de/
git commit -m "feat: ajout version allemand (DE)"
```

---

## Task 11 : Générer `sitemap.xml` et mettre à jour `robots.txt`

**Files:**
- Create: `sitemap.xml`
- Modify: `robots.txt`

- [ ] **Étape 1 : Créer `sitemap.xml`**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://myimpact.isit-europe.org/</loc>
    <lastmod>2026-04-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://myimpact.isit-europe.org/"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://myimpact.isit-europe.org/fr/"/>
    <xhtml:link rel="alternate" hreflang="nl" href="https://myimpact.isit-europe.org/nl/"/>
    <xhtml:link rel="alternate" hreflang="de" href="https://myimpact.isit-europe.org/de/"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://myimpact.isit-europe.org/es/"/>
    <xhtml:link rel="alternate" hreflang="it" href="https://myimpact.isit-europe.org/it/"/>
  </url>
  <url>
    <loc>https://myimpact.isit-europe.org/fr/</loc>
    <lastmod>2026-04-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://myimpact.isit-europe.org/"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://myimpact.isit-europe.org/fr/"/>
    <xhtml:link rel="alternate" hreflang="nl" href="https://myimpact.isit-europe.org/nl/"/>
    <xhtml:link rel="alternate" hreflang="de" href="https://myimpact.isit-europe.org/de/"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://myimpact.isit-europe.org/es/"/>
    <xhtml:link rel="alternate" hreflang="it" href="https://myimpact.isit-europe.org/it/"/>
  </url>
  <url>
    <loc>https://myimpact.isit-europe.org/nl/</loc>
    <lastmod>2026-04-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://myimpact.isit-europe.org/"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://myimpact.isit-europe.org/fr/"/>
    <xhtml:link rel="alternate" hreflang="nl" href="https://myimpact.isit-europe.org/nl/"/>
    <xhtml:link rel="alternate" hreflang="de" href="https://myimpact.isit-europe.org/de/"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://myimpact.isit-europe.org/es/"/>
    <xhtml:link rel="alternate" hreflang="it" href="https://myimpact.isit-europe.org/it/"/>
  </url>
  <url>
    <loc>https://myimpact.isit-europe.org/de/</loc>
    <lastmod>2026-04-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://myimpact.isit-europe.org/"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://myimpact.isit-europe.org/fr/"/>
    <xhtml:link rel="alternate" hreflang="nl" href="https://myimpact.isit-europe.org/nl/"/>
    <xhtml:link rel="alternate" hreflang="de" href="https://myimpact.isit-europe.org/de/"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://myimpact.isit-europe.org/es/"/>
    <xhtml:link rel="alternate" hreflang="it" href="https://myimpact.isit-europe.org/it/"/>
  </url>
  <url>
    <loc>https://myimpact.isit-europe.org/es/</loc>
    <lastmod>2026-04-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://myimpact.isit-europe.org/"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://myimpact.isit-europe.org/fr/"/>
    <xhtml:link rel="alternate" hreflang="nl" href="https://myimpact.isit-europe.org/nl/"/>
    <xhtml:link rel="alternate" hreflang="de" href="https://myimpact.isit-europe.org/de/"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://myimpact.isit-europe.org/es/"/>
    <xhtml:link rel="alternate" hreflang="it" href="https://myimpact.isit-europe.org/it/"/>
  </url>
  <url>
    <loc>https://myimpact.isit-europe.org/it/</loc>
    <lastmod>2026-04-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://myimpact.isit-europe.org/"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://myimpact.isit-europe.org/fr/"/>
    <xhtml:link rel="alternate" hreflang="nl" href="https://myimpact.isit-europe.org/nl/"/>
    <xhtml:link rel="alternate" hreflang="de" href="https://myimpact.isit-europe.org/de/"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://myimpact.isit-europe.org/es/"/>
    <xhtml:link rel="alternate" hreflang="it" href="https://myimpact.isit-europe.org/it/"/>
  </url>
</urlset>
```

- [ ] **Étape 2 : Mettre à jour `robots.txt`**

```
User-Agent: *
Allow: /
Disallow: /tarteaucitron/

Sitemap: https://myimpact.isit-europe.org/sitemap.xml
```

- [ ] **Étape 3 : Commit**

```bash
git add sitemap.xml robots.txt
git commit -m "feat: sitemap.xml multilingue + robots.txt mis à jour"
```

---

## Task 12 : Écrire `README.md`

**Files:**
- Create: `README.md`

- [ ] **Étape 1 : Créer `README.md`**

```markdown
# MyImpact — Calculatrice d'empreinte carbone numérique

Outil en ligne gratuit permettant d'évaluer son empreinte environnementale liée au numérique professionnel et aux déplacements, en kg CO₂ éq. par an.

**Démo :** [myimpact.isit-europe.org](https://myimpact.isit-europe.org)

---

## Auteurs

Créé et maintenu par :

- **[Institut du Numérique Responsable (INR)](https://institutnr.org)** — France
- **[ISIT Belgique](https://isit-be.org)** — Belgique
- **[ISIT Suisse](https://isit-europe.org)** — Suisse

Architecture initiale v1.0 mise à disposition par **Décathlon** ([Julien Gontier](https://www.linkedin.com/in/gontier-julien-06653312)).  
Mise à jour v1.1 (juillet 2022) par [athom](https://athom.co/).

---

## Langues disponibles

| Langue | URL |
|---|---|
| English | [/](https://myimpact.isit-europe.org/) |
| Français | [/fr/](https://myimpact.isit-europe.org/fr/) |
| Nederlands | [/nl/](https://myimpact.isit-europe.org/nl/) |
| Deutsch | [/de/](https://myimpact.isit-europe.org/de/) |
| Español | [/es/](https://myimpact.isit-europe.org/es/) |
| Italiano | [/it/](https://myimpact.isit-europe.org/it/) |

---

## Ce que calcule l'outil

- **Équipements** : impact fabrication + usage selon le mix énergétique du pays
- **Usages en ligne** : visioconférence (12 outils), navigation web
- **Stockage cloud** : en Go/an
- **Emails** : avec et sans pièces jointes
- **Déplacements professionnels** : avion, train, voiture, vélo/marche

---

## Sources des données

| Donnée | Source |
|---|---|
| Empreinte fabrication équipements | [NUTS / données fabricants](https://www.boavizta.org/) |
| Mix énergétique par pays | [Our World in Data / AIE](https://ourworldindata.org/electricity-mix) |
| Impact cloud | [Umweltbundesamt — Green Cloud Computing (2021)](https://www.umweltbundesamt.de/sites/default/files/medien/5750/publikationen/2021-06-17_texte_94-2021_green-cloud-computing.pdf) |
| Impact emails | ADEME |
| Impact transports | ADEME BEGES |
| Empreinte carbone moyenne | SDES & Carbone4 (9,9 t CO₂ / hab / an) |
| Objectif 2050 | Accord de Paris (2 t CO₂ / hab / an) |

---

## Structure du projet

```
myimpact/
├── index.html              # Version anglaise (EN)
├── scripts-en.js           # Logique calcul EN
├── stylesheet-inr.css      # CSS partagé (toutes langues)
├── jquery-3.7.1.min.js     # jQuery partagé
├── fonts/                  # Polices Montserrat auto-hébergées
│   ├── montserrat-400.woff2
│   ├── montserrat-600.woff2
│   └── montserrat-800.woff2
├── img/                    # Images et icônes
│   ├── isit.png            # Logo ISIT (EN, NL, DE, ES, IT)
│   ├── inr.png             # Logo INR (FR uniquement)
│   └── chevron.png         # Icône select
├── fr/                     # Version française
│   ├── index.html
│   └── scripts.js
├── nl/                     # Version néerlandaise
│   ├── index.html
│   └── scripts.js
├── de/                     # Version allemande
│   ├── index.html
│   └── scripts.js
├── es/                     # Version espagnole
│   ├── index.html
│   └── scripts.js
├── it/                     # Version italienne
│   ├── index.html
│   └── scripts.js
├── tarteaucitron/          # Gestionnaire de consentement RGPD
├── sitemap.xml             # Plan du site pour les moteurs de recherche
├── robots.txt
└── docs/
    └── superpowers/        # Documentation interne
```

---

## Tester en local

Ce projet est un site statique. Il fonctionne avec n'importe quel serveur HTTP local.

```bash
# Option 1 — Python (sans installation)
python3 -m http.server 8000

# Option 2 — Node.js
npx serve .

# Option 3 — VS Code
# Installer l'extension "Live Server" et cliquer sur "Go Live"
```

Puis ouvrir : [http://localhost:8000](http://localhost:8000)

> Les liens de navigation entre langues (`/fr/`, `/de/`, etc.) nécessitent un serveur HTTP. L'ouverture directe de fichiers `file://` ne les fera pas fonctionner.

---

## Ajouter une nouvelle langue

1. Créer le dossier `/{code-langue}/`
2. Copier `es/index.html` et `es/scripts.js` comme base
3. Traduire tous les textes dans `index.html`
4. Traduire les catégories d'équipements dans `scripts.js`
5. Adapter le `countries` array (mettre le pays par défaut en premier)
6. Mettre à jour le sélecteur de langue dans **tous** les `index.html` existants
7. Ajouter l'URL dans `sitemap.xml`
8. Ajouter les balises `hreflang` dans **tous** les `index.html`

---

## Modifier les données de calcul

Tous les coefficients sont dans les fichiers `scripts.js` / `scripts-en.js` de chaque langue :

| Variable | Description | Valeur actuelle |
|---|---|---|
| `CO2GigaByteCloud` | kg CO₂ / Go cloud / an | 0.2095 |
| `C02navigation_web` | g CO₂ / heure de navigation | 10 |
| `CO2kmvoiture` | kg CO₂ / km voiture | 0.193 |
| `CO2kmtrain` | kg CO₂ / km train | 0.00173 |
| `CO2kmavion` | kg CO₂ / km avion | 0.186 |

---

## Licence

Ce projet est distribué sous licence [Creative Commons BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.fr).

Vous êtes libre de partager et d'adapter ce matériel, à condition de citer les auteurs et de distribuer vos contributions sous la même licence.
```

- [ ] **Étape 2 : Commit**

```bash
git add README.md
git commit -m "docs: ajout README.md complet pour GitHub"
```

---

## Task 13 : Vérification finale

- [ ] **Étape 1 : Lancer le serveur local et tester les 6 langues**

```bash
python3 -m http.server 8000 --directory /Users/ggallon/Downloads/myimpact
```

Pour chaque langue (EN, FR, NL, DE, ES, IT) :
- [ ] La page se charge sans erreur console
- [ ] La police Montserrat s'affiche (0 requête Google Fonts dans Network)
- [ ] Le sélecteur de langue affiche 6 options et navigue correctement
- [ ] Le changement de pays recalcule l'usage
- [ ] La sélection d'un équipement + durée de vie calcule production / usage / total / annuel
- [ ] La saisie d'heures visio calcule l'impact
- [ ] La saisie des km déplacements calcule l'impact
- [ ] Le total s'affiche dans le footer avec les graphiques en camembert
- [ ] Logo INR pour FR, logo ISIT pour toutes les autres langues

- [ ] **Étape 2 : Vérifier les balises SEO**

```bash
# Vérifier les hreflang dans chaque page
curl -s http://localhost:8000/ | grep hreflang
curl -s http://localhost:8000/fr/ | grep hreflang
curl -s http://localhost:8000/es/ | grep hreflang
# Chaque page doit afficher 7 lignes hreflang (en, fr, nl, de, es, it, x-default)

# Vérifier le sitemap
curl -s http://localhost:8000/sitemap.xml | grep '<loc>'
# Doit afficher 6 URLs
```

- [ ] **Étape 3 : Commit final**

```bash
git add -A
git status
# Vérifier qu'il ne reste pas de fichiers non commités
git log --oneline -15
```
