# Credura Smart Contracts

This folder contains the Solidity smart contracts for the Credura platform, which enables on-chain badge/certificate claiming and campus credit using the ERC1155, ERC721, and ERC20 standards.

## Overview

- **ERC1155 Badges/Certificates:** Implements a dynamic badge and certificate system for courses and achievements.
- **ERC721 Certificates:** Supports unique certificate NFTs for special achievements or diplomas.
- **ERC20 Campus Credit:** Provides fungible tokens for campus credit and rewards.
- **Dynamic Base URI:** Supports dynamic base URI for metadata, with future support for the `{id}.json` pattern (not yet implemented in backend/IPFS flow).
- **Integration:** Designed to work with the backend and frontend for certificate generation, IPFS/Pinata uploads, and badge/credit claiming.

## Key Contracts

- `CourseBadge.sol`: Main ERC1155 contract for issuing course badges and certificates. Supports dynamic base URI and is upgrade-ready for `{id}.json` metadata pattern.
- `CampusCredit.sol`: ERC20 contract for campus credit and rewards.
- `StudentID.sol`: ERC721 contract for unique student IDs or certificates.

## Development

### Prerequisites

- [Foundry](https://book.getfoundry.sh/) (for building, testing, and deploying contracts)

### Common Commands

```sh
# Build contracts
forge build

# Run tests
forge test

# Format code
forge fmt

# Local node (Anvil)
anvil

# Deploy (example)
forge script script/CourseBadge.s.sol:CourseBadgeScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

### Notes

- The `{id}.json` metadata pattern is **not yet implemented** in the backend or Pinata flow. Metadata is currently uploaded as individual files with unique names.
- When switching to `{id}.json`, update the backend and Pinata upload logic accordingly.

## Repository

- Main repo: [https://github.com/immanueljanis/credura](https://github.com/immanueljanis/credura)

## License

MIT
