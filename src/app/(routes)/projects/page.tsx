'use client';

import { Suspense } from 'react';
import { PageLayout } from '@/app/components/PageLayout';
import { ProjectsTab } from '@/app/components/ProjectsTab';
import { games } from '@/app/data/gamesDB';

function ProjectsTabFallback() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-gray-400">Loading projects...</div>
    </div>
  );
}

export default function Projects() {
  return (
    <PageLayout>
      <Suspense fallback={<ProjectsTabFallback />}>
        <ProjectsTab games={games} />
      </Suspense>
    </PageLayout>
  );
}