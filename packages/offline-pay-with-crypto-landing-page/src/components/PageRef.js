import React from 'react';
import styles from './PageRef.module.css';

export default function PageRef({ url, pageName }) {
  return (
    <a
      className={styles.pageRef}
      href={url}
    >
      <div className={styles.left}>
        <div className={styles.arrow}>&#8594;</div>
        <div className={styles.pageName}>{pageName}</div>
      </div>
      <div className={styles.url}>{url}</div>
    </a>
  )
}