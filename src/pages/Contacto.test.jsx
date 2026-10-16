import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import * as validaciones from "../utils/validaciones.js";
import Contacto from "./Contacto.jsx";

vi.mock("../utils/validaciones.js", { spy: true });

function completarFormulario({
  nombre = "Ana",
  correo = "ana@duoc.cl",
  mensaje = "Quiero información",
} = {}) {
  fireEvent.change(screen.getByLabelText("Nombre"), {
    target: { value: nombre },
  });
  fireEvent.change(screen.getByLabelText("Correo"), {
    target: { value: correo },
  });
  fireEvent.change(screen.getByLabelText("Mensaje"), {
    target: { value: mensaje },
  });
}

describe("Contacto", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("previene el envío y muestra error si los campos están vacíos", () => {
    const preventDefault = vi.spyOn(Event.prototype, "preventDefault");
    render(<Contacto />);

    fireEvent.click(screen.getByRole("button", { name: "Enviar" }));

    expect(preventDefault).toHaveBeenCalled();
    expect(validaciones.validarTexto).toHaveBeenCalledWith("", 3);
    expect(validaciones.validarCorreo).not.toHaveBeenCalled();
    expect(screen.getByRole("status")).toHaveTextContent(
      "Revise los datos del formulario.",
    );
    expect(localStorage.getItem("ultimoContacto")).toBeNull();

    preventDefault.mockRestore();
  });

  it("muestra error cuando el correo es inválido y no guarda el contacto", () => {
    const setItem = vi.spyOn(Storage.prototype, "setItem");
    render(<Contacto />);

    completarFormulario({ correo: "correo-invalido" });
    fireEvent.click(screen.getByRole("button", { name: "Enviar" }));

    expect(validaciones.validarTexto).toHaveBeenCalledWith("Ana", 3);
    expect(validaciones.validarCorreo).toHaveBeenCalledWith("correo-invalido");
    expect(validaciones.validarCorreo).toHaveReturnedWith(false);
    expect(screen.getByRole("status")).toHaveTextContent(
      "Revise los datos del formulario.",
    );
    expect(setItem).not.toHaveBeenCalled();

    setItem.mockRestore();
  });

  it("respeta el rechazo de validarTexto y no guarda el contacto", () => {
    const setItem = vi.spyOn(Storage.prototype, "setItem");
    vi.mocked(validaciones.validarTexto).mockReturnValueOnce(false);
    render(<Contacto />);

    completarFormulario();
    fireEvent.click(screen.getByRole("button", { name: "Enviar" }));

    expect(validaciones.validarTexto).toHaveBeenCalledWith("Ana", 3);
    expect(screen.getByRole("status")).toHaveTextContent(
      "Revise los datos del formulario.",
    );
    expect(setItem).not.toHaveBeenCalled();

    setItem.mockRestore();
  });

  it("guarda el contacto cuando las validaciones pasan", () => {
    const setItem = vi.spyOn(Storage.prototype, "setItem");
    render(<Contacto />);

    completarFormulario();
    fireEvent.click(screen.getByRole("button", { name: "Enviar" }));

    const datos = {
      nombre: "Ana",
      correo: "ana@duoc.cl",
      mensaje: "Quiero información",
    };

    expect(validaciones.validarTexto).toHaveBeenCalledWith("Ana", 3);
    expect(validaciones.validarCorreo).toHaveBeenCalledWith("ana@duoc.cl");
    expect(validaciones.validarTexto).toHaveBeenCalledWith("Quiero información", 5);
    expect(setItem).toHaveBeenCalledWith("ultimoContacto", JSON.stringify(datos));
    expect(JSON.parse(localStorage.getItem("ultimoContacto"))).toEqual(datos);
    expect(screen.getByRole("status")).toHaveTextContent(
      "Gracias Ana. Datos validados.",
    );
    expect(screen.getByLabelText("Nombre")).toHaveValue("");
    expect(screen.getByLabelText("Correo")).toHaveValue("");
    expect(screen.getByLabelText("Mensaje")).toHaveValue("");

    setItem.mockRestore();
  });
});
