// react
import { useEffect, useState } from "react";

// hooks
import { useAuth } from "../../hooks/useAuth";
import { usePageTitle } from "../../hooks/usePageTitle";

// contextos
import { useUI } from "../../context/UIContext";

// servicios
import { getAppointmentsByDate, updateAppointment } from "../../services/appointment.service";

// constantes
import { ICONS } from "../../constants/icons";

// estilos
import "./AdminDashboardPage.css";

export default function AdminDashboardPage() {
  usePageTitle("Bookly | Dashboard de Administrador");
  const { token } = useAuth();
  const [turnos, setTurnos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

  const { showToast, confirm } = useUI();

  useEffect(() => {
    const cargarTurnos = async () => {
      try {
        setCargando(true);
        const res = await getAppointmentsByDate(selectedDate, token);
        setTurnos(res.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };
    cargarTurnos();
  }, [selectedDate, token]);

  const handleActualizarEstado = async (appointmentId, nuevoEstado) => {
    const ok = await confirm({
    message:
      nuevoEstado === "completed"
        ? "¿Seguro que querés marcar este turno como completado?"
        : "¿Seguro que querés cancelar este turno?",
    });

    if (!ok) return;

    try {
      await updateAppointment(appointmentId, nuevoEstado, token);
      showToast({
        type: "success",
        message: "Turno actualizado correctamente"
      });
      
      setTurnos(prev =>
        prev.map(t =>
          t._id === appointmentId ? { ...t, status: nuevoEstado } : t
        )
      );
    } catch (err) {
      showToast({
        type: "error",
        message: err.message
      });
    }
  };

  const handleFechaChange = (e) => {
    setSelectedDate(e.target.value);
  };

  // Separar turnos por estado
  const turnosActivos = turnos.filter(t => t.status === "scheduled" || t.status === "completed");
  const turnosCancelados = turnos.filter(t => t.status === "canceled");

  // Función para ordenar turnos por hora
  const sortTurnosByTime = (turnos) => {
    return [...turnos].sort((a, b) => {
      const [horaA, minutoA] = a.time.split(":").map(Number);
      const [horaB, minutoB] = b.time.split(":").map(Number);
      const tiempoA = horaA * 60 + minutoA;
      const tiempoB = horaB * 60 + minutoB;
      return tiempoA - tiempoB;
    });
  };

  // Ordenar turnos activos y cancelados
  const turnosActivosOrdenados = sortTurnosByTime(turnosActivos);
  const turnosCanceladosOrdenados = sortTurnosByTime(turnosCancelados);

  // Contar turnos por estado
  const stats = {
    total: turnos.length,
    scheduled: turnos.filter(t => t.status === "scheduled").length,
    completed: turnos.filter(t => t.status === "completed").length,
    canceled: turnos.filter(t => t.status === "canceled").length,
  };

  return (
    <main className="admin-dashboard-page">
      <section className="admin-dashboard-page__header">
        <div className="admin-dashboard-page__title-section">
          <h1 className="admin-dashboard-page__title">{ICONS.chart} Panel de Administración</h1>
          <p className="admin-dashboard-page__subtitle">Gestiona los turnos del día</p>
        </div>
      </section>

      {/* Selector de fecha */}
      <section className="admin-dashboard-page__filters">
        <div className="admin-dashboard-page__filter-group">
          <label htmlFor="fecha-input" className="admin-dashboard-page__label">
            Seleccionar fecha:
          </label>
          <input
            id="fecha-input"
            type="date"
            value={selectedDate}
            onChange={handleFechaChange}
            className="admin-dashboard-page__date-input"
          />
        </div>
      </section>

      {/* Estadísticas */}
      <section className="admin-dashboard-page__stats">
        <div className="admin-dashboard-page__stat-card admin-dashboard-page__stat-card--total">
          <div className="admin-dashboard-page__stat-value">{stats.total}</div>
          <div className="admin-dashboard-page__stat-label">Total</div>
        </div>
        <div className="admin-dashboard-page__stat-card admin-dashboard-page__stat-card--scheduled">
          <div className="admin-dashboard-page__stat-value">{stats.scheduled}</div>
          <div className="admin-dashboard-page__stat-label">Programados</div>
        </div>
        <div className="admin-dashboard-page__stat-card admin-dashboard-page__stat-card--completed">
          <div className="admin-dashboard-page__stat-value">{stats.completed}</div>
          <div className="admin-dashboard-page__stat-label">Completados</div>
        </div>
        <div className="admin-dashboard-page__stat-card admin-dashboard-page__stat-card--canceled">
          <div className="admin-dashboard-page__stat-value">{stats.canceled}</div>
          <div className="admin-dashboard-page__stat-label">Cancelados</div>
        </div>
      </section>

      {/* Contenido principal */}
      <section className="admin-dashboard-page__content">
        {cargando && <p className="admin-dashboard-page__loading">⏳ Cargando turnos...</p>}

        {error && <p className="admin-dashboard-page__error">❌ Error: {error}</p>}

        {!cargando && !error && turnos.length === 0 && (
          <div className="admin-dashboard-page__empty">
            <p className="admin-dashboard-page__empty-icon">{ICONS.coffee}</p>
            <p className="admin-dashboard-page__empty-text">No hay turnos programados para esta fecha.</p>
          </div>
        )}

        {/* Tabla de turnos activos */}
        {!cargando && !error && turnosActivos.length > 0 && (
          <div className="admin-dashboard-page__section">
            <h2 className="admin-dashboard-page__section-title">{ICONS.settings} Turnos Activos</h2>
            <div className="admin-dashboard-page__table-wrapper">
              <table className="admin-dashboard-page__table">
                <thead className="admin-dashboard-page__thead">
                  <tr className="admin-dashboard-page__tr">
                    <th className="admin-dashboard-page__th">{ICONS.time} Hora</th>
                    <th className="admin-dashboard-page__th">{ICONS.user} Usuario</th>
                    <th className="admin-dashboard-page__th">{ICONS.email} Email</th>
                    <th className="admin-dashboard-page__th">{ICONS.smartphone} Teléfono</th>
                    <th className="admin-dashboard-page__th">{ICONS.info} Estado</th>
                    <th className="admin-dashboard-page__th">{ICONS.tool} Acciones</th>
                  </tr>
                </thead>
                <tbody className="admin-dashboard-page__tbody">
                  {turnosActivosOrdenados.map(t => (
                    <tr key={t._id} className="admin-dashboard-page__tr">
                      <td className="admin-dashboard-page__td admin-dashboard-page__td--time">{t.time}</td>
                      <td className="admin-dashboard-page__td">
                        {t.userId?.firstName} {t.userId?.lastName}
                      </td>
                      <td className="admin-dashboard-page__td">{t.userId?.email}</td>
                      <td className="admin-dashboard-page__td">{t.userId?.phoneNumber}</td>
                      <td className="admin-dashboard-page__td">
                        <span className={`admin-dashboard-page__status admin-dashboard-page__status--${t.status}`}>
                          {t.status === "scheduled" && "Programado"}
                          {t.status === "completed" && "Completado"}
                        </span>
                      </td>
                      <td className="admin-dashboard-page__td admin-dashboard-page__td--actions">
                        {t.status === "scheduled" && (
                          <div className="admin-dashboard-page__actions">
                            <button
                              className="admin-dashboard-page__action-btn admin-dashboard-page__action-btn--complete"
                              onClick={() => handleActualizarEstado(t._id, "completed")}
                              title="Marcar como completado"
                            >
                              ✓
                            </button>
                            <button
                              className="admin-dashboard-page__action-btn admin-dashboard-page__action-btn--cancel"
                              onClick={() => handleActualizarEstado(t._id, "canceled")}
                              title="Cancelar turno"
                            >
                              ✕
                            </button>
                          </div>
                        )}
                        {t.status === "completed" && (
                          <span className="admin-dashboard-page__no-actions">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tabla de turnos cancelados */}
        {!cargando && !error && turnosCancelados.length > 0 && (
          <div className="admin-dashboard-page__section admin-dashboard-page__section--canceled">
            <h2 className="admin-dashboard-page__section-title">{ICONS.canceled} Turnos Cancelados</h2>
            <div className="admin-dashboard-page__table-wrapper">
              <table className="admin-dashboard-page__table">
                <thead className="admin-dashboard-page__thead admin-dashboard-page__thead--canceled">
                  <tr className="admin-dashboard-page__tr">
                    <th className="admin-dashboard-page__th">{ICONS.time} Hora</th>
                    <th className="admin-dashboard-page__th">{ICONS.user} Usuario</th>
                    <th className="admin-dashboard-page__th">{ICONS.email} Email</th>
                    <th className="admin-dashboard-page__th">{ICONS.smartphone} Teléfono</th>
                    <th className="admin-dashboard-page__th">{ICONS.info} Estado</th>
                  </tr>
                </thead>
                <tbody className="admin-dashboard-page__tbody">
                  {turnosCanceladosOrdenados.map(t => (
                    <tr key={t._id} className="admin-dashboard-page__tr">
                      <td className="admin-dashboard-page__td admin-dashboard-page__td--time">{t.time}</td>
                      <td className="admin-dashboard-page__td">
                        {t.userId?.firstName} {t.userId?.lastName}
                      </td>
                      <td className="admin-dashboard-page__td">{t.userId?.email}</td>
                      <td className="admin-dashboard-page__td">{t.userId?.phoneNumber}</td>
                      <td className="admin-dashboard-page__td">
                        <span className="admin-dashboard-page__status admin-dashboard-page__status--canceled">
                          Cancelado
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
