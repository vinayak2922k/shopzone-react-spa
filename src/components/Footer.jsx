import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.brandBlock}>
            <div className={styles.brandMark}>
              <span className={styles.star}>✦</span>
              <span className={styles.brandName}>SHOPZONE</span>
            </div>
            <p className={styles.manifesto}>
              An independent archive of considered goods. We source objects designed to outlive the season, manufactured without shortcuts and packaged without plastic.
            </p>
          </div>

          <div className={styles.linksGrid}>
            <div className={styles.column}>
              <h4 className={styles.colTitle}>Navigation</h4>
              <ul className={styles.list}>
                <li><Link to="/">Current Lookbook</Link></li>
                <li><Link to="/shop">Complete Catalog</Link></li>
                <li><Link to="/cart">Your Bag</Link></li>
                <li><Link to="/contact">Direct Dispatch</Link></li>
              </ul>
            </div>

            <div className={styles.column}>
              <h4 className={styles.colTitle}>Dispatch & Care</h4>
              <ul className={styles.list}>
                <li><span>Zero Plastic Pledges</span></li>
                <li><span>Global Carbon Offset</span></li>
                <li><span>30-Day Physical Trial</span></li>
                <li><span>Archive Re-Commerce</span></li>
              </ul>
            </div>

            <div className={styles.column}>
              <h4 className={styles.colTitle}>Colophon</h4>
              <p className={styles.colophonText}>
                Printed digitally in off-white paper #F4EFE6 and deep ink #1B1B1B. Set in Fraunces and Space Grotesk.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p>© {new Date().getFullYear()} SHOPZONE ISSUE 04. ALL RIGHTS RESERVED.</p>
          <p className={styles.madeWith}>CURATED IN INDEPENDENCE — PAIR-PROGRAMMED WITH PRECISION</p>
        </div>
      </div>
    </footer>
  );
}

