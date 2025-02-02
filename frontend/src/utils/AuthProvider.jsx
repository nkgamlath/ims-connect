import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  //const [token, setToken] = useState(null);
  const [user, setUser] = useLocalStorage("user", null);
  const [token, setToken] = useLocalStorage("token", null);

  const navigate = useNavigate();


  const login = (userToken, user) => {
    console.log("AuthProvider: login", userToken, user);
    setToken(userToken);
    setUser(user);
    navigate("/");
  };
  const logout = () => {
    setToken(null);
    setUser(null);
    navigate("/auth/login");
  };
  const isAuthenticated = !!token;
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user, token }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};