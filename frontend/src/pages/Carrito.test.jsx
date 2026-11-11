import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CarritoPage from "./Carrito.jsx";

const item = {
  id: 1,
  codigo: "GA001",
  nombre: "Guitarra Acústica Folk",
  marca: "Yamaha",
  precio: 129990,
  cantidad: 1,
  stock: 8,
  imagen: "/images/productos/guitarra-acustica-folk.svg",
};

function renderCarrito() {
  const onEliminar = vi.fn();
  const onActualizarCantidad = vi.fn();
  const onVaciarCarrito = vi.fn();

  render(
    <MemoryRouter>
      <CarritoPage
        carrito={[item]}
        total={129990}
        onEliminar={onEliminar}
        onActualizarCantidad={onActualizarCantidad}
        onVaciarCarrito={onVaciarCarrito}
      />
    </MemoryRouter>,
  );

  return { onEliminar, onActualizarCantidad, onVaciarCarrito };
}

describe("Carrito", () => {
  it("al confirmar el pedido previene el envío y vacía el carrito", () => {
    const preventDefault = vi.spyOn(Event.prototype, "preventDefault");
    const { onVaciarCarrito } = renderCarrito();

    fireEvent.change(screen.getByPlaceholderText("Nombre y Apellido *"), {
      target: { value: "Ana Pérez" },
    });
    fireEvent.change(screen.getByPlaceholderText("Correo Electrónico *"), {
      target: { value: "ana@duoc.cl" },
    });
    fireEvent.change(screen.getByPlaceholderText("Teléfono / WhatsApp *"), {
      target: { value: "912345678" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Confirmar Pedido/ }));

    expect(preventDefault).toHaveBeenCalled();
    expect(onVaciarCarrito).toHaveBeenCalledTimes(1);
    expect(
      screen.getByRole("heading", { name: "¡Pedido Recibido con Éxito!" }),
    ).toBeInTheDocument();

    preventDefault.mockRestore();
  });

  it("llama a onActualizarCantidad y onEliminar con el producto", () => {
    const { onActualizarCantidad, onEliminar } = renderCarrito();

    fireEvent.click(screen.getByRole("button", { name: "+" }));
    expect(onActualizarCantidad).toHaveBeenCalledWith(1, 2);
    expect(onActualizarCantidad).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole("button", { name: "Eliminar producto" }));
    expect(onEliminar).toHaveBeenCalledWith(1);
    expect(onEliminar).toHaveBeenCalledTimes(1);
  });
});
