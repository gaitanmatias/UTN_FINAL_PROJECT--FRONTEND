import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserAppointments, updateAppointment } from "../../services/appointment.service";
import { useAuth } from "../../hooks/useAuth";

function MyAppointmentsPage() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [turnos, setTurnos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarTurnos = async () => {
      try {
        const res = await getUserAppointments(token);
        const data = Array.isArray(res) ? res : res.data;
        setTurnos(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };
    cargarTurnos();
  }, [token]);

  const handleCancelar = async (appointment) => {
    const id = appointment._id;

    if (!id) {
      alert("ID de turno no encontrado.");
      return;
    }

    if (!confirm("¿Seguro que deseas cancelar este turno?")) return;
    try {
      await updateAppointment(id, "canceled", token);
      alert("Turno cancelado correctamente.");

      // Actualiza estado de los turnos proximos excluyendo el turno cancelado (solo de forma local)
      setTurnos((prev) =>
        prev.map((t) =>
          (t._id) === id ? { ...t, status: "canceled" } : t
        )
      );
    } catch (err) {
      alert(err.message);
    }
  };

  if (cargando) return <p>Cargando tus turnos...</p>;
  if (error) return <p>Error: {error}</p>;

  const proximos = turnos.filter((t) => t.status === "scheduled");
  const historial = turnos.filter((t) => t.status !== "scheduled");

  return (
    <div>
      <h2>Mis turnos</h2>

      <section>
        <h3>Próximos turnos</h3>
        {proximos.length > 0 ? (
          proximos.map((t) => (
            <div key={t._id}>
              <p>📅 {t.date} - 🕐 {t.time}</p>
              <button onClick={() => handleCancelar(t)}>
                Cancelar turno
              </button>
            </div>
          ))
        ) : (
          <p>No tienes turnos próximos.</p>
        )}
      </section>

      <hr />

      <section>
        <h3>Historial</h3>
        {historial.length > 0 ? (
          historial.map((t) => (
            <div key={t._id}>
              <p>
                📅 {t.date} - 🕐 {t.time} — Estado: {t.status}
              </p>
            </div>
          ))
        ) : (
          <p>No tienes historial de turnos.</p>
        )}
      </section>

      <hr />

      <button onClick={() => navigate("/appointments")}>
        Reservar nuevo turno
      </button>
    </div>
  );
}

export default MyAppointmentsPage;
