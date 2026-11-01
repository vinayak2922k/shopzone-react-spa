import React from 'react';
import { Link } from 'react-router-dom';
import Marquee from '../components/Marquee';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';
import { ProductGridSkeleton } from '../components/Skeletons';
import { useFetch } from '../hooks/useFetch';
import { useCart } from '../context/CartContext';
import styles from './HomePage.module.css';

export default function HomePage() {
  const { data, loading, error } = useFetch('https://dummyjson.com/products?limit=8');
  const { addItem } = useCart();

  const products = data?.products || [];

  return (
    <div className={styles.homeContainer}>
      {/* Asymmetric Editorial Hero */}
      <section className={styles.heroSection}>
        <div className={styles.heroLeft}>
          <div className={styles.badgeWrapper}>
            <span className="sticker-badge">Free shipping over $50</span>
            <span className={styles.issueNumber}>ISSUE 04 / WINTER ARCHIVE</span>
          </div>

          <h1 className={styles.heroHeadline}>
            Curated objects for considered interiors and daily rituals.
          </h1>

          <p className={styles.heroLead}>
            We reject mass-produced clutter. Every item in the ShopZone index is vetted for enduring material honesty, repairability, and timeless utility.
          </p>

          <div className={styles.heroActions}>
            <Link to="/shop">
              <Button size="lg" variant="primary">
                Explore the Catalog ↗
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="secondary">
                Read Dispatch
              </Button>
            </Link>
          </div>
        </div>

        <div className={styles.heroRight}>
          <div className={styles.heroFrame}>
            <img
              src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=80"
              alt="Carefully arranged ceramic objects and wooden furnishings in warm light"
              className={styles.heroImage}
            />
            <div className={styles.frameSticker}>
              <span className={styles.frameStickerIcon}>✦</span>
              <span>100% PLASTIC FREE PACKAGING</span>
            </div>
            <div className={styles.captionTag}>
              <span>PLATE NO. 01 — OBJECT STUDY</span>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Ticker */}
      <Marquee />

      {/* Editorial Curated Section */}
      <section className={styles.curatedSection}>
        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.sectionKicker}>Curator’s Selection</span>
            <h2 className={styles.sectionTitle}>Essential Editions</h2>
          </div>
          <Link to="/shop" className={styles.viewAllLink}>
            View all 30 items <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Loading / Error / Grid States */}
        {loading && <ProductGridSkeleton count={8} />}

        {error && (
          <div className={styles.errorBox}>
            <p className={styles.errorMessage}>Failed to retrieve latest editions: {error}</p>
            <Link to="/shop">
              <Button variant="secondary" size="sm">Head to Catalog</Button>
            </Link>
          </div>
        )}

        {!loading && !error && (
          <div className={styles.productGrid}>
            {products.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                offsetIndex={idx}
                onAddToCart={addItem}
              />
            ))}
          </div>
        )}
      </section>

      {/* Concept Store Manifesto Banner */}
      <section className={styles.manifestoBanner}>
        <div className={styles.manifestoInner}>
          <div className={styles.manifestoKicker}>THE SHOPZONE PHILOSOPHY</div>
          <h2 className={styles.manifestoHeading}>
            “Buy once, maintain well, pass onward.”
          </h2>
          <p className={styles.manifestoBody}>
            In an era of relentless algorithmic consumerism, we deliberately slow things down. 
            No flash sales, no fake countdown timers, no artificial scarcity. Just solid materials, fair supply chains, and transparent design.
          </p>
          <div className={styles.manifestoGrid}>
            <div className={styles.pillar}>
              <span className={styles.pillarNum}>01</span>
              <h4 className={styles.pillarTitle}>Material Truth</h4>
              <p>Untreated woods, heavy linens, cast stoneware and recyclable alloys.</p>
            </div>
            <div className={styles.pillar}>
              <span className={styles.pillarNum}>02</span>
              <h4 className={styles.pillarTitle}>Direct Logistics</h4>
              <p>Carbon-compensated parcel deliveries handled with reinforced unbleached paper.</p>
            </div>
            <div className={styles.pillar}>
              <span className={styles.pillarNum}>03</span>
              <h4 className={styles.pillarTitle}>Open Dispatches</h4>
              <p>Transparent factory origins, repair instructions, and open component sourcing.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

