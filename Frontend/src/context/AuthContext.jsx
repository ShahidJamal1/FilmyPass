import React, { createContext, useContext, useState, useEffect } from 'react';
import { profileApi } from '../api/profileApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('filmypass_user');
      const isExplicitLogin = localStorage.getItem('filmypass_explicit_login');
      // Only restore user if user actually logged in explicitly (not legacy auto-login)
      if (saved && isExplicitLogin === 'true') {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.email) {
          if (!parsed.id || isNaN(Number(parsed.id))) {
            parsed.id = 1;
          } else {
            parsed.id = Number(parsed.id);
          }
          return parsed;
        }
      } else {
        // Clean up legacy auto-saved default
        localStorage.removeItem('filmypass_user');
      }
    } catch (e) {}
    // Default: guest user (not logged in)
    return null;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(!!user);

  useEffect(() => {
    if (user) {
      localStorage.setItem('filmypass_user', JSON.stringify(user));
      localStorage.setItem('filmypass_explicit_login', 'true');
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem('filmypass_user');
      localStorage.removeItem('filmypass_explicit_login');
      setIsLoggedIn(false);
    }
  }, [user]);

  const login = async (identifier, password) => {
    try {
      const profileData = await profileApi.loginProfile(identifier);
      localStorage.setItem('filmypass_explicit_login', 'true');
      setUser(profileData);
      return { success: true, user: profileData };
    } catch (err) {
      return { success: false, message: err.message || 'Invalid credentials. Please try again.' };
    }
  };

  const register = async (name, email, phone, password) => {
    try {
      const profileData = await profileApi.registerProfile({ name, email, phone, password });
      localStorage.setItem('filmypass_explicit_login', 'true');
      setUser(profileData);
      return { success: true, user: profileData };
    } catch (err) {
      return { success: false, message: err.message || 'Registration failed.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('filmypass_user');
    localStorage.removeItem('filmypass_explicit_login');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isLoggedIn, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
