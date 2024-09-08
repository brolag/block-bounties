'use client';

import React from 'react';
import styles from './bountiesAssignedList.module.css';

interface AssignedBounty {
  bountyId: number;
  bountyName: string;
  status: string;
  description: string;
  creator: string;
  amount: number;
  deadline: string;
}

interface BountiesAssignedListProps {
  bounties: AssignedBounty[];
}

export const BountiesAssignedList: React.FC<BountiesAssignedListProps> = ({ bounties }) => {
  return (
    <div className={styles.grid}>
      {bounties.map((bounty) => (
        <div key={bounty.bountyId} className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>{bounty.bountyName}</h3>
            <span className={`${styles.badge} ${getStatusStyle(bounty.status)}`}>
              {bounty.status}
            </span>
          </div>
          <div className={styles.cardContent}>
            <p className={styles.description}>{bounty.description}</p>
            <table className={styles.table}>
              <tbody>
                <tr>
                  <td className={styles.label}>Creator</td>
                  <td>{bounty.creator.slice(0, 6)}...{bounty.creator.slice(-4)}</td>
                </tr>
                <tr>
                  <td className={styles.label}>Amount</td>
                  <td>{bounty.amount} ETH</td>
                </tr>
                <tr>
                  <td className={styles.label}>Deadline</td>
                  <td>{bounty.deadline}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

function getStatusStyle(status: string): string {
  switch (status.toLowerCase()) {
    case 'in progress':
      return styles.badgeInProgress || '';
    case 'pending':
      return styles.badgePending || '';
    case 'completed':
      return styles.badgeCompleted || '';
    default:
      return styles.badgeDefault || '';
  }
}