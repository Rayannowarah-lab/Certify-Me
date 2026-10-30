"use client";

import { useParams, useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import certificationsData from '@/app/data/certifications.json';
import { Certification } from '@/app/lib/types';
import CertCard from '@/components/certs/CertCard';
import { useSettings } from '@/context/SettingsContext';
import {
  Bookmark,
  ArrowLeft,
  ArrowUpRight,
  Share2,
  Check,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CertDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const { t, isBookmarked, toggleBookmark } = useSettings();

  const certifications = certificationsData as Certification[];

  const cert = useMemo(() => {
    try {
      return certifications.find(c => c.id === id) || null;
    } catch (error) {
      console.error('Failed to resolve certification by id:', error);
      return null;
    }
  }, [certifications, id]);

  const relatedCerts = useMemo(() => {
    if (!cert) return [];
    return certifications
      .filter(c => c.categorySlug === cert.categorySlug && c.id !== cert.id)
      .slice(0, 3);
  }, [cert, certifications]);

  const handleShare = async () => {
    if (!cert) return;
    try {
      if (navigator.share) {
        await navigator.share({
          title: cert.title,
          text: `${cert.title} by ${cert.organization} - Free Industry Certification`,
          url: window.location.href,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      }
    } catch (error) {
      console.error('Failed to share certification:', error);
    }
  };

  if (!cert) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-24 text-center">
        <h1 className="text-3xl font-headline font-light text-foreground mb-4">
          Credential Not Found
        </h1>
        <Link
          href="/?view=arc"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t('action.back_catalog')}</span>
        </Link>
      </div>
    );
  }

  const saved = isBookmarked(cert.id);

  return (
    <div className="pb-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 pt-10 sm:pt-14">
        {/* Top Breadcrumb Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-10 border-b border-foreground/10 text-xs font-mono text-muted-foreground">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => router.back()}
              className="inline-flex items-center gap-1.5 text-foreground hover:underline underline-offset-4"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <span aria-hidden="true">/</span>
            <Link
              href={`/category/${cert.categorySlug}`}
              className="hover:text-foreground hover:underline underline-offset-4"
            >
              {cert.category}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="tabular-nums">REF. {String(cert.id).padStart(3, '0')}</span>
          </div>

          <Link
            href="/?view=arc"
            className="hover:text-foreground hover:underline underline-offset-4"
          >
            View on Curved Arc -&gt;
          </Link>
        </div>

        {/* Asymmetric Editorial Monograph Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Primary Column (7 cols) */}
          <div className="lg:col-span-7">
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground tabular-nums mb-4">
              <span>{cert.organization}</span>
              <span aria-hidden="true"> · </span>
              <span>{cert.category}</span>
              <span aria-hidden="true"> · </span>
              <span>{t('cert.free')}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-headline font-light tracking-tight text-foreground leading-[1.1] mb-8">
              {cert.title}
            </h1>

            <div className="border-t border-b border-foreground/12 py-8 mb-8">
              <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
                Overview & Curriculum Scope
              </h2>
              <p className="text-base sm:text-lg text-foreground/90 leading-relaxed max-w-prose">
                {cert.description}
              </p>
            </div>

            {/* Unboxed Skills Competency List */}
            {cert.skills.length > 0 && (
              <div className="mb-10">
                <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
                  Verified Competencies
                </h3>
                <p className="text-sm sm:text-base font-medium text-foreground leading-relaxed">
                  {cert.skills.join(' · ')}
                </p>
              </div>
            )}

            {/* Primary Action Controls */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-full bg-primary text-primary-foreground text-sm font-medium inline-flex items-center gap-2 hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                <span>{t('cert.start')}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => toggleBookmark(cert.id)}
                className={cn(
                  'px-6 py-3.5 rounded-full border text-sm font-medium inline-flex items-center gap-2 transition-colors whitespace-nowrap',
                  saved
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-foreground/20 bg-card/70 text-foreground hover:border-foreground'
                )}
              >
                <Bookmark className={cn('w-4 h-4', saved && 'fill-current')} />
                <span>{saved ? t('action.saved') : t('action.save')}</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="px-5 py-3.5 rounded-full border border-foreground/15 hover:border-foreground bg-card/50 text-xs font-medium text-foreground inline-flex items-center gap-2 transition-colors whitespace-nowrap"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? t('action.copied') : t('action.share')}</span>
              </button>
            </div>
          </div>

          {/* Accession Metadata Specification Column (5 cols) */}
          <aside className="lg:col-span-5 bg-card/80 backdrop-blur-sm border border-foreground/12 p-7 sm:p-8">
            <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground pb-4 border-b border-foreground/10 mb-2">
              Credential Specification
            </h2>

            <dl className="divide-y divide-foreground/10 text-sm">
              <div className="py-3.5 flex items-baseline justify-between gap-4">
                <dt className="text-muted-foreground">Issuing Institution</dt>
                <dd className="font-medium text-foreground text-right">{cert.organization}</dd>
              </div>
              <div className="py-3.5 flex items-baseline justify-between gap-4">
                <dt className="text-muted-foreground">University Discipline</dt>
                <dd className="font-medium text-foreground text-right">
                  <Link
                    href={`/category/${cert.categorySlug}`}
                    className="hover:underline underline-offset-4"
                  >
                    {cert.category}
                  </Link>
                </dd>
              </div>
              <div className="py-3.5 flex items-baseline justify-between gap-4">
                <dt className="text-muted-foreground">Estimated Duration</dt>
                <dd className="font-mono text-xs tabular-nums text-foreground text-right">
                  {cert.duration}
                </dd>
              </div>
              <div className="py-3.5 flex items-baseline justify-between gap-4">
                <dt className="text-muted-foreground">Level</dt>
                <dd className="font-medium text-foreground text-right">{cert.difficulty}</dd>
              </div>
              <div className="py-3.5 flex items-baseline justify-between gap-4">
                <dt className="text-muted-foreground">Tuition Fee</dt>
                <dd className="font-medium text-foreground text-right">{t('cert.free')}</dd>
              </div>
              <div className="py-3.5 flex items-baseline justify-between gap-4">
                <dt className="text-muted-foreground">Enrollment Source</dt>
                <dd className="font-mono text-xs text-foreground text-right">Official Portal</dd>
              </div>
            </dl>

            <p className="mt-6 pt-5 border-t border-foreground/10 text-xs text-muted-foreground leading-relaxed">
              Coursework and credential verification are hosted directly by {cert.organization}. Add the completed badge or certificate URL to your CV and LinkedIn profile upon finishing.
            </p>
          </aside>
        </div>

        {/* Related Credentials in Same Discipline */}
        {relatedCerts.length > 0 && (
          <section className="mt-20 pt-12 border-t border-foreground/10">
            <div className="flex items-baseline justify-between gap-4 mb-8">
              <h2 className="text-2xl sm:text-3xl font-headline font-light text-foreground">
                More in {cert.category}
              </h2>
              <Link
                href={`/category/${cert.categorySlug}`}
                className="text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground"
              >
                View All -&gt;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedCerts.map(rel => (
                <CertCard key={rel.id} certification={rel} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
