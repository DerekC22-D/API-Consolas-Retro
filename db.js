
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

const cantidad = db.prepare("SELECT COUNT(*) as total FROM consolas").get();

if (cantidad.total === 0) {
  const insertar = db.prepare(
    "INSERT INTO consolas (nombre, año, fabricante, tipo, imagen) VALUES (?, ?, ?, ?, ?)"
  );

  insertar.run("Nintendo DS", 2004, "Nintendo", "Portátil", "img/nintendo_ds.jpg");
  insertar.run("PlayStation 2", 2000, "Sony", "Sobremesa", "img/playstation_2.jpg");
  insertar.run("PSP", 2004, "Sony", "Portátil", "img/psp.jpg");
  insertar.run("Xbox 360", 2005, "Microsoft", "Sobremesa", "img/xbox_360.jpg");
  insertar.run("GameCube", 2001, "Nintendo", "Sobremesa", "img/gamecube.jpg");
}
const Database = require("better-sqlite3");
const db = new Database("consolas.db");