// react
import { Routes, Route } from "react-router-dom";

// hooks
import { useScrollToTop } from "../hooks/useScrollToTop";

// Layouts
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import ProfileLayout from "../layouts/ProfileLayout"; 

// ========== Páginas de la Aplicación ==========
// General
import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
// Admin
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
// Appointments
import AppointmentsPage from "../pages/appointments/AppointmentsPage/AppointmentsPage";
import AvailableAppointmentsPage from "../pages/appointments/AvailableAppointmentsPage/AvailableAppointmentsPage";
// Auth
import RegisterPage from "../pages/auth/RegisterPage/RegisterPage";
import LoginPage from "../pages/auth/LoginPage/LoginPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage/ResetPasswordPage";
import VerifyEmailPage from "../pages/auth/VerifyEmailPage/VerifyEmailPage";
// Profile
import ProfilePage from "../pages/profile/ProfilePage/ProfilePage";
import MyAppointmentsPage from "../pages/profile/MyAppointmentsPage/MyAppointmentsPage";

function AppRouter() {
  // Hook que hace scroll al top al cambiar de ruta
  useScrollToTop();

  return (
    <Routes>
      {/* ----- Ruta Main ----- */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="appointments" element={<AppointmentsPage />} />
        <Route path="appointments/available/:date" element={<AvailableAppointmentsPage />} />
        <Route path="admin-dashboard" element={<AdminDashboardPage />} />
      </Route>

      {/* ----- Ruta Auth ----- */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="verify-email/:token" element={<VerifyEmailPage />} />
      </Route>

      {/* ----- Ruta Profile ----- */}
      <Route path="/profile" element={<ProfileLayout />}>
        <Route path=":userId" element={<ProfilePage />} />
        <Route path=":userId/my-appointments" element={<MyAppointmentsPage />} />
      </Route>

      {/* ----- Ruta NotFound ----- */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRouter;
