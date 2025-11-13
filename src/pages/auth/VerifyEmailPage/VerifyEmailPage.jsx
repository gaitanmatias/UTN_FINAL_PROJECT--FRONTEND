import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { verifyEmailConfirmation } from "../../../services/auth.service.js";
import "./VerifyEmailPage.css";
import { ICONS } from "../../../constants/icons";

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
    <div className="verify-email-page">
      <div className="verify-email-page__container">
        <div
          className={`verify-email-page__status-icon ${
            isError
            ? "verify-email-page__status-icon--error"
            : "verify-email-page__status-icon--success"
          }`}
        >
          {isError ? ICONS.alertError : ICONS.checkSuccess}
        </div>
        <div className="verify-email-page__content">
          <h2 className="verify-email-page__title">
            {isError ? "Error al verificar" : "¡Correo verificado!"}
          </h2>
            <p className="verify-email-page__message">{message}</p>
          {isError && (
            <button
              onClick={() => navigate("/profile")}
              className="verify-email-page__button"
            >
              Volver a intentar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default VerifyEmailPage;
