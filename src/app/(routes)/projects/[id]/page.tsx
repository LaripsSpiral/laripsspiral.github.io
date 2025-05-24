import ProjectView from "@/app/components/ProjectView";
import { getProjectsFromDb } from "@/app/lib/project/service";

export async function generateStaticParams() {
  const projects = getProjectsFromDb();
  return projects.map((project) => ({
    id: encodeURIComponent(project.title),
  }));
}

export default function ProjectPage() {
  return <ProjectView />;
}
