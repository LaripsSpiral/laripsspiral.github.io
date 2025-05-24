import { ProjectInterface } from './Interface';

const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
  return 'http://localhost:3000';
};

export const getProjects = async (): Promise<ProjectInterface[]> => {
  try {
    const res = await fetch(`${getBaseUrl()}/api/projects`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return [];
  }
};

export const filterProjects = async (searchQuery: string): Promise<ProjectInterface[]> => {
  const projects = await getProjects();
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
