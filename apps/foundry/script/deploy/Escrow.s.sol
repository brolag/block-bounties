// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {Escrow} from "../../src/Escrow.sol";

contract DeployEscrow is Script {
    function run() external {
        // Use the private key of the first account Anvil generates
        uint256 deployerPrivateKey = 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;
        vm.startBroadcast(deployerPrivateKey);

        Escrow escrow = new Escrow();

        vm.stopBroadcast();
    }
}

