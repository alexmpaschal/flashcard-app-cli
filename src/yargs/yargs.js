import addCard from "./commands/addCard.js";
import addDeck from "./commands/addDeck.js";
import listDeck from "./commands/listDeck.js";
import listDecks from "./commands/listDecks.js";
import removeDeck from "./commands/removeDeck.js";
import removeCard from "./commands/removeCard.js";

import Database from "better-sqlite3";
const db = new Database("flashcard-app-cli.db");
db.pragma("journal_mode = WAL");

import yargs from "yargs";
const y = yargs()
y.scriptName("flashcards");
y.usage("$0 [cmd] <args>");
y.version("1.0.0");

y.command({
  command: ["add-deck", "ad"],
  describe: "Create a new deck",
  builder: {
    name: {
      type: "string",
      demandOption: true,
      describe: "Deck name",
      alias: "n",
    }
  },
  handler: (argv) => {
    addDeck(db, argv);
  },
})
.help();

y.command({
  command: ["add-card", "ac"],
  describe: "Add a card to a deck",
  builder: {
    name: {
      type: "string",
      demandOption: true,
      describe: "Deck name",
      alias: "n",
    }
  },
  handler: (argv) => {
    addCard(db, argv);
  },
})
.help();

y.command({
  command: ["rm-deck", "rmd"],
  describe: "Remove an existing deck",
  builder: {
    name: {
      type: "string",
      demandOption: true,
      describe: "Deck name",
      alias: "n",
    }
  },
  handler: (argv) => {
    removeDeck(db, argv);
  },
})
.help();

y.command({
  command: ["rm-card", "rmc"],
  describe: "Remove a card from a deck",
  builder: {
    id: {
      type: "integer",
      demandOption: true,
      describe: "Card ID",
      alias: "i",
    }
  },
  handler: (argv) => {
    removeCard(db, argv);
  }
})

y.command({
  command: "ls",
  describe: "List decks",
  handler: () => {
    listDecks(db);
  },
})

y.command({
  command: ["ls-deck", "lsd"],
  describe: "List contents of a deck",
  builder: {
    name: {
      type: "string",
      demandOption: true,
      describe: "Deck name",
      alias: "n",
    }
  },
  handler: (argv) => {
    listDeck(db, argv);
  },
})

y.help();

export default y;
