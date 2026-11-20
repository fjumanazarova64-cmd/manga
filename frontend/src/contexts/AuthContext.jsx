import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('manga-user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    // Demo login
    const mockUser = {
      id: 1,
      username: email.split('@')[0],
      email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      favorites: [],
      readHistory: [],
      joinDate: new Date().toISOString(),
    };
    setUser(mockUser);
    localStorage.setItem('manga-user', JSON.stringify(mockUser));
    setLoading(false);
    return mockUser;
  };

  const register = async (username, email, password) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    const mockUser = {
      id: Date.now(),
      username,
      email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      favorites: [],
      readHistory: [],
      joinDate: new Date().toISOString(),
    };
    setUser(mockUser);
    localStorage.setItem('manga-user', JSON.stringify(mockUser));
    setLoading(false);
    return mockUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('manga-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
