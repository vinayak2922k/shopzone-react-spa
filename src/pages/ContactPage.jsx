import React, { useState } from 'react';
import Button from '../components/Button';
import styles from './ContactPage.module.css';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'curation',
    message: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="page-container">
      <div className={styles.header}>
        <div className={styles.headerMeta}>
          <span className="sticker-badge">Direct Line</span>
          <span className={styles.hoursNote}>ARCHIVE DISPATCH DESK • MON–FRI</span>
        </div>
        <h1 className={styles.title}>Send a Dispatch to the Curators</h1>
        <p className={styles.subtitle}>
          Have a question about material provenance, repair advice, or want to submit an artisanal workshop for our next issue? We read every note by hand.
        </p>
      </div>

      <div className={styles.contactGrid}>
        {/* Contact Form */}
        <div className={styles.formCard}>
          {submitted ? (
            <div className={styles.successState}>
              <span className={styles.successIcon}>✦</span>
              <h2 className={styles.successTitle}>Note Received in Archive</h2>
              <p className={styles.successText}>
                Thank you, {formData.name}. Your inquiry has landed on our editorial workbench. 
                Expect a thoughtful response from an actual human within one solar day.
              </p>
              <Button
                variant="secondary"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', topic: 'curation', message: '' });
                }}
              >
                Send Another Note
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.field}>
                <label htmlFor="name" className={styles.label}>Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="e.g. Robin Cross"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>Return Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="patron@domain.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="topic" className={styles.label}>Subject of Inquiry</label>
                <select
                  id="topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  className={styles.select}
                >
                  <option value="curation">Material Provenance & Sourcing</option>
                  <option value="shipping">Courier & Packaging Inquiries</option>
                  <option value="workshop">Artisan Workshop Collaboration</option>
                  <option value="press">Editorial Press & Loan Requests</option>
                </select>
              </div>

              <div className={styles.field}>
                <label htmlFor="message" className={styles.label}>Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Be specific. We appreciate direct, honest communication..."
                  value={formData.message}
                  onChange={handleChange}
                  className={styles.textarea}
                />
              </div>

              <Button type="submit" size="lg" variant="primary" fullWidth>
                Send Dispatch ↗
              </Button>
            </form>
          )}
        </div>

        {/* Sidebar Info */}
        <aside className={styles.infoCol}>
          <div className={styles.infoCard}>
            <h3 className={styles.cardHeading}>Archive Outpost</h3>
            <p className={styles.address}>
              ShopZone Studio & Reading Room<br />
              482 Silk Weaver Lane<br />
              London, E1 6PU
            </p>

            <div className={styles.divider} />

            <h4 className={styles.subHeading}>Electronic Correspondence</h4>
            <p className={styles.contactDetail}>dispatch@shopzone.archive</p>

            <div className={styles.divider} />

            <h4 className={styles.subHeading}>Pledge on Packaging</h4>
            <p className={styles.pledgeText}>
              Every box leaving our dispatch bay is sealed with water-activated paper tape and stuffed with shredded reclaimed kraft fibers. Zero plastic pellets.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

