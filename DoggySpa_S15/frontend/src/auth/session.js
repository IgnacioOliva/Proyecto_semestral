// Laboratorio: sessionStorage conserva la sesión al recargar la pestaña.
// NO ofrece protección frente a XSS. En producción evaluar cookies HttpOnly.
const SESSION_KEY = 'doggyspa.session.s15';

function storageDefault() {
  try { return typeof window !== 'undefined' ? window.sessionStorage : null; }
  catch { return null; }
}

export function decodePayload(token) {
  try {
    if (typeof token !== 'string') return null;
    const part = token.split('.')[1];
    if (!part) return null;
    const b64 = part.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(b64.padEnd(Math.ceil(b64.length / 4) * 4, '=')));
  } catch { return null; }
}

export function isExpired(token, nowMs = Date.now()) {
  const payload = decodePayload(token);
  return !payload || !Number.isFinite(payload.exp) || payload.exp * 1000 <= nowMs;
}

export function saveSession(session, storage = storageDefault()) {
  if (!storage || !session?.token || isExpired(session.token)) return false;
  const payload = decodePayload(session.token);
  const safe = {
    token: session.token,
    username: String(session.username ?? payload.sub ?? ''),
    role: String(session.role ?? ''),
    expiresAt: payload.exp
  };
  try { storage.setItem(SESSION_KEY, JSON.stringify(safe)); return true; }
  catch { return false; }
}

export function readSession(storage = storageDefault(), nowMs = Date.now()) {
  if (!storage) return null;
  try {
    const text = storage.getItem(SESSION_KEY);
    if (!text) return null;
    const s = JSON.parse(text);
    if (!s?.token || isExpired(s.token, nowMs)) {
      storage.removeItem(SESSION_KEY);
      return null;
    }
    return s;
  } catch {
    try { storage.removeItem(SESSION_KEY); } catch { /* almacenamiento deshabilitado */ }
    return null;
  }
}

export function clearSession(storage = storageDefault()) {
  try { storage?.removeItem(SESSION_KEY); } catch { /* sin almacenamiento */ }
}
