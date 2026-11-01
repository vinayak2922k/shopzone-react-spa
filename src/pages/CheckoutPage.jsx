import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { useCart } from '../context/CartContext';
import styles from './CheckoutPage.module.css';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'Guest Patron',
    email: 'patron@shopzone.archive',
    address: '742 Evergreen Terrace',
    city: 'Springfield',
    postalCode: '97477',
    notes: 'Please leave at the covered porch in non-plastic wrapping.'
  });

  const shippingCost = totalPrice >= 50 || items.length === 0 ? 0 : 7.5;
  const grandTotal = totalPrice + shippingCost;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    clearCart();
  };

  if (isSubmitted) {
    return (
      <div className="page-container">
        <div className={styles.successCard}>
          <span className="sticker-badge">Manifest #SZ-9842</span>
          <h1 className={styles.successTitle}>Dispatch Confirmed</h1>
          <p className={styles.successLead}>
            Thank you, {formData.fullName}. Your order has entered our packing terminal. 
            All objects are being carefully wrapped in unbleached paper without plastic tape.
          </p>

          <div className={styles.manifestSummary}>
            <div className={styles.manifestRow}>
              <span>Destination:</span>
              <strong>{formData.address}, {formData.city} ({formData.postalCode})</strong>
            </div>
            <div className={styles.manifestRow}>
              <span>Notification Dispatched to:</span>
              <strong>{formData.email}</strong>
            </div>
            <div className={styles.manifestRow}>
              <span>Total Settled:</span>
              <strong>${grandTotal.toFixed(2)}</strong>
            </div>
          </div>

          <div className={styles.successActions}>
            <Link to="/shop">
              <Button size="lg" variant="primary">
                Return to Archive Catalog ↗
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="page-container">
        <div className={styles.emptyNotice}>
          <h2 className={styles.emptyTitle}>Nothing to Dispatch</h2>
          <p className={styles.emptyText}>
            Your bag is currently empty. Please select objects from the catalog prior to initiating checkout.
          </p>
          <Link to="/shop">
            <Button variant="primary">Visit Catalog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className={styles.header}>
        <div className={styles.headerMeta}>
          <span className="sticker-badge">Step 02 / Final Clearance</span>
          <span className={styles.authBadge}>PATRON AUTHENTICATED</span>
        </div>
        <h1 className={styles.pageTitle}>Settlement & Dispatch Order</h1>
      </div>

      <div className={styles.checkoutLayout}>
        {/* Shipping Information Form */}
        <form onSubmit={handleSubmit} className={styles.formCard}>
          <h2 className={styles.sectionHeading}>Physical Destination</h2>

          <div className={styles.inputGroup}>
            <label htmlFor="fullName" className={styles.label}>Patron Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Electronic Dispatch Address (Email)</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="address" className={styles.label}>Physical Street Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.inlineInputs}>
            <div className={styles.inputGroup}>
              <label htmlFor="city" className={styles.label}>City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="postalCode" className={styles.label}>Postal Code</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="notes" className={styles.label}>Courier Special Directives</label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              value={formData.notes}
              onChange={handleChange}
              className={styles.textarea}
            />
          </div>

          <Button type="submit" size="lg" variant="primary" fullWidth className={styles.submitBtn}>
            Confirm Order & Dispatch — ${grandTotal.toFixed(2)}
          </Button>
        </form>

        {/* Order Review Sidebar */}
        <aside className={styles.orderSidebar} aria-label="Order Review">
          <div className={styles.sidebarCard}>
            <h3 className={styles.sidebarHeading}>Manifest Review</h3>

            <div className={styles.sidebarItems}>
              {items.map((item) => (
                <div key={item.id} className={styles.sidebarItem}>
                  <div className={styles.itemMeta}>
                    <span className={styles.itemQty}>{item.quantity}×</span>
                    <span className={styles.itemTitle}>{item.title}</span>
                  </div>
                  <span className={styles.itemPrice}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className={styles.totalsBlock}>
              <div className={styles.totalLine}>
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className={styles.totalLine}>
                <span>Courier Transport</span>
                <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className={`${styles.totalLine} ${styles.grandTotalLine}`}>
                <span>Total Due</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className={styles.noticeBox}>
              ✦ No plastic tape, bubble wraps, or synthetic fill. 100% recyclable dispatch guarantee.
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

