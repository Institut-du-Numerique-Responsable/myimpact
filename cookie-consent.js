/* globals tarteaucitron */

(function () {
  "use strict";

  var language = document.documentElement.lang || "en";
  var legalPages = {
    en: "/legal-notice.html",
    fr: "/fr/mentions-legales.html",
    nl: "/nl/wettelijke-vermeldingen.html",
    de: "/de/rechtliche-hinweise.html",
    es: "/es/aviso-legal.html",
    it: "/it/note-legali.html"
  };
  var cookiePages = {
    en: "/cookies.html",
    fr: "/fr/gestion-cookies.html",
    nl: "/nl/cookiebeheer.html",
    de: "/de/cookie-verwaltung.html",
    es: "/es/gestion-cookies.html",
    it: "/it/gestione-cookie.html"
  };

  tarteaucitron.user.matomoId = 6;
  tarteaucitron.user.matomoHost = "https://analytic.institutnr.org:8443/";
  tarteaucitron.user.matomoCustomJSPath = "https://analytic.institutnr.org:8443/matomo.js";

  tarteaucitron.init({
    privacyUrl: legalPages[language] || legalPages.en,
    hashtag: "#tarteaucitron",
    cookieName: "tarteaucitron",
    orientation: "bottom",
    groupServices: false,
    showAlertSmall: false,
    cookieslist: false,
    closePopup: false,
    showIcon: false,
    iconPosition: "BottomRight",
    adblocker: false,
    DenyAllCta: true,
    AcceptAllCta: true,
    highPrivacy: true,
    handleBrowserDNTRequest: true,
    removeCredit: false,
    moreInfoLink: true,
    useExternalCss: false,
    useExternalJs: false,
    readmoreLink: cookiePages[language] || cookiePages.en,
    mandatory: true
  });

  (tarteaucitron.job = tarteaucitron.job || []).push("matomocloud");
}());
