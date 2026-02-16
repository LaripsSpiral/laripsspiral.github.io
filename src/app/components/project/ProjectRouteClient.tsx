'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { games } from '@/app/data/gamesDB';
import { createSlug } from '@/app/lib/project/slug';
import { ProjectDetailPage } from '@/app/components/project/ProjectDetailPage';
import { ProjectSummary } from '@/app/components/project/ProjectSummary';
import { PageLayout } from '@/app/components/layout/PageLayout';

function ProjectRouteClientInner({ slug }: { slug: string }) {
  const searchParams = useSearchParams();
  const view = searchParams.get('view') || 'overview';

  const normalizedSlug = decodeURIComponent(slug).replace(/\/+$/, '');

  const game = games.find((g) => createSlug(g.title) === normalizedSlug);
  if (game) {
    if (view === 'all') {
      return <ProjectDetailPage game={game} />;
    }
    return (
      <PageLayout>
        <ProjectSummary game={game} />
      </PageLayout>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="text-xl font-bold mb-2">Project not found.</div>
      <div className="text-sm text-gray-400 mb-4">Slug: {normalizedSlug}</div>
      <div className="text-sm text-gray-400">Available games:</div>
      <ul className="text-sm text-gray-400 list-disc pl-5">
        {games.map((g) => (
          <li key={g.title}>
            {createSlug(g.title)} — {g.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ProjectRouteClient({ slug }: { slug: string }) {
  return (
    <Suspense fallback={null}>
      <ProjectRouteClientInner slug={slug} />
    </Suspense>
  );
}
