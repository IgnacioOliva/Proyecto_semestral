import React from 'react';

export default function MapaTienda() {
  return (
    <div className="card shadow-sm border-0 overflow-hidden mb-4">
      <div className="card-header encabezado-suave d-flex align-items-center justify-content-between py-3">
        <h5 className="mb-0 fw-bold">
          <i className="bi bi-geo-alt-fill acento me-2"></i>Ubicación y Puntos de Retiro
        </h5>
        <span className="badge bg-success">Tienda Física Abierta</span>
      </div>
      <div className="row g-0">
        <div className="col-12 col-lg-7">
          <div className="bg-light p-4 text-center d-flex flex-column align-items-center justify-content-center h-100 min-vh-300">
            <i className="bi bi-map display-2 text-primary mb-2"></i>
            <h6 className="fw-bold text-dark">Mapa Interactivo</h6>
            <p className="text-muted small mb-3">
              Muestra la ubicación céntrica de Sonido Vivo y los puntos de entrega asociados en la V Región.
            </p>
            <div className="alert alerta-suave py-2 px-3 small mb-0">
              <i className="bi bi-info-circle me-1"></i>
              Integración con Google Maps proximamente
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-5 p-4 bg-white">
          <h6 className="fw-bold text-dark mb-3">Dirección Central</h6>
          <p className="text-secondary small mb-2">
            <strong>Dirección:</strong> Calle Arlegui #450, Centro de Viña del Mar, Región de Valparaíso.
          </p>
          <p className="text-secondary small mb-3">
            <strong>Punto de Retiro:</strong> Retiro inmediato en mesón previa confirmación de pedido online.
          </p>

          <h6 className="fw-bold text-dark mb-2">Despachos a Regiones</h6>
          <ul className="list-group list-group-flush small mb-3">
            <li className="list-group-item px-0 text-secondary">
              <i className="bi bi-check-circle-fill text-success me-2"></i>
              Envíos por Starken y Chilexpress a todo Chile.
            </li>
            <li className="list-group-item px-0 text-secondary">
              <i className="bi bi-check-circle-fill text-success me-2"></i>
              Código de seguimiento automático registrado en tu pedido.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
