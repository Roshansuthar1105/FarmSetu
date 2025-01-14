import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import hi from './locales/hi.json';
import bn from './locales/bn.json';
import ta from './locales/ta.json';
import te from './locales/te.json';
import as from './locales/as.json';
import doi from './locales/doi.json';
import gu from './locales/gu.json';
import kn from './locales/kn.json';
// import ks from './locales/ks.json';
import mai from './locales/mai.json';
import ml from './locales/ml.json';
import mr from './locales/mr.json';
import or from './locales/or.json';
import pa from './locales/pa.json';
import ur from './locales/ur.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      bn: { translation: bn },
      ta: { translation: ta },
      te: { translation: te },
      te: { translation: te },
      as : {translation : as},
      doi : {translation : doi },
      gu : {translation : gu },
      kn : {translation : kn },
      // ks : {translation : ks },
      mai : {translation : mai },
      ml : {translation : ml },
      mr : {translation : mr },
      or : {translation : or },
      pa : {translation : pa },
      ur : {translation : ur , direction: 'rtl'}
    },
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // React already does escaping
    }
  });

export default i18n;