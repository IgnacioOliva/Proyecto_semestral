const CLAVE_SESION = "usuarioActual";

export function iniciarSesion(usuario, password) {
  if (usuario !== "admin" || password !== "admin123") {
    return false;
  }

  localStorage.setItem(CLAVE_SESION, JSON.stringify({ usuario, rol: "ADMIN" }));

  return true;
}

export function obtenerSesion() {
  try {
    const guardado = localStorage.getItem(CLAVE_SESION);
    if (!guardado) return null;

    const sesion = JSON.parse(guardado);
    if (!sesion || typeof sesion !== "object") return null;
    return sesion;
  } catch {
    localStorage.removeItem(CLAVE_SESION);
    return null;
  }
}

export function cerrarSesion() {
  localStorage.removeItem(CLAVE_SESION);
}

export function estaAutenticado() {
  return obtenerSesion() !== null;
}
