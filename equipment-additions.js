/* globals deviceTypes */

(function () {
  "use strict";

  var language = document.documentElement.lang || "en";
  var labels = {
    en: {
      recentLaptop: "Recent laptop, including MacBook — generic ADEME estimate",
      recentSmartphone: "Recent smartphone, including iPhone — generic ADEME estimate",
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
