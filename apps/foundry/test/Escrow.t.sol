// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Escrow.sol";

contract EscrowTest is Test {
    Escrow public escrow;
    address public funder;
    address public beneficiary;

    function setUp() public {
        funder = address(1);
        beneficiary = address(2);
        escrow = new Escrow();
    }

    function testCreateBounty() public {
        vm.prank(funder);
        vm.deal(funder, 1 ether);
        uint256 bountyId = escrow.createBounty{ value: 1 ether }();

        Escrow.Bounty memory bounty = escrow.getBounty(bountyId);
        assertEq(bounty.funder, funder);
        assertEq(bounty.amount, 1 ether);
        assertTrue(bounty.isFunded);
        assertFalse(bounty.isReleased);
        assertFalse(bounty.isCommitted);
        assertEq(address(escrow).balance, 1 ether);
    }

    function testCommitToBounty() public {
        vm.prank(funder);
        vm.deal(funder, 1 ether);
        uint256 bountyId = escrow.createBounty{ value: 1 ether }();

        bytes memory projectOwnerSignature = abi.encodePacked("projectOwnerSignature");
        bytes memory freelancerSignature = abi.encodePacked("freelancerSignature");

        vm.prank(address(0)); // Simulating the hook contract calling this function
        escrow.commitToBounty(bountyId, beneficiary, projectOwnerSignature, freelancerSignature);

        Escrow.Bounty memory bounty = escrow.getBounty(bountyId);
        assertEq(bounty.beneficiary, beneficiary);
        assertTrue(bounty.isCommitted);
    }

    function testCompleteBounty() public {
        vm.prank(funder);
        vm.deal(funder, 1 ether);
        uint256 bountyId = escrow.createBounty{ value: 1 ether }();

        bytes memory projectOwnerSignature = abi.encodePacked("projectOwnerSignature");
        bytes memory freelancerSignature = abi.encodePacked("freelancerSignature");

        vm.prank(address(0));
        escrow.commitToBounty(bountyId, beneficiary, projectOwnerSignature, freelancerSignature);

        bytes memory completionSignature = abi.encodePacked("completionSignature");

        vm.prank(address(0));
        escrow.completeBounty(bountyId, completionSignature);

        Escrow.Bounty memory bounty = escrow.getBounty(bountyId);
        assertTrue(bounty.isReleased);
        assertEq(beneficiary.balance, 1 ether);
    }

    function testGetBalance() public {
        vm.prank(funder);
        vm.deal(funder, 1 ether);
        uint256 bountyId = escrow.createBounty{ value: 1 ether }();

        assertEq(escrow.getBalance(), 1 ether);

        bytes memory projectOwnerSignature = abi.encodePacked("projectOwnerSignature");
        bytes memory freelancerSignature = abi.encodePacked("freelancerSignature");
        vm.prank(address(0));
        escrow.commitToBounty(bountyId, beneficiary, projectOwnerSignature, freelancerSignature);

        bytes memory completionSignature = abi.encodePacked("completionSignature");
        vm.prank(address(0));
        escrow.completeBounty(bountyId, completionSignature);

        assertEq(escrow.getBalance(), 0);
    }
}
