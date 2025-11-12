import { useEffect, useState } from "react";
import { getAppointmentsByDate, updateAppointment } from "../../services/appointment.service";
import { useAuth } from "../../hooks/useAuth";

function AdminDashboardPage() {
  const { token } = useAuth();
  const [turnos, setTurnos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // Fecha actual formateada YYYY-MM-DD
  const fechaActual = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const cargarTurnos = async () => {
      try {
        const res = await getAppointmentsByDate(fechaActual, token);
        setTurnos(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };
    cargarTurnos();
  }, [fechaActual, token]);
  

  const handleActualizarEstado = async (appointmentId, nuevoEstado) => {
    const confirmMsg =
      nuevoEstado === "completed"
        ? "¿Está seguro que quiere marcar este turno como completado?"
        : "¿Está seguro que quiere cancelar este turno?";
    
    if (!window.confirm(confirmMsg)) return;

    try {
      await updateAppointment(appointmentId, nuevoEstado, token);
      alert("Turno actualizado correctamente");

      // Actualiza estado local sin recargar
      setTurnos(prev =>
        prev.map(t =>
          t._id === appointmentId ? { ...t, status: nuevoEstado } : t
        )
      );
    } catch (err) {
      alert(err.message);
    }
  };

  if (cargando) return <p>Cargando turnos del día...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Dashboard de Administrador - Turnos del {fechaActual}</h2>
      {turnos.length === 0 ? (
        <p>No hay turnos para hoy.</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Hora</th>
              <th>Usuario</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {turnos.map(t => (
              <tr key={t._id}>
                <td>{t.time}</td>
                <td>{t.userId?.firstName} {t.userId?.lastName}</td>
                <td>{t.userId?.email}</td>
                <td>{t.userId?.phoneNumber}</td>
                <td>{t.status}</td>
                <td>
                  {t.status === "scheduled" && (
                    <>
                      <button onClick={() => handleActualizarEstado(t._id, "completed")}>
                        Completar
                      </button>
                      <button onClick={() => handleActualizarEstado(t._id, "canceled")}>
                        Cancelar
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminDashboardPage;
