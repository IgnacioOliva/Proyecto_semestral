import React from "react";

export default function Footer() {
  return (
    <footer className="site-footer pt-4 pb-3 mt-auto">
      <div className="container">
        <div className="row g-4">
          <div className="col-12 col-md-4">
            <h5 className="marca fw-bold mb-3">
              <i className="bi bi-music-note-beamed me-2"></i>Sonido Vivo
            </h5>
            <p className="small mb-2">
              Tienda especialista en instrumentos musicales, audio e iluminación
              en Viña del Mar. Más de 11 años ofreciendo equipamiento
              profesional.
            </p>
            <p className="small mb-0">
              <i className="bi bi-geo-alt-fill acento me-1"></i> Arlegui
              #450, Viña del Mar
            </p>
          </div>

          <div className="col-12 col-md-4">
            <h6 className="fw-bold mb-3">Horario y Atención</h6>
            <ul className="list-unstyled small">
              <li className="mb-1">
                <i className="bi bi-clock me-2"></i>Lunes a Viernes: 10:00 -
                19:00 hrs
              </li>
              <li className="mb-1">
                <i className="bi bi-clock me-2"></i>Sábados: 10:30 - 14:30 hrs
              </li>
              <li className="mb-1">
                <i className="bi bi-whatsapp me-2 acento"></i>Pedidos
                remotos por WhatsApp
              </li>
              <li className="mb-1">
                <i className="bi bi-truck me-2 acento"></i>Envíos por Starken y
                Chilexpress
              </li>
            </ul>
          </div>

          <div className="col-12 col-md-4">
            <h6 className="fw-bold mb-3">Plataforma Académica</h6>
            <p className="small">
              Proyecto Fullstack II (DSY1104) · React + Vite + Bootstrap.
            </p>
            <div className="d-flex gap-2 flex-wrap">
              <span className="badge badge-suave">Móvil ≥ 360px</span>
              <span className="badge badge-suave">Tablet ≥ 768px</span>
              <span className="badge badge-suave">Desktop ≥ 1280px</span>
            </div>
          </div>
        </div>

        <hr className="my-3" />

        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center small">
          <p className="mb-2 mb-sm-0">
            &copy; {new Date().getFullYear()} Sonido Vivo. Todos los derechos
            reservados.
          </p>
          <p className="mb-0">Desarrollado por Vicente Izaga e Ignacio Oliva</p>
        </div>
      </div>
    </footer>
  );
}
