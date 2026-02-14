'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { games } from '@/app/data/gamesDB';
import { Projects } from '@/app/data/projectDB';
import { createSlug } from '@/app/lib/project/slug';
import { GameDetailPage } from '@/app/components/GameDetailPage';
import { ProjectOverview } from '@/app/components/ProjectOverview';
import { PageLayout } from '@/app/components/PageLayout';
import ProjectInspect from '@/app/components/ProjectInspect';

function ProjectPageClientInner({ slug }: { slug: string }) {
  const searchParams = useSearchParams();
  const view = searchParams.get('view') || 'overview';

  const normalizedSlug = decodeURIComponent(slug).replace(/\/+$/, '');

  const game = games.find((g) => createSlug(g.title) === normalizedSlug);
  if (game) {
    if (view === 'all') {
      return <GameDetailPage game={game} />;
    }
    return (
      <PageLayout>
        <ProjectOverview game={game} />
      </PageLayout>
    );
  }

  const project = Projects.find((p) => p.slug === normalizedSlug);
  if (project) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Project: {project.title}</h1>
        <ProjectInspect {...project} />
      </div>
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

export function ProjectPageClient({ slug }: { slug: string }) {
  return (
    <Suspense fallback={null}>
      <ProjectPageClientInner slug={slug} />
    </Suspense>
  );
}
