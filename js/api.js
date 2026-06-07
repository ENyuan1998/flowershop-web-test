async function apiGet(action, params = {}) {
  const url = new URL(window.CONFIG.API_BASE);
  url.searchParams.set('action', action);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) url.searchParams.set(k, v);
  });

  const res = await fetch(url.toString(), { method: 'GET' });
  if (!res.ok) throw new Error('GET 失敗：' + res.status);
  const data = await res.json();
  if (!data.ok) throw new Error(data.message + (data.detail ? ` | ${data.detail}` : ''));
  return data.data;
}

async function apiPost(action, payload = {}) {
  const res = await fetch(window.CONFIG.API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, payload })
  });

  if (!res.ok) throw new Error('POST 失敗：' + res.status);
  const data = await res.json();
  if (!data.ok) throw new Error(data.message + (data.detail ? ` | ${data.detail}` : ''));
  return data.data;
}
