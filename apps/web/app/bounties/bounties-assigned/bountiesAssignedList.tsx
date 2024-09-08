'use client';

import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useWeb3Auth } from '../../contexts/Web3AuthContext';
import { EscrowAddress, EscrowABI } from '../../contracts/Escrow';
import { Code, Shield, Briefcase, Cpu, GitBranch, BarChart2 } from 'react-feather';

interface AssignedBounty {
  bountyId: number;
  bountyName: string;
  status: string;
  description: string;
  creator: string;
  amount: string;
  deadline: string;
  icon: React.ElementType;
}

const iconMap: { [key: string]: React.ElementType } = {
  'Code': Code,
  'Shield': Shield,
  'Briefcase': Briefcase,
  'Cpu': Cpu,
  'GitBranch': GitBranch,
  'BarChart2': BarChart2,
};

export const BountiesAssignedList: React.FC = () => {
  const [bounties, setBounties] = useState<AssignedBounty[]>([
    {
      bountyId: 1,
      bountyName: 'Develop a DeFi Dashboard',
      status: 'In Progress',
      description: 'Create a responsive dashboard for tracking DeFi investments across multiple protocols.',
      creator: '0x1234...5678',
      amount: '0.5',
      deadline: '2023-12-31',
      icon: BarChart2,
    },
    // Add more mock bounties as needed
  ]);
  const [selectedBounty, setSelectedBounty] = useState<AssignedBounty | null>(null);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const { web3auth, provider } = useWeb3Auth();

  const handleBountySelect = (bounty: AssignedBounty) => {
    setSelectedBounty(bounty);
  };

  const handleFinalize = async () => {
    if (!web3auth || !provider || !selectedBounty) return;

    setIsFinalizing(true);
    try {
      const ethersProvider = new ethers.BrowserProvider(provider);
      const signer = await ethersProvider.getSigner();
      const escrowContract = new ethers.Contract(EscrowAddress, EscrowABI, signer);

      const tx = await escrowContract.finalizeBounty(selectedBounty.bountyId);
      await tx.wait();

      alert('Successfully finalized the bounty!');
      // Update the local state to reflect the finalization
      setBounties(bounties.map(b => 
        b.bountyId === selectedBounty.bountyId ? {...b, status: 'Completed'} : b
      ));
      setSelectedBounty({...selectedBounty, status: 'Completed'});
    } catch (error) {
      console.error('Error finalizing bounty:', error);
      alert('Failed to finalize the bounty. Please try again.');
    } finally {
      setIsFinalizing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-dark via-secondary-blue to-accent-blue p-4 sm:p-8">
      <h2 className="text-3xl font-bold mb-6 text-white text-center">Assigned Bounties</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {bounties.map((bounty) => (
          <div key={bounty.bountyId} 
               className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer"
               onClick={() => handleBountySelect(bounty)}>
            <div className="p-4">
              <div className="flex justify-center mb-4">
                {React.createElement(bounty.icon, { className: "w-8 h-8 text-blue-500" })}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">{bounty.bountyName}</h3>
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
            <h3 className="text-2xl font-bold mb-4">{selectedBounty.bountyName}</h3>
            <div className="flex justify-center mb-4">
              {React.createElement(selectedBounty.icon, { className: "w-16 h-16 text-blue-500" })}
            </div>
            <p className="mb-4">{selectedBounty.description}</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <p><span className="font-medium">Amount:</span> {selectedBounty.amount} ETH</p>
              <p><span className="font-medium">Deadline:</span> {new Date(selectedBounty.deadline).toLocaleDateString()}</p>
              <p><span className="font-medium">Creator:</span> {selectedBounty.creator}</p>
              <p><span className="font-medium">Status:</span> {selectedBounty.status}</p>
            </div>
            <button
              className={`w-full py-2 px-4 rounded font-medium ${
                selectedBounty.status === 'Completed'
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
              onClick={handleFinalize}
              disabled={selectedBounty.status === 'Completed' || isFinalizing}
            >
              {selectedBounty.status === 'Completed' ? 'Bounty Completed' : isFinalizing ? 'Finalizing...' : 'Finalize Bounty'}
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