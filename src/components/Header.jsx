import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header({ cantidadCarrito }) {
  return (
    <header className="sticky-top bg-dark navbar-dark shadow-sm">
      <nav className="navbar navbar-expand-md container">
        <Link
          className="navbar-brand d-flex align-items-center fw-bold fs-4 text-warning"
          to="/"
        >
          <i className="bi bi-music-note-beamed me-2"></i>
          <span>Sonido Vivo</span>
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSonidoVivo"
          aria-controls="navbarSonidoVivo"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSonidoVivo">
          <ul className="navbar-nav me-auto mb-2 mb-md-0 mt-2 mt-md-0">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active fw-bold text-white" : ""}`
                }
                end
              >
                <i className="bi bi-house-door me-1"></i> Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/catalogo"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active fw-bold text-white" : ""}`
                }
              >
                <i className="bi bi-grid-3x3-gap me-1"></i> Catálogo
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/ubicacion"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active fw-bold text-white" : ""}`
                }
              >
                <i className="bi bi-geo-alt me-1"></i> Tienda Viña
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/contacto"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active fw-bold text-white" : ""}`
                }
              >
                <i className="bi bi-envelope me-1"></i> Contacto
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active fw-bold text-white" : ""}`
                }
              >
                <i className="bi bi-shield-lock me-1"></i> Gestión Stock
              </NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center mt-2 mt-md-0">
            <Link
              to="/carrito"
              className="btn btn-outline-warning position-relative w-100 w-md-auto"
            >
              <i className="bi bi-cart3 me-1"></i> Carrito
              {cantidadCarrito > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cantidadCarrito}
                  <span className="visually-hidden">productos en carrito</span>
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
