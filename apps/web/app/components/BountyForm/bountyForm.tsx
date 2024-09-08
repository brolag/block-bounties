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
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
      <div className="p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Create a New Bounty</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bountyName">
              Bounty Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="bountyName"
              type="text"
              name="bountyName"
              value={bountyData.bountyName}
              onChange={handleChange}
              placeholder="Enter bounty name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              name="description"
              value={bountyData.description}
              onChange={handleChange}
              placeholder="Describe the bounty"
              rows={3}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="freelancer">
              Freelancer (Wallet Address)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="freelancer"
              type="text"
              name="freelancer"
              value={bountyData.freelancer}
              onChange={handleChange}
              placeholder="Enter freelancer's wallet address"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
              Amount (ETH)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="amount"
              type="number"
              name="amount"
              value={bountyData.amount}
              onChange={handleChange}
              placeholder="Enter amount in ETH"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deadline">
              Deadline
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="deadline"
              type="datetime-local"
              name="deadline"
              value={bountyData.deadline}
              onChange={handleChange}
            />
          </div>
          <button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={!isConnected}
          >
            Create Bounty
          </button>
        </form>
      </div>
    </div>
  );
};