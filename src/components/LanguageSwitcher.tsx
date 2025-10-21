'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Locale, locales, localeNames, defaultLocale } from '@/lib/i18n';
import { getTranslations } from '@/lib/translations';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const [currentLocale, setCurrentLocale] = useState<Locale>(defaultLocale);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Determine current locale from pathname
    const segments = pathname.split('/');
    const potentialLocale = segments[1];
    
    if (potentialLocale && locales.includes(potentialLocale as Locale)) {
      setCurrentLocale(potentialLocale as Locale);
    } else {
      setCurrentLocale(defaultLocale);
    }
  }, [pathname]);

  const t = getTranslations(currentLocale);

  const switchLanguage = (newLocale: Locale) => {
    // Set cookie for persistence
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000`; // 1 year
    
    // Remove current locale from pathname
    let newPath = pathname;
    const segments = pathname.split('/');
    const potentialLocale = segments[1];
    
    if (potentialLocale && locales.includes(potentialLocale as Locale)) {
      newPath = '/' + segments.slice(2).join('/');
    }
    
    if (newLocale === defaultLocale) {
      // For Japanese (default), don't add locale prefix
      router.push(newPath || '/');
    } else {
      // For other locales, add prefix
      router.push(`/${newLocale}${newPath}`);
    }
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="flex items-center gap-2 p-4">
        <span className="text-sm font-medium">言語:</span>
        <div className="flex gap-2">
          <span className="px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-md">
            日本語
          </span>
          <button className="px-3 py-1 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors">
            English
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 p-4">
      <span className="text-sm font-medium">{t.language}:</span>
      <div className="flex gap-2">
        {locales.map((locale) => (
          <button
            key={locale}
            onClick={() => switchLanguage(locale)}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              locale === currentLocale
                ? 'font-semibold text-blue-600 bg-blue-100'
                : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
            }`}
          >
            {localeNames[locale]}
          </button>
        ))}
      </div>
    </div>
  );
}
