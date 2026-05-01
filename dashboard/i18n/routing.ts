import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["tr", "en", "ar"],
  defaultLocale: "tr",
  // TR için prefix yok (/sac-ekimi), EN için /en/hair-transplant, AR için /ar/زراعة-الشعر
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",

    // Hub & teknikler
    "/sac-ekimi": {
      tr: "/sac-ekimi",
      en: "/hair-transplant",
      ar: "/زراعة-الشعر",
    },
    "/sac-ekimi/fue": {
      tr: "/sac-ekimi/fue",
      en: "/hair-transplant/fue",
      ar: "/زراعة-الشعر/fue",
    },
    "/sac-ekimi/dhi": {
      tr: "/sac-ekimi/dhi",
      en: "/hair-transplant/dhi",
      ar: "/زراعة-الشعر/dhi",
    },
    "/sac-ekimi/sapphire": {
      tr: "/sac-ekimi/sapphire",
      en: "/hair-transplant/sapphire",
      ar: "/زراعة-الشعر/sapphire",
    },
    "/sakal-ekimi": {
      tr: "/sakal-ekimi",
      en: "/beard-transplant",
      ar: "/زراعة-اللحية",
    },
    "/kas-ekimi": {
      tr: "/kas-ekimi",
      en: "/eyebrow-transplant",
      ar: "/زراعة-الحواجب",
    },
    "/fue-vs-dhi": {
      tr: "/fue-vs-dhi",
      en: "/fue-vs-dhi",
      ar: "/fue-vs-dhi",
    },

    // Dönüşüm
    "/sac-analizi": {
      tr: "/sac-analizi",
      en: "/hair-analysis",
      ar: "/تحليل-الشعر",
    },
    "/fiyat": {
      tr: "/fiyat",
      en: "/pricing",
      ar: "/الأسعار",
    },
    "/fiyat-hesaplama": {
      tr: "/fiyat-hesaplama",
      en: "/price-calculator",
      ar: "/حاسبة-الأسعار",
    },
    "/greft-hesaplama": {
      tr: "/greft-hesaplama",
      en: "/graft-calculator",
      ar: "/حاسبة-الطعوم",
    },
    "/oncesi-sonrasi": {
      tr: "/oncesi-sonrasi",
      en: "/before-after",
      ar: "/قبل-وبعد",
    },
    "/iletisim": {
      tr: "/iletisim",
      en: "/contact",
      ar: "/اتصل-بنا",
    },
    "/uygun-degil": {
      tr: "/uygun-degil",
      en: "/not-eligible",
      ar: "/غير-مؤهل",
    },

    // Vakalar
    "/vaka/dhi-sakal-1800-greft": {
      tr: "/vaka/dhi-sakal-1800-greft",
      en: "/case/dhi-beard-1800-grafts",
      ar: "/حالة/dhi-beard-1800",
    },
    "/vaka/fue-3200-greft": {
      tr: "/vaka/fue-3200-greft",
      en: "/case/fue-3200-grafts",
      ar: "/حالة/fue-3200",
    },
    "/vaka/kas-restorasyonu-400-greft": {
      tr: "/vaka/kas-restorasyonu-400-greft",
      en: "/case/eyebrow-restoration-400-grafts",
      ar: "/حالة/eyebrow-400",
    },

    // Yasal
    "/kvkk-aydinlatma": {
      tr: "/kvkk-aydinlatma",
      en: "/data-protection-disclosure",
      ar: "/إفصاح-حماية-البيانات",
    },
    "/gizlilik-politikasi": {
      tr: "/gizlilik-politikasi",
      en: "/privacy-policy",
      ar: "/سياسة-الخصوصية",
    },
    "/cerez-politikasi": {
      tr: "/cerez-politikasi",
      en: "/cookie-policy",
      ar: "/سياسة-ملفات-تعريف-الارتباط",
    },

    // Klinik içi (üç dilde aynı kalıyor)
    "/client-data": "/client-data",
  },
});
