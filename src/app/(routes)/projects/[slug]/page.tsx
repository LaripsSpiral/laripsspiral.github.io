import { Projects } from "@/app/data/projectDB";
import { games } from "@/app/data/gamesDB";
import { createSlug } from "@/app/lib/project/slug";
import ProjectInspect from "@/app/components/ProjectInspect";
import { GameDetailPage } from "@/app/components/GameDetailPage";

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
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // First check if it's a Game
  const game = games.find((g) => createSlug(g.title) === slug);
  if (game) {
    return <GameDetailPage game={game} />;
  }
  
  // Then check if it's a Project
  const project = Projects.find((p) => p.slug === slug);
  if (project) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Project: {project.title}</h1>
        <ProjectInspect {...project} />
      </div>
    );
  }

  return <div>Project not found.</div>;
}