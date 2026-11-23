import { describe, expect, it } from "vitest";
import { clearSession, decodePayload, isExpired, readSession, saveSession } from "./session.js";

function token(sub = "usuario", exp = Math.floor(Date.now() / 1000) + 600) {
  const payload = btoa(JSON.stringify({ sub, rol: "USER", exp }))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
  return `ejemplo.${payload}.firma-no-valida`;
}

function storage() {
  const data = new Map();
  return {
    getItem: (key) => (data.has(key) ? data.get(key) : null),
    setItem: (key, value) => data.set(key, value),
    removeItem: (key) => data.delete(key),
  };
}

describe("sesión", () => {
  it("guarda y recupera una sesión al recargar", () => {
    const memoria = storage();
    const jwt = token();
    expect(saveSession({ token: jwt, role: "USER", username: "usuario" }, memoria)).toBe(true);
    expect(readSession(memoria).username).toBe("usuario");
  });

  it("la expiración invalida y borra la sesión", () => {
    const memoria = storage();
    const jwt = token("usuario", Math.floor(Date.now() / 1000) + 1);
    saveSession({ token: jwt, role: "USER" }, memoria);
    expect(readSession(memoria, Date.now() + 5000)).toBeNull();
  });

  it("no acepta JWT con estructura o fecha inválidas", () => {
    expect(isExpired("sin.jwt.valido")).toBe(true);
    expect(decodePayload("incorrecto")).toBeNull();
  });

  it("el cierre de sesión limpia el almacenamiento", () => {
    const memoria = storage();
    saveSession({ token: token(), role: "USER" }, memoria);
    clearSession(memoria);
    expect(readSession(memoria)).toBeNull();
  });
});
