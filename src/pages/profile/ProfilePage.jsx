import React, { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { sendEmailVerification } from "../../services/auth.service.js";

function ProfilePage() {
  const { user, isAuthenticated, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      alert("Debes iniciar sesión para acceder a tu perfil");
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const handleSendVerification = async () => {
    try {
      await sendEmailVerification(token);
    } catch (error) {
      alert("Ocurrió un error al enviar el correo de verificación.");
      console.error(error);
    }
  };

  if (!user?.isVerified) {
    return (
      <div>
        <h2>Tu cuenta aún no está verificada</h2>
        <button onClick={handleSendVerification}>Verificar cuenta</button>
      </div>
    );
  }

  return <p>Tu perfil está verificado ✅</p>;
}

export default ProfilePage;
