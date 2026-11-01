import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useCart } from '../context/CartContext';
import styles from './CartPage.module.css';

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, totalPrice, totalQuantity } = useCart();
  const navigate = useNavigate();

  const freeShippingThreshold = 50;
  const shippingCost = totalPrice >= freeShippingThreshold || items.length === 0 ? 0 : 7.5;
  const grandTotal = totalPrice + shippingCost;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - totalPrice);
  const freeShippingProgress = Math.min(100, (totalPrice / freeShippingThreshold) * 100);

  if (items.length === 0) {
    return (
      <div className="page-container">
        <div className={styles.emptyContainer}>
          {/* Custom SVG Empty State Illustration */}
          <div className={styles.emptySvgWrapper}>
            <svg
              className={styles.emptySvg}
              viewBox="0 0 240 240"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* Card outline with hard offset shadow */}
              <rect x="52" y="72" width="136" height="140" fill="#FAF6EF" stroke="#1B1B1B" strokeWidth="2.5" />
              <rect x="56" y="76" width="136" height="140" fill="#1B1B1B" opacity="0.1" />
              
              {/* Bag Handles */}
              <path
                d="M85 72V48C85 36.9543 93.9543 28 105 28H135C146.046 28 155 36.9543 155 48V72"
                stroke="#1B1B1B"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              
              {/* Editorial Cross & Star pattern */}
              <path d="M120 115L120 165" stroke="#E8541E" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 3" />
              <path d="M95 140L145 140" stroke="#E8541E" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 3" />
              <circle cx="120" cy="140" r="14" fill="#FAF6EF" stroke="#1B1B1B" strokeWidth="2" />
              <text x="120" y="145" textAnchor="middle" fontSize="16" fontFamily="serif" fill="#E8541E">✦</text>

              {/* Tag hanging */}
              <path d="M155 95L175 115" stroke="#1B1B1B" strokeWidth="2" />
              <rect x="170" y="110" width="36" height="20" transform="rotate(45 170 110)" fill="#E8541E" stroke="#1B1B1B" strokeWidth="1.5" />
            </svg>
          </div>

          <span className="sticker-badge">Status: Vacant</span>
          <h1 className={styles.emptyTitle}>Your Bag Is Unoccupied</h1>
          <p className={styles.emptyText}>
            You have not yet claimed any editions from our archive. Browse our curated catalog to inspect physical objects ready for dispatch.
          </p>

          <Link to="/shop">
            <Button size="lg" variant="primary">
              Explore the Archive Catalog ↗
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerMeta}>
          <span className="sticker-badge">Current Order</span>
          <span className={styles.itemCount}>
            {totalQuantity} {totalQuantity === 1 ? 'OBJECT' : 'OBJECTS'} RESERVED
          </span>
        </div>
        <h1 className={styles.title}>Your Shopping Bag</h1>
      </div>

      {/* Free Shipping Progress Meter */}
      <div className={styles.shippingMeterBox}>
        <div className={styles.shippingMeterText}>
          {amountNeededForFreeShipping === 0 ? (
            <span>✦ <strong>Complimentary Domestic Courier unlocked!</strong> Your parcel ships free.</span>
          ) : (
            <span>Add <strong>${amountNeededForFreeShipping.toFixed(2)}</strong> more to qualify for <strong>Free Domestic Courier</strong> (orders &gt; $50)</span>
          )}
        </div>
        <div className={styles.meterTrack}>
          <div
            className={styles.meterFill}
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      <div className={styles.cartGrid}>
        {/* Items List */}
        <div className={styles.itemsColumn}>
          <div className={styles.itemsHeader}>
            <span>Object Details</span>
            <span>Quantity & Subtotal</span>
          </div>

          <div className={styles.itemList}>
            {items.map((item) => {
              const itemTotal = (item.price * item.quantity).toFixed(2);
              return (
                <div key={item.id} className={styles.cartItem}>
                  {/* Thumbnail */}
                  <Link to={`/product/${item.id}`} className={styles.thumbWrapper}>
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className={styles.thumb}
                    />
                  </Link>

                  {/* Info */}
                  <div className={styles.itemDetails}>
                    <span className={styles.itemCategory}>{item.category}</span>
                    <h3 className={styles.itemName}>
                      <Link to={`/product/${item.id}`}>{item.title}</Link>
                    </h3>
                    <span className={styles.unitPrice}>${item.price.toFixed(2)} each</span>

                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className={styles.removeBtn}
                      aria-label={`Remove ${item.title} from bag`}
                    >
                      Remove Object
                    </button>
                  </div>

                  {/* Stepper & Price */}
                  <div className={styles.itemActions}>
                    <div className={styles.stepper} aria-label="Quantity controls">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className={styles.stepBtn}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className={styles.stepQty}>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className={styles.stepBtn}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <span className={styles.itemSubtotal}>${itemTotal}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.clearBar}>
            <button
              type="button"
              onClick={clearCart}
              className={styles.clearBtn}
            >
              Empty Entire Bag
            </button>
            <Link to="/shop" className={styles.continueLink}>
              ← Continue Curating
            </Link>
          </div>
        </div>

        {/* Order Summary Column */}
        <aside className={styles.summaryColumn} aria-label="Order Summary">
          <div className={styles.summaryBox}>
            <h2 className={styles.summaryHeading}>Dispatch Summary</h2>

            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Subtotal</span>
              <span className={styles.summaryValue}>${totalPrice.toFixed(2)}</span>
            </div>

            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Domestic Courier</span>
              <span className={styles.summaryValue}>
                {shippingCost === 0 ? (
                  <span className={styles.freeBadge}>FREE (Orders &gt; $50)</span>
                ) : (
                  `$${shippingCost.toFixed(2)}`
                )}
              </span>
            </div>

            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Zero Plastic Tariff</span>
              <span className={styles.summaryValue}>$0.00 (Included)</span>
            </div>

            <div className={`${styles.summaryRow} ${styles.totalRow}`}>
              <span className={styles.totalLabel}>Total Due</span>
              <span className={styles.totalValue}>${grandTotal.toFixed(2)}</span>
            </div>

            <Button
              size="lg"
              variant="primary"
              fullWidth
              onClick={() => navigate('/checkout')}
              className={styles.checkoutBtn}
            >
              Proceed to Dispatch ↗
            </Button>

            <div className={styles.guaranteeBlock}>
              <div className={styles.guaranteeItem}>
                <span className={styles.guaranteeIcon}>✦</span>
                <span>Protected Guest Checkout & Instant Dispatch</span>
              </div>
              <div className={styles.guaranteeItem}>
                <span className={styles.guaranteeIcon}>✦</span>
                <span>Survives page reloads via persistent cache</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
