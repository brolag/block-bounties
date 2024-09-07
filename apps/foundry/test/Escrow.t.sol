// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import "../src/Escrow.sol";

contract EscrowTest is Test {
    Escrow public escrow;
    address public owner;
    address public funder;
    address public beneficiary;

    event BountyCreated(uint256 indexed bountyId, address funder, uint256 amount);
    event BountyCommitted(uint256 indexed bountyId, address beneficiary);
    event BountyReleased(uint256 indexed bountyId, address beneficiary, uint256 amount);

    function setUp() public {
        owner = address(this);
        funder = address(0x1);
        beneficiary = address(0x2);
        escrow = new Escrow();
        
        // Give the funder some ETH
        vm.deal(funder, 10 ether);
    }

    function testCreateBounty() public {
        uint256 bountyAmount = 1 ether;
        vm.prank(funder);
        
        vm.expectEmit(true, true, false, true);
        emit BountyCreated(0, funder, bountyAmount);

        escrow.createBounty{value: bountyAmount}();

        Escrow.Bounty memory bounty = escrow.getBounty(0);

        assertEq(bounty.funder, funder);
        assertEq(bounty.beneficiary, address(0));
        assertEq(bounty.amount, bountyAmount);
        assertTrue(bounty.isFunded);
        assertFalse(bounty.isReleased);
        assertFalse(bounty.isCommitted);
        assertEq(escrow.nextBountyId(), 1);
    }

    function testCommitToBounty() public {
        uint256 bountyAmount = 1 ether;
        uint64 bountyId = 0;

        // Create a bounty first
        vm.prank(funder);
        escrow.createBounty{value: bountyAmount}();

        // Expect BountyCommitted event
        vm.expectEmit(true, true, false, true);
        emit BountyCommitted(bountyId, beneficiary);

        // Commit to the bounty
        vm.prank(beneficiary);
        escrow.commitToBounty(bountyId, beneficiary);

        Escrow.Bounty memory bounty = escrow.getBounty(bountyId);

        assertEq(bounty.beneficiary, beneficiary);
        assertTrue(bounty.isCommitted);
    }

    function testCompleteBounty() public {
        uint256 bountyAmount = 1 ether;
        uint64 bountyId = 0;

        // Create and commit to a bounty
        vm.prank(funder);
        escrow.createBounty{value: bountyAmount}();
        vm.prank(beneficiary);
        escrow.commitToBounty(bountyId, beneficiary);

        uint256 initialBalance = beneficiary.balance;

        // Expect BountyReleased event
        vm.expectEmit(true, true, false, true);
        emit BountyReleased(bountyId, beneficiary, bountyAmount);

        // Complete the bounty
        vm.prank(funder);
        escrow.completeBounty(bountyId);

        Escrow.Bounty memory bounty = escrow.getBounty(bountyId);

        assertTrue(bounty.isReleased);
        assertEq(beneficiary.balance, initialBalance + bountyAmount);
    }

    function testFailCompleteBountyNotFunder() public {
        uint256 bountyAmount = 1 ether;
        uint64 bountyId = 0;

        // Create and commit to a bounty
        vm.prank(funder);
        escrow.createBounty{value: bountyAmount}();
        vm.prank(beneficiary);
        escrow.commitToBounty(bountyId, beneficiary);

        // Try to complete the bounty as non-funder (should fail)
        vm.prank(beneficiary);
        escrow.completeBounty(bountyId);
    }

    function testFailCommitToNonExistentBounty() public {
        uint64 nonExistentBountyId = 999;

        vm.prank(beneficiary);
        escrow.commitToBounty(nonExistentBountyId, beneficiary);
    }

    function testFailDoubleCommit() public {
        uint256 bountyAmount = 1 ether;
        uint64 bountyId = 0;

        // Create a bounty
        vm.prank(funder);
        escrow.createBounty{value: bountyAmount}();

        // First commit
        vm.prank(beneficiary);
        escrow.commitToBounty(bountyId, beneficiary);

        // Second commit (should fail)
        vm.prank(address(0x3));
        escrow.commitToBounty(bountyId, address(0x3));
    }

    function testFailCompleteUncommittedBounty() public {
        uint256 bountyAmount = 1 ether;
        uint64 bountyId = 0;

        // Create a bounty without committing
        vm.prank(funder);
        escrow.createBounty{value: bountyAmount}();

        // Try to complete the uncommitted bounty
        vm.prank(funder);
        escrow.completeBounty(bountyId);
    }


    receive() external payable {}
}
