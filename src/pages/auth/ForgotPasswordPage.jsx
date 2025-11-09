import { useState } from "react";
import { forgotPasswordUser } from "../../services/auth.service";
import { NavLink, useNavigate } from "react-router-dom";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  
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
      const response = await forgotPasswordUser({
        email: formData.email,
      });

      alert(response.message || "Correo de recuperación enviado correctamente");
      setFormData({
        email: "",
      });

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="forgot-password-page">
      <h2>Recuperar contraseña</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Correo electrónico" onChange={handleChange} value={formData.email} required />
        <button type="submit">Enviar correo de recuperación</button>
      </form>
      <p>¿No tienes una cuenta? <NavLink to="/auth/register">Registrate</NavLink></p>
      <p>¿Recordaste tu contraseña? <NavLink to="/auth/login">Iniciar sesión</NavLink></p>
    </div>
  );
}