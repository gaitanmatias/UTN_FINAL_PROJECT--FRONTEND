import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAppointmentsByDate, createAppointment } from "../../../services/appointment.service";
import { useAuth } from "../../../hooks/useAuth";
import { jwtDecode } from "jwt-decode";
import "./AvailableAppointmentsPage.css";
import { usePageTitle } from "../../../hooks/usePageTitle";

function AvailableAppointmentsPage() {
  usePageTitle("Bookly | Reserva tu proximo turno");
  const { date } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [turnos, setTurnos] = useState({ scheduled: [], userCanceled: [] });
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarTurnos = async () => {
      try {
        const res = await getAppointmentsByDate(date, token);

        if (res?.data?.scheduled && res?.data?.userCanceled) {
          setTurnos(res.data);
        } else if (Array.isArray(res?.data)) {
            const dataArray = res.data || [];
          // Si no hay elementos devolvemos array vacío (caso admin sin turnos)
          if (dataArray.length === 0) {
            setTurnos({ scheduled: [], userCanceled: [] });
          } else {
            // normalizamos id del usuario local para evitar confusiones entre user.id y user.user._id
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
      alert("Debes verificar tu correo antes de reservar un turno.");
      throw new Error("Debes verificar tu correo antes de reservar un turno.");
    }

    try {
      await createAppointment(date, time, token);
      alert("¡Turno reservado correctamente!");
      navigate(`/profile/${user.userId}/my-appointments`);
    } catch (err) {
      alert(err.message);
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

  return (
  <div className="available-appointments-page">
    <div className="available-appointments-page__header">
      <h2 className="available-appointments-page__title">
        Turnos disponibles para el : <span className="available-appointments-page__title-date">{date}</span>
      </h2>
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
