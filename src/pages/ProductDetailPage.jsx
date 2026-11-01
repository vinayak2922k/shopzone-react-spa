import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '../components/Button';
import { ProductDetailSkeleton } from '../components/Skeletons';
import { useFetch } from '../hooks/useFetch';
import { useCart } from '../context/CartContext';
import styles from './ProductDetailPage.module.css';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { data: product, loading, error } = useFetch(
    id ? `https://dummyjson.com/products/${id}` : null
  );
  const { addItem } = useCart();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showAddedNotice, setShowAddedNotice] = useState(false);

  // Reset active image index when id changes
  useEffect(() => {
    setActiveImageIndex(0);
    setQuantity(1);
  }, [id]);

  if (loading) {
    return (
      <div className="page-container">
        <div className={styles.breadcrumbs}>
          <Link to="/shop" className={styles.backLink}>← Return to Catalog</Link>
        </div>
        <ProductDetailSkeleton />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="page-container">
        <div className={styles.errorBox}>
          <div className={styles.errorIcon}>✦</div>
          <h1 className={styles.errorTitle}>Object Not Found in Archive</h1>
          <p className={styles.errorText}>
            We could not locate catalog entry #{id}. It may have retired from the current seasonal rotation.
          </p>
          <Link to="/shop">
            <Button variant="primary">Browse Available Editions</Button>
          </Link>
        </div>
      </div>
    );
  }

  const {
    title,
    description,
    price,
    discountPercentage,
    rating = 4.5,
    stock = 10,
    brand,
    category,
    images = [],
    thumbnail
  } = product;

  // Use all product images, falling back to thumbnail if images array is empty
  const gallery = images && images.length > 0 ? images : [thumbnail];
  const activeImage = gallery[activeImageIndex] || thumbnail;

  const originalPrice = discountPercentage
    ? (price / (1 - discountPercentage / 100)).toFixed(2)
    : null;

  const handleAddToCart = () => {
    addItem({
      ...product,
      quantity
    });
    setShowAddedNotice(true);
    setTimeout(() => setShowAddedNotice(false), 2400);
  };

  const incrementQty = () => setQuantity((prev) => prev + 1);
  const decrementQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="page-container">
      {/* Editorial Breadcrumbs */}
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <Link to="/shop" className={styles.backLink}>← Return to Catalog</Link>
        <span className={styles.crumbDivider}>/</span>
        <span className={styles.crumbCategory}>{category}</span>
        <span className={styles.crumbDivider}>/</span>
        <span className={styles.crumbCurrent}>{title}</span>
      </nav>

      {/* Product Detail Main Grid */}
      <article className={styles.productLayout}>
        {/* Gallery Section */}
        <div className={styles.galleryCol}>
          <div className={styles.mainImageFrame}>
            <img
              src={activeImage}
              alt={title}
              className={styles.mainImage}
            />
            {discountPercentage > 0 && (
              <span className={styles.floatingDiscount}>
                -{Math.round(discountPercentage)}% ARCHIVE TARIFF
              </span>
            )}
          </div>

          {/* Thumbnail switcher */}
          {gallery.length > 1 && (
            <div className={styles.thumbnailsRow} aria-label="Product thumbnails">
              {gallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`${styles.thumbnailBtn} ${idx === activeImageIndex ? styles.thumbActive : ''}`}
                  aria-label={`View image ${idx + 1} of ${gallery.length}`}
                >
                  <img src={imgUrl} alt="" className={styles.thumbImage} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Information Section */}
        <div className={styles.infoCol}>
          <div className={styles.metaRow}>
            <span className="sticker-badge">{category}</span>
            {brand && <span className={styles.brandName}>ARCHIVE / {brand}</span>}
          </div>

          <h1 className={styles.productTitle}>{title}</h1>

          {/* Rating Stars (Inline SVG) */}
          <div className={styles.ratingWrapper}>
            <div className={styles.stars} title={`Rated ${rating} out of 5 stars`}>
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`${styles.starIcon} ${star <= Math.round(rating) ? styles.starFilled : styles.starEmpty}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className={styles.ratingNumber}>{rating.toFixed(1)} / 5.0</span>
            <span className={styles.stockNote}>
              {stock > 0 ? `• ${stock} pieces available in stock` : '• Currently on backorder'}
            </span>
          </div>

          {/* Price Block */}
          <div className={styles.priceRow}>
            <span className={styles.activePrice}>${price.toFixed(2)}</span>
            {originalPrice && (
              <span className={styles.struckPrice}>${originalPrice}</span>
            )}
            <span className={styles.taxPill}>TAX INCLUDED</span>
          </div>

          {/* Description */}
          <div className={styles.descriptionSection}>
            <h2 className={styles.specHeading}>Curator Notes</h2>
            <p className={styles.descriptionText}>{description}</p>
          </div>

          {/* Stepper & Desktop Add to Bag Action */}
          <div className={styles.desktopPurchaseRow}>
            <div className={styles.stepperContainer} aria-label="Quantity selector">
              <button
                type="button"
                onClick={decrementQty}
                className={styles.stepperBtn}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className={styles.stepperValue} aria-live="polite">
                {quantity}
              </span>
              <button
                type="button"
                onClick={incrementQty}
                className={styles.stepperBtn}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <Button
              size="lg"
              variant="primary"
              onClick={handleAddToCart}
              className={styles.addToCartDesktop}
            >
              Add to Bag — ${(price * quantity).toFixed(2)}
            </Button>
          </div>

          {/* Visual Added Notice */}
          {showAddedNotice && (
            <div className={styles.addedNotice} role="alert">
              ✦ Added {quantity} × “{title}” to your bag.
            </div>
          )}

          {/* Dispatch Specifications */}
          <div className={styles.specsTable}>
            <div className={styles.specRow}>
              <span className={styles.specKey}>Dispatch Time</span>
              <span className={styles.specVal}>Within 24 business hours</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specKey}>Packaging</span>
              <span className={styles.specVal}>100% Recyclable corrugated board</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specKey}>Trial Guarantee</span>
              <span className={styles.specVal}>30 calendar days return window</span>
            </div>
          </div>
        </div>
      </article>

      {/* Sticky Mobile Add-to-Cart Bar */}
      <aside className={styles.mobileStickyBar} aria-label="Mobile Add to Cart Bar">
        <div className={styles.mobileStickyInner}>
          <div className={styles.mobileStickyPrice}>
            <span className={styles.mobilePriceLabel}>Total</span>
            <span className={styles.mobilePriceVal}>${(price * quantity).toFixed(2)}</span>
          </div>
          <div className={styles.mobileStickyActions}>
            <div className={styles.mobileStepper}>
              <button type="button" onClick={decrementQty} className={styles.miniStepperBtn}>−</button>
              <span className={styles.miniStepperVal}>{quantity}</span>
              <button type="button" onClick={incrementQty} className={styles.miniStepperBtn}>+</button>
            </div>
            <Button size="md" variant="primary" onClick={handleAddToCart}>
              Add to Bag
            </Button>
          </div>
        </div>
      </aside>
    </div>
  );
}

