import { useNavigate } from 'react-router-dom';

import { usePageTitle } from "../../hooks/usePageTitle";

import { ICONS } from "../../constants/icons";

import './NotFoundPage.css';

export default function NotFoundPage() {
  usePageTitle("Bookly | 404 - Página no encontrada");
  const navigate = useNavigate();

  return (
    <div>
      <nav className="navbar">
      {/* Topbar: logo + (tema + hamburguesa) */}
      <div className="navbar__topbar">
        <div className="navbar__brand" onClick={() => navigate("/")}>
          <span className="navbar__logo">Bookly</span>
        </div>
        </div>
      </nav>
      <main className="notfound-page">
        <section className="notfound-page__hero">
          <div className="notfound-page__illustration" aria-hidden>
            <span className="notfound-page__emoji">{ICONS.search}</span>
          </div>

          <div className="notfound-page__content">
            <h1 className="notfound-page__title">404 — Página no encontrada</h1>
            <p className="notfound-page__text">
              Lo sentimos, la dirección a la que intentás acceder no existe o fue movida.
              Probá alguno de los enlaces debajo o volvé al inicio.
            </p>

            <div className="notfound-page__actions">
              <button
                className="notfound-page__button"
                onClick={() => navigate('/')}
              >
                Ir al inicio
              </button>

              <button
                className="notfound-page__button notfound-page__button--ghost"
                onClick={() => navigate('/appointments')}
              >
                Ver turnos
              </button>
            </div>

            <button
              className="notfound-page__back"
              onClick={() => navigate(-1)}
            >
              ← Volver atrás
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}