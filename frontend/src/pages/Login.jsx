import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const { session, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (session) {
    return <Navigate to={session.role === "ADMIN" ? "/admin" : "/catalogo"} replace />;
  }

  async function ingresar(event) {
    event.preventDefault();
    setError("");

    if (!usuario.trim() || !password) {
      setError("Debe completar usuario y contraseña.");
      return;
    }

    setBusy(true);
    try {
      const activa = await login(usuario.trim(), password);
      const destino = location.state?.from || (activa?.role === "ADMIN" ? "/admin" : "/catalogo");
      navigate(destino, { replace: true });
    } catch (e) {
      setError(e.message || "Credenciales incorrectas.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="form-card">
      <h2>Iniciar sesión</h2>
      <p>
        Consulta: <strong>usuario / usuario123</strong>. Administración: <strong>admin / admin123</strong>
      </p>

      <form onSubmit={ingresar} noValidate>
        <div className="form-group">
          <label htmlFor="usuario">Usuario</label>
          <input
            id="usuario"
            value={usuario}
            onChange={(event) => setUsuario(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <button className="primary" type="submit" disabled={busy}>
          {busy ? "Ingresando..." : "Ingresar"}
        </button>

        {error && (
          <div className="mensaje error" role="alert">
            {error}
          </div>
        )}
      </form>
    </section>
  );
}
