import React from 'react';
import Link from 'next/link';
import styles from './sideBar.module.css';

const Sidebar = () => {
  return (
    <nav className={styles.sidebar}>
      <ul className={styles.menu}>
        <li>
          <Link href="/create-bounty" className={styles.menuItem}>
            Create bounty
          </Link>
        </li>
        <li>
          <Link href="/bounties-created" className={styles.menuItem}>
            Bounties created
          </Link>
        </li>
        <li>
          <Link href="/bounties-assigned" className={styles.menuItem}>
            Bounties asigned
          </Link>
        </li>
        <li>
          <Link href="/history" className={styles.menuItem}>
            History
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;