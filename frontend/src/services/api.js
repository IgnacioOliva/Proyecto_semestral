export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function request(path, { token, onUnauthorized, ...options } = {}) {
  const headers = new Headers(options.headers || {});
  if (options.body !== undefined && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  if (token) headers.set("Authorization", `Bearer ${token}`);

  let response;
  try {
    response = await fetch(`${API_URL}${path}`, { ...options, headers });
  } catch {
    throw new ApiError(0, "No fue posible conectar con Spring Boot (puerto 8080).");
  }

  const raw = await response.text();
  let data = null;
  if (raw) {
    try {
      data = JSON.parse(raw);
    } catch {
      data = { error: raw };
    }
  }

  if (!response.ok) {
    if (response.status === 401) onUnauthorized?.();
    const fallback = response.status === 403
      ? "No tienes permisos para esta operación (403)."
      : response.status === 401
        ? "Sesión no válida o expirada (401)."
        : `Error HTTP ${response.status}`;
    throw new ApiError(response.status, data?.error || data?.detalle || fallback);
  }
  return data;
}
