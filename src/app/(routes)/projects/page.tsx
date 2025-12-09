'use client';

import { PageLayout } from '@/app/components/PageLayout';
import { ProjectsTab } from '@/app/components/ProjectsTab';
import { games } from '@/app/data/gamesDB';

export default function Projects() {
  return (
    <PageLayout>
      <ProjectsTab games={games} />
    </PageLayout>
  );
}