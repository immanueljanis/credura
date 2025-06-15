// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "openzeppelin-contracts/contracts/token/ERC1155/ERC1155.sol";
import "openzeppelin-contracts/contracts/access/AccessControl.sol";
import "openzeppelin-contracts/contracts/token/ERC1155/extensions/ERC1155Pausable.sol";
import "openzeppelin-contracts/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

/**
 * @title CourseBadge
 * @dev ERC1155 for badges/certificates. Only MINTER_ROLE can mint (backend/relayer after quiz).
 */
contract CourseBadge is ERC1155, AccessControl, ERC1155Pausable, ERC1155Supply {
    bytes32 public constant URI_SETTER_ROLE = keccak256("URI_SETTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    uint256 public constant CERTIFICATE_BASE = 1000;
    uint256 public constant EVENT_BADGE_BASE = 2000;
    uint256 public constant ACHIEVEMENT_BASE = 3000;
    uint256 public constant WORKSHOP_BASE = 4000;

    struct TokenInfo {
        string name;
        string category;
        uint256 maxSupply;
        bool isTransferable;
        uint256 validUntil;
        address issuer;
    }

    mapping(uint256 => TokenInfo) public tokenInfo;
    mapping(uint256 => string) private _tokenURIs;
    mapping(address => uint256[]) public studentBadges;
    mapping(uint256 => mapping(address => uint256)) public earnedAt;
    mapping(uint256 => mapping(address => string)) public certificateAdditionalData;
    uint256 private _certificateCounter;
    uint256 private _eventCounter;
    uint256 private _achievementCounter;
    uint256 private _workshopCounter;

    event CertificateTypeCreated(uint256 indexed tokenId, string name);
    event EventBadgeTypeCreated(uint256 indexed tokenId, string name);
    event BadgeIssued(address indexed student, uint256 indexed tokenId, uint256 amount);

    constructor() ERC1155("") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(URI_SETTER_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function createCertificateType(string memory name, uint256 maxSupply, string memory uriCertificate)
        public
        onlyRole(MINTER_ROLE)
        returns (uint256)
    {
        require(maxSupply > 0, "Max supply must be greater than 0");
        require(bytes(name).length > 0, "Name cannot be empty");
        uint256 tokenId = CERTIFICATE_BASE + _certificateCounter++;
        tokenInfo[tokenId] = TokenInfo({
            name: name,
            category: "certificate",
            maxSupply: maxSupply,
            isTransferable: false,
            validUntil: 0,
            issuer: msg.sender
        });
        _tokenURIs[tokenId] = uriCertificate;
        emit CertificateTypeCreated(tokenId, name);
        return tokenId;
    }

    function issueCertificate(address student, uint256 certificateType, string memory additionalData)
        public
        onlyRole(MINTER_ROLE)
    {
        require(student != address(0), "Invalid student address");
        require(tokenInfo[certificateType].maxSupply > 0, "Invalid certificate type");
        require(
            keccak256(abi.encodePacked(tokenInfo[certificateType].category)) == keccak256("certificate"),
            "Not a certificate type"
        );
        require(totalSupply(certificateType) < tokenInfo[certificateType].maxSupply, "Max supply exceeded");
        require(balanceOf(student, certificateType) == 0, "Student already has this certificate");
        _mint(student, certificateType, 1, "");
        earnedAt[certificateType][student] = block.timestamp;
        studentBadges[student].push(certificateType);
        certificateAdditionalData[certificateType][student] = additionalData;
        emit BadgeIssued(student, certificateType, 1);
    }

    function setTokenURI(uint256 tokenId, string memory newuri) public onlyRole(URI_SETTER_ROLE) {
        require(bytes(newuri).length > 0, "URI cannot be empty");
        require(tokenInfo[tokenId].maxSupply > 0, "Token ID does not exist");
        _tokenURIs[tokenId] = newuri;
        emit URI(newuri, tokenId);
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        return _tokenURIs[tokenId];
    }

    function _update(address from, address to, uint256[] memory ids, uint256[] memory values)
        internal
        override(ERC1155, ERC1155Supply, ERC1155Pausable)
    {
        if (from != address(0) && to != address(0)) {
            for (uint256 i = 0; i < ids.length; i++) {
                require(tokenInfo[ids[i]].isTransferable, "Token not transferable");
            }
        }

        super._update(from, to, ids, values);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC1155, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
