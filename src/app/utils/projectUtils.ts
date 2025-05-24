export interface Project {
  title: string;
  description: string;
  image: string;
  organize?: string[];
  platform?: string[];
  link: string;  // renamed from url to match data structure
  date: string;
}

type SortOption = 'name' | 'latest';

export const getProjects = async (): Promise<Project[]> => {
  try {
    const res = await fetch('/api/projects');
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return [];
  }
};

export const filterProjects = async (searchQuery: string): Promise<Project[]> => {
  const projects = await getProjects();
  const query = searchQuery.toLowerCase();
  
  return (projects || []).filter(project => 
    project.title.toLowerCase().includes(query) ||
    project.description.toLowerCase().includes(query) ||
    project.organize?.some(org => org.toLowerCase().includes(query)) ||
    project.platform?.some(plat => plat.toLowerCase().includes(query))
  );
};

export const sortProjects = (projects: Project[]): Project[] => {
  if (!Array.isArray(projects)) return [];
  return [...projects];
};
