import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { login as loginAPI } from "../services/authService";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // LOGIN
  const login = async (credentials) => {
    const user = await loginAPI(credentials);

    setUser(user);
    return user;
  };

  // LOGOUT
  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  // AUTO LOAD USER
 useEffect(() => {
  const loadUser = async () => {
    const token = localStorage.getItem("access");

    if (!token) return;

    try {
      const res = await getUser(); // 👈 DO NOT use localStorage user
      const user = res.data;

      // ❌ INVALID ROLE CHECK
      if (!user) {
        logout();
        return;
      }

      setUser(user);

      localStorage.setItem("user", JSON.stringify(user));

    } catch (err) {
      logout();
    }
  };

  loadUser();
}, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};