const Database = require("better-sqlite3");
const db = new Database("consolas.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS consolas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    año INTEGER,
    fabricante TEXT,
    tipo TEXT,
    imagen TEXT
  )
`);

module.exports = db;