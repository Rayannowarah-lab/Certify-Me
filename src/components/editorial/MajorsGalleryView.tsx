"use client";

import { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft, Sun, Moon, Languages } from 'lucide-react';
import { Category, Certification } from '@/app/lib/types';
import { useSettings } from '@/context/SettingsContext';
import { DisciplinePlate } from '@/components/editorial/SwissPlates';

interface MajorsGalleryViewProps {
  categories: Category[];
  certifications: Certification[];
}

export default function MajorsGalleryView({
  categories,
  certifications,
}: MajorsGalleryViewProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({ startX: 0, startScrollLeft: 0, moved: false });
  const router = useRouter();
  const { t, theme, language, toggleTheme, toggleLanguage } = useSettings();

  const updateProgress = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      setScrollProgress(0);
      return;
    }
    const raw = Math.abs(el.scrollLeft) / maxScroll;
    setScrollProgress(Math.min(1, Math.max(0, raw)));
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateProgress();
    el.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      el.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [updateProgress]);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      el.scrollLeft += e.deltaY;
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el) return;
    setIsDragging(true);
    dragState.current = {
      startX: e.clientX,
      startScrollLeft: el.scrollLeft,
      moved: false,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !trackRef.current) return;
    const dx = e.clientX - dragState.current.startX;
    if (Math.abs(dx) > 6) {
      dragState.current.moved = true;
    }
    trackRef.current.scrollLeft = dragState.current.startScrollLeft - dx;
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handleColumnClick = (slug: string, e: React.MouseEvent) => {
    if (dragState.current.moved) {
      e.preventDefault();
      return;
    }
    try {
      router.push(`/category/${slug}`);
    } catch (error) {
      console.error('Failed to navigate to category page:', error);
    }
  };

  const handleRulerScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    const maxScroll = el.scrollWidth - el.clientWidth;
    el.scrollTo({
      left: language === 'ar' ? -ratio * maxScroll : ratio * maxScroll,
      behavior: 'smooth',
    });
  };

  const stepScroll = (direction: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const delta = direction * 380 * (language === 'ar' ? -1 : 1);
    el.scrollBy({ left: delta, behavior: 'smooth' });
  };

  return (
    <div className="relative flex-1 min-h-[calc(100vh-4rem)] flex flex-col justify-between overflow-hidden">
      {/* Horizontal Architectural Columns Track (matching Temi view in reference video) */}
      <div
        ref={trackRef}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className={`flex-1 flex items-stretch overflow-x-auto no-scrollbar border-b border-foreground/10 select-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        {categories.map((cat, idx) => {
          const count = certifications.filter(c => c.categorySlug === cat.slug).length;
          return (
            <article
              key={cat.slug}
              onClick={e => handleColumnClick(cat.slug, e)}
              className="w-[82vw] sm:w-[350px] lg:w-[390px] shrink-0 border-r border-foreground/10 px-6 sm:px-7 py-7 flex flex-col justify-between hover:bg-card/45 transition-colors duration-200 group cursor-pointer"
            >
              {/* Top: Swiss Geometric Linework Plate + Interactive Open Bar */}
              <div>
                <DisciplinePlate slug={cat.slug} index={idx} certCount={count} />

                {/* Apri -> Equivalent Action Row */}
                <div className="flex items-center justify-between py-4 border-b border-foreground/10">
                  <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {t('action.open')}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground inline-flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                    {language === 'ar' ? (
                      <ArrowLeft className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5" />
                    )}
                  </span>
                </div>
              </div>

              {/* Bottom: Editorial Discipline Typography */}
              <div className="pt-8">
                <div className="text-[11px] font-mono text-muted-foreground tabular-nums mb-2">
                  <span>
                    {count} {t('cert.credentials')}
                  </span>
                  <span aria-hidden="true"> · </span>
                  <span>{t('cert.free')}</span>
                </div>

                <h2 className="text-3xl lg:text-[2.15rem] font-headline font-light tracking-tight text-foreground leading-[1.12] mb-3 group-hover:underline underline-offset-4">
                  {cat.name}
                </h2>

                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                  {cat.description}
                </p>

                <Link
                  href={`/?view=arc&category=${encodeURIComponent(cat.name)}`}
                  onClick={e => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
                >
                  <span>Browse on Arc</span>
                  <span aria-hidden="true">-&gt;</span>
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      {/* Bottom Spatial Scrubber Rail (matching <- Trascina -> ruler in reference video) */}
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

        {/* Center: Tick-Mark Ruler Track + <- Drag -> Pill */}
        <div className="flex-1 max-w-xl mx-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => stepScroll(-1)}
            aria-label={t('action.prev')}
            className="editorial-pill rounded-full w-8 h-8 inline-flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>

          <div
            onClick={handleRulerScrub}
            role="slider"
            aria-label={t('action.drag')}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(scrollProgress * 100)}
            tabIndex={0}
            onKeyDown={e => {
              if (e.key === 'ArrowRight') stepScroll(1);
              if (e.key === 'ArrowLeft') stepScroll(-1);
            }}
            className="relative flex-1 h-9 editorial-pill rounded-full px-4 flex items-center justify-between cursor-pointer overflow-hidden"
          >
            {/* Vertical Tick Marks */}
            <div className="w-full flex items-center justify-between pointer-events-none px-2">
              {Array.from({ length: 32 }).map((_, idx) => (
                <span
                  key={idx}
                  className={`w-px ${
                    idx % 4 === 0 ? 'h-3 bg-foreground/30' : 'h-2 bg-foreground/15'
                  }`}
                />
              ))}
            </div>

            {/* Moving <- Drag -> Indicator Pill */}
            <div
              style={{
                transform: `translateX(${scrollProgress * 140}%)`,
              }}
              className="pointer-events-none absolute left-2 top-1 bottom-1 w-[38%] max-w-[116px] rounded-full bg-background border border-foreground/20 shadow-sm flex items-center justify-center gap-1.5 text-[11px] font-medium text-foreground transition-transform duration-100 whitespace-nowrap"
            >
              <span aria-hidden="true">&lt;-</span>
              <span>{t('action.drag')}</span>
              <span aria-hidden="true">-&gt;</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => stepScroll(1)}
            aria-label={t('action.next')}
            className="editorial-pill rounded-full w-8 h-8 inline-flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors shrink-0"
          >
            <ArrowRight className="w-3.5 h-3.5" />
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
