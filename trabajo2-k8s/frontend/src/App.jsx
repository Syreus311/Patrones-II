import React, { useEffect, useState } from "react";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export default function App() {
  const [value, setValue] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function loadItems() {
    setErr("");
    const res = await fetch(`${API_BASE}/items`);
    if (!res.ok) throw new Error("Error cargando items");
    const data = await res.json();
    setItems(data);
  }

  useEffect(() => {
  setItems([{ id: 1, value: "demo", created_at: new Date().toISOString() }]);
}, []);


  async function handleAdd() {
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

  return (
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
