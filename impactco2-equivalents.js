/* globals $, CO2kmvoiture, CO2kmavion */

(function () {
  "use strict";

  var API_ROOT = "https://impactco2.fr/api/v1/thematiques/ecv/";

  // Current Impact CO₂/ADEME values used when the API is unavailable.
  window.impactCO2Factors = {
    mealBeef: 4.97,
    car: 0.14225341222954335,
    planeMedium: 0.184661,
    planeLong: 0.177894,
    laptop: 192.62004125,
    smartphone: 80.155343125
  };

  function findValue(data, slug, fallback) {
    var item = data.find(function (entry) { return entry.slug === slug; });
    return item && Number(item.ecv) > 0 ? Number(item.ecv) : fallback;
  }

  function getCategory(category, detail) {
    return fetch(API_ROOT + category + "?language=fr" + (detail ? "&detail=1" : ""), {
      method: "GET",
      mode: "cors",
      credentials: "omit",
      headers: { "Accept": "application/json" }
    }).then(function (response) {
      if (!response.ok) throw new Error("Impact CO2 API: " + response.status);
      return response.json();
    }).then(function (payload) {
      return Array.isArray(payload.data) ? payload.data : [];
    });
  }

  window.impactCO2Ready = Promise.all([
    getCategory("alimentation"),
    getCategory("numerique", true),
    getCategory("transport")
  ]).then(function (categories) {
    var factors = window.impactCO2Factors;
    var food = categories[0];
    var digital = categories[1];
    var transport = categories[2];

    factors.mealBeef = findValue(food, "repasavecduboeuf", factors.mealBeef);
    factors.laptop = findValue(digital, "ordinateurportable", factors.laptop);
    factors.smartphone = findValue(digital, "smartphone", factors.smartphone);
    factors.car = findValue(transport, "voiturethermique", factors.car);
    factors.planeMedium = findValue(transport, "avion-moyencourrier", factors.planeMedium);
    factors.planeLong = findValue(transport, "avion-longcourrier", factors.planeLong);

    var laptop = digital.find(function (entry) { return entry.slug === "ordinateurportable"; });
    var smartphone = digital.find(function (entry) { return entry.slug === "smartphone"; });
    var equipment = window.impactCO2EquipmentDevices;
    if (equipment && laptop && smartphone) {
      if (Number(laptop.footprint) > 0) equipment.laptop.production = Number(laptop.footprint);
      if (laptop.usage && Number(laptop.usage.peryear) > 0) {
        equipment.laptop.usage = Number(laptop.usage.peryear) / 0.052;
      }
      if (Number(smartphone.footprint) > 0) equipment.smartphone.production = Number(smartphone.footprint);
      if (smartphone.usage && Number(smartphone.usage.peryear) > 0) {
        equipment.smartphone.usage = Number(smartphone.usage.peryear) / 0.052;
      }
    }

    if (typeof CO2kmvoiture !== "undefined") CO2kmvoiture = factors.car;
    if (typeof CO2kmavion !== "undefined") CO2kmavion = factors.planeMedium;

    return factors;
  }).catch(function () {
    return window.impactCO2Factors;
  });
}());
