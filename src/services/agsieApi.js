const API_BASE = "http://localhost:8000/api/v1";

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

export async function fetchFields() {
  const res = await fetch(`${API_BASE}/fields`);
  if (!res.ok) {
    throw new Error("Failed to fetch fields");
  }
  return res.json();
}

