'use client';

import React from 'react';
import styles from './bountiesCreatedList.module.css';

interface Bounty {
  id: number;
  bountyName: string;
  status: string;
  description: string;
  freelancer: string;
  amount: number;
  deadline: Date;
}

interface BountiesCreatedListProps {
  bounties: Bounty[];
}

export const BountiesCreatedList: React.FC<BountiesCreatedListProps> = ({ bounties }) => {
  return (
    <div className={styles.grid}>
      {bounties.map((bounty) => (
        <div key={bounty.id} className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>{bounty.bountyName}</h3>
            <span className={`${styles.badge} ${bounty.status === 'activo' ? styles.badgeActive : styles.badgeInactive}`}>
              {bounty.status}
            </span>
          </div>
          <div className={styles.cardContent}>
            <p className={styles.description}>{bounty.description}</p>
            <table className={styles.table}>
              <tbody>
                <tr>
                  <td className={styles.label}>Freelancer</td>
                  <td>{bounty.freelancer.slice(0, 6)}...{bounty.freelancer.slice(-4)}</td>
                </tr>
                <tr>
                  <td className={styles.label}>Cantidad</td>
                  <td>{bounty.amount} ETH</td>
                </tr>
                <tr>
                  <td className={styles.label}>Fecha límite</td>
                  <td>{bounty.deadline.toLocaleDateString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};