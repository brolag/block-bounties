// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import { IERC20 } from "@openzeppelin/contracts/interfaces/IERC20.sol";
import { ISPHook } from "@ethsign/sign-protocol-evm/src/interfaces/ISPHook.sol";

// Interface for our BountyEscrow contract
interface IBountyEscrow {
    function commitToBounty(
        uint256 _bountyId,
        bytes memory _projectOwnerSignature,
        bytes memory _freelancerSignature
    )
        external;
    function completeBounty(uint256 _bountyId, bytes memory _projectOwnerSignature) external;
}

// Hook for completion attestation
abstract contract CompletionHook is ISPHook {
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
        (uint256 bountyId, bytes memory projectOwnerSignature) = abi.decode(extraData, (uint256, bytes));

        // Call completeBounty in the BountyEscrow contract
        bountyEscrow.completeBounty(bountyId, projectOwnerSignature);
    }

    function didReceiveRevocation(address, uint64, uint64, bytes calldata) external payable { }
}
