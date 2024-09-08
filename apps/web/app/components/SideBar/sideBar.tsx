import React from 'react';
import Link from 'next/link';
import { useWeb3Auth } from '../../contexts/Web3AuthContext';
import { Home, PlusCircle, Briefcase, CheckSquare, Clock, LogOut } from 'react-feather';

const Sidebar = () => {
  const { logout, isAuthenticated } = useWeb3Auth();

  return (
    <nav className="w-64 bg-[#1A2B52] text-white h-screen fixed left-0 top-0 p-6 flex flex-col justify-between shadow-lg">
      <div>
        <h1 className="text-2xl font-bold mb-8 text-center">BlockBounties</h1>
        <ul className="space-y-4">
          <li>
            <Link href="/" className="flex items-center py-2 px-4 hover:bg-[#587DFF] rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105">
              <Home size={18} className="mr-3" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link href="/bounties/create-bounty" className="flex items-center py-2 px-4 hover:bg-[#587DFF] rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105">
              <PlusCircle size={18} className="mr-3" />
              <span>Create bounty</span>
            </Link>
          </li>
          <li>
            <Link href="/bounties/bounties-created" className="flex items-center py-2 px-4 hover:bg-[#587DFF] rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105">
              <Briefcase size={18} className="mr-3" />
              <span>Bounties created</span>
            </Link>
          </li>
          <li>
            <Link href="/bounties/bounties-assigned" className="flex items-center py-2 px-4 hover:bg-[#587DFF] rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105">
              <CheckSquare size={18} className="mr-3" />
              <span>Bounties assigned</span>
            </Link>
          </li>
          <li>
            <Link href="/bounties/history" className="flex items-center py-2 px-4 hover:bg-[#587DFF] rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105">
              <Clock size={18} className="mr-3" />
              <span>History</span>
            </Link>
          </li>
        </ul>
      </div>
      {isAuthenticated && (
        <button
          type="button"
          onClick={logout}
          className="w-full py-3 px-4 bg-[#587DFF] hover:bg-[#7B9CFF] rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
        >
          <LogOut size={18} className="mr-3" />
          <span>Logout</span>
        </button>
      )}
    </nav>
  );
};

export default Sidebar;