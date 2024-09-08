import React, { useState } from 'react';
import styles from './bountyForm.module.css';
import { ethers } from 'ethers';
import { EscrowAddress, EscrowABI } from '../../contracts/Escrow';

interface BountyData {
  bountyId: number;
  bountyName: string;
  description: string;
  freelancer: string;
  amount: string;
  deadline: string;
  attestor: string;
}

interface BountyFormProps {
  onSubmit: (bountyData: BountyData) => void;
}

export const BountyForm: React.FC<BountyFormProps> = ({ onSubmit }) => {
  const [bountyData, setBountyData] = useState<BountyData>({
    bountyId: 0,
    bountyName: '',
    description: '',
    freelancer: '',
    amount: '',
    deadline: '',
    attestor: '',
  });
  const [isConnected, setIsConnected] = useState(false);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);

  // TODO: replace this with the actual wallet connection logic
  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        setSigner(signer);        
        setIsConnected(true);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    } else {
      console.error('Metamask is not installed');
    }
  };

  // TODO: add the integration with the data base here.
  const createBounty = async () => {
    if (!signer) {
      console.error('Wallet not connected');
      return;
    }

    try {
      const escrowContract = new ethers.Contract(EscrowAddress, EscrowABI, signer);
      const amountInWei = ethers.parseEther(bountyData.amount);
      
      const tx = await escrowContract.createBounty({ value: amountInWei });
      await tx.wait();
      const nextBountyId = await escrowContract.nextBountyId();
      const bountyIdAsNumber = Number(nextBountyId) - 1;
      const attestor = await signer.getAddress();
      localStorage.setItem('bountyId', bountyIdAsNumber.toString());
      setBountyData(prevData => ({
        ...prevData,
        bountyId: bountyIdAsNumber,
        attestor: attestor
      }));
      console.log(attestor);

      console.log('Bounty created successfully');
    } catch (error) {
      console.error('Error creating bounty:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBountyData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createBounty();
    onSubmit(bountyData);
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formWrapper}>
        <h2 className={styles.formTitle}>Create a New Bounty</h2>
        {!isConnected && (
          <button type="button" onClick={connectWallet} className={styles.connectButton}>
            Connect Wallet
          </button>
        )}
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Bounty Name
            </label>
            <input
              className={styles.input}
              type="text"
              name="bountyName"
              value={bountyData.bountyName}
              onChange={handleChange}
              placeholder="Enter bounty name"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Description
            </label>
            <textarea
              className={styles.textarea}
              name="description"
              value={bountyData.description}
              onChange={handleChange}
              placeholder="Describe the bounty"
              rows={3}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Freelancer (Wallet Address)
            </label>
            <input
              className={styles.input}
              type="text"
              name="freelancer"
              value={bountyData.freelancer}
              onChange={handleChange}
              placeholder="Enter freelancer's wallet address"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Amount (ETH)
            </label>
            <input
              className={styles.input}
              type="number"
              name="amount"
              value={bountyData.amount}
              onChange={handleChange}
              placeholder="Enter amount in ETH"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Deadline
            </label>
            <input
              className={styles.input}
              type="datetime-local"
              name="deadline"
              value={bountyData.deadline}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className={styles.submitButton} disabled={!isConnected}>
            Create Bounty
          </button>
        </form>
      </div>
    </div>
  );
};