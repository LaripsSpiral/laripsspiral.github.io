import { games } from "@/app/data/gamesDB";
import { createSlug } from "@/app/lib/project/slug";
import { ProjectRouteClient } from "@/app/components/project/ProjectRouteClient";

// Generate static params for all project slugs (for static export)
export function generateStaticParams() {
  return games.map((game) => ({
    slug: createSlug(game.title),
  }));
}

// Dynamic route page component
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <ProjectRouteClient slug={slug} />;
}