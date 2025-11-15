import React, { useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { sendEmailVerification } from "../../../services/auth.service.js";
import { ICONS } from "../../../constants/icons";
import "./ProfilePage.css";
import { usePageTitle } from "../../../hooks/usePageTitle";

function ProfilePage() {
  const { user, isAuthenticated, token } = useAuth();
  usePageTitle(`Bookly | ${user.firstName} - Perfil`);
  const navigate = useNavigate();

  // Si no está autenticado → redirigir
  useEffect(() => {
    if (!isAuthenticated) {
      alert("Debes iniciar sesión para acceder a tu perfil");
      navigate("/auth/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const handleSendVerification = async () => {
    try {
      await sendEmailVerification(token);
      alert("Correo de verificación enviado.");
    } catch (error) {
      alert("Ocurrió un error al enviar la verificación.");
      console.error(error);
    }
  };

  // Si el usuario NO está verificado

  // Si el usuario SÍ está verificado — mostrar datos
  return (
    <div className="profile-page">
      <header className="profile-page__header">
        <h1 className="profile-page__title">Mi Perfil</h1>
        <p className="profile-page__subtitle">
          Visualiza tu información y accedé al gestor de turnos.
        </p>
      </header>

      <div className="profile-page__container">
        <div className="profile-page__info">
          <div className="profile-page__info-item">
            <p className="profile-page__info-title">
              {ICONS.user}
              Nombre:
            </p>
            <span className="profile-page__info-data profile-page__info-data-name">
              {user?.firstName}
            </span>
          </div>
          <div className="profile-page__info-item">
            <p className="profile-page__info-title">{ICONS.user}Apellido:</p>
            <span className="profile-page__info-data profile-page__info-data-name">
              {user?.lastName}
            </span>
          </div>

          <div className="profile-page__info-item">
            <p className="profile-page__info-title">{ICONS.email}Email:</p>
            <span className="profile-page__info-data">{user?.email}</span>
          </div>

          <div className="profile-page__info-item">
            <p className="profile-page__info-title">
              {ICONS.smartphone}Teléfono:
            </p>
            <span className="profile-page__info-data">
              {user?.phoneNumber || "No cargado"}
            </span>
          </div>

          {!user?.isVerified ? (
            <div className="profile-page__not-verified--container">
              <div className="profile-page__not-verified--header">
                <i className="profile-page__not-verified--icon">
                  {ICONS.alertError}
                </i>
                <h2 className="profile-page__not-verified--title">
                Tu cuenta no está verificada aún
              </h2>
              </div>
              <button
                className="profile-page__not-verified--verify-button"
                onClick={handleSendVerification}
              >
                Enviar verificación
              </button>
            </div>
          ) : (
            <div className="profile-page__verified">
              <i className="profile-page__verified-icon">
                {ICONS.checkSuccess}
              </i>
              <p className="profile-page__info-title">Cuenta verificada</p>
            </div>
          )}
        </div>

        <hr className="profile-page__divider" />

        <button
          className="profile-page__turns-button"
          onClick={() => navigate(`/profile/${user._id}/my-appointments`)}
        >
          Ver mis turnos
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
