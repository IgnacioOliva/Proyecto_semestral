const CLAVE_SESION = "usuarioActual";

export function iniciarSesion(usuario, password) {
  if (usuario !== "admin" || password !== "admin123") {
    return false;
  }

  localStorage.setItem(CLAVE_SESION, JSON.stringify({ usuario, rol: "ADMIN" }));

  return true;
}

export function obtenerSesion() {
  return JSON.parse(localStorage.getItem(CLAVE_SESION));
}

export function cerrarSesion() {
  localStorage.removeItem(CLAVE_SESION);
}

export function estaAutenticado() {
  return obtenerSesion() !== null;
}
