import { deckExists } from "../../db.js";

export default async (db, argv) => {
  try {
    if (await deckExists(db, argv.name)) {
      throw new Error("Deck name already in use");
    } else {
      db.prepare("INSERT INTO decks (name) VALUES (@name)").run(argv);
    }
  } catch (e) {
    console.log(e.message);
    return "ERROR";
  }
};
