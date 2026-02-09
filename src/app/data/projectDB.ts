import { ProjectInterface } from "@/app/lib/project/Interface";

const projects: ProjectInterface[] = [];

export const Projects: ProjectInterface[] = projects.map((p) => ({
  ...p,
  slug: createSlug(p.title),
}));

function createSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumerics with -
    .replace(/^-+|-+$/g, '');     // Trim starting/ending dashes
}
