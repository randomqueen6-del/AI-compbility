import { useState, useEffect } from 'react';

interface Translations {
  [key: string]: string;
}

export const useTranslations = (locale: string = 'ja') => {
  const [translations, setTranslations] = useState<Translations>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const response = await fetch(`/locales/${locale}/common.json`);
        const data = await response.json();
        setTranslations(data);
      } catch (error) {
        console.error('Failed to load translations:', error);
        // Fallback to Japanese if loading fails
        if (locale !== 'ja') {
          const fallbackResponse = await fetch('/locales/ja/common.json');
          const fallbackData = await fallbackResponse.json();
          setTranslations(fallbackData);
        }
      } finally {
        setLoading(false);
      }
    };

    loadTranslations();
  }, [locale]);

  const t = (key: string): string => {
    return translations[key] || key;
  };

  return { t, loading };
};
