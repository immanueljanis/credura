import fs from "fs";
import path from "path";
import { PinataSDK } from "pinata";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const pinata = new PinataSDK({
  pinataJwt: `${process.env.PINATA_JWT}`,
  pinataGateway: `${process.env.NEXT_PUBLIC_GATEWAY_URL}`,
});

/**
 * Generates a generic student card NFT metadata and uploads image & metadata to IPFS.
 * Uses hardcoded/default data for general users.
 * @returns {Promise<Object>} metadata JSON with IPFS image link
 */
export async function generateStudentCard() {
  const imagePath = path.join(__dirname, "../../public/student-id.png");
  const fileBuffer = fs.readFileSync(imagePath);
  const file = new File([fileBuffer], `student-id-card.jpg`, {
    type: "image/jpeg",
  });

  const fileResult = await pinata.upload.public.file(file);
  const imageIpfsUrl = `ipfs://${fileResult.cid}`;

  const metadata = {
    name: `Student ID: YOU`,
    description: `Credura Student ID for YOU (0000000), majoring in Blockchain. Valid until 2099-12-31.`,
    image: imageIpfsUrl,
    attributes: [
      { trait_type: "NIM", value: "0000000" },
      { trait_type: "Major", value: "Blockchain" },
      { trait_type: "Enrollment Year", value: "2099" },
      { trait_type: "Expiry Date", value: "2099-12-31" },
    ],
  };

  const metaResult = await pinata.upload.public.json(metadata);
  const metadataIpfsUrl = `ipfs://${metaResult.cid}`;

  fs.writeFileSync(
    path.join(__dirname, "../../public/student-id.json"),
    JSON.stringify(metadata, null, 2)
  );

  return { ...metadata, image: imageIpfsUrl, metadataIpfsUrl };
}

generateStudentCard().then((result) => {
  console.log("Generic student card metadata generated and uploaded:", result);
});
