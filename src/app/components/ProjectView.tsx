'use client';

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { Projects } from "@/app/data/projectDB";
import { ProjectInterface } from "@/app/lib/project/Interface";
import ProjectInspect from "./ProjectInspect";

export default function ProjectView() {
  const { id } = useParams();
  const [project, setProject] = useState<ProjectInterface | null>(null);

  useEffect(() => {
    const loadProject = async () => {
      const found = Projects.find(p => p.title === decodeURIComponent(String(id)));
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
