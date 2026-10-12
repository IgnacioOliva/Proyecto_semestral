import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductoCard from "./ProductoCard.jsx";

const producto = {
  id: 1,
  codigo: "GA001",
  nombre: "Guitarra Acústica Folk",
  categoria: "Guitarras Acústicas",
  marca: "Yamaha",
  modelo: "F310",
  stock: 8,
  precio: 129990,
  descripcion: "Tapa de abeto, aros y fondo de meranti. Ideal para iniciantes.",
  imagen: "/images/productos/guitarra-acustica-folk.svg",
};

describe("ProductoCard", () => {
  it("muestra nombre y categoría", () => {
    render(<ProductoCard producto={producto} />);

    expect(
      screen.getByRole("heading", { name: "Guitarra Acústica Folk" }),
    ).toBeInTheDocument();

    expect(screen.getByText("Guitarras Acústicas")).toBeInTheDocument();
  });

  it("muestra el precio formateado", () => {
    render(<ProductoCard producto={producto} />);

    expect(screen.getByText("$129.990")).toBeInTheDocument();
  });
});
