import Database from 'better-sqlite3';

let db: Database.Database | null = null;

export function getDb() {
  if (!db) {
    db = new Database('./src/app/data/app.sqlite3');
    initializeDb(db);
  }
  return db;
}

function initializeDb(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      image TEXT,
      organize TEXT,
      platform TEXT,
      link TEXT,
      github TEXT,
      demo TEXT,
      date TEXT
    )
  `);
}
