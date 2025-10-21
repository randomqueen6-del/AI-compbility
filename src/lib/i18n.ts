export const defaultLocale = 'ja' as const;
export const locales = ['ja', 'en'] as const;

export type Locale = typeof locales[number];

export const localeNames: Record<Locale, string> = {
  ja: '日本語',
  en: 'English',
};

export const isValidLocale = (locale: string): locale is Locale => {
  return locales.includes(locale as Locale);
};

export const getLocaleFromPathname = (pathname: string): Locale => {
  const segments = pathname.split('/');
  const potentialLocale = segments[1];
  
  if (potentialLocale && isValidLocale(potentialLocale)) {
    return potentialLocale;
  }
  
  return defaultLocale;
};

export const removeLocaleFromPathname = (pathname: string): string => {
  const segments = pathname.split('/');
  const potentialLocale = segments[1];
  
  if (potentialLocale && isValidLocale(potentialLocale)) {
    return '/' + segments.slice(2).join('/');
  }
  
  return pathname;
};
