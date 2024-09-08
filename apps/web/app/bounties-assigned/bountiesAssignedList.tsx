'use client';

import React from 'react';
import styles from './bountiesAssignedList.module.css';

interface AssignedBounty {
  id: number;
  bountyName: string;
  status: string;
  description: string;
  creator: string;
  amount: number;
  deadline: Date;
}

interface BountiesAssignedListProps {
  bounties: AssignedBounty[];
}

export const BountiesAssignedList: React.FC<BountiesAssignedListProps> = ({ bounties }) => {
  return (
    <div className={styles.grid}>
      {bounties.map((bounty) => (
        <div key={bounty.id} className={styles.card}>
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
                  <td className={styles.label}>Creador</td>
                  <td>{bounty.creator.slice(0, 6)}...{bounty.creator.slice(-4)}</td>
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

function getStatusStyle(status: string): string {
  switch (status.toLowerCase()) {
    case 'en progreso':
      return styles.badgeInProgress || '';
    case 'pendiente':
      return styles.badgePending || '';
    case 'completado':
      return styles.badgeCompleted || '';
    default:
      return styles.badgeDefault || '';
  }
}