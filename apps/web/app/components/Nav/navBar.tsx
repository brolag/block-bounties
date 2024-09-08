import React from 'react';
import Link from 'next/link';
import AuthButton from '../AuthButton/page';
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
          <AuthButton />
        </div>
      </div>
    </nav>
  );
};