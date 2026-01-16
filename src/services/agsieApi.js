const API_BASE = "http://localhost:8000/api/v1";

/* =========================
   CREATE / ANALYZE FIELD
========================= */
export async function analyzeField(geojson) {
  const res = await fetch(`${API_BASE}/fields`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(geojson),
  });

  if (!res.ok) {
    throw new Error("Failed to analyze field");
  }

  return res.json();
}

/* =========================
   FETCH ALL FIELDS
========================= */
export async function fetchFields() {
  const res = await fetch(`${API_BASE}/fields`);

  if (!res.ok) {
    throw new Error("Failed to fetch fields");
  }

  return res.json();
}

/* =========================
   DELETE FIELD (NEW – 4.3.5)
========================= */
export async function deleteField(fieldId) {
  const res = await fetch(`${API_BASE}/fields/${fieldId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete field");
  }

  return res.json();
}


