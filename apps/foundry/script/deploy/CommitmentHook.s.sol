// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {Escrow} from "../../src/Escrow.sol";
import {CommitmentHook} from "../../src/CommitmentHook.sol";

contract DeployCommitmentHook is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("DEPLOYER_PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        
        address payable escrow = payable(vm.envAddress("ESCROW_ADDRESS"));

        CommitmentHook commitmentHook = new CommitmentHook(escrow);
        
        console.log("CommitmentHook deployed to:", address(commitmentHook));

        vm.stopBroadcast();
    }
}
