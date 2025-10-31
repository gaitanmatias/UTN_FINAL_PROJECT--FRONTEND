import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li>
          <NavLink to="/" end>Inicio</NavLink>
        </li>
        <li>
          <NavLink to="/auth/register">Registro</NavLink>
        </li>
        <li>
          <NavLink to="/auth/login">Iniciar Sesión</NavLink>
        </li>
      </ul>
    </nav>
  );
}
