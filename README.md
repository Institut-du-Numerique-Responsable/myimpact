# MyImpact — Calculatrice d'empreinte carbone numérique

**MyImpact** est un outil web libre et gratuit permettant à toute personne, dans le cadre de son activité professionnelle, d'estimer son empreinte environnementale numérique et liée aux déplacements, exprimée en **kg CO₂ équivalent (kg CO₂ éq.)**.

> Accès en ligne : [myimpact.isit-europe.org](https://myimpact.isit-europe.org)

---

## Auteurs et historique

Cet outil a été créé et est maintenu par :

- **[Institut du Numérique Responsable (INR)](https://institutnr.org)** — Think & do tank français pour le numérique responsable
- **[ISIT Belgique](https://isit-be.org)** — Institute for Sustainable IT, Belgique
- **[ISIT Suisse](https://isit-europe.org)** — Institute for Sustainable IT, Suisse

| Version | Date | Contribution |
|---------|------|-------------|
| v1.0 | 2020 | Architecture initiale par **Julien Gontier** (Decathlon) |
| v1.1 | Juillet 2022 | Mise à jour des indicateurs et nouvelles sections par [athom](https://athom.co/) |
| v1.2 | 2026 | Actualisation des sources, nouvelles langues (DE, ES, IT), conformité RGPD, SEO par **ggallon** ([INR France](https://institutnr.org)) |

---

## Langues disponibles

| Langue | URL |
|--------|-----|
| English | `/` |
| Français | `/fr/` |
| Nederlands | `/nl/` |
| Deutsch | `/de/` |
| Español | `/es/` |
| Italiano | `/it/` |

---

## Ce que calcule l'outil

La calculatrice couvre six catégories d'impact :

1. **Équipements** — Impact de la production et de l'utilisation des ordinateurs portables, fixes, smartphones, tablettes, écrans et imprimantes
2. **Usages en ligne** — Visioconférence (12 outils supportés) et navigation web
3. **Stockage cloud** — Basé sur l'étude Green Cloud Computing (2021) : 209,5 g CO₂/Go/an
4. **Emails** — Avec et sans pièce jointe
5. **Déplacements professionnels** — Avion, train, voiture, vélo/marche
6. **Résultats** — Impact total avec équivalences et comparaison aux objectifs de l'Accord de Paris

---

## Méthodologie détaillée

Toutes les valeurs sont exprimées en **kg CO₂ équivalent**. Les calculs s'effectuent entièrement côté client (navigateur), aucune donnée n'est transmise à des serveurs tiers.

### Emails

La mesure de l'empreinte des emails est une approximation : la consommation réelle dépend du nombre de destinataires, de la taille des pièces jointes, des serveurs traversés, etc.

| Type d'email | Valeur retenue |
|---|---|
| Sans pièce jointe | **4 g CO₂ éq.** |
| Avec pièce jointe | **35 g CO₂ éq.** |

Source : [ADEME — La face cachée du numérique](https://librairie.ademe.fr/consommer-autrement/5226-guide-pratique-la-face-cachee-du-numerique.html)

### Visioconférence

Les données libres sur l'impact de la visioconférence sont encore peu nombreuses. La calculatrice s'appuie sur l'étude Greenspector 2021, couvrant 12 plateformes (Zoom, Teams, Meet, Jitsi, etc.).

Sources :
- [Greenspector — Quelle application mobile de visioconférence pour réduire votre impact ? (2021)](https://greenspector.com/fr/quelle-application-mobile-de-visioconference-pour-reduire-votre-impact-edition-2021/)
- [UNSW Sydney — Video conferencing energy study](http://www2.eet.unsw.edu.au/~vijay/pubs/jrnl/14comcomVC.pdf)

### Stockage cloud

L'empreinte du stockage de données dans le cloud est calculée à partir de l'étude de référence utilisée par la DINUM française.

| Indicateur | Valeur retenue |
|---|---|
| Stockage cloud | **209,5 g CO₂ éq. / Go / an** |

Source : [Green Cloud Computing — Umweltbundesamt (2021)](https://www.umweltbundesamt.de/sites/default/files/medien/5750/publikationen/2021-06-17_texte_94-2021_green-cloud-computing.pdf)

### Navigation web

| Activité | Valeur retenue |
|---|---|
| Navigation web | **10 g CO₂ éq. / heure** |

Source : [nosgestesclimat.fr — Documentation numérique / internet](https://nosgestesclimat.fr/documentation/num%C3%A9rique/internet)

### Déplacements professionnels

Les facteurs d'émission sont issus de la base carbone ADEME et des moyennes européennes.

| Mode de transport | Valeur retenue |
|---|---|
| Voiture (moyenne) | **0,193 kg CO₂ éq. / km** |
| Train | **0,00173 kg CO₂ éq. / km** |
| Avion (court/moyen courrier) | **0,186 kg CO₂ éq. / km** |
| Vélo / Marche | **0 kg CO₂ éq. / km** |

Sources : [ADEME](https://librairie.ademe.fr/consommer-autrement/5226-guide-pratique-la-face-cachee-du-numerique.html), [Mon Convertisseur CO₂](https://monconvertisseurco2.fr/)

### Équipements (matériels)

L'impact des équipements intègre à la fois la **phase de fabrication** (extraction des matières premières, assemblage) et la **phase d'utilisation** (consommation électrique sur la durée de vie), exprimé en kg CO₂ éq. par an d'utilisation.

L'impact des équipements génériques est une moyenne calculée à partir de l'agrégation de données de différents modèles issus des sources ci-dessous.

Sources : [ADEME — La face cachée du numérique](https://librairie.ademe.fr/consommer-autrement/5226-guide-pratique-la-face-cachee-du-numerique.html), [ENERGY STAR](https://www.energystar.gov/), [NUTS online tool](https://nuts.fr/)

### Mix énergétique par pays

La consommation électrique des équipements est pondérée par le mix énergétique du pays sélectionné par l'utilisateur.

| Pays | kg CO₂ éq. / kWh |
|------|-----------------|
| Suisse | 0,027 |
| France | 0,052 |
| Luxembourg | 0,089 |
| Autriche | 0,158 |
| Espagne | 0,207 |
| Belgique | 0,220 |
| Italie | 0,233 |
| Pays-Bas | 0,284 |
| Allemagne | 0,420 |

---

## Sources de données

| Source | Usage |
|--------|-------|
| [ADEME — La face cachée du numérique](https://librairie.ademe.fr/consommer-autrement/5226-guide-pratique-la-face-cachee-du-numerique.html) | Équipements, emails, déplacements |
| [ENERGY STAR](https://www.energystar.gov/) | Consommation électrique des équipements |
| [NUTS online tool](https://nuts.fr/) | Données fabricants sur les émissions GES |
| [Green Cloud Computing — Umweltbundesamt (2021)](https://www.umweltbundesamt.de/sites/default/files/medien/5750/publikationen/2021-06-17_texte_94-2021_green-cloud-computing.pdf) | Stockage cloud |
| [Greenspector (2021)](https://greenspector.com/fr/quelle-application-mobile-de-visioconference-pour-reduire-votre-impact-edition-2021/) | Visioconférence |
| [nosgestesclimat.fr](https://nosgestesclimat.fr/documentation/num%C3%A9rique/internet) | Navigation web |
| [The Shift Project](https://theshiftproject.org/lean-ict/) | Référence générale numérique |
| [Mon Convertisseur CO₂](https://monconvertisseurco2.fr/) | Équivalences et déplacements |

---

## Stack technique

- HTML5 statique (aucun système de build requis)
- [jQuery 3.7.1](https://jquery.com/)
- [tarteaucitron.js](https://github.com/AmauryCarrade/tarteaucitron.js) — Consentement cookies conforme RGPD
- [Matomo](https://matomo.org/) — Analytics respectueux de la vie privée (auto-hébergé, ID site = 6)
- Police Montserrat variable auto-hébergée (conforme RGPD, sans appel Google Fonts)

---

## Lancer le projet en local

```bash
# Avec Python (recommandé)
python3 -m http.server 8080

# Puis ouvrir http://localhost:8080
```

> L'outil nécessite un serveur local car il utilise des chemins relatifs entre sous-répertoires de langues. Ouvrir `index.html` directement via `file://` fonctionnera pour la page racine, mais la navigation entre langues nécessite un serveur.

---

## Structure du projet

```
myimpact/
├── index.html                          # Anglais (défaut)
├── scripts-en.js
├── fr/
│   ├── index.html                      # Français
│   ├── scripts.js
│   ├── a-propos-numerique-responsable.html
│   ├── mentions-legales.html
│   └── gestion-cookies.html
├── nl/
│   ├── index.html                      # Nederlands
│   ├── scripts.js
│   ├── over-de-rekenmachine-duurzame-it.html
│   ├── wettelijke-vermeldingen.html
│   └── cookiebeheer.html
├── de/
│   ├── index.html                      # Deutsch
│   ├── scripts.js
│   ├── about-sustainable-it.html
│   ├── rechtliche-hinweise.html
│   └── cookie-verwaltung.html
├── es/
│   ├── index.html                      # Español
│   ├── scripts.js
│   ├── about-sustainable-it.html
│   ├── aviso-legal.html
│   └── gestion-cookies.html
├── it/
│   ├── index.html                      # Italiano
│   ├── scripts.js
│   ├── about-sustainable-it.html
│   ├── note-legali.html
│   └── gestione-cookie.html
├── about-sustainable-it.html           # Sources & méthodo (EN)
├── legal-notice.html                   # Mentions légales (EN)
├── cookies.html                        # Gestion cookies (EN)
├── stylesheet-inr.css                  # Feuille de style principale
├── jquery-3.7.1.min.js
├── fonts/
│   └── montserrat-variable.woff2
├── img/
│   ├── isit.png                        # Logo ISIT (EN, NL, DE, ES, IT)
│   └── inr.png                         # Logo INR (FR uniquement)
├── tarteaucitron/                      # Bibliothèque consentement cookies
├── sitemap.xml
├── robots.txt
└── README.md
```

---

## Déploiement

L'outil est déployé en site statique sur les serveurs OVH. Aucun traitement côté serveur n'est nécessaire — tous les calculs sont effectués côté client en JavaScript.

Pour déployer, transférer l'ensemble des fichiers en conservant la structure des répertoires. S'assurer que le serveur web sert `index.html` comme document par défaut pour chaque répertoire.

---

## Protection des données (RGPD)

- **Aucune donnée personnelle n'est collectée** par la calculatrice — les calculs s'effectuent entièrement dans le navigateur de l'utilisateur.
- Les cookies analytiques (Matomo, auto-hébergé) nécessitent le consentement explicite de l'utilisateur via tarteaucitron.js.
- **DPO (Délégué à la Protection des Données)** : [dpo@institutnr.org](mailto:dpo@institutnr.org)
- Hébergeur : OVH SAS, 2 rue Kellermann, 59100 Roubaix, France

---

## Licence

[![Licence Creative Commons](https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png)](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.fr)

Ce projet est mis à disposition selon les termes de la [Licence Creative Commons Attribution — Pas d'Utilisation Commerciale — Partage dans les Mêmes Conditions 4.0 International (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.fr).

**Vous êtes libre de :**
- **Partager** — copier et redistribuer le contenu sur tout support ou format
- **Adapter** — remixer, transformer et créer à partir du contenu

**Selon les conditions suivantes :**
- **Attribution (BY)** — Vous devez créditer l'œuvre en mentionnant l'INR, fournir un lien vers la licence et indiquer les modifications éventuelles
- **Pas d'Utilisation Commerciale (NC)** — Vous n'êtes pas autorisé à faire un usage commercial de cette œuvre
- **Partage dans les Mêmes Conditions (SA)** — Si vous remixez, transformez ou créez à partir du contenu, vous devez diffuser votre contribution sous la même licence que l'original

© Institut du Numérique Responsable, ISIT Belgique, ISIT Suisse
