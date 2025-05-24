'use client';

import { useParams } from "next/navigation";
import { Projects } from "@/app/data/projectDB";
import ProjectInspect from "@/app/components/ProjectInspect";

export default function ProjectView() {
  const { id } = useParams();

  const inspectingProject = Projects.find(p => p.title === decodeURIComponent(String(id)));
  if (!inspectingProject) return null;

  return (
    <div className="min-h-screen p-8">
      <ProjectInspect {...inspectingProject} />
    </div>
  );
}