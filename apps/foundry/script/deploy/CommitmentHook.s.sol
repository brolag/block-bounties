// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {CommitmentHook} from "../../src/CommitmentHook.sol";

contract DeployCommitmentHook is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("DEPLOYER_PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        CommitmentHook commitmentHook = new CommitmentHook();
        
        console.log("CommitmentHook deployed to:", address(commitmentHook));

        vm.stopBroadcast();
    }
}
