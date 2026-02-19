import pkg from "pg"; // Importar pg para conectar a PostgreSQL
const { Pool } = pkg;

// En Kubernetes estas variables vienen desde ConfigMap y Secret.
const pool = new Pool({
  host: process.env.DB_HOST, // Host de PostgreSQL
  port: Number(process.env.DB_PORT || 5432), // Puerto por defecto 5432
  database: process.env.DB_NAME, // Nombre de la base de datos
  user: process.env.DB_USER, 
  password: process.env.DB_PASSWORD,
});

// Inicializar la base de datos
export async function initDb() { 
  await pool.query(`
    CREATE TABLE IF NOT EXISTS items (
      id SERIAL PRIMARY KEY,
      value TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
}

// Insertar un registro en la tabla
export async function insertItem(value) {
  const res = await pool.query(
    "INSERT INTO items(value) VALUES($1) RETURNING id, value, created_at;",
    [value]
  );
  return res.rows[0]; // Devuelve el registro creado
}

// Obtiene los registros creados
export async function listItems() {
  const res = await pool.query(
    "SELECT id, value, created_at FROM items ORDER BY id DESC;"
  );
  return res.rows; // Devuelve lista
}