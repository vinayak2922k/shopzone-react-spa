import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import styles from './Navbar.module.css';

/**
 * Editorial Lookbook Navbar
 * Persistent across all routes.
 * Uses <NavLink> and <Link> exclusively (no <a> tags).
 */
export default function Navbar() {
  const { totalQuantity = 0 } = useCart();
  const { isLoggedIn, logout } = useAuth();

  return (
    <header className={styles.header}>
      {/* Top running announcement marquee */}
      <div className={styles.topTicker}>
        <div className={styles.tickerContent}>
          <span>FREE DOMESTIC COURIER OVER $50</span>
          <span className={styles.bullet}>✦</span>
          <span>AUTUMN / WINTER OBJECTS</span>
          <span className={styles.bullet}>✦</span>
          <span>NO PLASTIC PACKAGING</span>
          <span className={styles.bullet}>✦</span>
          <span>LIMITED QUANTITIES ONLY</span>
        </div>
      </div>

      <div className={styles.mainNav}>
        {/* Editorial Logo */}
        <Link to="/" className={styles.logo} aria-label="ShopZone Home">
          <span className={styles.logoSymbol}>✦</span>
          <span className={styles.logoTitle}>SHOPZONE</span>
          <span className={styles.editionPill}>ED. 04</span>
        </Link>

        {/* Primary Navigation */}
        <nav className={styles.navigation} aria-label="Main Navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
            }
          >
            Lookbook
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
            }
          >
            Catalog
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
            }
          >
            Dispatch
          </NavLink>
        </nav>

        {/* Utility / Auth & Cart Actions */}
        <div className={styles.navActions}>
          {isLoggedIn ? (
            <button
              type="button"
              onClick={logout}
              className={styles.authBtn}
              aria-label="Exit guest session"
            >
              Guest (Exit)
            </button>
          ) : (
            <NavLink to="/login" className={styles.authLink}>
              Enter
            </NavLink>
          )}

          {/* Live Cart Link with bouncing badge */}
          <NavLink
            to="/cart"
            className={styles.cartBtn}
            aria-label={`Shopping bag containing ${totalQuantity} items`}
          >
            <span className={styles.cartText}>Bag</span>
            <span
              key={totalQuantity}
              className={`${styles.cartBadge} ${totalQuantity > 0 ? styles.badgeBounce : ''}`}
            >
              {totalQuantity}
            </span>
          </NavLink>
        </div>
      </div>
    </header>
  );
}
