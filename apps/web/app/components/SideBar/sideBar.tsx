import React from 'react';
import Link from 'next/link';
import { useWeb3Auth } from '../../contexts/Web3AuthContext';

const Sidebar = () => {
  const { logout, isAuthenticated } = useWeb3Auth();

  return (
    <nav className="w-64 bg-[#0F1B42] text-white h-screen fixed left-0 top-0 p-4 flex flex-col justify-between">
      <ul className="space-y-4">
        <li>
          <Link href="/" className="block py-2 px-4 hover:bg-[#2A5ACF] rounded transition-colors">
            Home
          </Link>
        </li>
        <li>
          <Link href="/bounties/create-bounty" className="block py-2 px-4 hover:bg-[#2A5ACF] rounded transition-colors">
            Create bounty
          </Link>
        </li>
        <li>
          <Link href="/bounties/bounties-created" className="block py-2 px-4 hover:bg-[#2A5ACF] rounded transition-colors">
            Bounties created
          </Link>
        </li>
        <li>
          <Link href="/bounties/bounties-assigned" className="block py-2 px-4 hover:bg-[#2A5ACF] rounded transition-colors">
            Bounties assigned
          </Link>
        </li>
        <li>
          <Link href="/bounties/history" className="block py-2 px-4 hover:bg-[#2A5ACF] rounded transition-colors">
            History
          </Link>
        </li>
      </ul>
      {isAuthenticated && (
        <button
          type="button"
          onClick={logout}
          className="w-full py-2 px-4 bg-[#2A5ACF] hover:bg-[#587DFF] rounded transition-colors mt-auto"
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default Sidebar;