import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * AuthContext Skeleton
 * 
 * PATTERN EXPLANATION:
 * - Simple boolean state `isLoggedIn`, initialized from localStorage.
 * - `loginAsGuest()`: sets `isLoggedIn` to true and persists to localStorage.
 * - `logout()`: sets `isLoggedIn` to false and removes or clears from localStorage.
 */

export const AuthContext = createContext();

export const AUTH_STORAGE_KEY = 'shopzone_auth_user';

export function AuthProvider({ children }) {
  // TODO [USER IMPLEMENTATION]:
  // 1. Initialize `isLoggedIn` state by checking localStorage.getItem(AUTH_STORAGE_KEY) === 'true'
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      return localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const loginAsGuest = () => {
    // TODO [USER IMPLEMENTATION]:
    // Set isLoggedIn to true and persist in localStorage
    setIsLoggedIn(true);
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, 'true');
    } catch (e) {
      console.error(e);
    }
  };

  const logout = () => {
    // TODO [USER IMPLEMENTATION]:
    // Set isLoggedIn to false and remove/update in localStorage
    setIsLoggedIn(false);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, loginAsGuest, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

