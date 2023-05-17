import { listDecks } from "../../db.js";

export default async (db) => {
  const decks = await listDecks(db);

  for (let i = 0; i < decks.length; i++) {
    console.log(`${i+1}: ${decks[i].name}`);
  }
};
