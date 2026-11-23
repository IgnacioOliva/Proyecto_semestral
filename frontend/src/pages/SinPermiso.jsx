import { Link } from "react-router-dom";

export default function SinPermiso() {
  return (
    <section className="container py-5">
      <h2>403 — Acceso restringido</h2>
      <p>No tienes el rol ADMIN para acceder a esta página.</p>
      <Link to="/catalogo">Volver al catálogo</Link>
    </section>
  );
}
