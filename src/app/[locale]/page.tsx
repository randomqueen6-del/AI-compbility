import { notFound } from 'next/navigation';
import { isValidLocale, type Locale } from '@/lib/i18n';
import { getTranslations } from '@/lib/translations';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface LocalePageProps {
  params: Promise<{ locale: string }>;
}

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale } = await params;
  
  if (!isValidLocale(locale)) {
    notFound();
  }

  const localeTyped = locale as Locale;
  const t = getTranslations(localeTyped);

  return (
    <div className="min-h-screen bg-gray-50">
      <LanguageSwitcher />
      
      <main className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            {t.welcome}
          </h1>
          
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-gray-600 mb-8">
              This is an example page demonstrating i18n functionality with Japanese as the default language.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">{t.home}</h2>
                <p className="text-gray-600">Current page</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">{t.about}</h2>
                <p className="text-gray-600">Learn more about us</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">{t.contact}</h2>
                <p className="text-gray-600">Get in touch</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export function generateStaticParams() {
  return [{ locale: 'en' }]; // Only generate for non-default locales
}
