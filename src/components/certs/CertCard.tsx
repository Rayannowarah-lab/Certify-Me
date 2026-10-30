"use client";

import Link from 'next/link';
import { Certification } from '@/app/lib/types';
import { Bookmark, ArrowUpRight, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSettings } from '@/context/SettingsContext';

interface CertCardProps {
  certification: Certification;
}

export default function CertCard({ certification }: CertCardProps) {
  const { t, isBookmarked, toggleBookmark } = useSettings();
  const saved = isBookmarked(certification.id);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(certification.id);
  };

  return (
    <article className="h-full bg-card/80 backdrop-blur-sm border border-foreground/12 hover:border-foreground/35 p-6 flex flex-col justify-between transition-colors duration-200 group">
      <div>
        {/* Top Unboxed Metadata Row + Functional Bookmark Button */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground tabular-nums pt-1">
            <span>{certification.organization}</span>
            <span aria-hidden="true"> · </span>
            <span>{certification.category}</span>
          </div>

          <button
            type="button"
            onClick={handleBookmarkClick}
            aria-label={saved ? t('action.saved') : t('action.save')}
            className={cn(
              'w-9 h-9 -mt-1 -mr-1 inline-flex items-center justify-center border transition-colors shrink-0',
              saved
                ? 'border-accent/40 bg-accent/10 text-accent'
                : 'border-transparent hover:border-border text-muted-foreground hover:text-foreground'
            )}
          >
            <Bookmark className={cn('w-4 h-4', saved && 'fill-current')} />
          </button>
        </div>

        {/* Primary Title Linking to Monograph Specification View */}
        <Link href={`/cert/${certification.id}`} className="block mb-3">
          <h3 className="text-xl font-headline font-light tracking-tight text-foreground leading-snug group-hover:underline underline-offset-4">
            {certification.title}
          </h3>
        </Link>

        {/* Concise Description */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-5">
          {certification.description}
        </p>
      </div>

      <div>
        {/* Quiet Unboxed Specification Metadata */}
        <div className="text-xs font-mono text-muted-foreground tabular-nums pb-4 border-b border-foreground/10">
          <span>{certification.duration}</span>
          {certification.difficulty && (
            <>
              <span aria-hidden="true"> · </span>
              <span>{certification.difficulty}</span>
            </>
          )}
          <span aria-hidden="true"> · </span>
          <span>{t('cert.free')}</span>
        </div>

        {/* Dual Action Footer: Monograph Detail & Official Provider Link */}
        <div className="pt-4 flex items-center justify-between gap-3 text-xs font-medium">
          <Link
            href={`/cert/${certification.id}`}
            className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
          >
            <span>{t('action.explore')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <a
            href={certification.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-foreground hover:underline underline-offset-4 whitespace-nowrap"
          >
            <span>{t('cert.start')}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </article>
  );
}