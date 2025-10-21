'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

interface LanguageSwitcherAppProps {
  currentLocale: string;
}

const LanguageSwitcherApp = ({ currentLocale }: LanguageSwitcherAppProps) => {
  const pathname = usePathname();
  const [locale, setLocale] = useState(currentLocale);

  const switchLanguage = (newLocale: string) => {
    setLocale(newLocale);
    // Store preference in localStorage
    localStorage.setItem('preferred-locale', newLocale);
  };

  const getLocalizedPath = (targetLocale: string) => {
    // Remove current locale from pathname if it exists
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/';
    return targetLocale === 'ja' ? pathWithoutLocale : `/${targetLocale}${pathWithoutLocale}`;
  };

  return (
    <div className="flex items-center gap-2 p-4">
      <span className="text-sm font-medium">
        {locale === 'ja' ? '言語' : 'Language'}:
      </span>
      <div className="flex gap-2">
        <Link
          href={getLocalizedPath('ja')}
          onClick={() => switchLanguage('ja')}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${
            locale === 'ja'
              ? 'font-semibold text-blue-600 bg-blue-100'
              : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
          }`}
        >
          日本語
        </Link>
        <Link
          href={getLocalizedPath('en')}
          onClick={() => switchLanguage('en')}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${
            locale === 'en'
              ? 'font-semibold text-blue-600 bg-blue-100'
              : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
          }`}
        >
          English
        </Link>
      </div>
    </div>
  );
};

export default LanguageSwitcherApp;
