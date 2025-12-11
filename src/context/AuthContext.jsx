import { createContext, useState, useEffect } from "react";

import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [user, setUser] = useState(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) return null;
    try {
      return jwtDecode(storedToken);
    } catch {
      return null;
    }
  });

  // Guardar token en localStorage cada vez que cambie
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch {
        setUser(null);
      }
    } else {
      localStorage.removeItem("token");
      setUser(null);
    }
  }, [token]);

  // Funciones principales
  const login = (newToken) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
