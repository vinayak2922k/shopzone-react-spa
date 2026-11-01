import React from 'react';
import styles from './Button.module.css';

/**
 * Editorial Neo-Brutalist Button
 * Features:
 * - Wipe fill animation on hover
 * - Hard offset shadow lift
 * - Accessible focus and disabled state
 */
export default function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'sage' | 'outline' | 'danger'
  size = 'md',        // 'sm' | 'md' | 'lg'
  onClick,
  disabled = false,
  type = 'button',
  fullWidth = false,
  className = '',
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${fullWidth ? styles.fullWidth : ''} ${className}`}
      {...props}
    >
      <span className={styles.label}>{children}</span>
      <span className={styles.wipe} aria-hidden="true" />
    </button>
  );
}

