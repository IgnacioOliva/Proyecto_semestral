import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.jsx';

export function ProtectedRoute({ role }) {
  const { session, status } = useAuth();
  const location = useLocation();
  if (status === 'checking') return <p>Verificando la sesión con el backend...</p>;
  if (status === 'unavailable') return <p>No hay conexión para validar la sesión. Usa Reintentar.</p>;
  if (!session) return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  if (role && session.role !== role) return <Navigate to="/sin-permiso" replace />;
  return <Outlet />;
}
