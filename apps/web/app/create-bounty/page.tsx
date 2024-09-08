'use client'

import { BountyForm } from '../components/BountyForm/bountyForm'
import styles from './page.module.css'
import { create_Bounty } from '../js/bounty'

export default function Dashboard() {
  const handleBountySubmit = async (bountyData: any) => {

    const storedBountyId = localStorage.getItem('bountyId');

    const updatedBountyData = {
      ...bountyData,
      bountyId: storedBountyId,  // Sobrescribe bountyId con el valor de localStorage
    };      
    
    try {
      const response = await fetch('../api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBountyData),
      });
  
      const result = await response.json();
      console.log('Bounty created:', result);
    } catch (error) {
      console.error('Error creating bounty:', error);
    }
    
  };

  return (
    <main className={styles.main}>
        <BountyForm onSubmit={handleBountySubmit} />
    </main>
  )
}