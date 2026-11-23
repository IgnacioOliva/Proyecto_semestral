import React from 'react';
import { useAuth } from '../auth/AuthContext.jsx';

export default function AdminPage() {
  const { session } = useAuth();
  return <section className="panel">
    <h2>Área administrativa</h2>
    <p>Esta ruta <code>/administracion</code> es exclusiva para ADMIN.</p>
    <p>Usuario: <strong>{session.username}</strong>. Rol verificado: <strong>{session.role}</strong>.</p>
    <p>La pantalla muestra permisos en React, pero las operaciones CRUD también se restringen en Spring Security.</p>
  </section>;
}
