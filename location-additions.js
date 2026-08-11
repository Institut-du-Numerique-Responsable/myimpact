/* globals countries */

(function () {
  "use strict";

  // Lifecycle carbon intensity of electricity generation, Ember (2026),
  // with major processing by Our World in Data. Data year: 2025.
  // https://ourworldindata.org/grapher/carbon-intensity-electricity
  var additions = [
    { "indicator": "ma", "energyMix": 0.5964 },
    { "indicator": "tn", "energyMix": 0.56029 },
    { "indicator": "gb", "energyMix": 0.21741 },
    { "indicator": "pl", "energyMix": 0.5886 },
    { "indicator": "ro", "energyMix": 0.25075 },
    { "indicator": "pt", "energyMix": 0.12791 }
  ];

  var labels = {
    en: { ma: "Morocco", tn: "Tunisia", gb: "United Kingdom", pl: "Poland", ro: "Romania", pt: "Portugal" },
    fr: { ma: "Maroc", tn: "Tunisie", gb: "Royaume-Uni", pl: "Pologne", ro: "Roumanie", pt: "Portugal" },
    nl: { ma: "Marokko", tn: "Tunesië", gb: "Verenigd Koninkrijk", pl: "Polen", ro: "Roemenië", pt: "Portugal" },
    de: { ma: "Marokko", tn: "Tunesien", gb: "Vereinigtes Königreich", pl: "Polen", ro: "Rumänien", pt: "Portugal" },
    es: { ma: "Marruecos", tn: "Túnez", gb: "Reino Unido", pl: "Polonia", ro: "Rumanía", pt: "Portugal" },
    it: { ma: "Marocco", tn: "Tunisia", gb: "Regno Unito", pl: "Polonia", ro: "Romania", pt: "Portogallo" }
  };

  additions.forEach(function (country) {
    countries.push(country);
  });

  document.addEventListener("DOMContentLoaded", function () {
    var select = document.getElementById("select_country");
    var language = document.documentElement.lang || "en";
    var localizedLabels = labels[language] || labels.en;

    if (!select) return;

    additions.forEach(function (country) {
      var option = document.createElement("option");
      option.value = country.indicator;
      option.textContent = localizedLabels[country.indicator];
      select.appendChild(option);
    });
  });
}());
