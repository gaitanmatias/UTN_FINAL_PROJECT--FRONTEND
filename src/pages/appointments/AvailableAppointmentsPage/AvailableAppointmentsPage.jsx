// react
import { useEffect, useState } from "react";

// dependencias externas
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// hooks
import { useAuth } from "../../../hooks/useAuth";
import { usePageTitle } from "../../../hooks/usePageTitle";

// contextos
import { useUI } from "../../../context/UIContext";

// servicios
import { getAppointmentsByDate, createAppointment } from "../../../services/appointment.service";

// componentes
import DatePicker from "../../../components/DateSelection/DatePicker";

// estilos
import "./AvailableAppointmentsPage.css";

function AvailableAppointmentsPage() {
  usePageTitle("Bookly | Reserva tu proximo turno");
  const { date } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [turnos, setTurnos] = useState({ scheduled: [], userCanceled: [] });
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const { showToast } = useUI();
  
  useEffect(() => {
    const cargarTurnos = async () => {
      try {
        const res = await getAppointmentsByDate(date, token);

        if (res?.data?.scheduled && res?.data?.userCanceled) {
          setTurnos(res.data);
        } else if (Array.isArray(res?.data)) {
            const dataArray = res.data || [];
          // Si no hay elementos retorna array vacío (caso admin sin turnos)
          if (dataArray.length === 0) {
            setTurnos({ scheduled: [], userCanceled: [] });
          } else {
            const localUserId = user?.user?._id || user?.id || user?._id;

            const scheduled = dataArray.filter((turno) => turno.status === "scheduled");
            const userCanceled = dataArray.filter((turno) => turno.status === "canceled" && ((turno.userId && (turno.userId._id || turno.userId.toString())) === localUserId?.toString()));
            setTurnos({ scheduled, userCanceled });
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    cargarTurnos();
  }, [date, token]);

  const handleReservar = async (time) => {
    if (!jwtDecode(token).isVerified) {
      showToast({
        type: "error",
        message: "Debes verificar tu correo antes de reservar un turno."
      })
      throw new Error("Debes verificar tu correo antes de reservar un turno.");
    }

    try {
      await createAppointment(date, time, token);
      showToast({
        type: "success",
        message: "Turno reservado correctamente!"
      })
      navigate(`/profile/${user.userId}/my-appointments`);
    } catch (err) {
      showToast({
        type: "error",
        message: err.message
      })
    }
  };

  if (cargando) return <p>Cargando turnos disponibles...</p>;
  if (error) return <p>Error: {error}</p>;

  const generarHorarios = () => {
    const horarios = [];
    for (let time = 9; time <= 16; time++) {
      horarios.push(`${time.toString().padStart(2, "0")}:00`);
      horarios.push(`${time.toString().padStart(2, "0")}:30`);
    }
    return horarios;
  };

  const horariosOcupados = turnos.scheduled.map((t) => t.time);
  const horariosCancelados = turnos.userCanceled.map((t) => t.time);

  // Helpers para el calendario 
  const formatDateForURL = (dateObj) => {
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObj.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  
  const handleDateChange = (newDate) => {
    const today = new Date();
    const maxDate = new Date(
      today.getFullYear(),
      today.getMonth() + 6,
      today.getDate()
    );
  
    if (newDate < today || newDate > maxDate) {
      showToast({
        type: "error",
        message: "La fecha seleccionada no es válida."
      });
      return;
    }
  
    const formatted = formatDateForURL(newDate);
  
    if (formatted !== date) {
      navigate(`/appointments/available/${formatted}`);
    }
  };

  return (
  <div className="available-appointments-page">
    <div className="available-appointments-page__header">
      <h2 className="available-appointments-page__title">Turnos disponibles para el :</h2>
      <DatePicker 
        className="available-appointments-page__title-date"
        value={date}
        onDateChange={handleDateChange}
      />
      <p className="available-appointments-page__subtitle">
        Seleccioná el horario que mejor se adapte a tu disponibilidad.  
        Los turnos se actualizan constantemente, así que si no ves disponibilidad, probá más tarde.
      </p>
    </div>

    <section className="available-appointments-page__list">
      {generarHorarios().map((time) => {
        const ocupado = horariosOcupados.includes(time);
        const cancelado = horariosCancelados.includes(time);

        return (
          <div
            key={time}
            className={`available-appointments-page__item ${
              ocupado
                ? "available-appointments-page__item--ocupado"
                : cancelado
                ? "available-appointments-page__item--cancelado"
                : ""
            }`}
          >
            <span className="available-appointments-page__time">{time}</span>
            <button
              onClick={() => handleReservar(time)}
              disabled={ocupado || cancelado}
              className={`available-appointments-page__button ${
                ocupado
                  ? "available-appointments-page__button--ocupado"
                  : cancelado
                  ? "available-appointments-page__button--cancelado"
                  : "available-appointments-page__button--disponible"
              }`}
            >
              {ocupado
                ? "No disponible"
                : cancelado
                ? "Ya cancelaste este turno"
                : "Reservar"}
            </button>
          </div>
        );
      })}
    </section>

    <hr className="available-appointments-page__divider" />

    <section className="available-appointments-page__extra">
      <p className="available-appointments-page__text">
        Recordá que los turnos pueden reservarse con hasta <strong>6 meses de anticipación</strong>.
      </p>
      <div className="available-appointments-page__actions">
        <button
          onClick={() => navigate("/appointments")}
          className="available-appointments-page__actions-back"
        >
          Volver a seleccionar fecha
        </button>
      </div>
    </section>
  </div>
);
}

export default AvailableAppointmentsPage;
