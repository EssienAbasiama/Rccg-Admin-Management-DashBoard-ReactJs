import React, { createContext, useContext, useState, useEffect } from "react";
import { login, fetchProtectedData } from "./api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const handleLogin = async (username, password) => {
    try {
      const newToken = await login(username, password);
      setToken(newToken);
      localStorage.setItem("token", newToken);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const isAuthenticated = token !== null;

  // Automatic logout after 10 minutes of inactivity
  useEffect(() => {
    const logoutTimer = setTimeout(() => {
      handleLogout();
    }, 10 * 60 * 1000); // 10 minutes in milliseconds

    return () => {
      clearTimeout(logoutTimer);
    };
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
