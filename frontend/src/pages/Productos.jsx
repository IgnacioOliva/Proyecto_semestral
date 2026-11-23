import React, { useState, useMemo } from "react";
import Buscador from "../components/Buscador";
import ListaProductos from "../components/ListaProductos";

export default function CatalogoPage({ productos, onAgregar, carrito = [] }) {
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");

  const categorias = useMemo(() => {
    const cats = new Set(productos.map((p) => p.categoria));
    return Array.from(cats).sort();
  }, [productos]);

  const productosFiltrados = useMemo(() => {
    return productos.filter((producto) => {
      const coincideTexto =
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        producto.marca.toLowerCase().includes(busqueda.toLowerCase()) ||
        producto.modelo.toLowerCase().includes(busqueda.toLowerCase()) ||
        producto.codigo.toLowerCase().includes(busqueda.toLowerCase());

      const coincideCategoria =
        categoriaSeleccionada === "Todas" ||
        producto.categoria === categoriaSeleccionada;

      return coincideTexto && coincideCategoria;
    });
  }, [productos, busqueda, categoriaSeleccionada]);

  const conStock = productosFiltrados.filter((producto) => {
    const reservada = carrito.find((item) => item.id === producto.id)?.cantidad ?? 0;
    return producto.stock - reservada > 0;
  }).length;

  return (
    <div className="container py-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
        <div>
          <h2 className="fw-bold text-dark mb-1">Catálogo de Productos</h2>
          <p className="text-muted small mb-0">
            Explora las referencias activas con stock actualizado en tiempo real.
          </p>
        </div>
        <div className="mt-2 mt-md-0">
          <span className="badge badge-suave fs-6 px-3 py-2">
            {conStock} productos con stock
          </span>
        </div>
      </div>

      <Buscador
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        categoriaSeleccionada={categoriaSeleccionada}
        setCategoriaSeleccionada={setCategoriaSeleccionada}
        categorias={categorias}
      />

      <ListaProductos
        productos={productosFiltrados}
        onAgregar={onAgregar}
        carrito={carrito}
      />
    </div>
  );
}
