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

assert(HTML_FILES.length == 24, "24 pages HTML attendues, #{HTML_FILES.length} trouvées")

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
assert(system("node", "--check", ROOT.join("equipment-additions.js").to_s, out: File::NULL), "syntaxe des équipements invalide")

CALCULATOR_SCRIPTS.each do |relative|
  path = ROOT.join(relative)
  content = path.read
  assert(content.include?("function positiveNumber"), "validation numérique absente de #{relative}")
  assert(content.include?('var modelID = "model_" + newDeviceID'), "identifiants de modèle non uniques dans #{relative}")
  assert(content.include?('var lifetimeID = "lifetime_" + newDeviceID'), "identifiants de durée non uniques dans #{relative}")
  assert(system("node", "--check", path.to_s, out: File::NULL), "syntaxe JavaScript invalide dans #{relative}")
end

assert(system("node", "--check", ROOT.join("cookie-consent.js").to_s, out: File::NULL), "syntaxe du consentement invalide")

puts "OK : 24 pages, 6 calculateurs et les équipements v1.3 contrôlés"
