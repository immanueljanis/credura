// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721Pausable.sol";

/**
 * @title StudentID
 * @dev NFT-based student identity card (Soulbound, user-minted)
 */
contract StudentID is ERC721, ERC721URIStorage, ERC721Burnable, ERC721Pausable {
    uint256 private _nextTokenId = 1;

    struct StudentData {
        string nim;
        string name;
        string major;
        uint256 enrollmentYear;
        uint256 expiryDate;
        bool isActive;
        uint8 semester;
    }

    mapping(uint256 => StudentData) public studentData;
    mapping(string => uint256) public nimToTokenId;
    mapping(address => uint256) public addressToTokenId;

    event StudentIDIssued(uint256 indexed tokenId, string nim, address student, uint256 expiryDate);
    event StudentIDRenewed(uint256 indexed tokenId, uint256 newExpiryDate);
    event StudentStatusUpdated(uint256 indexed tokenId, bool isActive);
    event ExpiredIDBurned(uint256 indexed tokenId);

    constructor() ERC721("Student Identity Card", "SID") {}

    function mintStudentID(string memory nim, string memory name, string memory major, string memory uri) external {
        require(bytes(nim).length > 0, "NIM cannot be empty");
        require(bytes(name).length > 0, "Name cannot be empty");
        require(bytes(major).length > 0, "Major cannot be empty");
        require(nimToTokenId[nim] == 0, "NIM already exists");
        require(addressToTokenId[msg.sender] == 0, "Address already has an ID");

        uint256 tokenId = _nextTokenId++;
        uint256 expiryDate = block.timestamp + 4 * 365 days;
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
        studentData[tokenId] = StudentData({
            nim: nim,
            name: name,
            major: major,
            enrollmentYear: block.timestamp / 365 days,
            expiryDate: expiryDate,
            isActive: true,
            semester: 1
        });
        nimToTokenId[nim] = tokenId;
        addressToTokenId[msg.sender] = tokenId;
        emit StudentIDIssued(tokenId, nim, msg.sender, expiryDate);
    }

    function renewStudentID(uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender, "Not your ID");
        require(studentData[tokenId].isActive, "Student is not active");
        require(!isExpired(tokenId), "Cannot renew expired ID");
        studentData[tokenId].expiryDate += (6 * 30 days);
        studentData[tokenId].semester += 1;
        emit StudentIDRenewed(tokenId, studentData[tokenId].expiryDate);
    }

    function updateStudentStatus(uint256 tokenId, bool isActive) external {
        require(ownerOf(tokenId) == msg.sender, "Not your ID");
        studentData[tokenId].isActive = isActive;
        if (!isActive) {
            burnExpired(tokenId);
        }
        emit StudentStatusUpdated(tokenId, isActive);
    }

    function burnExpired(uint256 tokenId) public {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        require(isExpired(tokenId) || !studentData[tokenId].isActive, "ID is not expired or inactive");
        require(ownerOf(tokenId) == msg.sender, "Only token owner can burn");
        string memory nim = studentData[tokenId].nim;
        address tokenOwner = ownerOf(tokenId);
        delete nimToTokenId[nim];
        delete addressToTokenId[tokenOwner];
        delete studentData[tokenId];
        _burn(tokenId);
        emit ExpiredIDBurned(tokenId);
    }

    function isExpired(uint256 tokenId) public view returns (bool) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        return studentData[tokenId].expiryDate < block.timestamp;
    }

    function getStudentByNIM(string memory nim)
        public
        view
        returns (address owner, uint256 tokenId, StudentData memory data)
    {
        require(bytes(nim).length > 0, "NIM cannot be empty");
        tokenId = nimToTokenId[nim];
        require(tokenId != 0, "NIM not found");
        owner = ownerOf(tokenId);
        data = studentData[tokenId];
    }

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Pausable)
        returns (address)
    {
        address from = _ownerOf(tokenId);

        if (from != address(0) && to != address(0)) {
            revert("SID is non-transferable");
        }

        return super._update(to, tokenId, auth);
    }

    function burn(uint256 tokenId) public override(ERC721Burnable) {
        super.burn(tokenId);

        // TODO: Clean up student data when burning
        delete studentData[tokenId];
        delete nimToTokenId[studentData[tokenId].nim];
        delete addressToTokenId[ownerOf(tokenId)];
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
