'use client';

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { EscrowAddress, EscrowABI } from '../contracts/Escrow';
import styles from "../page.module.css";

interface Bounty {
  id: number;
  funder: string;
  beneficiary: string;
  amount: string;
  isFunded: boolean;
  isReleased: boolean;
  isCommitted: boolean;
}

const BountiesCreated: React.FC = () => {
  const [bounties, setBounties] = useState<Bounty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBounties = async () => {
      if (typeof window.ethereum === 'undefined') {
        console.error('Metamask is not installed');
        setLoading(false);
        return;
      }

      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const escrowContract = new ethers.Contract(EscrowAddress, EscrowABI, signer);

        const nextBountyId = await escrowContract.nextBountyId();
        const fetchedBounties = await Promise.all(
          Array.from({ length: Number(nextBountyId) }, async (_, i) => {
            const bounty = await escrowContract.getBounty(i);
            return {
              id: i,
              funder: bounty.funder,
              beneficiary: bounty.beneficiary,
              amount: ethers.formatEther(bounty.amount),
              isFunded: bounty.isFunded,
              isReleased: bounty.isReleased,
              isCommitted: bounty.isCommitted,
            };
          })
        );

        setBounties(fetchedBounties.filter(bounty => !bounty.isCommitted));
      } catch (error) {
        console.error('Error fetching bounties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBounties();
  }, []);

  const handleCommit = (bountyId: number) => {
    console.log(`Committing to bounty ${bountyId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Open Bounties</h1>
        {bounties.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-xl text-gray-600">No open bounties available.</p>
            <button type="button" className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
              Create a Bounty
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bounties.map((bounty) => (
              <div key={bounty.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition duration-300 hover:shadow-xl">
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2 text-gray-800">Bounty #{bounty.id}</h3>
                  <p className="text-lg mb-3">
                    <span className="font-medium text-gray-700">Amount:</span>{' '}
                    <span className="text-green-600 font-bold">{bounty.amount} ETH</span>
                  </p>
                  <p className="text-sm text-gray-600 mb-3">
                    <span className="font-medium">Beneficiary:</span> {bounty.beneficiary}
                  </p>
                  <div className="flex items-center mb-4">
                    <span className="text-sm font-medium text-gray-700 mr-2">Status:</span>
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                      Open
                    </span>
                  </div>
                </div>
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => handleCommit(bounty.id)}
                    className="w-full text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Commit to Bounty
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BountiesCreated;