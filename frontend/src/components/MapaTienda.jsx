import React from 'react';

const LATITUD = -33.0245;
const LONGITUD = -71.5518;
const oeste = (LONGITUD - 0.01).toFixed(4);
const sur = (LATITUD - 0.01).toFixed(4);
const este = (LONGITUD + 0.01).toFixed(4);
const norte = (LATITUD + 0.01).toFixed(4);
const MAPA_EMBED = `https://www.openstreetmap.org/export/embed.html?bbox=${oeste}%2C${sur}%2C${este}%2C${norte}&layer=mapnik&marker=${LATITUD}%2C${LONGITUD}`;
const MAPA_ENLACE = `https://www.openstreetmap.org/?mlat=${LATITUD}&mlon=${LONGITUD}#map=17/${LATITUD}/${LONGITUD}`;

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
          <iframe
            title="Mapa de Sonido Vivo en Calle Arlegui 450, Viña del Mar"
            src={MAPA_EMBED}
            className="w-100 border-0"
            style={{ minHeight: "300px", height: "100%" }}
            loading="lazy"
          />
        </div>

        <div className="col-12 col-lg-5 p-4 bg-white">
          <h6 className="fw-bold text-dark mb-3">Dirección Central</h6>
          <p className="text-secondary small mb-2">
            <strong>Dirección:</strong> Calle Arlegui #450, Centro de Viña del Mar, Región de Valparaíso.
          </p>
          <p className="text-secondary small mb-3">
            <strong>Punto de Retiro:</strong> Retiro inmediato en mesón previa confirmación de pedido online.
          </p>
          <a
            href={MAPA_ENLACE}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline-primary btn-sm mb-3"
          >
            <i className="bi bi-box-arrow-up-right me-1"></i>
            Abrir ubicación en el mapa
          </a>

          <h6 className="fw-bold text-dark mb-2">Despachos a Regiones</h6>
          <ul className="list-group list-group-flush small mb-3">
            <li className="list-group-item px-0 text-secondary">
              <i className="bi bi-check-circle-fill text-success me-2"></i>
              Envíos por Starken y Chilexpress a todo Chile.
            </li>
            <li className="list-group-item px-0 text-secondary">
              <i className="bi bi-check-circle-fill text-success me-2"></i>
              El despacho se coordina por Starken o Chilexpress al confirmar el pedido.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
