// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { IERC20 } from "@openzeppelin/contracts/interfaces/IERC20.sol";
import { ISPHook } from "@ethsign/sign-protocol-evm/src/interfaces/ISPHook.sol";

contract Escrow is Ownable {
    struct Bounty {
        address funder;
        address beneficiary;
        uint256 amount;
        bool isFunded;
        bool isReleased;
        bool isCommitted;
    }

    mapping(uint256 => Bounty) public bounties;
    uint256 public nextBountyId;

    event BountyCreated(uint256 indexed bountyId, address funder, uint256 amount);
    event BountyCommitted(uint256 indexed bountyId, address beneficiary);
    event BountyReleased(uint256 indexed bountyId, address beneficiary, uint256 amount);

    mapping(address attester => bool allowed) public whitelist;

    error UnauthorizedAttester();

    constructor() Ownable(_msgSender()) { }

    function createBounty() public payable {
        bounties[nextBountyId] = Bounty({
            funder: msg.sender,
            beneficiary: address(0),
            amount: msg.value,
            isFunded: msg.value > 0,
            isReleased: false,
            isCommitted: false
        });

        emit BountyCreated(nextBountyId, msg.sender, msg.value);
        nextBountyId++;
    }

    function commitToBounty(uint64 _bountyId, address _beneficiary) public  {
        Bounty storage bounty = bounties[_bountyId];
        require(bounty.isFunded, "Bounty is not funded");
        require(!bounty.isCommitted, "Bounty is already committed");

        bounty.beneficiary = _beneficiary;
        bounty.isCommitted = true;

        emit BountyCommitted(_bountyId, msg.sender);
    }

    function completeBounty(uint64 _bountyId) public onlyFunder(_bountyId) {
        Bounty storage bounty = bounties[_bountyId];
        require(bounty.isFunded, "Bounty is not funded");
        require(bounty.isCommitted, "Bounty is not committed");
        require(!bounty.isReleased, "Bounty has already been released");

        bounty.isReleased = true;
        payable(bounty.beneficiary).transfer(bounty.amount);

        emit BountyReleased(_bountyId, bounty.beneficiary, bounty.amount);
    }

    function getBounty(uint256 _bountyId) external view returns (Bounty memory) {
        return bounties[_bountyId];
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    modifier onlyFunder(uint256 _bountyId) {
        require(msg.sender == bounties[_bountyId].funder, "Not the funder");
        _;
    }

    receive() external payable {}
}
