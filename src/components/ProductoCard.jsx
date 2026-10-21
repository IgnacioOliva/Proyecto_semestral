import React from "react";

export default function TarjetaProducto({ producto, onAgregar, cantidadEnCarrito = 0 }) {
  const {
    codigo,
    nombre,
    categoria,
    marca,
    modelo,
    stock,
    precio,
    descripcion,
    imagen,
  } = producto;

  const stockVisible = Math.max(0, stock - cantidadEnCarrito);
  const agotado = stock === 0;
  const alMaximo = !agotado && stockVisible === 0;

  return (
    <div className="col-12 col-md-6 col-lg-4 col-xl-3">
      <div className="card h-100 shadow-sm border-0 producto-card position-relative">
        <span
          className={`position-absolute top-0 end-0 m-2 badge ${
            agotado || alMaximo
              ? "bg-danger"
              : stockVisible > 3
                ? "bg-success"
                : "bg-warning text-dark"
          }`}
        >
          {agotado ? "Agotado" : alMaximo ? "En carrito" : `Stock: ${stockVisible}`}
        </span>

        <div className="card-img-top-container">
          <img
            src={imagen}
            alt={nombre}
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = "/images/placeholder-producto.svg";
            }}
          />
        </div>

        <div className="card-body d-flex flex-column p-3">
          <div className="mb-2">
            <span className="badge bg-secondary text-uppercase me-1">{marca}</span>
            <span className="badge bg-light text-dark border">{categoria}</span>
          </div>

          <h5 className="card-title text-dark fw-bold fs-6 mb-1">{nombre}</h5>
          <p className="text-muted small mb-2">
            {modelo} · <span className="fw-semibold">Cód: {codigo}</span>
          </p>

          <p className="card-text text-secondary small flex-grow-1">
            {descripcion}
          </p>

          <div className="d-flex align-items-center justify-content-between mt-3 pt-2 border-top">
            <span className="fs-5 fw-bold text-primary">
              ${precio.toLocaleString("es-CL")}
            </span>
            <button
              className="btn btn-sv btn-sm rounded-pill px-3"
              onClick={() => onAgregar(producto)}
              disabled={stockVisible === 0}
            >
              <i className="bi bi-cart-plus me-1"></i>
              {agotado ? "Agotado" : alMaximo ? "Máximo" : "Agregar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
