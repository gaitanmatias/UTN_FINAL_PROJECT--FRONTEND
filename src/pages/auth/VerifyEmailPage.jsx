import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { verifyEmailConfirmation } from "../../services/auth.service.js";

function VerifyEmailPage() {
  const { token } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleVerify = async () => {
      try {
        const response = await verifyEmailConfirmation(token);
        if (response.ok) {
          setIsError(false);
          setMessage(response.message || "Tu cuenta fue verificada exitosamente ✅");
        } else {
          setIsError(true);
          setMessage(response.message || "No se pudo verificar tu cuenta.");
        }
      } catch (error) {
        setIsError(true);
        setMessage("El enlace de verificación no es válido o expiró.");
      } finally {
        setIsLoading(false);
      }
    };

    if (token) handleVerify();
  }, [token]);

  if (isLoading) return <p>Verificando tu cuenta...</p>;

  return (
    <div>
      <h2>{isError ? "Error" : "Éxito"}</h2>
      <p>{message}</p>
      {isError && (
        <button onClick={() => navigate("/profile")}>Volver a intentar</button>
      )}
    </div>
  );
}

export default VerifyEmailPage;
