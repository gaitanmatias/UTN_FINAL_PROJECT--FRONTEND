import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function NavBar() {
  const { isAuthenticated, user, logout, token } = useAuth();

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li>
          <NavLink to="/" end>Inicio</NavLink>
        </li>
      </ul>
      {token && isAuthenticated && user ? (
        <ul>
          <li>
            <NavLink to={`/profile/${user.id}`}>Perfil</NavLink>
          </li>
          <li>
            <button onClick={logout}>Cerrar Sesión</button>
          </li>
        </ul>
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
