/* globals deviceTypes */

(function () {
  "use strict";

  var language = document.documentElement.lang || "en";
  var labels = {
    en: {
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
