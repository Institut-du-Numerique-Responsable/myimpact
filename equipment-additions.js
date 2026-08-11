/* globals deviceTypes */

(function () {
  "use strict";

  var language = document.documentElement.lang || "en";
  var labels = {
    en: {
      recentLaptop: "Recent laptop, including MacBook — generic ADEME estimate",
      recentSmartphone: "Recent smartphone, including iPhone — generic ADEME estimate",
      manufacturerProductionGenericUse: "manufacturer production / generic ADEME use",
      genericFootprint: "generic ADEME footprint",
      network: "Network equipment",
      box: "Internet box / Wi-Fi router",
      storage: "External storage",
      usb: "USB flash drive",
      ssd: "External SSD",
      hdd: "External hard drive",
      video: "Video equipment",
      webcam: "External webcam — hardware only"
    },
    fr: {
      recentLaptop: "Ordinateur portable récent, dont MacBook — estimation générique ADEME",
      recentSmartphone: "Smartphone récent, dont iPhone — estimation générique ADEME",
      manufacturerProductionGenericUse: "fabrication constructeur / usage générique ADEME",
      genericFootprint: "empreinte générique ADEME",
      network: "Équipement réseau",
      box: "Box Internet / routeur Wi-Fi",
      storage: "Stockage externe",
      usb: "Clé USB",
      ssd: "SSD externe",
      hdd: "Disque dur externe",
      video: "Équipement vidéo",
      webcam: "Webcam externe — matériel uniquement"
    },
    nl: {
      recentLaptop: "Recente laptop, inclusief MacBook — algemene ADEME-schatting",
      recentSmartphone: "Recente smartphone, inclusief iPhone — algemene ADEME-schatting",
      manufacturerProductionGenericUse: "productie fabrikant / algemeen ADEME-gebruik",
      genericFootprint: "algemene ADEME-voetafdruk",
      network: "Netwerkapparatuur",
      box: "Internetbox / wifi-router",
      storage: "Externe opslag",
      usb: "USB-stick",
      ssd: "Externe SSD",
      hdd: "Externe harde schijf",
      video: "Videoapparatuur",
      webcam: "Externe webcam — alleen hardware"
    },
    de: {
      recentLaptop: "Aktueller Laptop, einschließlich MacBook — allgemeine ADEME-Schätzung",
      recentSmartphone: "Aktuelles Smartphone, einschließlich iPhone — allgemeine ADEME-Schätzung",
      manufacturerProductionGenericUse: "Hersteller-Produktion / allgemeine ADEME-Nutzung",
      genericFootprint: "allgemeiner ADEME-Fußabdruck",
      network: "Netzwerkgerät",
      box: "Internetbox / WLAN-Router",
      storage: "Externer Speicher",
      usb: "USB-Stick",
      ssd: "Externe SSD",
      hdd: "Externe Festplatte",
      video: "Videogerät",
      webcam: "Externe Webcam — nur Hardware"
    },
    es: {
      recentLaptop: "Portátil reciente, incluido MacBook — estimación genérica ADEME",
      recentSmartphone: "Smartphone reciente, incluido iPhone — estimación genérica ADEME",
      manufacturerProductionGenericUse: "fabricación del fabricante / uso genérico ADEME",
      genericFootprint: "huella genérica ADEME",
      network: "Equipo de red",
      box: "Router / dispositivo de acceso a Internet",
      storage: "Almacenamiento externo",
      usb: "Memoria USB",
      ssd: "SSD externo",
      hdd: "Disco duro externo",
      video: "Equipo de vídeo",
      webcam: "Cámara web externa — solo hardware"
    },
    it: {
      recentLaptop: "Laptop recente, incluso MacBook — stima generica ADEME",
      recentSmartphone: "Smartphone recente, incluso iPhone — stima generica ADEME",
      manufacturerProductionGenericUse: "produzione del produttore / uso generico ADEME",
      genericFootprint: "impronta generica ADEME",
      network: "Apparecchiatura di rete",
      box: "Router / dispositivo di accesso a Internet",
      storage: "Archiviazione esterna",
      usb: "Chiavetta USB",
      ssd: "SSD esterno",
      hdd: "Disco rigido esterno",
      video: "Apparecchiatura video",
      webcam: "Webcam esterna — solo hardware"
    }
  };
  var text = labels[language] || labels.en;

  // Impact CO₂ detailed ECV data (ADEME): generic current categories.
  // The labels mention MacBook and iPhone only as familiar examples of each
  // category; these are not Apple model-specific product declarations.
  var recentLaptop = {
    "name": text.recentLaptop,
    "production": 182.3,
    "usage": 28.9616971154,
    "source": "Impact CO₂ API / ADEME — ordinateurportable, detail=1",
    "scope": "generic-category"
  };
  var recentSmartphone = {
    "name": text.recentSmartphone,
    "production": 79.27,
    "usage": 4.917,
    "source": "Impact CO₂ API / ADEME — smartphone, detail=1",
    "scope": "generic-category"
  };
  window.impactCO2EquipmentDevices = {
    laptop: recentLaptop,
    smartphone: recentSmartphone
  };
  deviceTypes[1].devices.unshift(recentLaptop);
  deviceTypes[2].devices.unshift(recentSmartphone);

  // Recent manufacturer examples. The calculator requires a manufacturing
  // footprint and annual electricity in kWh. A generic ADEME value is kept
  // whenever a manufacturer report does not disclose one of these fields.
  deviceTypes[1].devices.splice(
    1,
    0,
    {
      "name": "Apple MacBook Air 13-inch M4 (2025) — " + text.manufacturerProductionGenericUse,
      "production": 85.2,
      "usage": 28.9616971154,
      "source": "Apple M4 MacBook Air Product Environmental Report, 2025; Impact CO₂/ADEME usage",
      "scope": "manufacturer-production-generic-use"
    },
    {
      "name": "Dell Latitude 7450 (2024)",
      "production": 85.58,
      "usage": 13.5,
      "source": "Dell Latitude 7450 Life Cycle Assessment, February 2024",
      "scope": "manufacturer-model"
    },
    {
      "name": "HP EliteBook 8 G2i 14-inch (2026)",
      "production": 159.31,
      "usage": 13,
      "source": "HP Product Carbon Footprint c09270910, Europe, March 2026",
      "scope": "manufacturer-model"
    },
    {
      "name": "Lenovo ThinkPad X1 Carbon Gen 8 (2020) — " + text.genericFootprint,
      "production": 182.3,
      "usage": 18.4,
      "source": "Lenovo PCF (2020) and ENERGY STAR TEC; Impact CO₂/ADEME manufacturing",
      "scope": "generic-production-manufacturer-use"
    }
  );

  deviceTypes[2].devices.splice(
    1,
    0,
    {
      "name": "Apple iPhone 16 128GB (2024) — " + text.manufacturerProductionGenericUse,
      "production": 44.8,
      "usage": 4.917,
      "source": "Apple iPhone 16 Product Environmental Report, 2024; Impact CO₂/ADEME usage",
      "scope": "manufacturer-production-generic-use"
    },
    {
      "name": "Samsung Galaxy S25 (2025) — " + text.manufacturerProductionGenericUse,
      "production": 40.216,
      "usage": 4.917,
      "source": "Samsung Galaxy S25 Product Environmental Report, Europe, 2025; Impact CO₂/ADEME usage",
      "scope": "manufacturer-production-generic-use"
    },
    {
      "name": "OPPO Find X5 Pro (2022) — " + text.genericFootprint,
      "production": 79.27,
      "usage": 4.917,
      "source": "Impact CO₂/ADEME generic smartphone; OPPO model identification only",
      "scope": "generic-category-branded-example"
    }
  );

  deviceTypes.push(
    {
      "name": text.network,
      "devices": [
        {
          "name": text.box,
          "production": 36.1,
          "usage": 87.6,
          "source": "BoaviztAPI / Base Empreinte ADEME"
        }
      ]
    },
    {
      "name": text.storage,
      "devices": [
        {"name": text.usb, "production": 6.25, "usage": 0.1314, "source": "BoaviztAPI / Base Empreinte ADEME"},
        {"name": text.ssd, "production": 109, "usage": 1.095, "source": "BoaviztAPI / Base Empreinte ADEME"},
        {"name": text.hdd, "production": 15.8, "usage": 3.3945, "source": "BoaviztAPI / Base Empreinte ADEME"}
      ]
    },
    {
      "name": text.video,
      "devices": [
        {
          "name": text.webcam,
          "production": 3.17,
          "usage": 0,
          "source": "Logitech C920e PCF, ISO 14067, 2024",
          "scope": "manufacturing-only"
        }
      ]
    }
  );
}());
