"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon, Languages } from 'lucide-react';
import { Certification, Category } from '@/app/lib/types';
import { useSettings } from '@/context/SettingsContext';
import { DisciplinePlate } from '@/components/editorial/SwissPlates';

interface PortalViewProps {
  categories: Category[];
  certifications: Certification[];
  onSelectView: (view: 'majors' | 'arc') => void;
}

export default function PortalView({
  categories,
  certifications,
  onSelectView,
}: PortalViewProps) {
  const [hoveredTarget, setHoveredTarget] = useState<'majors' | 'arc' | null>(null);
  const [isIntroOpen, setIsIntroOpen] = useState(false);
  const { t, theme, language, toggleTheme, toggleLanguage } = useSettings();

  useEffect(() => {
    if (!isIntroOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsIntroOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isIntroOpen]);

  return (
    <div className="relative flex-1 min-h-[calc(100vh-4rem)] flex flex-col justify-between overflow-hidden px-4 sm:px-8 py-6">
      {/* Peripheral Contextual Preview Callouts (matching subtle editorial notes on hover) */}
      <div className="hidden lg:flex items-start justify-between pointer-events-none h-12 text-xs font-mono text-muted-foreground tabular-nums">
        <div
          className={`transition-opacity duration-200 ${
            hoveredTarget === 'majors' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="block text-foreground font-medium">01 - 10 DISCIPLINES</span>
          <span>Computer Science · Cyber Security · AI</span>
        </div>
        <div
          className={`text-right transition-opacity duration-200 ${
            hoveredTarget === 'arc' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="block text-foreground font-medium">
            {certifications.length} OFFICIAL CREDENTIALS
          </span>
          <span>Google · Microsoft · IBM · Cisco · AWS</span>
        </div>
      </div>

      {/* Main Focal Stage */}
      <div className="relative flex-1 flex flex-col items-center justify-center my-auto py-8">
        {/* Staggered Swiss Preview Plates Behind Portal Capsules on Hover */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center z-0"
        >
          <AnimatePresence>
            {hoveredTarget === 'majors' && (
              <motion.div
                key="preview-majors"
                initial={{ opacity: 0, scale: 0.94, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 8 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex items-center justify-center"
              >
                <div className="w-52 sm:w-60 -rotate-6 -translate-x-12 shadow-xl bg-background">
                  <DisciplinePlate slug="cyber-security" index={0} certCount={8} />
                </div>
                <div className="w-52 sm:w-60 rotate-6 translate-x-10 translate-y-6 shadow-xl bg-background hidden sm:block">
                  <DisciplinePlate slug="artificial-intelligence" index={2} certCount={7} />
                </div>
              </motion.div>
            )}

            {hoveredTarget === 'arc' && (
              <motion.div
                key="preview-arc"
                initial={{ opacity: 0, scale: 0.94, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 8 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex items-center justify-center"
              >
                <div className="w-56 sm:w-64 p-5 bg-card border border-foreground/20 shadow-xl -rotate-3 -translate-x-8">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
                    CISCO · BEGINNER · 6H
                  </div>
                  <div className="text-base font-headline font-normal text-foreground leading-snug">
                    Introduction to Cybersecurity
                  </div>
                  <div className="mt-6 pt-2 border-t border-border text-[10px] font-mono text-muted-foreground">
                    VERIFIED · FREE TUITION
                  </div>
                </div>
                <div className="w-56 sm:w-64 p-5 bg-card border border-foreground/20 shadow-xl rotate-3 translate-x-8 translate-y-6 hidden sm:block">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
                    GOOGLE · BEGINNER · 40H
                  </div>
                  <div className="text-base font-headline font-normal text-foreground leading-snug">
                    Digital Marketing & E-commerce
                  </div>
                  <div className="mt-6 pt-2 border-t border-border text-[10px] font-mono text-muted-foreground">
                    VERIFIED · FREE TUITION
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Editorial Headline & Dual Portal Capsules */}
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground tabular-nums mb-5">
            <span>{t('hero.kicker')}</span>
            <span aria-hidden="true"> · </span>
            <span>
              {categories.length} {t('nav.majors')}
            </span>
            <span aria-hidden="true"> · </span>
            <span>
              {certifications.length} {t('cert.credentials')}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-headline font-light tracking-tight text-foreground leading-[1.08] mb-5">
            {t('hero.title')}
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed mb-12">
            {t('hero.subtitle')}
          </p>

          {/* Two Central Hairline Portal Buttons (matching Temi & Storia in reference video) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <button
              type="button"
              onMouseEnter={() => setHoveredTarget('majors')}
              onMouseLeave={() => setHoveredTarget(null)}
              onFocus={() => setHoveredTarget('majors')}
              onBlur={() => setHoveredTarget(null)}
              onClick={() => onSelectView('majors')}
              className="w-60 sm:w-64 h-16 sm:h-20 rounded-full border border-foreground/20 bg-card/65 hover:bg-primary hover:text-primary-foreground hover:border-primary backdrop-blur-md text-xl sm:text-2xl font-headline font-light text-foreground transition-colors duration-200 whitespace-nowrap"
            >
              {t('portal.majors')}
            </button>

            <button
              type="button"
              onMouseEnter={() => setHoveredTarget('arc')}
              onMouseLeave={() => setHoveredTarget(null)}
              onFocus={() => setHoveredTarget('arc')}
              onBlur={() => setHoveredTarget(null)}
              onClick={() => onSelectView('arc')}
              className="w-60 sm:w-64 h-16 sm:h-20 rounded-full border border-foreground/20 bg-card/65 hover:bg-primary hover:text-primary-foreground hover:border-primary backdrop-blur-md text-xl sm:text-2xl font-headline font-light text-foreground transition-colors duration-200 whitespace-nowrap"
            >
              {t('portal.certifications')}
            </button>
          </div>
        </div>

        {/* Expandable Centered Introduction Editorial Sheet (matching Celebrando 90 anni di OSI overlay) */}
        <AnimatePresence>
          {isIntroOpen && (
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={t('portal.intro')}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 z-30 max-w-xl mx-auto bg-card/95 backdrop-blur-xl border border-foreground/15 p-7 sm:p-10 shadow-2xl text-left rtl:text-right"
            >
              <div className="flex items-baseline justify-between gap-4 pb-4 mb-5 border-b border-border">
                <h2 className="text-2xl sm:text-3xl font-headline font-light text-foreground">
                  {t('section.how_it_works')}
                </h2>
                <span className="text-xs font-mono text-muted-foreground tabular-nums shrink-0">
                  01 - 03
                </span>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {t('section.how_it_works_sub')}
              </p>

              <div className="divide-y divide-border border-t border-b border-border">
                {[
                  { title: t('step.1.title'), desc: t('step.1.desc') },
                  { title: t('step.2.title'), desc: t('step.2.desc') },
                  { title: t('step.3.title'), desc: t('step.3.desc') },
                ].map(step => (
                  <div key={step.title} className="py-3.5">
                    <h3 className="text-sm font-semibold text-foreground mb-1">{step.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Spatial Utility Rail */}
      <div className="relative z-30 flex items-center justify-between gap-4 pt-2">
        {/* Left: Theme & Language Controls */}
        <div className="hidden sm:flex items-center gap-3 text-xs text-muted-foreground">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors whitespace-nowrap py-1.5"
          >
            {theme === 'light' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
            <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
          </button>
          <span aria-hidden="true">·</span>
          <button
            type="button"
            onClick={toggleLanguage}
            className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors whitespace-nowrap py-1.5"
          >
            <Languages className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'AR' : 'EN'}</span>
          </button>
        </div>

        {/* Center: Introduction Drawer Trigger Pill */}
        <div className="mx-auto">
          <button
            type="button"
            onClick={() => setIsIntroOpen(prev => !prev)}
            className="editorial-pill rounded-full px-5 py-2.5 text-xs font-medium text-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-150 inline-flex items-center gap-3 shadow-sm whitespace-nowrap"
          >
            <span>{isIntroOpen ? t('portal.close') : t('portal.intro')}</span>
            {isIntroOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Right: Legal & Saved Quick Links */}
        <div className="hidden sm:flex items-center gap-3 text-xs text-muted-foreground whitespace-nowrap">
          <Link href="/privacy" className="hover:text-foreground transition-colors">
            {t('footer.privacy')}
          </Link>
          <span aria-hidden="true">·</span>
          <Link href="/terms" className="hover:text-foreground transition-colors">
            {t('footer.terms')}
          </Link>
        </div>
      </div>
    </div>
  );
}
