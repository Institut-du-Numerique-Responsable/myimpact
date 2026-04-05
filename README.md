# MyImpact — Digital Carbon Footprint Calculator

MyImpact is a free, open-source web tool that allows individuals and professionals to estimate their digital and travel-related carbon footprint in kg CO₂ eq.

## Authors

This tool was created by:

- **[Institut du Numérique Responsable (INR)](https://institutnr.org)** — French institute for responsible digital technology
- **[ISIT Belgique](https://isit-be.org)** — Institute for Sustainable IT, Belgium
- **[ISIT Suisse](https://isit-europe.org)** — Institute for Sustainable IT, Switzerland

Calculator architecture v1.0 was contributed by **Julien Gontier** (Decathlon) in 2020. Version 1.1 was released in July 2022 by [athom](https://athom.co/) with updated indicators and new calculation sections.

## Available Languages

| Language | URL |
|----------|-----|
| English | `/` |
| Français | `/fr/` |
| Nederlands | `/nl/` |
| Deutsch | `/de/` |
| Español | `/es/` |
| Italiano | `/it/` |

## What It Calculates

The calculator covers six impact categories:

1. **Hardware** — Production and usage impact of computers, laptops, smartphones, tablets, monitors, and printers
2. **Online use** — Video conferencing (12 tools supported) and web browsing
3. **Cloud storage** — Based on Green Cloud Computing (2021) study: 209.5 g CO₂/GB/year
4. **Emails** — With and without attachments
5. **Business travel** — Plane, train, car, and bike/walking
6. **Results** — Total impact with equivalents and comparison to Paris Agreement targets

## Data Sources

- [ADEME greenhouse gas resource center](https://librairie.ademe.fr/cadic/6555/guide-en-route-vers-sobriete-numerique.pdf)
- [ENERGY STAR program](https://www.energystar.gov/)
- [NUTS online tool](https://nuts.fr/) — manufacturer data on GHG emissions
- [Green Cloud Computing study (Umweltbundesamt, 2021)](https://www.umweltbundesamt.de/sites/default/files/medien/5750/publikationen/2021-06-17_texte_94-2021_green-cloud-computing.pdf)
- [The Shift Project](https://theshiftproject.org/article/lean-ict-notre-nouveau-rapport/)
- [My CO₂ Converter](https://monconvertisseurco2.fr/) — equivalents

## Supported Countries (Energy Mix)

| Country | kgCO₂/kWh |
|---------|-----------|
| Switzerland | 0.027 |
| France | 0.052 |
| Luxembourg | 0.089 |
| Austria | 0.158 |
| Spain | 0.207 |
| Belgium | 0.22 |
| Italy | 0.233 |
| Netherlands | 0.284 |
| Germany | 0.420 |

## Technical Stack

- Static HTML5 (no build system required)
- [jQuery 3.7.1](https://jquery.com/)
- [tarteaucitron.js](https://github.com/AmauryCarrade/tarteaucitron.js) — GDPR-compliant cookie consent
- [Matomo](https://matomo.org/) — privacy-respecting analytics
- Montserrat variable font (self-hosted, GDPR-compliant)

## Running Locally

```bash
# Using Python (recommended)
python3 -m http.server 8080

# Then open http://localhost:8080
```

> The tool requires a local server because it uses relative paths between language subdirectories. Opening `index.html` directly in a browser (via `file://`) will work for the root page but language switching requires a server.

## Project Structure

```
myimpact/
├── index.html              # English (default)
├── scripts-en.js
├── fr/
│   ├── index.html          # Français
│   └── scripts.js
├── nl/
│   ├── index.html          # Nederlands
│   └── scripts.js
├── de/
│   ├── index.html          # Deutsch
│   └── scripts.js
├── es/
│   ├── index.html          # Español
│   └── scripts.js
├── it/
│   ├── index.html          # Italiano
│   └── scripts.js
├── stylesheet-inr.css      # Main stylesheet
├── jquery-3.7.1.min.js
├── fonts/
│   └── montserrat-variable.woff2
├── img/
│   ├── isit.png            # ISIT logo (used by EN, NL, DE, ES, IT)
│   └── inr.png             # INR logo (used by FR only)
├── tarteaucitron/          # Cookie consent library
├── sitemap.xml
├── robots.txt
├── about-sustainable-it.html
└── legal-notice.html
```

## Deployment

The tool is deployed as a static site on OVH servers. No server-side processing is required — all calculations are performed client-side in JavaScript.

For deployment, upload all files maintaining the directory structure. Ensure the web server serves `index.html` as the default document for each directory.

## License

© Institut du Numérique Responsable, ISIT Belgique, ISIT Suisse — All rights reserved.
