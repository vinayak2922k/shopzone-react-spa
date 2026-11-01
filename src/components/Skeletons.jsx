import React from 'react';
import styles from './Skeletons.module.css';

/**
 * Editorial Product Card Skeleton Loader
 */
export function ProductCardSkeleton() {
  return (
    <div className={styles.cardSkeleton} aria-busy="true" aria-label="Loading product">
      <div className={styles.imageShimmer} />
      <div className={styles.metaShimmer}>
        <div className={styles.categoryPill} />
        <div className={styles.titleLine} />
        <div className={styles.titleLineShort} />
        <div className={styles.footerRow}>
          <div className={styles.pricePill} />
          <div className={styles.buttonPill} />
        </div>
      </div>
    </div>
  );
}

/**
 * Editorial Grid Skeleton Loader
 */
export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className={styles.grid}>
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}

/**
 * Product Detail Skeleton Loader
 */
export function ProductDetailSkeleton() {
  return (
    <div className={styles.detailSkeleton} aria-busy="true" aria-label="Loading product details">
      <div className={styles.gallerySkeleton}>
        <div className={styles.mainImageShimmer} />
        <div className={styles.thumbnailsRow}>
          <div className={styles.thumbShimmer} />
          <div className={styles.thumbShimmer} />
          <div className={styles.thumbShimmer} />
        </div>
      </div>
      <div className={styles.infoSkeleton}>
        <div className={styles.categoryPill} />
        <div className={styles.detailTitle} />
        <div className={styles.detailPrice} />
        <div className={styles.descLine} />
        <div className={styles.descLine} />
        <div className={styles.descLineShort} />
        <div className={styles.actionRow} />
      </div>
    </div>
  );
}

