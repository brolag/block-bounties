import React from 'react';
import Link from 'next/link';
import styles from './navbar.module.css';

export const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div>
            <Link href="/" className={styles.logo}>
              BlockBounties
            </Link>
          </div>
          <div>
            <Link href="/create-bounty" className={styles.button}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};