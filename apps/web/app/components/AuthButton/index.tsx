"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { MetamaskAdapter } from "@web3auth/metamask-adapter";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { ethers } from "ethers";

const clientId = "BOgvX3VW76C4HUpjlCkJo59IoddKxgRPyoCa7OJycF5Jy4nul71ODv_c5uGz24UePY8eVu7GNj0W5iLjF50FvEk"; // Reemplaza con tu Client ID de Web3Auth

const AuthButton: React.FC = () => {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [address, setAddress] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      try {
        const chainConfig = {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: "0x14A34", // hex of 84532
          rpcTarget: "https://sepolia.base.org",
          // Avoid using public rpcTarget in production.
          // Use services like Infura, Quicknode etc
          displayName: "Base Sepolia",
          blockExplorerUrl: "https://sepolia-explorer.base.org",
          ticker: "ETH",
          tickerName: "ETH",
          logo: "https://github.com/base-org/brand-kit/blob/main/logo/symbol/Base_Symbol_Blue.svg",
        };

        const web3auth = new Web3Auth({
          clientId,
          web3AuthNetwork: "testnet",
          chainConfig,
          privateKeyProvider: new EthereumPrivateKeyProvider({ config: { chainConfig } }),
        });

        const metamaskAdapter = new MetamaskAdapter({
          clientId,
          sessionTime: 3600, // 1 hour in seconds
          web3AuthNetwork: "testnet",
          chainConfig,
        });

        web3auth.configureAdapter(metamaskAdapter);
        setWeb3auth(web3auth);
        await web3auth.initModal();
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    if (web3authProvider) {
      const ethersProvider = new ethers.BrowserProvider(web3authProvider);
      const signer = await ethersProvider.getSigner();
      const address = await signer.getAddress();
      setAddress(address);
      router.push('/create-bounty');
    }
  };

  const logout = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setAddress("");
    router.push('/');
  };

  return (
    <div className="flex items-center justify-center">
      {!address ? (
        <button
          type="button"
          onClick={login}
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
            onClick={logout}
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