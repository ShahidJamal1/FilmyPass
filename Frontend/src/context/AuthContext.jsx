import React, { createContext, useContext, useState, useEffect } from 'react';
import { profileApi } from '../api/profileApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('filmypass_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed) {
          // Ensure id is a valid positive number
          if (!parsed.id || isNaN(Number(parsed.id))) {
            parsed.id = 1;
          } else {
            parsed.id = Number(parsed.id);
          }
          return parsed;
        }
      }
    } catch (e) {}
    return {
      id: 1,
      name: 'Aryan Sharma',
      email: 'aryan@filmypass.com',
      phone: '9876543210',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop'
    };
  });

  const [isLoggedIn, setIsLoggedIn] = useState(!!user);

  useEffect(() => {
    if (user) {
      localStorage.setItem('filmypass_user', JSON.stringify(user));
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem('filmypass_user');
      setIsLoggedIn(false);
    }
  }, [user]);

  const login = async (identifier, password) => {
    try {
      const profileData = await profileApi.loginProfile(identifier);
      setUser(profileData);
      return { success: true, user: profileData };
    } catch (err) {
      return { success: false, message: err.message || 'Invalid credentials. Please try again.' };
    }
  };

  const register = async (name, email, phone, password) => {
    try {
      const profileData = await profileApi.registerProfile({ name, email, phone, password });
      setUser(profileData);
      return { success: true, user: profileData };
    } catch (err) {
      return { success: false, message: err.message || 'Registration failed.' };
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, register, logout }}>
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
