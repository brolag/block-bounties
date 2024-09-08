import React, { useState, useEffect } from 'react';
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { IWeb3AuthModal } from "@web3auth/modal";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { ethers } from "ethers";
import styles from './AuthButton.module.css';

const clientId = "YOUR_WEB3AUTH_CLIENT_ID"; // Replace with your Web3Auth client ID

const AuthButton: React.FC = () => {
  const [web3auth, setWeb3auth] = useState<IWeb3AuthModal | null>(null);
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    const init = async () => {
      try {
        const chainConfig = {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: "0x1", // mainnet
          rpcTarget: "https://mainnet.infura.io/v3/YOUR_INFURA_ID", // Replace with your Infura ID or another Ethereum RPC URL
        };

        const web3auth = new Web3Auth({
          clientId,
          web3AuthNetwork: "testnet", // Use "mainnet" for production
          chainConfig,
          privateKeyProvider: new EthereumPrivateKeyProvider({ config: { chainConfig } }),
        });

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
    }
  };

  const logout = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setAddress("");
  };

  return (
    <div className={styles.container}>
      {!address ? (
        <button onClick={login} className={styles.loginButton}>
          Login with Web3Auth
        </button>
      ) : (
        <div>
          <p className={styles.connectedText}>Connected: {address}</p>
          <button onClick={logout} className={styles.logoutButton}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthButton;