'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Github, Twitter, Linkedin, Wallet, Zap } from 'lucide-react'
import AuthButton from './components/AuthButton'

const bounties = [
  { id: 1, title: 'Implement Smart Contract', reward: '5 ETH', category: 'Smart Contracts' },
  { id: 2, title: 'Design DeFi Dashboard', reward: '3 ETH', category: 'UI/UX' },
  { id: 3, title: 'Optimize Gas Usage', reward: '2 ETH', category: 'Optimization' },
  { id: 4, title: 'Develop NFT Marketplace', reward: '10 ETH', category: 'NFT' },
  { id: 5, title: 'Create Governance Token', reward: '7 ETH', category: 'Governance' },
  { id: 6, title: 'Build Layer 2 Solution', reward: '15 ETH', category: 'Layer 2' },
  { id: 7, title: 'Implement ZK Rollup', reward: '12 ETH', category: 'ZK Proofs' },
  { id: 8, title: 'Design Tokenomics Model', reward: '8 ETH', category: 'Tokenomics' },
]

const categories = ['Smart Contracts', 'DeFi', 'NFT', 'Layer 2', 'Governance']

const BountyCard = ({ bounty }) => (
  <div
    className="bg-gradient-to-br from-[#2A5ACF] to-[#587DFF] rounded-lg p-4 w-72 flex-shrink-0 mx-2 shadow-lg border border-[#F2F7FF] border-opacity-20"
  >
    <h4 className="text-xl font-bold mb-2 text-[#F2F7FF]">{bounty.title}</h4>
    <div className="flex items-center mb-2">
      <Zap size={16} className="text-[#F2F7FF] mr-2" />
      <p className="text-[#F2F7FF] font-semibold">Reward: {bounty.reward}</p>
    </div>
    <p className="text-sm text-[#FFFFFF] bg-[#0F1B42] bg-opacity-30 rounded-full px-3 py-1 inline-block mb-4">
      {bounty.category}
    </p>
    <button className="w-full bg-[#F2F7FF] text-[#0F1B42] font-bold py-2 px-4 rounded-full transition-colors hover:bg-[#FFFFFF]">
      Start Working
    </button>
  </div>
)

export default function HomePage() {
  const [currentBounty, setCurrentBounty] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBounty((prev) => (prev + 1) % bounties.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1B42] via-[#2A5ACF] to-[#587DFF] text-[#FFFFFF] font-sans">
      <header className="container mx-auto py-6 px-4">
        <nav className="flex justify-between items-center">
          <motion.h1 
            className="text-2xl font-bold text-[#F2F7FF] shadow-[0_0_15px_rgba(82,145,255,0.4)]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            BlockchainBounties
          </motion.h1>
          <ul className="flex space-x-6 items-center">
            <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <a href="#" className="hover:text-[#F2F7FF] transition-colors">Home</a>
            </motion.li>
            <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <a href="#" className="hover:text-[#F2F7FF] transition-colors">Bounties</a>
            </motion.li>
            <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <a href="#" className="hover:text-[#F2F7FF] transition-colors">About</a>
            </motion.li>
            <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <AuthButton />
            </motion.li>
          </ul>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-20">
          <motion.h2 
            className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#5A88F7] to-[#788EFD] text-transparent bg-clip-text"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Revolutionize the Blockchain
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 text-[#F2F7FF]"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Contribute to cutting-edge projects and earn rewards
          </motion.p>
        </section>

        <section className="mb-20 overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-3xl font-bold text-[#F2F7FF]">Latest Bounties</h3>
            <a href="#" className="text-[#F2F7FF] hover:text-[#587DFF] transition-colors">
              Bounties you missed →
            </a>
          </div>
          <motion.div 
            className="flex"
            animate={{ x: [0, -1920] }}
            transition={{ 
              x: { repeat: Infinity, duration: 50, ease: "linear" },
            }}
          >
            {[...bounties, ...bounties].map((bounty, index) => (
              <BountyCard key={`${bounty.id}-${index}`} bounty={bounty} />
            ))}
          </motion.div>
        </section>

        <section className="mb-20">
          <h3 className="text-3xl font-bold mb-8 text-center text-[#F2F7FF]">Top Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category, index) => (
              <div
                key={category}
                className="bg-gradient-to-br from-[#2A5ACF] to-[#587DFF] rounded-lg p-4 text-center shadow-lg border border-[#F2F7FF] border-opacity-20"
              >
                <span className="text-[#F2F7FF] font-semibold">{category}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center">
          <motion.h3 
            className="text-3xl font-bold mb-6 text-[#F2F7FF]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Ready to Make an Impact?
          </motion.h3>
          <motion.p 
            className="text-xl mb-8 text-[#FFFFFF]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Join our community and start contributing today!
          </motion.p>
          <motion.button 
            className="bg-[#587DFF] hover:bg-[#2A5ACF] text-[#FFFFFF] font-bold py-3 px-6 rounded-full transition-colors shadow-lg flex items-center justify-center mx-auto"
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(88, 125, 255, 0.4)' }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Bounties
          </motion.button>
        </section>
      </main>

      <footer className="bg-[#0F1B42] bg-opacity-30 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#F2F7FF]">&copy; 2023 BlockchainBounties. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <motion.a href="#" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <Github size={24} className="text-[#F2F7FF]" />
              </motion.a>
              <motion.a href="#" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <Twitter size={24} className="text-[#F2F7FF]" />
              </motion.a>
              <motion.a href="#" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <Linkedin size={24} className="text-[#F2F7FF]" />
              </motion.a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}