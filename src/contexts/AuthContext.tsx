import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User as SupabaseUser, Session } from '@supabase/supabase-js';

export type UserRole = 'admin' | 'lawyer' | 'tecnico';

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
  isTecnico: boolean;
  hasAdminAccess: boolean; // true for admin OR tecnico
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile and roles
  const fetchUserProfile = async (supabaseUser: SupabaseUser): Promise<User | null> => {
    try {
      // Get profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .maybeSingle();

      if (profileError || !profile) {
        console.error('Profile error:', profileError);
        return null;
      }

      // Check if user is admin
      const { data: isAdminData } = await supabase.rpc('has_role', {
        _user_id: supabaseUser.id,
        _role: 'admin'
      });

      // Check if user is tecnico
      const { data: isTecnicoData } = await supabase.rpc('has_role', {
        _user_id: supabaseUser.id,
        _role: 'tecnico'
      });

      let role: UserRole = 'lawyer';
      if (isAdminData) {
        role = 'admin';
      } else if (isTecnicoData) {
        role = 'tecnico';
      }

      return {
        id: supabaseUser.id,
        email: supabaseUser.email || '',
        name: profile.name,
        role,
        approved: profile.approved,
      };
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        setSession(currentSession);
        
        if (currentSession?.user) {
          // Defer profile fetch with setTimeout to avoid deadlock
          setTimeout(async () => {
            const userProfile = await fetchUserProfile(currentSession.user);
            setUser(userProfile);
            setLoading(false);
          }, 0);
        } else {
          setUser(null);
          setLoading(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      setSession(currentSession);
      
      if (currentSession?.user) {
        const userProfile = await fetchUserProfile(currentSession.user);
        setUser(userProfile);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error);
        return false;
      }

      if (data.user) {
        const userProfile = await fetchUserProfile(data.user);
        if (!userProfile) {
          await supabase.auth.signOut();
          return false;
        }
        
        // Apenas verifica se o usuário foi aprovado pelo admin
        if (!userProfile.approved) {
          await supabase.auth.signOut();
          return false;
        }
        
        setUser(userProfile);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Login exception:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            name,
          },
        },
      });

      if (error) {
        console.error('Registration error:', error);
        return false;
      }

      // Usuário criado com sucesso, aguarda aprovação do admin
      // Não precisa confirmar email, apenas aprovação do campo 'approved'
      return !!data.user;
    } catch (error) {
      console.error('Registration exception:', error);
      return false;
    }
  };

  const isAdmin = user?.role === 'admin';
  const isTecnico = user?.role === 'tecnico';
  const hasAdminAccess = isAdmin || isTecnico;

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        isAuthenticated: !!user,
        isAdmin,
        isTecnico,
        hasAdminAccess,
        loading,
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
