import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute Component Skeleton
 * 
 * PATTERN EXPLANATION:
 * - Reads `isLoggedIn` from `useAuth()`.
 * - If `isLoggedIn` is false:
 *   Redirects to `/login`, passing the current location in router `state: { from: location }`.
 *   This enables the LoginPage to redirect back to `/checkout` immediately upon guest login.
 * - If `isLoggedIn` is true:
 *   Renders `children`.
 */
export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  // TODO [USER IMPLEMENTATION]:
  // Check if unauthenticated. If not logged in, redirect to /login with state={{ from: location }}.
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

