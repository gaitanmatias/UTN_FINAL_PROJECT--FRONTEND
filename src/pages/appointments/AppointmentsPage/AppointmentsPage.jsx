// react
import { useState } from "react";

// dependencias externas
import { useNavigate } from "react-router-dom";

// hooks
import { useAuth } from "../../../hooks/useAuth";
import { usePageTitle } from "../../../hooks/usePageTitle";

// contextos
import { useUI } from "../../../context/UIContext";

// constantes
import { ICONS } from "../../../constants/icons";

// componentes
import CalendarBase from "../../../components/DateSelection/CalendarBase";

// estilos
import "./AppointmentsPage.css";

function AppointmentsPage() {
  usePageTitle("Bookly | Consulta disponibilidad de turnos");

  const navigate = useNavigate();
  const { token } = useAuth();
  const { showToast } = useUI();

  const [fecha, setFecha] = useState(null);

  const todayDate = new Date();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!token) {
      showToast({
        type: "error",
        message: "Debes iniciar sesión antes de continuar.",
      });
      navigate("/auth/login");
      return;
    }

    if (!fecha) {
      showToast({
        type: "error",
        message: "Por favor, seleccioná una fecha antes de continuar.",
      });
      return;
    }

    if (fecha < todayDate) {
      showToast({
        type: "error",
        message: "La fecha debe ser posterior a la fecha actual.",
      });
      return;
    }

    if (fecha > todayDate.setMonth(todayDate.getMonth() + 6)) {
      showToast({
        type: "error",
        message:
          "Como máximo puedes consultar disponibilidad de turnos a 6 meses.",
      });
      return;
    }

    navigate(`/appointments/available/${fecha.toISOString().split("T")[0]}`);
  };

  return (
    <div className="appointments-page">
      <section className="appointments-page__intro">
        <div className="appointments-page__header">
          <h2 className="appointments-page__title">
            Seleccioná una fecha para consultar disponibilidad de turno
          </h2>
          <p className="appointments-page__subtitle">
            Seleccioná la fecha que te quede más cómoda y descubrí los horarios
            disponibles en los que podrás reservar tu turno.
          </p>
        </div>

        <section className="appointments-page__filters">
          <form onSubmit={handleSubmit} className="appointments-page__form">
            <CalendarBase onDateChange={setFecha} />

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
            Recordá que podés reservar turnos con hasta{" "}
            <strong>6 meses de anticipación</strong>.
          </p>
        </div>

        <div className="appointments-page__reminder">
          <i className="appointments-page__reminder-icon">
            {ICONS.checkSuccess}
          </i>
          <p className="appointments-page__reminder-text">
            Una vez que elijas la fecha, te mostraremos los horarios disponibles.
          </p>
        </div>
      </section>
    </div>
  );
}

export default AppointmentsPage;