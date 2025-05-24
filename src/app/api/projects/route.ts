import { NextResponse } from 'next/server';
import { getDb } from '@/app/data/projectDB';

interface ProjectRecord {
  organize: string;
  platform: string;
  image?: string;
  [key: string]: unknown;
}

export async function GET() {
  try {
    const db = getDb();
    const projects = db.prepare('SELECT * FROM projects').all() as ProjectRecord[];
    
    const mappedProjects = projects.map(project => ({
      ...project,
      organize: (project.organize as string).split(','),
      platform: (project.platform as string).split(','),
      image: project.image || '/default_image.svg', // Fallback image
    }));

    return NextResponse.json(mappedProjects);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}
