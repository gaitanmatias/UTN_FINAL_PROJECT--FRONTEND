import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserAppointments, updateAppointment } from "../../../services/appointment.service";
import { useAuth } from "../../../hooks/useAuth";
import { ICONS } from "../../../constants/icons";
import "./MyAppointmentsPage.css";
import { usePageTitle } from "../../../hooks/usePageTitle";

function MyAppointmentsPage() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [turnos, setTurnos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const { user } = useAuth();
  usePageTitle(`Bookly | ${user.firstName} - Mis turnos`);
  
  useEffect(() => {
    const cargarTurnos = async () => {
      try {
        const res = await getUserAppointments(token);
        const data = Array.isArray(res) ? res : res.data;
        console.log(data);
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

      setTurnos((prev) =>
        prev.map((t) => (t._id === id ? { ...t, status: "canceled" } : t))
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
    <div className="my-appointments-page">
      <div className="my-appointments-page__header">
        <h2 className="my-appointments-page__title">{ICONS.calendar} Panel de usuario</h2>
        <p className="my-appointments-page__subtitle">Consulta tus turnos y cancelá los que desees.</p>
      </div>
      <section className="my-appointments-page__appointments-container">
        {/* --- Próximos turnos --- */}
      <section className="my-appointments-page__section">
        <h3 className="my-appointments-page__section-title">Próximos turnos</h3>

        {proximos.length > 0 ? (
          proximos.map((t) => (
            <div key={t._id} className="my-appointments-page__card">
              <div className="my-appointments-page__info">
                <p className="my-appointments-page__info-line">
                  {ICONS.calendar} <span>{t.date}</span>
                </p>

                <p className="my-appointments-page__info-line">
                  {ICONS.clock} <span>{t.time}</span>
                </p>
              </div>

              <button
                className="my-appointments-page__button my-appointments-page__button--cancel"
                onClick={() => handleCancelar(t)}
              >
                Cancelar turno
              </button>
            </div>
          ))
        ) : (
          <p className="my-appointments-page__empty">
            No tienes turnos próximos.
          </p>
        )}
      </section>

      <hr className="my-appointments-page__divider" />

      {/* --- Historial --- */}
      <section className="my-appointments-page__section">
        <h3 className="my-appointments-page__section-title">Historial</h3>

        {historial.length > 0 ? (
          historial.map((t) => (
            <div key={t._id} className="my-appointments-page__card my-appointments-page__card--history">
              <div className="my-appointments-page__info">
                <p className="my-appointments-page__info-line">
                  {ICONS.calendar} <span>{t.date}</span>
                </p>

                <p className="my-appointments-page__info-line">
                  {ICONS.clock} <span>{t.time}</span>
                </p>
              </div>
                <p className={`my-appointments-page__info-status ${t.status === "canceled" ? "my-appointments-page__info-status--canceled" : "my-appointments-page__info-status--completed"}`}>
                  Estado: <strong>{t.status}</strong>
                </p>
            </div>
          ))
        ) : (
          <p className="my-appointments-page__empty">
            Aún no tienes historial de turnos.
          </p>
        )}
      </section>
      </section>

      <hr className="my-appointments-page__divider" />

      <button
        onClick={() => navigate("/appointments")}
        className="my-appointments-page__button my-appointments-page__button--primary"
      >
        Reservar nuevo turno
      </button>
    </div>
  );
}

export default MyAppointmentsPage;
