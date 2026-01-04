const API_BASE = "http://127.0.0.1:8000/api/v1";

export async function analyzeField(geoJson) {
  const res = await fetch(`${API_BASE}/fields`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(geoJson),
  });

  if (!res.ok) {
    throw new Error("Failed to analyze field");
  }

  return res.json();
}
