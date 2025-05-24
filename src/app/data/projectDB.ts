import Database from 'better-sqlite3';
import type { Database as SQLiteDatabase } from 'better-sqlite3';
import path from 'path';

let db: SQLiteDatabase | null = null;

export function getDb() {
  if (!db) {
    const dbPath = path.join(process.cwd(), 'src', 'app', 'data');
    db = new Database(path.join(dbPath, 'app.sqlite3'));
    
    db.exec(`
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        image TEXT,
        organize TEXT,
        platform TEXT,
        link TEXT,
        date TEXT
      )
    `);
  }
  return db;
};
