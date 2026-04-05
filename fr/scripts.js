/* globals $ */

var deviceTypes = [
  {
    "name": "PC bureau",
    "devices": [
      {
        "name": "Apple iMac 21,5 pouces",
        "production": 406.16,
        "usage": 151
      },
      {
        "name": "Apple iMac 27 pouces",
        "production": 589.98,
        "usage": 151
      },
      {
        "name": "Apple iMac Pro",
        "production": 674.28,
        "usage": 151
      },
      {
        "name": "Apple Mac Mini",
        "production": 486.6,
        "usage": 151
      },
      {
        "name": "Lenovo ThinkStation",
        "production": 994.38,
        "usage": 151
      },
      {
        "name": "Lenovo Ideacentre",
        "production": 487.79,
        "usage": 151
      },
      {
        "name": "Lenovo Legion",
        "production": 499.03,
        "usage": 151
      },
      {
        "name": "Lenovo autre",
        "production": 420.32,
        "usage": 151
      },
      {
        "name": "HP Thin",
        "production": 111.13,
        "usage": 151
      },
      {
        "name": "HP Workstation",
        "production": 807.01,
        "usage": 151
      },
      {
        "name": "HP autre",
        "production": 484.74,
        "usage": 151
      },
      {
        "name": "Fujitsu Primergy",
        "production": 2536.74,
        "usage": 151
      },
      {
        "name": "Fujitsu autre",
        "production": 478.11,
        "usage": 151
      },
      {
        "name": "Dell",
        "production": 320.86,
        "usage": 151
      },
      {
        "name": "Desktop autre",
        "production": 294.93,
        "usage": 151
      }
    ]
  },
  {
    "name": "PC portable",
    "devices": [
      {
        "name": "Apple MacBook Air 2010/2011",
        "production": 202.53,
        "usage": 48
      },
      {
        "name": "Apple MacBook Air 2013/2016",
        "production": 363.41,
        "usage": 48
      },
      {
        "name": "Apple Macbook Pro 2011",
        "production": 323.33,
        "usage": 48
      },
      {
        "name": "Apple MacBook Pro withRetina Display",
        "production": 580.28,
        "usage": 48
      },
      {
        "name": "Dell Latitude",
        "production": 266.02,
        "usage": 48
      },
      {
        "name": "HP",
        "production": 301.98,
        "usage": 48
      },
      {
        "name": "Lenovo Thinkpad & X1",
        "production": 314.41,
        "usage": 48
      },
      {
        "name": "Lenovo Ideapad",
        "production": 271.4,
        "usage": 48
      },
      {
        "name": "Lenovo Chromebook",
        "production": 225.58,
        "usage": 48
      },
      {
        "name": "Lenovo Legion / Yoga",
        "production": 279.94,
        "usage": 48
      },
      {
        "name": "Lenovo autre",
        "production": 264.28,
        "usage": 48
      },
      {
        "name": "Laptop autre",
        "production": 331.48,
        "usage": 48
      }
    ]
  },
  {
    "name": "Smartphone",
    "devices": [
      {
        "name": "Apple iPhone",
        "production": 62.09,
        "usage": 1.5
      },
      {
        "name": "Téléphone autre < 128Go",
        "production": 44.07,
        "usage": 1.5
      },
      {
        "name": "Téléphone autre > 128Go",
        "production": 58.33,
        "usage": 1.5
      }
    ]
  },
  {
    "name": "Tablette",
    "devices": [
      {
        "name": "Apple iPad",
        "production": 123.23,
        "usage": 5
      },
      {
        "name": "Dell",
        "production": 180.05,
        "usage": 5
      },
      {
        "name": "HP Elite",
        "production": 161.15,
        "usage": 5
      },
      {
        "name": "Tablette autre",
        "production": 135.39,
        "usage": 5
      }
    ]
  },
  {
    "name": "Écran",
    "devices": [
      {
        "name": "Apple LED Cinema",
        "production": 485.2,
        "usage": 50
      },
      {
        "name": "Écran autre",
        "production": 348.6,
        "usage": 50
      }
    ]
  },
  {
    "name": "Imprimante",
    "devices": [
      {
        "name": "Télécopieur grande taille",
        "production": 717.79,
        "usage": 71
      },
      {
        "name": "Imprimantes multifonction de bureau",
        "production": 234.4,
        "usage": 71
      }
    ]
  }
],
visioTools = [
  {
    "key": "google-meet",
    "name": "Google Meet",
    "usage": 0.16
  },
  {
    "key": "microsoft-teams",
    "name": "Microsoft Teams",
    "usage": 0.17
  },
  {
    "key": "bigblue-buttons",
    "name": "BigBlue Buttons",
    "usage": 0.18
  },
  {
    "key": "go-to-meeting",
    "name": "Go To Meeting",
    "usage": 0.18
  },
  {
    "key": "skype",
    "name": "Skype",
    "usage": 0.2
  },
  {
    "key": "cisco-webex",
    "name": "Cisco Webex",
    "usage": 0.21
  },
  {
    "key": "zoom",
    "name": "Zoom",
    "usage": 0.22
  },
  {
    "key": "click-meeting",
    "name": "Click Meeting",
    "usage": 0.22
  },
  {
    "key": "jitsi",
    "name": "JITSI",
    "usage": 0.23
  },
  {
    "key": "infomaniak-kmeet",
    "name": "Infomaniak (Kmeet)",
    "usage": 0.28
  },
  {
    "key": "whereby",
    "name": "Whereby",
    "usage": 0.31
  },
  {
    "key": "discord",
    "name": "Discord",
    "usage": 0.42
  }
],
countries = [
  {"indicator": "fr", "energyMix": 0.052},
  {"indicator": "be", "energyMix": 0.22},
  {"indicator": "ch", "energyMix": 0.027},
  {"indicator": "de", "energyMix": 0.420},
  {"indicator": "at", "energyMix": 0.158},
  {"indicator": "es", "energyMix": 0.207},
  {"indicator": "it", "energyMix": 0.233},
  {"indicator": "nl", "energyMix": 0.284},
  {"indicator": "lu", "energyMix": 0.089}
],
nb_jours_travailles = 215,
numWeeks = 46,
CO2GigaByteCloud = 0.2095,
C02navigation_web = 10, // pollution en g co2 eq / heure
CO2kmvoiture = 0.193,
CO2kmtrain = 0.00173,
CO2kmavion = 0.186,
CO2streaming = 0.0015;
$(document).ready(function () {
  var e = 0,
      t = 0,
      a = 0,
      numOfDevices = 1,
      currentEnergyMix;
  function n(a, e) {
    a.append('<option value="placeholder">Choisissez...</option>');
    $.each(e, function (f, t) {
      var html = '';
      $.each(t.devices, function(f, u) {
        html += '<option value="' + u.name + '">' + u.name + '</option>';
      });
      a.append('<optgroup value="' + f + '" label="' + t.name + '">' + html + '</optgroup>');
    });
  }
  function m(a, e) {
    $.each(e, function (e, t) {
      a.append("<option value=" + t.key + ">" + t.name + "</option>");
    });
  }
  function l() {
    var deviceImpactAnnuel = 0;
    $.each($('[id^="device_impact_annuel_"]'), function(e, t) {
      deviceImpactAnnuel += Number($(t).html());
    });
    (e =
      deviceImpactAnnuel +
      Number($("#storage_google_annuel").html()) +
      Number($("#impact_visio_annuel").html()) +
      Number($("#impact_emails_without_attachments_annuel").html()) +
      Number($("#impact_emails_with_attachments_annuel").html()) +
      Number($("#impact_surf_annuel").html())),
      (t = Number($("#impact_plane_annuel").html()) + Number($("#impact_train_annuel").html()) + Number($("#impact_car_annuel").html())),
      (a = e + t),
      $("#total_impact_numerique").html(e.toFixed(2)),
      $("#total_impact_deplacement").html(t.toFixed(2)),
      $("#total_impact").html(a.toFixed(2));
      var pCarbonFootprintPerResident = a / 1000 / 9.9 * 100;
      $("#p_carbon_footprint_per_resident").html(pCarbonFootprintPerResident.toFixed(1) + "%");
      var pieSegments = $("#p_carbon_footprint_per_resident ~ .pie__segment");
      var pieSegment0Value = Math.min(pCarbonFootprintPerResident.toFixed(), 100);
      var pieSegment1Value = 100 - pieSegment0Value;
      $(pieSegments[0]).css({
        "--value": "" + pieSegment0Value + "",
        "--over50": pieSegment0Value > 50 ? "1" : "0"
      });
      $(pieSegments[1]).css({
        "--value": "" + pieSegment1Value + "",
        "--offset": "" + pieSegment0Value + "",
        "--over50": pieSegment1Value > 50 ? "1" : "0"
      });
      var pTarget2050 = a / 1000 / 2 * 100;
      $("#p_target_2050").html(pTarget2050.toFixed(1) + "%");
      pieSegments = $("#p_target_2050 ~ .pie__segment");
      pieSegment0Value = Math.min(pTarget2050.toFixed(), 100);
      pieSegment1Value = 100 - pieSegment0Value;
      $(pieSegments[0]).css({
        "--value": "" + pieSegment0Value + "",
        "--over50": pieSegment0Value > 50 ? "1" : "0"
      });
      $(pieSegments[1]).css({
        "--value": "" + pieSegment1Value + "",
        "--offset": "" + pieSegment0Value + "",
        "--over50": pieSegment1Value > 50 ? "1" : "0"
      });
      $("#impact_eq_beef_meal").html((a / 7.26).toFixed());
      $("#impact_eq_car_km").html((a / 0.193).toFixed());
      $("#impact_eq_lille_marseille").html((a / 0.193 / 1000).toFixed(1));
      $("#impact_eq_plane_km").html((a / 0.186).toFixed());
      $("#impact_eq_ar_paris_nyc").html((a / 0.186 / 5800 / 2).toFixed(1));
      $("#impact_eq_laptop").html((a / 156).toFixed());
      $("#impact_eq_smartphone").html((a / 32.8).toFixed());
  }
  function w() {
    var selectedCountryIndicator = $('#select_country').val();
    currentEnergyMix = $.grep(countries, function(e, t) {
      return e.indicator === selectedCountryIndicator;
    })[0].energyMix;
    $('[data-device-field="model"]').change();
  }
  function i() {
    var deviceFieldGroup = $(this).closest('.groupe[data-device-id]');
    var deviceID = $(deviceFieldGroup).attr('data-device-id');
    var deviceModel = $(deviceFieldGroup).find('[data-device-field="model"]');
    var deviceName = $(deviceModel).val();
    var lifetime = 0;
    var usage = 0;
    var device = {"production": 0};
    if(deviceName != "placeholder") {
      var deviceTypeKey = $(deviceModel).find('option:selected').closest('optgroup').attr('value');
      device = $.grep(deviceTypes[deviceTypeKey].devices, function(e, t) {
        return e.name === deviceName;
      })[0];
      lifetime = $(deviceFieldGroup).find('[data-device-field="lifetime"]').val();
      usage = currentEnergyMix * device.usage * lifetime;
    }
    $("#device_total_" + deviceID).html((usage + device.production).toFixed(2));
    $("#device_production_" + deviceID).html(device.production.toFixed(2));
    $("#device_use_" + deviceID).html(usage.toFixed(2));
    if(lifetime == 0) {
      $("#device_impact_annuel_" + deviceID).html("0.00");
    } else {
      $("#device_impact_annuel_" + deviceID).html(((usage + device.production) / lifetime).toFixed(2));
    }
    l();
  }
  function y() {
    var impactHebdo = 0;
    var impactAnnuel = 0;
    var visioTool = $.grep(visioTools, function(e, t) {
      return e.key === $("#visio_tool").val();
    });
    var visioHours = $("#visio_hours").val();

    if(visioTool.length > 0 && visioHours != "") {
      impactHebdo = Number(visioHours) * 60 * visioTool[0].usage / 1000;

      if($("#visio_camera").val() == "on") {
        impactHebdo = impactHebdo * 2.6;
      }

      impactAnnuel = impactHebdo * 46;
    }

    $("#impact_visio_weekly").html(impactHebdo.toFixed(2));
    $("#impact_visio_annuel").html(impactAnnuel.toFixed(2));

    l();
  }
  function o() {
    var fieldID = $(this).attr('id');
    var impactDaily = 0;
    var impactAnnuel = 0;
    if($(this).val() != "") {
      var CO2mail = fieldID.includes("without") ? 4 : 35;
      impactDaily = (Number($(this).val()) * CO2mail) / 1000;
      impactAnnuel = impactDaily * 46 * 5;
    }
    $("#impact_" + fieldID.replace("num_", "") + "_quotidien").html(impactDaily.toFixed(2));
    $("#impact_" + fieldID.replace("num_", "") + "_annuel").html(impactAnnuel.toFixed(2));
    l();
  }
  $(".add-device").on('click', function() {
    var newDeviceID = numOfDevices + 1;
    $("#device_production_" + numOfDevices).after('<div id="device_production_' + newDeviceID + '"></div>');
    $("#device_use_" + numOfDevices).after('<div id="device_use_' + newDeviceID + '"></div>');
    $("#device_total_" + numOfDevices).after('<div id="device_total_' + newDeviceID + '"></div>');
    $("#device_impact_annuel_" + numOfDevices).after('<div id="device_impact_annuel_' + newDeviceID + '"></div>');
    var newDevice = $('.groupe[data-device-id="1"]').clone().attr("data-device-id", newDeviceID);
    newDevice.find('.device-title').html('Mon équipement n°' + newDeviceID);
    $(".add-device").before(newDevice);
    newDevice.find('[data-device-field="model"]').change();
    numOfDevices = newDeviceID;
  });
  n($('[data-device-field="model"]'), deviceTypes),
  m($("#visio_tool"), visioTools),
  $(document).on('change', '#select_country', w);
  $(document).on('change', '[data-device-field]', i);
  w();
  $("#visio_tool").change(y);
  $("#visio_hours").change(y);
  $("#visio_camera").change(y);
  $("#surf_hours").change(function () {
    var surfHours = $("#surf_hours").val();
    if("" != surfHours) {
      var surfWeekly = Number(surfHours) * C02navigation_web / 1000;
      $('#impact_surf_weekly').html(surfWeekly.toFixed(2));
      $('#impact_surf_annuel').html((surfWeekly * numWeeks).toFixed(2));
    } else {
      $('#impact_surf_weekly').html("0");
      $('#impact_surf_annuel').html("0");
    } 
    l();
  }),
  $("#storage_google").change(function () {
    "" != $("#storage_google").val()
      ? $("#storage_google_annuel").html(
         ($("#storage_google").val() * CO2GigaByteCloud).toFixed(2)
        )
      : $("#storage_google_annuel").html("0"),
      l();
  }),
  $("#num_emails_without_attachments").change(o),
  $("#num_emails_with_attachments").change(o),
  $("#deplacement_plane").change(function () {
    if ("" != $("#deplacement_plane").val()) {
      var e = Number($("#deplacement_plane").val() * CO2kmavion).toFixed(2);
      $("#impact_plane_annuel").html(Number(e).toFixed(2));
    } else $("#impact_plane_annuel").html("0");
    l();
  }),
  $("#deplacement_train").change(function () {
    if ("" != $("#deplacement_train").val()) {
      var e = Number($("#deplacement_train").val() * CO2kmtrain).toFixed(2);
      $("#impact_train_annuel").html(Number(e).toFixed(2));
    } else $("#impact_train_annuel").html("0");
    l();
  }),
  $("#deplacement_car").change(function () {
    if ("" != $("#deplacement_car").val()) {
      var e = Number($("#deplacement_car").val() * CO2kmvoiture).toFixed(2);
      $("#impact_car_annuel").html(Number(e).toFixed(2));
    } else $("#impact_car_annuel").html("0");
    l();
  }),
  $("#storage_google").change(),
  $("#deplacement_plane").change(),
  $("#deplacement_train").change(),
  $("#deplacement_car").change();
});

jQuery(document).ready(function($) {
  tarteaucitron.init({
        "privacyUrl": "https://myimpact.isit-europe.org/mentions-legales.html", /* Privacy policy url */

        "hashtag": "#tarteaucitron", /* Open the panel with this hashtag */
        "cookieName": "tarteaucitron", /* Cookie name */
    
        "orientation": "bottom", /* Banner position (top - bottom) */
       
          "groupServices": false, /* Group services by category */
                           
        "showAlertSmall": false, /* Show the small banner on bottom right */
        "cookieslist": false, /* Show the cookie list */
                           
          "closePopup": false, /* Show a close X on the banner */

          "showIcon": false, /* Show cookie icon to manage cookies */
          //"iconSrc": "", /* Optionnal: URL or base64 encoded image */
          "iconPosition": "BottomRight", /* BottomRight, BottomLeft, TopRight and TopLeft */

        "adblocker": false, /* Show a Warning if an adblocker is detected */
                           
          "DenyAllCta" : true, /* Show the deny all button */
          "AcceptAllCta" : true, /* Show the accept all button when highPrivacy on */
          "highPrivacy": true, /* HIGHLY RECOMMANDED Disable auto consent */
                           
        "handleBrowserDNTRequest": false, /* If Do Not Track == 1, disallow all */

        "removeCredit": false, /* Remove credit link */
        "moreInfoLink": true, /* Show more info link */

          "useExternalCss": false, /* If false, the tarteaucitron.css file will be loaded */
          "useExternalJs": false, /* If false, the tarteaucitron.js file will be loaded */

        //"cookieDomain": ".my-multisite-domaine.fr", /* Shared cookie for multisite */
                          
          "readmoreLink": "", /* Change the default readmore link */

          "mandatory": true, /* Show a message about mandatory cookies */
        });

});