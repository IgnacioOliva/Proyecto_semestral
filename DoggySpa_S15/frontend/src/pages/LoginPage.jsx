import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.jsx';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { session, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  if (session) return <Navigate to="/mascotas" replace />;
  async function submit(event) {
    event.preventDefault();
    setBusy(true); setError('');
    try {
      await login(username, password);
      setPassword('');
      const target = location.state?.from || '/mascotas';
      navigate(target, { replace: true });
    } catch (e) { setError(e.message); }
    finally { setBusy(false); }
  }
  return <section className="panel narrow">
    <h2>Iniciar sesión</h2>
    <p>Login real contra Spring Boot: POST /auth/login.</p>
    <form className="stack" onSubmit={submit}>
      <label>Usuario<input autoComplete="username" required value={username} onChange={e => setUsername(e.target.value)}/></label>
      <label>Contraseña<input type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)}/></label>
      <button disabled={busy}>{busy ? 'Ingresando...' : 'Ingresar'}</button>
    </form>
    {error && <p role="alert" className="error">{error}</p>}
    <p className="hint">Solo laboratorio: admin / Admin123! o usuario / Usuario123!</p>
  </section>;
}
