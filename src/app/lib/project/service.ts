import { ProjectInterface } from './Interface';
import { getDb } from '@/app/data/projectDB';

export const getProjects = async (): Promise<ProjectInterface[]> => {
  // For server-side static generation
  if (typeof window === 'undefined') {
    try {
      const db = getDb();
      const projects = db.prepare('SELECT * FROM projects').all();
      return projects.map(project => ({
        ...project,
        organize: JSON.parse(project.organize || '[]'),
        platform: JSON.parse(project.platform || '[]')
      }));
    } catch (error) {
      console.error('Database error:', error);
      return [];
    }
  }
  
  // For client-side fetching
  try {
    const res = await fetch('/api/projects');
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
  } catch (error) {
    console.error('API error:', error);
    return [];
  }
};
