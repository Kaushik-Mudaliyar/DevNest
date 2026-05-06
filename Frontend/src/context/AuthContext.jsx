import { createContext, useEffect, useState } from "react";

import { loginUser, registerUser, logoutUser } from "../api/authApi.js";

import { getCurrentUser } from "../api/userApi.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCurrentUser = async () => {
    try {
      const res = await getCurrentUser();
      setUser(res.data.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const login = async (data) => {
    const res = await loginUser(data);
    setUser(res.data.data);
    return res;
  };
  const register = async (data) => {
    return await registerUser(data);
  };
  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
        fetchCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
