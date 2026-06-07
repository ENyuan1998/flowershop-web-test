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

    if (!res.ok) {
      throw new Error(`GET HTTP ${res.status} | ${data.message || ''} | ${data.detail || text}`);
    }
    if (!data.ok) {
      throw new Error(`GET API錯誤 | ${data.message || ''} | ${data.detail || ''}`);
    }
    return data.data;
  } catch (err) {
    console.error('[apiGet] action=', action, 'err=', err);
    throw err;
  }
}

async function apiPost(action, payload = {}) {
  try {
    const res = await fetch(window.CONFIG.API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, payload })
    });

    const text = await res.text();

    let data;
    try { data = JSON.parse(text); } catch (_) { data = { ok: false, message: '非 JSON 回應', detail: text }; }

    if (!res.ok) {
      throw new Error(`POST HTTP ${res.status} | ${data.message || ''} | ${data.detail || text}`);
    }
    if (!data.ok) {
      throw new Error(`POST API錯誤 | ${data.message || ''} | ${data.detail || ''}`);
    }
    return data.data;
  } catch (err) {
    console.error('[apiPost] action=', action, 'payload=', payload, 'err=', err);
    throw err;
  }
}
