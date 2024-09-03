/* eslint-disable no-console */
import {ethers} from 'hardhat'

async function main() {
    // Deploy Escrow contract
    const EscrowFactory = await ethers.getContractFactory('Escrow')
    const escrowInstance = await EscrowFactory.deploy()
    const escrowContract = await escrowInstance.waitForDeployment()
    const escrowAddress = await escrowContract.getAddress()
    console.log('Escrow contract deployed to:', escrowAddress)

    // Deploy CompletionHook contract
    const CompletionHookFactory = await ethers.getContractFactory('CompletionHook')
    const completionHookInstance = await CompletionHookFactory.deploy(escrowAddress)
    const completionHookContract = await completionHookInstance.waitForDeployment()
    const completionHookAddress = await completionHookContract.getAddress()
    console.log('CompletionHook contract deployed to:', completionHookAddress)

    // Deploy CommitmentHook contract
    const CommitmentHookFactory = await ethers.getContractFactory('CommitmentHook')
    const commitmentHookInstance = await CommitmentHookFactory.deploy(escrowAddress)
    const commitmentHookContract = await commitmentHookInstance.waitForDeployment()
    const commitmentHookAddress = await commitmentHookContract.getAddress()
    console.log('CommitmentHook contract deployed to:', commitmentHookAddress)
}

void main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
