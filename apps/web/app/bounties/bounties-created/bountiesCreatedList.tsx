'use client';

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useWeb3Auth } from '../../contexts/Web3AuthContext';
import { EscrowAddress, EscrowABI } from '../../contracts/Escrow';
import { Code, Shield, Briefcase, Cpu, GitBranch, BarChart2 } from 'react-feather';

interface Bounty {
  bountyId: number;
  funder: string;
  beneficiary: string;
  amount: string;
  isFunded: boolean;
  isReleased: boolean;
  isCommitted: boolean;
  name: string;
  description: string;
  deadline: string;
  icon: React.ElementType;
}

const mockBounties: Bounty[] = [
  {
    bountyId: 1,
    funder: '0x1234...5678',
    beneficiary: '0x0000...0000',
    amount: '0.5',
    isFunded: true,
    isReleased: false,
    isCommitted: false,
    name: 'Develop a DeFi Dashboard',
    description: 'Create a responsive dashboard for tracking DeFi investments across multiple protocols.',
    deadline: '2023-12-31',
    icon: BarChart2,
  },
  {
    bountyId: 2,
    funder: '0xabcd...efgh',
    beneficiary: '0x0000...0000',
    amount: '1.2',
    isFunded: true,
    isReleased: false,
    isCommitted: false,
    name: 'Smart Contract Audit',
    description: 'Perform a comprehensive security audit on a new NFT marketplace smart contract.',
    deadline: '2023-11-15',
    icon: Shield,
  },
  {
    bountyId: 3,
    funder: '0x9876...5432',
    beneficiary: '0x0000...0000',
    amount: '0.8',
    isFunded: true,
    isReleased: false,
    isCommitted: true,
    name: 'Implement EIP-4337',
    description: 'Integrate EIP-4337 (Account Abstraction) into an existing wallet application.',
    deadline: '2023-10-30',
    icon: Briefcase,
  },
  {
    bountyId: 4,
    funder: '0xijkl...mnop',
    beneficiary: '0x0000...0000',
    amount: '1.5',
    isFunded: true,
    isReleased: false,
    isCommitted: false,
    name: 'Develop AI-powered Trading Bot',
    description: 'Create an AI-powered trading bot for cryptocurrency markets using machine learning algorithms.',
    deadline: '2023-12-15',
    icon: Cpu,
  },
  {
    bountyId: 5,
    funder: '0xqrst...uvwx',
    beneficiary: '0x0000...0000',
    amount: '0.7',
    isFunded: true,
    isReleased: false,
    isCommitted: false,
    name: 'Cross-chain Bridge Development',
    description: 'Develop a secure cross-chain bridge for transferring assets between Ethereum and Polygon networks.',
    deadline: '2023-11-30',
    icon: GitBranch,
  },
  {
    bountyId: 6,
    funder: '0xyzab...cdef',
    beneficiary: '0x0000...0000',
    amount: '1.0',
    isFunded: true,
    isReleased: false,
    isCommitted: false,
    name: 'Solidity Smart Contract Optimization',
    description: 'Optimize gas usage and improve efficiency of existing Solidity smart contracts for a DeFi protocol.',
    deadline: '2023-12-01',
    icon: Code,
  },
];

export const BountiesCreatedList: React.FC = () => {
  const [bounties, setBounties] = useState<Bounty[]>(mockBounties);
  const [selectedBounty, setSelectedBounty] = useState<Bounty | null>(null);
  const [isCommitting, setIsCommitting] = useState(false);
  const { web3auth, provider } = useWeb3Auth();

  const handleBountySelect = (bounty: Bounty) => {
    setSelectedBounty(bounty);
  };

  const handleCommitment = async () => {
    if (!web3auth || !provider || !selectedBounty) return;

    setIsCommitting(true);
    try {
      const ethersProvider = new ethers.BrowserProvider(provider);
      const signer = await ethersProvider.getSigner();
      const escrowContract = new ethers.Contract(EscrowAddress, EscrowABI, signer);

      const tx = await escrowContract.commitToBounty(selectedBounty.bountyId);
      await tx.wait();

      alert('Successfully committed to the bounty!');
      // Update the local state to reflect the commitment
      setBounties(bounties.map(b => 
        b.bountyId === selectedBounty.bountyId ? {...b, isCommitted: true} : b
      ));
      setSelectedBounty({...selectedBounty, isCommitted: true});
    } catch (error) {
      console.error('Error committing to bounty:', error);
      alert('Failed to commit to the bounty. Please try again.');
    } finally {
      setIsCommitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-dark via-secondary-blue to-accent-blue p-4 sm:p-8">
      <h2 className="text-3xl font-bold mb-6 text-white text-center">Available Bounties</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {bounties.map((bounty) => (
          <div key={bounty.bountyId} 
               className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer"
               onClick={() => handleBountySelect(bounty)}>
            <div className="p-4">
              <div className="flex justify-center mb-4">
                <bounty.icon className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">{bounty.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{bounty.description.substring(0, 60)}...</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-md font-bold text-blue-600">{bounty.amount} ETH</span>
                <span className="text-xs text-gray-500">Due: {new Date(bounty.deadline).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {selectedBounty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full">
            <h3 className="text-2xl font-bold mb-4">{selectedBounty.name}</h3>
            <div className="flex justify-center mb-4">
              <selectedBounty.icon className="w-16 h-16 text-blue-500" />
            </div>
            <p className="mb-4">{selectedBounty.description}</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <p><span className="font-medium">Amount:</span> {selectedBounty.amount} ETH</p>
              <p><span className="font-medium">Deadline:</span> {new Date(selectedBounty.deadline).toLocaleDateString()}</p>
              <p><span className="font-medium">Funder:</span> {selectedBounty.funder}</p>
              <p><span className="font-medium">Status:</span> {selectedBounty.isCommitted ? 'Committed' : 'Open'}</p>
            </div>
            <button
              className={`w-full py-2 px-4 rounded font-medium ${
                selectedBounty.isCommitted
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
              onClick={handleCommitment}
              disabled={selectedBounty.isCommitted || isCommitting}
            >
              {selectedBounty.isCommitted ? 'Already Committed' : isCommitting ? 'Committing...' : 'Commit to Bounty'}
            </button>
            <button
              className="mt-4 w-full py-2 px-4 rounded font-medium border border-gray-300 text-gray-700 hover:bg-gray-100"
              onClick={() => setSelectedBounty(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};