// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import { IERC20 } from "@openzeppelin/contracts/interfaces/IERC20.sol";
import { ISPHook } from "@ethsign/sign-protocol-evm/src/interfaces/ISPHook.sol";
import { Escrow } from "./Escrow.sol"; 
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { console } from "forge-std/console.sol";
contract CommitmentHook is ISPHook {
    Escrow public escrow;

    constructor(address payable _escrow) {
        escrow = Escrow(_escrow);
    }

    function didReceiveAttestation(
        address attester,
        uint64,
        uint64,
        bytes calldata extraData
    )
        external
        override
        payable
    {
        uint256 bountyId;
        assembly {
            // Load the third 32-byte word from data (skip first two words)
            bountyId := calldataload(add(extraData.offset, 64))
        }
        escrow.commitToBounty(uint64(bountyId), attester);
    }

    function didReceiveAttestation(
        address,
        uint64,
        uint64,
        IERC20,
        uint256,
        bytes calldata 
    )
        external
        pure
    {
        revert("ERC20 fee not supported");

    }

    function didReceiveRevocation(
        address,
        uint64, 
        uint64, 
        bytes calldata 
    )
        external
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
        bytes calldata
    )
        external
        pure
    {
        revert("Revocation not supported");
    }
}