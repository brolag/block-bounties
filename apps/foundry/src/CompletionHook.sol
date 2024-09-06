// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import { IERC20 } from "@openzeppelin/contracts/interfaces/IERC20.sol";
import { ISPHook } from "@ethsign/sign-protocol-evm/src/interfaces/ISPHook.sol";
import { Escrow } from "./Escrow.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract CompletionHook is ISPHook, Escrow, Ownable {
    event AttestationReceived(uint256 bountyId, address attester);

    constructor() Ownable(msg.sender) {}

    function didReceiveAttestation(
        address attester,
        uint64 schemaId,
        uint64 attestationId,
        bytes calldata extraData
    )
        external
        payable
        override
        onlyOwner
    {
        (uint256 bountyId, bytes memory projectOwnerSignature) = abi.decode(extraData, (uint256, bytes));
        Escrow.completeBounty(bountyId, projectOwnerSignature);
        emit AttestationReceived(bountyId, attester);
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
        // Call the other didReceiveAttestation function
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
        revert("Revocation not supported");
    }
}