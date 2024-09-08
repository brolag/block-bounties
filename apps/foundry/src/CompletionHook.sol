// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import { IERC20 } from "@openzeppelin/contracts/interfaces/IERC20.sol";
import { ISPHook } from "@ethsign/sign-protocol-evm/src/interfaces/ISPHook.sol";
import { Escrow } from "./Escrow.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import "forge-std/console.sol";

contract CompletionHook is ISPHook {
    Escrow public escrow;

    constructor(address payable _escrow) {
        escrow = Escrow(_escrow);
    }

    function didReceiveAttestation(
        address,
        uint64,
        uint64,
        bytes calldata extraData
    )
        external
        payable
        override
    {
        uint256 bountyId;
        assembly {
            bountyId := calldataload(add(extraData.offset, 64))
        }
        escrow.completeBounty(uint64(bountyId));
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
        override
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
        override
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
        override
    {
        revert("Revocation not supported");
    }
}