import { useState, useEffect, createContext, ReactNode } from "react";

interface AuthContextProps {
    token: string | null;
    loggedIn: boolean;
    login: (token: string) => void;
    logout: () => void;
  }

export const AuthContext = createContext<Partial<AuthContextProps>>({});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Check for token in local storage
    const localToken = localStorage.getItem('token');
    if (localToken) {
      setToken(localToken);
    }
  }, []);

  const login = (token: string) => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token,loggedIn: Boolean(token ?? true), login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
