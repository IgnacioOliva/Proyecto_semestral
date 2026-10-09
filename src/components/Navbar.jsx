import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="site-nav">
      <div className="nav-inner">
        <NavLink to="/" end>Inicio</NavLink>
        <NavLink to="/productos">Productos</NavLink>
        <NavLink to="/contacto">Contacto</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/admin">Admin</NavLink>
      </div>
    </nav>
  );
}
