import { deckExists, getDeckID } from "../../db.js";

export default async (db, argv) => {
  try {
    if (await deckExists(db, argv.name)) {
      const deckID = await getDeckID(db, argv.name);
      const cards = db.prepare("SELECT id, front, back FROM cards WHERE deck_id = ?").bind(deckID).all();
      cards.forEach((card, i) => {
        console.log(`${i+1}) id: ${card.id}, front: "${card.front}", back: "${card.back}"`);
      });
    } else {
      throw new Error("Deck does not exist");
    }
  } catch (e) {
    console.log(e.message);
    return "ERROR";
  }
};
