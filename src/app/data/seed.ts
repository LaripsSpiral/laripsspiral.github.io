import { getDb } from '../lib/db';
import { projects } from './projects';

export function seedDatabase() {
  const db = getDb();
  const insert = db.prepare(`
    INSERT OR REPLACE INTO projects 
    (title, description, image, organize, platform, link, date)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  db.transaction(() => {
    for (const project of projects) {
      insert.run(
        project.title,
        project.description,
        project.image,
        JSON.stringify(project.organize || []),
        JSON.stringify(project.platform || []),
        project.link || null,
        project.date
      );
    }
  })();

  console.log('Database seeded successfully');
}

// Run if called directly
if (require.main === module) {
  seedDatabase();
}
