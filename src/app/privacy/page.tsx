import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | CertifyMe',
  description: 'Privacy policy and local browser storage disclosures for CertifyMe.',
};

export default function PrivacyPolicyPage() {
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
          Privacy Policy
        </h1>

        <div className="space-y-8 border-t border-foreground/12 pt-8 text-sm sm:text-base text-foreground/85 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-headline font-normal text-foreground">
              01. Data Collection & Zero Account Requirement
            </h2>
            <p className="text-muted-foreground">
              CertifyMe operates as an open-access educational directory for university students. You can browse all university majors, explore the certifications arc, and launch official courses without registering an account or submitting personal identification data.
            </p>
          </section>

          <section className="space-y-3 border-t border-foreground/10 pt-6">
            <h2 className="text-xl font-headline font-normal text-foreground">
              02. Local Browser Storage
            </h2>
            <p className="text-muted-foreground">
              To remember your saved certifications shortlist, display theme (Light or Dark), and preferred interface language (English or Arabic), CertifyMe stores lightweight keys exclusively in your own browser&apos;s local storage (`bookmarked_certs`, `theme`, and `lang`). This information never leaves your device and can be cleared at any time from the Saved page or your browser settings.
            </p>
          </section>

          <section className="space-y-3 border-t border-foreground/10 pt-6">
            <h2 className="text-xl font-headline font-normal text-foreground">
              03. External Certification Providers
            </h2>
            <p className="text-muted-foreground">
              When you choose to start a certification, links direct you to official external platforms such as Google, Microsoft, IBM, Cisco Networking Academy, AWS Skill Builder, HubSpot Academy, Unity Learn, or MongoDB University. Once you leave CertifyMe, enrollment and coursework are governed by the respective institution&apos;s privacy policy.
            </p>
          </section>

          <section className="space-y-3 border-t border-foreground/10 pt-6">
            <h2 className="text-xl font-headline font-normal text-foreground">
              04. Contact
            </h2>
            <p className="text-muted-foreground">
              For privacy inquiries or requests regarding catalog listings, you may reach the maintainer via the official LinkedIn or WhatsApp contact channels listed in the site footer.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
