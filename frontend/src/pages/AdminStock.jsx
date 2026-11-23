import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";

function StockInput({ producto, onActualizarStock }) {
  const [valor, setValor] = useState(producto.stock);

  useEffect(() => {
    setValor(producto.stock);
  }, [producto.stock]);

  return (
    <input
      type="number"
      min="0"
      className="form-control form-control-sm"
      value={valor}
      onChange={(event) => setValor(event.target.value)}
      onBlur={() => {
        if (Number(valor) !== Number(producto.stock)) {
          onActualizarStock(producto.id, valor);
        }
      }}
      aria-label={`Stock de ${producto.nombre}`}
    />
  );
}

export default function AdminPage({ productos, onActualizarStock }) {
  const navigate = useNavigate();
  const { session, logout } = useAuth();

  function salir() {
    logout();
    navigate("/login");
  }

  return (
    <div className="container py-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <div>
          <h2 className="fw-bold text-dark mb-1">Gestión de Stock</h2>
          <p className="text-muted small mb-0">
            Sesión: <strong>{session?.username}</strong> ({session?.role})
          </p>
        </div>
        <button className="btn btn-outline-danger" type="button" onClick={salir}>
          <i className="bi bi-box-arrow-right me-1"></i>
          Cerrar sesión
        </button>
      </div>

      <div className="card shadow-sm border-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="tabla-verde">
              <tr>
                <th>Código</th>
                <th>Producto</th>
                <th>Categoría</th>
                <th className="text-end">Precio</th>
                <th style={{ width: "140px" }}>Stock</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id}>
                  <td className="fw-semibold">{producto.codigo}</td>
                  <td>
                    <div className="fw-bold">{producto.nombre}</div>
                    <small className="text-muted">
                      {producto.marca} · {producto.modelo}
                    </small>
                  </td>
                  <td>
                    <span className="badge bg-light text-dark border">
                      {producto.categoria}
                    </span>
                  </td>
                  <td className="text-end">
                    ${producto.precio.toLocaleString("es-CL")}
                  </td>
                  <td>
                    <StockInput producto={producto} onActualizarStock={onActualizarStock} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
