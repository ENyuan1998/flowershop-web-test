async function apiGet(action, params = {}) {
  try {
    const url = new URL(window.CONFIG.API_BASE);
    url.searchParams.set('action', action);
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null) url.searchParams.set(k, v);
    });

    const res = await fetch(url.toString(), { method: 'GET' });
    const text = await res.text();

    let data;
    try { data = JSON.parse(text); } catch (_) { data = { ok: false, message: '非 JSON 回應', detail: text }; }

    if (!res.ok) throw new Error(`GET HTTP ${res.status} | ${data.message || ''} | ${data.detail || text}`);
    if (!data.ok) throw new Error(`GET API錯誤 | ${data.message || ''} | ${data.detail || ''}`);
    return data.data;
  } catch (err) {
    console.error('[apiGet]', action, err);
    throw err;
  }
}

async function apiPost(action, payload = {}) {
  try {
    // 關鍵：用 text/plain 避免 CORS preflight
    const bodyText = JSON.stringify({ action, payload });

    const res = await fetch(window.CONFIG.API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: bodyText
    });

    const text = await res.text();

    let data;
    try { data = JSON.parse(text); } catch (_) { data = { ok: false, message: '非 JSON 回應', detail: text }; }

    if (!res.ok) throw new Error(`POST HTTP ${res.status} | ${data.message || ''} | ${data.detail || text}`);
    if (!data.ok) throw new Error(`POST API錯誤 | ${data.message || ''} | ${data.detail || ''}`);
    return data.data;
  } catch (err) {
    console.error('[apiPost]', action, payload, err);
    throw err;
  }
}
