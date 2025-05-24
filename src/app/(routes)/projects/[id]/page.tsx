'use client';

import { useParams } from "next/navigation";
import { Projects } from "@/app/data/projectDB";
import ProjectInspect from "@/app/components/ProjectInspect";

export default function ProjectView() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  if (!id) return <div>Project ID not found in URL.</div>;

  const decodedId = decodeURIComponent(id);
  const inspectingProject = Projects.find(p => p.title === decodedId);

  if (!inspectingProject) return <div>Project not found.</div>;

  return (
    <div className="min-h-screen p-8">
      <ProjectInspect {...inspectingProject} />
    </div>
  );
}
