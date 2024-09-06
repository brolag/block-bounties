// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import { IERC20 } from "@openzeppelin/contracts/interfaces/IERC20.sol";
import { ISPHook } from "@ethsign/sign-protocol-evm/src/interfaces/ISPHook.sol";
import { Escrow } from "./Escrow.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract CompletionHook is ISPHook, Escrow {
    event AttestationReceived(uint256 bountyId, address attester);
    function didReceiveAttestation(
        address attester,
        uint64 schemaId,
        uint64,
        bytes calldata extraData
    )
        external
        payable
        override
    {
        completeBounty(schemaId);
        emit AttestationReceived(schemaId, attester);
    }

    function didReceiveAttestation(
        address,
        uint64,
        uint64,
        IERC20,
        uint256,
        bytes calldata extraData
    )
        external
        override
    {
        revert("ERC20 fee not supported");
    }

    function didReceiveRevocation(
        address,
        uint64,
        uint64,
        bytes calldata extraData
    )
        external
        override
        payable
    {
        revert("Revocation not supported");
    }

    function didReceiveRevocation(
        address,
        uint64,
        uint64,
        IERC20,
        uint256,
        bytes calldata extraData
    ) 
        external 
        override
    {
        revert("Revocation not supported");
    }
}