import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";

export default function RutaProtegida({ children, rol }) {
  const { session, status } = useAuth();
  const location = useLocation();

  if (status === "checking") return <p className="container py-4">Verificando la sesión con el backend...</p>;
  if (status === "unavailable") {
    return <p className="container py-4">No hay conexión para validar la sesión. Usa Reintentar.</p>;
  }
  if (!session) return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  if (rol && session.role !== rol) return <Navigate to="/sin-permiso" replace />;
  return children;
}
