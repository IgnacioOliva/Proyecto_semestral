import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";

export default function Admin() {
  const navigate = useNavigate();
  const { session, logout } = useAuth();

  function salir() {
    logout();
    navigate("/login");
  }

  return (
    <section className="panel">
      <h2>Panel administrador</h2>
      <p>
        Bienvenido, <strong>{session?.username}</strong>. Rol: {session?.role}
      </p>
      <p>
        <button className="primary" type="button" onClick={salir}>
          Cerrar sesión
        </button>
      </p>
    </section>
  );
}
