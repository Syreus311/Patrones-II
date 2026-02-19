import React, { useEffect, useState } from "react";

const API_BASE = ""; // Vacío porque se usan rutas relativas

export default function App() {
  const [value, setValue] = useState(""); // Valor actual del input
  const [items, setItems] = useState([]); // Lista de elementos obtenidos
  const [loading, setLoading] = useState(false); // Estado para mostrar indicador de carga
  const [err, setErr] = useState(""); // Errores

  async function loadItems() { // Función para cargar los items
    setErr("");
    const res = await fetch(`${API_BASE}/items`);
    if (!res.ok) throw new Error("Error cargando items");
    const data = await res.json();
    setItems(data);
  }

  useEffect(() => { // Cargar los datos iniciales
    loadItems().catch((e) => setErr(e.message));
  }, []);

  async function handleAdd() { // Función para agregar nuevo item
    setLoading(true);
    setErr("");
    try {
      const res = await fetch(`${API_BASE}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value }),
      });
      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        throw new Error(e.error || "Error creando item");
      }
      setValue("");
      await loadItems();
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  return ( // HTML
    <div style={{ fontFamily: "system-ui", maxWidth: 700, margin: "40px auto", padding: 16 }}>
      <h2>Trabajo II - App</h2>

      {/* Label + Input + Button */}
      <label style={{ display: "block", marginBottom: 8 }}>
        Ingresa un valor:
      </label>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ej: hola"
          style={{ flex: 1, padding: 10 }}
        />
        <button onClick={handleAdd} disabled={loading || !value.trim()} style={{ padding: "10px 16px" }}>
          {loading ? "Guardando..." : "Agregar"}
        </button>
      </div>

      {err && <p style={{ color: "crimson" }}>{err}</p>}

      <h3 style={{ marginTop: 24 }}>Lista</h3>
      <ul>
        {items.map((it) => (
          <li key={it.id}>
            <b>{it.value}</b> <small>({new Date(it.created_at).toLocaleString()})</small>
          </li>
        ))}
      </ul>
    </div>
  );
}