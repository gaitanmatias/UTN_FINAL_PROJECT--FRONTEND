import { useState } from "react";
import { registerUser } from "../../../services/auth.service";
import { NavLink, useNavigate } from "react-router-dom";
import { ICONS } from "../../../constants/icons";
import "./RegisterPage.css";
import { usePageTitle } from "../../../hooks/usePageTitle";

export default function RegisterPage() {
  usePageTitle("Bookly | Registro");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
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

    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    if (formData.password.length < 8) {
      alert("La contraseña debe tener al menos 8 caracteres");
      return;
    }
    if (!formData.phoneNumber.match(/^\+\d{2}\d{10}$/)) {
      alert("El número de teléfono debe tener el siguiente formato: +541122334455");
      return;
    }

    try {
      const response = await registerUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        password: formData.password,
      });

      alert(response.message || "Usuario registrado correctamente");

      setFormData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      navigate("/auth/login");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="register-page">
      <div className="register-page__container">
        <div className="register-page__header">
          <h2 className="register-page__title">Crear cuenta</h2>
          <p className="register-page__subtitle">
            Completá tus datos para registrarte en <strong>Bookly</strong> y empezar a reservar tus turnos.
          </p>
        </div>


        <form className="register-page__form" onSubmit={handleSubmit}>
          <div className="register-page__form-group">
            <label htmlFor="email" className="login-page__label">
              {ICONS.user} Nombre y Apellido
            </label>
            <input
              className="register-page__input"
              name="firstName"
              placeholder="Nombre"
              onChange={handleChange}
              value={formData.firstName}
              required
            />
            <input
              className="register-page__input"
              name="lastName"
              placeholder="Apellido"
              onChange={handleChange}
              value={formData.lastName}
              required
            />
          </div>

          <div className="register-page__form-group">
            <label htmlFor="phoneNumber" className="login-page__label">
              {ICONS.smartphone} Número de teléfono
            </label>
          <input
            className="register-page__input"
            name="phoneNumber"
            placeholder="Teléfono (+541122334455)"
            onChange={handleChange}
            value={formData.phoneNumber}
            required
          />
          </div>

          <div className="register-page__form-group">
            <label htmlFor="email" className="login-page__label">
              {ICONS.email} Correo electrónico
            </label>
            <input
              className="register-page__input"
              type="email"
              name="email"
              placeholder="Correo electrónico"
              onChange={handleChange}
              value={formData.email}
              required
            />
          </div>

          <div className="register-page__form-group">
            <label htmlFor="password" className="login-page__label">
              {ICONS.lock} Contraseña
            </label>
            <input
              className="register-page__input"
              type="password"
              name="password"
              placeholder="Contraseña"
              onChange={handleChange}
              value={formData.password}
              required
            />
          </div>

          <div className="register-page__form-group">
            <label htmlFor="confirmPassword" className="login-page__label">
              {ICONS.lock} Confirmar contraseña
            </label>
            <input
              className="register-page__input"
              type="password"
              name="confirmPassword"
              placeholder="Confirmar contraseña"
              onChange={handleChange}
              value={formData.confirmPassword}
              required
            />
          </div>


          <button type="submit" className="register-page__button register-page__button--primary">
            Registrarse
          </button>
        </form>

        <div className="login-page__divider">o</div>

        <div className="register-page__footer">
          <p>
            ¿Ya tenés una cuenta?{" "}
            <NavLink to="/auth/login" className="register-page__link">
              Iniciá sesión
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
