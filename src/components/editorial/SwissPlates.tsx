"use client";

import { cn } from '@/lib/utils';

export function BrandMonogram({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'relative inline-flex items-center justify-center w-8 h-6 shrink-0 select-none',
        className
      )}
    >
      {/* Interlocking Swiss Geometric Circle + Offset Architectural Frame */}
      <span className="absolute left-0 w-5 h-5 rounded-full border-[1.5px] border-foreground transition-transform duration-200 group-hover:-translate-x-0.5" />
      <span className="absolute right-0 w-4 h-4 border-[1.5px] border-foreground transition-transform duration-200 group-hover:translate-x-0.5" />
      <span className="w-1.5 h-1.5 rounded-full bg-foreground z-10" />
    </span>
  );
}

interface PlateMeta {
  code: string;
  axisLabel: string;
}

const PLATE_CONFIG: Record<string, PlateMeta> = {
  'cyber-security': { code: 'SEC-01', axisLabel: 'DEFENSE · CRYPTOGRAPHY' },
  'computer-science': { code: 'CSC-02', axisLabel: 'ALGORITHMS · SYSTEMS' },
  'artificial-intelligence': { code: 'AIM-03', axisLabel: 'NEURAL · INFERENCE' },
  'data-science': { code: 'DAT-04', axisLabel: 'STATISTICS · PIPELINES' },
  marketing: { code: 'MKT-05', axisLabel: 'SEARCH · ACQUISITION' },
  cloud: { code: 'CLD-06', axisLabel: 'INFRASTRUCTURE · DISTRIBUTED' },
  it: { code: 'ITS-07', axisLabel: 'NETWORKING · OPERATIONS' },
  finance: { code: 'FIN-08', axisLabel: 'CAPITAL · VALUATION' },
  'graphic-design': { code: 'DES-09', axisLabel: 'TYPOGRAPHY · VISUALS' },
  'game-development': { code: 'GMD-10', axisLabel: 'REALTIME · SIMULATION' },
};

interface DisciplinePlateProps {
  slug: string;
  index: number;
  certCount: number;
  className?: string;
}

export function DisciplinePlate({
  slug,
  index,
  certCount,
  className,
}: DisciplinePlateProps) {
  const meta = PLATE_CONFIG[slug] || { code: `ARC-0${index + 1}`, axisLabel: 'DISCIPLINE ARCHIVE' };
  const formattedIndex = String(index + 1).padStart(2, '0');

  return (
    <div
      className={cn(
        'relative w-full aspect-[4/3] overflow-hidden bg-secondary/75 dark:bg-secondary/50 border border-foreground/10 p-4 flex flex-col justify-between select-none group/plate',
        className
      )}
    >
      {/* Subtle Internal Coordinate Crosshairs */}
      <div className="absolute inset-x-0 top-1/2 h-px bg-foreground/[0.08] pointer-events-none" />
      <div className="absolute inset-y-0 left-1/2 w-px bg-foreground/[0.08] pointer-events-none" />

      {/* Top Plate Header */}
      <div className="relative z-10 flex items-center justify-between text-[10px] font-mono tracking-widest text-muted-foreground tabular-nums">
        <span>{meta.code}</span>
        <span>NO. {formattedIndex}</span>
      </div>

      {/* Discipline-Specific Josef Muller-Brockmann Geometric Linework */}
      <div className="relative z-10 flex-1 flex items-center justify-center my-2">
        {slug === 'cyber-security' && (
          <div className="relative w-28 h-28 flex items-center justify-center transition-transform duration-300 group-hover/plate:scale-105">
            <div className="absolute inset-0 rounded-full border border-foreground/35" />
            <div className="absolute inset-3 rounded-full border border-dashed border-foreground/30" />
            <div className="absolute inset-7 border border-foreground/50 rotate-45" />
            <div className="w-2.5 h-2.5 bg-foreground" />
          </div>
        )}

        {slug === 'computer-science' && (
          <div className="relative w-32 h-24 grid grid-cols-4 grid-rows-3 border border-foreground/35 transition-transform duration-300 group-hover/plate:scale-105">
            {Array.from({ length: 12 }).map((_, idx) => (
              <div
                key={idx}
                className={cn(
                  'border-r border-b border-foreground/20 flex items-center justify-center',
                  (idx === 0 || idx === 5 || idx === 10) && 'bg-foreground/15',
                  idx === 6 && 'bg-foreground/80'
                )}
              />
            ))}
          </div>
        )}

        {slug === 'artificial-intelligence' && (
          <div className="relative w-32 h-28 flex items-center justify-center transition-transform duration-300 group-hover/plate:scale-105">
            <div className="absolute left-2 w-16 h-16 rounded-full border border-foreground/35" />
            <div className="absolute right-2 w-16 h-16 rounded-full border border-foreground/35" />
            <div className="absolute top-1 w-16 h-16 rounded-full border border-foreground/35" />
            <div className="w-6 h-6 rounded-full bg-foreground/85" />
          </div>
        )}

        {slug === 'data-science' && (
          <div className="relative w-32 h-24 flex items-end justify-between gap-2 px-2 pb-2 border-b border-l border-foreground/45 transition-transform duration-300 group-hover/plate:scale-105">
            <div className="w-4 h-[35%] border border-foreground/40 bg-foreground/10" />
            <div className="w-4 h-[62%] border border-foreground/40 bg-foreground/20" />
            <div className="w-4 h-[48%] border border-foreground/40 bg-foreground/10" />
            <div className="w-4 h-[88%] bg-foreground/80" />
            <div className="w-4 h-[72%] border border-foreground/40 bg-foreground/25" />
          </div>
        )}

        {slug === 'marketing' && (
          <div className="relative w-28 h-28 flex items-center justify-center transition-transform duration-300 group-hover/plate:scale-105">
            <div className="absolute left-0 w-8 h-8 rounded-full bg-foreground/85" />
            <div className="absolute left-1 w-16 h-16 rounded-full border border-foreground/40" />
            <div className="absolute left-2 w-24 h-24 rounded-full border border-foreground/25" />
          </div>
        )}

        {slug === 'cloud' && (
          <div className="relative w-32 h-24 flex flex-col justify-center gap-2.5 transition-transform duration-300 group-hover/plate:scale-105">
            <div className="h-4 w-4/5 border border-foreground/45 bg-foreground/10 translate-x-4" />
            <div className="h-4 w-full border border-foreground/60 bg-foreground/20" />
            <div className="h-4 w-3/4 bg-foreground/80 translate-x-2" />
          </div>
        )}

        {slug === 'it' && (
          <div className="relative w-32 h-24 border border-foreground/40 p-2 flex flex-col justify-between transition-transform duration-300 group-hover/plate:scale-105">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 border border-foreground/60" />
              <span className="w-2 h-2 border border-foreground/60" />
              <span className="h-px flex-1 bg-foreground/30" />
            </div>
            <div className="grid grid-cols-3 gap-2 my-auto">
              <div className="h-8 border border-foreground/35" />
              <div className="h-8 bg-foreground/80" />
              <div className="h-8 border border-foreground/35" />
            </div>
            <div className="h-px w-full bg-foreground/30" />
          </div>
        )}

        {slug === 'finance' && (
          <div className="relative w-28 h-28 border border-foreground/35 flex items-center justify-center transition-transform duration-300 group-hover/plate:scale-105">
            <div className="absolute inset-0 border-b border-r border-foreground/25 scale-75 origin-bottom-left" />
            <div className="absolute inset-0 border-b border-r border-foreground/40 scale-50 origin-bottom-left" />
            <div className="w-full h-px bg-foreground/75 -rotate-45" />
            <div className="absolute top-3 right-3 w-3 h-3 bg-foreground" />
          </div>
        )}

        {slug === 'graphic-design' && (
          <div className="relative w-32 h-24 border border-foreground/45 grid grid-cols-3 transition-transform duration-300 group-hover/plate:scale-105">
            <div className="col-span-2 border-r border-foreground/40 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full border border-foreground/65" />
            </div>
            <div className="grid grid-rows-2">
              <div className="border-b border-foreground/40 bg-foreground/80" />
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 rounded-full border border-foreground/50" />
              </div>
            </div>
          </div>
        )}

        {(slug === 'game-development' || !PLATE_CONFIG[slug]) && (
          <div className="relative w-28 h-28 flex items-center justify-center transition-transform duration-300 group-hover/plate:scale-105">
            <div className="w-16 h-16 border border-foreground/50 rotate-45" />
            <div className="absolute w-16 h-16 border border-foreground/35" />
            <div className="absolute w-5 h-5 bg-foreground rotate-45" />
          </div>
        )}
      </div>

      {/* Bottom Plate Technical Caption */}
      <div className="relative z-10 flex items-center justify-between text-[10px] font-mono tracking-wider text-muted-foreground tabular-nums pt-2 border-t border-foreground/10">
        <span className="truncate max-w-[70%]">{meta.axisLabel}</span>
        <span>{String(certCount).padStart(2, '0')} CERTS</span>
      </div>
    </div>
  );
}
