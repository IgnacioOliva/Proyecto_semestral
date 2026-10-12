import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import RutaProtegida from "./components/RutaProtegida.jsx";

import Inicio from "./pages/Inicio.jsx";
import CatalogoPage from "./pages/Productos.jsx";
import CarritoPage from "./pages/Carrito.jsx";
import MapaPage from "./pages/Mapa.jsx";
import AdminPage from "./pages/AdminStock.jsx";
import Contacto from "./pages/Contacto.jsx";
import Login from "./pages/Login.jsx";

import { productos as productosIniciales } from "./data/productos.js";

export default function App() {
  const [productos, setProductos] = useState(productosIniciales);
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    if (producto.stock <= 0) return;

    setCarrito((actual) => {
      const existe = actual.find((item) => item.id === producto.id);
      if (existe) {
        return actual.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: Math.min(item.stock, item.cantidad + 1) }
            : item,
        );
      }
      return [...actual, { ...producto, cantidad: 1 }];
    });
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((actual) => actual.filter((item) => item.id !== id));
  };

  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(id);
      return;
    }

    setCarrito((actual) =>
      actual.map((item) =>
        item.id === id
          ? { ...item, cantidad: Math.min(item.stock, nuevaCantidad) }
          : item,
      ),
    );
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const actualizarStock = (id, nuevoStock) => {
    const stockSeguro = Math.max(0, Number(nuevoStock) || 0);

    setProductos((actual) =>
      actual.map((p) => (p.id === id ? { ...p, stock: stockSeguro } : p)),
    );

    setCarrito((actual) =>
      actual
        .map((item) =>
          item.id === id
            ? { ...item, stock: stockSeguro, cantidad: Math.min(item.cantidad, stockSeguro) }
            : item,
        )
        .filter((item) => item.cantidad > 0),
    );
  };

  const total = carrito.reduce(
    (suma, item) => suma + item.precio * item.cantidad,
    0,
  );
  const cantidadTotalCarrito = carrito.reduce(
    (suma, item) => suma + item.cantidad,
    0,
  );

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Header cantidadCarrito={cantidadTotalCarrito} />

      <main className="flex-grow-1">
        <Routes>
          <Route
            path="/"
            element={
              <Inicio
                productosDestacados={productos}
                onAgregar={agregarAlCarrito}
              />
            }
          />
          <Route
            path="/catalogo"
            element={
              <CatalogoPage productos={productos} onAgregar={agregarAlCarrito} />
            }
          />
          <Route
            path="/carrito"
            element={
              <CarritoPage
                carrito={carrito}
                total={total}
                onEliminar={eliminarDelCarrito}
                onActualizarCantidad={actualizarCantidad}
                onVaciarCarrito={vaciarCarrito}
              />
            }
          />
          <Route path="/ubicacion" element={<MapaPage />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <RutaProtegida>
                <AdminPage
                  productos={productos}
                  onActualizarStock={actualizarStock}
                />
              </RutaProtegida>
            }
          />
          <Route
            path="*"
            element={
              <div className="container py-5 text-center">
                <h1 className="display-1 text-danger">404</h1>
                <h2>Página no encontrada</h2>
                <p className="text-muted">
                  La ruta solicitada no existe en la tienda Sonido Vivo.
                </p>
              </div>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
