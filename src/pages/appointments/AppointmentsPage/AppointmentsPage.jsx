import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ICONS } from "../../../constants/icons";
import "./AppointmentsPage.css";

function AppointmentsPage() {
  const [fecha, setFecha] = useState("");
  const navigate = useNavigate();

  const todayDate = new Date().toISOString().split("T")[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fecha) {
      alert("Por favor, seleccioná una fecha antes de continuar.");
      return;
    }
    if (fecha < todayDate) {
      alert("La fecha debe ser posterior a la fecha actual.");
      return;
    }
    navigate(`/appointments/available/${fecha}`);
  };

  const handleFechaChange = (e) => {
    setFecha(e.target.value);
  };

  return (
    <div className="appointments-page">
      <section className="appointments-page__intro">
        <div className="appointments-page__header">
          <h2 className="appointments-page__title">Seleccioná una fecha para consultar disponibilidad de turno</h2>
          <p className="appointments-page__subtitle">
            Seleccioná la fecha que te quede más cómoda y descubrí los horarios disponibles en los que podrás reservar tu turno.
            Actualizamos la disponibilidad constantemente, así que siempre vas a ver los turnos más recientes.
          </p>
        </div>

        {/* Selector de fecha */}
        <section className="appointments-page__filters">
          <form onSubmit={handleSubmit} className="appointments-page__form">
            <input
              id="fecha-input"
              type="date"
              value={fecha}
              onChange={handleFechaChange}
              className="appointments-page__date-input"
            />
            <button type="submit" className="appointments-page__form-button">
              Ver turnos disponibles
            </button>        
          </form>
        </section>
      </section>

      <hr className="appointments-page__divider" />

      <section className="appointments-page__info">
        <div className="appointments-page__reminder">
          <i className="appointments-page__reminder-icon">
            {ICONS.calendar}
          </i> 
          <p className="appointments-page__reminder-text">
            Recordá que podés reservar turnos con hasta <strong>6 meses de anticipación</strong>.  
          Si no hay disponibilidad para la fecha seleccionada, probá con otro día o volvé a consultar más adelante.
          </p>
        </div>
        <div className="appointments-page__reminder">
          <i className="appointments-page__reminder-icon">
            {ICONS.checkSuccess}   
          </i>
          <p className="appointments-page__reminder-text">
            Una vez que elijas la fecha, te mostraremos los horarios disponibles para que puedas confirmar tu turno fácilmente.
          </p>
        </div>
      </section>
      
    </div>
  );
}

export default AppointmentsPage;
