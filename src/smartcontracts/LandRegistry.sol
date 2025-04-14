// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LandRegistry {
    struct Land {
        string area;
        string city;
        string state;
        uint256 price;
        uint256 propertyPID;
        uint256 surveyNumber;
        address currentOwner;
        bool isVerified;
        bool isOwned;
    }

    address public admin;

    Land[] public lands;
    mapping(uint256 => address) public landRequests; // propertyPID => buyer address

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action.");
        _;
    }

    modifier onlyLandOwner(uint256 propertyPID) {
        require(lands[propertyPID].currentOwner == msg.sender, "You are not the land owner.");
        _;
    }

    function addLand(
        string memory _area,
        string memory _city,
        string memory _state,
        uint256 _price,
        uint256 _propertyPID,
        uint256 _surveyNumber
    ) public {
        Land memory newLand = Land({
            area: _area,
            city: _city,
            state: _state,
            price: _price,
            propertyPID: _propertyPID,
            surveyNumber: _surveyNumber,
            currentOwner: msg.sender,
            isVerified: false,
            isOwned: false
        });

        lands.push(newLand);
    }

    function verifyLand(uint256 index) public onlyAdmin {
        lands[index].isVerified = true;
    }

    function requestLand(uint256 propertyPID) public {
        require(lands[propertyPID].isVerified, "Land must be verified");
        require(!lands[propertyPID].isOwned, "Land already owned");
        landRequests[propertyPID] = msg.sender;
    }

    function approveRequest(uint256 propertyPID) public onlyLandOwner(propertyPID) {
        require(landRequests[propertyPID] != address(0), "No request exists");
        lands[propertyPID].currentOwner = landRequests[propertyPID];
        lands[propertyPID].isOwned = true;
    }

    function getLandByIndex(uint256 index) public view returns (
        string memory area,
        string memory city,
        string memory state,
        uint256 price,
        uint256 propertyPID,
        uint256 surveyNumber,
        address currentOwner,
        bool isVerified,
        bool isOwned
    ) {
        Land memory land = lands[index];
        return (
            land.area,
            land.city,
            land.state,
            land.price,
            land.propertyPID,
            land.surveyNumber,
            land.currentOwner,
            land.isVerified,
            land.isOwned
        );
    }

    function getLandsCount() public view returns (uint256) {
        return lands.length;
    }
}
