"use client";

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import { Menu, X, Search, Sun, Moon, Languages } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';
import { BrandMonogram } from '@/components/editorial/SwissPlates';
import SearchModal from '@/components/editorial/SearchModal';
import { cn } from '@/lib/utils';

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const view = searchParams.get('view');
  const { t, bookmarkedIds } = useSettings();

  const isOverview = pathname === '/' && !view;
  const isMajors = (pathname === '/' && view === 'majors') || pathname.startsWith('/category/');
  const isCerts = (pathname === '/' && view === 'arc') || pathname.startsWith('/cert/');
  const isSaved = pathname === '/bookmarks';

  const items = [
    { href: '/', label: t('nav.overview'), active: isOverview },
    { href: '/?view=majors', label: t('nav.majors'), active: isMajors },
    { href: '/?view=arc', label: t('nav.certifications'), active: isCerts },
    {
      href: '/bookmarks',
      label:
        bookmarkedIds.length > 0
          ? `${t('nav.saved')} (${bookmarkedIds.length})`
          : t('nav.saved'),
      active: isSaved,
    },
  ];

  return (
    <>
      {items.map(item => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onNavigate}
          className={cn(
            'whitespace-nowrap shrink-0 text-sm transition-colors duration-150 tabular-nums',
            item.active
              ? 'px-3.5 py-1.5 rounded-full bg-primary text-primary-foreground font-medium'
              : 'px-2.5 py-1.5 text-muted-foreground hover:text-foreground hover:underline underline-offset-4'
          )}
        >
          {item.label}
        </Link>
      ))}
    </>
  );
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, setIsSearchOpen, theme, language, toggleTheme, toggleLanguage } = useSettings();

  return (
    <>
      <header className="sticky top-0 z-40 h-16 w-full border-b border-foreground/[0.08] bg-background/75 backdrop-blur-md">
        <div className="max-w-[1600px] mx-auto h-full px-4 sm:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 text-lg font-headline font-medium tracking-tight text-foreground whitespace-nowrap shrink-0 group"
          >
            <BrandMonogram />
            <span>CertifyMe</span>
          </Link>

          {/* Zone 2: Concise Single-Line Navigation Links */}
          <nav
            aria-label="Primary"
            className="hidden md:flex items-center gap-2 editorial-pill rounded-full px-2 py-1"
          >
            <Suspense
              fallback={
                <span className="px-4 py-1.5 text-sm text-muted-foreground whitespace-nowrap">
                  {t('nav.majors')} · {t('nav.certifications')}
                </span>
              }
            >
              <NavLinks />
            </Suspense>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-foreground/20 bg-card/75 hover:bg-primary hover:text-primary-foreground text-xs font-medium text-foreground transition-colors duration-150 whitespace-nowrap shrink-0"
            >
              <Search className="w-3.5 h-3.5" />
              <span>{t('nav.search')}</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(prev => !prev)}
              aria-label="Toggle Menu"
              className="md:hidden w-10 h-10 inline-flex items-center justify-center rounded-full border border-foreground/15 text-foreground"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-16 z-40 md:hidden bg-background/95 backdrop-blur-lg border-b border-border px-4 py-6 shadow-xl">
          <div className="flex flex-col gap-2 mb-6">
            <Suspense fallback={null}>
              <NavLinks onNavigate={() => setMobileMenuOpen(false)} />
            </Suspense>
          </div>
          <div className="pt-4 border-t border-border flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 border border-border text-xs font-medium text-foreground"
            >
              {theme === 'light' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
              <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                toggleLanguage();
                setMobileMenuOpen(false);
              }}
              className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 border border-border text-xs font-medium text-foreground"
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'العربية' : 'English'}</span>
            </button>
          </div>
          <div className="pt-4 mt-4 border-t border-border flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <Link href="/privacy" onClick={() => setMobileMenuOpen(false)} className="hover:text-foreground">
              {t('footer.privacy')}
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/terms" onClick={() => setMobileMenuOpen(false)} className="hover:text-foreground">
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      )}

      <SearchModal />
    </>
  );
}