"use client";

import { useMemo } from 'react';
import Link from 'next/link';
import certificationsData from '@/app/data/certifications.json';
import { Certification } from '@/app/lib/types';
import CertCard from '@/components/certs/CertCard';
import { useSettings } from '@/context/SettingsContext';
import { ArrowRight, Trash2 } from 'lucide-react';

export default function BookmarksPage() {
  const { t, bookmarkedIds, clearBookmarks } = useSettings();

  const savedCerts = useMemo(() => {
    try {
      return (certificationsData as Certification[]).filter(c =>
        bookmarkedIds.includes(c.id)
      );
    } catch (error) {
      console.error('Failed to resolve bookmarked certifications:', error);
      return [];
    }
  }, [bookmarkedIds]);

  return (
    <div className="pb-24">
      <section className="border-b border-foreground/10 py-12 sm:py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground tabular-nums mb-3">
              <span>PERSONAL SHORTLIST</span>
              <span aria-hidden="true"> · </span>
              <span>
                {savedCerts.length} {t('cert.credentials')}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-headline font-light tracking-tight text-foreground mb-3">
              {t('nav.saved')}
            </h1>

            <p className="text-base text-muted-foreground max-w-xl leading-relaxed">
              {t('saved.subtitle')}
            </p>
          </div>

          {savedCerts.length > 0 && (
            <button
              type="button"
              onClick={clearBookmarks}
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-foreground/20 hover:border-foreground text-xs font-medium text-foreground transition-colors whitespace-nowrap self-start sm:self-auto"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t('action.clear_bookmarks')}</span>
            </button>
          )}
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 pt-12">
        {savedCerts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedCerts.map(cert => (
              <CertCard key={cert.id} certification={cert} />
            ))}
          </div>
        ) : (
          <div className="py-20 px-6 border border-foreground/12 bg-card/60 backdrop-blur-sm max-w-2xl mx-auto text-center">
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
              00 SAVED ITEMS
            </div>
            <h2 className="text-2xl sm:text-3xl font-headline font-light text-foreground mb-3">
              {t('empty.title')}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto leading-relaxed mb-8">
              {t('saved.empty_desc')}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/?view=majors"
                className="px-6 py-3 rounded-full bg-primary text-primary-foreground text-xs font-medium inline-flex items-center gap-2"
              >
                <span>Explore {t('nav.majors')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/?view=arc"
                className="px-6 py-3 rounded-full border border-foreground/20 hover:border-foreground text-xs font-medium text-foreground"
              >
                Open Certifications Arc
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
