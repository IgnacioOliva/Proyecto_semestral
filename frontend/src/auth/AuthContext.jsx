import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { request } from "../services/api.js";
import { clearSession, decodePayload, readSession, saveSession } from "./session.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [status, setStatus] = useState("checking");
  const [notice, setNotice] = useState("");

  const logout = useCallback((message = "Sesión cerrada.") => {
    clearSession();
    setSession(null);
    setStatus("guest");
    setNotice(message);
  }, []);

  const restore = useCallback(async () => {
    const saved = readSession();
    if (!saved) {
      setStatus("guest");
      setSession(null);
      return;
    }
    setStatus("checking");
    try {
      const who = await request("/auth/me", { token: saved.token });
      const valid = { ...saved, username: who.username, role: who.rol };
      saveSession(valid);
      setSession(valid);
      setStatus("authenticated");
      setNotice("Sesión recuperada y validada con el backend.");
    } catch (error) {
      if (error.status === 401 || error.status === 403) {
        logout("La sesión guardada ya no es válida. Ingresa nuevamente.");
      } else {
        setSession(null);
        setStatus("unavailable");
        setNotice("No se pudo verificar la sesión: inicia Spring Boot y pulsa Reintentar.");
      }
    }
  }, [logout]);

  useEffect(() => {
    restore();
  }, [restore]);

  const login = useCallback(async (usuario, password) => {
    const result = await request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ usuario, password }),
    });
    const payload = decodePayload(result.token);
    const guardada = saveSession({
      token: result.token,
      username: result.usuario ?? payload?.sub,
      role: result.rol,
    });
    if (!payload?.exp || !payload?.sub || !guardada) {
      throw new Error("El backend devolvió una sesión inválida o sin almacenamiento disponible.");
    }
    const active = readSession();
    setSession(active);
    setStatus("authenticated");
    setNotice("Inicio de sesión correcto.");
    return active;
  }, []);

  useEffect(() => {
    if (!session) return undefined;
    const deadline = session.expiresAt * 1000 - Date.now();
    if (deadline <= 0) {
      logout("Tu JWT expiró. Vuelve a iniciar sesión.");
      return undefined;
    }
    const timeout = setTimeout(
      () => logout("Tu JWT expiró. Vuelve a iniciar sesión."),
      Math.min(deadline, 2147483647),
    );
    return () => clearTimeout(timeout);
  }, [session, logout]);

  const value = useMemo(
    () => ({ session, status, notice, login, logout, restore, setNotice }),
    [session, status, notice, login, logout, restore],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe utilizarse dentro de AuthProvider");
  return context;
}
