import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    user: null,
  });

  useEffect(() => {
    const checkAuth = async () => {
      if (authState.token) {
        try {
          const response = await axios.get("http://localhost:3000/api/", {
            headers: {
              Authorization: `Bearer ${authState.token}`,
            },
          });
          setAuthState({
            ...authState,
            isAuthenticated: true,
            user: response.data.user,
          });
        } catch (err) {
          localStorage.removeItem("token");
          setAuthState({
            token: null,
            isAuthenticated: false,
            user: null,
          });
        }
      }
    };
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setAuthState({
      ...authState,
      token,
      isAuthenticated: true,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthState({
      token: null,
      isAuthenticated: false,
      user: null,
    });
  };

  return (
    <AuthContext.Provider value={{ authState, setAuthState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
