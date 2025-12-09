'use client';

import { PageLayout } from '@/app/components/PageLayout';
import { HomeTab } from '@/app/components/HomeTab';
import { games } from '@/app/data/gamesDB';

export default function Home() {
  return (
    <PageLayout>
      <HomeTab games={games} />
    </PageLayout>
  );
}