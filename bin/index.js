#! /usr/bin/env node

import Database from "better-sqlite3";
const db = new Database("flashcard-app-cli.db");
db.pragma("journal_mode = WAL");

import { initializeDB } from "../src/db.js";
initializeDB(db);

import y from "../src/yargs/yargs.js";
y.parse(process.argv.slice(2));
