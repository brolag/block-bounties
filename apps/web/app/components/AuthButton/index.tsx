"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWeb3Auth } from '../../contexts/Web3AuthContext';

const AuthButton: React.FC = () => {
  const { web3auth, address, login, logout } = useWeb3Auth();
  const router = useRouter();

  const handleLogin = async () => {
    if (!web3auth) {
      console.log("Web3Auth not initialized yet");
      return;
    }
    try {
      await login();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    if (!web3auth) {
      console.log("Web3Auth not initialized yet");
      return;
    }
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const createBounty = () => {
    router.push('/bounties/create-bounty');
  };

  return (
    <div className="flex items-center justify-center">
      {!address ? (
        <button
          type="button"
          onClick={handleLogin}
          className="bg-accent-blue hover:bg-secondary-blue text-text-white font-bold py-2 px-4 rounded-full transition-colors shadow-lg"
        >
          Login with MetaMask
        </button>
      ) : (
        <div className="flex items-center space-x-4">
          <span className="text-accent-light bg-primary-dark bg-opacity-30 rounded-full px-3 py-1">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
          <button
            type="button"
            onClick={createBounty}
            className="bg-accent-blue hover:bg-secondary-blue text-text-white font-bold py-2 px-4 rounded-full transition-colors shadow-lg"
          >
            Create Bounty
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="bg-secondary-blue hover:bg-accent-blue text-text-white font-bold py-2 px-4 rounded-full transition-colors shadow-lg"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthButton;