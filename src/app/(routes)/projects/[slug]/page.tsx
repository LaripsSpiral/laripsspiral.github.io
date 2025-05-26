import { Projects } from "@/app/data/projectDB";
import ProjectInspect from "@/app/components/ProjectInspect";

// Generate static params for all project slugs (for static export)
export function generateStaticParams() {
  return Projects.map((project) => ({
    slug: project.slug,
  }));
}

// Dynamic route page component
export default function ProjectPage({ params }: { params: { slug: string } }) {
  const { slug } = params; // No need to await
  const project = Projects.find((p) => p.slug === slug);

  if (!project) {
    return <div>Project not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Project: {project.title}</h1>
      <ProjectInspect {...project} />
    </div>
  );
}