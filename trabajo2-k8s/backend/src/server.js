import "dotenv/config";
import express from "express";
import cors from "cors";
import { initDb, insertItem, listItems } from "./db.js";

// Crear aplicación Express
const app = express();
app.use(cors()); // Middleware para cors
app.use(express.json()); 

const PORT = process.env.PORT || 3000; // Usar puerto 3000

// Healthcheck para Kubernetes
app.get("/health", (req, res) => {
  res.status(200).json({ ok: true });
});

// GET /items
app.get("/items", async (req, res) => {
  try {
    const items = await listItems();
    res.json(items);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "DB error" });
  }
});

// POST /items
app.post("/items", async (req, res) => {
  try {
    const value = (req.body?.value || "").trim();
    if (!value) return res.status(400).json({ error: "Se requiere ingresar un valor" });
    if (value.length > 200) return res.status(400).json({ error: "El valor ingresado es demasiado largo" });

    //  Ciclo for del 1 hasta el 1000, con la finalidad de que haga una suma y gaste algo de CPU
    let sum = 0;
    for (let i = 1; i <= 1000; i++) {
      for (let j = 1; j <= 1000; j++) {
        sum += (i * j) % 7;
      }
    }

    const created = await insertItem(value);
    res.status(201).json({ created, cpuSum: sum });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "DB error" }); // Manejo básico de errores
  }
});

async function start() {
  // Inicializa tabla al arrancar
  await initDb();

  app.listen(PORT, () => { // Inicia el servidor HTTP
    console.log(`Backend corriendo en puerto ${PORT}`);
  });
}

start().catch((e) => { // Manejo de error fatal durante el arranque
  console.error("Fatal:", e);
  process.exit(1);
});