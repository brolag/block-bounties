'use client'

import { useEffect, useState } from 'react';
import { BountiesCreatedList } from './bountiesCreatedList';
import styles from "./bountiesCreatedList.module.css"

async function fetchBounties() {
  const creator = "0x1F658AF12F5a0D72e4652f53399e556B9dB23904";

  try {
    const response = await fetch(`../api/bounty-created?creator=${creator}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const result = await response.json();
    console.log('Datos obtenidos:', result.data);

    return result.data;
  } catch (error) {
    console.error('Error al consultar los datos:', error);
    return null;
  }
}

export default function BountiesCreatedPage() {
  const [bounties, setBounties] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBounties();
      setBounties(data);
    };

    fetchData();
  }, []);

  return (
    <div className={styles.main}>
      <BountiesCreatedList bounties={bounties || []} />
    </div>
  );
}