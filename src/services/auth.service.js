import axios from "axios";

// Base URL opcional si querés configurarlo
axios.defaults.baseURL = `${import.meta.env.VITE_BACKEND_URI}/api/auth`;

// Endpoints para autenticación
// -Registro de usuario
export const registerUser = async (data) => {
  try {
    const response = await axios.post("/register", data);
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
    const response = await axios.post("/login", data);
    return response.data;
  } catch (error) {
    // Captura errores del backend y retorna el mensaje
    const message = error.response?.data?.message || "Error al iniciar sesión";
    throw new Error(message);
  }
};

// Endpoints para recuperación de contraseña
// -ForgotPassword de usuario
export const forgotPasswordUser = async (data) => {
  try {
    const response = await axios.post("/forgot-password", data);
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
    const response = await axios.post(`/reset-password/${reset_token}`, data);
    return response.data;
  } catch (error) {
    // Captura errores del backend y retorna el mensaje
    const message = error.response?.data?.message || "Error al restablecer contraseña";
    throw new Error(message);
  }
};
