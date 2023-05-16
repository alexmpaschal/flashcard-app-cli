const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./flashcard-app-cli.db');

db.serialize(() => {
  db.run(`
  CREATE TABLE IF NOT EXISTS cards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    deck_id INTEGER NOT NULL,
    front TEXT NOT NULL,
    back TEXT NOT NULL,
    FOREIGN KEY(deck_id) REFERENCES decks(id),
    UNIQUE (deck_id, front)
  );
  `)

  db.run(`
  CREATE TABLE IF NOT EXISTS decks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  );
  `)
})
