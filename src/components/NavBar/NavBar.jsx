// react
import { useState } from "react";

// dependencias externas
import { useNavigate, NavLink } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// hooks
import { useAuth } from "../../hooks/useAuth";

// constantes
import { ICONS } from "../../constants/icons";

// componentes
import ThemeToggleButton from "../ThemeToggleButton/ThemeToggleButton";

// estilos
import "./NavBar.css";

export default function NavBar() {
  const { isAuthenticated, user, logout, token } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isAdmin = token && jwtDecode(token).isAdmin;
  const getNavLinkClass = ({ isActive }) => 
    `navbar__link ${isActive ? 'navbar__link--active' : ''}`;

  return (
    <nav className="navbar">
      {/* Topbar: logo + (tema + hamburguesa) */}
      <div className="navbar__topbar">
        <div className="navbar__brand" onClick={() => navigate("/")}>
          <span className="navbar__logo">Bookly</span>
        </div>

        <div className="navbar__actions">
          <ThemeToggleButton />
          <button
            className="navbar__burger"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? ICONS.closeMenu : ICONS.openMenu}
          </button>
        </div>

      </div>

      {/* Links principales */}
      <div className={`navbar__links ${menuOpen ? "active" : ""}`}>
        <ul className="navbar__list">
          <li className="navbar__item" onClick={() => setMenuOpen(!menuOpen)}>
            <NavLink to="/" end className={getNavLinkClass}>
              Inicio
            </NavLink>
          </li>
          <li className="navbar__item" onClick={() => setMenuOpen(!menuOpen)}>
            <NavLink to="/appointments" end className={getNavLinkClass}>
              Turnos
            </NavLink>
          </li>
          {isAuthenticated && user && (
            <li className="navbar__item" onClick={() => setMenuOpen(!menuOpen)}>
              <NavLink to={`/profile/${user.id}`} className={getNavLinkClass}>
                Perfil
              </NavLink>
            </li>
          )}
        {isAdmin && (
              <li className="navbar__item" onClick={() => setMenuOpen(!menuOpen)}>
              <NavLink to="/admin-dashboard" className={getNavLinkClass}>
                Dashboard
              </NavLink>
            </li>
        )}
        </ul>
        {/* Zona de autenticación abajo del todo */}
        <div className="navbar__auth">
          {isAuthenticated && user ? (
            <div className="navbar__auth-group">
              {!user.isVerified && (
                <button
                  className="navbar__button navbar__button--verify"
                  onClick={() => {
                    setMenuOpen(!menuOpen);
                    navigate(`/profile/${user.id}`);
                  }}
                >
                  Verificar cuenta
                </button>
              )}
              <button
                className="navbar__button navbar__button--logout"
                onClick={() => {
                  logout();
                  setMenuOpen(!menuOpen);
                  navigate("/auth/login");
                }}
              >
                Cerrar sesión
              </button>
            </div>
          ) : (
            <div className="navbar__auth-group">
              <button
                className="navbar__button navbar__button--register"
                onClick={() => {
                  setMenuOpen(!menuOpen);
                  navigate("/auth/register")
                }}
              >
                Registrarse
              </button>
              <button
                className="navbar__button navbar__button--login"
                onClick={() => {
                  setMenuOpen(!menuOpen);
                  navigate("/auth/login")
                }}
              >
                Iniciar sesión
              </button>
            </div>
          )}
          <ThemeToggleButton />

        </div>
      </div>
    </nav>
  );
}
