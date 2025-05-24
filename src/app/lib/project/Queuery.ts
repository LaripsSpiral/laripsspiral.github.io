import { ProjectInterface } from './Interface';
import { Projects } from '@/app/data/projectDB'

export const filterProjects = async (searchQuery: string): Promise<ProjectInterface[]> => {
  const projects = Projects;
  const query = searchQuery.toLowerCase();
  
  return (projects || []).filter(project => 
    project.title.toLowerCase().includes(query) ||
    project.description.toLowerCase().includes(query) ||
    project.organize?.some(org => org.toLowerCase().includes(query)) ||
    project.platform?.some(plat => plat.toLowerCase().includes(query))
  );
};

export const sortProjects = (projects: ProjectInterface[]): ProjectInterface[] => {
  if (!Array.isArray(projects)) return [];
  return [...projects];
};
