"use client";

import { useParams, useRouter } from "next/navigation";

import { ProjectInterface } from "@/app/lib/project/Interface";
import { getProjects } from "@/app/lib/project/Queuery";
import ProjectInspect from "@/app/components/ProjectInspect";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";

export default function ProjectPage() {
  const { id } = useParams();
  const router = useRouter();
  const [project, setProject] = useState<ProjectInterface | null>(null);

  useEffect(() => {
    const loadProject = async () => {
      const projects = await getProjects();
      const found = projects.find(
        (p) => p.title === decodeURIComponent(String(id))
      );
      if (!found) return notFound();
      setProject(found);
    };
    loadProject();
  }, [id]);

  if (!project) return null; // or a loading spinner, etc.

  return (
    <div className="min-h-screen p-8">
      <button
        onClick={() => router.back()}
        className="mb-8 px-4 py-2 text-sm hover:bg-white/10 rounded-lg transition-colors"
      >
        ← Back to Projects
      </button>
      <ProjectInspect project={project} />
    </div>
  );
}
