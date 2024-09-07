// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {CompletionHook} from "../../src/CompletionHook.sol";

contract DeployCompletionHook is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("DEPLOYER_PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        CompletionHook completionHook = new CompletionHook();
        
        console.log("CompletionHook deployed to:", address(completionHook));

        vm.stopBroadcast();
    }
}
