import { Projects } from "@/app/data/projectDB";

// Generate static params for dynamic routes
export async function generateStaticParams() {
  const ids = Projects.map(project => encodeURIComponent(project.title));
  return ids.map(id => ({ id }));
}