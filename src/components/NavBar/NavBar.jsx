import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function NavBar() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li>
          <NavLink to="/" end>Inicio</NavLink>
        </li>
      </ul>
      {isAuthenticated ? (
        <button onClick={logout}>Cerrar Sesión</button>
      ) : (
        <ul className="navbar__auth-container">
          <li>
            <NavLink to="/auth/register">Registro</NavLink>
          </li>
          <li>
            <NavLink to="/auth/login">Iniciar Sesión</NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
}
