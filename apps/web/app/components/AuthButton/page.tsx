"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { MetamaskAdapter } from "@web3auth/metamask-adapter";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { ethers } from "ethers";
import styles from './page.module.css';

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
          chainId: "0xaa36a7", // Goerli testnet
          rpcTarget: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
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
    <div className={styles.container}>
      {!address ? (
        <button onClick={login} className={styles.button}>
          Login with MetaMask
        </button>
      ) : (
        <div className={styles.userInfo}>
          <span className={styles.address}>
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
          <button onClick={logout} className={`${styles.button} ${styles.logoutButton}`}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthButton;