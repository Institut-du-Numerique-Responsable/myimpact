#!/usr/bin/env ruby
# frozen_string_literal: true

require "pathname"
require "json"

ROOT = Pathname.new(__dir__).join("..").expand_path
HTML_FILES = ROOT.glob("**/*.html").freeze
CALCULATOR_SCRIPTS = %w[
  scripts-en.js
  fr/scripts.js
  nl/scripts.js
  de/scripts.js
  es/scripts.js
  it/scripts.js
].freeze

def assert(condition, message)
  abort "ÉCHEC : #{message}" unless condition
end

assert(HTML_FILES.length == 25, "25 pages HTML attendues, #{HTML_FILES.length} trouvées")

HTML_FILES.each do |path|
  content = path.read
  relative = path.relative_path_from(ROOT)
  assert(content.include?('content="width=device-width, initial-scale=1"'), "viewport accessible manquant dans #{relative}")
  assert(content.include?("cookie-consent.js"), "gestion du consentement absente de #{relative}")
  assert(!content.include?("var _paq = window._paq"), "chargement Matomo direct dans #{relative}")

  content.scan(/(?:href|src)="([^"]+)"/).flatten.each do |reference|
    next if reference.empty? || reference.match?(/\A(?:https?:|mailto:|tel:|#|data:|javascript:)/)

    local_path = path.dirname.join(reference.split(/[?#]/).first)
    local_path = local_path.join("index.html") if local_path.directory?
    assert(local_path.exist?, "référence locale cassée dans #{relative} : #{reference}")
  end
end

consent = ROOT.join("cookie-consent.js").read
assert(consent.include?("matomoCustomJSPath"), "script Matomo auto-hébergé non configuré")
assert(consent.include?('push("matomocloud")'), "service Matomo soumis au consentement absent")

equipment = ROOT.join("equipment-additions.js").read
{
  '"production": 36.1' => "box/routeur",
  '"production": 6.25' => "clé USB",
  '"production": 109' => "SSD externe",
  '"production": 15.8' => "disque dur externe",
  '"production": 3.17' => "webcam externe",
  '"scope": "manufacturing-only"' => "périmètre matériel de la webcam"
}.each do |factor, label|
  assert(equipment.include?(factor), "facteur manquant pour #{label}")
end
assert(equipment.scan(/^[ ]{4}(?:en|fr|nl|de|es|it): \{$/).length == 6, "six traductions d’équipements attendues")
assert(equipment.include?('"production": 182.3'), "ordinateur portable générique récent absent")
assert(equipment.include?('"production": 79.27'), "smartphone générique récent absent")
assert(equipment.include?("including MacBook"), "repère MacBook récent absent")
assert(equipment.include?("including iPhone"), "repère iPhone récent absent")
[
  "Apple MacBook Air 13-inch M4 (2025)",
  "Apple MacBook Air M2 256GB (2022)",
  "Dell Latitude 7450 (2024)",
  "Dell XPS 9320 (2022)",
  "HP EliteBook 8 G2i 14-inch (2026)",
  "HP Spectre x360 16-inch (2022)",
  "Lenovo ThinkPad X1 Carbon Gen 8 (2020)",
  "Apple iPhone 16 128GB (2024)",
  "Samsung Galaxy S25 (2025)",
  "OPPO Find X5 Pro (2022)"
].each { |model| assert(equipment.include?(model), "modèle récent manquant : #{model}") }
assert(equipment.include?('"scope": "manufacturer-model"'), "périmètre constructeur absent")
assert(equipment.include?('"scope": "generic-category-branded-example"'), "périmètre générique OPPO absent")
assert(equipment.include?('"scope": "boavizta-manufacturer-model"'), "périmètre Boavizta absent")

calculator_scripts = ["scripts-en.js", "fr/scripts.js", "nl/scripts.js", "de/scripts.js", "es/scripts.js", "it/scripts.js"]
calculator_scripts.each do |relative|
  script = ROOT.join(relative).read
  assert(!script.match?(/201[0-4]/), "équipement 2010-2014 encore présent dans #{relative}")
  assert(!script.include?('"name": "Apple iPhone"'), "ancien iPhone générique encore présent dans #{relative}")
end
assert(system("node", "--check", ROOT.join("equipment-additions.js").to_s, out: File::NULL), "syntaxe des équipements invalide")

locations = ROOT.join("location-additions.js").read
{
  '"indicator": "ma", "energyMix": 0.5964' => "Maroc",
  '"indicator": "tn", "energyMix": 0.56029' => "Tunisie",
  '"indicator": "gb", "energyMix": 0.21741' => "Royaume-Uni",
  '"indicator": "pl", "energyMix": 0.5886' => "Pologne",
  '"indicator": "ro", "energyMix": 0.25075' => "Roumanie",
  '"indicator": "pt", "energyMix": 0.12791' => "Portugal"
}.each do |factor, country|
  assert(locations.include?(factor), "facteur électrique manquant pour #{country}")
end
assert(locations.scan(/^[ ]{4}(?:en|fr|nl|de|es|it): \{/).length == 6, "six traductions de pays attendues")
assert(system("node", "--check", ROOT.join("location-additions.js").to_s, out: File::NULL), "syntaxe des localisations invalide")
calculator_pages = %w[index.html fr/index.html nl/index.html de/index.html es/index.html it/index.html]
calculator_pages.each do |relative|
  assert(ROOT.join(relative).read.include?("location-additions.js"), "localisations absentes de #{relative}")
end
methodology_pages = %w[
  about-sustainable-it.html
  fr/a-propos-numerique-responsable.html
  nl/over-de-rekenmachine-duurzame-it.html
  de/about-sustainable-it.html
  es/about-sustainable-it.html
  it/about-sustainable-it.html
]
methodology_pages.each do |relative|
  assert(ROOT.join(relative).read.include?("carbon-intensity-electricity"), "source électrique absente de #{relative}")
end

CALCULATOR_SCRIPTS.each do |relative|
  path = ROOT.join(relative)
  content = path.read
  assert(content.include?("function positiveNumber"), "validation numérique absente de #{relative}")
  assert(content.include?('var modelID = "model_" + newDeviceID'), "identifiants de modèle non uniques dans #{relative}")
  assert(content.include?('var lifetimeID = "lifetime_" + newDeviceID'), "identifiants de durée non uniques dans #{relative}")
  assert(system("node", "--check", path.to_s, out: File::NULL), "syntaxe JavaScript invalide dans #{relative}")
end

assert(system("node", "--check", ROOT.join("cookie-consent.js").to_s, out: File::NULL), "syntaxe du consentement invalide")

impact_co2 = ROOT.join("impactco2-equivalents.js").read
%w[repasavecduboeuf ordinateurportable smartphone voiturethermique avion-moyencourrier avion-longcourrier].each do |slug|
  assert(impact_co2.include?(slug), "équivalent Impact CO₂ manquant : #{slug}")
end
assert(impact_co2.include?('credentials: "omit"'), "identifiants indûment transmis à Impact CO₂")
assert(system("node", ROOT.join("tests/check-impactco2.js").to_s, out: File::NULL), "intégration Impact CO₂ invalide")
calculator_pages.each do |relative|
  content = ROOT.join(relative).read
  assert(content.include?("impactco2-equivalents.js"), "API Impact CO₂ absente de #{relative}")
  assert(content.include?("INR &amp; ISIT"), "nom de site INR/ISIT absent de #{relative}")
  assert(content.include?("https://institutnr.org/"), "INR France absent de #{relative}")
  assert(content.include?("https://isit-be.org/"), "ISIT Belgique absent de #{relative}")
  assert(content.include?("https://isit-ch.org/"), "ISIT Suisse absent de #{relative}")
  json_ld = content[/<script type="application\/ld\+json">\s*(.*?)\s*<\/script>/m, 1]
  assert(json_ld && JSON.parse(json_ld), "JSON-LD invalide dans #{relative}")
end
assert(HTML_FILES.none? { |path| path.read.include?("monconvertisseurco2.fr") }, "ancien convertisseur CO₂ encore référencé")
legal_pages = %w[
  legal-notice.html fr/mentions-legales.html nl/wettelijke-vermeldingen.html
  de/rechtliche-hinweise.html es/aviso-legal.html it/note-legali.html
]
legal_pages.each do |relative|
  content = ROOT.join(relative).read
  assert(content.include?("https://impactco2.fr/doc/api"), "API Impact CO₂ absente de #{relative}")
  assert(content.include?("https://impactco2.fr/politique-de-confidentialite"), "confidentialité Impact CO₂ absente de #{relative}")
  assert(content.include?("THIRD_PARTY_NOTICES.md"), "notice des composants tiers absente de #{relative}")
end

assert(HTML_FILES.none? { |path| path.read.include?("Font Awesome Pro") }, "icône Font Awesome Pro encore présente")
assert(ROOT.join("THIRD_PARTY_NOTICES.md").read.include?("Font Awesome Free 7.3.1"), "attribution Font Awesome Free absente")
assert(ROOT.join("fonts/OFL.txt").read.include?("SIL OPEN FONT LICENSE"), "licence Montserrat absente")
assert(ROOT.join("README.md").read.include?("CC0 1.0 Universal"), "licence du README incohérente avec LICENSE")

presentation = ROOT.join("fr/presentation-myimpact.html").read
assert(presentation.include?('rel="canonical"'), "URL canonique absente de la présentation")
assert(presentation.include?('"@type": "WebApplication"'), "données structurées WebApplication absentes")
assert(presentation.include?('"@type": "FAQPage"'), "données structurées FAQ absentes")
assert(ROOT.join("sitemap.xml").read.include?("fr/presentation-myimpact.html"), "présentation absente du sitemap")
stylesheet = ROOT.join("stylesheet-inr.css").read
assert(stylesheet.include?(".block-unit"), "style des unités absent des libellés")
calculator_pages.each do |relative|
  content = ROOT.join(relative).read
  assert(content.scan('class="block-unit"').length == 10, "10 libellés avec unité attendus dans #{relative}")
end
assert(stylesheet.include?('#total_impact::after'), "unités absentes des totaux")

puts "OK : 25 pages, 6 calculateurs, Impact CO₂, les équipements, les localisations et la présentation SEO contrôlés"
