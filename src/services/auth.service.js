import axios from "axios";
import { API } from "../constants/apiRoutes";

// =============== AUTENTICACIÓN ===============
// -Registro de usuario
export const registerUser = async (data) => {
  try {
    const response = await axios.post(`${API.AUTH}/register`, data);
    return response.data;
  } catch (error) {
    // Captura errores del backend y retorna el mensaje
    const message = error.response?.data?.message || "Error al registrar usuario";
    throw new Error(message);
  }
};

// -Login de usuario
export const loginUser = async (data) => {
  try {
    const response = await axios.post(`${API.AUTH}/login`, data);
    return response.data;
  } catch (error) {
    // Captura errores del backend y retorna el mensaje
    const message = error.response?.data?.message || "Error al iniciar sesión";
    throw new Error(message);
  }
};

// =============== RECUPERACIÓN DE CONTRASEÑA ===============
// -ForgotPassword de usuario
export const forgotPasswordUser = async (data) => {
  try {
    const response = await axios.post(`${API.AUTH}/forgot-password`, data);
    return response.data;
  } catch (error) {
    // Captura errores del backend y retorna el mensaje
    const message = error.response?.data?.message || "Error al enviar correo de recuperación";
    throw new Error(message);
  }
};

// -ResetPassword de usuario
export const resetPasswordUser = async (reset_token, data) => {
  try {
    const response = await axios.post(`${API.AUTH}/reset-password/${reset_token}`, data);
    return response.data;
  } catch (error) {
    // Captura errores del backend y retorna el mensaje
    const message = error.response?.data?.message || "Error al restablecer contraseña";
    throw new Error(message);
  }
};

// =============== VERIFICACIÓN DE CORREO ===============
// Enviar correo de verificación
export const sendEmailVerification = async (token) => {
  try {
    const response = await axios.post(
      `${API.AUTH}/send-email-verification`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Error al enviar correo de verificación";
    throw new Error(message);
  }
};

// Verificar cuenta con token
export const verifyEmailConfirmation = async (verification_token) => {
  try {
    const response = await axios.get(`${API.AUTH}/verify-email/${verification_token}`);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Error al verificar la cuenta";
    throw new Error(message);
  }
};
