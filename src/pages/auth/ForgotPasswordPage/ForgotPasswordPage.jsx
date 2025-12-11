// react
import { useState } from "react";

// dependencias externas
import { NavLink, useNavigate } from "react-router-dom";

// hooks
import { usePageTitle } from "../../../hooks/usePageTitle";

// contextos
import { useUI } from "../../../context/UIContext";

// servicios
import { forgotPasswordUser } from "../../../services/auth.service";

// constantes
import { ICONS } from "../../../constants/icons";

// estilos
import "./ForgotPasswordPage.css";

export default function ForgotPasswordPage() {
  usePageTitle("Bookly | Olvidé mi contraseña");
  const navigate = useNavigate();
  const { showToast } = useUI();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await forgotPasswordUser({
        email: formData.email,
      });

      showToast({
        type: "success",
        message: (response.message || "Correo de recuperación enviado correctamente")
      })
      setFormData({
        email: "",
      });

    } catch (err) {
      showToast({
        type: "error",
        message: err.message
      })
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-page__container">
        <div className="forgot-password-page__header">
          <h2 className="forgot-password-page__title">Recuperar contraseña</h2>
          <p className="forgot-password-page__subtitle">Ingresa tu correo electrónica para recibir un correo de recuperación</p>
        </div>
        <form className="forgot-password-page__form" onSubmit={handleSubmit} >
          <div className="forgot-password-page__form-group">
            <label htmlFor="email" className="forgot-password-page__label">{ICONS.email} Correo electrónico</label>
            <input
              type="email"
              name="email"
              placeholder="tu@email.com"
              onChange={handleChange}
              value={formData.email}
              className="forgot-password-page__input"
              required
            />
          </div>
          <button disabled={loading} type="submit" className="forgot-password-page__button">
            Enviar correo de recuperación
          </button>
        </form>
        <div className="forgot-password-page__divider">o</div>
        <div className="forgot-password-page__links">
          <p className="forgot-password-page__footer-text">
            ¿No tenés una cuenta?{" "}
            <NavLink to="/auth/register" className="forgot-password-page__link">
              Registrate acá
            </NavLink>
          </p>
          <p className="forgot-password-page__footer-text">
            ¿Recordaste tu contraseña?{" "}
            <NavLink to="/auth/login" className="forgot-password-page__link">
              Iniciar sesión
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}