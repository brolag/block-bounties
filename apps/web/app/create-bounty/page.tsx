'use client'


import { BountyForm } from '../components/BountyForm/bountyForm'
import styles from './page.module.css'

export default function Dashboard() {
  const handleBountySubmit = (bountyData: any) => {
    console.log('Bounty data submitted:', bountyData);
    // Implementar lógica para crear attestation y almacenar en Tableland
  };

  return (
    <main className={styles.main}>
        <BountyForm onSubmit={handleBountySubmit} />
    </main>
  )
}