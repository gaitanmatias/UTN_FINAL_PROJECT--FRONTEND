import { useState } from "react";
import { loginUser } from "../../../services/auth.service";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { jwtDecode } from "jwt-decode";
import { ICONS } from "../../../constants/icons";
import "./LoginPage.css";
import { usePageTitle } from "../../../hooks/usePageTitle";
import { useUI } from "../../../context/UIContext";

export default function LoginPage() {
  usePageTitle("Bookly | Iniciar sesión");
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useUI();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // Limpiar error al escribir
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const response = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      showToast({
        type: "success",
        message: (response.message || "¡Iniciaste sesión correctamente!")
      })
      setFormData({
        email: "",
        password: "",
      });

      await login(response.token);
      if (jwtDecode(response.token).isAdmin) {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message || "Error al iniciar sesión. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
        <div className="login-page__container">
          <div className="login-page__header">
            <h1 className="login-page__title">Iniciar sesión</h1>
            <p className="login-page__subtitle">
              Ingresá tus datos para acceder a tu cuenta y gestionar tus turnos.
            </p>
          </div>

          {error && (
            <div className="login-page__alert login-page__alert--error">
              <span className="login-page__alert-icon">{ICONS.alertError}</span>
              <span className="login-page__alert-text">{error}</span>
            </div>
          )}

          <form className="login-page__form" onSubmit={handleSubmit}>
            <div className="login-page__form-group">
              <label htmlFor="email" className="login-page__label">
                {ICONS.email} Correo electrónico
              </label>
              <input
                id="email"
                className="login-page__input"
                type="email"
                name="email"
                placeholder="tu@email.com"
                onChange={handleChange}
                value={formData.email}
                required
              />
            </div>

            <div className="login-page__form-group">
              <label htmlFor="password" className="login-page__label">
                {ICONS.lock} Contraseña
              </label>
              <input
                id="password"
                className="login-page__input"
                type="password"
                name="password"
                placeholder="••••••••"
                onChange={handleChange}
                value={formData.password}
                required
              />
            </div>

            <button
              type="submit"
              className="login-page__button btn"
              disabled={loading}
            >
              {loading ? "🔄 Cargando..." : "Iniciar sesión"}
            </button>
          </form>

          <div className="login-page__divider">o</div>

          <div className="login-page__links">
            <NavLink to="/auth/forgot-password" className="login-page__link login-page__link--forgot">
              ¿Olvidaste tu contraseña?
            </NavLink>
          </div>

          <div className="login-page__footer">
            <p className="login-page__footer-text">
              ¿No tenés una cuenta?{" "}
              <NavLink to="/auth/register" className="login-page__link login-page__link--highlight">
                Registrate acá
              </NavLink>
            </p>
        </div>
      </div>
    </main>
  );
}