import React from 'react';
import TarjetaProducto from './ProductoCard.jsx';

export default function ListaProductos({ productos, onAgregar, carrito = [] }) {
  if (productos.length === 0) {
    return (
      <div className="text-center py-5 my-4 bg-white rounded shadow-sm p-4">
        <i className="bi bi-search-heart display-1 text-muted mb-3"></i>
        <h4 className="fw-bold">No se encontraron productos</h4>
        <p className="text-muted mb-0">Intenta cambiar el término de búsqueda o selecciona otra categoría.</p>
      </div>
    );
  }

  return (
    <div className="row g-4">
      {productos.map((producto) => (
        <TarjetaProducto
          key={producto.id}
          producto={producto}
          onAgregar={onAgregar}
          cantidadEnCarrito={
            carrito.find((item) => item.id === producto.id)?.cantidad ?? 0
          }
        />
      ))}
    </div>
  );
}
