'use client';

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { getProjects } from "@/app/lib/project/Queuery";
import { ProjectInterface } from "@/app/lib/project/Interface";
import ProjectInspect from "./ProjectInspect";

export default function ProjectView() {
  const { id } = useParams();
  const [project, setProject] = useState<ProjectInterface | null>(null);

  useEffect(() => {
    const loadProject = async () => {
      const projects = await getProjects();
      const found = projects.find(p => p.title === decodeURIComponent(String(id)));
      if (!found) return notFound();
      setProject(found);
    };
    loadProject();
  }, [id]);

  if (!project) return null;

  return (
    <div className="min-h-screen p-8">
      <ProjectInspect project={project} />
    </div>
  );
}
