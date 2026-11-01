import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div className="page-container">
      <div className={styles.container}>
        <div className={styles.stampRow}>
          <span className="sticker-badge">Folio Error 404</span>
          <span className={styles.metaTag}>INDEX DEFICIENCY</span>
        </div>

        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.headline}>This Page Has Escaped the Archive</h2>
        
        <p className={styles.message}>
          The pathway you followed does not correspond to an existing physical object, dispatch record, or lookbook feature. It may have moved or never existed.
        </p>

        <div className={styles.actions}>
          <Link to="/">
            <Button size="lg" variant="primary">
              Return to Lookbook ↗
            </Button>
          </Link>
          <Link to="/shop">
            <Button size="lg" variant="secondary">
              Browse Entire Catalog
            </Button>
          </Link>
        </div>

        <div className={styles.footnote}>
          <span>REF: URL_NOT_FOUND_IN_MANIFEST</span>
        </div>
      </div>
    </div>
  );
}

