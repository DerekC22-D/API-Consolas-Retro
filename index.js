const express = require("express");
const app = express();
const puerto = 3000;
const db = require("./db"); // Importar la base de datos
const cors = require("cors");
app.use(express.json()); // Middleware para parsear JSON
app.use(cors()); // Middleware para permitir solicitudes desde cualquier origen



app.get("/consolas", function(req, res) { // Ruta para obtener todas las consolas
  const consolas = db.prepare("SELECT * FROM consolas").all(); // Obtener todas las consolas de la base de datos
  res.json(consolas);
});

app.get("/consolas/:id", function(req, res) { // Ruta para obtener una consola por ID
  const consola = db.prepare("SELECT * FROM consolas WHERE id = ?").get(req.params.id); // Buscar la consola por ID
  if (consola) {
    res.json(consola);
  } 
  else {
    res.status(404).json("consola no encontrada");
  }
});

app.post("/consolas", function(req, res) { // Ruta para agregar una nueva consola
  const { nombre, año, fabricante, tipo, imagen } = req.body;

  const result = db.prepare(
    "INSERT INTO consolas (nombre, año, fabricante, tipo, imagen) VALUES (?, ?, ?, ?, ?)").run(nombre, año, fabricante, tipo, imagen);
  
  const resultado = db.prepare("SELECT * FROM consolas WHERE id = ?").get(result.lastInsertRowid); // Obtener la consola recién insertada
  
  res.status(201).json(resultado);
});

app.put("/consolas/:id", function(req, res) {
  const { nombre, año, fabricante, tipo, imagen } = req.body; // Ruta para actualizar una consola existente

  const resultado = db.prepare(
    "UPDATE consolas SET nombre = ?, año = ?, fabricante = ?, tipo = ?, imagen = ? WHERE id = ?"
  ).run(nombre, año, fabricante, tipo, imagen, req.params.id);

  if (resultado.changes === 0) {
    res.status(404).json("consola no encontrada");
  } else {
    const consolaActualizada = db.prepare("SELECT * FROM consolas WHERE id = ?").get(req.params.id);
    res.json(consolaActualizada);
  }
});

app.delete("/consolas/:id", function(req, res) { // Ruta para eliminar una consola existente
  const resultado = db.prepare("DELETE FROM consolas WHERE id = ?").run(req.params.id);
  if (resultado.changes === 0) {
    res.status(404).json("consola no encontrada");
  } else {
    res.json({ message: "consola eliminada" });
  }
});

app.get("/", function(req, res) { // Ruta raíz para verificar que el servidor está funcionando
  res.send("Bienvenido a la API de Consolas Retro");
});

app.use(function(req, res, next) { // Middleware para manejar rutas no encontradas
  res.status(404).json("Ruta no encontrada");
});

app.use(function(err, req, res, next) { // Middleware para manejar errores
  console.error(err.stack);
  res.status(500).json("Error interno del servidor");
});


app.listen(puerto, function() {
  console.log(`Servidor corriendo en http://localhost:${puerto}`);
});