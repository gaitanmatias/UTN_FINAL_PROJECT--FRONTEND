import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { jwtDecode } from "jwt-decode";

export default function NavBar() {
  const { isAuthenticated, user, logout, token } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li>
          <NavLink to="/" end>Inicio</NavLink>
        </li>
        <li>
          <NavLink to="/appointments" end>Turnos</NavLink>
        </li>
      </ul>
      {token && jwtDecode(token).isAdmin ? 
        <li>
            <NavLink to={`/admin-dashboard`}>Dashboard</NavLink>
        </li>
        : null
      }
      {token && isAuthenticated && user ? (
        <ul>
          <li>
            <NavLink to={`/profile/${user.id}`}>Perfil</NavLink>
          </li>
          <li>
            <NavLink to={`/profile/${user.id}/my-appointments`}>Mis Turnos</NavLink>
          </li>
          <li>
            <button onClick={() => { logout(); navigate("/auth/login"); }}>Cerrar Sesión</button>
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
