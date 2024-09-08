import { useState } from 'react';
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
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-10">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">Create a New Bounty</h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="bountyName">
                Bounty Name
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                id="bountyName"
                type="text"
                name="bountyName"
                value={bountyData.bountyName}
                onChange={handleChange}
                placeholder="Enter bounty name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="freelancer">
                Freelancer (Wallet Address)
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                id="freelancer"
                type="text"
                name="freelancer"
                value={bountyData.freelancer}
                onChange={handleChange}
                placeholder="Enter freelancer's wallet address"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              id="description"
              name="description"
              value={bountyData.description}
              onChange={handleChange}
              placeholder="Describe the bounty"
              rows={6}
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="amount">
                Amount (ETH)
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                id="amount"
                type="number"
                name="amount"
                value={bountyData.amount}
                onChange={handleChange}
                placeholder="Enter amount in ETH"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="deadline">
                Deadline
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                id="deadline"
                type="datetime-local"
                name="deadline"
                value={bountyData.deadline}
                onChange={handleChange}
              />
            </div>
          </div>
          <button 
            type="submit" 
            className="w-full bg-indigo-600 text-white font-bold py-4 px-6 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out text-lg"
            disabled={!isConnected}
          >
            Create Bounty
          </button>
        </form>
      </div>
    </div>
  );
};