import { Projects } from "@/app/data/projectDB";
import { games } from "@/app/data/gamesDB";
import { createSlug } from "@/app/lib/project/slug";
import { ProjectPageClient } from "@/app/components/ProjectPageClient";

// Generate static params for all project slugs (for static export)
export function generateStaticParams() {
  const projectSlugs = Projects.map((project) => ({
    slug: project.slug!,
  }));

  const gameSlugs = games.map((game) => ({
    slug: createSlug(game.title),
  }));

  return [...projectSlugs, ...gameSlugs];
}

// Dynamic route page component
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <ProjectPageClient slug={slug} />;
}