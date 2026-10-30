"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export type Theme = 'light' | 'dark';
export type Language = 'en' | 'ar';

interface SettingsContextType {
  theme: Theme;
  language: Language;
  toggleTheme: () => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
  bookmarkedIds: string[];
  toggleBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  clearBookmarks: () => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.overview': 'Overview',
    'nav.majors': 'Majors',
    'nav.certifications': 'Certifications',
    'nav.saved': 'Saved',
    'nav.search': 'Search',
    'nav.search_placeholder': 'Search by skill, provider, or university major...',
    'hero.kicker': 'University Career Archive',
    'hero.title': 'Get Your First Job with Free Certifications',
    'hero.subtitle': 'Gain hands-on experience, finish projects, and add verified industry credentials to your CV.',
    'portal.majors': 'Majors',
    'portal.certifications': 'Certifications',
    'portal.intro': 'Introduction',
    'portal.close': 'Close',
    'section.how_it_works': 'Your Path to Career Readiness',
    'section.how_it_works_sub': 'Curated zero-cost credentials from official technology and business institutions.',
    'step.1.title': '01. Discovery',
    'step.1.desc': 'Select the right certification for your university major or target career role.',
    'step.2.title': '02. Learning',
    'step.2.desc': 'Complete the coursework directly on the official provider platform for free at your own pace.',
    'step.3.title': '03. Employment',
    'step.3.desc': 'Add the verified credential to your CV and LinkedIn profile before applying for roles.',
    'action.open': 'Open',
    'action.drag': 'Drag',
    'action.prev': 'Previous',
    'action.next': 'Next',
    'action.explore': 'Explore Details',
    'action.enroll': 'Official Course',
    'action.save': 'Save',
    'action.saved': 'Saved',
    'action.share': 'Share Link',
    'action.copied': 'Link Copied',
    'action.back_majors': 'All Majors',
    'action.back_catalog': 'Back to Catalog',
    'action.clear_bookmarks': 'Clear Saved',
    'filter.all_majors': 'All Majors',
    'filter.all_levels': 'All Levels',
    'filter.all': 'All Certificates',
    'cert.start': 'Start Certification',
    'cert.free': 'Free Tuition',
    'cert.credentials': 'Certifications',
    'footer.about': 'Curating verified free industry certifications for university students to bridge the academic-to-career gap.',
    'footer.explore': 'Archive',
    'footer.popular': 'Disciplines',
    'footer.legal': 'Legal',
    'footer.connect': 'Contact',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms & Conditions',
    'empty.title': 'No certifications found',
    'empty.sub': 'No credentials matched your current query or filter selection. Adjust your terms or reset filters.',
    'empty.button': 'Reset Filters',
    'saved.subtitle': 'Your personal shortlist of industry credentials to complete.',
    'saved.empty_desc': 'Save any certification across the Majors gallery or Certifications arc to keep your learning queue organized here.',
  },
  ar: {
    'nav.overview': 'نظرة عامة',
    'nav.majors': 'التخصصات',
    'nav.certifications': 'الشهادات',
    'nav.saved': 'المحفوظات',
    'nav.search': 'بحث',
    'nav.search_placeholder': 'ابحث حسب المهارة أو المؤسسة أو التخصص الجامعي...',
    'hero.kicker': 'أرشيف المسار المهني الجامعي',
    'hero.title': 'احصل على وظيفتك الأولى مع شهادات مجانية',
    'hero.subtitle': 'اكتسب خبرة عملية، وأكمل المشاريع، وأضف شهادات مهنية معتمدة إلى سيرتك الذاتية.',
    'portal.majors': 'التخصصات',
    'portal.certifications': 'الشهادات',
    'portal.intro': 'مقدمة',
    'portal.close': 'إغلاق',
    'section.how_it_works': 'طريقك نحو الجاهزية المهنية',
    'section.how_it_works_sub': 'شهادات مجانية منتقاة مباشرة من المؤسسات التقنية والأكاديمية الرسمية.',
    'step.1.title': '01. الاكتشاف',
    'step.1.desc': 'اختر الشهادة المناسبة لتخصصك الجامعي أو المسمى الوظيفي الذي تطمح إليه.',
    'step.2.title': '02. التعلم',
    'step.2.desc': 'أكمل الدورة التدريبية على المنصة الرسمية مجاناً وبالوتيرة التي تناسب جدولك.',
    'step.3.title': '03. التوظيف',
    'step.3.desc': 'أضف الشهادة المعتمدة إلى سيرتك الذاتية وحساب LinkedIn وابدأ التقديم بثقة.',
    'action.open': 'افتح',
    'action.drag': 'اسحب',
    'action.prev': 'السابق',
    'action.next': 'التالي',
    'action.explore': 'تفاصيل الشهادة',
    'action.enroll': 'المنصة الرسمية',
    'action.save': 'حفظ',
    'action.saved': 'محفوظة',
    'action.share': 'مشاركة الرابط',
    'action.copied': 'تم نسخ الرابط',
    'action.back_majors': 'جميع التخصصات',
    'action.back_catalog': 'العودة للأرشيف',
    'action.clear_bookmarks': 'مسح المحفوظات',
    'filter.all_majors': 'جميع التخصصات',
    'filter.all_levels': 'جميع المستويات',
    'filter.all': 'جميع الشهادات',
    'cert.start': 'ابدأ الشهادة',
    'cert.free': 'مجانية بالكامل',
    'cert.credentials': 'شهادات',
    'footer.about': 'تمكين طلاب الجامعات بشهادات مهنية مجانية معتمدة لسد الفجوة بين الدراسة وسوق العمل.',
    'footer.explore': 'الأرشيف',
    'footer.popular': 'التخصصات',
    'footer.legal': 'قانوني',
    'footer.connect': 'تواصل',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'الشروط والأحكام',
    'empty.title': 'لم يتم العثور على شهادات',
    'empty.sub': 'لم نتمكن من العثور على نتائج تطابق معايير البحث الحالية. جرب كلمات أخرى أو أعد ضبط الفلاتر.',
    'empty.button': 'إعادة ضبط الفلاتر',
    'saved.subtitle': 'قائمتك الشخصية للشهادات المهنية التي تخطط لإنجازها.',
    'saved.empty_desc': 'احفظ أي شهادة من معرض التخصصات أو قوس الشهادات للوصول إليها لاحقاً في هذه الصفحة.',
  },
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [language, setLanguage] = useState<Language>('en');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme') as Theme | null;
      const savedLang = localStorage.getItem('lang') as Language | null;
      const savedBookmarks = localStorage.getItem('bookmarked_certs');

      if (savedTheme === 'light' || savedTheme === 'dark') {
        setTheme(savedTheme);
      }
      if (savedLang === 'en' || savedLang === 'ar') {
        setLanguage(savedLang);
      }
      if (savedBookmarks) {
        const parsed = JSON.parse(savedBookmarks);
        if (Array.isArray(parsed)) {
          setBookmarkedIds(parsed);
        }
      }
    } catch (error) {
      console.error('Failed to load settings or bookmarks from localStorage:', error);
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled Promise Rejection:', event.reason);
    };
    const handleGlobalError = (event: ErrorEvent) => {
      console.error('Global application error:', event.error || event.message);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleGlobalError);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleGlobalError);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    try {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
      localStorage.setItem('theme', theme);
    } catch (error) {
      console.error('Failed to persist theme setting to localStorage:', error);
    }
  }, [theme]);

  useEffect(() => {
    try {
      const root = window.document.documentElement;
      root.dir = language === 'ar' ? 'rtl' : 'ltr';
      root.lang = language;
      localStorage.setItem('lang', language);
    } catch (error) {
      console.error('Failed to persist language setting to localStorage:', error);
    }
  }, [language]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(prev => (prev === 'en' ? 'ar' : 'en'));
  }, []);

  const toggleBookmark = useCallback((id: string) => {
    setBookmarkedIds(prev => {
      const next = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      try {
        localStorage.setItem('bookmarked_certs', JSON.stringify(next));
      } catch (error) {
        console.error('Failed to update bookmark state in localStorage:', error);
      }
      return next;
    });
  }, []);

  const isBookmarked = useCallback(
    (id: string) => bookmarkedIds.includes(id),
    [bookmarkedIds]
  );

  const clearBookmarks = useCallback(() => {
    setBookmarkedIds([]);
    try {
      localStorage.setItem('bookmarked_certs', JSON.stringify([]));
    } catch (error) {
      console.error('Failed to clear bookmarks in localStorage:', error);
    }
  }, []);

  const t = useCallback(
    (key: string) => {
      return translations[language][key] || key;
    },
    [language]
  );

  return (
    <SettingsContext.Provider
      value={{
        theme,
        language,
        toggleTheme,
        toggleLanguage,
        t,
        bookmarkedIds,
        toggleBookmark,
        isBookmarked,
        clearBookmarks,
        isSearchOpen,
        setIsSearchOpen,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
