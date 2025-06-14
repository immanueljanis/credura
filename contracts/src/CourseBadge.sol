// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "openzeppelin-contracts/contracts/token/ERC1155/ERC1155.sol";
import "openzeppelin-contracts/contracts/access/AccessControl.sol";
import "openzeppelin-contracts/contracts/utils/Pausable.sol";
import "openzeppelin-contracts/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

/**
 * @title CourseBadge
 * @dev Multi-token untuk berbagai badges dan certificates
 * Token types:
 * - Course completion certificates (non-fungible)
 * - Event attendance badges (fungible)
 * - Achievement medals (limited supply)
 * - Workshop participation tokens
 */
contract CourseBadge is ERC1155, AccessControl, Pausable, ERC1155Supply {
    // Role definitions
    bytes32 public constant URI_SETTER_ROLE = keccak256("URI_SETTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    // Token ID ranges untuk organization
    uint256 public constant CERTIFICATE_BASE = 1000;
    uint256 public constant EVENT_BADGE_BASE = 2000;
    uint256 public constant ACHIEVEMENT_BASE = 3000;
    uint256 public constant WORKSHOP_BASE = 4000;
    
    // Token metadata structure
    struct TokenInfo {
        string name;
        string category;
        uint256 maxSupply;
        bool isTransferable;
        uint256 validUntil; // 0 = no expiry
        address issuer;
    }
    
    // TODO: Add mappings
    mapping(uint256 => TokenInfo) public tokenInfo;
    mapping(uint256 => string) private _tokenURIs;
    
    // Track student achievements
    mapping(address => uint256[]) public studentBadges;
    mapping(uint256 => mapping(address => uint256)) public earnedAt; // Timestamp
    
    // Counter untuk generate unique IDs
    uint256 private _certificateCounter;
    uint256 private _eventCounter;
    uint256 private _achievementCounter;
    uint256 private _workshopCounter;

    modifier isCertifValid(uint _id) {
        require(_id >= CERTIFICATE_BASE && _id < CERTIFICATE_BASE + _certificateCounter, "Certificate not valid");
        _;
    }

    modifier isEventValid(uint _id) {
        require(_id >= EVENT_BADGE_BASE && _id < EVENT_BADGE_BASE + _eventCounter, "Event not valid");
        _;
    }

    constructor() ERC1155("") {
        // TODO: Setup roles
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(URI_SETTER_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    /**
     * @dev Create new certificate type
     * Use case: Mata kuliah baru atau program baru
     */
    function createCertificateType(
        string memory name,
        string memory category,
        uint256 maxSupply,
        string memory _uri
    ) public onlyRole(MINTER_ROLE) returns (uint256) {
        // TODO: Create new certificate type
        // 1. Generate ID: CERTIFICATE_BASE + _certificateCounter++
        // 2. Store token info
        // 3. Set URI
        // 4. Return token ID
        uint certificate = CERTIFICATE_BASE + _certificateCounter;
        TokenInfo memory info = TokenInfo({
            name: name,
            category: category,
            maxSupply: maxSupply,
            isTransferable: true,
            validUntil: 0, // 0 = no expiry
            issuer: msg.sender
        });
        tokenInfo[certificate] = info;
        _tokenURIs[certificate] = _uri;
        _certificateCounter += 1;
        return certificate;
    }

    /**
     * @dev Issue certificate to student
     * Use case: Student lulus mata kuliah
     */
    function issueCertificate(
        address student,
        uint256 certificateType,
        string memory additionalData
    ) public onlyRole(MINTER_ROLE) isCertifValid(certificateType) {
        // TODO: Mint certificate
        // 1. Verify certificate type exists
        // 2. Check max supply not exceeded
        // 3. Mint 1 token to student
        // 4. Record timestamp
        // 5. Add to student's badge list
        _mint(student, certificateType, 1, bytes(additionalData));
        earnedAt[certificateType][student] = block.timestamp;
        studentBadges[student].push(certificateType);
    }

    /**
     * @dev Batch mint event badges
     * Use case: Attendance badges untuk peserta event
     */
    function mintEventBadges(
        address[] memory attendees,
        uint256 eventId,
        uint256 amount
    ) public onlyRole(MINTER_ROLE) isEventValid(eventId) {
        // TODO: Batch mint to multiple addresses
        // Use loop to mint to each attendee
        // Record participation
        for (uint i = 0; i < attendees.length; i++) {
            _mint(attendees[i], eventId, amount, "event minting");
        }
    }

    /**
     * @dev Set metadata URI untuk token
     */
    function setTokenURI(uint256 tokenId, string memory newuri) 
        public onlyRole(URI_SETTER_ROLE) 
    {
        // TODO: Store custom URI per token
        _tokenURIs[tokenId] = newuri;
    }

    /**
     * @dev Get all badges owned by student
     */
    function getStudentBadges(address student) 
        public view returns (uint256[] memory) 
    {
        // TODO: Return array of token IDs owned by student
        return studentBadges[student];
    }

    /**
     * @dev Verify badge ownership dengan expiry check
     */
    function verifyBadge(address student, uint256 tokenId) 
        public view returns (bool isValid, uint256 earnedTimestamp) 
    {
        // TODO: Check ownership and validity
        // 1. Check balance > 0
        // 2. Check not expired
        // 3. Return status and when earned
        require(balanceOf(student, tokenId) > 0, "student dont have this badge");
        uint _earn = earnedAt[tokenId][student];
        if (tokenInfo[tokenId].validUntil > 0 && tokenInfo[tokenId].validUntil > block.timestamp) {
            return (false, _earn);
        } else {
            return (true, _earn);
        }
        
    }

    /**
     * @dev Pause all transfers
     */
    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    /**
     * @dev Override to return custom URI per token
     */
    function uri(uint256 tokenId) public view override returns (string memory) {
        // TODO: Return stored URI for token
        return _tokenURIs[tokenId];
    }

    /**
     * @dev Check interface support
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC1155, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    // Achievement System Functions
    
    /**
     * @dev Grant achievement badge
     * Use case: Dean's list, competition winner, etc
     */
    function grantAchievement(
        address student,
        string memory achievementName,
        uint256 rarity // 1 = common, 2 = rare, 3 = legendary
    ) public onlyRole(MINTER_ROLE) returns (uint256) {
        // TODO: Create unique achievement NFT
        // Generate achievement ID
        // Set limited supply based on rarity
        // Mint to deserving student
        uint id = ACHIEVEMENT_BASE + _achievementCounter;
        _mint(student, id, rarity, bytes(achievementName));
        _achievementCounter += 1;
        return id;
    }

    /**
     * @dev Create workshop series dengan multiple sessions
     */
    function createWorkshopSeries(
        string memory seriesName,
        uint256 totalSessions
    ) public onlyRole(MINTER_ROLE) returns (uint256[] memory) {
        // TODO: Create multiple related tokens
        // Return array of token IDs for each session
        uint[] memory idszx;
        uint[] memory rare;
        for (uint i = 0; i < totalSessions; i+= 1) {
            uint id = WORKSHOP_BASE + _workshopCounter;
            idszx[i] = (id);
            _workshopCounter += 1;
            rare[i] = 1;
        }
        _mintBatch(address(this), idszx, rare, bytes(seriesName));
        return idszx;
    }

    /**
     * @dev Override transfer to check transferability and pause
     */
    function _update(
        address _from,
        address _to,
        uint256[] memory _ids,
        uint256[] memory _values
    ) internal override(ERC1155, ERC1155Supply) {
        // TODO: Check transferability for each token
        for (uint i = 0; i < _ids.length; i++) {
            if (_from != address(0) && _to != address(0)) { // Not mint or burn
                require(tokenInfo[_ids[i]].isTransferable, "Token not transferable");
            }
        }
        super._update(_from, _to, _ids, _values);
    }
}