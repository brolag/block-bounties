// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import { IERC20 } from "@openzeppelin/contracts/interfaces/IERC20.sol";
import { ISPHook } from "@ethsign/sign-protocol-evm/src/interfaces/ISPHook.sol";

// Interface for our BountyEscrow contract
interface IBountyEscrow {
    function createBounty() external payable returns (uint256);
    function commitToBounty(
        uint256 _bountyId,
        bytes memory _projectOwnerSignature,
        bytes memory _freelancerSignature
    )
        external;
    function completeBounty(uint256 _bountyId, bytes memory _projectOwnerSignature) external;
    function getBounty(uint256 _bountyId) external view returns (Bounty memory);
}

struct Bounty {
    address funder;
    address beneficiary;
    uint256 amount;
    bool isFunded;
    bool isReleased;
    bool isCommitted;
}

// Hook for commitment attestation
abstract contract CommitmentHook is ISPHook {
    IBountyEscrow public immutable bountyEscrow;

    constructor(address _bountyEscrow) {
        bountyEscrow = IBountyEscrow(_bountyEscrow);
    }

    function didReceiveAttestation(
        address, // attester
        uint64, // schemaId
        uint64, // attestationId
        bytes calldata extraData
    )
        external
        payable
    {
        // Decode extraData to get the necessary parameters
        (uint256 bountyId, bytes memory projectOwnerSignature, bytes memory freelancerSignature) =
            abi.decode(extraData, (uint256, bytes, bytes));

        // Call commitToBounty in the BountyEscrow contract
        bountyEscrow.commitToBounty(bountyId, projectOwnerSignature, freelancerSignature);
    }

    // Implement other functions required by ISPHook (empty in this case)
    function didReceiveAttestation(address, uint64, uint64, IERC20, uint256, bytes calldata) external pure { }
    function didReceiveRevocation(address, uint64, uint64, IERC20, uint256, bytes calldata) external pure { }
}
