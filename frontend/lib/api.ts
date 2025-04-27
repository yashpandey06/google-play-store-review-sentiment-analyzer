const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function analyzeApp(appName: string) {
  const url = `${BASE_URL}/analyze`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ appName }),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || res.statusText);
  }
  return res.json();
}

export async function searchApps(query: string) {
  const url = `${BASE_URL}/search-apps/${encodeURIComponent(query)}`;
  const res = await fetch(url);
  if (!res.ok) return [];
  return res.json();
}
