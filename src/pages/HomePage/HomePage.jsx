import { NavLink } from "react-router-dom";

import { usePageTitle } from "../../hooks/usePageTitle";

import "./HomePage.css";

function HomePage() {
  usePageTitle("Bookly | Inicio");
  return (
    <div className="home-page">
      <section className="home-page__intro">
        <h1 className="home-page__intro-title">Bienvenido a <span className="home-page__intro-brand">Bookly</span></h1>
        <p className="home-page__intro-text">
          Gestioná tus turnos de forma rápida, sencilla y desde cualquier dispositivo.
          Elegí la fecha, encontrá un horario disponible y confirmá tu reserva en segundos.
        </p>
        <div className="home-page__intro-actions">
          <NavLink to="/appointments" className="home-page__intro-button">Reservar turno</NavLink>
        </div>
      </section>
      <hr className="home-page__divider" />
      <section className="home-page__features">
        <h2 className="home-page__features-title">¿Por qué usar Bookly?</h2>
        <ul className="home-page__features-list">
          <li className="home-page__features-item">
            <h3 className="home-page__features-item-title">Rápido y simple</h3>
            <p className="home-page__features-item-text">Reservá o cancelá tus turnos en pocos clics.</p>
          </li>
          <li className="home-page__features-item">
            <h3 className="home-page__features-item-title">100% online</h3>
            <p className="home-page__features-item-text">Sin llamadas ni esperas, todo desde tu cuenta.</p>
          </li>
          <li className="home-page__features-item">
            <h3 className="home-page__features-item-title">Actualizado en tiempo real</h3>
            <p className="home-page__features-item-text">Disponibilidad y horarios siempre al día.</p>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default HomePage;
