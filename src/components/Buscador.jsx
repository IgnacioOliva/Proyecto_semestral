import React from 'react';

export default function Buscador({ busqueda, setBusqueda, categoriaSeleccionada, setCategoriaSeleccionada, categorias }) {
  return (
    <div className="card shadow-sm p-3 mb-4 bg-white border-0">
      <div className="row g-3 align-items-center">
        {/* Input de Búsqueda */}
        <div className="col-12 col-md-7 col-lg-8">
          <div className="input-group">
            <span className="input-group-text bg-light border-end-0">
              <i className="bi bi-search text-muted"></i>
            </span>
            <input
              type="text"
              className="form-control bg-light border-start-0"
              placeholder="Buscar por nombre, marca, modelo o código (ej. GA001)..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            {busqueda && (
              <button 
                className="btn btn-outline-secondary" 
                type="button"
                onClick={() => setBusqueda('')}
              >
                <i className="bi bi-x-circle"></i>
              </button>
            )}
          </div>
        </div>

        {/* Filtro por Categoría */}
        <div className="col-12 col-md-5 col-lg-4">
          <div className="input-group">
            <span className="input-group-text bg-light border-end-0">
              <i className="bi bi-filter text-muted"></i>
            </span>
            <select
              className="form-select bg-light"
              value={categoriaSeleccionada}
              onChange={(e) => setCategoriaSeleccionada(e.target.value)}
            >
              <option value="Todas">Todas las Categorías</option>
              {categorias.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
