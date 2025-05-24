"use client";

import { useParams, useRouter } from "next/navigation";
import { projects } from "@/app/data/projects";
import ProjectInspect from "@/app/components/ProjectInspect";
import { notFound } from "next/navigation";

export default function ProjectPage() {
  const { id } = useParams();
  const router = useRouter();
  
  console.log('Raw ID:', id); // Debug log
  const decodedTitle = decodeURIComponent(String(id));
  console.log('Decoded title:', decodedTitle); // Debug log
  
  const project = projects.find((p) => {
    console.log('Comparing:', p.title, '===', decodedTitle); // Debug log
    return p.title === decodedTitle;
  });

  if (!project) {
    console.log("Available projects:", projects.map((p) => p.title)); // Debug log
    return notFound();
  }

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
