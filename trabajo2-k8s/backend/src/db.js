import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

export async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS items (
      id SERIAL PRIMARY KEY,
      value TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
}

export async function insertItem(value) {
  const res = await pool.query(
    "INSERT INTO items(value) VALUES($1) RETURNING id, value, created_at;",
    [value]
  );
  return res.rows[0];
}

export async function listItems() {
  const res = await pool.query(
    "SELECT id, value, created_at FROM items ORDER BY id DESC;"
  );
  return res.rows;
}
