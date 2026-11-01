import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import styles from './ProductCard.module.css';

/**
 * Editorial Lookbook Product Card
 * - Tactile "Added ✓" visual confirmation
 * - Asymmetric tilt on hover
 * - 2px ink border & hard offset shadow
 * - Inline SVG rating stars
 * - Strikethrough original price & discount tag
 */
export default function ProductCard({
  product,
  onAddToCart,
  offsetIndex = 0
}) {
  const [justAdded, setJustAdded] = useState(false);

  const {
    id,
    title,
    price,
    discountPercentage,
    thumbnail,
    category,
    rating = 4.5
  } = product;

  // Calculate original price before discount
  const originalPrice = discountPercentage
    ? (price / (1 - discountPercentage / 100)).toFixed(2)
    : null;

  // Alternate card staggering for editorial masonry feel
  const offsetClass = offsetIndex % 2 === 1 ? styles.staggered : '';

  const handleAddClick = (e) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1200);
    }
  };

  return (
    <article className={`${styles.card} ${offsetClass}`}>
      {/* Category & Discount Sticker */}
      <div className={styles.badgeRow}>
        <span className={styles.categoryBadge}>{category}</span>
        {discountPercentage > 0 && (
          <span className={styles.discountBadge}>
            -{Math.round(discountPercentage)}%
          </span>
        )}
      </div>

      {/* Image container wrapped in <Link> */}
      <Link to={`/product/${id}`} className={styles.imageLink} tabIndex={-1} aria-hidden="true">
        <div className={styles.imageWrapper}>
          <img
            src={thumbnail}
            alt={title}
            loading="lazy"
            className={styles.image}
          />
        </div>
      </Link>

      {/* Card Content */}
      <div className={styles.content}>
        {/* Rating Stars (Inline SVG) */}
        <div className={styles.ratingRow} title={`Rated ${rating} out of 5`}>
          <div className={styles.stars}>
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
          <span className={styles.ratingScore}>{rating.toFixed(1)}</span>
        </div>

        {/* Title */}
        <h3 className={styles.title}>
          <Link to={`/product/${id}`} className={styles.titleLink}>
            {title}
          </Link>
        </h3>

        {/* Price & Action Row */}
        <div className={styles.footerRow}>
          <div className={styles.priceBlock}>
            <span className={styles.currentPrice}>${price.toFixed(2)}</span>
            {originalPrice && (
              <span className={styles.originalPrice}>${originalPrice}</span>
            )}
          </div>

          <Button
            size="sm"
            variant={justAdded ? 'sage' : 'primary'}
            onClick={handleAddClick}
            aria-label={`Add ${title} to bag`}
          >
            {justAdded ? 'Added ✓' : 'Add'}
          </Button>
        </div>
      </div>
    </article>
  );
}
