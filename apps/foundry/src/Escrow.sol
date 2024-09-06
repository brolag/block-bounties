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

    modifier onlyFunder(uint256 _bountyId) {
        require(msg.sender == bounties[_bountyId].funder, "Not the funder");
        _;
    }

    function createBounty() public payable returns (uint256) {
        require(msg.value > 0, "Funding amount must be greater than 0");

        uint256 bountyId = nextBountyId++;
        Bounty storage bounty = bounties[bountyId];
        bounty.funder = msg.sender;
        bounty.amount = msg.value;
        bounty.isFunded = true;

        emit BountyCreated(bountyId, msg.sender, msg.value);
        return bountyId;
    }

    function commitToBounty(uint256 _bountyId, bytes memory _signature) public {
        Bounty storage bounty = bounties[_bountyId];
        require(bounty.isFunded, "Bounty is not funded");
        require(!bounty.isCommitted, "Bounty is already committed");

        // Verify the signature
        bytes32 message = keccak256(abi.encodePacked(_bountyId, msg.sender));
        bytes32 messageHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", message));
        (uint8 v, bytes32 r, bytes32 s) = splitSignature(_signature);
        address signer = ecrecover(messageHash, v, r, s);
        require(signer == bounty.funder, "Invalid signature");

        bounty.beneficiary = msg.sender;
        bounty.isCommitted = true;

        emit BountyCommitted(_bountyId, msg.sender);
    }

    function completeBounty(uint256 _bountyId, bytes memory _projectOwnerSignature) public onlyFunder(_bountyId) {
        Bounty storage bounty = bounties[_bountyId];
        require(bounty.isFunded, "Bounty is not funded");
        require(bounty.isCommitted, "Bounty is not committed");
        require(!bounty.isReleased, "Bounty has already been released");

        // Verify the signature
        bytes32 message = keccak256(abi.encodePacked(_bountyId));
        bytes32 messageHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", message));
        (uint8 v, bytes32 r, bytes32 s) = splitSignature(_projectOwnerSignature);
        address signer = ecrecover(messageHash, v, r, s);
        require(signer == bounty.funder, "Invalid signature");

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

    function splitSignature(bytes memory sig) internal pure returns (uint8 v, bytes32 r, bytes32 s) {
        require(sig.length == 65, "Invalid signature length");

        assembly {
            r := mload(add(sig, 32))
            s := mload(add(sig, 64))
            v := byte(0, mload(add(sig, 96)))
        }
    }

    // Fallback function to receive Ether
    receive() external payable {}
}