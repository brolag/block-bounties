import React, { useState } from 'react';
import styles from './bountyForm.module.css';

interface BountyData {
  bountyName: string;
  description: string;
  freelancer: string;
  amount: string;
  deadline: string;
}

interface BountyFormProps {
  onSubmit: (bountyData: BountyData) => void;
}

export const BountyForm: React.FC<BountyFormProps> = ({ onSubmit }) => {
  const [bountyData, setBountyData] = useState<BountyData>({
    bountyName: '',
    description: '',
    freelancer: '',
    amount: '',
    deadline: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBountyData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(bountyData);
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formWrapper}>
        <h2 className={styles.formTitle}>Create a New Bounty</h2>
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
          <button type="submit" className={styles.submitButton}>
            Create Bounty
          </button>
        </form>
      </div>
    </div>
  );
};