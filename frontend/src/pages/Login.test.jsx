import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Login from "./Login.jsx";
import { AuthProvider } from "../auth/AuthContext.jsx";

function token(sub = "admin", exp = Math.floor(Date.now() / 1000) + 600) {
  const payload = btoa(JSON.stringify({ sub, rol: "ADMIN", exp }))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
  return `ejemplo.${payload}.firma`;
}

function renderLogin() {
  render(
    <AuthProvider>
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<h1>Panel de prueba</h1>} />
          <Route path="/catalogo" element={<h1>Catálogo</h1>} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>,
  );
}

describe("Login", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("muestra error cuando los campos están vacíos", async () => {
    renderLogin();
    fireEvent.click(await screen.findByRole("button", { name: "Ingresar" }));
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Debe completar usuario y contraseña.",
    );
    expect(fetch).not.toHaveBeenCalled();
  });

  it("muestra error para credenciales incorrectas", async () => {
    fetch.mockResolvedValue({
      ok: false,
      status: 401,
      text: async () => JSON.stringify({ error: "Credenciales incorrectas" }),
    });
    renderLogin();
    fireEvent.change(await screen.findByLabelText("Usuario"), {
      target: { value: "otro" },
    });
    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { value: "1234" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Ingresar" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Credenciales incorrectas");
  });

  it("guarda sesión y navega a admin con credenciales válidas", async () => {
    fetch.mockResolvedValue({
      ok: true,
      status: 200,
      text: async () => JSON.stringify({
        token: token(),
        usuario: "admin",
        rol: "ADMIN",
        tipo: "Bearer",
      }),
    });
    renderLogin();
    fireEvent.change(await screen.findByLabelText("Usuario"), {
      target: { value: "admin" },
    });
    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { value: "admin123" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Ingresar" }));
    expect(await screen.findByRole("heading", { name: "Panel de prueba" })).toBeInTheDocument();
    const sesion = JSON.parse(sessionStorage.getItem("sonidovivo.session"));
    expect(sesion.username).toBe("admin");
    expect(sesion.role).toBe("ADMIN");
    expect(sesion.token).toContain("ejemplo.");
  });
});
