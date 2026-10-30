"use client";

import { Suspense, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import certificationsData from '@/app/data/certifications.json';
import categoriesData from '@/app/data/categories.json';
import { Certification, Category } from '@/app/lib/types';
import PortalView from '@/components/editorial/PortalView';
import MajorsGalleryView from '@/components/editorial/MajorsGalleryView';
import CertificationsArcView from '@/components/editorial/CertificationsArcView';

function SpatialHomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const viewParam = searchParams.get('view');
  const searchFromUrl = searchParams.get('search') || '';
  const categoryFromUrl = searchParams.get('category') || 'All';

  const certifications = certificationsData as Certification[];
  const categories = categoriesData as Category[];

  // Default to Portal stage unless a view or search query is active
  const activeMode: 'portal' | 'majors' | 'arc' =
    viewParam === 'majors'
      ? 'majors'
      : viewParam === 'arc' || searchFromUrl || categoryFromUrl !== 'All'
      ? 'arc'
      : 'portal';

  const handleSelectView = useCallback(
    (nextView: 'majors' | 'arc') => {
      try {
        router.push(`/?view=${nextView}`);
      } catch (error) {
        console.error('Failed to switch spatial home view:', error);
      }
    },
    [router]
  );

  const handleClearUrlFilters = useCallback(() => {
    try {
      router.replace('/?view=arc');
    } catch (error) {
      console.error('Failed to clear URL filters on home page:', error);
    }
  }, [router]);

  return (
    <div className="flex-1 flex flex-col">
      {activeMode === 'portal' && (
        <PortalView
          categories={categories}
          certifications={certifications}
          onSelectView={handleSelectView}
        />
      )}

      {activeMode === 'majors' && (
        <MajorsGalleryView
          categories={categories}
          certifications={certifications}
        />
      )}

      {activeMode === 'arc' && (
        <CertificationsArcView
          certifications={certifications}
          categories={categories}
          initialCategory={categoryFromUrl}
          initialSearch={searchFromUrl}
          onClearUrlFilters={handleClearUrlFilters}
        />
      )}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            Loading Archive...
          </span>
        </div>
      }
    >
      <SpatialHomeContent />
    </Suspense>
  );
}
