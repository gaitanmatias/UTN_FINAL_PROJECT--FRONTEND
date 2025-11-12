import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAppointmentsByDate, createAppointment } from "../../services/appointment.service";
import { useAuth } from "../../hooks/useAuth";
import { jwtDecode } from "jwt-decode";

function AvailableAppointmentsPage() {
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

      // Valida si la respuesta tiene scheduled y userCanceled
      if (res?.data?.scheduled && res?.data?.userCanceled) {
        setTurnos(res.data);
      } else if (Array.isArray(res?.data)) {
        // Si es array plano (admin), lo asigna a scheduled y userCanceled vacío
        setTurnos({ scheduled: res.data, userCanceled: [] });
      } else {
        setTurnos({ scheduled: [], userCanceled: [] });
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
      alert("Turno reservado correctamente");
      navigate(`/profile/${user.userId}/my-appointments`);
    } catch (err) {
      alert(err.message);
    }
  };

  if (cargando) return <p>Cargando turnos disponibles...</p>;
  if (error) return <p>Error: {error}</p>;

  // Genera horarios entre 09:00 y 16:30
  const generarHorarios = () => {
    const horarios = [];
    for (let time = 9; time <= 16; time++) {
      horarios.push(`${time.toString().padStart(2, "0")}:00`);
      horarios.push(`${time.toString().padStart(2, "0")}:30`);
    }
    return horarios;
  };

  // Obtiene los horarios de los arrays
  const horariosOcupados = turnos.scheduled.map((t) => t.time);
  const horariosCancelados = turnos.userCanceled.map((t) => t.time);

  return (
    <div>
      <h2>Turnos disponibles para el {date}</h2>

      {generarHorarios().map((time) => {
        const ocupado = horariosOcupados.includes(time);
        const cancelado = horariosCancelados.includes(time);

        return (
          <div key={time}>
            <span>{time}</span>
            <button
              onClick={() => handleReservar(time)}
              disabled={ocupado || cancelado}
            >
              {ocupado
                ? "No disponible (reservado)"
                : cancelado
                ? "Ya cancelaste este turno"
                : "Reservar"}
            </button>
          </div>
        );
      })}

      <button onClick={() => navigate("/appointments")}>
        Volver a seleccionar fecha
      </button>
    </div>
  );
}

export default AvailableAppointmentsPage;
