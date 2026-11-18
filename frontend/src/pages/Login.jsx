import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { iniciarSesion } from "../auth/auth.js";

/**
 * El formulario envía usuario y contraseña a /auth/login.
 * Si el backend entrega un token, entra a /admin.
 */
export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function ingresar(event) {
    event.preventDefault();
    setError("");

    if (!usuario.trim() || !password) {
      setError("Debe completar usuario y contraseña.");
      return;
    }

    try {
      const ok = await iniciarSesion(usuario.trim(), password);
      if (!ok) {
        setError("Credenciales incorrectas.");
        return;
      }
    } catch {
      setError("No se pudo conectar con el servidor.");
      return;
    }

    navigate("/admin");
  }

  return (
    <section className="form-card">
      <h2>Login administrador</h2>
      <p>
        Ingresa con el administrador de Sonido Vivo: <strong>admin / admin123</strong>
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

        <button className="primary" type="submit">
          Ingresar
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
