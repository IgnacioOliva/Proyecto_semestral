import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CarritoPage({ carrito, total, onEliminar, onActualizarCantidad, onVaciarCarrito }) {
  const [tipoEntrega, setTipoEntrega] = useState('retiro');
  const [pedidoConfirmado, setPedidoConfirmado] = useState(false);

  const costoEnvio = tipoEntrega === 'despacho' ? 4990 : 0;
  const totalFinal = total + costoEnvio;

  const handleConfirmar = (e) => {
    e.preventDefault();
    setPedidoConfirmado(true);
    onVaciarCarrito();
  };

  if (pedidoConfirmado) {
    return (
      <div className="container py-5 text-center">
        <div className="card shadow-sm border-0 p-5 mx-auto" style={{ maxWidth: '600px' }}>
          <i className="bi bi-check-circle-fill display-1 text-success mb-3"></i>
          <h2 className="fw-bold text-dark">¡Pedido Recibido con Éxito!</h2>
          <p className="text-muted mb-4">
            Hemos registrado tu solicitud para <strong>Sonido Vivo</strong>. Un ejecutivo verificará el stock y te contactará a la brevedad.
          </p>
          <div className="alert alert-light border text-start mb-4 small">
            <p className="mb-1"><strong>Número de Pedido:</strong> #SV-{Math.floor(100000 + Math.random() * 900000)}</p>
            <p className="mb-1"><strong>Modalidad:</strong> {tipoEntrega === 'retiro' ? 'Retiro en Tienda (Arlegui #450, Viña del Mar)' : 'Despacho por Starken/Chilexpress'}</p>
            <p className="mb-0"><strong>Estado:</strong> En Preparación</p>
          </div>
          <Link to="/catalogo" className="btn btn-sv px-4 py-2">
            Volver al Catálogo
          </Link>
        </div>
      </div>
    );
  }

  if (carrito.length === 0) {
    return (
      <div className="container py-5 text-center">
        <div className="py-5 bg-white rounded shadow-sm p-4">
          <i className="bi bi-cart-x display-1 text-muted mb-3"></i>
          <h3 className="fw-bold">Tu carrito está vacío</h3>
          <p className="text-muted mb-4">Aún no has agregado instrumentos o accesorios a tu pedido.</p>
          <Link to="/catalogo" className="btn btn-sv px-4">
            Explorar Catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="fw-bold text-dark mb-4">
        <i className="bi bi-cart3 me-2 acento"></i>Tu Carrito de Compras
      </h2>

      <div className="row g-4">
        <div className="col-12 col-lg-8">
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
              <h5 className="mb-0 fw-bold">Productos Seleccionados</h5>
              <button 
                className="btn btn-outline-danger btn-sm"
                onClick={onVaciarCarrito}
              >
                <i className="bi bi-trash me-1"></i>Vaciar Carrito
              </button>
            </div>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th className="text-center">Cantidad</th>
                    <th className="text-end">Subtotal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {carrito.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src={item.imagen}
                            alt={item.nombre}
                            style={{ width: '48px', height: '48px', objectFit: 'contain' }}
                            className="me-3 rounded border p-1"
                            onError={(event) => {
                              event.currentTarget.onerror = null;
                              event.currentTarget.src = "/images/placeholder-producto.svg";
                            }}
                          />
                          <div>
                            <h6 className="mb-0 fw-bold fs-6">{item.nombre}</h6>
                            <small className="text-muted">{item.marca} · Cód: {item.codigo}</small>
                          </div>
                        </div>
                      </td>
                      <td>${item.precio.toLocaleString('es-CL')}</td>
                      <td className="text-center" style={{ minWidth: '120px' }}>
                        <div className="input-group input-group-sm justify-content-center">
                          <button 
                            className="btn btn-outline-secondary"
                            onClick={() => onActualizarCantidad(item.id, item.cantidad - 1)}
                          >
                            -
                          </button>
                          <span className="input-group-text px-3 bg-white fw-bold">{item.cantidad}</span>
                          <button 
                            className="btn btn-outline-secondary"
                            onClick={() => onActualizarCantidad(item.id, item.cantidad + 1)}
                            disabled={item.cantidad >= item.stock}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="text-end fw-bold">
                        ${(item.precio * item.cantidad).toLocaleString('es-CL')}
                      </td>
                      <td className="text-end">
                        <button 
                          className="btn btn-link text-danger p-0"
                          onClick={() => onEliminar(item.id)}
                          title="Eliminar producto"
                        >
                          <i className="bi bi-x-lg"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div className="card shadow-sm border-0 p-4 bg-white sticky-top resumen-pedido">
            <h5 className="fw-bold mb-3">Resumen de Pedido</h5>

            <div className="mb-3">
              <label className="form-label fw-semibold small">Opción de Entrega:</label>
              <div className="form-check mb-2">
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="tipoEntrega" 
                  id="retiro"
                  value="retiro"
                  checked={tipoEntrega === 'retiro'}
                  onChange={(e) => setTipoEntrega(e.target.value)}
                />
                <label className="form-check-label small" htmlFor="retiro">
                  Retiro en Tienda Viña (Gratis)
                </label>
              </div>
              <div className="form-check">
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="tipoEntrega" 
                  id="despacho"
                  value="despacho"
                  checked={tipoEntrega === 'despacho'}
                  onChange={(e) => setTipoEntrega(e.target.value)}
                />
                <label className="form-check-label small" htmlFor="despacho">
                  Despacho a Domicilio ($4.990)
                </label>
              </div>
            </div>

            <hr />

            <div className="d-flex justify-content-between mb-2 small text-secondary">
              <span>Subtotal Productos:</span>
              <span>${total.toLocaleString('es-CL')}</span>
            </div>
            <div className="d-flex justify-content-between mb-2 small text-secondary">
              <span>Costo Envío:</span>
              <span>{costoEnvio === 0 ? 'Gratis' : `$${costoEnvio.toLocaleString('es-CL')}`}</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between mb-4">
              <span className="fw-bold fs-5">Total a Pagar:</span>
              <span className="fw-bold fs-4 text-primary">${totalFinal.toLocaleString('es-CL')}</span>
            </div>

            <form onSubmit={handleConfirmar}>
              <div className="mb-3">
                <input 
                  type="text" 
                  className="form-control form-control-sm mb-2" 
                  placeholder="Nombre y Apellido *" 
                  required 
                />
                <input 
                  type="email" 
                  className="form-control form-control-sm mb-2" 
                  placeholder="Correo Electrónico *" 
                  required 
                />
                <input 
                  type="tel" 
                  className="form-control form-control-sm" 
                  placeholder="Teléfono / WhatsApp *" 
                  required 
                />
              </div>

              <button type="submit" className="btn btn-sv w-100 py-2">
                <i className="bi bi-bag-check-fill me-2"></i>Confirmar Pedido
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
