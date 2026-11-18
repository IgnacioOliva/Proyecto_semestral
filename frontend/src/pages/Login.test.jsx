import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Login from "./Login.jsx";

function renderLogin() {
  render(
    <MemoryRouter initialEntries={["/login"]}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<h1>Panel de prueba</h1>} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("Login", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("muestra error cuando los campos están vacíos", () => {
    renderLogin();

    fireEvent.click(screen.getByRole("button", { name: "Ingresar" }));

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Debe completar usuario y contraseña.",
    );
    expect(fetch).not.toHaveBeenCalled();
  });

  it("muestra error para credenciales incorrectas", async () => {
    fetch.mockResolvedValue({ ok: false, status: 401 });
    renderLogin();

    fireEvent.change(screen.getByLabelText("Usuario"), {
      target: { value: "otro" },
    });
    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { value: "1234" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Ingresar" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Credenciales incorrectas.");
  });

  it("guarda sesión y navega a admin con credenciales válidas", async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        token: "token-demo",
        usuario: "admin",
        rol: "ADMIN",
        tipo: "Bearer",
      }),
    });
    renderLogin();

    fireEvent.change(screen.getByLabelText("Usuario"), {
      target: { value: "admin" },
    });
    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { value: "admin123" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Ingresar" }));

    expect(await screen.findByRole("heading", { name: "Panel de prueba" })).toBeInTheDocument();
    await waitFor(() => {
      expect(JSON.parse(localStorage.getItem("usuarioActual"))).toEqual({
        usuario: "admin",
        rol: "ADMIN",
        token: "token-demo",
      });
    });
  });
});
