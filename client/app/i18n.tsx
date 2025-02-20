import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async (callback) => {
    const savedLanguage = await AsyncStorage.getItem('user-language');
    callback(savedLanguage || 'en'); // Default to English
  },
  init: () => {},
  cacheUserLanguage: async (language) => {
    await AsyncStorage.setItem('user-language', language);
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: { welcome: 'Welcome', select_language: 'Select Your Language' } },
      es: { translation: { welcome: 'Bienvenido', select_language: 'Selecciona tu idioma' } },
      fr: { translation: { welcome: 'Bienvenue', select_language: 'Sélectionnez votre langue' } },
    },
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
