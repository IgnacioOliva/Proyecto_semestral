import { useNavigate } from "react-router-dom";
import { cerrarSesion, obtenerSesion } from "../auth/auth.js";

export default function Admin() {
  const navigate = useNavigate();
  const sesion = obtenerSesion();

  function salir() {
    cerrarSesion();
    navigate("/login");
  }

  return (
    <section className="panel">
      <h2>Panel administrador</h2>
      <p>
        Bienvenido, <strong>{sesion?.usuario}</strong>. Rol: {sesion?.rol}
      </p>

      <div className="admin-grid">
        <article className="kpi">
          <strong>51</strong>
          <span>Productos</span>
        </article>
        <article className="kpi">
          <strong>2</strong>
          <span>Administrador</span>
        </article>
        <article className="kpi">
          <strong>67</strong>
          <span>Pedidos pendientes</span>
        </article>
      </div>

      <p>
        <button className="primary" type="button" onClick={salir}>
          Cerrar sesión
        </button>
      </p>
    </section>
  );
}
