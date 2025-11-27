import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'admin' | 'lawyer';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  approved: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users database (temporary - will be replaced with real backend)
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@juriscompany.com.br',
    name: 'Admin Principal',
    role: 'admin',
    approved: true,
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    const storedUser = localStorage.getItem('admin_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - replace with real authentication later
    const foundUser = mockUsers.find(u => u.email === email);
    
    if (foundUser && foundUser.approved) {
      setUser(foundUser);
      localStorage.setItem('admin_user', JSON.stringify(foundUser));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('admin_user');
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    // Mock registration - creates pending user
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role: 'lawyer',
      approved: false,
    };
    
    mockUsers.push(newUser);
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
