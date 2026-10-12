import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-4 pb-3 mt-auto border-top border-secondary">
      <div className="container">
        <div className="row g-4">
          <div className="col-12 col-md-4">
            <h5 className="text-warning fw-bold mb-3">
              <i className="bi bi-music-note-beamed me-2"></i>Sonido Vivo
            </h5>
            <p className="small text-secondary mb-2">
              Tienda especialista en instrumentos musicales, audio e iluminación en Viña del Mar. Más de 11 años ofreciendo equipamiento profesional.
            </p>
            <p className="small text-secondary mb-0">
              <i className="bi bi-geo-alt-fill text-warning me-1"></i> Arlegui #450, Viña del Mar
            </p>
          </div>

          <div className="col-12 col-md-4">
            <h6 className="text-white fw-bold mb-3">Horario y Atención</h6>
            <ul className="list-unstyled small text-secondary">
              <li className="mb-1"><i className="bi bi-clock me-2"></i>Lunes a Viernes: 10:00 - 19:00 hrs</li>
              <li className="mb-1"><i className="bi bi-clock me-2"></i>Sábados: 10:30 - 14:30 hrs</li>
              <li className="mb-1"><i className="bi bi-whatsapp me-2 text-success"></i>Pedidos remotos por WhatsApp</li>
              <li className="mb-1"><i className="bi bi-truck me-2 text-info"></i>Envíos por Starken y Chilexpress</li>
            </ul>
          </div>

          <div className="col-12 col-md-4">
            <h6 className="text-white fw-bold mb-3">Plataforma Académica</h6>
            <p className="small text-secondary">
              Proyecto Fullstack II (DSY1104) · React + Vite + Bootstrap.
            </p>
            <div className="d-flex gap-2 flex-wrap">
              <span className="badge bg-secondary">Móvil ≥ 360px</span>
              <span className="badge bg-secondary">Tablet ≥ 768px</span>
              <span className="badge bg-secondary">Desktop ≥ 1280px</span>
            </div>
          </div>
        </div>

        <hr className="my-3 border-secondary" />

        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center small text-secondary">
          <p className="mb-2 mb-sm-0">&copy; {new Date().getFullYear()} Sonido Vivo. Todos los derechos reservados.</p>
          <p className="mb-0">Desarrollado con React SPA y Bootstrap 5</p>
        </div>
      </div>
    </footer>
  );
}