import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Load from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("userdetails");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      setUser(parsedUser);

      // 🔥 ROLE LOGIC
      if (parsedUser?.memberships?.length > 0) {
        // take first org role (you can improve later)
        setRole(parsedUser.memberships[0].role);
      } else {
        setRole(parsedUser.accountType); // INDIVIDUAL fallback
      }
    }

    setLoading(false);
  }, []);

  // 🔥 login function
  const login = (userData, token) => {
    localStorage.setItem("userdetails", JSON.stringify(userData));
    localStorage.setItem("token", token);
    console.log("userData in login function", userData);

    setUser(userData);

    if (userData?.memberships?.length > 0) {
      setRole(userData.memberships[0].role);
    } else {
      setRole(userData.accountType);
    }
  };

  // 🔥 logout
  const logout = () => {
    localStorage.removeItem("userdetails");
    localStorage.removeItem("token");

    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 🔥 custom hook
export const useAuth = () => useContext(AuthContext);