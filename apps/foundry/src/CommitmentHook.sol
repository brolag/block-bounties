// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import { IERC20 } from "@openzeppelin/contracts/interfaces/IERC20.sol";
import { ISPHook } from "@ethsign/sign-protocol-evm/src/interfaces/ISPHook.sol";
import { Escrow } from "./Escrow.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

// Hook for commitment attestation
contract CommitmentHook is ISPHook, Escrow, Ownable {
    constructor() Ownable(msg.sender) {}

    function didReceiveAttestation(
        address attester,
        uint64 schemaId,
        uint64 attestationId,
        bytes calldata extraData
    )
        payable
        external
        override
        onlyOwner
    {
        // Existing implementation
        (uint256 bountyId, bytes memory projectOwnerSignature) =
            abi.decode(extraData, (uint256, bytes));
        commitToBounty(bountyId, projectOwnerSignature);
    }

    function didReceiveAttestation(
        address attester,
        uint64 schemaId,
        uint64 attestationId,
        IERC20 resolverFeeERC20Token,
        uint256 resolverFeeERC20Amount,
        bytes calldata extraData
    )
        external
        override
        onlyOwner
    {
        // Implement logic here if needed
        // For now, just call the other didReceiveAttestation function
        this.didReceiveAttestation(attester, schemaId, attestationId, extraData);
    }

    function didReceiveRevocation(
        address attester,
        uint64 schemaId,
        uint64 attestationId,
        bytes calldata extraData
    )
        external
        override
        payable
        onlyOwner
    {
        // Implement revocation logic here
        revert("Revocation not supported");
    }

    function didReceiveRevocation(
        address attester,
        uint64 schemaId,
        uint64 attestationId,
        IERC20 resolverFeeERC20Token,
        uint256 resolverFeeERC20Amount,
        bytes calldata extraData
    ) 
        external 
        override
        onlyOwner 
    {
        // Implement revocation logic here
        revert("Revocation not supported");
    }
}