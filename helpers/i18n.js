import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization'; // Expo localization kullanıyoruz
import en from '../locales/en.json'; // İngilizce dil dosyası
import tr from '../locales/tr.json'; // Türkçe dil dosyası

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },
      tr: {
        translation: tr,
      },
    },
    lng: Localization.locale.split('-')[0], // Kullanıcının cihazındaki dili otomatik olarak ayarlıyoruz
    fallbackLng: 'en', // Eğer belirli bir dil yoksa, İngilizceye düşer
    interpolation: {
      escapeValue: false, // React ile güvenli render
    },
  });

export default i18n;
