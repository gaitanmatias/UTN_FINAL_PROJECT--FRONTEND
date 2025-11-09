import { useState } from "react";
import { registerUser } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";


export default function RegisterPage() {
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

    // Validacion de contraseñas idénticas
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    // Validacion de longitud mínima de contraseña
    if (formData.password.length <= 8 || formData.confirmPassword.length <= 8) {
      alert("La contraseña debe tener al menos 8 caracteres");
      return;
    }
    // Validacion de longitud de número de teléfono
    if (!formData.phoneNumber.match(/^\+\d{2}\d{10}$/)) {
      alert("El número de teléfono debe tener el siguiente formato: +541122334455");
      return;
    }
    if (formData.password.length <= 8 || formData.confirmPassword.length <= 8) {
      alert("La contraseña debe tener al menos 8 caracteres");
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
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input name="firstName" placeholder="Nombre" onChange={handleChange} value={formData.firstName} required />
        <input name="lastName" placeholder="Apellido" onChange={handleChange} value={formData.lastName} required />
        <input name="phoneNumber" placeholder="Teléfono (+541122334455)" onChange={handleChange} value={formData.phoneNumber} required />
        <input type="email" name="email" placeholder="Correo electrónico" onChange={handleChange} value={formData.email} required />
        <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} value={formData.password} required />
        <input type="password" name="confirmPassword" placeholder="Confirmar contraseña" onChange={handleChange} value={formData.confirmPassword} required />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}
