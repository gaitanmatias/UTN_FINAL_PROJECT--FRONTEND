// react
import { useState } from "react";

// dependencias externas
import { NavLink, useNavigate, useParams } from "react-router-dom";

// hooks
import { usePageTitle } from "../../../hooks/usePageTitle";

// contextos
import { useUI } from "../../../context/UIContext";

// servicios
import { resetPasswordUser } from "../../../services/auth.service";

// constantes
import { ICONS } from "../../../constants/icons";

// estilos
import "./ResetPasswordPage.css";

export default function ResetPasswordPage() {
  usePageTitle("Bookly | Restablecer contraseña");
  const navigate = useNavigate();
  const { token } = useParams();
  const { showToast } = useUI();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validacion de contraseñas idénticas
    if (formData.newPassword !== formData.confirmPassword) {
      showToast({
        type: "error",
        message: "Las contraseñas no coinciden"
      })
      return;
    }

    try {
      setLoading(true);
      const response = await resetPasswordUser(token, {
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      });

      showToast({
        type: "success",
        message: (response.message || "Contraseña restablecida correctamente")
      })
      setFormData({
        newPassword: "",
        confirmPassword: "",
      });

      navigate("/auth/login");
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
    <div className="reset-password-page">
      <div className="reset-password-page__container">
        <div className="reset-password-page__header">
          <h2 className="reset-password-page__title">Restablecer contraseña</h2>
          <p className="reset-password-page__subtitle">Ingresa tu nueva contraseña para reestablecer tu contraseña</p>
        </div>
        <form className="reset-password-page__form" onSubmit={handleSubmit} >
          <div className="reset-password-page__form-group">
            <label htmlFor="email" className="reset-password-page__label">{ICONS.lock} Nueva contraseña</label>
            <input
              type="password"
              name="newPassword"
              placeholder="Nueva contraseña"
              onChange={handleChange}
              value={formData.newPassword}
              className="reset-password-page__input"
              required
            />
          </div>
          <div className="reset-password-page__form-group">
            <label htmlFor="email" className="reset-password-page__label">{ICONS.lock} Confirmar contraseña</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar contraseña"
              onChange={handleChange}
              value={formData.confirmPassword}
              className="reset-password-page__input"
              required
            />
          </div>
          <button disabled={loading} type="submit" className="reset-password-page__button">
            Reestablecer contraseña
          </button>
        </form>
        <div className="reset-password-page__divider">o</div>
        <div className="reset-password-page__links">
          <p className="reset-password-page__footer-text">
            ¿Recordaste tu contraseña?{" "}
            <NavLink to="/auth/login" className="reset-password-page__link">
              Iniciar sesión
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}