"use client";

import { useState, useMemo, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import certificationsData from '@/app/data/certifications.json';
import categoriesData from '@/app/data/categories.json';
import { Certification, Category } from '@/app/lib/types';
import { useSettings } from '@/context/SettingsContext';
import { Search, X, ArrowUpRight, ArrowRight } from 'lucide-react';

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, t } = useSettings();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const certifications = certificationsData as Certification[];
  const categories = categoriesData as Category[];

  useEffect(() => {
    if (isSearchOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsSearchOpen(false);
        }
      };
      window.addEventListener('keydown', onKeyDown);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('keydown', onKeyDown);
      };
    }
  }, [isSearchOpen, setIsSearchOpen]);

  const results = useMemo(() => {
    try {
      const q = query.trim().toLowerCase();
      return certifications.filter(cert => {
        const matchesCat = selectedCategory === 'All' || cert.category === selectedCategory;
        if (!q) return matchesCat;
        const matchesText =
          cert.title.toLowerCase().includes(q) ||
          cert.organization.toLowerCase().includes(q) ||
          cert.category.toLowerCase().includes(q) ||
          cert.skills.some(s => s.toLowerCase().includes(q));
        return matchesCat && matchesText;
      });
    } catch (error) {
      console.error('Failed to filter certifications inside SearchModal:', error);
      return [];
    }
  }, [query, selectedCategory, certifications]);

  if (!isSearchOpen) return null;

  const handleOpenInArc = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const params = new URLSearchParams();
      params.set('view', 'arc');
      if (query.trim()) params.set('search', query.trim());
      if (selectedCategory !== 'All') params.set('category', selectedCategory);
      setIsSearchOpen(false);
      router.push(`/?${params.toString()}`);
    } catch (error) {
      console.error('Failed to navigate from SearchModal to Arc view:', error);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t('nav.search')}
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-foreground/25 dark:bg-black/60 backdrop-blur-sm"
      onClick={() => setIsSearchOpen(false)}
    >
      <div
        className="w-full max-w-3xl bg-background border border-border shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Header */}
        <form onSubmit={handleOpenInArc} className="flex items-center border-b border-border px-5 py-4 gap-3">
          <Search className="w-5 h-5 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={t('nav.search_placeholder')}
            className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-xs font-mono text-muted-foreground hover:text-foreground px-2 py-1"
            >
              Clear
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsSearchOpen(false)}
            aria-label={t('portal.close')}
            className="w-9 h-9 inline-flex items-center justify-center text-muted-foreground hover:text-foreground border border-transparent hover:border-border transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </form>

        {/* Functional Major Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar px-5 py-3 border-b border-border bg-secondary/40">
          <button
            type="button"
            onClick={() => setSelectedCategory('All')}
            className={`px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
              selectedCategory === 'All'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t('filter.all_majors')}
          </button>
          {categories.map(cat => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                selectedCategory === cat.name
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[55vh] overflow-y-auto custom-scrollbar divide-y divide-border">
          {results.length > 0 ? (
            results.slice(0, 20).map(cert => (
              <div
                key={cert.id}
                className="flex items-center justify-between gap-4 px-5 py-3.5 hover:bg-secondary/50 transition-colors"
              >
                <Link
                  href={`/cert/${cert.id}`}
                  onClick={() => setIsSearchOpen(false)}
                  className="flex-1 min-w-0 group"
                >
                  <div className="text-[11px] font-mono text-muted-foreground tabular-nums mb-0.5">
                    <span>{cert.organization}</span>
                    <span aria-hidden="true"> · </span>
                    <span>{cert.category}</span>
                    <span aria-hidden="true"> · </span>
                    <span>{cert.duration}</span>
                  </div>
                  <div className="text-sm sm:text-base font-headline font-normal text-foreground group-hover:underline truncate">
                    {cert.title}
                  </div>
                </Link>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/cert/${cert.id}`}
                    onClick={() => setIsSearchOpen(false)}
                    className="px-3 py-1.5 text-xs font-medium border border-border hover:border-foreground text-foreground transition-colors whitespace-nowrap"
                  >
                    {t('action.open')}
                  </Link>
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${cert.title} (${t('action.enroll')})`}
                    className="w-8 h-8 inline-flex items-center justify-center text-muted-foreground hover:text-foreground border border-border hover:border-foreground transition-colors"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="py-14 px-6 text-center">
              <p className="font-headline text-lg text-foreground mb-1">{t('empty.title')}</p>
              <p className="text-sm text-muted-foreground mb-4">{t('empty.sub')}</p>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setSelectedCategory('All');
                }}
                className="px-4 py-2 text-xs font-medium bg-primary text-primary-foreground"
              >
                {t('empty.button')}
              </button>
            </div>
          )}
        </div>

        {/* Footer Action Bar */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-border bg-secondary/30 text-xs text-muted-foreground">
          <span className="font-mono tabular-nums">
            {results.length} {t('cert.credentials')}
          </span>
          <button
            type="button"
            onClick={handleOpenInArc}
            className="inline-flex items-center gap-1.5 font-medium text-foreground hover:underline whitespace-nowrap"
          >
            <span>Open on Certifications Arc</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
