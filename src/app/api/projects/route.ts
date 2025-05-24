import { NextResponse } from 'next/server';
import { getDb } from '@/app/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    
    const db = getDb();
    const projects = db.prepare('SELECT * FROM projects').all() as Record<string, any>[];
    
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
