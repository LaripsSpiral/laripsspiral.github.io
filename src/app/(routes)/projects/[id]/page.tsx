'use client';

import { useParams } from 'next/navigation';
import { projects } from '@/app/data/projects';
import ProjectInspect from '@/app/components/ProjectInspect';
import { notFound } from 'next/navigation';

export default function ProjectPage() {
  const { id } = useParams();
  const project = projects.find(p => p.title === decodeURIComponent(id as string));

  if (!project) {
    notFound();
  }

  return <ProjectInspect project={project} />;
}
