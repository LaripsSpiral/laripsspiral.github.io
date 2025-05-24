import { projects } from '../data/projects';

type SortOption = 'name' | 'latest';

export const filterProjects = (searchQuery: string) => {
  return projects.filter(project => 
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.organize?.some(organize => organize.toLowerCase().includes(searchQuery.toLowerCase())) ||
    project.platform?.some(platform => platform.toLowerCase().includes(searchQuery.toLowerCase()))
  );
};

export const sortProjects = (projects: typeof import('../data/projects').projects, sortBy: SortOption) => {
  switch (sortBy) {
    case 'name':
      return [...projects].sort((a, b) => a.title.localeCompare(b.title));
    case 'latest':
      return projects; // Assuming projects are already in chronological order
    default:
      return projects;
  }
};
