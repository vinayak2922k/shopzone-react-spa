import React from 'react';
import styles from './Marquee.module.css';

/**
 * Editorial Category / Announcement Marquee Strip
 * Infinite continuous animation
 */
export default function Marquee({
  items = [
    'BEAUTY & APOTHECARY',
    'FRAGRANCES',
    'FURNITURE',
    'GROCERIES',
    'HOME DECORATION',
    'KITCHEN ACCESSORIES',
    'MENS SHIRTS',
    'SKINCARE',
    'SUNGLASSES',
    'WOMENS WATCHES'
  ],
  speed = 'normal'
}) {
  return (
    <div className={styles.marqueeWrap} aria-hidden="true">
      <div className={`${styles.marqueeTrack} ${styles[speed]}`}>
        {/* Render 3 copies for seamless infinite scroll loop */}
        {[...items, ...items, ...items].map((item, index) => (
          <span key={index} className={styles.item}>
            <span className={styles.text}>{item}</span>
            <span className={styles.star}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

