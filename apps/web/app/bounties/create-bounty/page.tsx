'use client'

import { useState, useEffect } from 'react'
import { Web3Auth } from "@web3auth/modal"
import { CHAIN_NAMESPACES } from "@web3auth/base"
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider"
import { ethers } from "ethers"
import { BountyForm } from '../../components/BountyForm/bountyForm'
import { EscrowAddress, EscrowABI } from '../../contracts/Escrow'

const clientId = "BOgvX3VW76C4HUpjlCkJo59IoddKxgRPyoCa7OJycF5Jy4nul71ODv_c5uGz24UePY8eVu7GNj0W5iLjF50FvEk"

export default function Dashboard() {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null)
  const [provider, setProvider] = useState<any>(null)

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          web3AuthNetwork: "testnet",
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x14A34", // hex of 84532
            rpcTarget: "https://sepolia.base.org",
            displayName: "Base Sepolia",
            blockExplorerUrl: "https://sepolia-explorer.base.org",
            ticker: "ETH",
            tickerName: "ETH",
          },
          privateKeyProvider: new EthereumPrivateKeyProvider({ config: { chainConfig: {} } }),
        })

        setWeb3auth(web3auth)
        await web3auth.initModal()
        if (web3auth.provider) {
          setProvider(web3auth.provider)
        }
      } catch (error) {
        console.error(error)
      }
    }

    init()
  }, [])

  const handleBountySubmit = async (bountyData: any) => {
    if (!web3auth || !provider) {
      console.log("Web3Auth not initialized yet")
      return
    }

    try {
      const ethersProvider = new ethers.BrowserProvider(provider)
      const signer = await ethersProvider.getSigner()
      const address = await signer.getAddress()

      // Create bounty in the smart contract
      const escrowContract = new ethers.Contract(EscrowAddress, EscrowABI, signer)
      const tx = await escrowContract.createBounty({ value: ethers.parseEther(bountyData.amount) })
      await tx.wait()

      const bountyId = await escrowContract.nextBountyId() - 1n

      // Prepare data for database
      const updatedBountyData = {
        ...bountyData,
        bountyId: bountyId.toString(),
        funderAddress: address,
      }

      // Save to database
      const response = await fetch('../api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBountyData),
      })

      const result = await response.json()
      console.log('Bounty created:', result)
    } catch (error) {
      console.error('Error creating bounty:', error)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-dark via-secondary-blue to-accent-blue flex items-center justify-center p-4 sm:p-8">
            <BountyForm onSubmit={handleBountySubmit} />

    </main>
  )
}