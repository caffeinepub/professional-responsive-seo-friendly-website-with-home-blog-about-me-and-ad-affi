import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { UserLoginProfile } from '../backend';

interface AuthContextType {
  isAuthenticated: boolean;
  userProfile: UserLoginProfile | null;
  login: (profile: UserLoginProfile) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'hs_auth_session';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userProfile, setUserProfile] = useState<UserLoginProfile | null>(null);

  // Load session from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      try {
        const profile = JSON.parse(stored);
        setUserProfile(profile);
      } catch (error) {
        console.error('Failed to parse stored auth session:', error);
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
  }, []);

  const login = (profile: UserLoginProfile) => {
    setUserProfile(profile);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(profile));
  };

  const logout = () => {
    setUserProfile(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const value: AuthContextType = {
    isAuthenticated: !!userProfile,
    userProfile,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
