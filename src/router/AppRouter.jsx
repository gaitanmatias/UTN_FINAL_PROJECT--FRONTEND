import React from "react";
import { Routes, Route } from "react-router-dom";
import { useScrollToTop } from "../hooks/useScrollToTop";

// Layouts
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import ProfileLayout from "../layouts/ProfileLayout"; 

// General Pages
import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

// Admin Pages
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";

// Appointment Pages
import AppointmentsPage from "../pages/appointments/AppointmentsPage";
import AvailableAppointmentsPage from "../pages/appointments/AvailableAppointmentsPage";

// Auth Pages
import RegisterPage from "../pages/auth/RegisterPage/RegisterPage";
import LoginPage from "../pages/auth/LoginPage/LoginPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage/ResetPasswordPage";
import VerifyEmailPage from "../pages/auth/VerifyEmailPage";

// Profile Pages
import ProfilePage from "../pages/profile/ProfilePage";
import MyAppointmentsPage from "../pages/profile/MyAppointmentsPage";

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
