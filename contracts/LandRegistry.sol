// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract LandRegistry {
    struct Land {
        string title;
        string location;
        string price;
        string documentURL;
        string imageURL;
        address owner;
        bool isAvailable;
    }

    Land[] public lands;

    function addLand(
        string memory _title,
        string memory _location,
        string memory _price,
        string memory _documentURL,
        string memory _imageURL
    ) public {
        lands.push(Land(_title, _location, _price, _documentURL, _imageURL, msg.sender, true));
    }

    function getAllLands() public view returns (Land[] memory) {
        return lands;
    }

    function getMyLands() public view returns (Land[] memory) {
        uint count = 0;
        for (uint i = 0; i < lands.length; i++) {
            if (lands[i].owner == msg.sender) {
                count++;
            }
        }

        Land[] memory myLands = new Land[](count);
        uint index = 0;
        for (uint i = 0; i < lands.length; i++) {
            if (lands[i].owner == msg.sender) {
                myLands[index] = lands[i];
                index++;
            }
        }

        return myLands;
    }
}
