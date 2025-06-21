# Credura

Credura is a decentralized platform for issuing, claiming, and verifying educational badges, certificates, and credits on-chain. It leverages ERC1155, ERC721, and ERC20 smart contracts, dynamic certificate generation, and IPFS/Pinata for metadata and asset storage.

## Features

- **On-chain Badges/Certificates:** Claimable ERC1155 and ERC721 tokens for course completions and achievements.
- **On-chain Credits:** ERC20 tokens for campus credit and rewards.
- **Dynamic Certificate Generation:** Generates personalized certificate images on demand.
- **IPFS/Pinata Integration:** Uploads certificate images and metadata to IPFS via Pinata.
- **User Feedback:** Frontend provides real-time toast notifications for badge/certificate claims.
- **Modular Architecture:** Separate smart contracts, backend logic, and Next.js frontend.

## Architecture

- **contracts/**: Solidity smart contracts (ERC1155, ERC721, ERC20, dynamic base URI, badge/certificate/credit logic).
- **frontend/**: Next.js app for user interaction, certificate generation, and IPFS uploads.
- **Backend Logic:** Integrated in frontend for certificate creation and IPFS/Pinata upload.

## Setup & Usage

1. **Clone the repo:**

   ```sh
   git clone https://github.com/immanueljanis/credura.git
   cd credura
   ```

2. **Install dependencies:**
   - For contracts: see `contracts/README.md`
   - For frontend: see `frontend/README.md`
3. **Configure environment:**
   - Set up Pinata API keys and blockchain RPC URLs as needed.
4. **Run the app:**
   - See `frontend/README.md` for local dev instructions.

## Metadata & `{id}.json` Pattern

- The `{id}.json` metadata pattern is **not yet implemented** in the backend or Pinata flow. Metadata is currently uploaded as individual files with unique names.
- When switching to `{id}.json`, update the backend and Pinata upload logic accordingly.

## Repository

- Main repo: [https://github.com/immanueljanis/credura](https://github.com/immanueljanis/credura)

## License

MIT
