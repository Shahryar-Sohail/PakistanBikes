import { createContext, useState, useEffect } from "react";
import { getCurrentUser } from "../services/authService";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = getCurrentUser();
    setUser(storedUser);
    setLoading(false);
  }, []);

  const updateUser = (userData) => setUser(userData);
  const clearUser = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, loading, updateUser, clearUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
