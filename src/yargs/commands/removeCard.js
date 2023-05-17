import { listCardIDs } from "../../db.js";

export default async (db, argv) => {
  try {
    const cardIDs = await listCardIDs(db);
    if (cardIDs.includes(argv.id)) {
      db.prepare("DELETE FROM cards WHERE id = (@id)").run(argv);
    } else {
      throw new Error("Card does not exist");
    }
  } catch (e) {
    console.log(e.message);
    return "ERROR";
  }
};
