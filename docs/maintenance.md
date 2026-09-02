# Maintenance

## Bibliothèques tierces

Le site n'embarque que trois dépendances, toutes auto-hébergées — aucun CDN.

| Composant | Version | Rôle | Licence |
|---|---|---|---|
| jQuery | 3.7.1 | Manipulation du DOM, événements | MIT |
| tarteaucitron.js | 1.34.0 | Bandeau et panneau de consentement | MIT |
| Font Awesome Free | 7.3.1 | Icônes SVG intégrées aux pages | CC BY 4.0 |
| Montserrat | — | Police variable auto-hébergée | SIL OFL 1.1 |

`THIRD_PARTY_NOTICES.md` doit refléter ces versions : le mettre à jour en même
temps que la bibliothèque.

### jQuery

3.7.1 est la dernière version de la branche 3 et ne porte aucune vulnérabilité
connue — les CVE jQuery concernent les versions antérieures à 3.5. La branche 4
existe mais supprime des API : c'est une migration à mener avec des tests, pas
une mise à jour de sécurité.

### tarteaucitron

```bash
curl -sL https://registry.npmjs.org/tarteaucitronjs/-/tarteaucitronjs-<version>.tgz -o /tmp/tac.tgz
tar xzf /tmp/tac.tgz -C /tmp
cp /tmp/package/{tarteaucitron.js,tarteaucitron.services.js,advertising.js,package.json,LICENSE,README.md} tarteaucitron/
cp -r /tmp/package/css/. tarteaucitron/css/
cp -r /tmp/package/lang/. tarteaucitron/lang/
```

Après mise à jour, vérifier **dans le navigateur** — un CMP qui ne s'affiche
plus est une non-conformité RGPD, pas un simple défaut visuel :

1. effacer les cookies `tarteaucitron*`, recharger : le bandeau doit apparaître ;
2. ouvrir le panneau : le service **Matomo** doit y figurer, avec « Autoriser »
   et « Interdire » ;
3. accepter, puis vérifier que Matomo enregistre la visite ;
4. la console ne doit montrer aucune violation CSP.

Le service utilisé est `matomocloud`, malgré son nom : c'est celui qui convient
à une instance Matomo auto-hébergée, configurée dans `cookie-consent.js`.

## Facteurs d'impact

Les facteurs d'équipement et les mix électriques sont figés dans les
`scripts*.js` de chaque langue. Ils doivent être modifiés **dans les six
fichiers** — c'est le point le plus facile à rater.

Les équivalences carbone, elles, viennent de l'API Impact CO₂ de l'ADEME et se
mettent à jour d'elles-mêmes ; les valeurs de repli intégrées au projet ne
servent qu'en cas d'indisponibilité.

À chaque révision des facteurs :

1. mettre à jour les six `scripts*.js` ;
2. mettre à jour les pages « Sources & détails » (la date de dernier relevé y
   est écrite) ;
3. incrémenter le numéro de version affiché sur les pages d'accueil ;
4. relancer `python3 tools/build-seo.py` — `llms-full.txt` reprend le texte des
   pages « Sources & détails » ;
5. déployer, vérifier, soumettre à IndexNow.

## Ajouter une langue

1. Dupliquer un répertoire de langue existant, traduire HTML et `scripts.js`.
2. Ajouter la langue à chaque groupe de `GROUPS` dans `tools/build-seo.py`.
3. Ajouter le sélecteur de langue dans les pages des autres langues.
4. Compléter `llms.txt` (liste des langues) et la liste des locales de
   `tarteaucitron` si nécessaire.
5. Relancer le générateur, déployer, vérifier les `hreflang` réciproques.

## Mentions légales

Six fichiers, un par langue. Toute modification doit être portée dans les six,
avec le numéro de version et la date en tête de page.

Elles contiennent : éditeur (avec **RNA** et **SIREN**), directeur de la
publication, hébergeur, limitation de responsabilité, droits RGPD et contact du
DPO, autorité de contrôle, cookies et mesure d'audience, données Impact CO₂ /
ADEME, propriété intellectuelle et renvoi aux licences tierces.

## Contrôles

Le répertoire `tests/` contient des contrôles statiques (`check-static.rb`,
`check-impactco2.js`). Ils ne sont pas exécutés par une intégration continue :
les lancer à la main avant une publication importante.

## Calendrier suggéré

| Fréquence | À faire |
|---|---|
| À chaque publication | Vérifier les pages en production, la console, les équivalents carbone |
| Trimestriel | Versions des bibliothèques, parcours de consentement |
| Semestriel | Facteurs d'impact, dates des pages « Sources & détails » |
| Annuel | Mentions légales (identifiants, DPO, hébergeur), licences tierces |
