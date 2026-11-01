import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const { isLoggedIn, loginAsGuest, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Target destination after login: where the user was trying to go, or defaults to /checkout
  const destination = location.state?.from?.pathname || '/checkout';

  const handleGuestLogin = () => {
    loginAsGuest();
    navigate(destination, { replace: true });
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="page-container">
      <div className={styles.loginCard}>
        <div className={styles.stampHeader}>
          <span className="sticker-badge">Guest Clearance</span>
          <span className={styles.editionText}>SECURE TERMINAL</span>
        </div>

        <h1 className={styles.title}>
          {isLoggedIn ? 'Active Guest Session' : 'Identification & Access'}
        </h1>

        <p className={styles.lead}>
          {isLoggedIn
            ? 'You are currently identified as a Guest patron. You have full clearance to access checkout, reserve archive editions, and initiate dispatch.'
            : 'ShopZone requires no lengthy account setup or password friction. Simply activate a Guest Session to secure your items and proceed.'}
        </p>

        {location.state?.from && (
          <div className={styles.redirectNotice}>
            ✦ You must authenticate as a guest to proceed to{' '}
            <strong>{location.state.from.pathname}</strong>.
          </div>
        )}

        <div className={styles.actions}>
          {!isLoggedIn ? (
            <Button
              size="lg"
              variant="primary"
              fullWidth
              onClick={handleGuestLogin}
            >
              Login as Guest ↗
            </Button>
          ) : (
            <div className={styles.loggedInButtonGroup}>
              <Button
                size="lg"
                variant="primary"
                fullWidth
                onClick={() => navigate(destination, { replace: true })}
              >
                Continue to {destination === '/checkout' ? 'Checkout' : 'Destination'} ↗
              </Button>
              <Button
                size="md"
                variant="outline"
                fullWidth
                onClick={handleLogout}
              >
                Terminate Session (Logout)
              </Button>
            </div>
          )}
        </div>

        <div className={styles.footerNote}>
          <p>
            Your session is preserved across reloads via browser local state. We never harvest personal profiling cookies or resell patron telemetry.
          </p>
          <Link to="/shop" className={styles.returnLink}>
            ← Return to Curated Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}

