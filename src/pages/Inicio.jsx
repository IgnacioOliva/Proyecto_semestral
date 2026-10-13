import { Link } from "react-router-dom";
import ListaProductos from "../components/ListaProductos.jsx";

export default function Inicio({ productosDestacados = [], onAgregar }) {
  const destacados = productosDestacados
    .filter((producto) => producto.stock > 0)
    .slice(0, 8);

  return (
    <>
      <section className="hero-sv py-5">
        <div className="container py-4">
          <div className="row align-items-center g-4">
            <div className="col-12 col-lg-7">
              <p className="hero-kicker fw-semibold mb-2">Sonido Vivo · Viña del Mar</p>
              <h1 className="display-5 fw-bold mb-3">
                Instrumentos, audio e iluminación profesional
              </h1>
              <p className="lead mb-4">
                Descuentos de hasta un 60% en guitarras y bajos. Retiro en tienda
                o despacho a todo Chile.
              </p>
              <div className="d-flex flex-wrap gap-2">
                <Link to="/catalogo" className="btn btn-sv px-4">
                  Ver catálogo
                </Link>
                <Link to="/ubicacion" className="btn btn-sv-outline px-4">
                  Cómo llegar
                </Link>
              </div>
            </div>
            <div className="col-12 col-lg-5">
              <div className="hero-panel rounded-3 p-4">
                <h2 className="h5 acento mb-3">Atención en sala</h2>
                <ul className="list-unstyled mb-0">
                  <li className="mb-2">
                    <i className="bi bi-geo-alt-fill acento me-2"></i>
                    Arlegui #450, Viña del Mar
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-clock acento me-2"></i>
                    Lun–Vie 10:00–19:00 · Sáb 10:30–14:30
                  </li>
                  <li>
                    <i className="bi bi-truck acento me-2"></i>
                    Envíos Starken y Chilexpress
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-2">
          <div>
            <h2 className="fw-bold mb-1">Destacados con stock</h2>
            <p className="text-muted mb-0">
              Una selección de referencias listas para agregar al carrito.
            </p>
          </div>
          <Link to="/catalogo" className="btn btn-sv-outline">
            Ver todos
          </Link>
        </div>

        <ListaProductos productos={destacados} onAgregar={onAgregar} />
      </section>
    </>
  );
}
