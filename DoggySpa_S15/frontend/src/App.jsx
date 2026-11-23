import React from 'react';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './auth/AuthContext.jsx';
import { ProtectedRoute } from './components/ProtectedRoute.jsx';
import LoginPage from './pages/LoginPage.jsx';
import MascotasPage from './pages/MascotasPage.jsx';
import AdminPage from './pages/AdminPage.jsx';

export default function App() {
  const { session, status, notice, logout, restore } = useAuth();
  return <main className="shell">
    <header>
      <h1>🐾 DoggySpa — Semana 15</h1>
      <p>React + Spring Boot · JWT · Roles · Persistencia de sesión</p>
      <nav>
        <Link to="/mascotas">Mascotas</Link>
        {session?.role === 'ADMIN' && <Link to="/administracion">Administración</Link>}
        {!session && <Link to="/login">Login</Link>}
        {session && <button type="button" className="secondary" onClick={() => logout()}>Cerrar sesión</button>}
      </nav>
      {session && <p className="identity">Sesión: {session.username} · {session.role}</p>}
    </header>
    {notice && <p role="status" className="notice">{notice}</p>}
    {status === 'unavailable' && <section className="panel"><p>No se pudo verificar la sesión porque Spring Boot no responde.</p><button onClick={restore}>Reintentar verificación</button><button className="secondary" onClick={() => logout()}>Descartar sesión</button></section>}
    {status === 'checking' && <section className="panel"><p>Comprobando sesión con el backend...</p></section>}
    {status !== 'checking' && status !== 'unavailable' && <Routes>
      <Route path="/" element={<Navigate to={session?'/mascotas':'/login'} replace />}/>
      <Route path="/login" element={<LoginPage />}/>
      <Route element={<ProtectedRoute />}>
        <Route path="/mascotas" element={<MascotasPage />}/>
      </Route>
      <Route element={<ProtectedRoute role="ADMIN" />}>
        <Route path="/administracion" element={<AdminPage />}/>
      </Route>
      <Route path="/sin-permiso" element={<section className="panel"><h2>403 — Acceso restringido</h2><p>No tienes el rol ADMIN para acceder a esta página.</p><Link to="/mascotas">Volver al listado</Link></section>}/>
      <Route path="*" element={<section className="panel"><h2>Página no encontrada</h2><Link to="/mascotas">Volver</Link></section>}/>
    </Routes>}
    <footer>Laboratorio S15 · La sesión persiste al recargar la pestaña, no al cerrarla. No utilices esta gestión de JWT sin ajustes en producción.</footer>
  </main>;
}
