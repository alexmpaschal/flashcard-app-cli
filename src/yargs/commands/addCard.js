import { deckExists, getDeckID } from "../../db.js";
import inquirer from "inquirer";

export default async (db, argv) => {
  try {
    if (await deckExists(db, argv.name)) {
      const deckID = await getDeckID(db, argv.name);

      inquirer.prompt([
        {
          name: "front",
          message: "Front:",
          type: "input",
        },
        {
          name: "back",
          message: "Back:",
          type: "input",
        }
      ]).then(async function(answer) {
        await db.prepare("INSERT INTO cards (deck_id, front, back) VALUES (?, ?, ?)").bind(deckID, answer.front, answer.back).run();
      });
    } else {
      throw new Error("Deck does not exist");
    }
  } catch (e) {
    console.log(e.message);
    return "ERROR";
  }
};
