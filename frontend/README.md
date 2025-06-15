# Credura Frontend

This is the Next.js frontend for the Credura platform, enabling users to claim on-chain badges/certificates, generate dynamic certificates, and interact with the blockchain and IPFS/Pinata.

## Features

- **Claim Badges/Certificates:** Users can claim ERC1155 badges for course completions and achievements.
- **Dynamic Certificate Generation:** Generates personalized certificate images using templates, fonts, and logos.
- **IPFS/Pinata Integration:** Uploads certificate images and metadata to IPFS via Pinata.
- **User Feedback:** Real-time toast notifications for success and error cases during badge/certificate claims.
- **Modern UI:** Built with Next.js, React, and TypeScript.

## Getting Started

1. **Install dependencies:**

   ```sh
   npm install
   # or
   yarn install
   ```

2. **Configure environment:**
   - Set up Pinata API keys and blockchain RPC URLs in your environment variables.
   - Ensure certificate templates, fonts, and logo assets are present in the `public/` directory.

3. **Run the development server:**

   ```sh
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the app.

## Notes on Metadata & `{id}.json`

- The `{id}.json` metadata pattern is **not yet implemented**. Metadata is uploaded as individual files with unique names.
- When switching to `{id}.json`, update the certificate generation and IPFS/Pinata upload logic accordingly.

## Repository

- Main repo: [https://github.com/immanueljanis/credura](https://github.com/immanueljanis/credura)

## License

MIT
