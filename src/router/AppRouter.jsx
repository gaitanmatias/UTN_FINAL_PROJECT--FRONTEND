import React from "react";
import { Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

// General Pages
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";

// Auth Pages
import RegisterPage from "../pages/auth/RegisterPage";
import LoginPage from "../pages/auth/LoginPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import VerifyEmailPage from "../pages/auth/VerifyEmailPage";

function AppRouter() {
  return (
    <Routes>
      {/* ----- Ruta Main ----- */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
      </Route>

      {/* ----- Ruta Auth ----- */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="verify-email/:status" element={<VerifyEmailPage />} />
      </Route>

      {/* ----- Ruta NotFound ----- */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRouter;
