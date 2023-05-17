export const initializeDB = async (db) => {
  const createDecks = `
    CREATE TABLE IF NOT EXISTS decks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      UNIQUE (name)
    );
    `;
    
  const createCards = `
    CREATE TABLE IF NOT EXISTS cards (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      deck_id INTEGER NOT NULL,
      front TEXT NOT NULL,
      back TEXT NOT NULL,
      FOREIGN KEY(deck_id) REFERENCES decks(id),
      UNIQUE (deck_id, front)
    );
    `;

  db.exec(createDecks, createCards);
}

export const listCardIDs = async (db) => {
  let cardIDs = [];
  const stmt = db.prepare(`SELECT id FROM cards`);

  for (const cardID of stmt.iterate()) {
    cardIDs.push(cardID.id);
  }

  return cardIDs;
}

export const listDecks = async (db) => {
  let decks = [];
  const stmt = db.prepare(`SELECT * FROM decks`);

  for (const deck of stmt.iterate()) {
    decks.push({ id: deck.id, name: deck.name });
  }

  return decks;
}

export const deckExists = async (db, deckName) => {
  const decks = await listDecks(db);

  for (let i = 0; i < decks.length; i++) {
    if (decks[i].name === deckName) {
      return true;
    }
  }

  return false;
}

export const getDeckID = async (db, deckName) => {
  return db.prepare("SELECT id FROM decks WHERE name = ?").bind(deckName).get().id;
}
