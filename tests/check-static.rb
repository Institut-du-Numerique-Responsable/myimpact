#!/usr/bin/env ruby
# frozen_string_literal: true

require "pathname"

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
  assert(ROOT.join(relative).read.include?("impactco2-equivalents.js"), "API Impact CO₂ absente de #{relative}")
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
end

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
