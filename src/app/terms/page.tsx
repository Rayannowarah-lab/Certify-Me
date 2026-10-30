import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms & Conditions | CertifyMe',
  description: 'Terms of use and institutional disclaimers for CertifyMe.',
};

export default function TermsPage() {
  return (
    <div className="pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-8 pt-12 sm:pt-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground mb-10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Overview</span>
        </Link>

        <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
          LEGAL ARCHIVE · UPDATED OCTOBER 2026
        </div>
        <h1 className="text-4xl sm:text-5xl font-headline font-light tracking-tight text-foreground mb-8">
          Terms & Conditions
        </h1>

        <div className="space-y-8 border-t border-foreground/12 pt-8 text-sm sm:text-base text-foreground/85 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-headline font-normal text-foreground">
              01. Purpose of the Archive
            </h2>
            <p className="text-muted-foreground">
              CertifyMe curates publicly accessible, free-to-start industry courses and certifications to assist university students and early-career graduates in building practical skills. Access to this directory is provided free of charge for personal and academic career preparation.
            </p>
          </section>

          <section className="space-y-3 border-t border-foreground/10 pt-6">
            <h2 className="text-xl font-headline font-normal text-foreground">
              02. Non-Affiliation & Trademarks
            </h2>
            <p className="text-muted-foreground">
              CertifyMe is an independent academic resource curated by Rayan Nowarah and is not affiliated with, endorsed by, or sponsored by Google, Microsoft, IBM, Cisco, Fortinet, HubSpot, AWS, Unity, MongoDB, or Coursera. All organization names, course titles, and trademarks belong to their respective owners.
            </p>
          </section>

          <section className="space-y-3 border-t border-foreground/10 pt-6">
            <h2 className="text-xl font-headline font-normal text-foreground">
              03. Course Availability & Provider Changes
            </h2>
            <p className="text-muted-foreground">
              While listings are verified for zero-cost student access at the time of curation, external providers may update course durations, syllabi, or certificate issuance policies at their discretion. Always verify final credential terms on the official provider page before beginning coursework.
            </p>
          </section>

          <section className="space-y-3 border-t border-foreground/10 pt-6">
            <h2 className="text-xl font-headline font-normal text-foreground">
              04. Limitation of Liability
            </h2>
            <p className="text-muted-foreground">
              This directory is provided on an &ldquo;as-is&rdquo; informational basis without warranties of employment placement or exam outcomes. Completion of any listed certification depends on meeting the assessment standards of the issuing organization.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
