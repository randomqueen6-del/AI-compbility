import { Locale, defaultLocale } from './i18n';

type TranslationKeys = {
  // Navigation
  home: string;
  about: string;
  test: string;
  results: string;
  contact: string;
  
  // Common
  welcome: string;
  language: string;
  japanese: string;
  english: string;
  getStarted: string;
  learnMore: string;
  startTest: string;
  viewResults: string;
  
  // Home page
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  discoverCompatibility: string;
  findYourMatch: string;
  compatibilityTest: string;
  
  // Features
  features: string;
  zodiacCompatibility: string;
  zodiacDescription: string;
  mbtiMatching: string;
  mbtiDescription: string;
  personalityInsights: string;
  personalityDescription: string;
  detailedAnalysis: string;
  analysisDescription: string;
  
  // About page
  aboutTitle: string;
  aboutDescription: string;
  ourMission: string;
  missionDescription: string;
  howItWorks: string;
  howItWorksDescription: string;
  
  // Test page
  testTitle: string;
  testDescription: string;
  question: string;
  next: string;
  previous: string;
  submit: string;
  
  // Results page
  resultsTitle: string;
  yourCompatibility: string;
  compatibilityScore: string;
  recommendations: string;
  shareResults: string;
  
  // Footer
  allRightsReserved: string;
  privacyPolicy: string;
  termsOfService: string;
  
  // Buttons and actions
  clickHere: string;
  readMore: string;
  tryAgain: string;
  goBack: string;
};

const translations: Record<Locale, TranslationKeys> = {
  ja: {
    // Navigation
    home: 'ホーム',
    about: 'このサイトについて',
    test: '診断',
    results: '結果',
    contact: 'お問い合わせ',
    
    // Common
    welcome: '私のウェブサイトへようこそ',
    language: '言語',
    japanese: '日本語',
    english: 'English',
    getStarted: '始める',
    learnMore: '詳しく見る',
    startTest: 'テストを開始',
    viewResults: '結果を見る',
    
    // Home page
    heroTitle: '完璧な相性を見つけよう',
    heroSubtitle: '相性診断',
    heroDescription: '星座、MBTI、その他の要素を使って、特別な人との相性を発見する楽しく洞察に満ちた相性診断です！',
    discoverCompatibility: '相性を発見',
    findYourMatch: 'ご自身のマッチを見つける',
    compatibilityTest: '相性診断',
    
    // Features
    features: '機能',
    zodiacCompatibility: '星座相性',
    zodiacDescription: '星座に基づいた詳細な相性分析',
    mbtiMatching: 'MBTIマッチング',
    mbtiDescription: '性格タイプに基づく深い洞察',
    personalityInsights: '性格の洞察',
    personalityDescription: 'ご自身の性格特性の詳細な分析',
    detailedAnalysis: '詳細分析',
    analysisDescription: '包括的な相性レポート',
    
    // About page
    aboutTitle: '私たちについて',
    aboutDescription: '相性診断を通じて人々が完璧なマッチを見つけるお手伝いをしています。',
    ourMission: '私たちの使命',
    missionDescription: '科学的根拠に基づいた楽しい方法で、人々が互いの相性を理解できるよう支援することです。',
    howItWorks: '仕組み',
    howItWorksDescription: '星座、MBTI、その他の性格要因を組み合わせて、包括的な相性分析を提供します。',
    
    // Test page
    testTitle: '相性診断',
    testDescription: 'いくつかの質問に答えて、お二人の相性を発見しましょう。',
    question: '質問',
    next: '次へ',
    previous: '前へ',
    submit: '送信',
    
    // Results page
    resultsTitle: 'ご自身の結果',
    yourCompatibility: 'お二人の相性',
    compatibilityScore: '相性スコア',
    recommendations: 'おすすめ',
    shareResults: '結果をシェア',
    
    // Footer
    allRightsReserved: 'すべての権利を保有',
    privacyPolicy: 'プライバシーポリシー',
    termsOfService: '利用規約',
    
    // Buttons and actions
    clickHere: 'ここをクリック',
    readMore: 'もっと読む',
    tryAgain: 'もう一度試す',
    goBack: '戻る',
  },
  en: {
    // Navigation
    home: 'Home',
    about: 'About',
    test: 'Check',
    results: 'Results',
    contact: 'Contact',
    
    // Common
    welcome: 'Welcome to my website',
    language: 'Language',
    japanese: '日本語',
    english: 'English',
    getStarted: 'Get Started',
    learnMore: 'Learn More',
    startTest: 'Start Test',
    viewResults: 'View Results',
    
    // Home page
    heroTitle: 'Find Your Perfect Match',
    heroSubtitle: 'Compatibility Test',
    heroDescription: 'Discover your compatibility with someone special through our fun and insightful compatibility test using zodiac signs, MBTI, and more!',
    discoverCompatibility: 'Discover Compatibility',
    findYourMatch: 'Find Your Match',
    compatibilityTest: 'Compatibility Test',
    
    // Features
    features: 'Features',
    zodiacCompatibility: 'Zodiac Compatibility',
    zodiacDescription: 'Detailed compatibility analysis based on zodiac signs',
    mbtiMatching: 'MBTI Matching',
    mbtiDescription: 'Deep insights based on personality types',
    personalityInsights: 'Personality Insights',
    personalityDescription: 'Detailed analysis of your personality traits',
    detailedAnalysis: 'Detailed Analysis',
    analysisDescription: 'Comprehensive compatibility reports',
    
    // About page
    aboutTitle: 'About Us',
    aboutDescription: 'We help people find their perfect match through compatibility testing.',
    ourMission: 'Our Mission',
    missionDescription: 'To help people understand their compatibility with others through scientifically-backed, fun methods.',
    howItWorks: 'How It Works',
    howItWorksDescription: 'We combine zodiac signs, MBTI, and other personality factors to provide comprehensive compatibility analysis.',
    
    // Test page
    testTitle: 'Compatibility Test',
    testDescription: 'Answer a few questions to discover your compatibility.',
    question: 'Question',
    next: 'Next',
    previous: 'Previous',
    submit: 'Submit',
    
    // Results page
    resultsTitle: 'Your Results',
    yourCompatibility: 'Your Compatibility',
    compatibilityScore: 'Compatibility Score',
    recommendations: 'Recommendations',
    shareResults: 'Share Results',
    
    // Footer
    allRightsReserved: 'All rights reserved',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    
    // Buttons and actions
    clickHere: 'Click Here',
    readMore: 'Read More',
    tryAgain: 'Try Again',
    goBack: 'Go Back',
  },
};

export const getTranslations = (locale: Locale = defaultLocale): TranslationKeys => {
  return translations[locale] || translations[defaultLocale];
};

export const t = (key: keyof TranslationKeys, locale: Locale = defaultLocale): string => {
  const translation = translations[locale] || translations[defaultLocale];
  return translation[key] || key;
};
