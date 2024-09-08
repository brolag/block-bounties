'use client';

import React from 'react';
import styles from './bountiesHistoryList.module.css';

interface CompletedBounty {
  id: number;
  bountyName: string;
  status: string;
  description: string;
  creator: string;
  freelancer: string;
  amount: number;
  completedDate: Date;
}

interface BountiesHistoryListProps {
  bounties: CompletedBounty[];
}

export const BountiesHistoryList: React.FC<BountiesHistoryListProps> = ({ bounties }) => {
  return (
    <div className={styles.grid}>
      {bounties.map((bounty) => (
        <div key={bounty.id} className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>{bounty.bountyName}</h3>
            <span className={`${styles.badge} ${styles.badgeCompleted}`}>
              {bounty.status}
            </span>
          </div>
          <div className={styles.cardContent}>
            <p className={styles.description}>{bounty.description}</p>
            <table className={styles.table}>
              <tbody>
                <tr>
                  <td className={styles.label}>Creador</td>
                  <td>{bounty.creator.slice(0, 6)}...{bounty.creator.slice(-4)}</td>
                </tr>
                <tr>
                  <td className={styles.label}>Freelancer</td>
                  <td>{bounty.freelancer.slice(0, 6)}...{bounty.freelancer.slice(-4)}</td>
                </tr>
                <tr>
                  <td className={styles.label}>Cantidad</td>
                  <td>{bounty.amount} ETH</td>
                </tr>
                <tr>
                  <td className={styles.label}>Fecha de finalización</td>
                  <td>{bounty.completedDate.toLocaleDateString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};