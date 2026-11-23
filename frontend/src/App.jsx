import { useCallback, useEffect, useState } from "react";
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
import SinPermiso from "./pages/SinPermiso.jsx";
import { useAuth } from "./auth/AuthContext.jsx";
import { ApiError, request } from "./services/api.js";

export default function App() {
  const { session, status, notice, logout, restore } = useAuth();
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [error, setError] = useState("");

  const api = useCallback((path, options = {}) => request(path, {
    ...options,
    token: session?.token,
    onUnauthorized: () => logout("El servidor rechazó el JWT (401). Inicia sesión nuevamente."),
  }), [session?.token, logout]);

  const cargarProductos = useCallback(async () => {
    const data = await api("/api/Productos");
    setProductos(Array.isArray(data) ? data : []);
  }, [api]);

  useEffect(() => {
    if (status !== "authenticated") {
      setProductos([]);
      return undefined;
    }
    let vigente = true;
    cargarProductos().catch((e) => {
      if (vigente && e.status !== 401) setError(e.message);
    });
    return () => {
      vigente = false;
    };
  }, [status, cargarProductos]);

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

  const registrarPedido = async (pedido) => {
    try {
      const creado = await api("/api/Pedidos", {
        method: "POST",
        body: JSON.stringify({
          nombre: pedido.nombre,
          correo: pedido.correo,
          telefono: pedido.telefono,
          tipoEntrega: pedido.tipoEntrega,
          detalles: pedido.items.map((item) => ({
            cantidad: item.cantidad,
            producto: { id: item.id },
          })),
        }),
      });
      await cargarProductos();
      setError("");
      return creado;
    } catch (e) {
      if (!(e instanceof ApiError) || e.status !== 401) setError(e.message);
      throw e;
    }
  };

  const actualizarStock = async (id, nuevoStock) => {
    const stockSeguro = Math.max(0, Number(nuevoStock) || 0);
    const actual = productos.find((producto) => producto.id === id);
    if (!actual) return;

    try {
      const guardado = await api(`/api/Productos/${id}`, {
        method: "PUT",
        body: JSON.stringify({ ...actual, stock: stockSeguro }),
      });
      setProductos((lista) => lista.map((producto) => (producto.id === id ? guardado : producto)));
      setCarrito((lista) =>
        lista
          .map((item) =>
            item.id === id
              ? { ...item, stock: stockSeguro, cantidad: Math.min(item.cantidad, stockSeguro) }
              : item,
          )
          .filter((item) => item.cantidad > 0),
      );
      setError("");
    } catch (e) {
      if (!(e instanceof ApiError) || e.status !== 401) setError(e.message);
    }
  };

  const total = carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
  const cantidadTotalCarrito = carrito.reduce((suma, item) => suma + item.cantidad, 0);

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Header cantidadCarrito={cantidadTotalCarrito} />

      <main className="flex-grow-1">
        {notice && (
          <div className="container pt-3">
            <p className="alert alert-info mb-0" role="status">{notice}</p>
          </div>
        )}
        {error && (
          <div className="container pt-3">
            <p className="alert alert-danger mb-0" role="alert">{error}</p>
          </div>
        )}
        {status === "unavailable" && (
          <section className="container py-4">
            <p>No se pudo verificar la sesión porque Spring Boot no responde.</p>
            <button className="btn btn-sv me-2" type="button" onClick={restore}>Reintentar verificación</button>
            <button className="btn btn-outline-secondary" type="button" onClick={() => logout()}>Descartar sesión</button>
          </section>
        )}
        {status === "checking" && (
          <section className="container py-4">
            <p>Comprobando sesión con el backend...</p>
          </section>
        )}
        {status !== "checking" && status !== "unavailable" && (
          <Routes>
            <Route
              path="/"
              element={
                <Inicio
                  productosDestacados={productos}
                  onAgregar={agregarAlCarrito}
                  carrito={carrito}
                  autenticado={status === "authenticated"}
                />
              }
            />
            <Route element={<RutaProtegida><CatalogoPage productos={productos} onAgregar={agregarAlCarrito} carrito={carrito} /></RutaProtegida>} path="/catalogo" />
            <Route
              path="/carrito"
              element={
                <RutaProtegida>
                  <CarritoPage
                    carrito={carrito}
                    total={total}
                    onEliminar={eliminarDelCarrito}
                    onActualizarCantidad={actualizarCantidad}
                    onVaciarCarrito={vaciarCarrito}
                    onRegistrarPedido={registrarPedido}
                  />
                </RutaProtegida>
              }
            />
            <Route path="/ubicacion" element={<MapaPage />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sin-permiso" element={<SinPermiso />} />
            <Route
              path="/admin"
              element={
                <RutaProtegida rol="ADMIN">
                  <AdminPage productos={productos} onActualizarStock={actualizarStock} />
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
        )}
      </main>

      <Footer />
    </div>
  );
}
