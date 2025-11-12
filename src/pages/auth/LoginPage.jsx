import { useState } from "react";
import { loginUser } from "../../services/auth.service";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { jwtDecode } from "jwt-decode";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      const response = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      alert(response.message || "Iniciaste sesión correctamente");
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
      alert(err.message);
    }
  };

  return (
    <div className="login-page">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Correo electrónico" onChange={handleChange} value={formData.email} required />
        <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} value={formData.password} required />
        <button type="submit">Iniciar sesión</button>
      </form>
      <p>¿No tienes una cuenta? <NavLink to="/auth/register">Registrate</NavLink></p>
      <p>¿Olvidaste tu contraseñas? <NavLink to="/auth/forgot-password">Recuperar contraseñas</NavLink></p>
    </div>
  );
}