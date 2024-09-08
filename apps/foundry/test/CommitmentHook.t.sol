// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {Test} from "forge-std/Test.sol";
import {CommitmentHook} from "../src/CommitmentHook.sol";
import {Escrow} from "../src/Escrow.sol";
import {IERC20} from "@openzeppelin/contracts/interfaces/IERC20.sol";
import "forge-std/console.sol";


contract CommitmentHookTest is Test {
    CommitmentHook public hook;
    Escrow public escrow;
    address public constant ATTESTER = address(0x1);
    uint64 public constant SCHEMA_ID = 1;

    function setUp() public {
        escrow = new Escrow();
        hook = new CommitmentHook(payable(address(escrow)));
    }
    function testDidReceiveAttestation() public {
        // Create a bounty
        uint256 bountyAmount = 1 ether;
        escrow.createBounty{value: bountyAmount}();

        // Prepare the extraData
        uint256 bountyId = 0;
        bytes memory extraData = abi.encode(uint64(bountyId));

        // Call didReceiveAttestation
        hook.didReceiveAttestation(ATTESTER, SCHEMA_ID, 0, extraData);

        // Check if the bounty was committed
        Escrow.Bounty memory bounty = escrow.getBounty(bountyId);
        assertTrue(bounty.isCommitted, "Bounty should be committed");
        assertEq(bounty.beneficiary, ATTESTER, "Beneficiary should be the attester");
        assertEq(bounty.amount, bountyAmount, "Bounty amount should match");
        assertTrue(bounty.isFunded, "Bounty should be funded");
        assertFalse(bounty.isReleased, "Bounty should not be released yet");
    }
}
