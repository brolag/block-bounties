// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract Escrow {
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

    function createBounty() external payable returns (uint256) {
        require(msg.value > 0, "Funding amount must be greater than 0");

        uint256 bountyId = nextBountyId++;
        Bounty storage bounty = bounties[bountyId];
        bounty.funder = msg.sender;
        bounty.amount = msg.value;
        bounty.isFunded = true;

        emit BountyCreated(bountyId, msg.sender, msg.value);
        return bountyId;
    }

    function commitToBounty(
        uint256 _bountyId,
        address _beneficiary,
        bytes memory _projectOwnerSignature,
        bytes memory _freelancerSignature
    )
        external
    {
        Bounty storage bounty = bounties[_bountyId];
        require(bounty.isFunded, "Bounty is not funded");
        require(!bounty.isCommitted, "Bounty is already committed");

        // TODO: Implement signature verification logic here

        bounty.beneficiary = _beneficiary;
        bounty.isCommitted = true;

        emit BountyCommitted(_bountyId, _beneficiary);
    }

    function completeBounty(uint256 _bountyId, bytes memory _projectOwnerSignature) external {
        Bounty storage bounty = bounties[_bountyId];
        require(bounty.isFunded, "Bounty is not funded");
        require(bounty.isCommitted, "Bounty is not committed");
        require(!bounty.isReleased, "Bounty has already been released");

        // TODO: Implement signature verification logic here

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
}
