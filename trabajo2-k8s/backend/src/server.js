import express from "express";
import cors from "cors";
import { initDb, insertItem, listItems } from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Healthcheck simple para Kubernetes
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
    if (!value) return res.status(400).json({ error: "value is required" });
    if (value.length > 200) return res.status(400).json({ error: "value too long" });

    // CPU burn obligatorio: doble for 1..1000
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
    res.status(500).json({ error: "DB error" });
  }
});

async function start() {
  // Inicializa tabla al arrancar
  await initDb();

  app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
  });
}

start().catch((e) => {
  console.error("Fatal:", e);
  process.exit(1);
});
