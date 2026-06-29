import React, { createContext, useContext, useEffect, useState } from "react";
import { login as apiLogin, fetchMe } from "../lib/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("nq_admin_token");
    if (!token) {
      setLoading(false);
      return;
    }
    fetchMe()
      .then((data) => setUser(data))
      .catch(() => {
        localStorage.removeItem("nq_admin_token");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const signIn = async (username, password) => {
    const data = await apiLogin(username, password);
    localStorage.setItem("nq_admin_token", data.access_token);
    setUser({ username: data.username });
    return data;
  };

  const signOut = () => {
    localStorage.removeItem("nq_admin_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
