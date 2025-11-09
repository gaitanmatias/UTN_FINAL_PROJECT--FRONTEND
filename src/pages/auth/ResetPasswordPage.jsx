import { useState } from "react";
import { resetPasswordUser } from "../../services/auth.service";
import { useNavigate, useParams } from "react-router-dom";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const { token } = useParams();
  
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
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await resetPasswordUser(token, {
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      });

      alert(response.message || "Contraseña restablecida correctamente");
      setFormData({
        newPassword: "",
        confirmPassword: "",
      });

      navigate("/auth/login");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="forgot-password-page">
      <h2>Recuperar contraseña</h2>
      <form onSubmit={handleSubmit}>
        <input type="password" name="newPassword" placeholder="Nueva contraseña" onChange={handleChange} value={formData.newPassword} required />
        <input type="password" name="confirmPassword" placeholder="Confirmar nueva contraseña" onChange={handleChange} value={formData.confirmPassword} required />
        <button type="submit">Restablecer contraseña</button>
      </form>
    </div>
  );
}