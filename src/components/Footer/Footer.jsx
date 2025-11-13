import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css";
import { ICONS } from "../../constants/icons";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        {/* Marca y descripción */}
        <div className="footer__brand">
          <h2 className="footer__logo">Bookly</h2>
          <p className="footer__description">
            Simplificamos la forma en que reservás tus turnos.  
            Rápido, moderno y sin complicaciones.
          </p>
        </div>

        {/* Enlaces rápidos */}
        <div className="footer__section footer__section--links">
          <h4 className="footer__title">Enlaces rápidos</h4>
          <ul className="footer__list">
            <li className="footer__item">
              <NavLink to="/" className="footer__link">Inicio</NavLink>
            </li>
            <li className="footer__item">
              <NavLink to="/appointments" className="footer__link">Reservar</NavLink>
            </li>
            <li className="footer__item">
              <NavLink to="/auth/login" className="footer__link">Iniciar sesión</NavLink>
            </li>
            <li className="footer__item">
              <NavLink to="/auth/register" className="footer__link">Registro</NavLink>
            </li>
          </ul>
        </div>

        {/* Contacto */}
        <div className="footer__section footer__section--contact">
          <h4 className="footer__title">Contacto</h4>
          <ul className="footer__list">
            <li className="footer__item footer__item--contact" title="Información a modo de ejemplo">
              { ICONS.email }
              contacto@bookly.com
            </li>
            <li className="footer__item footer__item--contact" title="Información a modo de ejemplo">
              { ICONS.phone }
              +54 11 2345-6789
            </li>
            <li className="footer__item footer__item--contact" title="Información a modo de ejemplo">
              { ICONS.location }
              Buenos Aires, Argentina
            </li>
          </ul>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="footer__bottom">
        <p className="footer__copy">
          Proyecto desarrollado por 
          <NavLink to="https://github.com/gaitanmatias" target="_blank" className="footer__link">Matías Gaitán</NavLink> 
          para el curso de <strong>Programación Web Full-Stack</strong> de <strong>UTN</strong>.
        </p>
        <small className="footer__copy">
          © {new Date().getFullYear()} <strong>Bookly</strong> — Todos los derechos reservados.
        </small>
      </div>
    </footer>
  );
}

export default Footer;
