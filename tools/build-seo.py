#!/usr/bin/env python3
"""Regenerate the SEO artefacts of the static site.

The site ships the same pages in six languages: keeping hreflang, the sitemap
and the structured data consistent by hand across 25 files is what let them
drift in the first place. Run this script after adding or renaming a page.

    python3 tools/build-seo.py
"""

import json
import re
from html import unescape
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BASE = "https://myimpact.isit-europe.org"
TODAY = date.today().isoformat()

# One entry per translation group: language code -> path relative to the site root.
GROUPS = {
    "home": {
        "en": "/", "fr": "/fr/", "nl": "/nl/", "de": "/de/", "es": "/es/", "it": "/it/",
    },
    "about": {
        "en": "/about-sustainable-it.html",
        "fr": "/fr/a-propos-numerique-responsable.html",
        "nl": "/nl/over-de-rekenmachine-duurzame-it.html",
        "de": "/de/about-sustainable-it.html",
        "es": "/es/about-sustainable-it.html",
        "it": "/it/about-sustainable-it.html",
    },
    "legal": {
        "en": "/legal-notice.html",
        "fr": "/fr/mentions-legales.html",
        "nl": "/nl/wettelijke-vermeldingen.html",
        "de": "/de/rechtliche-hinweise.html",
        "es": "/es/aviso-legal.html",
        "it": "/it/note-legali.html",
    },
    "cookies": {
        "en": "/cookies.html",
        "fr": "/fr/gestion-cookies.html",
        "nl": "/nl/cookiebeheer.html",
        "de": "/de/cookie-verwaltung.html",
        "es": "/es/gestion-cookies.html",
        "it": "/it/gestione-cookie.html",
    },
    # French-only presentation page: no alternates, it stands alone.
    "presentation": {"fr": "/fr/presentation-myimpact.html"},
}

# Pages excluded from the sitemap: they carry noindex.
NOINDEX_GROUPS = {"legal", "cookies"}

PRIORITIES = {"home": "1.0", "about": "0.8", "presentation": "0.7"}


def local_path(url_path: str) -> Path:
    """Filesystem path of a site path."""
    if url_path.endswith("/"):
        prefix = url_path.strip("/")
        relative = f"{prefix}/index.html" if prefix else "index.html"
    else:
        relative = url_path.lstrip("/")
    return ROOT / relative


def hreflang_block(group: dict, indent: str = "    ") -> str:
    if len(group) < 2:
        return ""
    lines = [
        f'{indent}<link rel="alternate" hreflang="{lang}" href="{BASE}{path}" />'
        for lang, path in group.items()
    ]
    lines.append(f'{indent}<link rel="alternate" hreflang="x-default" href="{BASE}{group["en"]}" />')
    return "\n".join(lines)


def update_hreflang(html: str, group: dict) -> str:
    """Replace the alternate links with the ones computed from GROUPS."""
    block = hreflang_block(group)
    html = re.sub(r'[ \t]*<link rel="alternate" hreflang="[^"]*"[^>]*>\n?', "", html)
    if not block:
        return html
    # Anchor the block right after the canonical link, which every page carries.
    return re.sub(
        r'([ \t]*<link rel="canonical"[^>]*>)',
        lambda m: m.group(1) + "\n" + block,
        html,
        count=1,
    )


def organizations() -> list:
    return [
        {"@type": "Organization", "name": "Institut du Numérique Responsable (INR France)", "url": "https://institutnr.org/"},
        {"@type": "Organization", "name": "Belgian Institute for Sustainable IT (ISIT-BE)", "url": "https://isit-be.org/"},
        {"@type": "Organization", "name": "Swiss Institute for Sustainable IT (ISIT-CH)", "url": "https://isit-ch.org/"},
    ]


def jsonld_home(lang: str, url: str, title: str, description: str) -> dict:
    """Full graph for a calculator page: site, application, publisher, page."""
    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": "https://institutnr.org/#organization",
                "name": "Institut du Numérique Responsable",
                "alternateName": ["INR", "Institute for Sustainable IT", "ISIT"],
                "url": "https://institutnr.org/",
                "logo": f"{BASE}/img/logo-inr.png",
                "sameAs": ["https://isit-europe.org/", "https://isit-be.org/", "https://isit-ch.org/",
                           "https://github.com/Institut-du-Numerique-Responsable"],
            },
            {
                "@type": "WebSite",
                "@id": f"{BASE}/#website",
                "url": f"{BASE}/",
                "name": "MyImpact",
                "inLanguage": ["en", "fr", "nl", "de", "es", "it"],
                "publisher": {"@id": "https://institutnr.org/#organization"},
            },
            {
                "@type": "WebApplication",
                "@id": f"{BASE}/#app",
                "name": "MyImpact",
                "url": url,
                "description": description,
                "applicationCategory": "UtilitiesApplication",
                "operatingSystem": "Any",
                "browserRequirements": "Requires JavaScript",
                "isAccessibleForFree": True,
                "inLanguage": lang,
                "dateModified": TODAY,
                "offers": {"@type": "Offer", "price": "0", "priceCurrency": "EUR"},
                "author": organizations(),
                "publisher": {"@id": "https://institutnr.org/#organization"},
                "creditText": "Institut du Numérique Responsable — MyImpact",
                "citation": "Institut du Numérique Responsable, MyImpact — calculatrice d'impacts numériques, "
                            f"{BASE}",
                "isBasedOn": [
                    {"@type": "Dataset", "name": "Boavizta — impacts des équipements numériques", "url": "https://boavizta.org/"},
                    {"@type": "Dataset", "name": "Impact CO₂ (ADEME)", "url": "https://impactco2.fr/"},
                ],
            },
            {
                "@type": "WebPage",
                "@id": url + "#page",
                "url": url,
                "name": title,
                "description": description,
                "inLanguage": lang,
                "isPartOf": {"@id": f"{BASE}/#website"},
                "about": {"@id": f"{BASE}/#app"},
                "publisher": {"@id": "https://institutnr.org/#organization"},
            },
        ],
    }


def jsonld_secondary(lang: str, url: str, title: str, description: str, home: str) -> dict:
    """Graph for a content page: page plus a two-level breadcrumb."""
    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": url + "#page",
                "url": url,
                "name": title,
                "description": description,
                "inLanguage": lang,
                "isPartOf": {"@id": f"{BASE}/#website"},
                "publisher": {"@id": "https://institutnr.org/#organization"},
                "breadcrumb": {"@id": url + "#breadcrumb"},
            },
            {
                "@type": "BreadcrumbList",
                "@id": url + "#breadcrumb",
                "itemListElement": [
                    {"@type": "ListItem", "position": 1, "name": "MyImpact", "item": f"{BASE}{home}"},
                    {"@type": "ListItem", "position": 2, "name": title, "item": url},
                ],
            },
        ],
    }


def update_jsonld(html: str, payload: dict) -> str:
    block = ('    <script type="application/ld+json">\n'
             + json.dumps(payload, ensure_ascii=False, indent=2)
             + "\n    </script>")
    if re.search(r'<script type="application/ld\+json">.*?</script>', html, re.S):
        return re.sub(r'[ \t]*<script type="application/ld\+json">.*?</script>',
                      lambda _: block, html, count=1, flags=re.S)
    return html.replace("</head>", block + "\n  </head>", 1)


def meta(html: str, name: str) -> str:
    m = re.search(rf'<(?:meta|title)[^>]*name="{name}"[^>]*content="([^"]*)"', html)
    return m.group(1) if m else ""


def page_to_markdown(path: Path) -> str:
    """Readable text of a page: headings and bullets kept, chrome dropped."""
    html = path.read_text(encoding="utf-8")
    body = re.search(r"<body.*?</body>", html, re.S)
    text = body.group(0) if body else html
    # Ni <header> ni <footer> ne sont retires : sur ce site le contenu vit dans
    # des <header class="section__header">, les supprimer viderait la page.
    text = re.sub(r"<(script|style|nav)\b.*?</\1>", " ", text, flags=re.S)
    text = re.sub(r"<h([1-4])[^>]*>(.*?)</h\1>", lambda m: "\n\n" + "#" * (int(m.group(1)) + 1) + " " + m.group(2) + "\n", text, flags=re.S)
    text = re.sub(r"<li[^>]*>(.*?)</li>", r"\n- \1", text, flags=re.S)
    text = re.sub(r"</p>", "\n\n", text)
    text = re.sub(r"<[^>]+>", " ", text)
    text = unescape(text)
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"^[ \t]+", "", text, flags=re.M)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def build_llms_full() -> None:
    """Long-form document for answer engines: methodology, in French and English."""
    parts = [
        "# MyImpact — méthodologie et sources / methodology and sources",
        "",
        "> Document destiné aux moteurs de réponse. Texte repris des pages « Sources & détails »",
        "> du site MyImpact, calculatrice d'empreinte numérique de l'Institut du Numérique Responsable.",
        "",
        "## Attribution",
        "",
        "    Institut du Numérique Responsable, MyImpact — calculatrice d'impacts numériques,",
        f"    {BASE}",
        "",
        f"Généré le {TODAY}. © INR — tous droits réservés. Voir {BASE}/legal-notice.html",
        "",
        "---",
        "",
    ]

    for lang, path in (("fr", "/fr/a-propos-numerique-responsable.html"), ("en", "/about-sustainable-it.html")):
        file = local_path(path)
        if not file.exists():
            continue
        parts.append(f"# Sources & détails ({lang.upper()}) — {BASE}{path}")
        parts.append("")
        parts.append(page_to_markdown(file))
        parts.append("")
        parts.append("---")
        parts.append("")

    (ROOT / "llms-full.txt").write_text("\n".join(parts).rstrip() + "\n", encoding="utf-8")
    print(f"llms-full.txt : {(ROOT / 'llms-full.txt').stat().st_size} octets")


def main() -> None:
    urls = []

    for group_name, group in GROUPS.items():
        for lang, path in group.items():
            file = local_path(path)
            if not file.exists():
                print(f"  absent : {file}")
                continue

            html = file.read_text(encoding="utf-8")
            html = update_hreflang(html, group)

            title = re.search(r"<title>(.*?)</title>", html, re.S)
            title = re.sub(r"\s+", " ", title.group(1)).strip() if title else "MyImpact"
            description = meta(html, "description")
            url = f"{BASE}{path}"

            payload = (jsonld_home(lang, url, title, description) if group_name == "home"
                       else jsonld_secondary(lang, url, title, description, group.get("en", "/")))
            html = update_jsonld(html, payload)

            file.write_text(html, encoding="utf-8")
            print(f"  mis à jour : {path}")

            if group_name not in NOINDEX_GROUPS:
                urls.append((url, group, lang, PRIORITIES.get(group_name, "0.5")))

    lines = ['<?xml version="1.0" encoding="UTF-8"?>',
             '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
             '        xmlns:xhtml="http://www.w3.org/1999/xhtml">']
    for url, group, lang, priority in urls:
        lines.append("  <url>")
        lines.append(f"    <loc>{url}</loc>")
        if len(group) > 1:
            for alt_lang, alt_path in group.items():
                lines.append(f'    <xhtml:link rel="alternate" hreflang="{alt_lang}" href="{BASE}{alt_path}"/>')
            lines.append(f'    <xhtml:link rel="alternate" hreflang="x-default" href="{BASE}{group["en"]}"/>')
        lines.append(f"    <lastmod>{TODAY}</lastmod>")
        lines.append("    <changefreq>monthly</changefreq>")
        lines.append(f"    <priority>{priority}</priority>")
        lines.append("  </url>")
    lines.append("</urlset>")
    (ROOT / "sitemap.xml").write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"sitemap.xml : {len(urls)} URL")

    build_llms_full()


if __name__ == "__main__":
    main()
