import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { ProductGridSkeleton } from '../components/Skeletons';
import Button from '../components/Button';
import { useFetch } from '../hooks/useFetch';
import { useCart } from '../context/CartContext';
import styles from './ShopPage.module.css';

/**
 * ShopPage
 * - Client-side search input
 * - Category filter pills
 * - Sort by price (low to high, high to low, popular/rating)
 * - Skeleton loading & resilient error state
 */
export default function ShopPage() {
  const { data, loading, error } = useFetch('https://dummyjson.com/products?limit=100');
  const { addItem } = useCart();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'price-asc' | 'price-desc' | 'rating'

  // Extract unique categories from data
  const rawProducts = data?.products || [];
  const categories = useMemo(() => {
    const set = new Set(rawProducts.map((p) => p.category).filter(Boolean));
    return ['all', ...Array.from(set)];
  }, [rawProducts]);

  // Client-side filtering and sorting logic
  const filteredProducts = useMemo(() => {
    let result = [...rawProducts];

    // 1. Category Filter
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // 2. Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q)
      );
    }

    // 3. Sort Filter
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [rawProducts, selectedCategory, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSortBy('featured');
  };

  return (
    <div className="page-container">
      {/* Editorial Header */}
      <div className={styles.header}>
        <div className={styles.headerMeta}>
          <span className="sticker-badge">Complete Archive</span>
          <span className={styles.editionCount}>
            {loading ? 'CALCULATING INVENTORY...' : `${filteredProducts.length} OBJECTS CATALOGED`}
          </span>
        </div>
        <h1 className={styles.pageTitle}>The Archive & Catalog</h1>
        <p className={styles.pageDescription}>
          Filter by category, search by utility or composition, and sort by price. All items are dispatched with plastic-free packaging.
        </p>
      </div>

      {/* Control Bar: Search, Category Pills & Sort */}
      <section className={styles.controlSection} aria-label="Catalog Filters">
        <div className={styles.searchAndSortRow}>
          {/* Search Box */}
          <div className={styles.searchBox}>
            <label htmlFor="shop-search" className="sr-only">Search products</label>
            <span className={styles.searchIcon} aria-hidden="true">⌕</span>
            <input
              id="shop-search"
              type="text"
              placeholder="Search by name, category, or detail..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className={styles.clearSearchBtn}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className={styles.sortWrapper}>
            <label htmlFor="sort-select" className={styles.sortLabel}>Sort by:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={styles.sortSelect}
            >
              <option value="featured">Curator's Selection</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className={styles.categoryPillsWrapper}>
          <span className={styles.filterTitle}>Filter category:</span>
          <div className={styles.pillsScroll}>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`${styles.pill} ${selectedCategory === cat ? styles.pillActive : ''}`}
              >
                {cat.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Loading State */}
      {loading && <ProductGridSkeleton count={12} />}

      {/* Error State */}
      {error && (
        <div className={styles.errorContainer}>
          <div className={styles.errorMark}>!</div>
          <h2 className={styles.errorTitle}>Catalog Dispatch Error</h2>
          <p className={styles.errorText}>
            Unable to communicate with the product inventory ({error}). Please inspect your connection.
          </p>
          <Button variant="secondary" onClick={() => window.location.reload()}>
            Retry Connection
          </Button>
        </div>
      )}

      {/* Empty State when filters yield 0 items */}
      {!loading && !error && filteredProducts.length === 0 && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>✦</div>
          <h2 className={styles.emptyTitle}>No matching objects found</h2>
          <p className={styles.emptyText}>
            We found zero catalog items matching “{searchQuery}” in category “{selectedCategory}”. Try adjusting your filters or search criteria.
          </p>
          <Button variant="primary" onClick={handleResetFilters}>
            Reset All Filters
          </Button>
        </div>
      )}

      {/* Product Grid */}
      {!loading && !error && filteredProducts.length > 0 && (
        <div className={styles.grid}>
          {filteredProducts.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              offsetIndex={idx}
              onAddToCart={addItem}
            />
          ))}
        </div>
      )}
    </div>
  );
}

