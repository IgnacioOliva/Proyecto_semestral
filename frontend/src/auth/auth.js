const CLAVE_SESION = "usuarioActual";
const API = "http://localhost:8080";

export async function iniciarSesion(usuario, password) {
  const respuesta = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usuario, password }),
  });

  if (!respuesta.ok) return false;

  const datos = await respuesta.json();
  localStorage.setItem(
    CLAVE_SESION,
    JSON.stringify({
      usuario: datos.usuario,
      rol: datos.rol,
      token: datos.token,
    }),
  );
  return true;
}

export function obtenerSesion() {
  try {
    const guardado = localStorage.getItem(CLAVE_SESION);
    if (!guardado) return null;

    const sesion = JSON.parse(guardado);
    if (!sesion || typeof sesion !== "object" || !sesion.token) return null;
    return sesion;
  } catch {
    localStorage.removeItem(CLAVE_SESION);
    return null;
  }
}

export function obtenerToken() {
  return obtenerSesion()?.token ?? null;
}

export function authHeaders() {
  const token = obtenerToken();
  return token
    ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    : { "Content-Type": "application/json" };
}

export function cerrarSesion() {
  localStorage.removeItem(CLAVE_SESION);
}

export function estaAutenticado() {
  return obtenerSesion() !== null;
}
