"use client";

import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import certificationsData from '@/app/data/certifications.json';
import categoriesData from '@/app/data/categories.json';
import { Certification, Category } from '@/app/lib/types';
import CertCard from '@/components/certs/CertCard';
import { DisciplinePlate } from '@/components/editorial/SwissPlates';
import { useSettings } from '@/context/SettingsContext';
import { ArrowLeft, Search, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CategoryPage() {
  const { slug } = useParams();
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [localQuery, setLocalQuery] = useState('');
  const { t } = useSettings();

  const categories = categoriesData as Category[];
  const categoryIndex = useMemo(
    () => categories.findIndex(c => c.slug === slug),
    [categories, slug]
  );
  const category = categoryIndex >= 0 ? categories[categoryIndex] : undefined;

  const baseCategoryCerts = useMemo(() => {
    try {
      return (certificationsData as Certification[]).filter(c => c.categorySlug === slug);
    } catch (error) {
      console.error('Failed to filter certifications for category:', slug, error);
      return [];
    }
  }, [slug]);

  const displayedCerts = useMemo(() => {
    try {
      const q = localQuery.trim().toLowerCase();
      return baseCategoryCerts.filter(cert => {
        const matchesDiff =
          difficultyFilter === 'All' || cert.difficulty === difficultyFilter;
        const matchesText =
          !q ||
          cert.title.toLowerCase().includes(q) ||
          cert.organization.toLowerCase().includes(q) ||
          cert.skills.some(s => s.toLowerCase().includes(q));
        return matchesDiff && matchesText;
      });
    } catch (error) {
      console.error('Failed to filter category search results:', error);
      return [];
    }
  }, [baseCategoryCerts, difficultyFilter, localQuery]);

  if (!category) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-24 text-center">
        <h1 className="text-3xl font-headline font-light text-foreground mb-4">
          Discipline Not Found
        </h1>
        <Link
          href="/?view=majors"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t('action.back_majors')}</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Architectural Discipline Header */}
      <section className="border-b border-foreground/10 py-12 sm:py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between gap-4 mb-10">
            <Link
              href="/?view=majors"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t('action.back_majors')}</span>
            </Link>

            <Link
              href={`/?view=arc&category=${encodeURIComponent(category.name)}`}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-foreground hover:underline underline-offset-4"
            >
              <span>Explore on Curved Arc</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground tabular-nums mb-4">
                  <span>DISCIPLINE NO. {String(categoryIndex + 1).padStart(2, '0')}</span>
                  <span aria-hidden="true"> · </span>
                  <span>
                    {baseCategoryCerts.length} {t('cert.credentials')}
                  </span>
                  <span aria-hidden="true"> · </span>
                  <span>{t('cert.free')}</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-headline font-light tracking-tight text-foreground leading-[1.08] mb-5">
                  {category.name}
                </h1>

                <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                  {category.description}
                </p>
              </div>

              {/* Filter & Search Controls */}
              <div className="pt-8 mt-8 border-t border-foreground/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-1 p-1 bg-secondary/70 border border-border overflow-x-auto no-scrollbar">
                  {['All', 'Beginner', 'Intermediate', 'Advanced'].map(level => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setDifficultyFilter(level)}
                      className={cn(
                        'px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors',
                        difficultyFilter === level
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground'
                      )}
                    >
                      {level === 'All' ? t('filter.all_levels') : level}
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={localQuery}
                    onChange={e => setLocalQuery(e.target.value)}
                    placeholder="Filter within discipline..."
                    className="w-full pl-9 pr-3 py-2 text-xs bg-card/80 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex items-center justify-end">
              <div className="w-full max-w-md ml-auto">
                <DisciplinePlate
                  slug={category.slug}
                  index={categoryIndex}
                  certCount={baseCategoryCerts.length}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Grid */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 pt-12">
        <div className="flex items-center justify-between mb-6 text-xs font-mono text-muted-foreground tabular-nums">
          <span>
            SHOWING {displayedCerts.length} OF {baseCategoryCerts.length}{' '}
            {t('cert.credentials').toUpperCase()}
          </span>
          {(difficultyFilter !== 'All' || localQuery) && (
            <button
              type="button"
              onClick={() => {
                setDifficultyFilter('All');
                setLocalQuery('');
              }}
              className="text-foreground hover:underline"
            >
              {t('empty.button')}
            </button>
          )}
        </div>

        {displayedCerts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedCerts.map(cert => (
              <CertCard key={cert.id} certification={cert} />
            ))}
          </div>
        ) : (
          <div className="py-20 px-6 border border-foreground/12 bg-card/50 text-center max-w-xl mx-auto">
            <h2 className="text-2xl font-headline font-light text-foreground mb-2">
              {t('empty.title')}
            </h2>
            <p className="text-sm text-muted-foreground mb-6">{t('empty.sub')}</p>
            <button
              type="button"
              onClick={() => {
                setDifficultyFilter('All');
                setLocalQuery('');
              }}
              className="px-6 py-2.5 bg-primary text-primary-foreground text-xs font-medium"
            >
              {t('empty.button')}
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
