'use client';

import React, { useState } from 'react';
import { Code, Shield, Briefcase, Cpu, GitBranch, BarChart2 } from 'react-feather';

interface CompletedBounty {
  id: number;
  bountyName: string;
  status: string;
  description: string;
  creator: string;
  freelancer: string;
  amount: string;
  completedDate: string;
  icon: React.ElementType;
}

const mockBounties: CompletedBounty[] = [
  {
    id: 1,
    bountyName: 'Develop a DeFi Dashboard',
    status: 'Completed',
    description: 'Created a responsive dashboard for tracking DeFi investments across multiple protocols.',
    creator: '0x1234...5678',
    freelancer: '0xabcd...efgh',
    amount: '0.5',
    completedDate: '2023-09-15',
    icon: BarChart2,
  },
  {
    id: 2,
    bountyName: 'Smart Contract Audit',
    status: 'Completed',
    description: 'Performed a comprehensive security audit on a new NFT marketplace smart contract.',
    creator: '0x9876...5432',
    freelancer: '0xijkl...mnop',
    amount: '1.2',
    completedDate: '2023-08-30',
    icon: Shield,
  },
  {
    id: 3,
    bountyName: 'Implement EIP-4337',
    status: 'Completed',
    description: 'Integrated EIP-4337 (Account Abstraction) into an existing wallet application.',
    creator: '0xqrst...uvwx',
    freelancer: '0xyzab...cdef',
    amount: '0.8',
    completedDate: '2023-09-05',
    icon: Briefcase,
  },
];

export const BountiesHistoryList: React.FC = () => {
  const [selectedBounty, setSelectedBounty] = useState<CompletedBounty | null>(null);

  const handleBountySelect = (bounty: CompletedBounty) => {
    setSelectedBounty(bounty);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-dark via-secondary-blue to-accent-blue p-4 sm:p-8">
      <h2 className="text-3xl font-bold mb-6 text-white text-center">Completed Bounties</h2>
      <div className="space-y-4">
        {mockBounties.map((bounty) => (
          <div key={bounty.id} 
               className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:bg-gray-50 cursor-pointer"
               onClick={() => handleBountySelect(bounty)}>
            <div className="p-4 flex items-center space-x-4">
              <div className="flex-shrink-0">
                {React.createElement(bounty.icon, { className: "w-10 h-10 text-blue-500" })}
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-800">{bounty.bountyName}</h3>
                <p className="text-sm text-gray-600">{bounty.description.substring(0, 60)}...</p>
              </div>
              <div className="flex-shrink-0 text-right">
                <span className="text-md font-bold text-blue-600">{bounty.amount} ETH</span>
                <p className="text-xs text-gray-500">Completed: {bounty.completedDate}</p>
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
              <p><span className="font-medium">Completed Date:</span> {selectedBounty.completedDate}</p>
              <p><span className="font-medium">Creator:</span> {selectedBounty.creator}</p>
              <p><span className="font-medium">Freelancer:</span> {selectedBounty.freelancer}</p>
            </div>
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