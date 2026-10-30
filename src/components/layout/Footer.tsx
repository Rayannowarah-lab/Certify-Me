"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Linkedin, Phone, Sun, Moon, Languages } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSettings } from '@/context/SettingsContext';
import { BrandMonogram } from '@/components/editorial/SwissPlates';

export default function Footer() {
  const pathname = usePathname();
  const [year, setYear] = useState<number | null>(null);
  const { t, theme, language, toggleTheme, toggleLanguage } = useSettings();

  useEffect(() => {
    try {
      setYear(new Date().getFullYear());
    } catch (error) {
      console.error('Failed to set current year in Footer:', error);
    }
  }, []);

  // Home spatial canvas uses its integrated bottom utility rail matching the reference video
  if (pathname === '/') {
    return null;
  }

  return (
    <footer className="relative z-10 border-t border-foreground/10 bg-background/80 backdrop-blur-md py-14">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-foreground/10">
          {/* Brand Summary */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 text-lg font-headline font-medium text-foreground group"
            >
              <BrandMonogram />
              <span>CertifyMe</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              {t('footer.about')}
            </p>
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex items-center gap-2 px-3.5 py-2 border border-border hover:border-foreground text-xs font-medium text-foreground transition-colors whitespace-nowrap"
              >
                {theme === 'light' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
                <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
              </button>
              <button
                type="button"
                onClick={toggleLanguage}
                className="inline-flex items-center gap-2 px-3.5 py-2 border border-border hover:border-foreground text-xs font-medium text-foreground transition-colors whitespace-nowrap"
              >
                <Languages className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'العربية' : 'English'}</span>
              </button>
            </div>
          </div>

          {/* Archive Links */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
              {t('footer.explore')}
            </h4>
            <ul className="space-y-2.5 text-sm text-foreground/85">
              <li>
                <Link href="/" className="hover:text-foreground hover:underline underline-offset-4">
                  {t('nav.overview')}
                </Link>
              </li>
              <li>
                <Link href="/?view=majors" className="hover:text-foreground hover:underline underline-offset-4">
                  {t('nav.majors')}
                </Link>
              </li>
              <li>
                <Link href="/?view=arc" className="hover:text-foreground hover:underline underline-offset-4">
                  {t('nav.certifications')}
                </Link>
              </li>
              <li>
                <Link href="/bookmarks" className="hover:text-foreground hover:underline underline-offset-4">
                  {t('nav.saved')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Majors */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
              {t('footer.popular')}
            </h4>
            <ul className="space-y-2.5 text-sm text-foreground/85">
              <li>
                <Link href="/category/computer-science" className="hover:text-foreground hover:underline underline-offset-4">
                  Computer Science
                </Link>
              </li>
              <li>
                <Link href="/category/cyber-security" className="hover:text-foreground hover:underline underline-offset-4">
                  Cyber Security
                </Link>
              </li>
              <li>
                <Link href="/category/artificial-intelligence" className="hover:text-foreground hover:underline underline-offset-4">
                  Artificial Intelligence
                </Link>
              </li>
              <li>
                <Link href="/category/data-science" className="hover:text-foreground hover:underline underline-offset-4">
                  Data Science
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
              {t('footer.legal')} & {t('footer.connect')}
            </h4>
            <ul className="space-y-2.5 text-sm text-foreground/85">
              <li>
                <Link href="/privacy" className="hover:text-foreground hover:underline underline-offset-4">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground hover:underline underline-offset-4">
                  {t('footer.terms')}
                </Link>
              </li>
              <li className="pt-1">
                <a
                  href="https://www.linkedin.com/in/rayan-nowarah-a7558228b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-foreground hover:underline underline-offset-4"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/9620791046548"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-foreground hover:underline underline-offset-4 font-mono text-xs tabular-nums"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>+962 791046548</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            © {year || 2026} CertifyMe · Curated by Rayan Nowarah. Independent academic directory; not affiliated with Google, Microsoft, IBM, Cisco, or Coursera.
          </p>
          <div className="flex items-center gap-3 whitespace-nowrap">
            <Link href="/privacy" className="hover:text-foreground">
              {t('footer.privacy')}
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/terms" className="hover:text-foreground">
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
