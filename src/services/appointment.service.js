import axios from "axios";
import { handleExpiredSession } from "../utils/sessionHandler";
import { API } from "../constants/apiRoutes";

// =============== OBTENER TURNOS ===============
// -Obtener turnos por fecha
export const getAppointmentsByDate = async (date, token) => {
  try {
    const res = await axios.get(`${API.APPOINTMENTS}/date?date=${date}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    if (!handleExpiredSession(err)) {
      const msg = err?.response?.data?.message || err.message || "Error al obtener turnos por fecha.";
      throw new Error(msg);
    }
  }
};

// -Obtener turnos del usuario autenticado 
export const getUserAppointments = async (token) => {
  try {
    const res = await axios.get(`${API.APPOINTMENTS}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    if (!handleExpiredSession(err)) {
      const msg = err?.response?.data?.message || err.message || "Error al obtener tus turnos.";
      throw new Error(msg);
    }
  }
};

// =============== CREAR TURNOS ===============
// -Crear nuevo turno 
export const createAppointment = async (date, time, token) => {
  try {
    const res = await axios.post(
      `${API.APPOINTMENTS}/`,
      { date, time },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (err) {
    if (!handleExpiredSession(err)) {
      const msg = err?.response?.data?.message || err.message || "Error al crear el turno.";
      throw new Error(msg);
    }
  }
};

// =============== ACTUALIZAR TURNOS ===============
// -Actualizar turno
//  ├─ El usuario puede cancelar sus turnos
//  └─ El admin puede cancelar o completar turnos de otros usuarios
export const updateAppointment = async (appointmentId, status, token) => {
  try {
    const res = await axios.put(
      `${API.APPOINTMENTS}/${appointmentId}`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (err) {
    if (!handleExpiredSession(err)) {
      const msg = err?.response?.data?.message || err.message || "Error al actualizar el turno.";
      throw new Error(msg);
    }
  }
};
