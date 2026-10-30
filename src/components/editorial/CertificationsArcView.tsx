"use client";

import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bookmark,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Languages,
  X,
} from 'lucide-react';
import { Certification, Category } from '@/app/lib/types';
import { useSettings } from '@/context/SettingsContext';
import { cn } from '@/lib/utils';

interface CertificationsArcViewProps {
  certifications: Certification[];
  categories: Category[];
  initialCategory?: string;
  initialSearch?: string;
  onClearUrlFilters?: () => void;
}

export default function CertificationsArcView({
  certifications,
  categories,
  initialCategory = 'All',
  initialSearch = '',
  onClearUrlFilters,
}: CertificationsArcViewProps) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [searchTerm, setSearchTerm] = useState(initialSearch || '');
  const [activeIndex, setActiveIndex] = useState(0);
  const wheelCooldown = useRef(0);
  const dragStart = useRef<number | null>(null);

  const {
    t,
    theme,
    language,
    toggleTheme,
    toggleLanguage,
    isBookmarked,
    toggleBookmark,
  } = useSettings();

  useEffect(() => {
    setSelectedCategory(initialCategory || 'All');
  }, [initialCategory]);

  useEffect(() => {
    setSearchTerm(initialSearch || '');
  }, [initialSearch]);

  const filteredCerts = useMemo(() => {
    try {
      const q = searchTerm.trim().toLowerCase();
      return certifications.filter(cert => {
        const matchesCat =
          selectedCategory === 'All' || cert.category === selectedCategory;
        const matchesDiff =
          selectedDifficulty === 'All' || cert.difficulty === selectedDifficulty;
        const matchesSearch =
          !q ||
          cert.title.toLowerCase().includes(q) ||
          cert.organization.toLowerCase().includes(q) ||
          cert.skills.some(s => s.toLowerCase().includes(q));
        return matchesCat && matchesDiff && matchesSearch;
      });
    } catch (error) {
      console.error('Failed to filter certifications in Arc view:', error);
      return [];
    }
  }, [certifications, selectedCategory, selectedDifficulty, searchTerm]);

  useEffect(() => {
    setActiveIndex(0);
  }, [selectedCategory, selectedDifficulty, searchTerm]);

  const total = filteredCerts.length;
  const safeIndex = total > 0 ? ((activeIndex % total) + total) % total : 0;
  const activeCert = total > 0 ? filteredCerts[safeIndex] : null;

  const stepArc = useCallback(
    (delta: number) => {
      if (total <= 1) return;
      setActiveIndex(prev => (((prev + delta) % total) + total) % total);
    },
    [total]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === 'ArrowRight') {
        stepArc(language === 'ar' ? -1 : 1);
      } else if (e.key === 'ArrowLeft') {
        stepArc(language === 'ar' ? 1 : -1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [stepArc, language]);

  const handleArcWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const now = Date.now();
    if (now - wheelCooldown.current < 160) return;
    const dominant = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(dominant) > 18) {
      wheelCooldown.current = now;
      stepArc(dominant > 0 ? 1 : -1);
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragStart.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStart.current === null) return;
    const dx = e.clientX - dragStart.current;
    dragStart.current = null;
    if (Math.abs(dx) > 45) {
      stepArc(dx < 0 ? 1 : -1);
    }
  };

  const handleRulerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (total <= 1) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(0.999, Math.max(0, (e.clientX - rect.left) / rect.width));
    const targetIdx = Math.floor(ratio * total);
    setActiveIndex(language === 'ar' ? total - 1 - targetIdx : targetIdx);
  };

  const resetAllFilters = () => {
    setSelectedCategory('All');
    setSelectedDifficulty('All');
    setSearchTerm('');
    onClearUrlFilters?.();
  };

  // Compute visible offsets along the curved arc (-2, -1, 0, +1, +2)
  const arcOffsets = useMemo(() => {
    if (total === 0) return [];
    if (total === 1) return [0];
    if (total === 2) return [0, 1];
    if (total <= 4) return [-1, 0, 1];
    return [-2, -1, 0, 1, 2];
  }, [total]);

  const progressPercent = total > 1 ? (safeIndex / (total - 1)) * 100 : 50;

  return (
    <div className="relative flex-1 min-h-[calc(100vh-4rem)] flex flex-col justify-between overflow-hidden">
      {/* Compact Inline Filter Toolbar */}
      <div className="relative z-20 border-b border-foreground/[0.08] bg-background/50 backdrop-blur-sm px-4 sm:px-8 py-2.5">
        <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Major Filter Segmented Buttons */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar max-w-full sm:max-w-[68%]">
            <button
              type="button"
              onClick={() => setSelectedCategory('All')}
              className={cn(
                'px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap shrink-0 transition-colors',
                selectedCategory === 'All'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {t('filter.all_majors')}
            </button>
            {categories.map(cat => (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setSelectedCategory(cat.name)}
                className={cn(
                  'px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap shrink-0 transition-colors',
                  selectedCategory === cat.name
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Right: Difficulty Selector + Active Search Chip */}
          <div className="flex items-center gap-2 shrink-0 ml-auto rtl:ml-0 rtl:mr-auto">
            {searchTerm && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  onClearUrlFilters?.();
                }}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-foreground/20 text-xs text-foreground whitespace-nowrap"
              >
                <span className="truncate max-w-[110px]">&ldquo;{searchTerm}&rdquo;</span>
                <X className="w-3 h-3" />
              </button>
            )}

            <div className="flex items-center editorial-pill rounded-full p-0.5 text-[11px]">
              {['All', 'Beginner', 'Intermediate', 'Advanced'].map(level => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setSelectedDifficulty(level)}
                  className={cn(
                    'px-2.5 py-1 rounded-full whitespace-nowrap transition-colors',
                    selectedDifficulty === level
                      ? 'bg-primary text-primary-foreground font-medium'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {level === 'All' ? t('filter.all_levels') : level}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Curved Arc Stage (matching Storia curved arc dial in reference video) */}
      {activeCert ? (
        <div
          onWheel={handleArcWheel}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          className="relative flex-1 flex flex-col items-center justify-center overflow-hidden select-none px-4 py-6"
        >
          {/* Large-Radius Sweeping Hairline Arc & Tangential Nodes */}
          <div className="relative w-full max-w-[1440px] h-[190px] sm:h-[230px] flex justify-center">
            {/* The Hairline Circle Border Forming the Upper Arc */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-[34px] left-1/2 -translate-x-1/2 w-[1160px] h-[1160px] sm:w-[1960px] sm:h-[1960px] rounded-full border border-foreground/[0.16]"
            />

            {/* Tangential Nodes Positioned Along the Arc */}
            {arcOffsets.map(offset => {
              const itemIndex = (((safeIndex + offset) % total) + total) % total;
              const cert = filteredCerts[itemIndex];
              const angleDeg = offset * 17 * (language === 'ar' ? -1 : 1);
              const isCenter = offset === 0;

              return (
                <div
                  key={`${cert.id}-${offset}`}
                  style={{
                    transformOrigin: '50% 980px',
                    transform: `translateX(-50%) rotate(${angleDeg}deg)`,
                  }}
                  className={cn(
                    'hidden sm:flex flex-col items-center text-center absolute top-[22px] left-1/2 w-52 transition-all duration-300',
                    isCenter ? 'z-20 opacity-100' : 'z-10 opacity-55 hover:opacity-95 cursor-pointer'
                  )}
                  onClick={() => {
                    if (!isCenter) stepArc(offset);
                  }}
                >
                  {/* Node Tick on the Arc Line */}
                  <span
                    className={cn(
                      'block w-px mb-2.5 transition-all',
                      isCenter ? 'h-4 bg-foreground' : 'h-2.5 bg-foreground/40'
                    )}
                  />
                  <span
                    className={cn(
                      'font-headline tracking-tight whitespace-nowrap truncate max-w-full',
                      isCenter
                        ? 'text-2xl lg:text-3xl font-normal text-foreground'
                        : 'text-xl lg:text-2xl font-light text-foreground/80'
                    )}
                  >
                    {cert.organization}
                  </span>
                  {!isCenter && (
                    <span className="text-[11px] text-muted-foreground line-clamp-2 mt-1 max-w-[165px] leading-snug">
                      {cert.title}
                    </span>
                  )}
                </div>
              );
            })}

            {/* Mobile Compact Arc Apex Display */}
            <div className="sm:hidden relative z-20 pt-8 flex flex-col items-center text-center">
              <span className="block w-px h-4 bg-foreground mb-2" />
              <span className="text-2xl font-headline font-normal text-foreground">
                {activeCert.organization}
              </span>
            </div>
          </div>

          {/* Focal Centerpiece Below the 12 o'clock Apex (matching 1935 / La nascita / Scopri) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCert.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-20 max-w-3xl mx-auto text-center -mt-6 sm:-mt-10 px-2"
            >
              {/* Unboxed Metadata Line (Zero-Pill Discipline) */}
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground tabular-nums mb-3">
                <span>
                  {String(safeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </span>
                <span aria-hidden="true"> · </span>
                <span>{activeCert.category}</span>
                <span aria-hidden="true"> · </span>
                <span>{activeCert.duration}</span>
                <span aria-hidden="true"> · </span>
                <span>{activeCert.difficulty}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-light tracking-tight text-foreground leading-[1.12] mb-4">
                {activeCert.title}
              </h1>

              <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed mb-7 line-clamp-3">
                {activeCert.description}
              </p>

              {/* Unboxed Skills Summary */}
              {activeCert.skills.length > 0 && (
                <div className="text-xs text-muted-foreground mb-7">
                  {activeCert.skills.join(' · ')}
                </div>
              )}

              {/* Primary Focal Actions */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  href={`/cert/${activeCert.id}`}
                  className="editorial-pill rounded-full px-7 py-2.5 text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-150 whitespace-nowrap"
                >
                  {t('action.explore')}
                </Link>

                <a
                  href={activeCert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full px-5 py-2.5 text-xs font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity inline-flex items-center gap-1.5 whitespace-nowrap"
                >
                  <span>{t('cert.start')}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={() => toggleBookmark(activeCert.id)}
                  aria-label={
                    isBookmarked(activeCert.id) ? t('action.saved') : t('action.save')
                  }
                  className={cn(
                    'w-10 h-10 rounded-full border inline-flex items-center justify-center transition-colors',
                    isBookmarked(activeCert.id)
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-foreground/20 bg-card/65 text-foreground hover:border-foreground'
                  )}
                >
                  <Bookmark
                    className={cn('w-4 h-4', isBookmarked(activeCert.id) && 'fill-current')}
                  />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
          <h2 className="text-2xl font-headline font-light text-foreground mb-2">
            {t('empty.title')}
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mb-6">{t('empty.sub')}</p>
          <button
            type="button"
            onClick={resetAllFilters}
            className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-medium"
          >
            {t('empty.button')}
          </button>
        </div>
      )}

      {/* Bottom Tick-Mark Ruler Scrubber (matching < Indietro | | | [ 1935 ] | | | Avanti >) */}
      <div className="px-4 sm:px-8 py-4 flex items-center justify-between gap-4 bg-background/50 backdrop-blur-sm">
        {/* Left: Theme & Language */}
        <div className="hidden md:flex items-center gap-3 text-xs text-muted-foreground shrink-0">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors whitespace-nowrap py-1"
          >
            {theme === 'light' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
            <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
          </button>
          <span aria-hidden="true">·</span>
          <button
            type="button"
            onClick={toggleLanguage}
            className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors whitespace-nowrap py-1"
          >
            <Languages className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'AR' : 'EN'}</span>
          </button>
        </div>

        {/* Center: Ruler Scrubber */}
        <div className="flex-1 max-w-2xl mx-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => stepArc(-1)}
            disabled={total <= 1}
            className="editorial-pill rounded-full px-3.5 py-2 text-xs font-medium text-foreground hover:bg-primary hover:text-primary-foreground disabled:opacity-40 transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t('action.prev')}</span>
          </button>

          <div
            onClick={handleRulerClick}
            role="slider"
            aria-label="Certification Timeline Scrubber"
            aria-valuemin={1}
            aria-valuemax={Math.max(1, total)}
            aria-valuenow={safeIndex + 1}
            tabIndex={0}
            className="relative flex-1 h-9 editorial-pill rounded-full px-4 flex items-center cursor-pointer overflow-hidden"
          >
            {/* Tick Marks */}
            <div className="w-full flex items-center justify-between pointer-events-none px-2">
              {Array.from({ length: 36 }).map((_, idx) => (
                <span
                  key={idx}
                  className={`w-px ${
                    idx % 5 === 0 ? 'h-3.5 bg-foreground/30' : 'h-2 bg-foreground/15'
                  }`}
                />
              ))}
            </div>

            {/* Active Index Indicator Pill */}
            {total > 0 && (
              <div
                style={{
                  left: `calc(${progressPercent}% * 0.78 + 8px)`,
                }}
                className="pointer-events-none absolute top-1 bottom-1 px-3 rounded-full bg-background border border-foreground/20 shadow-sm flex items-center justify-center text-[11px] font-mono tabular-nums font-medium text-foreground transition-all duration-150 whitespace-nowrap"
              >
                {String(safeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => stepArc(1)}
            disabled={total <= 1}
            className="editorial-pill rounded-full px-3.5 py-2 text-xs font-medium text-foreground hover:bg-primary hover:text-primary-foreground disabled:opacity-40 transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <span className="hidden sm:inline">{t('action.next')}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right: Legal Links */}
        <div className="hidden md:flex items-center gap-3 text-xs text-muted-foreground whitespace-nowrap shrink-0">
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
