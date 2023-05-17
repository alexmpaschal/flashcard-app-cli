import { deckExists, getDeckID } from "../../db.js";

export default async (db, argv) => {
  try {
    if (await deckExists(db, argv.name)) {
      const deckID = await getDeckID(db, argv.name);
      db.prepare("DELETE FROM cards WHERE deck_id = ?").bind(deckID).run();
      db.prepare("DELETE FROM decks WHERE name = (@name)").run(argv);
    } else {
      throw new Error("Deck does not exist");
    }
  } catch (e) {
    console.log(e.message);
    return "ERROR";
  }
};
